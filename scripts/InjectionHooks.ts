import * as fs from 'fs';
import * as path from 'path';
import type { Plugin } from 'vite';

// --- Funções de Utilitário ---

function showFile(x: string, p: string = '?'): void {
	console.log(
		`\n\n====================================================================================================\n`,
		`[sassThemeInjectorPlugin] Carregando e injetando: '${p}'`,
		x,
		`\n-----------------------------------------------------------------------------------------------------\n\n`,
	);
}

export function _EscapeRegExp(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const INJECTION_BLOCK_REGEX =
	'(\n|^)\\s*|||\\s*\\{generate\\-global\\-css\\-vars\\.ts[^\n]+(\n|$)';

const __INJECTIONHOOKS_REGEX = /^\s*@InjectionHooks_ts:/i;
const __VIRTUAL_ID_PREFIX = '@InjectionHooks_ts:';

/**
 * Determina a sintaxe de comentário com base na extensão do arquivo.
 * @param filePath O caminho do arquivo.
 * @returns Um objeto com 'start' e 'end' do comentário.
 */
function getCommentSyntax(filePath: string): {
	start: string;
	end: string;
} {
	const extension = path.extname(filePath).toLowerCase();

	// Tipos comuns no seu projeto Preact/Vite (SCSS, TS/JS/TSX)
	if (
		['.scss', '.css', '.ts', '.tsx', '.js', '.jsx'].includes(
			extension,
		)
	) {
		return { start: '//', end: '' };
	}

	// Para HTML
	if (['.html', '.htm'].includes(extension)) {
		return { start: '<!--', end: '-->' };
	}

	// Para arquivos de config (YAML, TOML)
	if (['.yaml', '.yml', '.toml'].includes(extension)) {
		return { start: '#', end: '' };
	}

	// Padrão seguro, mas pode falhar se o tipo de arquivo for incomum
	return { start: '/*', end: '*/' };
}

// --- Tipos de Dados ---

type TISMATCH = RegExp | ((input: string) => boolean);

export interface IInjectionHook {
	filePath: string; // Caminho do arquivo real no disco (relativo ou absoluto)
	isMatch?: TISMATCH; // Função para testar o ID/caminho
	getContent: () => string; // Função que retorna o conteúdo a ser injetado
}

export type Function<T> = () => T;

function isMatch(
	tester: IInjectionHook | TISMATCH,
	path: string,
): boolean {
	return (
		tester instanceof RegExp ? (<RegExp>tester).test(path)
		: typeof tester === `function` ? tester(path)
		: typeof tester === `object` && tester.hasOwnProperty(`isMatch`) ?
			isMatch((<Required<IInjectionHook>>tester).isMatch, path)
		:	false
	);
}

export function GEN_ID(f: string): string {
	return __VIRTUAL_ID_PREFIX + path.normalize(f).replace(/\\/g, `/`);
}

function fasterSimpleResolveAbsolutePath(
	source: string,
	importer: string | undefined,
): string | null {
	const normalizedSource = path.normalize(source).replace(/\\/g, '/');

	if (path.isAbsolute(normalizedSource)) {
		return normalizedSource;
	}

	// Protocolos de URL comuns (FTP já estava lá)
	if (/\s*[^:\s@]:(\/\/)?/i.test(normalizedSource)) {
		return null;
	}

	// Ignora aliases do Vite e pacotes node_modules que não começam com ./ ou ../
	// Um pacote de node_modules geralmente começa com o nome do pacote (ex: 'lodash')
	// ou com um escopo (ex: '@scope/package').
	if (
		normalizedSource.startsWith('@') &&
		!normalizedSource.startsWith('./') && // Ignora @/ aliases, mas não caminhos relativos que *começam* com @
		!normalizedSource.startsWith('../')
	) {
		return null;
	}

	// Ignora pacotes de node_modules que não são relativos (ex: 'react', 'minha-lib')
	if (
		!normalizedSource.startsWith('.') && // Não começa com . ou ..
		!path.isAbsolute(normalizedSource) && // Não é um caminho absoluto
		importer // Apenas se houver um importer, para garantir que não é a entrada principal
	) {
		// Assume que é um import de node_modules que o Vite deve resolver assincronamente
		return null;
	}

	// 3. Tenta combinar caminhos relativos (./ ou ../) com o importer
	if (
		importer &&
		(normalizedSource.startsWith('./') ||
			normalizedSource.startsWith('../') ||
			normalizedSource.startsWith('file://'))
	) {
		const importerDir = path.dirname(importer);
		const fullPath = path.resolve(importerDir, normalizedSource);
		return path.normalize(fullPath).replace(/\\/g, '/');
	}

	/* padrão: não resolvido */
	return null;
}

/**
 * Função que cria o Plugin Vite genérico para gerenciamento de injeção via ganchos (hooks).
 * Carrega automaticamente os ganchos de um subdiretório local chamado './hooks'.
 *
 * @returns Um Plugin Vite configurado.
 */
export function FileInjectionHooks(
	hooks: IInjectionHook[] | Record<PropertyKey, IInjectionHook>,
): Plugin {
	if (Array.isArray(hooks))
		return FileInjectionHooks(
			(<IInjectionHook[]>hooks).reduce(
				(
					acumulador: Record<PropertyKey, IInjectionHook>,
					atual: IInjectionHook,
				) => {
					acumulador[GEN_ID(atual.filePath)] = atual;
					return acumulador;
				},
				{},
			),
		);

	return {
		name: 'InjectionHooks',
		enforce: 'pre',

		resolveId(source, importer, options) {
			const normalizedSource: string | null =
				fasterSimpleResolveAbsolutePath(
					path.normalize(source).replace(/\\/g, '/'),
					importer,
				);

			if (!normalizedSource) return null;

			for (const id in <Record<PropertyKey, IInjectionHook>>hooks) {
				if (isMatch(hooks[id], normalizedSource)) {
					const _id = GEN_ID(hooks[id].filePath);

					return {
						id: _id,
						meta: {
							vite: {
								injectedLoader: path
									.extname(normalizedSource)
									.substring(1),
							},
						} as any,
					};
				}
			}
			return null;
		},

		load(id) {
			if (!__INJECTIONHOOKS_REGEX.test(id)) return null;

			if (id in hooks) {
				const originalCode = fs.readFileSync(
					hooks[id].filePath,
					'utf-8',
				);
				const commentSyntax = getCommentSyntax(hooks[id].filePath);
				const REGEX = new RegExp(
					INJECTION_BLOCK_REGEX.replace(
						`|||`,
						_EscapeRegExp(commentSyntax.start),
					),
					'i',
				);
				const startComment = `\n${commentSyntax.start}[START INJECTION]: generate-global-css-vars.ts:${commentSyntax.end}\n`;
				const endComment = `\n${commentSyntax.start}[END INJECTION]: generate-global-css-vars.ts.${commentSyntax.end}\n`;

				const injectedCode = originalCode.replace(
					REGEX,
					`\n${startComment}\n${hooks[id].getContent()}\n${endComment}\n`,
				);

				showFile(injectedCode, hooks[id].filePath);
				return injectedCode;
			}

			return null;
		},
	};
}

import * as fs from 'fs';
import * as path from 'path';
import type { Plugin } from 'vite';

// --- Constantes Globais ---

/**
 * Expressão regular para identificar o bloco de injeção no código fonte.
 * A string `|||||` é um placeholder para a sintaxe de comentário (`//` ou `<!--`).
 */
const INJECTION_BLOCK_REGEX =
	'(\n|^)\\s*|||||\\s*\\{generate\\-global\\-css\\-vars\\.ts[^\n]+(\n|$)';

/**
 * Expressão regular para testar se um ID começa com o prefixo de hook virtual.
 */
const __INJECTIONHOOKS_REGEX = /^\s*@InjectionHooks_ts:/i;

/**
 * Prefixo usado para IDs virtuais gerenciados pelo plugin.
 */
const __VIRTUAL_ID_PREFIX = '@InjectionHooks_ts:'.toLocaleLowerCase();

/**
 * Expressão regular para identificar o início de um caminho relativo (`./` ou `../`).
 */
const REGEX_START_RELATIVE_PATH =
	/(^|\n)\s*(\.{1,2}(\/|\\)|[^\s\.\/\\])/;

/**
 * Expressão regular para capturar `@use` ou `@import` com caminhos relativos.
 * Grupo 1: aspas (`"` ou `'`), Grupo 2: o caminho relativo (`./...` ou `../...`).
 */
const RELATIVE_IMPORT_REGEX =
	/(?:@use|@import)\s+("|')(\.\.?\/.*?)\1/gi;

// --- Tipos de Dados ---

/**
 * Tipo de dado que pode ser uma Expressão Regular ou uma função de teste.
 */
type TISMATCH = RegExp | ((input: string) => boolean);

/**
 * Interface para um Gancho de Injeção (Injection Hook).
 */
export interface IInjectionHook {
	filePath: string; // Caminho do arquivo real no disco (relativo ou absoluto)
	isMatch?: TISMATCH; // Função ou RegExp para testar o ID/caminho
	getContent: () => string; // Função que retorna o conteúdo a ser injetado
}

/**
 * Tipo genérico para uma função que retorna um valor T.
 */
export type Function<T> = () => T;

// --- Funções de Utilitário ---

/**
 * Exibe o conteúdo de um arquivo sendo carregado/injetado no console.
 * @param x O conteúdo do arquivo (string).
 * @param p O caminho do arquivo (opcional, padrão '?').
 */
function showFile(x: string, p: string = '?'): void {
	console.log(
		`\n\n====================================================================================================\n`,
		`[sassThemeInjectorPlugin] Carregando e injetando: '${p}'\n`,
		x,
		`\n-----------------------------------------------------------------------------------------------------\n\n`,
	);
}

/**
 * Função de log auxiliar interna.
 * @param a Prefixo A.
 * @param f Arquivo/Caminho F.
 * @param i Informação adicional I.
 */
function ____x(a: string, f: string, i?: string | any): void {
	console.log(`------[${a}]---------++++++--------  ${f} <<< ${i}`);
}

/**
 * Função de log condicional que filtra por arquivos específicos (_config.scss, _variables.scss).
 * @param a Prefixo A.
 * @param f Arquivo/Caminho F.
 * @param i Informação adicional I.
 */
function ____t(a: string, f: string, i?: string | any): void {
	if (
		/\/_?(config|variables)\.scss/i.test(`${f}`) ||
		/\/_?(config|variables)\.scss/i.test(`${i}`)
	)
		____x(a, f, i);
}

/**
 * Escapa caracteres especiais em uma string para uso seguro em Expressões Regulares.
 * @param string A string de entrada.
 * @returns A string com caracteres escapados.
 */
export function _EscapeRegExp(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

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

/**
 * Testa se um caminho corresponde ao critério de um hook (RegExp ou função).
 * @param tester O hook ou critério de teste.
 * @param path O caminho a ser testado.
 * @returns Verdadeiro se houver correspondência.
 */
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

/**
 * Gera um ID virtual único prefixado para um caminho de arquivo real.
 * Converte o caminho de arquivo real para um caminho relativo à raiz do repositório
 * (automaticamente obtida via process.cwd()), e então aplica o prefixo virtual.
 *
 * @param f O caminho do arquivo real (pode ser absoluto ou relativo).
 * @returns O ID virtual normalizado e relativo ao repositório.
 */
export function GEN_ID(
	f: string,
	withID_OrAbsolute: boolean | number = true,
): string {
	// 1. Garante que 'f' seja um caminho absoluto.
	//    Se já for absoluto, path.resolve apenas o normaliza.
	const absolutePath = path.resolve(process.cwd(), f);

	// 2. Calcula o caminho relativo da raiz do projeto (process.cwd()) até o arquivo.
	const relativePath = path.relative(process.cwd(), absolutePath);

	// 3. Normaliza barras para o padrão URL (/) e aplica o prefixo virtual.
	return (
			(withID_OrAbsolute === true ? __VIRTUAL_ID_PREFIX : '') +
				(withID_OrAbsolute === 1)
		) ?
			absolutePath.replace(/\\/g, `/`)
		:	path.normalize(relativePath).replace(/\\/g, `/`);
}

/**
 * Resolve um caminho relativo ou absoluto para um caminho absoluto do sistema de arquivos,
 * tentando evitar alias do Vite ou pacotes node_modules. Retorna um código de erro numérico
 * se não puder resolver ou o caminho absoluto (string) se for bem-sucedido.
 * @param source O caminho de origem (ex: './config.scss', 'lodash', '/src/app.ts').
 * @param importer O caminho do arquivo que está importando (base para resolução relativa).
 * @returns O caminho absoluto (string) ou um código de erro numérico.
 */
function fasterSimpleResolveAbsolutePath(
	source: string,
	importer: string | undefined,
): string | Number {
	const normalizedSource = path.normalize(source).replace(/\\/g, '/');

	____t(`fasterResolver`, normalizedSource, importer);

	if (path.isAbsolute(normalizedSource)) {
		return normalizedSource;
	}

	// Protocolos de URL comuns (FTP, HTTP/S, etc.)
	if (/\s*[^:\s@]:(\/\/)?/i.test(normalizedSource)) {
		return -1;
	}

	// Ignora aliases do Vite e pacotes node_modules que não começam com ./ ou ../
	if (
		normalizedSource.startsWith('@') &&
		!normalizedSource.startsWith('./') && // Ignora @/ aliases, mas não caminhos relativos que *começam* com @
		!normalizedSource.startsWith('../')
	) {
		return -2;
	}

	// Ignora pacotes de node_modules que não são relativos (ex: 'react', 'minha-lib')
	if (
		importer && // Apenas se houver um importer, para garantir que não é a entrada principal
		!REGEX_START_RELATIVE_PATH.test(source) &&
		!REGEX_START_RELATIVE_PATH.test(source) &&
		!path.isAbsolute(normalizedSource) && // Não é um caminho absoluto
		!path.isAbsolute(source) // Não é um caminho absoluto
	) {
		// Assume que é um import de node_modules que o Vite deve resolver assincronamente
		return -3;
	}

	// 3. Tenta combinar caminhos relativos (./ ou ../) com o importer
	if (
		importer &&
		(REGEX_START_RELATIVE_PATH.test(source) ||
			REGEX_START_RELATIVE_PATH.test(normalizedSource))
	) {
		const importerDir = path.dirname(importer);
		const fullPath = path.resolve(importerDir, normalizedSource);
		return path.normalize(fullPath).replace(/\\/g, '/');
	}

	/* padrão: não resolvido */
	return -4;
}

/**
 * Função que cria o Plugin Vite genérico para gerenciamento de injeção via ganchos (hooks).
 * Este plugin intercepta o carregamento de arquivos específicos para injetar conteúdo dinâmico
 * e reescreve caminhos relativos de `@use`/`@import` em IDs virtuais.
 *
 * @param hooks Um array ou objeto Record de IInjectionHook a serem gerenciados.
 * @returns Um Plugin Vite configurado.
 */
export function FileInjectionHooks(
	hooks: IInjectionHook[] | Record<PropertyKey, IInjectionHook>,
): Plugin {
	// Normaliza a entrada para um Record onde as chaves são IDs Virtuais
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

	// O mapa de hooks normalizado para uso nos métodos do plugin
	const normalizedHooks: Record<PropertyKey, IInjectionHook> = hooks;

	return {
		name: 'InjectionHooks',
		enforce: 'pre',

		/**
		 * Hook resolveId do Vite: Intercepta pedidos de resolução de módulos.
		 * @param source O caminho do módulo que está sendo importado.
		 * @param importer O caminho do arquivo que está importando.
		 * @param options Opções de resolução.
		 * @returns O ID virtual (string) ou null.
		 */
		resolveId(source, importer, options) {
			____t(`resolveId`, source, importer);

			// Se o importer for virtual, resolvemos para o caminho real primeiro
			let effectiveImporter = importer;
			if (
				importer &&
				__INJECTIONHOOKS_REGEX.test(importer) &&
				normalizedHooks
			) {
				const hookMatch = Object.values(normalizedHooks).find(
					(h) =>
						path.normalize(GEN_ID(h.filePath)) ===
						path.normalize(importer),
				);
				if (hookMatch) {
					effectiveImporter = hookMatch.filePath;
				}
			}
			// Fim do tratamento effectiveImporter

			const normalizedSource: string | Number =
				fasterSimpleResolveAbsolutePath(
					path.normalize(source).replace(/\\/g, '/'),
					effectiveImporter,
				);

			if (typeof normalizedSource !== `string`) return null;

			for (const id in normalizedHooks) {
				const hook = normalizedHooks[id];

				if (isMatch(hook, normalizedSource)) {
					const _id = GEN_ID(hook.filePath);

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

		/**
		 * Hook load do Vite: Carrega o conteúdo para IDs virtuais.
		 * Realiza a injeção de variáveis e a reescrita de caminhos relativos.
		 * @param id O ID do módulo a ser carregado (espera-se um ID virtual).
		 * @returns O código fonte modificado (string) ou null.
		 */
		load(id) {
			____t(`load`, id);

			if (!__INJECTIONHOOKS_REGEX.test(id)) return null;

			if (id in normalizedHooks) {
				const hook = normalizedHooks[id];

				const originalCode = fs.readFileSync(hook.filePath, 'utf-8');

				// Lógica para determinar a sintaxe de comentário e os delimitadores de injeção
				const [cmt_start, cmt_end, startComment, endComment] = ((
					x,
				) => {
					return [
						x.start,
						x.end,
						`\n${x.start}[START INJECTION]: generate-global-css-vars.ts:${x.end}\n`,
						`\n${x.start}[END INJECTION]: generate-global-css-vars.ts.${x.end}\n`,
					];
				})(getCommentSyntax(hook.filePath));

				const REGEX = new RegExp(
					INJECTION_BLOCK_REGEX.replace(
						`|||||`,
						_EscapeRegExp(cmt_start),
					),
					'i',
				);

				// Realiza a injeção de conteúdo principal e a reescrita de caminhos relativos
				const injectedCode = originalCode
					.replace(
						REGEX,
						`\n${startComment}\n${hook.getContent()}\n${endComment}\n`,
					)
					.replace(
						RELATIVE_IMPORT_REGEX,
						(match, quote, relativePath) => {
							// Resolve o caminho relativo para absoluto usando o arquivo real como base
							const absolutePath = fasterSimpleResolveAbsolutePath(
								relativePath,
								hook.filePath, // Usa o caminho real do arquivo como importer
							);
							____x(`ttt`, `'${GEN_ID(`${absolutePath}`, 1)}'`, ``);
							// Se a resolução for bem-sucedida (retorna string), reescreve para ID virtual
							return typeof absolutePath === `string` ?
									`${match.startsWith('@use') ? '@use' : '@import'} '${GEN_ID(`${absolutePath}`, 1)}'`
								:	match; // Caso contrário, mantém o original (fallback)
						},
					);

				showFile(injectedCode, hook.filePath);
				return injectedCode;
			}

			return null;
		},
	};
}

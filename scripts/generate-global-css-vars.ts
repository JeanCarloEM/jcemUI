import * as fs from 'fs';
import * as path from 'path';
import type { Plugin } from 'vite';
import { convertToBase32, BASE10_ALPHABET } from './base';

// --- Configuração de Caminhos ---
const SKINS_DIR_ROOT = './src/scss/global/skins/';
const DEFAULT_VARS_FILE_PATH =
	'./src/scss/global/_variables.default.scss';
const CONFIG_FILE_PATH = './src/scss/global/_config.scss';
const MAIN_VARS_FILE_PATH = './src/scss/global/_variables.scss';

// --- Lógica de Geração de ID Único (Interna) ---
const generatedIds = new Map<string, string>();
let counter = 0;

function generateUniqueThemeId(varName: string): string {
	if (generatedIds.has(varName)) return generatedIds.get(varName)!;
	const newId = convertToBase32(counter.toString(), BASE10_ALPHABET);
	counter++;
	generatedIds.set(varName, newId);
	return newId;
}

// --- Tipos de Dados ---
interface ThemeConfigData {
	autoVarMapSassString: string;
	useStatementsSassString: string;
	themesMapSassString: string;
}

// --- Lógica Central de Processamento ---
function generateAllThemeConfig(): ThemeConfigData {
	const absoluteSkinsDir = path.resolve(
		process.cwd(),
		SKINS_DIR_ROOT,
	);
	const absoluteDefaultVarsPath = path.resolve(
		process.cwd(),
		DEFAULT_VARS_FILE_PATH,
	);

	if (!fs.existsSync(absoluteSkinsDir)) {
		console.warn(
			`Diretório de skins não encontrado: ${absoluteSkinsDir}`,
		);
		return {
			autoVarMapSassString: '$auto-var-map: ();',
			useStatementsSassString: '',
			themesMapSassString: '$themes: ();',
		};
	}

	const skinFiles = fs
		.readdirSync(absoluteSkinsDir)
		.filter((f) => f.endsWith('.scss') && f.startsWith('_'));
	const allUniqueVariableNames = new Set<string>();
	const activeSkinsInfo: { name: string; path: string }[] = [];

	// Função auxiliar para extrair nomes de variáveis de um arquivo
	const extractVarsFromFile = (filePath: string) => {
		if (fs.existsSync(filePath)) {
			const content = fs.readFileSync(filePath, 'utf-8');
			const matches = content.matchAll(/(['"])(.*?)\1\s*:/g); // regex para capturar variáveis em aspas simples ou duplas
			for (const match of matches) {
				if (match && match[2]) allUniqueVariableNames.add(match[2]);
			}
		}
	};

	// 1. Processa o arquivo default para capturar nomes de variáveis base
	extractVarsFromFile(absoluteDefaultVarsPath);

	// 2. Processa os arquivos de skins para capturar nomes de variáveis e info dos temas
	skinFiles.forEach((file) => {
		const fullPath = path.join(absoluteSkinsDir, file);
		extractVarsFromFile(fullPath);

		const themeName = path.parse(file).name.replace('_', '');
		activeSkinsInfo.push({
			name: themeName,
			path: `./src/scss/global/skins/${themeName}`,
		});
	});

	// --- 1. Geração do MAPA DE VARIÁVEIS CURTAS ($auto-var-map) ---
	let autoVarMapSassString = '$auto-var-map: (';
	allUniqueVariableNames.forEach((name) => {
		autoVarMapSassString += `"${name}": "${generateUniqueThemeId(name)}",\n`;
	});
	autoVarMapSassString += ');';

	// Resetar estado interno
	counter = 0;
	generatedIds.clear();

	// --- 2. Geração das Declarações @use (Importação dos skins) ---
	let useStatementsSassString = '';
	activeSkinsInfo.forEach((info) => {
		// Ajustando o caminho para ser relativo ao diretório de _config.scss
		const relativePath = path.relative(
			path.dirname(CONFIG_FILE_PATH),
			info.path,
		);

		useStatementsSassString += `@use './${relativePath}' as ${info.name};\n`;
	});

	// --- 3. Geração do MAPA DE SKINS ($themes) ---
	let themesMapSassString = '$themes: (';
	activeSkinsInfo.forEach((info) => {
		themesMapSassString += `"${info.name}": ${info.name}.$theme-map,\n`;
	});
	themesMapSassString += ');';

	return {
		autoVarMapSassString,
		useStatementsSassString,
		themesMapSassString,
	};
}

// Gerar os dados de configuração de forma síncrona
const generatedConfig = generateAllThemeConfig();

function compare(i: string, x: string): Boolean {
	return path
		.normalize(i)
		.trim()
		.endsWith(
			path.normalize(x.split('/').slice(-3).join('/')).trim(),
		);
}

// Plugins para injetar as configurações geradas nos arquivos SCSS
/** Plugin Vite para injetar o mapa de IDs curtos ($auto-var-map) no arquivo _config.scss. */
function injectMapIn_Config(): Plugin {
	return {
		name: 'inject-id-map',
		enforce: 'pre',
		transform(code, id) {
			if (compare(id, CONFIG_FILE_PATH)) {
				// Injetando o mapa de variáveis no início do código SCSS
				const modifiedCode =
					generatedConfig.autoVarMapSassString + '\n' + code;
				console.log(modifiedCode);
				return modifiedCode;
			}
			return code;
		},
	};
}

/** Plugin Vite para injetar as declarações @use e o mapa $themes no arquivo _variables.scss. */
function injectThemeIn_variables(): Plugin {
	return {
		name: 'inject-theme-setup',
		enforce: 'pre',
		transform(code, id) {
			if (compare(id, MAIN_VARS_FILE_PATH)) {
				// Injetando as declarações @use e o mapa de temas no arquivo _variables.scss
				const injection =
					generatedConfig.useStatementsSassString +
					'\n' +
					generatedConfig.themesMapSassString +
					'\n';
				const modifiedCode = injection + code;
				console.log(modifiedCode);
				return modifiedCode;
			}
			return code;
		},
	};
}

// Exportando os plugins Vite de forma síncrona
export const sassThemePlugins = [
	injectMapIn_Config(),
	injectThemeIn_variables(),
];

import * as path from 'path';
import * as fs from 'fs';
import { _EscapeRegExp, IInjectionHook } from '../InjectionHooks';

// --- Configuração de Caminhos ---
const SKINS_DIR_ROOT = './src/scss/global/skins/';
const CONFIG_FILE_PATH = './src/scss/global/_config.scss';
const MAIN_VARS_FILE_PATH = 'src/scss/global/_variables.scss';
const TARGET_REGEX = new RegExp(
	_EscapeRegExp(MAIN_VARS_FILE_PATH),
	'i',
);

// --- Lógica Central de Processamento para variablesHook ---
function generateVariablesContent(): string {
	const absoluteSkinsDir = path.resolve(
		process.cwd(),
		SKINS_DIR_ROOT,
	);

	if (!fs.existsSync(absoluteSkinsDir)) {
		return '';
	}

	const skinFiles = fs
		.readdirSync(absoluteSkinsDir)
		.filter((f) => f.endsWith('.scss') && f.startsWith('_'));
	const activeSkinsInfo: { name: string; path: string }[] = [];

	skinFiles.forEach((file) => {
		const themeName = path.parse(file).name.replace('_', '');
		activeSkinsInfo.push({
			name: themeName,
			path: `./src/scss/global/skins/${themeName}`,
		});
	});

	// --- 2. Geração das Declarações @use (Importação dos skins) ---
	let useStatementsSassString = '';
	activeSkinsInfo.forEach((info) => {
		const relativePath = path.relative(
			path.dirname(CONFIG_FILE_PATH), // Use CONFIG_FILE_PATH ou ajuste o path.relative base
			info.path,
		);
		// Garante o uso de barras frontais '/' exigidas pelo Sass, mesmo no Windows
		useStatementsSassString += `@use './${path.normalize(`${relativePath}`).replace(/\\/g, `/`)}' as ___${info.name.trim().toLocaleUpperCase()};\n`;
	});

	// --- 3. Geração do MAPA DE SKINS ($themes) ---
	let themesMapSassString = '$themes: (';
	activeSkinsInfo.forEach((info) => {
		// Remove as aspas na chave do mapa e usa o namespace correto
		themesMapSassString += `${info.name}: ___${info.name.trim().toLocaleUpperCase()}.$theme-map,\n`;
	});
	themesMapSassString += ');';

	return `${useStatementsSassString}\n${themesMapSassString}`;
}

// A função exportada DEVE ter o mesmo nome do arquivo (variables_scss)
export function variables_scss(): IInjectionHook {
	return {
		filePath: MAIN_VARS_FILE_PATH,
		isMatch: TARGET_REGEX,
		getContent: () => generateVariablesContent(), // Chama a lógica de geração
	};
}

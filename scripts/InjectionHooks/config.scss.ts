import * as path from 'path';
import * as fs from 'fs';
import type { IInjectionHook } from '../InjectionHooks';
import { convertToBase32, BASE10_ALPHABET } from '../base';

// --- Configuração de Caminhos ---
const SKINS_DIR_ROOT = './src/scss/global/skins/';
const DEFAULT_VARS_FILE_PATH =
	'./src/scss/global/_variables.default.scss';
const CONFIG_FILE_PATH = './src/scss/global/_config.scss';

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

// --- Lógica Central de Processamento para configHook ---
function generateConfigContent(): string {
	const absoluteSkinsDir = path.resolve(
		process.cwd(),
		SKINS_DIR_ROOT,
	);
	const absoluteDefaultVarsPath = path.resolve(
		process.cwd(),
		DEFAULT_VARS_FILE_PATH,
	);

	if (!fs.existsSync(absoluteSkinsDir)) {
		return '$__AUTO_VAR_MAP__: ();';
	}

	const skinFiles = fs
		.readdirSync(absoluteSkinsDir)
		.filter((f) => f.endsWith('.scss') && f.startsWith('_'));
	const allUniqueVariableNames = new Set<string>();

	const extractVarsFromFile = (filePath: string) => {
		if (fs.existsSync(filePath)) {
			const content = fs.readFileSync(filePath, 'utf-8');
			const matches = content.matchAll(/(['"])(.*?)\1\s*:/g);
			for (const match of matches) {
				if (match && match) allUniqueVariableNames.add(match[1]);
			}
		}
	};

	extractVarsFromFile(absoluteDefaultVarsPath);
	skinFiles.forEach((file) => {
		const fullPath = path.join(absoluteSkinsDir, file);
		extractVarsFromFile(fullPath);
	});

	// --- Geração do MAPA DE VARIÁVEIS CURTAS ($__AUTO_VAR_MAP__) ---
	let autoVarMapSassString = '$__AUTO_VAR_MAP__: (';
	allUniqueVariableNames.forEach((name) => {
		autoVarMapSassString += `"${name}": "${generateUniqueThemeId(name)}",\n`;
	});
	autoVarMapSassString += ');';

	// Resetar estado interno (apenas para garantir)
	counter = 0;
	generatedIds.clear();

	return autoVarMapSassString;
}

export function config_scss(): IInjectionHook {
	return {
		filePath: CONFIG_FILE_PATH,
		isMatch: /\/src\/scss\/global\/_?config\.scss$/i,
		getContent: () => generateConfigContent(),
	};
}

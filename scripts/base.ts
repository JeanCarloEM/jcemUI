/**
 * @file
 * Conversão genérica entre bases arbitrárias com suporte a Unicode, BigInt
 * e alfabetos personalizados. Inclui presets para Base32, Base62, Base64 URL-safe
 * e uma Base96-like segura para URLs.
 */

/* -------------------------------------------------------------------------- */
/*                             Função principal                               */
/* -------------------------------------------------------------------------- */

/**
 * Converte um número entre bases arbitrárias definidas por conjuntos de símbolos.
 *
 * - Case-sensitive e compatível com Unicode.
 * - Usa BigInt para precisão ilimitada.
 * - Garante que as bases não possuam símbolos duplicados.
 * - Suporta `string` (ex: "0123456789ABCDEF") ou `string[]` (ex: ['0','1',...]).
 *
 * @example
 * ```ts
 * convertBase("FF", "0123456789ABCDEF", "01"); // "11111111"
 * convertBase("1010", "01", "0123456789");    // "10"
 * ```
 *
 * @param value Valor a ser convertido (na base de origem).
 * @param fromBaseSymbols Símbolos que definem a base de origem.
 * @param toBaseSymbols Símbolos que definem a base de destino.
 * @returns O valor convertido na base de destino.
 * @throws {TypeError} Se os alfabetos não forem string ou array.
 * @throws {Error} Se houver duplicatas nos símbolos ou caracteres inválidos.
 */
export function convertBase(
	value: string,
	fromBaseSymbols: string | string[],
	toBaseSymbols: string | string[],
): string {
	/**
	 * Normaliza a definição da base, garantindo um array de caracteres únicos.
	 */
	const normalizeBase = (
		base: string | string[],
		name: string,
	): string[] => {
		if (typeof base === 'string') return [...base];
		if (Array.isArray(base)) return [...base];
		throw new TypeError(
			`${name} deve ser uma string ou um array de caracteres únicos.`,
		);
	};

	const fromSymbols = normalizeBase(
		fromBaseSymbols,
		'fromBaseSymbols',
	);
	const toSymbols = normalizeBase(toBaseSymbols, 'toBaseSymbols');

	/**
	 * Verifica duplicações em uma base.
	 */
	const hasDuplicates = (arr: readonly string[]): boolean =>
		new Set(arr).size !== arr.length;

	if (hasDuplicates(fromSymbols))
		throw new Error('A base de origem contém símbolos duplicados.');
	if (hasDuplicates(toSymbols))
		throw new Error('A base de destino contém símbolos duplicados.');

	const fromBase = fromSymbols.length;
	const toBase = toSymbols.length;

	const fromMap = new Map<string, number>(
		fromSymbols.map((sym, i) => [sym, i]),
	);

	// Valida se todos os caracteres da entrada pertencem à base de origem.
	for (const ch of value) {
		if (!fromMap.has(ch)) {
			throw new Error(
				`Caractere '${ch}' não existe na base de origem.`,
			);
		}
	}

	// Converte o valor da base de origem para BigInt.
	let num = 0n;
	for (const ch of value) {
		num = num * BigInt(fromBase) + BigInt(fromMap.get(ch)!);
	}

	// Caso o número seja zero, retorna o primeiro símbolo da base de destino.
	if (num === 0n) return toSymbols[0];

	// Converte o número para a base de destino.
	let result = '';
	while (num > 0n) {
		const remainder = Number(num % BigInt(toBase));
		result = toSymbols[remainder] + result;
		num = num / BigInt(toBase);
	}

	return result;
}

/* -------------------------------------------------------------------------- */
/*                        Definições de alfabetos padrão                       */
/* -------------------------------------------------------------------------- */

/**
 * Alfabeto decimal (base 10)
 */
export const BASE10_ALPHABET = '0123456789';

/**
 * Alfabeto Base32 (RFC 4648)
 * Letras maiúsculas + dígitos 2–7.
 */
export const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

/**
 * Alfabeto Base62 — dígitos + letras maiúsculas + minúsculas.
 */
export const BASE62_ALPHABET =
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Alfabeto Base64 URL-safe (RFC 4648 §5)
 * Substitui '+' por '-' e '/' por '_'.
 */
export const BASE64_URLSAFE_ALPHABET =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/**
 * Alfabeto Base96-like (ASCII imprimível e seguro para URLs)
 * Exclui símbolos potencialmente problemáticos.
 */
export const BASE96_URLSAFE_ALPHABET = (() => {
	const chars: string[] = [];
	for (let i = 33; i <= 126; i++) {
		const ch = String.fromCharCode(i);
		if (!`"'\\<>?%#&+@=\``.includes(ch)) chars.push(ch);
	}
	return chars.join('');
})();

/* -------------------------------------------------------------------------- */
/*                          Funções de conversão padrão                        */
/* -------------------------------------------------------------------------- */

/**
 * Converte de decimal (padrão) para Base32.
 * @param value Valor em base decimal (ou outra base definida).
 * @param fromBaseSymbols Base de origem (padrão: decimal `"0123456789"`).
 * @returns Valor convertido para Base32.
 */
export function convertToBase32(
	value: string,
	fromBaseSymbols: string | string[] = BASE10_ALPHABET,
): string {
	return convertBase(value, fromBaseSymbols, BASE32_ALPHABET);
}

/**
 * Converte de Base32 para decimal (padrão).
 * @param value Valor em Base32.
 * @param toBaseSymbols Base de destino (padrão: decimal `"0123456789"`).
 * @returns Valor convertido para a base destino.
 */
export function convertFromBase32(
	value: string,
	toBaseSymbols: string | string[] = BASE10_ALPHABET,
): string {
	return convertBase(value, BASE32_ALPHABET, toBaseSymbols);
}

/**
 * Converte de decimal (padrão) para Base62.
 */
export function convertToBase62(
	value: string,
	fromBaseSymbols: string | string[] = BASE10_ALPHABET,
): string {
	return convertBase(value, fromBaseSymbols, BASE62_ALPHABET);
}

/**
 * Converte de Base62 para decimal (padrão).
 */
export function convertFromBase62(
	value: string,
	toBaseSymbols: string | string[] = BASE10_ALPHABET,
): string {
	return convertBase(value, BASE62_ALPHABET, toBaseSymbols);
}

/**
 * Converte de decimal (padrão) para Base64 URL-safe.
 */
export function convertToBase64Url(
	value: string,
	fromBaseSymbols: string | string[] = BASE10_ALPHABET,
): string {
	return convertBase(value, fromBaseSymbols, BASE64_URLSAFE_ALPHABET);
}

/**
 * Converte de Base64 URL-safe para decimal (padrão).
 */
export function convertFromBase64Url(
	value: string,
	toBaseSymbols: string | string[] = BASE10_ALPHABET,
): string {
	return convertBase(value, BASE64_URLSAFE_ALPHABET, toBaseSymbols);
}

/**
 * Converte de decimal (padrão) para Base96-like.
 */
export function convertToBase96(
	value: string,
	fromBaseSymbols: string | string[] = BASE10_ALPHABET,
): string {
	return convertBase(value, fromBaseSymbols, BASE96_URLSAFE_ALPHABET);
}

/**
 * Converte de Base96-like para decimal (padrão).
 */
export function convertFromBase96(
	value: string,
	toBaseSymbols: string | string[] = BASE10_ALPHABET,
): string {
	return convertBase(value, BASE96_URLSAFE_ALPHABET, toBaseSymbols);
}

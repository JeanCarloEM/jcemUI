/**
 * NavIcon — Barra de Navegação, Menu ou Toolbar.
 *
 * @description
 * Contêiner de botões (`ButtonX`) e menus (`MenuX`), utilizado para construir barras
 * de navegação verticais, horizontais, toolbars ou menus suspensos.
 * É um componente fundamental na composição de `PageZone` e `HeaderBar`.
 *
 * @structure
 * Layout geral:
 * ```
 * [NavIcon]
 *  ├── [input:radio]? (opcional, controle de estado se menuId estiver presente)
 *  └── [div.wrapper]
 *       └── [ul]
 *            ├── [ButtonX | MenuX]*
 * ```
 *
 * @integration
 * - Compatível com:
 *   • `PageZone`
 *   • `HeaderBar`
 *   • `MenuX`
 *   • `FootZone`
 * - Pode funcionar como:
 *   • Toolbar
 *   • Menu suspenso
 *   • Menu lateral
 *   • Barra horizontal
 *
 * @layout
 * - Orientação:
 *   • `vertical` (padrão)
 *   • `horizontal`
 * - Comportamento (`behavior`):
 *   • `toolbar` (default)
 *   • `menu` (menu flutuante, dropdown)
 *   • `header` (integrado ao HeaderBar)
 * - Classes:
 *   • Wrapper: `inav-jcem-{escopo}`
 *   • Itens (ul): flexível, configurável via `ulClass`
 * - Responsivo e adaptável ao contexto.
 * - Largura/altura conforme do modo (horizontal/vertical):
 *   • full: `100%` do espaço disponível.
 *   • fixa: definida arbitratiamente (mas responsiva).
 *   • minima: ajusta ao conteúdo.
 * - Overflow: Nunca usa scrollbar → cria submenus ou colapsa.
 *
 * @behavior
 * - Prioridades:
 *   1. Acessibilidade (aria-label quando aplicável)
 *   2. Consistência visual (estados :hover, :active , ..., via CSS)
 *   3. Performance (zero JS para estado/animações/transições)
 * - Suporte a controle de abertura/fechamento por `input:radio`.
 * - Abertura baseada em `menuId` + `checked`.
 * - Suporte a controle externo (`opened`).
 * - Sincroniza estado via `data-*` e `peer-checked`.
 * - Permite nesting ilimitado com `MenuX`.
 *
 * @props
 * - `itens`: array de `ButtonX` ou `MenuX`.
 * - `escopo`: string (define o namespace dos dados e classes).
 * - `menuId`: string (id opcional para controle por input:radio).
 * - `opened`: boolean (força estado aberto/fechado).
 * - `orientation`: 'vertical' | 'horizontal'.
 * - `behavior`: 'toolbar' | 'menu' | 'header'.
 * - `ulClass`: classes aplicadas ao ul (lista dos itens).
 * - `wrapperClass`: classes aplicadas ao wrapper principal.
 * - `className`: classes adicionais ao wrapper principal.
 *
 * @style
 * - Arquitetura CSS:
 *   • DaisyUI + Tailwind Variants + Tailwind Merge + clsx
 *   • Wrapper: `inav-jcem-wrapper`.
 *   • Escopo: classes `inav-jcem-wrapper-{escopo}`.
 * - Composição segura com `tailwind-merge` e `clsx`
 * - Customização:
 *   • Classes podem ser sobrescritas
 * - Estados:
 *   • Controlados via data-attributes e pseudo-classes
 *   • Transições CSS-only
 *
 * @development
 * - Gera ids únicos via `guid()`.
 * - Mantém consistência total com `ButtonX` e `MenuX`.
 * - Usa helper `resolveClassName()` para tratamento de classes.
 * - Boas práticas:
 *   • Mensagens de log/warn/error via Logger
 *   • Manutenção git-friendly (evitar breaking changes)
 *   • Comentários objetivos para mudanças complexas
 *   • Manter esta documentação no topo código com ajustes mínimos pertinentes
 *   • Comentário de uma única linha preferíveis, exceto quando para jsDoc
 *
 * @dependencies
 * - Preact + Vite (core)
 * - ButtonX (botão principal)
 * - NavIcon (container dos itens)
 * - tailwind-variants + tailwind-merge + clsx
 *
 * @see {@link ButtonX}
 * @see {@link MenuX}
 */

import { ButtonX, TButtonX } from '../ButtonX/ButtonX';
import { JSX } from 'preact';
import { guid } from '@mod/jcemTS/src/ts/common/generic';
import { useRef } from 'preact/hooks';
import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';
import { IMenuX, MenuX } from '../MenuX/MenuX';
import {
	HTML_TAGS,
	HtmlTag,
	resolveClassName,
	TItemX,
} from '@mod/jcemTS/src/ts/common/ui';
import { isTrue } from '@mod/jcemTS/src/ts/common/logicos';

/** Type guard para diferenciar MenuX */
function isMenu(
	item: TItemX,
): item is Extract<TItemX, { kind: 'menu' }> {
	return item.kind === 'menu' || 'itens' in item;
}

export const Button = (props: Omit<TButtonX, 'kind'>): TItemX =>
	({
		...props,
		kind: 'button',
	}) as TItemX;

export const Menu = (props: Omit<IMenuX, 'kind'>): TItemX =>
	({
		...props,
		kind: 'menu',
	}) as TItemX;

/** Props do NavIcon */
export interface INavIcon
	extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'className'> {
	itens: TItemX[];
	escopo?: string;
	menuId?: string;
	ulClass?: string | (() => string);
	wrapperClass?: string | (() => string);
	opened?: boolean;
	orientation?: 'vertical' | 'horizontal';
	behavior?: 'toolbar' | 'menu' | 'header';
	className?: string | (() => string);
	as?: any;
	compact?: boolean;
	collapsible?: boolean;
}

/** Variantes visuais */
const navIconVariants = tv({
	slots: {
		aside: 'inav-jcem transition-all duration-200',
		ul: '',
		li: '',
	},
	variants: {
		behavior: {
			toolbar: {
				aside: 'bg-base-100 rounded-lg p-1',
				ul: 'flex',
				li: 'w-full',
			},
			menu: {
				aside: 'absolute z-50',
				ul: 'menu bg-base-100 p-2 rounded-box',
				li: '',
			},
			header: {
				aside: 'flex items-center',
				ul: 'flex',
				li: '',
			},
		},
		orientation: {
			vertical: {
				aside: 'flex flex-col',
				ul: 'flex flex-col gap-1 w-full',
				li: 'w-full',
			},
			horizontal: {
				aside: 'flex flex-row',
				ul: 'flex flex-row gap-2 items-center',
				li: '',
			},
		},
		opened: {
			true: {
				aside: 'opacity-100 visible',
			},
			false: {
				aside: 'opacity-0 invisible absolute',
			},
		},
		compact: {
			true: {
				aside: 'menu-compact',
				ul: 'gap-0',
				li: '[&_.btn]:justify-center [&_.btn]:px-2',
			},
			false: {
				aside: '',
				ul: '',
				li: '',
			},
		},
		collapsible: {
			true: {
				aside: 'overflow-hidden',
				ul: 'transition-all duration-300',
			},
			false: {
				aside: '',
				ul: '',
			},
		},
	},
	defaultVariants: {
		behavior: 'toolbar',
		orientation: 'vertical',
		opened: true,
		compact: false,
		collapsible: false,
	},
});

/** 🔥 Componente NavIcon */
export function NavIcon<T extends HtmlTag>({
	as = `div`,
	menuId,
	escopo = 'global_menu',
	itens,
	ulClass,
	wrapperClass,
	opened = true,
	orientation = 'vertical',
	behavior = 'toolbar',
	className,
	compact = false,
	collapsible = false,
	...props
}: INavIcon) {
	const Tag = HTML_TAGS.includes(as) ? as : 'section';
	const cid = useRef(menuId ?? `inav-${guid(18)}`).current;

	const { aside, ul, li } = navIconVariants({
		behavior,
		orientation,
		opened: isTrue(opened),
		compact: isTrue(compact),
		collapsible: isTrue(collapsible),
	});

	/** Renderiza cada item */
	const renderItem = (item: TItemX, idx: number) => {
		const commonProps = {
			key: `${cid}-item-${idx}`,
			className: twMerge(
				li(),
				'w-full text-left flex items-center',
				collapsible && 'peer-checked/compact:[&>span]:hidden',
				resolveClassName(item.className),
			),
			...(collapsible && { 'data-collapsable': '' }),
		};

		const content =
			isMenu(item) ?
				<MenuX
					{...commonProps}
					{...item}
					variant={
						orientation === 'horizontal' ? 'horizontal' : 'dropdown'
					}
				/>
			:	<ButtonX {...commonProps} {...(item as TButtonX)} />;

		return (
			<li key={`${cid}-li-${idx}`} className={li()}>
				{content}
			</li>
		);
	};

	return (
		<>
			{menuId && (
				<input
					type="radio"
					name={escopo}
					id={cid}
					className="hidden peer"
					checked={isTrue(opened)}
				/>
			)}

			{collapsible && (
				<input
					type="checkbox"
					id={`${cid}-compact`}
					className="hidden peer/compact"
					checked={isTrue(compact)}
				/>
			)}

			<Tag
				{...(menuId ? { 'data-menu': cid } : { 'data-inav': cid })}
				{...props}
				className={twMerge(
					aside(),
					collapsible && 'peer',
					`inav-jcem-${escopo}`,
					resolveClassName(wrapperClass),
					resolveClassName(className),
				)}
				data-navicon={cid}
			>
				<ul
					className={twMerge(
						ul(),
						collapsible && 'peer-checked/compact:[&_.btn]:px-3',
						resolveClassName(ulClass),
					)}
				>
					{itens.map(renderItem)}
				</ul>
			</Tag>
		</>
	);
}

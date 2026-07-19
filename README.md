# jcemUI — layout global componível para dashboards

jcemUI é uma biblioteca de estrutura de layout autoaninhável para dashboards e subaplicativos. O núcleo deve ser consumível sem framework ou bundler; integrações com Vite, React, Preact, Zag.js, Font Awesome e Web Awesome são adaptadores/providers opcionais.

O contrato normativo completo está em [RCF.md](RCF.md). O estado das evoluções incrementais está em [handoff.md](handoff.md). Este README apresenta a arquitetura sem substituir essas fontes.

`assets/ui.svg` é a fonte autoritativa da arquitetura visual idealizada e integra o contrato dos cabeçalhos TS/TSX consolidados no RCF.

<img src="assets/ui.svg" alt="Diagrama Layout" style="max-height:30vh;">

## 🔷 Arquitetura Geral

### Componentes

- ButtonX
- ContentWrapper
- EnclosureContent
- FooterZone
- HeaderBar
- HeaderZone
- MenuX
- NavIcon
- PageZone

### Hierarquia geral

```
[PageZone]
├── (HeaderZone)  // Pelo menos um destes ↓ deve existir (AnyComponent* ou HeaderBar*)
│     ├── (AnyComponent*) // stack
│     └── (HeaderBar*)  //^2
│           ├── [LeftZone] //^3
│           │     ├── (breadcrumbs*) //^2
│           │     ├── (AnyComponents*) //^2
│           │     └── (ButtonX+/MenuX+)  //^1
│           ├── [MiddleZone] //^3
│           │     ├── (breadcrumbs*) //^2
│           │     ├── (AnyComponents*) //^2
│           │     └── (ButtonX+/MenuX+)  //^1
│           └── [RightZone] //^3
│                 ├── (breadcrumbs*) //^2
│                 ├── (AnyComponents*) //^2
│                 └── (ButtonX+/MenuX+)  //^1
├── EnclosureContent
│   ├── (NavIcon)  // left
│   │     └── [ButtonX+]
│   ├── ContentWrapper   [obrigatório]
│   │    └── (PageZone) ^ [AnyComponent+]  // XOR
│   └── (NavIcon) // right
│         └── [ButtonX+]
└── (FooterZone)
      └── [AnyComponent+]  //#2
```

### Em designer ASCII:

```
+----------------------------------+
| [PageZone]                       |
| ╔══════════════════════════════╗ |
| ║ [HeaderZone]                 ║ |
| ║ • [AnyComponent*] (V)        ║ |
| ║ • [HeaderBar*]:              ║ |
| ║   > [LftZ][MidZ][RgtZ]       ║ |
| ║   >> [ButonX*]/[MenuX*]...   ║ |
| ╚══════════════════════════════╝ |
| ╔══════════════════════════════╗ |
| ║ [EnclosureContent]           ║ |
| ║┌─────┐ +────────────+ ┌─────┐║ |
| ║│[NAV]│ |[ContentWr] │ │[NAV]│║ |
| ║│ •BX │ | •(PageZ)^  │ │ •BX │║ |
| ║│ •BX │ | •[AnyComp+]│ │ •BX │║ |
| ║└─────┘ +────────────+ └─────┘║ |
| ╚══════════════════════════════╝ |
| ╔══════════════════════════════╗ |
| ║ [FooterZone]                 ║ |
| ║ • [AnyComponent+] (V)        ║ |
| ╚══════════════════════════════╝ |
+----------------------------------+
```

### Legenda:

- (A): componente não obrigatório
- [A]: exatamente 1 elemento do tipo A
- [A+]: 1+ elementos (obrigatório)
- [A*]: 0+ elementos (opcional)
- [A/B] ou [A] / [B]: OR (pode ter A, B ou ambos)
- [A^B] ou [A] ^ [B]: XOR (apenas A ou apenas B)
- [AnyComponent]: qualquer componente válido
- [breadcrumbs]: breadcrumb navigation, elemento de navegação contextual em sites e aplicativos.
- //#1: ButtonX/MenuX não podem aparecer sequencialmente fora de NavIcon
- //#2: Componentes empilhados verticalmente
- //#3: empilhados horizontalmente — ocupam, juntos, toda a área horizontal

### Fluxograma de Composição

```mermaid
graph LR
  %% Nó raiz
  P([PageZone])

  %% Subgrupos
  subgraph HeaderZone
      H[HeaderZone]
      T[HeaderBar]
      L[Left Zone]
      M[Middle Zone]
      R[Right Zone]
  end

  subgraph EnclosureContent
      E[EnclosureContent]
      N[Navicon]
      C[ContentWrapper]
  end

  A[AnyContent]

  subgraph Actions
      B[ButtonX]
      X[MenuX]
  end

  F[FootZone]

  %% Hubs invisíveis
  Hub[" "]
  Hub2[" "]

  %% Ligações principais
  P --> H
  P --> E
  P --> F

  %% Header detalhado
  H --> T
  T --> L
  T --> M
  T --> R

  %% EnclosureContent detalhado
  E --> N
  E --> C
  C --> A
  C -.-> P

  N --> Hub2
  Hub2 --> B
  Hub2 --> X

  %% Footer
  F --> A

  %% Convergência única (L, M, R → Hub → A, X, B)
  L --> Hub
  M --> Hub
  R --> Hub
  Hub --> A
  Hub --> X
  Hub --> B
```

## Desenvolvimento

### 🔍 Overflow

- Nenhum componente **usa scroll**.
- Overflow tratado com submenus ou agrupamentos de forma automática pelo próprio componente.

### Estilos

- Efeitos, transições e estados estruturais priorizam CSS/Sass e APIs nativas.
- Estados controlados via CSS puro (`input`, `:checked`, `:has`, `data-*`, `:focus`,...).
- DaisyUI/Tailwind constituem o perfil atual da demo e não são dependências obrigatórias do núcleo.

### Ícones

- Font Awesome e Web Awesome são providers opcionais e substituíveis.
- O perfil atual usa `@fortawesome/react-fontawesome` no adaptador Preact.
- Ícone fornecido como string deve ser normalizado; formato inválido gera `Logger.warn` em desenvolvimento.
- Build local incorpora somente ícones e estilos efetivamente usados.

### Boas práticas

- Mensagens de log/warn/error via `Logger`
- Manutenção git-friendly (evitar breaking changes)
- Comentários
  - Comentários objetivos para mudanças complexas
  - Comentários de uma única linha são preferíveis, exceto quando para jsDoc
  - Manter a documentação jsDoc do topo do código com ajustes mínimos e pontuais quando necessário
- Todos os componentes permitem sobrescrever estilos por classes/tokens do contrato público.
- Acessibilidade (aria-label quando aplicável)
- Performance (zero JS para estado/animações/transições)
- O perfil atual usa `resolveClassName()` para remover duplicidade e resolver conflitos de classes.
- Layout otimizado para modularidade, performance e clareza de estados

### Perfil atual de desenvolvimento e demo

- DaisyUI
- tailwind-merge
- tailwind-variants
- clsx
- TSX
- Preact
- Vite
- TypeScript
- @fortawesome/react-fontawesome

Esse perfil não define dependências obrigatórias do produto. A evolução normativa está dividida em FT-002 (núcleo/adaptadores), FT-003 (build/distribuição seletivos) e FT-004 (demo/Pages).

### Comandos canônicos

- `npm run dev-live`: ambiente local configurado.
- `npm run build`: build orquestrado.
- `npm run check`: validação integrada.
- `npm run agent:rcf`: validação da presença/estrutura do RCF.
- `npm run agent:handoff`: regeneração de `handoff.md` a partir de `.agents/continue.ia`.

## Autoria

JeanCarloEM.

## Repositório

<https://github.com/JeanCarloEM/jcemUI>

## Licença

Mozilla Public License 2.0 — consulte [LICENSE](LICENSE).

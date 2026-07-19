# Diagnóstico e roadmap de adequação ao RCF e ao AGENTS.md

## 1. Escopo e estado de referência

Este artefato registra exclusivamente análise e planejamento. Nenhuma alteração funcional, reorganização física, correção de build ou implementação de componente integra esta etapa.

- Data de referência: `2026-07-19`.
- Branch analisada: `dev`.
- Commit inicial: `1b3f746` (`docs: normatiza matriz de compatibilidade`).
- Estado inicial: árvore limpa; `dev` dois commits à frente de `origin/dev`.
- Fontes de autoridade: `AGENTS.md` e associados para o método; `RCF.md` para produto/arquitetura; `assets/ui.svg` para a geometria esquelética; `README.md`, código, configuração, scripts e histórico como evidências subordinadas.
- Cenários aplicáveis: `WEB-BROWSER=true`, `WEB-STATIC=true`, `WEB-EDITORIAL=false`.

O inventário versionado contém 79 entradas: 20 TSX, 9 TS, 26 SCSS, 9 JSON, 4 Markdown, 1 CSS, 1 HTML, 1 JavaScript e 1 SVG, além de arquivos operacionais. Não há teste versionado nem workflow em `.github/workflows/`.

## 2. Arquitetura atual observada

### 2.1 Organização física

| Área | Estado atual | Papel real observado |
| --- | --- | --- |
| raiz | RCF, README, manifests, Vite, scripts e governança | mistura documentação normativa, automação transversal e configuração específica da demo |
| `src/scripts/components/` | nove componentes TSX e estilos locais | implementação Preact diretamente acoplada a Tailwind/DaisyUI, Font Awesome e `jcemTS` |
| `src/scripts/tsx/` | entrypoint e componentes de exemplo | aplicação de demonstração Preact, parcialmente duplicada e com arquivos não alcançados pelo entrypoint principal |
| `src/scss/` | tokens, temas, estilos globais e legado de layout | duas estratégias temáticas concorrentes e imports/caminhos inconsistentes |
| `scripts/` | injeção Sass, índices de tipos, ícones e import map | ferramentas Vite/cwd-dependentes, com escrita em `src/__generated__/` |
| `config/` | `core.json` e schema gerenciados | configuração da governança; não existe manifesto versionado do produto jcemUI |
| `modules/jcemTS` | gitlink e cópia de trabalho local | utilitários importados pelo jcemUI e, simultaneamente, imports de retorno para componentes do jcemUI |
| `assets/ui.svg` | SVG A4 versionado | fonte autoritativa do esqueleto visual |
| `.agents/` | núcleo gerenciado, estado e arquivos locais ignorados | governança ativa v0.0.18 mais extensões herdadas de blog/Jekyll incompatíveis com o produto |

### 2.2 Contrato visual autoritativo

O SVG foi lido integralmente. Sua geometria confirma:

1. `PageZone` como raiz vertical;
2. `HeaderZone` como pilha de componentes livres e `HeaderBar`;
3. `HeaderBar` dividido em `LeftZone`, `MiddleZone` e `RightZone`;
4. cada subárea aceitando componente comum, `NavIcon`, `ButtonX` ou `MenuX`;
5. `EnclosureContent` horizontal com `ContentWrapper` central obrigatório;
6. `NavIcon` lateral esquerdo e direito, cada qual com vista expandida e recolhida;
7. `ButtonX/MenuX` no formato ícone–rótulo–ícone quando expandido e ícone quando recolhido;
8. `FooterZone` como pilha final de componentes.

O RCF representa adequadamente essa estrutura. A implementação atual cobre parte da forma, mas não comprova preservação das três zonas vazias, nesting isolado, estados expandidos/recolhidos, composição vanilla nem equivalência entre adaptadores.

### 2.3 Contratos públicos atuais

Os exports observáveis estão dispersos por arquivo: `ButtonX`, `ContentWrapper`, `EnclosureContent`, `FooterZone`, `HeaderBar`, `HeaderZone`, `MenuX`, `NavIcon`, `PageZone`, `SectionWrapperBase`, seus tipos e as factories `Button`/`Menu`. Não existe entrypoint público, barrel, `exports`, `types`, `files`, `sideEffects` ou classificação `core|adapter|provider|theme|utility` no pacote.

As props públicas expõem diretamente tipos de Preact, Font Awesome e Tailwind Variants. Assim, o conjunto atual é um adaptador Preact incompleto, não o núcleo framework-agnostic definido pelo RCF.

## 3. Matriz de aderência

| Domínio | Situação | Evidência | Impacto | FT de correção |
| --- | --- | --- | --- | --- |
| SSOT normativa | parcialmente conforme | RCF e README já normatizam WebAwesome, ZagJS, matriz com/sem e perfis oficiais | implementação ainda não materializa o contrato | FT-038 e FT-040, após as FTs técnicas |
| núcleo portátil | não conforme | todos os componentes TSX importam Preact; ButtonX importa Font Awesome; vários importam Tailwind Variants/Merge | consumo vanilla e ausência de opcionais são impossíveis | FT-002, FT-013 a FT-016 |
| adapters/providers | ausentes ou incorporados ao componente | não há entradas React, Preact, ZagJS, WebAwesome, DaisyUI ou Font Awesome independentes | dependência arquitetural e bundle não seletivo | FT-017 a FT-023 |
| configuração de produto | ausente | somente `config/core.json`, gerenciado pela governança | providers, hooks, targets e precedência não são configuráveis | FT-012 |
| extensão/hook comum | não conforme | `InjectionHooks.ts` é plugin Vite e usa paths/cwd fixos | consumidor sem Vite não dispõe do contrato | FT-012 e FT-019 |
| raízes | não conforme | demo e biblioteca dividem `src/`; scripts gravam índices em `src/__generated__` | vazamento, acoplamento e build residual | FT-010 |
| dependência compartilhada | não conforme | `jcemUI -> jcemTS` e `jcemTS -> @ext/*` | ciclo entre biblioteca e submódulo, baixa portabilidade | FT-011 |
| pacote NPM | não conforme | nome `preact-tsx-scss-template`, licença/metadados/exports ausentes, 40 devDependencies, lock ignorado | pacote não publicável nem reprodutível | FT-024, FT-025 e FT-033 |
| build | não conforme | build Vite falha ao executar `tsx`; apenas `dist/www` está configurado | não existem `lib`, `adapters`, `bundle` ou `offline` | FT-003, FT-026, FT-028 e FT-030 |
| transpilação seletiva | não comprovada | Font Awesome está importado no componente; gerador usa heurística textual; side effects não declarados | inclusão excessiva ou asset ausente | FT-020, FT-028 e FT-003 |
| estilos/temas | não conforme | Tailwind/DaisyUI aparecem no runtime atual; duas estratégias temáticas; imports Sass quebrados | ausência de DaisyUI não é suportada; tema não é determinístico | FT-015 e FT-023 |
| interação/acessibilidade | não conforme | `label` como ação, inputs controlados sem contrato, ausência de `aria-expanded`/`aria-controls`, foco não testado | menus e botões não atendem o RCF | FT-016 e FT-027 |
| esqueleto SVG | parcialmente implementado | componentes existem, mas zonas vazias são omitidas e não há fixture canônica | geometria e composição não são verificáveis | FT-013, FT-014, FT-004 e FT-032 |
| testes | não conforme | zero testes versionados; `test/.setup.ts` inexistente | nenhuma regra funcional está protegida | FT-006, FT-027 e FT-032 |
| qualidade operacional | não conforme | `agent:typecheck`/`agent:lint` informam `scripts:0`; TypeScript real falha | falso positivo de qualidade | FT-009 e FT-026 |
| cabeçalhos/licenças | não conforme | 58 arquivos comentáveis analisados sem cabeçalho de autoria/licença | viola AGENTS §12 e RCF §6.4 | FT-037 |
| demo | não conforme | uma tela Preact, sem matriz, alternância de tema ou cobertura do SVG | não demonstra o produto declarado | FT-004 |
| Pages/CI | ausente | CNAME existe, mas não há workflow nem artefato publicado versionado | publicação e validação remota inexistentes | FT-035 e FT-036 |
| release | não operacional para o produto | `release.yml` configurado, porém inexistente; sem pacote real/versão/tags | não há ciclo publicável rastreável | FT-039 |
| governança local | não conforme | arquivos ignorados `agents.local.md`, `webPageLike.md` e `.autoupdate.md` preservam regras Jekyll/blog legadas | contexto operacional contraditório | FT-008 |
| validação governada | bloqueada | `npm run check` para em `CABECALHO_CODIGO_INVALIDO:.agents/core/runtime/scripts/archive.js` | gate global não alcança o produto | FT-009, pela via upstream |

## 4. Inconsistências e dívida técnica detalhadas

### 4.1 Críticas

- O comando de typecheck governado não executa TypeScript do produto. A execução direta filtrada encontrou 15 erros, incluindo aliases `@ext` sem resolução, exports ausentes do submódulo e índice gerado apontando para `src/scripts/ts/common/evalTypes`, que não existe.
- Build e Vitest carregam `vite.config.ts`, que chama `execSync('tsx ...')`; no Windows, o executável não é resolvido nesse contexto e ambos encerram antes de compilar ou descobrir testes.
- `npm run check` e `npm run agent:test` encerram no validador gerenciado de cabeçalho. A correção não pode editar `.agents/core` nem inferir metadados do upstream; exige atualização/contribuição upstream formal.
- Não há núcleo, manifesto de produto, entrypoint de biblioteca, distribuição ou teste de ausência de integrações opcionais.
- O pacote ignora `package-lock.json`, não declara licença em `package.json` e não possui identidade jcemUI.

### 4.2 Arquitetura e API

- `PageZone` muta objetos `left` e `right` recebidos, removendo `className`; também possui expressão de precedência incorreta ao compor classes laterais.
- `ContentWrapper` ignora a `className` recebida e injeta o literal `contentwrapper-jcem-className`.
- `HeaderBar` omite completamente uma zona vazia, enquanto o contrato visual exige preservação lógica das três regiões.
- `HeaderZone` procura `HeaderBar.displayName`, mas `HeaderBar` não define esse valor; o aviso estrutural tende a ser incorreto.
- `ButtonX` renderiza ação como `label`, vincula estado por `htmlFor` e acopla o provider Font Awesome ao componente base.
- `MenuX`/`NavIcon` não expõem contrato completo de foco, teclado, controlador/painel e estado acessível. Inputs recebem `checked` sem um contrato consistente de controle/mutação.
- A demo secundária contém imports/tipos inexistentes ou não usados, como `TNavItem`, e props declaradas na documentação que não são renderizadas.
- A API não possui política de alias, versão, depreciação nem teste de seletores e atributos públicos.

### 4.3 Estilos, assets e temas

- `main.scss` contém `overflow-y: auto` em navegação lateral, contrário à regra de não criar scroll interno como solução padrão.
- Existem tokens em `_themes.scss` e outro gerador em `global/_variables.scss`; as duas fontes não convergem para um contrato único.
- Arquivos `src/scss/main/*.scss` importam `@scss/_variables`, que não existe na raiz indicada.
- Skins `_dark.scss` e `_red.scss` definem `background-color`, mas o mapa default usa `background`; a geração de IDs não produz contrato temático coerente.
- `ButtonX.scss` importa caminhos inexistentes (`src/scss/variables` e `src/scss/common`).
- `main.scss` carrega Google Fonts por URL fixa, sem manifesto, política de CDN/offline ou fallback de target.
- Vários estilos de componente estão vazios; Tailwind/DaisyUI carregam a responsabilidade real, impedindo o cenário sem essas integrações.

### 4.4 Scripts, configuração e automação

- `vite.config.ts` e `vite.merged.config.ts` duplicam quase toda a configuração, com variações divergentes de transformação.
- Scripts e hooks usam `process.cwd()` e paths fixos; o contrato não recebe roots/configuração como entrada.
- `genImportMap.ts` contém `src/scrtips/tsx` no destino gerado e assume diretórios que não existem.
- `generate-type-metadata.ts` procura `src/scripts/ts`, mas os tipos úteis estão no submódulo; o índice gerado fica inválido.
- `generate-fontawesome.ts` depende de regex textual limitada e não define tratamento determinístico para referência dinâmica.
- `tailwind.config.js` usa `require(daisyui)` sem string/import válido.
- scripts `lint`, `scss` e `pretty` apontam para paths ou extensões incorretos; ESLint nem sequer está instalado.
- `dev-live` possui configuração central, mas o comando genérico ainda não demonstra repasse efetivo de host/porta para Vite.
- `.gitmodules` mantém entrada histórica `vendor/tsJCEM` sem gitlink correspondente.

### 4.5 Dependências

Dependências obrigatórias do runtime ainda não são classificadas, pois tudo está em `devDependencies`. Candidatos a remoção ou justificativa antes de qualquer atualização de versão:

- `path`: duplica módulo nativo do Node;
- `esm`, `ts-node`, `ts-patch`, `reflect-metadata` e `@preact/signals-core`: sem uso comprovado no código versionado da raiz;
- `@vitejs/plugin-react`: não há adapter/configuração React atual;
- `happy-dom` e `jsdom`: ambientes concorrentes, sem testes;
- `@testing-library/jest-dom`, `@testing-library/preact`, `@types/jest`, `@vitest/ui` e cobertura: instalados sem suíte versionada;
- pacotes completos de ícones Font Awesome: necessários apenas ao perfil/demo atual e proibidos como dependência silenciosa do núcleo.

Nenhum item deve ser removido por inferência. FT-024 e FT-026 comprovarão uso, target e substituição antes da mudança.

### 4.6 Duplicações e centralizações necessárias

- consolidar Vite em fábrica/configuração comum com targets declarados;
- consolidar tokens/temas em Sass + Custom Properties e adapters visuais separados;
- centralizar metadata de pacote, autoria, licença, roots, targets, providers e hooks em manifests versionados;
- substituir JSDoc estrutural repetido por referência ao RCF, preservando apenas contrato específico do componente;
- compartilhar fixtures entre unidade, compatibilidade, visual e demo;
- tornar logger, validação de composição, escopo/IDs e renderização de ícones serviços do core, sem framework.

## 5. Arquitetura-alvo planejada

A estrutura física abaixo é proposta de migração, não autorização para movimentação nesta etapa:

```text
src/
├─ core/                 # DOM, composição, estado nativo, contratos e tipos neutros
├─ components/           # modelos/estilos framework-agnostic por componente
├─ adapters/
│  ├─ preact/
│  ├─ react/
│  ├─ vite/
│  └─ zagjs/
├─ providers/
│  ├─ icons/
│  │  ├─ fallback/
│  │  └─ fontawesome/
│  └─ primitives/
│     └─ webawesome/
├─ integrations/
│  └─ daisyui/
├─ themes/               # Sass fonte e Custom Properties públicas
└─ index.ts              # core somente
demo/                    # shell e casos compartilhados; não integra o pacote
fixtures/                # casos canônicos independentes de framework
tests/
├─ unit/
├─ integration/
├─ compatibility/
├─ visual/
└─ consumers/
config/
├─ core.json             # governança, preservado
├─ jcemui.json            # produto
├─ jcemui.schema.json
└─ targets/*.json
scripts/                 # orquestração portátil, sem negócio duplicado
dist/
├─ lib/
├─ adapters/
├─ www/
├─ bundle/
└─ offline/
```

Princípios de migração:

1. extrair contratos neutros antes de mover JSX;
2. preservar exports/seletores existentes por adapters e aliases versionados;
3. migrar um componente vertical por vez (`SectionWrapperBase` → zonas → ações → composição);
4. introduzir teste caracterizador antes de corrigir comportamento observável;
5. provar o cenário sem integração antes de habilitar o adapter correspondente;
6. gerar cada target em diretório limpo e independente;
7. não publicar NPM/Pages nem convergir `main` antes do aceite global.

## 6. Fases e dependências

| Fase | Objetivo | FTs | Gate de saída |
| --- | --- | --- | --- |
| 0 — planejamento | baseline, diagnóstico, roadmap e estado | FT-007 | artefatos documentais commitados e publicados em `dev` |
| 1 — governança e fundação | eliminar contexto incompatível, desbloquear gates, separar roots e configuração | FT-008 a FT-012, FT-024, FT-026 e FT-037 | `check`, typecheck e lint reais; raiz/configuração explícitas; árvore limpa |
| 2 — núcleo portátil | API neutra, DOM, composição, temas e acessibilidade | FT-002, FT-013 a FT-016 | core executável sem framework/bundler/opcionais |
| 3 — integrações opcionais | adapters/providers isolados | FT-017 a FT-023 | cada integração funciona com instalação própria e ausência comprovada |
| 4 — distribuição | entrypoints, indexadores e targets seletivos | FT-025, FT-028, FT-003 e FT-030 | tarball/targets limpos, tree-shakable e reprodutíveis |
| 5 — validação | matriz, unidade, consumidores, visual e CI | FT-006, FT-027, FT-032, FT-033 e FT-036 | matriz independente verde sem resolução transitiva acidental |
| 6 — demonstração e publicação | demo canônica, Pages e documentação | FT-004, FT-035 e FT-038 | demo e Pages equivalentes aos fixtures, README coerente |
| 7 — release e convergência | processo de release e aceite global | FT-039 e FT-040 | todos os critérios do RCF §12; `dev` apto a convergir à primária |

## 7. Catálogo completo de FTs

| FT | Prioridade | Objetivo único | Dependências | Critério de conclusão resumido |
| --- | --- | --- | --- | --- |
| FT-002 | P0 | definir API e fronteira do core neutro | FT-011, FT-012 | contrato público classificado, sem tipo obrigatório de integração |
| FT-003 | P0 | orquestrar targets seletivos declarados | FT-025, FT-028, FT-037 | `lib/adapters/www/bundle/offline` independentes, limpos e medidos |
| FT-004 | P1 | implementar demo canônica sobre fixtures comuns | FT-003, FT-017–FT-023, FT-032 | cobertura integral do SVG, temas e casos do RCF §7 |
| FT-006 | P0 | criar infraestrutura executável da matriz de compatibilidade | FT-002, FT-012, FT-026 | cenários isolados por manifesto e instalação independente |
| FT-007 | P0 | registrar diagnóstico e roadmap | nenhuma | este documento, estado, handoff, commit e push sem código funcional |
| FT-008 | P0 | sanear extensões locais de governança | FT-007 | regras Jekyll/blog legadas removidas ou isoladas sem editar o core gerenciado |
| FT-009 | P0 | desbloquear validação gerenciada pela via upstream | FT-008 | `agent:verify` alcança o produto sem patch local em `.agents/core` |
| FT-010 | P0 | separar raízes de biblioteca, demo, fixture, teste e artefato | FT-009 | mapa físico versionado e migração sem quebra de import público |
| FT-011 | P0 | resolver fronteira e ciclo do submódulo `jcemTS` | FT-010 | dependência unidirecional, versão/commit explícito e clone reproduzível |
| FT-012 | P0 | materializar manifesto/schema do produto e hooks comuns | FT-010 | providers, targets, URLs, assets, tema, validação e hooks configuráveis sem Vite |
| FT-013 | P0 | implementar esqueleto DOM/Vanilla do SVG | FT-002 | PageZone, zonas e wrappers funcionam em JS/TS vanilla |
| FT-014 | P0 | implementar validação de composição, nesting e escopo | FT-013 | ordem/XOR/IDs/herança validados sem mutar entrada |
| FT-015 | P0 | consolidar Sass, tokens e temas neutros | FT-013 | CSS mínimo claro/escuro sem Tailwind/DaisyUI e sem fonte externa obrigatória |
| FT-016 | P0 | implementar interação nativa e acessibilidade do core | FT-014, FT-015 | teclado, foco, nomes, estados, redução de movimento e fallback nativo aprovados |
| FT-017 | P1 | implementar adapter Preact | FT-016 | equivalência DOM/API e peer opcional comprovados |
| FT-018 | P1 | implementar adapter React | FT-016 | equivalência DOM/API e peer opcional comprovados |
| FT-019 | P1 | implementar ponte Vite para hooks/targets comuns | FT-012, FT-017, FT-018 | Vite opcional, sem lógica exclusiva nem tipo no core |
| FT-020 | P1 | implementar provider de ícones e Font Awesome seletivo | FT-016 | fallback acessível, manual e Font Awesome independentes |
| FT-021 | P1 | implementar provider WebAwesome | FT-016 | primitives com e sem WebAwesome, sem dependência no core |
| FT-022 | P1 | implementar adapter ZagJS | FT-016 | estado básico nativo e aprimoramento ZagJS equivalentes |
| FT-023 | P1 | implementar integração DaisyUI/Tailwind | FT-015 | visual opcional sem alterar o mínimo funcional/estilístico |
| FT-024 | P0 | corrigir identidade, dependências e lock do pacote | FT-010 | nome/licença/repositório/versão reais; dependências justificadas; lock versionado |
| FT-025 | P1 | publicar entrypoints, tipos, peers e exports condicionais | FT-017–FT-023, FT-024 | entradas classificadas e importáveis sem adapter não selecionado |
| FT-026 | P0 | tornar scripts e gates reais e multiplataforma | FT-009, FT-010, FT-024 | Windows/Linux executam lint, typecheck, test e build sem falso positivo |
| FT-027 | P0 | criar testes unitários e de componente | FT-016, FT-026 | composição, props, aliases, classes, hooks, erros e a11y protegidos |
| FT-028 | P1 | tornar indexadores seletivos e determinísticos | FT-020, FT-025, FT-026 | ícones/tipos/import map por roots declarados, sem escrita em fonte manual |
| FT-030 | P1 | implementar bundle, offline e política CDN/local | FT-003 | targets autônomos, cacheáveis e sem rede implícita |
| FT-032 | P1 | criar validação visual e responsiva reutilizável | FT-006, FT-016, FT-027 | 320/480/768/1024, temas, overflow, foco e SVG comparados |
| FT-033 | P1 | validar consumo por tarball e submódulo Git | FT-003, FT-006, FT-025, FT-030 | consumidores limpos instalam/importam todos os perfis suportados |
| FT-035 | P1 | implementar pipeline e publicação GitHub Pages | FT-004, FT-003, FT-036 | artefato `www` real validado e publicação idempotente com base path/CNAME |
| FT-036 | P0 | implementar CI da matriz e dos artefatos | FT-003, FT-006, FT-027 | gates Windows/Linux e cenários oficiais executados sem segredo/log indevido |
| FT-037 | P1 | aplicar cabeçalhos, licenças e inventário de terceiros | FT-024, FT-026 | fonte/artefato comentável conforme; licenças e assets rastreáveis |
| FT-038 | P2 | sincronizar README, API e exemplos de integração | FT-004, FT-033, FT-035 | documentação apresenta o implementado e referencia o RCF sem norma paralela |
| FT-039 | P2 | implementar versionamento e release da biblioteca | FT-033, FT-035, FT-036, FT-038 | release separado de Pages, tag/pacote/asset verificáveis e rollback ensaiado |
| FT-040 | P0 | executar aceite global e convergência Git | todas as anteriores | RCF §12 integralmente comprovado; nenhuma pendência funcional; branches convergentes |

Os números FT-029, FT-031 e FT-034 permanecem intencionalmente não utilizados para evitar renumerar FTs já discutidas durante a consolidação. O estado canônico em `.agents/continue.ia` é a fonte operacional de status; esta tabela é o roadmap arquitetural.

## 8. Estratégia de validação

Cada FT deve ter caracterização anterior, validação focal e gate acumulativo. O pipeline final deve cobrir:

1. norma: RCF, referências, README, memória e handoff;
2. estática: schema, lint, TypeScript estrito, API Extractor ou equivalente, cabeçalhos;
3. unidade: core, composição, providers e adapters;
4. consumidores isolados: Vanilla JS/TS/Sass; Vite sem framework, React e Preact; React/Preact sem Vite quando aplicável;
5. opcionais: com/sem DaisyUI, Font Awesome, WebAwesome e ZagJS, incluindo fallback sem provider;
6. artefato: conteúdo, exports, tipos, side effects, tree-shaking, bytes, hashes, licenças e reprodutibilidade;
7. visual: SVG, nesting, claro/escuro, breakpoints, teclado, foco, toque, overflow e movimento reduzido;
8. pacote: `npm pack --dry-run`, instalação limpa e consumo como submódulo;
9. publicação: servidor local do `www`, links/base path/CNAME e URL remota após autorização;
10. segurança: inputs/configuração/providers validados, sem `eval`, HTML inseguro, segredo ou rede implícita.

## 9. Estratégia de migração e rollback

- Cada FT deve produzir commit próprio; alterações moderadas mantêm no mínimo dois commits quando a FT combinar contrato e implementação.
- Movimentos físicos devem usar commits de rename isolados antes de mudança semântica, preservando blame e permitindo reversão simples.
- API existente deve ser caracterizada e mantida por alias/adapter durante janela versionada; remoção exige major, migração e autorização normativa.
- Configuração nova deve coexistir com defaults atuais até que todos os consumidores estejam migrados; conversores permanecem após retirada do formato antigo.
- Provider/adapter novo deve entrar desativado por default no core e ser removível sem reconstruir a arquitetura.
- Build deve escrever apenas em target novo/limpo. O target anterior só é desativado após comparação de conteúdo e consumidor real.
- Publicação Pages e release NPM devem possuir artefatos imutáveis e identificáveis por commit/hash. Rollback seleciona o último artefato validado; não recompila estado histórico.
- Falha em qualquer gate interrompe a FT, conserva commits válidos anteriores e registra causa/retomada; não autoriza `reset --hard`, patch gerenciado ou fallback silencioso.

## 10. Riscos e mitigação

| Risco | Probabilidade/impacto | Mitigação planejada |
| --- | --- | --- |
| quebra de API durante extração do core | alta/alta | testes caracterizadores, adapter de compatibilidade e exports versionados |
| dependência transitiva mascarar cenário “sem” | alta/alta | fixtures com manifests/instalações isolados e inspeção de árvore |
| ciclo `jcemTS` impedir separação | alta/alta | FT-011 antes do core, utilitários neutros e contrato unidirecional |
| falso verde nos gates | alta/alta | FT-009/026 prioritárias e evidência de contagem real de arquivos/testes |
| CSS visualmente divergente após retirar DaisyUI | alta/alta | tokens primeiro, snapshots do SVG e adapter DaisyUI separado |
| bundle crescer por providers | média/alta | entrypoints independentes, `sideEffects` preciso, análise de bytes/import graph |
| Windows/Linux divergirem | alta/média | evitar comandos shell implícitos; CI em ambos os sistemas |
| publicação vazar fonte/sourcemap | média/alta | allowlist por target e inspeção de `dist/www` |
| norma e implementação divergirem durante ciclo longo | média/alta | atualizar RCF/README/memória na mesma FT sempre que o contrato mudar |
| alteração indevida da governança gerenciada | baixa/alta | FT-009 somente por update/upstream; `.agents/core` permanece imutável localmente |

## 11. Baseline de comandos

| Comando | Resultado observado | Interpretação |
| --- | --- | --- |
| `npm run agent:rcf` | `RCF_OK`, 26307 bytes | norma estrutural presente |
| `npm run check` | falha em `archive.js` gerenciado | gate global bloqueado antes do produto |
| `npm run agent:typecheck` | `LINT_OK`, `scripts:0` | falso positivo; não valida TypeScript |
| TypeScript real via filtro | 15 erros | aliases, submódulo e gerado inconsistentes |
| `npm run agent:lint` | `LINT_OK`, `scripts:0` | falso positivo; lint real não executado |
| lint declarado | `eslint` não reconhecido | dependência/path ausentes |
| Vitest real via filtro | falha ao resolver `tsx` | suíte não chega à descoberta; também não há testes |
| Vite build em target temporário | falha ao resolver `tsx` | build não é multiplataforma no estado atual |
| `npm run agent:deps` | 0 dependencies, 40 devDependencies | classificação de runtime/peer inexistente |
| `npm run agent:licenses` | licença vazia | `package.json` não declara MPL-2.0 |
| `npm pack --dry-run` | não concluído por bloqueio de cache do ambiente | repetir após FT-024 em cache/ambiente autorizado; não é evidência de pacote válido |

## 12. Condição de encerramento desta etapa

Após o commit e o push deste planejamento, nenhuma FT pendente deve ser iniciada automaticamente. A próxima execução começa apenas por solicitação humana explícita e retoma da FT-008, salvo nova prioridade expressa.

# RCF — jcemUI

## 0. Autoridade, finalidade e conformidade

Este Reference Compliance Framework é a SSOT de requisito, contrato, arquitetura e negócio do jcemUI. `AGENTS.md` e associados governam a atuação da IA; este arquivo governa o produto. Aplicam-se `AGENTS.md`, `MN-2119`, `MN-DENS`, `MN-PRES`, `MN-REF`, `MN-STATE`, `MN-VAL`, `MN-SCEN`, o cenário `WEB-BROWSER` e a capacidade `WEB-STATIC`.

Fontes consolidadas, já absorvidas por este RCF:

1. requisitos humanos anexados à FT-001, prevalentes no domínio do produto;
2. `assets/ui.svg`, fonte autoritativa da arquitetura visual idealizada, integrante dos contratos dos cabeçalhos prévios;
3. cabeçalhos e contratos públicos de `src/**/*.ts` e `src/**/*.tsx`;
4. `README.md`, configuração, manifests, scripts e comportamento existente conciliável.

Após esta consolidação, fonte, documentação, demo, teste, pacote e artefato DEVEM referenciar este RCF e NÃO DEVEM constituir SSOT paralela. Divergência entre implementação e este documento identifica implementação não conforme; NÃO altera o contrato. Alteração ambígua, regressiva ou interpretativamente arriscada deste RCF exige confirmação humana.

CONTRADIÇÃO DETECTADA: cabeçalhos TS/TSX que qualificam Preact e Vite como `core` vs requisito humano de independência de framework e bundler — Aplicando a regra de maior precedência. Esses cabeçalhos descrevem o adaptador/perfil atual até sua migração e NÃO definem o núcleo normativo.

## 1. Identidade, escopo e raízes

### 1.1 Produto

jcemUI é uma biblioteca de layout global para dashboards, componível e autoaninhável, destinada a hospedar subaplicativos sem impor framework, bundler, biblioteca visual ou provedor de ícones. O produto fornece geometria, composição, contratos de estado, temas, extensão e adaptadores; NÃO é a aplicação final que decide conteúdo, marca, navegação, telemetria ou regra de negócio do consumidor.

### 1.2 Repositórios e raízes

- **repositório da biblioteca**: este repositório; desenvolve, testa, empacota e demonstra jcemUI;
- **repositório consumidor/final**: incorpora jcemUI por NPM ou submódulo Git e conserva a decisão final sobre stack, providers, assets e publicação;
- **raiz do repositório**: contém governança, RCF, documentação, manifests, configuração e automação transversal;
- **raiz-fonte**: `src/`; contém implementação da biblioteca e aplicação de demonstração enquanto a segregação física da FT-002 não estiver concluída;
- **raiz da biblioteca atual**: `src/scripts/components/`, estilos associados e utilitários estritamente necessários;
- **raiz da demo atual**: `src/index.html` e `src/scripts/tsx/`;
- **raiz de artefato Web**: `dist/www/`, percebida como `/` na publicação;
- **demais artefatos**: targets declarados em §10, nunca intercambiáveis com `src/` nem com a raiz do repositório.

`modules/jcemTS/`, geradores, testes, configuração de bundler e ferramentas de desenvolvimento NÃO integram automaticamente o runtime público. Código-fonte interno NÃO DEVE vazar para o `/` publicado.

### 1.3 Estado de implementação

TypeScript, TSX e Sass constituem a codificação-fonte padrão. Preact, Vite, DaisyUI, Tailwind, Font Awesome e auxiliares atualmente presentes formam um perfil de desenvolvimento/demo e adaptadores legados, não dependências irremovíveis do produto. As FTs posteriores DEVEM convergir a implementação ao contrato sem breaking change evitável.

## 2. Arquitetura esquelética e composição

### 2.1 Modelo canônico

`assets/ui.svg` define a geometria visual; esta seção define sua semântica verificável:

<img src="assets/ui.svg" alt="Diagrama Layout" style="max-height:30vh;">

#### Notas Explicativas do Diagrama de Interface:
*   **Abreviações Taxonômicas:** Os identificadores triliterais no diagrama são abreviações semânticas estritas de nomenclatura (ex: `Btx` = *ButtonX*; `MnX` = *MenuX*).
*   **Polimorfismo de Estado do NavIcon:** O componente à direita pertence à mesma classe/tipo conceitual do `NavIcon`, mas é demonstrado em um estado de exibição distinto para ilustrar o comportamento dinâmico do elemento; ele renderiza de forma aberta (expandida) e sobreposta ao `ContentWrapper` — sem paridade de largura com o elemento simétrico à esquerda —, revelando o fundo por transparência conforme o estado literal `'Coll.'` (colapsado) ou `'exp'` (expandido) injetado na propriedade `View`.
*   **Filiação Hierárquica:** Os recuos e distâncias de borda exibidos entre componentes pais e filhos servem unicamente como âncoras visuais de filiação estrutural no esquema, não definindo regras mandatórias de *margin* ou *padding* de estilização.

```text
PageZone
├─ HeaderZone?                         (pilha vertical)
│  ├─ AnyComponent*
│  └─ HeaderBar*
│     ├─ LeftZone
│     ├─ MiddleZone
│     └─ RightZone
│        └─ AnyComponent | NavIcon | ButtonX | MenuX
├─ EnclosureContent                    (faixa horizontal)
│  ├─ NavIcon?                         (esquerda)
│  ├─ ContentWrapper                   (obrigatório)
│  │  └─ PageZone XOR AnyComponent+
│  └─ NavIcon?                         (direita)
└─ FooterZone?                         (pilha vertical)
```

Um adaptador PODE achatar wrappers no DOM, desde que preserve semântica, ordem, zonas, acessibilidade, geometria e seletores públicos. A ausência de um elemento opcional NÃO altera a posição lógica dos demais.

### 2.2 PageZone

`PageZone` é a unidade raiz e recursiva. DEVE:

- aceitar `HeaderZone` opcional primeiro, `ContentWrapper` obrigatório na região central e `FooterZone` opcional por último;
- materializar `EnclosureContent` como composição de navegação esquerda opcional, conteúdo obrigatório e navegação direita opcional;
- permitir `PageZone` dentro de `ContentWrapper`, formando subaplicativo isolável e autoaninhável;
- exigir, em cada slot de conteúdo, `PageZone` **ou** um ou mais componentes comuns, nunca mistura estrutural ambígua no mesmo slot;
- preservar escopo de classe/dados, tema e configuração de cada subaplicativo sem romper herança deliberada do consumidor;
- rejeitar ou avisar deterministicamente sobre ordem/filho inválido, conforme severidade configurada, sem reordenar conteúdo silenciosamente.

### 2.3 HeaderZone e HeaderBar

`HeaderZone` empilha verticalmente componentes livres e zero ou mais `HeaderBar`. Um `HeaderBar` organiza horizontalmente `LeftZone`, `MiddleZone` e `RightZone`, que juntas ocupam a largura disponível; zona vazia mantém o contrato de alinhamento sem criar conteúdo fictício.

Cada zona aceita componente livre, `NavIcon`, `ButtonX` ou `MenuX`. Sequência de dois ou mais `ButtonX`/`MenuX` fora de `NavIcon` DEVE ser agrupada automaticamente em `NavIcon` ou rejeitada com diagnóstico configurável; item isolado PODE permanecer direto. Busca, título ou extensão equivalente são conteúdo da zona, não pilares novos.

### 2.4 EnclosureContent e ContentWrapper

`EnclosureContent` é horizontal e contém exatamente um `ContentWrapper`, ladeado por até um `NavIcon` à esquerda e outro à direita. `ContentWrapper` ocupa o espaço remanescente, suporta largura plena ou contêiner centralizado e NÃO impõe negócio, roteamento nem framework ao conteúdo.

### 2.5 FooterZone

`FooterZone` é opcional, empilha um ou mais componentes quando presente, adapta altura ao conteúdo e permanece no fluxo normal. PODE alinhar-se ao fim da viewport quando o conteúdo for insuficiente, sem sobrepor o conteúdo ou exigir scroll interno.

### 2.6 NavIcon, ButtonX e MenuX

- `NavIcon` contém um ou mais `ButtonX`/`MenuX`, opera horizontal ou verticalmente e expõe estados `expanded` e `collapsed`. No estado recolhido, preserva ícone e nome acessível; no expandido, apresenta ícone/rótulo conforme configuração.
- `ButtonX` compõe `[leftIcon]? [caption]? [rightIcon]?`; `caption` e `label` são aliases compatíveis até transição versionada. Sem texto visível, nome acessível é obrigatório. Ícones não deformam e rótulos tratam overflow sem deslocar ícones.
- `MenuX` especializa a ação visual de `ButtonX` e controla coleção aninhada. Estado básico DEVE permanecer expressável por HTML/CSS/nativo; adaptador de estado PODE aprimorar foco, posicionamento e coordenação.

### 2.7 Overflow e responsividade

Componente da biblioteca NÃO DEVE criar área de scroll própria como solução padrão. Overflow de ações DEVE convergir para agrupamento, menu, recolhimento ou reflow responsivo. A página consumidora conserva scroll documental. Breakpoints mínimos de verificação: `320`, `480`, `768` e `1024` px; dimensões adicionais NÃO PODEM regredir os mínimos.

## 3. Independência, compatibilidade e adaptadores

### 3.1 Núcleo obrigatório

O núcleo público DEVE ser consumível em JavaScript/TypeScript vanilla, sem Vite, React, Preact, Zag.js, Font Awesome, Web Awesome, DaisyUI, Tailwind ou biblioteca equivalente em runtime. Nenhuma API do núcleo PODE expor tipo obrigatório pertencente exclusivamente a essas bibliotecas.

HTML/DOM, CSS e JavaScript padrão constituem o menor denominador de execução no navegador. TypeScript, TSX e Sass são formatos-fonte; o consumidor NÃO DEVE ser obrigado a compilá-los.

### 3.2 Matriz oficial de compatibilidade

A biblioteca DEVE suportar implementação, validação e demonstração nos cenários abaixo. “Com” significa integração nativa opcional por adaptador/provider; “sem” significa funcionamento do núcleo sem a instalação, importação ou dependência transitiva da integração.

| Eixo | Cenários obrigatoriamente suportados | Papel arquitetural | Obrigatoriedade |
| --- | --- | --- | --- |
| Vanilla | JavaScript, TypeScript e Sass, sem framework | consumo direto do core e estilos/tokens | base portátil; framework e bundler proibidos como requisito |
| Vite | sem framework; com React; com Preact | ferramenta opcional de desenvolvimento, build e ponte para hooks comuns | opcional; nunca contrato do core |
| Framework | com React; sem React; com Preact; sem Preact | adaptadores independentes de renderização | opcionais e mutuamente dispensáveis |
| DaisyUI | com DaisyUI; sem DaisyUI | integração visual de classes/tokens | opcional; nunca requisito funcional ou estilístico mínimo |
| Font Awesome | com Font Awesome; sem Font Awesome | provider de ícones | opcional e substituível; sem provider admite emoji, conteúdo acessível ou implementação manual |
| WebAwesome / Web Awesome | com Web Awesome; sem Web Awesome | provider/adaptador de primitives Web Components quando aplicável | opcional e substituível; proibido como dependência obrigatória |
| ZagJS / Zag.js | com Zag.js; sem Zag.js | adaptador opcional de máquinas de estado e interação | opcional e substituível; estado básico permanece nativo |

WebAwesome e ZagJS DEVEM permanecer expressamente presentes nesta matriz; remoção ou redução a dependência implícita constitui regressão normativa. Cada cenário “sem” DEVE ser provado em ambiente independente, sem resolução acidental por `node_modules` compartilhado.

Compatibilidade PODE ser ampliada para novas bibliotecas por novo adaptador/provider, sem alteração do núcleo. Compatibilidade declarada NÃO DEVE ser retirada, bloqueada ou tornada mutuamente exclusiva sem versão principal, migração, fallback e autorização normativa. Adaptador não selecionado NÃO DEVE entrar no artefato do consumidor.

### 3.3 Defaults e decisão do consumidor

Quando um recurso visual exigir ícone ou primitive e o consumidor não fornecer provider, não optar por ausência e não declarar implementação manual, o perfil de conveniência PODE recomendar/usar Font Awesome para ícones e Web Awesome para primitives aplicáveis. Esses defaults:

- DEVEM ser explicitamente substituíveis e desativáveis;
- NÃO DEVEM contaminar o núcleo nem targets que não os selecionem;
- DEVEM falhar com diagnóstico acionável quando o target não puder resolvê-los;
- NÃO DEVEM baixar recurso em runtime sem política/configuração autorizativa.

React, Preact e Vite NÃO são defaults funcionais do núcleo. A demo PODE adotar um adaptador como caso demonstrativo, mas DEVE provar também o consumo vanilla.

### 3.4 Perfis oficiais recomendados

São recomendações oficiais de composição, não dependências obrigatórias, defaults irremovíveis nem condição de suporte:

1. **perfil recomendado principal**: Vite + Preact + ZagJS + Font Awesome + WebAwesome;
2. **perfil recomendado alternativo**: Vanilla + Sass + Font Awesome + WebAwesome.

Todo item desses perfis DEVE poder ser removido ou substituído conforme a matriz da §3.2. O perfil principal prioriza desenvolvimento integrado e interação coordenada; o alternativo prioriza consumo direto com menor camada de ferramenta. Nenhum perfil altera a precedência da configuração do consumidor nem autoriza acoplamento do core.

### 3.5 API e compatibilidade

Exports públicos DEVEM ser classificados em `core`, `adapter`, `provider`, `theme` ou `utility`. Alteração de nome, tipo, ordem, semântica, seletor público, atributo `data-*` ou estrutura observável exige transição versionada. Alias compatível DEVE permanecer durante a janela declarada e emitir aviso somente em desenvolvimento.

## 4. Extensão, hooks e configuração

### 4.1 Pontos de extensão

Consumo por NPM e por submódulo Git DEVE expor mecanismos equivalentes para:

- selecionar adaptador de renderização;
- fornecer factory/renderer de elemento;
- fornecer ícones e primitives;
- resolver classes/tokens/temas;
- observar ou controlar expansão, menu, foco e navegação;
- validar filhos/composição;
- transformar ou excluir assets no build;
- definir base URL, CDN, target e modo offline;
- adicionar adaptador sem alterar o núcleo.

Hook DEVE declarar nome, fase, entrada, saída, ordem, sincronismo, erros e efeito. Hook de consumidor NÃO DEVE mutar fonte versionada nem depender de Vite; plugin Vite é somente uma ponte para o contrato comum.

### 4.2 Configuração central

Configuração de produto DEVE residir sob `config/`, possuir schema/versionamento e ser a única fonte mutável para providers, targets, URLs, modo de assets, tema default, validação e hooks. `config/core.json` permanece configuração operacional da governança e NÃO DEVE receber negócio do jcemUI.

A FT-002 DEVE materializar um manifesto de produto e seu schema sob `config/`. Precedência de consumo: opção explícita da API/CLI → ambiente declarado de build → manifesto do consumidor → manifesto/default da biblioteca. Default compilado DEVE conter somente o subconjunto necessário ao target.

### 4.3 Isolamento de subaplicativos

Cada `PageZone` aninhado DEVE aceitar escopo/configuração própria. Herança de tema, providers e hooks ocorre somente quando não houver override local. Identidades de controles, menus e dados DEVEM ser únicas por escopo; evento de uma subaplicação NÃO DEVE alterar outra sem vínculo explícito.

## 5. Estilo, tema e interação

### 5.1 Fonte e saída

Sass é a fonte de estilo padrão. Custom Properties constituem o contrato temático de runtime. DaisyUI, Tailwind, Tailwind Variants, Tailwind Merge e `clsx` PODEM auxiliar adaptadores/build, mas classe pública e funcionamento mínimo NÃO DEVEM exigir que o consumidor instale essas ferramentas.

Classes adicionais do consumidor DEVEM ser aceitas. Resolução de classes DEVE preservar intenção explícita, remover duplicidade/conflito determinístico e emitir warning de desenvolvimento quando houver perda relevante.

### 5.2 Estados

Hover, active, focus, checked, expanded/collapsed, transição e animação DEVEM priorizar CSS, atributos semânticos e estado nativo. JavaScript só entra quando coordenação, acessibilidade ou estado não forem expressáveis com segurança. Ausência/falha de JavaScript opcional NÃO DEVE destruir estrutura ou conteúdo essencial.

### 5.3 Temas

A biblioteca e a demo DEVEM suportar modos claro e escuro por tokens. O alternador da demo DEVE usar ícone compreensível, nome acessível, foco visível, clique/toque e `aria-pressed` ou semântica equivalente. Preferência do consumidor define persistência; ausência de autorização NÃO permite cookie/storage implícito.

### 5.4 Acessibilidade

Componentes DEVEM preservar HTML semântico, navegação por teclado, ordem de foco, nome/estado acessível, contraste, redução de movimento e alvo adequado a toque. `ButtonX` sem caption exige `aria-label`; menu exige relação controlador/painel e estado expandido; ícone decorativo não duplica nome acessível.

## 6. Build e transpilação seletiva

### 6.1 Princípio

Transpilação DEVE ser agressiva na redução, nunca na compatibilidade contratada. Cada target contém somente código, estilo, token, ícone, fonte, provider, adaptador e configuração efetivamente alcançáveis pelo entrypoint selecionado. Tree-shaking e eliminação de código morto DEVEM ser verificáveis; importar um componente NÃO PODE incorporar a demo ou todos os adapters.

### 6.2 Ícones e estilos

Quando Font Awesome ou provider equivalente for incorporado localmente:

- incluir somente ícones efetivamente referenciados ou declarados em allowlist do consumidor;
- incluir somente estilos necessários a esses ícones e componentes;
- escolher SVG, sprite ou font pelo menor custo total medido para a aplicação final, não por conveniência deste repositório;
- impedir geração integral silenciosa por uso dinâmico; referência não analisável exige manifesto explícito ou fallback configurado.

CSS DEVE ser particionável por componente/tema e agregável por target. Estilo não utilizado NÃO DEVE integrar a publicação.

### 6.3 CDN, cache e offline

Asset compartilhado online DEVERIA usar URL versionada e cacheável quando CDN homologada reduzir custo; quando local for menor/mais rápido ou exigido, DEVE ser emitido uma única vez por artefato e referenciado, não replicado por página. Bundle offline incorpora apenas assets necessários. A aplicação final decide entre CDN, local e manual mediante configuração central.

### 6.4 Reprodutibilidade e licenças

Build limpo e repetido com mesmas entradas/lock/configuração DEVE produzir saída semanticamente idêntica. Dependência e asset publicados exigem licença compatível e rastreável. Todo código-fonte e artefato comentável DEVEM preservar/injetar o cabeçalho de autoria/licença definido pelos metadados reais do repositório, sem inferir dado ausente.

## 7. Demo, testes visuais e GitHub Pages

### 7.1 Demo canônica

O repositório DEVE possuir demo abrangente que execute os mesmos fixtures/casos usados pela validação visual. Deve cobrir, no mínimo:

- esqueleto completo de `assets/ui.svg`;
- HeaderZone com múltiplos HeaderBar e componentes livres;
- zonas esquerda, central e direita vazias e preenchidas;
- NavIcon esquerdo/direito, vertical/horizontal, expandido/recolhido;
- ButtonX com texto, ícone esquerdo, direito, ambos e somente ícone;
- MenuX, agrupamento automático e overflow;
- PageZone aninhado com configuração herdada e sobrescrita;
- conteúdo curto/longo, responsividade mínima e ausência de scroll interno;
- temas claro/escuro, teclado, foco e redução de movimento;
- vanilla e adaptadores opcionais suportados.

### 7.2 Página pública

GitHub Pages DEVE publicar página profissional, leve e elegante com identidade da biblioteca, propósito, instalação/uso, arquitetura, link do repositório, link NPM somente quando real e demo integral. A demo pública e a demo de teste DEVEM compartilhar fonte de casos; cópia divergente é proibida.

Artefato Pages DEVE ser estático, autônomo, responsivo, sem `src/`, testes, sourcemaps públicos não autorizados, ferramenta de desenvolvimento ou dependência não usada. Base path, `CNAME`, links e assets DEVEM funcionar no endereço publicado.

### 7.3 Tema da demo

Demo e página pública DEVEM oferecer alternância claro/escuro com ícone sol/lua ou equivalente, contraste e acessibilidade. Ambos os temas DEVEM cobrir todos os casos; screenshot isolado não substitui validação funcional.

## 8. API operacional, scripts e publicação

Scripts existentes de `AGENTS.md` DEVEM ser reutilizados. `package.json` é API operacional pública e DEVE convergir aos comandos universais aplicáveis:

- `dev-live`: servidor configurado por `config/core.json`, atualmente `http://127.0.0.1:4000`, com watch;
- `build`: orquestra targets aplicáveis sem expor Vite como contrato público;
- `check`/`test`: validam RCF, tipos, unidade, integração, artefatos e demo;
- `publish`: publicação de conteúdo/demo, nunca release;
- `release`: versão, pacote, tag e release da biblioteca;
- `update:agents`: atualização da governança, fora do domínio do produto.

Comando especializado DEVE reutilizar orquestrador comum; configuração de Vite permanece detalhe interno. Publicação Pages e publicação NPM são capacidades distintas, idempotentes e rastreáveis. Link NPM e metadados de pacote só PODEM anunciar pacote efetivamente publicado.

## 9. Indexador

Geradores de import map, metadados de tipos, catálogo de componentes e conjunto de ícones são indexadores de build, nunca runtime obrigatório. DEVEM:

- ler somente roots/entradas declarados pela configuração do target;
- produzir saída determinística sob diretório gerado ignorado ou no artefato correspondente;
- registrar origem e hash quando necessário à reprodução;
- falhar diante de referência dinâmica não resolvida que possa causar asset ausente;
- excluir demo, teste, story, build anterior e dependência não selecionada;
- operar com path Windows/Linux e sem depender do cwd implícito;
- NÃO escrever em fonte manual nem converter índice em SSOT.

`scripts/generate-fontawesome.ts`, `scripts/generate-type-metadata.ts`, `scripts/genImportMap.ts` e equivalentes DEVEM convergir a este contrato na FT-003.

## 10. Dist

### 10.1 Targets

A distribuição DEVE separar, no mínimo:

| Target | Conteúdo | Proibições |
| --- | --- | --- |
| `lib` | núcleo framework-agnostic, tipos, CSS/tokens mínimos e exports selecionáveis | demo, bundler, adapter não importado |
| `adapters` | entradas independentes por React, Preact, Zag.js, providers e integrações | dependência obrigatória no `core` |
| `www` | página/demo estática para Pages | fonte interna, teste, ferramenta, pacote completo |
| `bundle` | composição autocontida explicitamente solicitada | asset não usado, rede indispensável não declarada |
| `offline` | subconjunto autônomo sem rede | CDN indispensável, recurso de desenvolvimento |

Paths físicos definitivos DEVEM ser declarados na configuração do build e espelhados em `package.json`; `dist/www/` permanece o target Web atual. Um target NÃO DEVE reutilizar saída residual de outro.

### 10.2 Pacote

Pacote NPM DEVE declarar nome real, descrição jcemUI, versão, licença MPL-2.0, repositório, exports condicionais, tipos, arquivos publicados, peers opcionais e `sideEffects` preciso. Framework/provider opcional DEVE ser peer/entry separado, nunca dependência silenciosa do núcleo. Instalação limpa do tarball é critério de aceite.

## 11. Observabilidade, erros e segurança

Logger configurável centraliza warn/error de desenvolvimento. Biblioteca NÃO DEVE emitir `console` arbitrário em produção, registrar segredo/conteúdo do consumidor, executar `eval` de entrada externa ou injetar HTML não confiável. Diagnóstico DEVE identificar componente, escopo, violação e correção; modo estrito PODE transformar violação estrutural em erro.

Hooks e configuração externa DEVEM ser validados antes do uso. Provider que falhar DEVE degradar para equivalente configurado, conteúdo textual/acessível ou erro controlado; nunca travar indefinidamente a página.

## 12. Validação e critérios de aceite

Cada alteração DEVE executar validação proporcional e registrar evidência na FT. Aceite global exige:

1. **norma**: `agent:rcf`, referências, RCF/README/memória sincronizados;
2. **tipos**: TypeScript estrito e declarações públicas sem tipos de framework no core;
3. **unidade**: composição, props, aliases, classes, hooks e erros;
4. **matriz de consumo**: Vanilla JavaScript/TypeScript/Sass sem framework; Vite sem framework, com React e com Preact; React e Preact sem Vite quando tecnicamente aplicável; com e sem DaisyUI, Font Awesome, WebAwesome e ZagJS; ausência explícita de cada opcional e fallback sem provider de ícones;
5. **build**: target limpo, tree-shaking, conteúdo/bytes, licenças, headers e reprodutibilidade;
6. **visual**: `assets/ui.svg`, claro/escuro, 320/480/768/1024 px, foco, teclado, toque, overflow e nested PageZone;
7. **pacote**: `npm pack --dry-run`, instalação em consumidor limpo e submódulo Git;
8. **Pages**: HTML/asset real renderizado no servidor local e, após publicação autorizada, URL remota;
9. **não regressão**: exports, seletores, estados, adapters e contratos já declarados.

Build verde sem inspeção do artefato/renderização NÃO comprova aceite. Compatibilidade declarada só é considerada implementada quando fixture independente passa sem dependência transitiva indevida.

## 13. Documentação e rastreabilidade

`README.md` apresenta o produto e referencia este RCF; NÃO repete integralmente regras. Cabeçalho TS/TSX descreve o componente e referencia as seções aplicáveis, sem chamar adapter atual de core. `assets/ui.svg` DEVE permanecer versionado e qualquer alteração de geometria exige atualização concomitante deste RCF, fixtures, demo e validação visual.

Toda mudança de requisito, API, arquitetura, target, provider, demo ou publicação DEVE sincronizar RCF, implementação, teste, configuração, README, `.agents/continue.ia` e `handoff.md` aplicáveis na mesma FT.

## 14. Evolução por Frentes de Trabalho

- **FT-001 — Consolidação normativa do RCF**: absorver fontes, resolver conflitos, criar esta SSOT e sincronizar documentação/estado.
- **FT-002 — Núcleo portátil e contratos de extensão**: separar core/adapters/providers, centralizar configuração e provar consumo sem framework/bundler.
- **FT-003 — Build seletivo e distribuição eficiente**: materializar targets, tree-shaking, assets seletivos, pacote e validação de artefato.
- **FT-004 — Demo profissional e GitHub Pages**: compartilhar fixtures com testes, completar casos/temas e publicar o target estático validado.
- **FT-005 — Correção normativa da estratégia de compatibilidade**: explicitar matriz com/sem, papéis, perfis recomendados e proibição de dependências obrigatórias.
- **FT-006 — Matriz independente de ambientes compatíveis**: materializar fixtures e demonstrações isoladas para todos os cenários oficiais.

FT posterior NÃO PODE antecipar decisão incompatível com dependência anterior. Cada etapa funcional exige validação, atualização da memória e commit próprio; conclusão de FT exige todos os critérios correspondentes e convergência Git definida por `AGENTS.md`.

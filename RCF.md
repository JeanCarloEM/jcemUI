# RCF — AppmiteUI

## 0. Autoridade, finalidade e conformidade

Este Reference Compliance Framework é a SSOT de requisito, contrato, arquitetura e negócio do AppmiteUI. `AGENTS.md` e associados governam a atuação da IA; este arquivo governa o produto. Aplicam-se `AGENTS.md`, `MN-2119`, `MN-DENS`, `MN-PRES`, `MN-REF`, `MN-STATE`, `MN-VAL`, `MN-SCEN`, o cenário `WEB-BROWSER` e a capacidade `WEB-STATIC`.

Fontes consolidadas, já absorvidas por este RCF:

1. requisitos humanos anexados à FT-001, prevalentes no domínio do produto;
2. `assets/ui.svg`, fonte autoritativa da arquitetura visual idealizada, integrante dos contratos dos cabeçalhos prévios;
3. cabeçalhos e contratos públicos de `src/**/*.ts` e `src/**/*.tsx`;
4. `README.md`, configuração, manifests, scripts e comportamento existente conciliável.

Após esta consolidação, fonte, documentação, demo, teste, pacote e artefato DEVEM referenciar este RCF e NÃO DEVEM constituir SSOT paralela. Divergência entre implementação e este documento identifica implementação não conforme; NÃO altera o contrato. Alteração ambígua, regressiva ou interpretativamente arriscada deste RCF exige confirmação humana.

CONTRADIÇÃO DETECTADA: cabeçalhos TS/TSX que qualificam Preact e Vite como `core` vs requisito humano de independência de framework e bundler — Aplicando a regra de maior precedência. Esses cabeçalhos descrevem o adaptador/perfil atual até sua migração e NÃO definem o núcleo normativo.

## 1. Identidade, escopo e raízes

### 1.1 Produto

AppmiteUI é uma biblioteca de layout global para dashboards, componível e autoaninhável, destinada a hospedar subaplicativos sem impor framework, bundler, biblioteca visual ou provedor de ícones. O produto fornece geometria, composição, contratos de estado, temas, extensão e adaptadores; NÃO é a aplicação final que decide conteúdo, marca, navegação, telemetria ou regra de negócio do consumidor.

### 1.2 Repositórios e raízes

- **repositório da biblioteca**: este repositório; desenvolve, testa, empacota e demonstra AppmiteUI;
- **repositório consumidor/final**: incorpora AppmiteUI por NPM ou submódulo Git e conserva a decisão final sobre stack, providers, assets e publicação;
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

Implementação obrigatório em Typescript + tsx + sass. Eventual produto final em nivel menor (puro js/css<sup>[1]</sup>), deve ser transpilado.

### 2.1 Modelo canônico

`assets/ui.svg` define a geometria visual; esta seção define sua semântica verificável:

<img src="assets/ui.svg" alt="Diagrama Layout" style="max-height:30vh;">

#### Notas Explicativas do Diagrama de Interface:

- **Abreviações Taxonômicas:** Os identificadores triliterais no diagrama são abreviações semânticas estritas de nomenclatura (ex: `Btx` = _ButtonX_; `MnX` = _MenuX_).
- **Polimorfismo de Estado do NavIcon:** O componente à direita pertence à mesma classe/tipo conceitual do `NavIcon`, mas é demonstrado em um estado de exibição distinto para ilustrar o comportamento dinâmico do elemento; ele renderiza de forma aberta (expandida) e sobreposta ao `ContentWrapper` — sem paridade de largura com o elemento simétrico à esquerda —, revelando o fundo por transparência conforme o estado literal `'Coll.'` (colapsado) ou `'exp'` (expandido) injetado na propriedade `View`.
- **Filiação Hierárquica:** Os recuos e distâncias de borda exibidos entre componentes pais e filhos servem unicamente como âncoras visuais de filiação estrutural no esquema, não definindo regras mandatórias de _margin_ ou _padding_ de estilização.

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

| Eixo                     | Cenários obrigatoriamente suportados         | Papel arquitetural                                                      | Obrigatoriedade                                                                                |
| ------------------------ | -------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Vanilla                  | JavaScript, TypeScript e Sass, sem framework | consumo direto do core e estilos/tokens                                 | base portátil; framework e bundler proibidos como requisito                                    |
| Vite                     | sem framework; com React; com Preact         | ferramenta opcional de desenvolvimento, build e ponte para hooks comuns | opcional; nunca contrato do core                                                               |
| Framework                | com React; sem React; com Preact; sem Preact | adaptadores independentes de renderização                               | opcionais e mutuamente dispensáveis                                                            |
| DaisyUI                  | com DaisyUI; sem DaisyUI                     | integração visual de classes/tokens                                     | opcional; nunca requisito funcional ou estilístico mínimo                                      |
| Font Awesome             | com Font Awesome; sem Font Awesome           | provider de ícones                                                      | opcional e substituível; sem provider admite emoji, conteúdo acessível ou implementação manual |
| WebAwesome / Web Awesome | com Web Awesome; sem Web Awesome             | provider/adaptador de primitives Web Components quando aplicável        | opcional e substituível; proibido como dependência obrigatória                                 |
| ZagJS / Zag.js           | com Zag.js; sem Zag.js                       | adaptador opcional de máquinas de estado e interação                    | opcional e substituível; estado básico permanece nativo                                        |

WebAwesome (https://github.com/shoelace-style/webawesome) e ZagJS DEVEM permanecer expressamente presentes nesta matriz; remoção ou redução a dependência implícita constitui regressão normativa. Cada cenário “sem” DEVE ser provado em ambiente independente, sem resolução acidental por `node_modules` compartilhado.

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

Configuração de produto DEVE residir sob `config/`, possuir schema/versionamento e ser a única fonte mutável para providers, targets, URLs, modo de assets, tema default, validação e hooks. `config/core.json` permanece configuração operacional da governança e NÃO DEVE receber negócio do AppmiteUI.

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

| Target     | Conteúdo                                                                     | Proibições                                        |
| ---------- | ---------------------------------------------------------------------------- | ------------------------------------------------- |
| `lib`      | núcleo framework-agnostic, tipos, CSS/tokens mínimos e exports selecionáveis | demo, bundler, adapter não importado              |
| `adapters` | entradas independentes por React, Preact, Zag.js, providers e integrações    | dependência obrigatória no `core`                 |
| `www`      | página/demo estática para Pages                                              | fonte interna, teste, ferramenta, pacote completo |
| `bundle`   | composição autocontida explicitamente solicitada                             | asset não usado, rede indispensável não declarada |
| `offline`  | subconjunto autônomo sem rede                                                | CDN indispensável, recurso de desenvolvimento     |

Paths físicos definitivos DEVEM ser declarados na configuração do build e espelhados em `package.json`; `dist/www/` permanece o target Web atual. Um target NÃO DEVE reutilizar saída residual de outro.

### 10.2 Pacote

Pacote NPM DEVE declarar nome real, descrição AppmiteUI, versão, licença MPL-2.0, repositório, exports condicionais, tipos, arquivos publicados, peers opcionais e `sideEffects` preciso. Framework/provider opcional DEVE ser peer/entry separado, nunca dependência silenciosa do núcleo. Instalação limpa do tarball é critério de aceite.

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

## 15. Integração com frameworks e componentes de terceiros

1. O repositório DEVE admitir integração plena, controlada e não destrutiva com frameworks, bibliotecas, componentes, subcomponentes, extensões, plugins, adaptadores e dependências de terceiros, incluindo, sem limitação:
   1. Web Awesome;
   2. Zag.js;
   3. Font Awesome;
   4. DaisyUI;
   5. Tailwind CSS.

2. A integração DEVE preservar simultaneamente:
   1. a arquitetura, os contratos, os padrões e as normas internas do repositório;
   2. a estrutura, o ciclo de vida, os contratos, os estados e as expectativas operacionais da tecnologia integrada;
   3. a compatibilidade entre componentes internos e externos;
   4. a possibilidade de atualização, substituição ou remoção da dependência sem corrupção estrutural desnecessária.

3. Nenhuma integração PODE:
   1. exigir adulteração direta e permanente do código-fonte da dependência;
   2. romper sua composição, herança, encapsulamento, contexto, eventos, propriedades, atributos, slots, providers, stores ou mecanismos equivalentes;
   3. reimplementar internamente, de forma incompatível, comportamento pertencente ao framework externo;
   4. converter componentes externos em estruturas proprietárias irreversíveis;
   5. subordinar a arquitetura global do repositório às particularidades dispensáveis de uma única dependência;
   6. produzir acoplamento que impeça atualização, isolamento, substituição ou teste independente.

4. A integração DEVE ocorrer por contratos públicos, estáveis e documentados da tecnologia externa, incluindo, conforme aplicável:
   1. APIs;
   2. propriedades e atributos;
   3. eventos;
   4. slots;
   5. hooks;
   6. providers e contextos;
   7. primitives;
   8. tokens;
   9. classes utilitárias;
   10. temas;
   11. adaptadores;
   12. pontos oficiais de extensão.

5. APIs internas, não documentadas, experimentais, privadas ou dependentes de detalhes de implementação NÃO DEVEM ser utilizadas, salvo inexistência de alternativa tecnicamente adequada e mediante:
   1. isolamento explícito;
   2. justificativa registrada;
   3. teste de compatibilidade;
   4. mecanismo de substituição;
   5. limitação do impacto ao menor escopo possível.

6. A tecnologia externa DEVE ser integrada por camada de compatibilidade proporcional à sua complexidade. Essa camada PODE assumir a forma de componente adaptador, wrapper, hook, função, serviço, provider, diretiva, utilitário ou mecanismo equivalente, desde que:
   1. seja pequena, coesa e especializada;
   2. não replique integralmente a API externa;
   3. exponha apenas o contrato necessário ao repositório;
   4. preserve acesso às capacidades legítimas da dependência;
   5. não oculte funcionalidades necessárias sem justificativa;
   6. não altere semanticamente dados, eventos ou estados sem contrato explícito.
   7. não altere (tanto quanto possível) a forma de uso, permitindo que a documentação de uso original do terceiro ainda seja verdadeira

7. Wrappers NÃO DEVEM aprisionar a dependência. Eles DEVEM:
   1. preservar propriedades, eventos, referências e atributos relevantes;
   2. permitir extensão controlada;
   3. encaminhar contratos compatíveis quando tecnicamente seguro;
   4. manter tipagem equivalente ou mais restritiva, nunca enganosa;
   5. documentar diferenças deliberadas em relação ao componente original;
   6. evitar abstrações genéricas que eliminem capacidades específicas úteis.

8. Componentes externos PODEM ser utilizados diretamente quando:
   1. já forem compatíveis com a arquitetura do repositório;
   2. não exigirem adaptação estrutural;
   3. o uso direto reduzir complexidade e acoplamento;
   4. não comprometerem consistência, acessibilidade, testabilidade ou manutenção.

9. Adaptadores DEVEM ser introduzidos apenas quando houver necessidade concreta de:
   1. normalização de propriedades ou eventos;
   2. integração com estado, contexto ou ciclo de vida interno;
   3. aplicação uniforme de contratos do projeto;
   4. compatibilidade entre tecnologias;
   5. isolamento de instabilidade ou variação de versão;
   6. preservação de acessibilidade, tema, localização ou comportamento transversal.

10. A integração entre múltiplos frameworks NÃO DEVE formar dependências circulares nem exigir conhecimento recíproco indevido. Cada integração DEVE depender preferencialmente:

11. de contratos neutros do projeto;

12. de tipos compartilhados;

13. de eventos ou interfaces estáveis;

14. de adaptadores unidirecionais;

15. de composição externa à implementação dos componentes envolvidos.

16. Componentes, subcomponentes e dependências transitivas DEVEM ser tratados como parte efetiva da superfície de integração quando influenciarem:

17. renderização;

18. estilização;

19. acessibilidade;

20. eventos;

21. estado;

22. foco;

23. portalização;

24. sobreposição;

25. hidratação;

26. empacotamento;

27. carregamento;

28. segurança;

29. compatibilidade de runtime.

30. A integração NÃO DEVE presumir que apenas o componente de nível superior define o comportamento. Dependências internas relevantes, primitives, portais, máquinas de estado, ícones, temas, utilitários e mecanismos auxiliares DEVEM ser considerados na análise de compatibilidade.

31. O repositório DEVE evitar colisões entre tecnologias externas, incluindo:

32. nomes de classes;

33. seletores globais;

34. resets;

35. variáveis CSS;

36. tokens;

37. camadas CSS;

38. z-index;

39. portais;

40. eventos globais;

41. atalhos;

42. atributos;

43. identificadores;

44. tipos;

45. plugins de build;

46. transformações de código.

47. Colisões inevitáveis DEVEM ser resolvidas por escopo, namespace, encapsulamento, ordenação explícita, camada de compatibilidade ou configuração oficial, nunca por sobrescritas globais frágeis ou dependentes de ordem incidental.

48. Estilos, temas, tokens e utilitários externos DEVEM ser integrados sem destruir:

49. a semântica visual do componente original;

50. os contratos de tema da dependência;

51. os tokens normativos do projeto;

52. a previsibilidade da cascata;

53. a capacidade de atualização independente.

54. Sobrescritas visuais de componentes externos DEVEM utilizar pontos oficialmente suportados, como:

55. tokens;

56. propriedades customizadas;

57. parts;

58. atributos;

59. variantes;

60. temas;

61. APIs de composição;

62. classes ou hooks expressamente destinados à customização.

63. Seletores profundos, dependência da estrutura DOM interna ou sobrescritas baseadas em marcação privada NÃO DEVEM ser usados, salvo necessidade excepcional submetida às salvaguardas previstas para APIs instáveis.

64. A adoção de Tailwind CSS, DaisyUI ou mecanismo utilitário equivalente NÃO DEVE contaminar contratos públicos de componentes reutilizáveis quando isso:

65. expuser detalhes internos desnecessários;

66. impedir uso fora do contexto da biblioteca;

67. exigir repetição excessiva;

68. comprometer legibilidade, composição ou manutenção;

69. dificultar substituição da tecnologia.

70. Classes utilitárias PODEM compor internamente componentes e layouts, desde que permaneçam compatíveis com a arquitetura, a política de estilização e os limites definidos pelo RCF.

71. A integração com bibliotecas de ícones, incluindo Font Awesome, DEVE preservar:

72. acessibilidade;

73. dimensionamento;

74. herança ou configuração de cor;

75. alinhamento;

76. consistência visual;

77. carregamento eficiente;

78. seleção apenas dos recursos efetivamente utilizados.

79. Ícones NÃO DEVEM introduzir dependência estrutural desnecessária. O componente consumidor DEVE depender de contrato de ícone ou representação equivalente quando a substituição futura for requisito razoável.

80. A integração com componentes baseados em Web Components, incluindo Web Awesome, DEVE considerar:

81. registro de custom elements;

82. carregamento assíncrono;

83. atributos e propriedades;

84. eventos customizados;

85. Shadow DOM;

86. slots;

87. parts;

88. referências;

89. hidratação;

90. tipagem TSX;

91. definição de elementos intrínsecos quando necessária.

92. A integração com primitives ou máquinas de estado, incluindo Zag.js, DEVE preservar:

93. o modelo de estado original;

94. transições válidas;

95. propriedades de máquina;

96. eventos;

97. contexto;

98. normalização de atributos;

99. requisitos de acessibilidade;

100. independência entre lógica comportamental e renderização.

101. A lógica proveniente de primitives externas NÃO DEVE ser parcialmente copiada ou reinterpretada de forma a romper suas garantias. O repositório DEVE consumir o contrato oficial ou implementar solução própria integralmente independente.

102. Tipos externos DEVEM ser preservados, reutilizados, estendidos ou adaptados de forma explícita. É VEDADO:

103. substituir tipos precisos por `any`;

104. ocultar incompatibilidades por coerção indiscriminada;

105. declarar compatibilidade inexistente;

106. duplicar tipos externos sem necessidade;

107. manter tipos locais divergentes do runtime real.

108. Declarações auxiliares de tipos DEVEM limitar-se às lacunas reais de integração e permanecer isoladas, documentadas e testadas.

109. A integração DEVE ser compatível com:

110. execução local;

111. build de produção;

112. testes;

113. renderização suportada pelo projeto;

114. carregamento assíncrono;

115. divisão de código;

116. tree shaking;

117. ambientes sem DOM, quando aplicável;

118. políticas de conteúdo e segurança adotadas.

119. Dependências externas NÃO DEVEM ser importadas integralmente quando houver mecanismo seguro e oficial para importar apenas módulos, componentes, estilos ou ícones necessários.

120. O custo líquido da integração DEVE ser avaliado quanto a:

121. tamanho de bundle;

122. tempo de inicialização;

123. memória;

124. renderizações;

125. efeitos globais;

126. CSS gerado;

127. duplicação de dependências;

128. compatibilidade entre versões;

129. manutenção futura.

130. Dependências equivalentes ou sobrepostas DEVEM ter responsabilidades delimitadas. O repositório NÃO DEVE utilizar simultaneamente múltiplas tecnologias para a mesma finalidade sem justificativa técnica e fronteiras explícitas.

131. A existência de integração com uma tecnologia NÃO implica sua adoção obrigatória, vinculo obrigatório, depêndência implicita ou explicita, em todos ou parte dos componentes. Cada uso DEVE ser proporcional, localizado e tecnicamente justificável.

132. Componentes externos DEVEM obedecer aos requisitos funcionais, semânticos, responsivos, visuais, de acessibilidade e de desempenho do projeto, sem que isso autorize corrupção de seus contratos internos.

133. Quando um componente externo não puder atender a requisito obrigatório sem adulteração estrutural insegura, DEVE-SE, nesta ordem:

134. utilizar extensão oficial;

135. compor externamente;

136. criar adaptador isolado;

137. substituir o componente;

138. implementar alternativa própria.

139. Patches diretos em dependências somente PODEM ser adotados como medida extremamente excepcional, temporária e rastreável, quando:

140. não houver alternativa viável;

141. a correção for indispensável;

142. o patch for mínimo;

143. houver teste específico;

144. sua remoção futura estiver prevista;

145. a atualização da dependência não puder descartá-lo silenciosamente.

146. Cada integração relevante DEVE possuir testes proporcionais que validem:

147. renderização;

148. propriedades e atributos;

149. eventos;

150. estado;

151. foco;

152. acessibilidade;

153. composição;

154. estilização;

155. teardown;

156. atualização da dependência;

157. coexistência com demais frameworks adotados.

158. Atualizações de dependências integradas DEVEM ser verificadas quanto a alterações de API, tipos, DOM, estilos, comportamento, acessibilidade, empacotamento e dependências transitivas.

159. A integração DEVE degradar de forma previsível quando recurso externo opcional estiver ausente, indisponível ou falhar. A falha de uma dependência NÃO DEVE corromper componentes não relacionados.

160. Recursos opcionais DEVEM possuir limites explícitos de erro, fallback, carregamento e inicialização, conforme a arquitetura aplicável.

161. A documentação técnica DEVE registrar, para cada integração não trivial:

162. finalidade;

163. fronteira de responsabilidade;

164. ponto de entrada;

165. contrato utilizado;

166. limitações;

167. estratégia de atualização;

168. riscos de compatibilidade;

169. testes correspondentes.

170. Em caso de aparente conflito entre este item e as normas anteriores, DEVE-SE aplicar interpretação cumulativa:

171. este item regula interoperabilidade externa;

172. os itens anteriores continuam regulando arquitetura, componentização, estilização, comportamento e responsabilidades internas;

173. nenhuma norma anula a outra quando seus objetos forem distintos;

174. a solução DEVE satisfazer simultaneamente todos os requisitos aplicáveis.

## <sup>[1]</sup> PURO CSS: CSS/Sass prioritário, não exclusivo

Diretriz não se aplica a componentes de terceiros.

1. A implementação visual, estilística, responsiva e de estados DEVE priorizar CSS/Sass nativo sempre que este realizar o comportamento requerido de forma suficiente, robusta, acessível, sustentável e compatível com o ambiente-alvo.

2. A expressão **CSS/Sass puro** refere-se à tecnologia prioritariamente responsável pela estilização, pelo leiaute, pela responsividade e pelos estados visuais declarativos. Ela NÃO implica:
   1. segregação da interface em arquivos exclusivamente CSS/Sass;
   2. rejeição de componentes;
   3. substituição da arquitetura TSX;
   4. concentração de estrutura, marcação ou comportamento em folhas de estilo;
   5. redução da modularidade, reutilização, composição ou encapsulamento definidos pelo RCF.

3. A prioridade por CSS/Sass e a componentização eficiente são requisitos cumulativos e complementares. CSS/Sass DEVE permanecer responsável pelo que pertence à estilização; TSX, quando adotado pelo repositório, DEVE preservar a estrutura, composição, segregação e integração declarativa dos componentes conforme o RCF.

4. Esta especificação NÃO DEVE ser interpretada como conflitante com normas de componentização, modularização, segregação arquitetural ou reutilização. Os respectivos contextos se somam e NÃO se anulam:
   1. CSS/Sass define prioritariamente **como o componente é apresentado e se adapta visualmente**;
   2. TSX define prioritariamente **como o componente é estruturado, composto, parametrizado e integrado**;
   3. TypeScript/JavaScript complementa exclusivamente **o comportamento runtime que exceda a competência prática do CSS/Sass**.

5. JavaScript, TypeScript ou TSX NÃO DEVEM substituir recursos adequadamente realizáveis por CSS/Sass, incluindo:
   1. seletores, combinadores e pseudoclasses;
   2. pseudoelementos;
   3. estados nativos de elementos;
   4. media queries e container queries;
   5. propriedades condicionais, funções e variáveis CSS;
   6. Grid, Flexbox, posicionamento, overflow e recursos responsivos nativos;
   7. estruturas declarativas como `input + label`, `details + summary` ou equivalentes semanticamente adequados.
   8. alterância de modo claro/escuro (quando tecnicamente possível).

6. A vedação anterior NÃO impede que a estrutura necessária ao funcionamento desses recursos seja declarada e encapsulada em componentes TSX. Um componente PODE gerar a marcação semântica necessária, desde que o efeito visual ou responsivo permaneça implementado por CSS/Sass quando este for suficiente.

7. A prioridade por CSS/Sass NÃO implica exclusividade. JavaScript, TypeScript ou TSX PODEM complementar a implementação quando o comportamento depender de estado, observação, medição, validação, cálculo ou alteração efetiva em runtime que:
   1. não possa ser detectada ou tratada adequadamente por CSS/Sass;
   2. exija reação determinística a mudanças reais do ambiente, conteúdo ou geometria;
   3. produza ganho líquido real (tecnicamente justificável e verificável) de robustez, desempenho, acessibilidade ou usabilidade (ADICIONAR notas no código e no RCF [via arquivo anexo separado] adicionando caso, situação e justificativa, de forma ultrasuscinta, pra garantir a restreabilidade)
   4. não duplique lógica declarativa já adequadamente expressável por CSS/Sass.

8. Quando TSX integrar o repositório, componentes, propriedades, referências, estados, efeitos e composição declarativa DEVEM aderir plenamente ao padrão arquitetural e ao runtime TSX adotados pelo projeto. É VEDADO introduzir manipulação imperativa paralela do DOM quando o mesmo resultado puder ser obtido adequadamente pelo fluxo declarativo do componente.

9. A exigência de CSS/Sass prioritário NÃO autoriza:
   1. eliminar componentes TSX existentes ou normativamente exigidos;
   2. substituir composição por marcação monolítica;
   3. duplicar estruturas para atender variações visuais;
   4. transferir responsabilidade estrutural ao CSS/Sass;
   5. romper encapsulamento, tipagem, contratos, propriedades ou ciclos de vida;
   6. contrariar a segregação eficiente determinada pelo RCF.

10. Em ambientes TSX:

11. a estrutura semântica DEVE ser declarada no componente;

12. componentes DEVEM permanecer segregados segundo responsabilidade, coesão, reutilização e limites definidos pelo RCF;

13. CSS/Sass DEVE permanecer responsável pela apresentação, pelo leiaute, pelos estados visuais e pela adaptação declarativa;

14. propriedades, atributos, classes, variantes e variáveis CSS DEVEM constituir a interface preferencial entre o componente e sua estilização;

15. estado do componente DEVE representar apenas informação runtime necessária à renderização ou ao comportamento;

16. referências ao DOM DEVEM limitar-se a observação, medição ou integração não realizável declarativamente;

17. efeitos DEVEM possuir dependências mínimas, determinísticas e corretamente encerradas;

18. listeners, observers, timers e demais recursos DEVEM ser removidos no ciclo de desmontagem;

19. re-renderizações, medições e mutações redundantes DEVEM ser evitadas.

20. A estilização de componentes TSX PODE ser segregada conforme o padrão arquitetural do repositório, incluindo folhas globais controladas, módulos, partials, escopos, camadas, tokens, mixins ou estratégias equivalentes em CSS/Sass. A forma de segregação DEVE obedecer ao RCF e NÃO altera a prioridade material do CSS/Sass sobre a lógica visual.

21. São usos admissíveis de JavaScript, TypeScript ou TSX, quando não resolvíveis adequadamente por CSS/Sass:

22. acompanhamento de redimensionamento de viewport, contêiner ou componente;

23. reação a alterações de orientação, escala ou geometria;

24. medição de overflow efetivo;

25. detecção de colisão, truncamento ou insuficiência espacial;

26. observação de conteúdo dinâmico cuja dimensão não seja previsível declarativamente;

27. preservação de barras de ferramentas, cabeçalhos e componentes que NÃO POSSAM quebrar o leiaute, ocultar conteúdo essencial ou introduzir rolagem indevida;

28. agrupamento automático de itens excedentes em menus, submenus, grupos expansíveis ou recurso visual equivalente previsto pelo projeto;

29. coordenação runtime entre componentes quando inexista mecanismo CSS/Sass suficiente.

30. O agrupamento responsivo de itens DEVE preservar, conforme aplicável:

31. ordem e prioridade funcional;

32. acessibilidade por teclado e tecnologia assistiva;

33. foco atual e continuidade de interação;

34. estado selecionado, expandido, pressionado ou ativo;

35. semântica, rótulos e atalhos;

36. aderência às normas visuais e funcionais do RCF;

37. retorno automático dos itens à posição original quando houver espaço suficiente;

38. limites e contratos dos componentes TSX envolvidos.

39. Toda complementação por JavaScript, TypeScript ou TSX DEVE:

40. limitar-se estritamente ao comportamento que exceda a competência prática do CSS/Sass;

41. preservar no CSS/Sass toda regra nele expressável com precisão equivalente;

42. preservar a componentização e a segregação arquitetural definidas pelo RCF;

43. ser cirúrgica, pequena, leve e especializada;

44. possuir baixo acoplamento, alta coesão e reutilização em contextos equivalentes;

45. evitar duplicação de breakpoints, estados e regras visuais;

46. reagir somente a alterações relevantes;

47. minimizar listeners, observers, medições, mutações, reflows, repaints e renderizações;

48. evitar polling quando houver evento ou mecanismo observável adequado;

49. utilizar APIs nativas eficientes, como `ResizeObserver`, `MutationObserver`, `IntersectionObserver` ou equivalentes, somente quando necessárias;

50. possuir inicialização, atualização e encerramento determinísticos;

51. degradar graciosamente quando indisponível, desabilitada ou inoperante;

52. obedecer integralmente às normas arquiteturais, visuais, funcionais, responsivas, semânticas e de acessibilidade do RCF aplicável.

53. Em TSX, a lógica complementar reutilizável DEVE, conforme o padrão do repositório, ser encapsulada em componente, hook, função, serviço ou utilitário especializado. Tal unidade:

54. NÃO DEVE incorporar estilização específica desnecessária;

55. DEVE aceitar configuração declarativa;

56. NÃO DEVE depender de seletores globais frágeis;

57. DEVE operar preferencialmente sobre referências ou elementos explicitamente fornecidos;

58. DEVE expor apenas estado ou eventos estritamente necessários;

59. NÃO DEVE assumir framework, componente ou leiaute específico além do indispensável;

60. DEVE permitir reutilização sem replicação da lógica;

61. NÃO DEVE absorver responsabilidades visuais adequadamente resolvidas por CSS/Sass.

62. Havendo solução CSS/Sass capaz de realizar inclusive a detecção, adaptação e reorganização requeridas com precisão, compatibilidade e custo equivalentes, esta DEVE prevalecer sobre qualquer lógica baseada em JavaScript, TypeScript ou TSX, sem prejuízo da preservação do componente TSX responsável por declarar e encapsular a estrutura correspondente.

63. Soluções híbridas DEVEM manter separação estrita de responsabilidades:

64. **TSX:** estrutura semântica, composição declarativa, componentização, propriedades e integração com o ciclo de vida;

65. **CSS/Sass:** apresentação, leiaute, responsividade, transições e estados visuais declarativos;

66. **JavaScript/TypeScript:** exclusivamente observação, medição, cálculo ou decisão runtime não expressável adequadamente por CSS/Sass;

67. **estado TSX:** somente o resultado mínimo necessário para refletir essa decisão na composição declarativa.

68. Quando uma responsabilidade abranger mais de uma camada, a implementação DEVE ser decomposta segundo sua natureza:

69. a estrutura permanece no componente;

70. a regra visual permanece no CSS/Sass;

71. a detecção excepcional permanece na lógica runtime;

72. a comunicação entre as camadas ocorre por contrato mínimo, explícito e tipado.

73. JavaScript, TypeScript ou TSX NÃO DEVEM ser empregados por conveniência, preferência do implementador, abstração prematura ou simplificação local quando:

74. CSS/Sass resolver adequadamente o requisito visual;

75. a solução aumentar complexidade, dependências, acoplamento ou custo de execução;

76. introduzir divergência entre estado lógico e visual;

77. exigir manutenção duplicada de regras responsivas;

78. comprometer acessibilidade, progressividade ou degradação funcional;

79. não produzir benefício técnico líquido demonstrável.

80. CSS/Sass prioritário também NÃO DEVE ser invocado para justificar:

81. ausência de componentização;

82. componentes excessivamente extensos ou monolíticos;

83. acoplamento entre estrutura e estilização;

84. duplicação de marcação;

85. perda de tipagem ou contratos;

86. descumprimento da arquitetura TSX;

87. violação de qualquer norma superior ou complementar do RCF.

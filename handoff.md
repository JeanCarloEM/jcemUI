<!-- Gerado por npm run agent:handoff. Nao editar manualmente. -->
# Implementacoes em andamento

Resumo operacional gerado de `.agents/continue.ia`.

## FT-002 - Fronteira e API do nucleo portavel

Objetivo: Definir e materializar somente a fronteira publica neutra do core, classificando contratos sem tipos obrigatorios de framework/provider.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="3">Contrato publico neutro</td>
<td>Caracterizar exports, seletores, atributos e aliases atuais</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Classificar core, adapter, provider, theme e utility</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Definir tipos e erros sem Preact, React, Vite ou provider</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="3">Fronteira verificavel</td>
<td>Materializar entrypoint interno do core sem implementar adapters</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Preservar compatibilidade por facade/alias versionado</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar grafo de imports neutro e sincronizar evidencias</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-003 - Orquestracao de targets seletivos

Objetivo: Gerar os targets declarados lib, adapters, www, bundle e offline em saidas limpas, independentes e mensuraveis.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="3">Pipeline por target</td>
<td>Consumir roots/entradas somente da configuracao central</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Isolar limpeza, cache, hooks e saida de cada target</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Aplicar tree-shaking e side effects declarados</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="3">Aceite de artefato</td>
<td>Impedir fonte, demo, teste e adapter nao selecionado</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Medir conteudo, dependencias, bytes e hashes</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar build limpo e reprodutivel</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-004 - Demo canonica compartilhada

Objetivo: Entregar a demo leve que reutiliza fixtures e cobre integralmente a arquitetura SVG, temas e integracoes sem incorporar a publicacao Pages.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="3">Experiencia e cobertura</td>
<td>Definir casos de composicao e subaplicativos aninhados</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Definir tema claro/escuro e alternancia acessivel</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Vincular repositorio e pacote NPM quando publicado</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="3">Implementacao da demo</td>
<td>Construir pagina e demo com assets seletivos</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Produzir o target www local sem vazamento de src</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Reutilizar os mesmos casos na validacao visual</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="3">Aceite local</td>
<td>Validar responsividade, temas e acessibilidade</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Validar HTML e assets em servidor local</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Sincronizar README, RCF e memoria</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-006 - Infraestrutura da matriz independente

Objetivo: Organizar manifesto, fixtures e isolamento de instalacao reutilizaveis para toda combinacao oficial, sem implementar cada adapter/provider nesta FT.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="3">Infraestrutura compartilhada</td>
<td>Definir manifesto executavel da matriz de compatibilidade</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Criar fixtures e validadores reutilizaveis</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Isolar dependencias opcionais por cenario</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="3">Contratos de ambientes oficiais</td>
<td>Declarar Vanilla JavaScript, TypeScript e Sass sem framework</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Declarar Vite sem framework, com React e com Preact</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Declarar com e sem DaisyUI, Font Awesome, Web Awesome e Zag.js</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="3">Aceite e demonstracao</td>
<td>Provar fallback sem provider de icones</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Integrar matriz aos comandos de teste sem falso positivo</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Sincronizar RCF, README, memoria e handoff</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-009 - Desbloqueio upstream da validacao gerenciada

Objetivo: Resolver a falha de cabecalho do archive.js pela via formal de update/contribuicao upstream, sem patch local do core.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Causa e proposta</td>
<td>Reproduzir contrato metadata versus cabecalho gerenciado</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Preparar/aplicar correcao upstream rastreavel</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Atualizar governanca pelo comando canonico</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar que agent:verify alcanca o produto</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-010 - Segregacao das raizes arquiteturais

Objetivo: Separar fisicamente biblioteca, demo, fixtures, testes, gerados e targets sem quebrar imports publicos.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Mapa e migracao</td>
<td>Declarar roots/targets na configuracao e plano de renames</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Mover fonte e demo em commits rastreaveis</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Atualizar aliases/scripts sem paths fantasmas</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar que fonte interna nao vaza ao target</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-011 - Fronteira do submodulo jcemTS

Objetivo: Eliminar o ciclo jcemUI-jcemTS e tornar a dependencia unidirecional, versionada e reproduzivel.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Contrato de dependencia</td>
<td>Classificar utilitarios importados e imports reversos @ext</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Definir extracao, adapter ou API neutra</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Convergencia</td>
<td>Limpar .gitmodules e fixar commit/clone do submodulo</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar dependencia unidirecional em clone limpo</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-012 - Manifesto de produto e hooks comuns

Objetivo: Materializar configuracao versionada do jcemUI e contratos de hook independentes de Vite.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Configuracao</td>
<td>Criar manifesto/schema para providers, targets, assets, tema e validacao</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Implementar precedencia API-ambiente-consumidor-default</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Extensao</td>
<td>Tipar fases, entradas, saidas, ordem, erros e dispose dos hooks</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar uso equivalente por NPM e submodulo sem Vite</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-013 - Esqueleto DOM e Vanilla

Objetivo: Implementar o esqueleto autoritativo de assets/ui.svg com Web APIs e tipos neutros.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Estrutura</td>
<td>Implementar PageZone, HeaderZone/HeaderBar e FooterZone neutros</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Implementar EnclosureContent, ContentWrapper e zonas laterais</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Preservar zonas, ordem, seletores e ausencia de scroll interno</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar consumo JavaScript/TypeScript/Sass sem framework</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-014 - Composicao, nesting e escopos

Objetivo: Validar ordem, XOR, agrupamento, heranca e isolamento de PageZone sem mutar entradas do consumidor.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Regras estruturais</td>
<td>Implementar validador e severidades configuraveis</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Implementar IDs/escopos e nesting herdado/sobrescrito</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Compatibilidade</td>
<td>Preservar aliases e diagnosticos acionaveis</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Caracterizar seletores/atributos e nao mutacao</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-015 - Tokens Sass e temas neutros

Objetivo: Consolidar uma fonte Sass e Custom Properties publicas para temas claro/escuro sem DaisyUI/Tailwind obrigatorios.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Contrato tematico</td>
<td>Unificar mapas, nomes, fallbacks e escopo de subaplicativo</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Remover imports quebrados e rede/CDN implicita</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Emitir CSS minimo particionavel por componente/tema</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar claro/escuro e consumo Sass sem integracao visual</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-016 - Interacao nativa e acessibilidade

Objetivo: Implementar estados, foco, teclado e semantica do core com HTML/CSS/Web APIs antes de adapters de estado.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Controles</td>
<td>Tornar ButtonX, MenuX e NavIcon semanticamente acessiveis</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Implementar expanded/collapsed, fechamento e foco nativos</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Validar teclado, toque, contraste e reducao de movimento</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar degradacao sem JavaScript opcional</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-017 - Adapter Preact

Objetivo: Expor o core por Preact como peer opcional sem divergir DOM, API ou estilos.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Implementacao</td>
<td>Mapear props/eventos/children para contratos do core</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Preservar facade e aliases do adapter legado</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Comparar DOM/seletores/estados com Vanilla</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar pacote sem Preact quando entrada nao selecionada</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-018 - Adapter React

Objetivo: Expor o core por React como peer opcional e equivalente aos demais renderizadores.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Implementacao</td>
<td>Mapear props/eventos/children sem compartilhar runtime Preact</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Isolar tipos e entrypoint React</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Comparar DOM/seletores/estados com Vanilla</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar pacote sem React quando entrada nao selecionada</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-019 - Ponte opcional Vite

Objetivo: Adaptar Vite ao contrato comum de hooks/targets sem manter logica exclusiva de produto no bundler.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Ponte</td>
<td>Extrair fabrica comum e eliminar configs duplicadas</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Receber roots/targets/hooks do manifesto</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Provar Vite sem framework, com React e com Preact</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar core/consumidor sem Vite</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-020 - Provider de icones e Font Awesome

Objetivo: Desacoplar icones do core e oferecer fallback, implementacao manual e Font Awesome seletivo.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Contrato</td>
<td>Definir nome acessivel, renderer, erro e fallback</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Implementar provider Font Awesome em entrypoint separado</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Provar com/sem Font Awesome e sem provider</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Medir somente icones/estilos selecionados</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-021 - Provider WebAwesome

Objetivo: Integrar primitives WebAwesome por provider substituivel sem dependencia obrigatoria no core.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Provider</td>
<td>Mapear primitives aplicaveis e fallback nativo</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Implementar registro, carregamento e falha controlados</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Provar com/sem WebAwesome em instalacoes separadas</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Impedir download/runtime implicito sem configuracao</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-022 - Adapter ZagJS

Objetivo: Aprimorar maquinas de estado/interacao com ZagJS sem substituir o estado basico nativo.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Adapter</td>
<td>Mapear menus, foco e expansao ao contrato neutro</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Implementar lifecycle e dispose isolados</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Provar equivalencia com/sem ZagJS</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Impedir tipos/dependencias ZagJS no core</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-023 - Integracao DaisyUI e Tailwind

Objetivo: Oferecer classes/tokens DaisyUI/Tailwind opcionais sem alterar o funcionamento e estilo minimo do core.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Integracao</td>
<td>Mapear tokens/classes para o contrato tematico</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Isolar plugin, merge e variants em entrypoint proprio</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Provar com/sem DaisyUI e Tailwind</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Comparar semantica e seletores publicos</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-024 - Identidade, dependencias e lock do pacote

Objetivo: Corrigir metadata real do jcemUI, classificar dependencias e tornar instalacao reproduzivel.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Manifesto</td>
<td>Declarar nome, descricao, versao, MPL-2.0, repositorio e engines</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Auditar/remover/justificar dependencies, dev e peers</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Reproducibilidade</td>
<td>Versionar lock compativel e validar instalacao limpa</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Preservar campos gerenciados de agentsGovernance</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-025 - Entrypoints, tipos e exports publicos

Objetivo: Publicar entradas condicionais independentes para core, adapters, providers, themes e utilities.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Superficie publica</td>
<td>Definir exports, types, files, peers opcionais e sideEffects</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Emitir declaracoes sem tipos acidentais de integracao</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Compatibilidade</td>
<td>Preservar aliases com deprecacao versionada</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Testar imports isolados de cada entrypoint</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-026 - Scripts e gates multiplataforma reais

Objetivo: Fazer lint, typecheck, test e build executarem os arquivos reais em Windows/Linux sem falso positivo.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">API operacional</td>
<td>Corrigir paths, executaveis, aliases e comandos compostos</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Integrar ferramentas reais aos orquestradores agent/shared</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Exigir contagens nao nulas e falhar em zero cobertura indevida</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar execucao local Windows e CI Linux</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-027 - Testes unitarios e de componente

Objetivo: Proteger composicao, props, aliases, classes, hooks, erros e acessibilidade do core/componentes.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Caracterizacao</td>
<td>Cobrir comportamento publico conciliavel antes da migracao</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Cobrir invalidos, fallbacks e isolamento</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Qualidade</td>
<td>Definir cobertura e mutacao proporcional</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Integrar ao check sem compartilhar estado entre casos</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-028 - Indexadores seletivos e deterministicos

Objetivo: Corrigir geracao de icones, tipos e import map por roots/entradas declarados, sem escrita em fonte manual.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Indexacao</td>
<td>Substituir paths/cwd/regex insuficientes por contratos configurados</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Tratar referencias dinamicas por manifesto ou erro</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Provar determinismo, hashes e exclusoes</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar Windows/Linux e ausencia de residuo em src</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-030 - Targets bundle, offline e politica de assets

Objetivo: Implementar composicoes autocontidas e decisao CDN/local/manual sem rede ou asset implicito.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Assets</td>
<td>Materializar politica versionada de CDN, cache e incorporacao</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Emitir somente recursos alcancaveis uma vez por artefato</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Provar bundle com rede declarada e offline sem rede</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Medir banda, duplicacao e fallbacks</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-032 - Validacao visual, responsiva e acessivel

Objetivo: Criar harness reutilizavel que compare o SVG, temas, breakpoints, nesting, foco, toque e overflow.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Harness</td>
<td>Definir fixtures, snapshots e criterios sem pixel-lock fragil</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Automatizar 320, 480, 768 e 1024 px, claro/escuro</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Validar teclado, foco, toque e reducao de movimento</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Detectar scroll interno e divergencia estrutural</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-033 - Consumidores NPM e submodulo

Objetivo: Validar tarball e submodulo em projetos limpos para todos os perfis e entradas suportados.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Consumidores</td>
<td>Criar instalacoes limpas sem node_modules compartilhado</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Cobrir NPM, gitlink, Vanilla, Vite, React e Preact</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Executar npm pack e importar somente entrypoint selecionado</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar ausencia de peer/provider nao usado</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-035 - Pipeline e publicacao GitHub Pages

Objetivo: Publicar o target www validado com base path, CNAME, links e assets corretos, separado de release.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Pipeline</td>
<td>Criar workflow idempotente com artifact imutavel</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Validar allowlist, cache, CNAME e rollback</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Testar HTML/assets reais em servidor local</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Publicar e verificar URL remota quando autorizado</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-036 - CI da matriz e dos artefatos

Objetivo: Executar gates e cenarios oficiais em CI Windows/Linux com artefatos/evidencias rastreaveis.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Matriz CI</td>
<td>Orquestrar norma, lint, tipos, unidade, compatibilidade e build</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Isolar cache/dependencias e limitar concorrencia</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Evidencia</td>
<td>Persistir relatorios/artefatos sem segredo ou fonte indevida</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Bloquear merge diante de qualquer gate aplicavel</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-037 - Cabecalhos, licencas e terceiros

Objetivo: Aplicar metadata real de autoria/licenca em fonte e artefatos e inventariar licencas de dependencias/assets.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Fonte e geracao</td>
<td>Centralizar metadata real sem inferir dado ausente</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Inserir/validar cabecalhos em formatos comentaveis</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Conformidade</td>
<td>Gerar inventario de terceiros por target</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Provar preservacao apos minificacao/compilacao</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-038 - Documentacao de uso e API

Objetivo: Sincronizar README, referencia de API e exemplos com a implementacao comprovada, mantendo o RCF como SSOT.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Conteudo</td>
<td>Documentar instalacao, perfis, providers, hooks e targets reais</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Documentar Vanilla, Vite, React, Preact e submodulo</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Executar exemplos como testes de consumidor</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Remover duplicacao normativa e links inexistentes</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-039 - Versionamento e release da biblioteca

Objetivo: Implementar release de versao, pacote, tag e assets separado da publicacao Pages.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Processo</td>
<td>Definir versionamento, changelog, notas, hooks e rollback</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Configurar workflow/credenciais sem segredo persistido</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Aceite</td>
<td>Ensaiar dry-run e release beta verificavel</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Confirmar pacote/tag/asset remoto e convergencia</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

## FT-040 - Aceite global e convergencia Git

Objetivo: Comprovar integralmente o RCF e convergir dev para a branch primaria somente sem pendencia funcional.

<table>
<thead><tr><th>Etapa</th><th>Tarefa</th><th>Status</th></tr></thead>
<tbody>
<tr>
<td rowspan="2">Auditoria final</td>
<td>Executar RCF §12, matriz, artefatos, visual, pacote e Pages</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Confirmar nenhuma regressao/API/opcionalidade pendente</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td rowspan="2">Convergencia</td>
<td>Concluir/comprimir FTs e validar arvore/branches</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
<tr>
<td>Convergir dev para main/master conforme AGENTS.md</td>
<td><span style="color:#64748b">&#9679;</span> pendente</td>
</tr>
</tbody>
</table>

- [ ] **Evoluir `PageZone` e seu `ContentWrapper` para formar uma arquitetura
      padronizada, hierárquica, aninhável, monitorável e interoperável de
      contêineres de aplicações**, baseada em núcleo funcional autônomo escrito em
      TypeScript e independente de UI, com comunicação vertical bidirecional,
      árvore lógica de autoridade, agregação em cascata, controle operacional
      descendente, manifestos, hooks, contratos reutilizáveis e integrações
      opcionais com React, Preact e Zag.js, isoladas e combináveis conforme perfis
      explicitamente suportados, sem corromper as diretrizes, regras de negócio,
      isolamento, estrutura, comportamento, compatibilidade, segurança, resiliência
      ou recursos atuais do projeto.
  - **Natureza e finalidade**
    - Tratar esta tarefa como adição de recursos e aprimoramento evolutivo da
      implementação existente, NÃO como reescrita, substituição arquitetural ou
      autorização para alterar contratos atuais sem necessidade demonstrável.
    - Preservar integralmente:
      - regras de negócio;
      - isolamento;
      - subordinação;
      - hierarquia;
      - conteinerização;
      - comportamento visual;
      - composição estrutural;
      - compatibilidade;
      - segurança;
      - resiliência;
      - APIs;
      - integrações;
      - funcionamento sem framework.
    - Antes de implementar, inspecionar:
      - RCFs aplicáveis;
      - `PageZone`;
      - `ContentWrapper`;
      - ciclo de vida atual;
      - hierarquia DOM ou equivalente;
      - estado;
      - eventos;
      - comunicação entre componentes;
      - registro de aplicações;
      - abertura e encerramento;
      - tratamento de falhas;
      - mecanismos de extensão;
      - build;
      - entry points;
      - resolução de dependências;
      - testes;
      - documentação.
    - A solução DEVE acrescentar capacidade de conhecimento, comunicação,
      monitoramento e controle hierárquicos sem transformar `PageZone` em:
      - componente monolítico;
      - controlador global irrestrito;
      - dependência obrigatória de React, Preact, Zag.js ou outro framework,
        toolkit ou runtime opcional;
      - fonte única de verdade acoplada ao DOM;
      - implementação incompatível com componentes externos equivalentes.

  - **Agnosticismo de framework**
    - O repositório DEVE permanecer agnóstico quanto a framework.
    - O funcionamento essencial da biblioteca NÃO DEVE depender de:
      - React;
      - Preact;
      - Vue;
      - Angular;
      - Svelte;
      - Web Components;
      - Zag.js;
      - qualquer outro framework, toolkit comportamental ou runtime de UI.
    - Agnosticismo NÃO significa proibir integrações ou recursos especializados
      dependentes de frameworks.
    - A biblioteca PODE disponibilizar funcionalidades opcionais destinadas a
      frameworks específicos, desde que:
      - sejam explicitamente identificadas como dependentes do framework;
      - permaneçam separadas do núcleo autônomo;
      - não sejam necessárias ao funcionamento básico;
      - não sejam carregadas, ativadas ou executadas quando o framework não
        estiver disponível;
      - não obriguem o consumidor a instalar ou utilizar o framework;
      - não alterem o contrato comum;
      - não contaminem desnecessariamente o bundle principal;
      - possuam fallback funcional pelo núcleo quando a capacidade for
        essencial ao contrato comum.
    - O requisito de independência DEVE ser interpretado como:
      - **núcleo sempre funcional sem framework**;
      - **adaptações opcionais podem depender de framework ou toolkit**;
      - **recursos exclusivos de React, Preact, Zag.js ou de uma combinação
        específica somente ficam disponíveis quando todas as integrações
        correspondentes estiverem presentes, compatíveis e ativas**.
    - A documentação, os tipos, os manifestos e os diagnósticos DEVEM distinguir
      claramente:
      - recurso nativo do núcleo;
      - recurso comum acessível por qualquer implementação;
      - adaptação opcional;
      - recurso exclusivo de React;
      - recurso exclusivo de Preact;
      - recurso exclusivo de Zag.js;
      - recurso dependente de combinação, como React + Zag.js ou Preact + Zag.js;
      - recurso indisponível por ausência ou incompatibilidade do framework,
        toolkit, adaptador ou combinação requerida.
    - Nenhum recurso dependente de framework, toolkit ou combinação DEVE ser
      apresentado como capacidade universal da engine.
    - A existência de variantes especializadas de release NÃO reduz o
      agnosticismo: o perfil sem dependências opcionais DEVE permanecer completo
      quanto ao núcleo, enquanto cada perfil especializado acrescenta somente as
      capacidades declaradas para sua combinação.

  - **Arquitetura obrigatória em camadas**
    - Separar a implementação, no mínimo, nas seguintes camadas conceituais:
      1. **núcleo hierárquico autônomo**;
      2. **contrato de integração com UI**;
      3. **implementação concreta de `PageZone` e `ContentWrapper`**;
      4. **adaptadores opcionais de framework**;
      5. **integração comportamental opcional com Zag.js**;
      6. **recursos especializados dependentes de framework, toolkit ou
         combinação**.
    - A dependência entre camadas DEVE seguir, conceitualmente:

      ```text
      Implementações visuais e componentes
                    ↓
      Adaptador opcional React/Preact/outro
                    ↕
      Integração comportamental opcional Zag.js
                    ↓
      Contrato de integração com UI
                    ↓
      Núcleo hierárquico autônomo em TypeScript
      ```

    - O núcleo NÃO DEVE importar, referenciar nem presumir APIs de React,
      Preact, Zag.js ou outro framework, toolkit ou runtime opcional.
    - Adaptadores e integrações Zag.js PODEM depender do núcleo; o núcleo NÃO
      PODE depender deles.
    - Recursos visuais PODEM consumir o núcleo direta ou indiretamente, mas NÃO
      DEVEM redefinir:
      - autoridade;
      - identidade;
      - hierarquia;
      - estados;
      - comandos;
      - eventos;
      - agregação;
      - segurança.
    - A árvore de componentes, a árvore DOM e a árvore lógica de autoridade
      DEVEM permanecer conceitualmente distintas.
    - A árvore lógica do núcleo DEVE ser a fonte normativa de autoridade,
      subordinação, estado agregado e controle operacional.
    - React, Preact, Zag.js, DOM, portals, slots, wrappers, fragments,
      renderização condicional, máquinas de interação ou componentes
      intermediários NÃO DEVEM determinar implicitamente a hierarquia
      normativa.
    - A relação visual PODE auxiliar a descoberta inicial, mas o vínculo
      hierárquico somente se torna válido pelo contrato explícito do núcleo.

  - **Núcleo hierárquico autônomo**
    - Implementar o protocolo, a árvore de autoridade, os estados, manifestos,
      eventos, comandos, agregação, monitoramento e ciclo de vida em TypeScript
      independente de UI.
    - O núcleo DEVE ser utilizável:
      - sem DOM;
      - sem React;
      - sem Preact;
      - sem Zag.js;
      - em navegador;
      - em Worker;
      - em processo;
      - em testes;
      - em implementação virtual;
      - em qualquer ambiente compatível com seus contratos essenciais.
    - O núcleo DEVE fornecer APIs suficientes para:
      - criar ou registrar nós;
      - vincular pai e filho;
      - remover vínculos;
      - consultar a árvore;
      - obter snapshots;
      - receber alterações;
      - agregar estados;
      - emitir eventos;
      - enviar comandos;
      - controlar ciclo de vida;
      - encerrar;
      - interromper;
      - reconciliar estado;
      - registrar adaptadores e capacidades.
    - O núcleo NÃO DEVE:
      - renderizar componentes;
      - manipular diretamente JSX;
      - depender de hooks de UI;
      - acessar internals de frameworks ou de Zag.js;
      - delegar a máquinas de UI a autoridade ou o ciclo operacional;
      - confundir montagem visual com registro hierárquico;
      - assumir que desmontagem visual equivale automaticamente a encerramento
        operacional concluído.
    - Toda funcionalidade que puder ser implementada no núcleo de forma
      independente DEVE permanecer nele, evitando duplicação em adaptadores.
    - Os adaptadores DEVEM sincronizar framework e, quando aplicável, Zag.js
      com o núcleo; NÃO DEVEM implementar árvores de autoridade, máquinas de
      estado operacional ou fontes de verdade paralelas.

  - **Contrato de integração com UI**
    - Definir interface genérica entre o núcleo e qualquer sistema visual.
    - O contrato DEVE permitir:
      - registrar componente visual como representação de um nó;
      - associar nó lógico e instância visual;
      - refletir estados do núcleo na UI;
      - encaminhar eventos visuais autorizados ao núcleo;
      - reagir a snapshots e alterações incrementais;
      - sincronizar montagem, ativação, suspensão e desmontagem;
      - informar falhas de renderização;
      - liberar assinaturas e recursos.
    - O contrato NÃO DEVE exigir:
      - JSX;
      - Virtual DOM;
      - hooks;
      - Context;
      - componentes funcionais;
      - componentes de classe;
      - framework específico.
    - O adaptador visual DEVE informar explicitamente quais capacidades oferece.
    - Capacidade visual ausente NÃO DEVE impedir o núcleo de continuar
      operacional quando o recurso não for essencial.
    - Falha da camada visual NÃO DEVE corromper a árvore lógica.
    - A remoção da representação visual DEVE seguir política explícita para
      determinar se:
      - apenas desvincula a UI;
      - suspende o nó;
      - inicia encerramento;
      - remove o nó;
      - preserva execução headless.
    - Nenhuma dessas consequências DEVE ser inferida silenciosamente.

  - **Integrações opcionais com React e Preact**
    - Disponibilizar adaptadores opcionais para React e/ou Preact quando isso
      reduzir custo de integração e melhorar ergonomia sem comprometer o
      agnosticismo do núcleo.
    - A escolha entre React e Preact DEVE ser decisão do desenvolvedor ou
      consumidor, conforme:
      - framework já presente;
      - tamanho do bundle;
      - compatibilidade;
      - ecossistema;
      - requisitos do projeto;
      - restrições arquiteturais;
      - custo de manutenção.
    - O TODO NÃO DEVE impor React nem Preact como implementação obrigatória.
    - A biblioteca PODE:
      - implementar ambos os adaptadores;
      - implementar inicialmente apenas um;
      - fornecer contrato para adaptadores mantidos separadamente;
        desde que a decisão seja justificada pelo estado real do repositório e não
        comprometa a compatibilidade comum.
    - Os adaptadores React e Preact DEVEM possuir, tanto quanto possível:
      - contrato equivalente;
      - nomenclatura coerente;
      - semântica idêntica;
      - diferenças documentadas;
      - testes contratuais compartilhados.
    - As integrações PODEM utilizar recursos nativos dos frameworks, como:
      - Context;
      - hooks;
      - reducers;
      - lifecycle;
      - Error Boundaries;
      - subscriptions;
      - mecanismos equivalentes.
    - Esses recursos DEVEM ser usados somente para:
      - conectar componentes ao núcleo;
      - refletir estado;
      - registrar e remover representações;
      - propagar contexto visual;
      - capturar falhas de renderização;
      - otimizar atualizações.
    - Context de React ou Preact NÃO DEVE tornar-se fonte normativa da
      hierarquia.
    - Reducers de framework NÃO DEVEM substituir a máquina de estados comum do
      núcleo.
    - Error Boundaries DEVEM complementar, e não substituir:
      - isolamento do núcleo;
      - diagnóstico;
      - fail-safe;
      - transições operacionais.
    - Portals e árvores de renderização distintas DEVEM continuar capazes de
      representar corretamente uma relação lógica explicitamente vinculada.
    - A integração NÃO DEVE presumir que proximidade visual, ancestralidade JSX
      ou Context disponível constituem autoridade válida.

  - **Integração comportamental opcional com Zag.js**
    - Zag.js PODE ser disponibilizado como integração opcional, isolada e
      combinável com React ou Preact, quando reduzir a implementação de
      comportamentos interativos, acessibilidade e sincronização visual sem
      comprometer o núcleo autônomo.
    - Zag.js NÃO DEVE ser imposto ao projeto, ao desenvolvedor ou ao consumidor.
      Sua adoção DEVE resultar de decisão técnica fundamentada no estado real,
      considerando:
      - componentes e máquinas já disponíveis;
      - acessibilidade;
      - ergonomia;
      - compatibilidade com React ou Preact;
      - custo de bundle;
      - maturidade e manutenção;
      - necessidade efetiva;
      - custo de adaptação e atualização.
    - A integração PODE utilizar máquinas existentes ou customizadas para
      responsabilidades de UI, incluindo, quando aplicável:
      - seleção e alternância visual;
      - tabs;
      - foco;
      - navegação por teclado;
      - presença, entrada e saída visual;
      - menus;
      - dialogs;
      - popovers;
      - tree view;
      - splitters;
      - notificações;
      - estados locais de interação;
      - atributos e relações ARIA.
    - Zag.js NÃO DEVE definir nem substituir:
      - árvore lógica de autoridade;
      - identidade normativa;
      - vínculo pai-filho;
      - agregação;
      - snapshot;
      - estado operacional;
      - ciclo de vida do nó;
      - comandos hierárquicos;
      - encerramento;
      - `kill`;
      - segurança;
      - fail-safe;
      - manifestos comuns.
    - Máquinas Zag.js DEVEM representar somente estados comportamentais ou
      visuais proporcionais à interação, como:

      ```text
      hidden → entering → visible → leaving → hidden
      ```

      Elas NÃO DEVEM tornar-se representação exclusiva de transições
      operacionais como:

      ```text
      registrando → ativo → degradado → encerrando → kill-pending
      ```

    - Quando um comportamento visual corresponder a operação do núcleo:
      - a máquina Zag.js DEVE emitir evento ou intenção normalizada;
      - o adaptador DEVE convertê-la em comando comum;
      - o núcleo DEVE validar autoridade, capacidade e estado;
      - o resultado normativo DEVE retornar ao adaptador;
      - a máquina visual DEVE refletir o resultado, sem presumir sucesso.
    - Estado de seleção, foco, presença ou desmontagem visual NÃO DEVE ser
      interpretado automaticamente como ativação, suspensão, encerramento ou
      `kill` operacional.
    - A integração Zag.js DEVE permanecer separada por módulos, entry points,
      tipos, manifestos e testes próprios, podendo ser removida sem alterar o
      núcleo ou os adaptadores React/Preact sem Zag.
    - React e Preact DEVEM usar, quando aplicável, o adaptador Zag.js apropriado
      ao respectivo framework; um perfil NÃO DEVE importar o adaptador destinado
      ao outro.
    - Máquinas, componentes ou pacotes Zag.js DEVEM ser importados
      seletivamente. É PROIBIDO incorporar conjuntos não utilizados apenas por
      conveniência.
    - A ausência de Zag.js NÃO DEVE:
      - impedir o uso do núcleo;
      - impedir os adaptadores React ou Preact sem Zag;
      - desativar recursos comuns que possuam implementação autônoma;
      - causar importação, instalação ou carregamento automático;
      - produzir erro fora de recurso que o exija.
    - Quando houver implementação comum sem Zag.js e implementação especializada
      com Zag.js, ambas DEVEM:
      - obedecer ao mesmo contrato externo;
      - produzir semântica operacional equivalente;
      - distinguir diferenças estritamente visuais ou ergonômicas;
      - passar pela mesma suíte contratual comum;
      - evitar duplicação da lógica central.
    - Recursos Zag.js sem equivalente autônomo DEVEM ser declarados como
      capacidade opcional específica da combinação ativa, com indisponibilidade
      explícita e consultável nos demais perfis.
    - A integração DEVE permitir futura substituição de Zag.js por outro toolkit
      comportamental mediante o contrato comum, sem alterar o núcleo ou a
      semântica pública.

  - **Classificação das funcionalidades**
    - Cada funcionalidade adicionada por este TODO DEVE ser classificada como:
      - **core**: autônoma e sempre disponível;
      - **adapter**: integração genérica com UI;
      - **react**: dependente de React;
      - **preact**: dependente de Preact;
      - **zag**: dependente de Zag.js;
      - **react-zag**: dependente da combinação React + Zag.js;
      - **preact-zag**: dependente da combinação Preact + Zag.js;
      - **optional-extension**: recurso especializado não essencial;
      - **transport-specific**: dependente de DOM, Worker, processo ou outro
        ambiente.
    - A classificação DEVE constar, conforme aplicável:
      - nos manifestos;
      - nos tipos;
      - na documentação;
      - nos testes;
      - nos metadados de build;
      - nos diagnósticos de disponibilidade.
    - Recursos `core` NÃO PODEM depender transitivamente de recursos
      classificados como opcionais.
    - Recursos dependentes de framework, Zag.js ou combinação NÃO DEVEM
      possuir fallback que simule silenciosamente comportamento incompatível.
    - Quando houver alternativa funcional no núcleo, ela DEVE ser utilizada.
    - Quando não houver alternativa, a indisponibilidade DEVE ser explícita e
      consultável.

  - **Descoberta de frameworks, Zag.js e adaptadores em runtime**
    - Antes de utilizar qualquer recurso dependente de React, Preact, Zag.js ou
      combinação entre eles, a engine DEVE verificar se cada dependência
      correspondente:
      - existe no contexto aplicável;
      - está carregado;
      - possui versão compatível;
      - expõe as capacidades necessárias;
      - está autorizado para aquela integração;
      - possui adaptador disponível e válido;
      - integra-se de forma compatível às demais dependências exigidas pela
        combinação.
    - A verificação NÃO DEVE depender exclusivamente:
      - da existência de um nome em `globalThis`;
      - de heurística baseada no DOM;
      - de nome de pacote;
      - de estrutura interna não pública;
      - de suposição sobre bundler.
    - Priorizar, nesta ordem:
      1. registro explícito pelo ambiente ou adaptador;
      2. manifesto de capacidade;
      3. integração por módulo conhecido no build;
      4. descoberta segura por API pública;
      5. heurística somente quando inevitável, documentada e não conclusiva.
    - A ausência de framework, Zag.js ou adaptador NÃO DEVE:
      - causar exceção na inicialização do núcleo;
      - impedir o uso da biblioteca;
      - carregar dependência automaticamente;
      - gerar tentativa de instalação;
      - alterar recursos não relacionados.
    - Recursos dependentes DEVEM permanecer:
      - inativos;
      - não registrados;
      - indisponíveis;
      - ou em estado `unresolved`, quando o framework ainda puder ser carregado.
    - A engine NÃO DEVE confundir:
      - framework ou Zag.js ausente;
      - dependência ainda não carregada;
      - versão incompatível;
      - adaptador ausente;
      - adaptador inválido;
      - combinação incompleta;
      - combinação incompatível;
      - recurso não suportado;
      - recurso não autorizado.
    - Perfis dedicados de release PODEM declarar previamente a combinação para a
      qual foram construídos, evitando descoberta estrutural desnecessária;
      ainda assim, DEVEM validar uma única vez a disponibilidade e a
      compatibilidade das peer dependencies externas antes de ativar recursos.

  - **Cache de descoberta e capacidades**
    - A descoberta de React, Preact, Zag.js, suas combinações e adaptadores
      NÃO DEVE ser repetida para
      cada:
      - `PageZone`;
      - `ContentWrapper`;
      - renderização;
      - hook;
      - evento;
      - consulta;
      - script;
      - instância da biblioteca.
    - Manter registro compartilhado por contexto de execução compatível,
      incluindo, conforme o ambiente:
      - página ou realm;
      - Worker;
      - processo;
      - módulo;
      - contexto global equivalente.
    - O registro DEVE armazenar, conforme aplicável:
      - framework ou toolkit identificado;
      - combinação ativa;
      - versões;
      - estado de carregamento;
      - compatibilidade;
      - adaptador;
      - capacidades disponíveis;
      - recursos ativados;
      - falha conhecida;
      - revisão;
      - origem da descoberta;
      - momento ou ciclo da validação.
    - Cada framework, toolkit, combinação ou adaptador DEVE ser descoberto e
      validado apenas uma vez por contexto e conjunto de versões, salvo:
      - invalidação;
      - substituição;
      - hot reload;
      - mudança de versão;
      - descarte;
      - carregamento posterior;
      - solicitação explícita de nova resolução.
    - O cache NÃO DEVE:
      - misturar React e Preact;
      - ativar Zag.js sem o adaptador compatível com o framework selecionado;
      - reutilizar adaptador incompatível;
      - cruzar realms;
      - persistir estado inválido indefinidamente;
      - impedir carregamento posterior;
      - compartilhar internals mutáveis do framework.
    - A consulta de capacidade em runtime DEVE ser rápida, determinística e
      baseada no registro já resolvido.
    - A engine DEVE saber quais funcionalidades podem ser ativadas sem repetir
      a descoberta.
    - Mudanças de disponibilidade DEVEM atualizar o registro e emitir evento
      controlado quando afetarem recursos já vinculados.

  - **Carregamento tardio de frameworks e Zag.js**
    - Em navegador ou ambiente com carregamento dinâmico, a engine NÃO DEVE
      concluir ausência definitiva antes do ponto em que:
      - o framework seja realmente necessário;
      - o ambiente declare o carregamento concluído;
      - ocorra falha explícita;
      - outro critério confiável confirme indisponibilidade.
    - A resolução DEVE ocorrer preferencialmente:
      - no registro explícito do adaptador;
      - no primeiro uso real de recurso dependente;
      - em hook confiável de conclusão do bootstrap;
      - após carregamento dinâmico conhecido.
    - A engine PODE aceitar:
      - Promise;
      - callback;
      - evento;
      - loader;
      - registro explícito;
      - hook de bootstrap.
    - Esses mecanismos DEVEM:
      - ser idempotentes;
      - executar no máximo uma vez por framework, adaptador, versão e contexto;
      - evitar polling;
      - possuir cancelamento ou descarte;
      - atualizar o cache compartilhado;
      - distinguir carregamento pendente de ausência.
    - A biblioteca NÃO DEVE carregar React, Preact ou Zag.js
      automaticamente.
    - A biblioteca NÃO DEVE incorporar loader específico de framework quando
      um contrato genérico for suficiente.
    - Se um recurso dependente for solicitado antes da conclusão da resolução,
      a política DEVE ser explícita:
      - aguardar;
      - retornar indisponibilidade transitória;
      - utilizar alternativa core;
      - rejeitar a operação.
    - A política NÃO DEVE ser inferida de modo inconsistente entre chamadas.

  - **Distribuição, bundles e perfis otimizados**
    - O núcleo DEVE ser distribuível sem React, Preact, Zag.js ou respectivos
      tipos e runtimes obrigatórios.
    - Adaptadores e integrações opcionais DEVEM permanecer:
      - separados;
      - tree-shakeable;
      - importáveis explicitamente;
      - excluíveis do bundle;
      - sem efeitos colaterais de registro quando não utilizados, salvo
        mecanismo expressamente normatizado.
    - React, Preact e Zag.js NÃO DEVEM ser incorporados ao bundle da biblioteca,
      salvo se o modelo de distribuição vigente exigir explicitamente um bundle
      autocontido para perfil separado; mesmo nesse caso, isso NÃO PODE afetar
      os demais perfis.
    - Quando externos, DEVEM ser tratados como peer dependencies opcionais,
      contratos equivalentes ou mecanismo já adotado pelo repositório, sem impor
      instalação ao consumidor do núcleo.
    - A escolha do modelo físico de distribuição DEVE considerar o estado real
      do projeto e evitar empacotamento incompatível ou duplicação
      desproporcional.
    - O build DEVE verificar que:
      - o núcleo não importa React, Preact nem Zag.js;
      - o adaptador React não importa Preact;
      - o adaptador Preact não importa React;
      - a variante sem Zag.js não importa Zag.js;
      - a variante React + Zag.js não importa adaptadores Preact;
      - a variante Preact + Zag.js não importa adaptadores React;
      - recursos opcionais não vazam para entry points incompatíveis;
      - ausência de adaptadores não quebra o núcleo;
      - nenhuma conveniência de framework duplica substancialmente a lógica
        central.
    - O tamanho de cada bundle DEVE ser proporcional apenas às capacidades do
      perfil correspondente.

  - **Matriz geral de releases por combinação**
    - Estabelecer como regra de negócio geral do repositório, aplicável a este e
      a quaisquer recursos presentes ou futuros, que toda release publicada
      DEVE fornecer artefatos distintos e previamente otimizados para cada
      combinação de frameworks, toolkits, adaptadores e integrações opcionais
      efetivamente suportada.
    - Essa regra NÃO se limita a `PageZone`, React, Preact ou Zag.js. Sempre que
      o repositório incorporar integração opcional combinável, a matriz de
      release DEVE ser recalculada e atualizada.
    - Para um conjunto de dependências opcionais independentes, a release DEVE
      incluir:
      - perfil sem nenhuma delas;
      - cada perfil unitário suportado;
      - cada combinação mutuamente compatível e oficialmente suportada;
      - combinações progressivas de presença e ausência necessárias para que o
        consumidor não receba código destinado a dependências que não utiliza.
    - Combinações tecnicamente inválidas, redundantes, inseguras ou não
      suportadas NÃO DEVEM ser publicadas como funcionais; DEVEM constar
      explicitamente no manifesto da matriz como excluídas, com justificativa
      verificável.
    - Para o escopo atualmente identificado, a matriz mínima DEVE publicar:
      1. **core/standalone**: sem framework e sem Zag.js;
      2. **preact**: Preact sem Zag.js;
      3. **preact-zag**: Preact com Zag.js;
      4. **react**: React sem Zag.js;
      5. **react-zag**: React com Zag.js.
    - Um perfil Zag.js sem React ou Preact somente DEVE ser incluído se houver
      suporte autônomo real, validado e oficialmente mantido; ele NÃO DEVE ser
      inferido apenas porque partes de Zag.js sejam agnósticas.
    - Cada perfil DEVE ser construído diretamente para sua combinação, e NÃO
      resultar de bundle universal que detecta dependências em runtime enquanto
      conserva código morto de todas as alternativas.
    - Uma variante universal ou autodetectável PODE ser publicada por
      conveniência, desde que:
      - seja adicional;
      - esteja claramente identificada;
      - não substitua os perfis otimizados;
      - declare seu custo;
      - preserve o núcleo standalone;
      - carregue integrações sob demanda quando tecnicamente possível.
    - Cada perfil DEVE conter somente:
      - núcleo comum necessário;
      - contrato e adaptadores da combinação;
      - recursos especializados habilitados;
      - tipos e metadados correspondentes;
      - detecção mínima ainda necessária;
      - nenhum código exclusivo das demais combinações.
    - A especialização do release NÃO DEVE criar forks semânticos. Todos os
      perfis DEVEM compartilhar:
      - o mesmo núcleo;
      - os mesmos contratos;
      - a mesma versão normativa;
      - a mesma semântica operacional;
      - correções comuns;
      - compatibilidade equivalente para capacidades compartilhadas.
    - Diferenças entre perfis DEVEM limitar-se às capacidades opcionais
      declaradas e às otimizações necessárias à combinação.
    - A matriz DEVE ser derivada de manifesto de suporte legível por máquina que
      declare, para cada perfil:
      - identificador estável;
      - dependências presentes e ausentes;
      - peer dependencies;
      - versões compatíveis;
      - adaptadores;
      - capacidades;
      - entry points;
      - arquivos;
      - tipos;
      - formatos de módulo;
      - ambiente;
      - fallback;
      - limitações;
      - estado de suporte.
    - Nomes de perfis, pacotes, subpaths e arquivos DEVEM ser previsíveis,
      estáveis, documentados e inequívocos.
    - `package.json`, exports maps ou mecanismo equivalente DEVEM permitir
      seleção explícita do perfil sem importar previamente o bundle universal.
    - A importação do perfil escolhido NÃO DEVE provocar:
      - detecção das alternativas excluídas;
      - importação transitiva de adaptadores incompatíveis;
      - resolução de peer dependency não pertencente ao perfil;
      - execução de branches mortos destinados a outra combinação.
    - A release DEVE fornecer, quando aplicável a cada perfil:
      - ESM;
      - demais formatos já oficialmente suportados;
      - declarações de tipos;
      - sourcemaps;
      - manifesto de capacidades;
      - metadados de integridade;
      - documentação de importação;
      - exemplo mínimo;
      - informação de tamanho.
    - Tipos especializados DEVEM acompanhar somente os perfis a que pertencem;
      tipos comuns DEVEM permanecer independentes.
    - O processo de build DEVE gerar a matriz de modo determinístico e evitar
      manutenção manual divergente entre variantes.
    - A CI DEVE validar:
      - existência de todos os perfis obrigatórios;
      - ausência de combinações não declaradas;
      - isolamento de dependências;
      - imports proibidos;
      - tree shaking;
      - tamanho;
      - equivalência do núcleo;
      - tipos;
      - exports;
      - instalação isolada;
      - execução com somente as peer dependencies declaradas;
      - falha clara quando dependência requerida do perfil estiver ausente.
    - Cada perfil DEVE ser testado em ambiente limpo, sem dependências opcionais
      não declaradas instaladas, para impedir sucesso acidental por hoisting,
      cache ou dependência transitiva.
    - O perfil standalone DEVE ser validado em ambiente sem React, Preact e
      Zag.js.
    - Os perfis sem Zag.js DEVEM ser validados sem Zag.js instalado.
    - Os perfis React DEVEM ser validados sem Preact; os perfis Preact, sem
      React.
    - Os perfis combinados DEVEM validar a compatibilidade conjunta, não apenas
      a presença individual das dependências.
    - Alterações que adicionem, removam ou mudem uma integração opcional DEVEM
      atualizar, no mesmo ciclo:
      - manifesto da matriz;
      - build;
      - exports;
      - release;
      - tipos;
      - documentação;
      - testes;
      - exemplos;
      - critérios de compatibilidade.
    - A documentação principal DEVE apresentar tabela de decisão que permita ao
      consumidor escolher diretamente o perfil correto conforme as dependências
      já existentes em seu projeto.
    - É PROIBIDO:
      - publicar apenas um bundle máximo contendo todas as integrações;
      - exigir que o consumidor dependa exclusivamente de tree shaking para
        remover alternativas;
      - declarar perfil otimizado que ainda carregue código de combinações
        ausentes;
      - fazer o perfil standalone depender transitivamente de qualquer
        integração opcional;
      - omitir perfil de ausência total quando o núcleo puder funcionar sem
        framework;
      - criar versões normativas distintas para a mesma release apenas por
        diferença de perfil.
    - A regra geral da matriz DEVE ser incorporada ao RCF principal, em seção
      aplicável a build, distribuição e releases, para alcançar qualquer futura
      combinação utilizada pelo repositório, sem necessidade de repeti-la em
      cada feature.

  - **Modelo conceitual**
    - `PageZone` representa conceitualmente um contêiner de aplicação.
    - Seu `ContentWrapper` representa a área subordinada em que PODEM existir:
      - conteúdo próprio;
      - aplicações;
      - outros `PageZone`;
      - implementações semanticamente equivalentes.
    - Um `PageZone` PODE estar aninhado no `ContentWrapper` de outro
      `PageZone`, formando uma árvore hierárquica.
    - O aninhamento DEVE ser semanticamente ilimitado, sem profundidade máxima
      artificial definida pela norma.
    - A implementação PODE aplicar proteções técnicas contra:
      - ciclos;
      - exaustão de memória;
      - estouro de pilha;
      - recursão descontrolada;
      - volume excessivo;
      - abuso de eventos;
        desde que tais proteções não convertam uma limitação de implementação em
        restrição arquitetural arbitrária.
    - A implementação DEVE evitar algoritmos cuja segurança dependa de pequena
      profundidade hierárquica.
    - A relação estrutural DEVE formar árvore ou floresta acíclica:
      - cada nó subordinado possui, no máximo, um pai hierárquico imediato;
      - um nó raiz não possui pai;
      - ciclos diretos ou indiretos são inválidos;
      - referências auxiliares NÃO DEVEM alterar a hierarquia de autoridade.

  - **Separação entre implementação e contrato**
    - `PageZone` e `ContentWrapper` são elementos reais deste repositório, mas
      seus nomes, estrutura física, framework e tecnologia de implementação
      NÃO DEVEM ser confundidos com o contrato conceitual.
    - Outro componente, objeto, Web Component, componente React, componente
      Preact, componente assistido por Zag.js, componente de outro framework,
      estrutura virtual ou implementação
      equivalente PODE substituir `PageZone` e/ou `ContentWrapper`, desde que
      cumpra integralmente as normas de:
      - isolamento;
      - subordinação;
      - hierarquia;
      - acoplamento;
      - comunicação vertical;
      - conteinerização;
      - identificação;
      - ciclo de vida;
      - monitoramento;
      - controle;
      - segurança;
      - interoperabilidade.
    - A compatibilidade NÃO DEVE depender de:
      - nome de classe concreto;
      - nome de tag;
      - framework;
      - DOM;
      - JSX;
      - herança direta;
      - arquivo;
      - caminho;
      - implementação interna.
    - A conformidade DEVE depender do contrato, das capacidades declaradas e do
      comportamento verificável.
    - Adaptadores PODEM ser utilizados quando um componente semanticamente
      compatível possuir API, nomenclatura ou ciclo de vida diferentes.
    - O adaptador NÃO DEVE alterar as regras de negócio do componente adaptado
      nem conceder capacidades superiores às previstas pelo contrato.

  - **Separação normativa**
    - Distinguir rigorosamente:
      1. **acoplamento visual e estrutural**: layout, posicionamento,
         dimensionamento, renderização, DOM e composição visual;
      2. **acoplamento arquitetural e comunicacional**: hierarquia, registro,
         mensagens, estado, monitoramento, controle, ciclo de vida e
         interoperabilidade;
      3. **integração de framework**: sincronização opcional entre o contrato
         comum e React, Preact ou outro runtime visual;
      4. **integração comportamental**: uso opcional de Zag.js ou toolkit
         equivalente para comportamentos de UI.
    - Regras visuais específicas deste repositório NÃO DEVEM ser impostas a
      implementações externas que adotem o contrato arquitetural.
    - O contrato arquitetural NÃO DEVE depender de aparência, layout ou
      estrutura visual específica.
    - Regras específicas de React, Preact ou Zag.js NÃO DEVEM integrar a
      norma comum, salvo referências delimitadoras aos adaptadores e às
      capacidades opcionais.
    - Conceitos e microconceitos comuns PODEM ser compartilhados entre normas,
      mas suas responsabilidades DEVEM permanecer separadas.
    - Quando necessário, regras visuais ou de framework DEVEM referenciar o
      contrato arquitetural, sem duplicá-lo nem redefini-lo.

  - **Subnorma reutilizável**
    - Desacoplar a especificação arquitetural e comunicacional em subnorma RCF
      especializada, reutilizável por outros projetos.
    - Adotar preferencialmente nome equivalente a:

      ```text
      RCF-NESTED-APPLICATION-CONTAINERS.md
      ```

    - O nome final PODE seguir as convenções reais do repositório, desde que
      expresse inequivocamente:
      - contêineres de aplicações;
      - aninhamento;
      - comunicação;
      - conformidade;
      - interoperabilidade.
    - A subnorma DEVE:
      - permanecer subordinada ao RCF principal;
      - ser autônoma para sua finalidade;
      - definir contratos independentes de tecnologia e framework;
      - ser consumível por humanos e IAs;
      - possuir linguagem normativa;
      - conter exemplos conformes e não conformes;
      - permitir reutilização por projetos com estrutura visual distinta;
      - ser diretamente mencionada e vinculada pelo RCF principal;
      - ser mencionada e vinculada pelo `README.md` em seção apropriada;
      - referenciar a matriz de perfis sem transformar integrações opcionais em
        requisitos universais.
    - Integrações React, Preact e Zag.js, isoladas ou combinadas, DEVEM ser
      documentadas em seções ou documentos especializados subordinados à
      subnorma comum, sem tornar seus requisitos universais.
    - Alterações no RCF, em `PageZone`, `ContentWrapper`, no núcleo, nos
      adaptadores ou nos contratos de integração DEVEM incluir análise de
      impacto e atualização sincronizada:
      - da subnorma;
      - dos documentos de framework;
      - dos schemas;
      - dos tipos;
      - dos exemplos;
      - dos testes.

  - **Microconceitos normativos**
    - Definir, no mínimo:
      - **Contêiner de Aplicação**: unidade equivalente a `PageZone`;
      - **Área de Conteúdo**: unidade equivalente a `ContentWrapper`;
      - **Nó**: contêiner participante da árvore lógica;
      - **Representação Visual**: componente ou elemento associado a um nó;
      - **Núcleo**: engine hierárquica independente de UI;
      - **Adaptador de Framework**: integração opcional entre núcleo e
        framework;
      - **Integração Comportamental**: camada opcional, como Zag.js, responsável
        por comportamentos de UI sem autoridade normativa;
      - **Perfil de Release**: artefato otimizado para combinação declarada de
        dependências opcionais;
      - **Matriz de Release**: conjunto de todos os perfis suportados, inclusive
        a ausência total de integrações opcionais;
      - **Capacidade Dependente**: recurso disponível apenas quando determinada
        integração estiver ativa;
      - **Raiz**: nó sem superior;
      - **Pai**: superior hierárquico imediato;
      - **Filho**: subordinado hierárquico imediato;
      - **Descendente**: filho direto ou indireto;
      - **Subárvore**: nó e todos os seus descendentes;
      - **Profundidade**: distância hierárquica entre nó e raiz considerada;
      - **Nível**: posição relativa na hierarquia;
      - **Largura Estrutural**: quantidade de nós em um nível ou grupo de
        filhos, sem implicar layout visual;
      - **Snapshot**: representação consistente do estado hierárquico em um
        instante;
      - **Evento Hierárquico**: alteração propagada pela cadeia;
      - **Comando Operacional**: solicitação de ação sobre nó autorizado;
      - **Agregação**: consolidação do estado próprio com o dos descendentes;
      - **Vínculo**: associação válida entre pai e filho;
      - **Capacidade**: operação declarada e suportada por um nó;
      - **Adaptador**: camada de conformidade para implementação equivalente;
      - **Registro de Ambiente**: cache compartilhado de frameworks,
        toolkits, combinações, adaptadores e capacidades.
    - Microconceitos DEVEM substituir repetições sem ocultar regras, exceções ou
      responsabilidades.

  - **Autoridade e visibilidade**
    - Cada nó DEVE possuir conhecimento e autoridade somente sobre:
      - si próprio;
      - seus filhos;
      - seus descendentes;
      - o estado agregado de sua subárvore.
    - Um nó NÃO DEVE obter autoridade implícita sobre:
      - seu pai;
      - seus ancestrais;
      - irmãos;
      - outras raízes;
      - subárvores alheias.
    - A existência de comunicação ascendente NÃO concede poder ascendente.
    - Um nó PODE comunicar-se com seu pai por meio do contrato, mas NÃO PODE:
      - controlar o pai;
      - alterar estado do pai diretamente;
      - acessar internals do pai;
      - descobrir partes da hierarquia acima além do estritamente fornecido.
    - O pai PODE emitir comandos aos seus descendentes somente dentro de sua
      própria subárvore e das capacidades autorizadas.
    - A autoridade DEVE ser derivada da árvore lógica válida, e não de:
      - referências arbitrárias;
      - acesso ao DOM;
      - Context de framework;
      - máquina ou estado Zag.js;
      - posição JSX;
      - posse de identificadores;
      - ordem de carregamento.
    - Todo comando DEVE validar que o alvo pertence à subárvore autorizada no
      momento da execução.

  - **Comunicação vertical**
    - Disponibilizar interface de comunicação vertical entre:

      ```text
      Contêiner pai.Área de Conteúdo ↔ Contêiner filho
      ```

    - A comunicação DEVE permitir fluxos:
      - ascendentes;
      - descendentes;
      - de solicitação;
      - de resposta;
      - de evento;
      - de estado;
      - de comando;
      - de diagnóstico.
    - A comunicação externa e interna DEVE seguir o mesmo contrato semântico,
      ainda que utilize mecanismos físicos distintos.
    - Cada filho DEVE comunicar ao pai imediato:
      - registro;
      - disponibilidade;
      - capacidades;
      - estado;
      - alterações;
      - falhas;
      - encerramento;
      - estado agregado de sua própria subárvore.
    - Cada pai DEVE consolidar suas informações próprias com as informações de
      seus filhos e repassar a totalidade agregada ao pai imediatamente
      superior.
    - Nenhum nó intermediário DEVE ser ignorado na propagação ordinária.
    - A raiz DEVE receber, por agregação em cascata, visão completa de toda a
      árvore sob sua autoridade.
    - A comunicação NÃO DEVE exigir que a raiz consulte diretamente todos os
      descendentes.
    - Atualizações DEVEM ser propagadas somente quando necessárias, evitando
      reprocessamento integral para alterações localizadas quando puder ser
      mantida consistência incremental.
    - Adaptadores React, Preact ou Zag.js DEVEM consumir essa comunicação;
      NÃO DEVEM substituí-la por comunicação exclusiva de Context, props ou
      máquinas locais.

  - **Perfis de participação, nós folha e alternância de aplicações**
    - Nem toda aplicação inserida em uma Área de Conteúdo atua ou atuará como
      contêiner de outras aplicações. A maioria PODE constituir aplicação final,
      autocontida e especializada, sem descendentes.
    - Distinguir, sem vincular a nomenclatura à implementação concreta:
      - **nó contêiner**: PODE hospedar descendentes e DEVE participar
        integralmente da comunicação hierárquica necessária à sua subárvore;
      - **nó folha integrado**: não hospeda descendentes, mas participa dos
        contratos verticais aplicáveis ao próprio ciclo de vida, estado,
        comandos e diagnósticos;
      - **nó folha passivo**: conteúdo final sem integração vertical própria,
        administrado externamente pelo contêiner hospedeiro como unidade opaca.
    - Esta classificação descreve capacidades, NÃO complexidade. Uma aplicação
      folha PODE ser simples ou extremamente complexa; ausência de descendentes
      NÃO reduz, por si só, sua necessidade de integração.
    - Aplicações estáticas, formulários comuns, calculadoras simples, módulos
      autocontidos ou conteúdos cujas interações sejam irrelevantes para o
      controle global PODEM operar como nós folha passivos.
    - A ausência de comunicação vertical em nó folha passivo PODE ser tolerada
      quando:
      - não houver descendentes a registrar ou controlar;
      - não houver estado interno relevante ao contêiner;
      - alternância visual não exigir ativação, suspensão, redesenho, hooks ou
        sincronização com JavaScript interno;
      - encerramento ou `kill` puderem ser efetivados com segurança pelo
        contêiner mediante desvinculação, limpeza ou remoção integral da
        representação e dos recursos sob seu controle;
      - essa limitação não comprometer integridade, segurança, autoridade,
        isolamento nem consistência da árvore.
    - A tolerância NÃO transforma ausência de integração em prática preferencial.
      A comunicação vertical DEVE ser explicitamente recomendada sempre que
      puder melhorar:
      - observabilidade;
      - sincronização;
      - acessibilidade;
      - encerramento ordenado;
      - liberação de recursos;
      - diagnóstico;
      - recuperação;
      - controle de estado;
      - interoperabilidade futura.
    - Este subitem especializa, para nós folha passivos, as obrigações genéricas
      da seção **Comunicação vertical** que pressuponham participação ativa do
      próprio filho. Nesses casos, o contêiner hospedeiro DEVE manter ao menos
      um registro lógico externo suficiente para:
      - identificar a unidade;
      - conhecer seu vínculo e posição;
      - controlar sua visibilidade;
      - removê-la;
      - informar sua presença ou ausência na agregação;
      - declarar que seus estados e capacidades internas são desconhecidos ou
        não observáveis.
    - Estado não comunicado NÃO DEVE ser presumido como saudável, ativo,
      encerrado ou livre de recursos. O registro DEVE distingui-lo como opaco,
      não observado ou equivalente normatizado.
    - Um nó folha integrado DEVE implementar somente os fluxos que lhe sejam
      aplicáveis, referenciando, sem redefinição, os contratos já estabelecidos
      em:
      - **Comunicação vertical**;
      - **Registro e vínculo hierárquico**;
      - **Ciclo de vida**;
      - **Eventos e mensagens**;
      - **Severidade e diagnóstico**;
      - **Comandos operacionais**;
      - **Encerramento normal**;
      - **Interrupção forçada e `kill`**.
    - Conforme suas capacidades, o nó folha integrado DEVE comunicar, no
      mínimo, os elementos aplicáveis entre:
      - registro e desvinculação;
      - capacidades;
      - disponibilidade;
      - estado e transições;
      - ativação ou desativação quando produzirem efeitos internos;
      - avisos, erros e falhas relevantes;
      - confirmação ou recusa de comandos;
      - encerramento;
      - cancelamento;
      - liberação de recursos;
      - resultado de `kill`.
    - Recursos ou fluxos inaplicáveis ao nó folha NÃO DEVEM ser implementados
      artificialmente apenas para simular conformidade. A ausência DEVE ser
      declarada por capacidade, não ocultada nem confundida com falha.
    - Aplicações folha complexas que mantenham estado, tarefas, recursos,
      listeners, conexões, operações assíncronas, persistência ou lógica própria
      de ativação DEVEM adotar comunicação vertical proporcional a essas
      responsabilidades, ainda que jamais hospedem descendentes.
    - `PageZone` DEVE poder disponibilizar, como capacidade opcional, gestão da
      alternância entre as aplicações imediatamente subordinadas à sua Área de
      Conteúdo.
    - Essa alternância DEVE distinguir:
      - **visibilidade ou seleção visual**;
      - **estado operacional do nó**.
    - Ocultar uma aplicação NÃO DEVE significar automaticamente pausar,
      suspender, encerrar ou interromper sua execução. Essas consequências
      somente PODEM ocorrer quando declaradas pela política do contêiner e
      suportadas pela aplicação.
    - A política de alternância DEVE poder definir, conforme o contexto:
      - nenhum filho visível;
      - um único filho visível;
      - múltiplos filhos visíveis;
      - ordem, foco ou seleção atual;
      - comportamento dos filhos não selecionados.
    - Para nó folha passivo cuja alternância seja estritamente visual, o
      contêiner PODE controlar diretamente sua apresentação, sem exigir
      callback, hook ou ativação interna.
    - Para nó folha integrado, o contêiner DEVE comunicar a alternância quando
      ela exigir atualização, redesenho, foco, retomada, suspensão, preparação,
      liberação temporária de recursos ou outra reação interna declarada.
    - Para nó contêiner, uma alternância destinada a descendente aninhado PODE
      ser propagada recursivamente em cascata pelo caminho hierárquico válido.
      Cada nó intermediário DEVE:
      - validar sua autoridade;
      - aplicar sua própria política;
      - encaminhar somente ao descendente apropriado;
      - atualizar seu estado agregado;
      - devolver o resultado pela cadeia.
    - A propagação termina no nó folha alvo. Um nó folha NÃO DEVE receber
      obrigações de encaminhamento descendente nem simular subárvore
      inexistente.
    - Alternância, visibilidade, foco e ativação DEVEM usar os contratos comuns
      de comandos, eventos, correlação, timeout, erro e confirmação quando
      dependerem de comunicação. A remoção puramente visual de nó passivo NÃO
      DEVE criar protocolo fictício.
    - A ausência tolerada de comunicação em um nó folha NÃO PODE:
      - conceder autoridade adicional ao contêiner sobre internals;
      - permitir declarar encerramento físico não comprovado;
      - ocultar recursos que o contêiner saiba permanecer ativos;
      - quebrar a agregação dos demais nós;
      - impedir controle, monitoramento ou propagação das subárvores integradas.
    - Manifestos e registros DEVEM declarar, conforme aplicável:
      - perfil de participação;
      - capacidade de conter descendentes;
      - suporte à comunicação vertical;
      - estados observáveis;
      - comandos aceitos;
      - reação à alternância;
      - capacidade de encerramento;
      - capacidade de `kill`;
      - estratégia aplicável quando a integração estiver ausente.
    - A norma especializada PODE acrescentar esclarecimentos globais decorrentes
      desta distinção, desde que:
      - não redefina contratos já estabelecidos;
      - use referências internas;
      - preserve a precedência do núcleo;
      - mantenha separadas estrutura, visibilidade, estado operacional,
        comunicação e autoridade.

  - **Agregação hierárquica**
    - Cada nó DEVE manter representação suficiente de:
      - seu estado;
      - seus filhos imediatos;
      - sua subárvore agregada;
      - revisão ou versão do estado;
      - momento da última atualização;
      - consistência ou incerteza conhecida.
    - O estado agregado DEVE permitir determinar, no mínimo:
      - quantidade total de aplicações abertas na subárvore;
      - quantidade de filhos diretos;
      - quantidade de descendentes;
      - profundidade máxima;
      - quantidade de níveis;
      - nível relativo de cada aplicação;
      - relação pai-filho;
      - largura estrutural por nível;
      - quantidade de aplicações por nível;
      - ordem ou posição entre irmãos, quando contratualmente relevante;
      - estados operacionais;
      - capacidades;
      - falhas;
      - aplicações em encerramento;
      - aplicações interrompidas;
      - aplicações não responsivas;
      - integridade da árvore.
    - “Horizontalidade” DEVE ser normatizada como informação estrutural de
      irmãos, grupos e largura por nível, sem presumir orientação ou disposição
      visual.
    - A agregação DEVE preservar identidade e origem; resumo numérico NÃO DEVE
      substituir a capacidade de localizar o nó correspondente.
    - O pai NÃO DEVE precisar reinspecionar internals dos filhos para reconstruir
      informações que estes já têm obrigação de fornecer.
    - Informações redundantes DEVEM ser minimizadas sem comprometer autonomia,
      diagnóstico ou recuperação.
    - A renderização reativa de React ou Preact e as máquinas Zag.js DEVEM
      derivar desse estado agregado ou de projeções controladas, sem manter
      cópia divergente como fonte de verdade.

  - **Identidade e endereçamento**
    - Cada nó DEVE possuir identificador estável e inequívoco dentro do contexto
      hierárquico aplicável.
    - O contrato DEVE distinguir:
      - identidade lógica;
      - identidade de instância;
      - caminho hierárquico;
      - nome de apresentação;
      - tipo ou implementação;
      - representação visual;
      - adaptador ativo.
    - O caminho PODE mudar quando houver reparentalização autorizada; a
      identidade lógica NÃO DEVE ser confundida com esse caminho.
    - Identificadores NÃO DEVEM depender exclusivamente:
      - da posição no DOM;
      - de `key` de React ou Preact;
      - de identificador interno de máquina Zag.js;
      - do índice visual;
      - da ordem de carregamento;
      - de texto exibido;
      - de endereço de memória.
    - `key` de framework PODE auxiliar a estabilidade visual, mas NÃO DEVE ser
      tratada automaticamente como identidade normativa.
    - Colisões DEVEM ser detectadas antes da confirmação do vínculo.
    - Comandos, eventos e respostas DEVEM carregar identificação suficiente de:
      - origem;
      - destino;
      - correlação;
      - revisão;
      - contexto.

  - **Registro e vínculo hierárquico**
    - Um filho DEVE registrar-se somente no pai imediato que contém ou hospeda
      legitimamente sua instância lógica.
    - Montagem em componente descendente NÃO DEVE, isoladamente, provar vínculo
      hierárquico.
    - O registro DEVE validar:
      - identidade;
      - compatibilidade de contrato;
      - capacidades;
      - manifesto;
      - versão;
      - ausência de ciclo;
      - autoridade do pai;
      - duplicidade;
      - estado inicial;
      - adaptador, quando aplicável.
    - O vínculo somente DEVE tornar-se ativo após validação.
    - Registro inválido, duplicado ou cíclico DEVE falhar de forma determinística
      e isolada.
    - O vínculo DEVE possuir ciclo de vida explícito:
      - descoberto;
      - proposto;
      - validando;
      - ativo;
      - degradado;
      - encerrando;
      - removido;
      - falho.
    - A remoção de um filho DEVE atualizar imediatamente a agregação e ser
      propagada ao superior.
    - Nós removidos NÃO DEVEM permanecer como aplicações abertas, salvo registro
      histórico explicitamente separado.
    - Desmontagem de componente DEVE acionar o procedimento normatizado do
      adaptador, sem presumir confirmação de encerramento quando ela não existir.
    - Reparentalização, caso permitida pelo projeto, DEVE ser atômica ou
      transacionalmente equivalente, sem período em que o nó pertença
      simultaneamente a duas árvores de autoridade.

  - **Manifesto de conformidade**
    - Cada implementação participante DEVE disponibilizar manifesto otimizado,
      legível por máquina e suficiente para declarar:
      - identidade do contrato;
      - versão;
      - tipo de nó;
      - implementação;
      - capacidades core;
      - capacidades opcionais;
      - framework requerido, quando houver;
      - adaptador;
      - estados suportados;
      - comandos aceitos;
      - eventos emitidos;
      - hooks disponíveis;
      - tipos;
      - parâmetros;
      - retornos;
      - erros;
      - timeouts;
      - cancelamento;
      - encerramento;
      - kill;
      - compatibilidade;
      - extensões.
    - Capacidades dependentes de React, Preact, Zag.js ou combinação DEVEM
      declarar explicitamente:
      - framework e/ou toolkit;
      - faixa de compatibilidade de cada dependência;
      - APIs necessárias;
      - adaptadores requeridos;
      - perfil de release correspondente;
      - comportamento sem cada dependência;
      - fallback, quando existir.
    - O manifesto DEVE conter somente informações necessárias ao acoplamento,
      sem duplicar definições já fornecidas por tipos ou schemas reutilizáveis.
    - Reutilizar prioritariamente:
      - TypeScript;
      - `.d.ts`;
      - JSON Schema;
      - contratos de eventos consolidados;
      - padrões assíncronos nativos;
      - formatos já normatizados no repositório.
    - A ausência de capacidade DEVE ser distinguida de:
      - capacidade desconhecida;
      - capacidade temporariamente indisponível;
      - framework ou toolkit ainda não resolvido;
      - framework, toolkit ou combinação incompatível;
      - adaptador ausente;
      - operação não autorizada.
    - Manifestos inválidos ou incompatíveis NÃO DEVEM ativar o vínculo.

  - **Interfaces, classes, métodos, parâmetros e tipos**
    - Padronizar, tanto quanto possível:
      - interfaces;
      - classes conceituais;
      - métodos;
      - eventos;
      - comandos;
      - parâmetros;
      - retornos;
      - estados;
      - erros;
      - tipos;
      - códigos;
      - nomenclatura.
    - O contrato comum DEVE ser definido em tipos independentes de framework.
    - Tipos React, Preact e Zag.js DEVEM permanecer em módulos especializados
      e nos perfis correspondentes.
    - Tipos do núcleo NÃO DEVEM importar:
      - `ReactNode`;
      - `Component`;
      - `VNode`;
      - hooks;
      - Context;
      - tipos de máquina ou adaptadores Zag.js;
      - outros tipos específicos de UI.
    - A padronização DEVE maximizar:
      - interoperabilidade;
      - previsibilidade;
      - geração automatizada;
      - validação;
      - legibilidade por IA;
      - compatibilidade entre implementações.
    - A padronização NÃO DEVE:
      - exigir herança concreta;
      - impor framework;
      - impedir novas capacidades;
      - fechar schemas contra extensões legítimas;
      - obrigar implementações a suportar operações desnecessárias.
    - Contratos comuns DEVEM possuir núcleos estáveis e pontos de extensão
      explicitamente delimitados.
    - Campos customizados DEVEM ser:
      - namespaced ou identificáveis;
      - não conflitantes;
      - opcionais;
      - ignoráveis por consumidores que não os conheçam, quando seguro.
    - Métodos e comandos customizados PODEM ser adicionados, desde que não
      alterem a semântica dos padronizados.

  - **Ciclo de vida**
    - Normatizar estados mínimos equivalentes a:
      - declarado;
      - registrando;
      - inicializando;
      - pronto;
      - ativo;
      - suspenso;
      - pausado;
      - degradado;
      - não responsivo;
      - encerrando;
      - encerrado;
      - falho;
      - interrompido;
      - destruído.
    - A nomenclatura final DEVE aderir ao padrão já existente e evitar estados
      semanticamente redundantes.
    - Distinguir ciclo de vida lógico do nó de ciclo de vida visual do
      componente.
    - Montagem visual PODE iniciar registro, mas NÃO DEVE significar
      automaticamente que o nó está pronto ou ativo.
    - Desmontagem visual PODE iniciar desligamento, mas NÃO DEVE significar
      automaticamente encerramento confirmado.
    - Cada transição DEVE declarar:
      - origem permitida;
      - destino;
      - causa;
      - ator;
      - efeitos;
      - possibilidade de cancelamento;
      - timeout;
      - eventos emitidos;
      - atualização agregada;
      - impacto na representação visual.
    - Transições inválidas DEVEM ser rejeitadas, não reinterpretadas.
    - O pai DEVE receber alterações de estado de toda a subárvore por
      propagação.
    - O estado agregado NÃO DEVE ocultar estados críticos minoritários apenas
      porque a maioria dos descendentes está operacional.

  - **Hooks comuns e hooks de framework**
    - Definir hooks comuns para:
      - descoberta;
      - pré-registro;
      - registro;
      - validação;
      - vinculação;
      - inicialização;
      - abertura;
      - ativação;
      - suspensão;
      - retomada;
      - alteração;
      - comunicação;
      - warning;
      - erro;
      - falha;
      - pré-encerramento;
      - encerramento;
      - kill;
      - remoção;
      - destruição;
      - restauração;
      - reparentalização, quando suportada.
    - Distinguir hooks relativos a:
      - aplicação;
      - contêiner;
      - dashboard;
      - página;
      - contexto global;
      - árvore completa;
      - representação visual;
      - framework.
    - Hooks comuns DEVEM existir independentemente de framework.
    - Adaptadores React, Preact ou Zag.js PODEM expor hooks ergonômicos
      adicionais, mas eles DEVEM:
      - mapear para operações comuns;
      - preservar semântica;
      - não criar autoridade paralela;
      - não ser necessários ao núcleo.
    - Hooks DEVEM possuir:
      - ordem;
      - escopo;
      - parâmetros;
      - retorno;
      - timeout;
      - cancelamento;
      - política de erro;
      - idempotência;
      - propagação.
    - Hooks NÃO DEVEM:
      - bloquear indefinidamente a árvore;
      - obter acesso irrestrito a internals;
      - alterar hierarquia sem autorização;
      - interceptar comandos fora do escopo;
      - impedir fail-safe obrigatório.
    - Quando um hook falhar, o contrato DEVE definir se:
      - a operação prossegue;
      - é cancelada;
      - o nó é degradado;
      - o componente visual é isolado;
      - o nó é encerrado;
      - ocorre escalonamento.

  - **Eventos e mensagens**
    - Padronizar envelope mínimo para eventos e mensagens com:
      - identificador;
      - tipo;
      - versão;
      - origem;
      - destino ou escopo;
      - correlação;
      - timestamp ou ordenação equivalente;
      - revisão;
      - severidade;
      - payload;
      - metadados mínimos.
    - Distinguir:
      - evento;
      - comando;
      - resposta;
      - reconhecimento;
      - diagnóstico;
      - snapshot;
      - alteração incremental;
      - evento visual;
      - evento de adaptador;
      - evento comportamental de Zag.js.
    - Eventos DEVEM ser imutáveis após emissão ou semanticamente equivalentes.
    - Comandos potencialmente destrutivos DEVEM possuir confirmação,
      correlação ou mecanismo equivalente.
    - Mensagens duplicadas NÃO DEVEM causar duplicação de:
      - registro;
      - transição;
      - renderização lógica;
      - encerramento.
    - A implementação DEVE suportar idempotência onde repetição possa ocorrer.
    - A propagação em cascata DEVE impedir:
      - loops;
      - eco;
      - tempestades de eventos;
      - reenvio indefinido;
      - perda silenciosa de eventos críticos.
    - Eventos agregados DEVEM preservar referência às origens afetadas.
    - Eventos de React, Preact ou Zag.js DEVEM ser normalizados antes de
      ingressar no protocolo comum quando possuírem representação específica.

  - **Severidade e diagnóstico**
    - Distinguir rigorosamente estado operacional de severidade diagnóstica.
    - Normatizar níveis equivalentes a:
      - `notice`: informação operacional relevante sem anomalia;
      - `warn`: condição anormal ou risco recuperável;
      - `error`: operação específica falhou, mas o nó PODE continuar;
      - `fail`: nó ou capacidade essencial tornou-se incapaz de cumprir seu
        contrato;
      - `fatal`, quando necessário: integridade do nó ou da subárvore não pode
        ser preservada.
    - `kill` NÃO DEVE ser tratado como severidade; é comando operacional
      coercitivo.
    - Diagnósticos de integração DEVEM distinguir:
      - framework ou Zag.js ausente;
      - carregamento pendente;
      - versão incompatível;
      - adaptador ausente;
      - hook indisponível;
      - erro de renderização;
      - falha de sincronização;
      - máquina Zag.js inválida ou indisponível;
      - combinação incompleta;
      - capacidade desativada.
    - Cada diagnóstico DEVE informar, conforme aplicável:
      - código;
      - severidade;
      - origem;
      - operação;
      - estado;
      - causa;
      - consequência;
      - recuperabilidade;
      - ação tomada;
      - ação recomendada;
      - descendentes afetados;
      - framework ou adaptador afetado.
    - Diagnósticos NÃO DEVEM expor dados sensíveis nem internals desnecessários.
    - Falhas de um filho ou adaptador DEVEM ser comunicadas ao pai e agregadas
      sem necessariamente tornar toda a árvore falha quando o isolamento
      permitir continuidade segura.

  - **Monitoramento**
    - Cada nó DEVE poder consultar, dentro de sua autoridade:
      - snapshot próprio;
      - filhos;
      - descendentes;
      - níveis;
      - profundidade;
      - largura estrutural;
      - quantidade aberta;
      - quantidade ativa;
      - estados;
      - capacidades;
      - falhas;
      - diagnósticos;
      - operações em andamento;
      - encerramentos;
      - kills;
      - inconsistências;
      - representações visuais associadas;
      - adaptadores ativos;
      - recursos de framework e Zag.js disponíveis;
      - perfil de release ativo.
    - Consultas DEVEM poder ser:
      - pontuais;
      - agregadas;
      - filtradas;
      - por identificador;
      - por estado;
      - por nível;
      - por capacidade;
      - por adaptador;
      - por framework;
      - por toolkit;
      - por perfil de release.
    - A observação NÃO DEVE conceder mutação.
    - Snapshots DEVEM possuir revisão suficiente para detectar desatualização.
    - O monitoramento DEVE distinguir:
      - estado confirmado;
      - estado transitório;
      - estado desconhecido;
      - nó não responsivo;
      - informação desatualizada;
      - UI desvinculada;
      - framework ou Zag.js indisponível;
      - combinação incompleta.
    - A ausência de resposta NÃO DEVE ser automaticamente interpretada como
      encerramento concluído.

  - **Comandos operacionais**
    - Normatizar, conforme capacidades reais, comandos equivalentes a:
      - iniciar;
      - abrir;
      - ativar;
      - focar;
      - suspender;
      - pausar;
      - retomar;
      - atualizar;
      - encerrar;
      - interromper;
      - matar;
      - remover;
      - reiniciar.
    - Cada nó DEVE declarar os comandos que suporta.
    - Comandos visuais, como foco, PODEM depender de representação ou framework;
      essa dependência DEVE ser declarada.
    - Comandos não suportados DEVEM ser rejeitados explicitamente.
    - O pai PODE aplicar comandos:
      - a filho direto;
      - a descendente identificado;
      - a subárvore;
      - a conjunto filtrado dentro de sua autoridade.
    - Operações em cascata DEVEM definir:
      - ordem;
      - paralelismo permitido;
      - timeout;
      - cancelamento;
      - tratamento de falha parcial;
      - agregação de resultados.
    - O comando NÃO DEVE ultrapassar a subárvore do emissor autorizado.
    - Um filho NÃO PODE emitir comando coercitivo contra pai ou ancestral.
    - A indisponibilidade de recurso visual NÃO DEVE invalidar comandos
      puramente lógicos.

  - **Encerramento normal**
    - O encerramento normal DEVE permitir:
      - aviso prévio;
      - hooks;
      - persistência autorizada;
      - liberação de recursos;
      - encerramento ordenado de descendentes;
      - cancelamento de operações;
      - confirmação final;
      - desvinculação de representações visuais.
    - O contrato DEVE definir se o encerramento do pai:
      - encerra descendentes;
      - transfere descendentes;
      - é bloqueado por descendentes;
      - exige política explícita.
    - Nenhuma dessas possibilidades DEVE ser inferida silenciosamente.
    - A política padrão DEVE preservar integridade e impedir descendentes órfãos
      quando estes não forem suportados.
    - O pai DEVE comunicar o resultado agregado ao superior.
    - Encerramento parcial DEVE identificar nós concluídos, pendentes e falhos.
    - O adaptador DEVE liberar:
      - subscriptions;
      - contexts;
      - listeners;
      - máquinas e serviços Zag.js;
      - referências visuais;
      - hooks;
        sem determinar sozinho o estado operacional final.

  - **Interrupção forçada e `kill`**
    - `kill` DEVE representar interrupção coercitiva usada quando:
      - encerramento normal falhar;
      - nó não responder;
      - timeout for excedido;
      - integridade ou segurança exigirem interrupção imediata;
      - política autorizada determinar.
    - `kill` DEVE ser capacidade explicitamente declarada.
    - A existência do comando lógico NÃO garante que todo ambiente consiga
      interromper fisicamente execução isolada.
    - O contrato DEVE distinguir:
      - solicitação de kill;
      - interrupção efetiva;
      - isolamento do nó;
      - remoção lógica;
      - desmontagem visual;
      - confirmação.
    - Desmontar componente React ou Preact ou encerrar presença/máquina Zag.js
      NÃO DEVE ser reportado automaticamente como terminação física da
      aplicação.
    - Em Worker ou processo isolado, a implementação PODE usar mecanismo nativo
      de terminação.
    - Em componentes sem isolamento físico, `kill` DEVE aplicar a forma mais
      forte disponível de:
      - bloquear novas operações;
      - cancelar tarefas;
      - desconectar eventos;
      - revogar capacidades;
      - liberar recursos;
      - remover representação;
      - remover vínculo;
        sem alegar terminação física não realizada.
    - `kill` DEVE:
      - validar autoridade;
      - registrar origem e motivo;
      - ser idempotente;
      - possuir timeout;
      - gerar diagnóstico;
      - atualizar a árvore;
      - comunicar o resultado ao superior.
    - Falha do `kill` DEVE produzir estado inequívoco, como `kill-failed`,
      `unresponsive` ou equivalente normatizado.
    - O sistema NÃO DEVE reportar nó como encerrado enquanto a interrupção não
      estiver confirmada ou a capacidade tiver sido efetivamente revogada.
    - Operações de `kill` em cascata DEVEM preservar rastreabilidade por nó.

  - **Fail-safe e resiliência**
    - A arquitetura DEVE permanecer funcional diante de:
      - filho inválido;
      - manifesto inválido;
      - mensagem malformada;
      - sintaxe incompatível;
      - evento duplicado;
      - resposta fora de ordem;
      - timeout;
      - falha de hook;
      - nó não responsivo;
      - estado inconsistente;
      - remoção inesperada;
      - erro funcional;
      - erro não funcional;
      - falha parcial;
      - desconexão;
      - framework ou Zag.js ausente;
      - dependência carregada tardiamente;
      - versão ou combinação incompatível;
      - adaptador ou máquina defeituosa;
      - erro de renderização;
      - desmontagem inesperada.
    - Uma falha localizada NÃO DEVE corromper:
      - pai;
      - irmãos;
      - ancestrais;
      - núcleo;
      - estado global;
      - outras subárvores;
      - outros adaptadores;
      - outros perfis ou integrações opcionais.
    - Falha de adaptador ou de Zag.js NÃO DEVE inutilizar a operação headless
      do núcleo,
      quando semanticamente possível.
    - O pai DEVE poder:
      - marcar filho como degradado;
      - isolá-lo;
      - interromper comunicação;
      - encerrar;
      - aplicar `kill`;
      - remover vínculo;
        conforme capacidade e autoridade.
    - Mensagens inválidas DEVEM ser rejeitadas antes de mutar estado.
    - Alterações compostas DEVEM ser atômicas ou possuir compensação segura.
    - O sistema DEVE possuir estratégia para reconstruir ou reconciliar estado
      agregado após:
      - perda de eventos;
      - reinicialização;
      - divergência de revisão;
      - reconexão;
      - remontagem visual;
      - substituição de adaptador;
      - reinicialização de máquina Zag.js.
    - A reconstrução NÃO DEVE exigir acesso irrestrito aos internals dos filhos
      ou frameworks/toolkits.
    - Estado desconhecido DEVE permanecer explicitamente desconhecido; NÃO DEVE
      ser fabricado como saudável, disponível ou encerrado.

  - **Segurança e isolamento**
    - A comunicação DEVE ocorrer por interfaces controladas.
    - Filhos NÃO DEVEM receber acesso direto ao estado privado do pai.
    - Pais NÃO DEVEM receber acesso irrestrito ao estado privado dos filhos.
    - Adaptadores NÃO DEVEM expor internals de React, Preact, Zag.js ou do
      componente como substituição do contrato.
    - O contrato DEVE expor apenas:
      - estado necessário;
      - capacidades aprovadas;
      - operações autorizadas;
      - diagnósticos permitidos.
    - Referências DOM, objetos internos, closures, stores, fibers, VNodes,
      contexts, máquinas, serviços ou recursos privados NÃO DEVEM ser
      compartilhados como substituição do contrato.
    - Comandos DEVEM validar:
      - origem;
      - autoridade;
      - escopo;
      - alvo;
      - capacidade;
      - estado;
      - versão.
    - Eventos externos ou forjados NÃO DEVEM registrar nós, alterar hierarquia
      ou executar comandos.
    - Dados sensíveis NÃO DEVEM ser propagados na árvore sem necessidade e
      autorização explícitas.
    - Extensões, plugins e adaptadores NÃO DEVEM ampliar suas próprias
      permissões.
    - Detecção de framework, Zag.js ou perfil NÃO DEVE executar código
      arbitrário, `eval`, acesso a internals ou sondagem invasiva.

  - **Pluggabilidade e expansividade**
    - O contrato DEVE permitir:
      - implementações alternativas;
      - adaptadores;
      - novos frameworks;
      - novos toolkits comportamentais;
      - novos perfis de release;
      - novos estados;
      - novos comandos;
      - novos hooks;
      - novos eventos;
      - novos tipos de aplicação;
      - novos ambientes de execução.
    - A expansividade NÃO DEVE permitir:
      - alteração dos significados normativos existentes;
      - colisão de nomes;
      - quebra de consumidores antigos;
      - bypass de autoridade;
      - mutação irrestrita do protocolo;
      - dependência inversa do núcleo para adaptadores.
    - Extensões DEVEM declarar:
      - namespace ou origem;
      - versão;
      - compatibilidade;
      - capacidades;
      - dependências;
      - fallback;
      - comportamento quando desconhecidas.
    - Consumidores DEVEM ignorar extensões desconhecidas somente quando isso for
      explicitamente seguro; extensões essenciais desconhecidas DEVEM impedir a
      ativação da integração afetada.
    - Um futuro adaptador de framework ou toolkit DEVE poder ser adicionado sem
      alterar o núcleo, salvo expansão genérica e justificada do contrato comum.
    - Sua adoção DEVE atualizar automaticamente a matriz geral de releases com
      todas as combinações válidas e o perfil sem a nova dependência.

  - **Desempenho e escalabilidade**
    - A comunicação em cascata DEVE evitar:
      - varredura integral da árvore para toda alteração;
      - repetição de snapshots completos desnecessários;
      - serialização redundante;
      - eventos duplicados;
      - listeners globais por nó quando houver solução hierárquica mais
        eficiente;
      - rerenders de toda a árvore para alteração localizada.
    - Alterações locais DEVEM gerar atualizações incrementais quando isso
      preservar consistência.
    - Adaptadores React, Preact e integrações Zag.js DEVEM:
      - assinar apenas projeções necessárias;
      - reduzir rerenders;
      - preservar igualdade e revisão quando aplicável;
      - evitar espelhar integralmente a árvore em estado local redundante;
      - não duplicar o estado operacional em máquinas de interação.
    - Snapshots completos DEVEM permanecer disponíveis para:
      - inicialização;
      - recuperação;
      - reconciliação;
      - auditoria;
        sem se tornarem o único mecanismo operacional.
    - Eventos frequentes PODEM ser agrupados ou reduzidos, desde que:
      - estados críticos não sejam atrasados indevidamente;
      - ordem semântica seja preservada;
      - resultado final seja determinístico.
    - A implementação DEVE ser adequada a árvores profundas e largas.
    - O suporte arquitetural NÃO DEVE ampliar desproporcionalmente:
      - bundle;
      - memória;
      - listeners;
      - subscriptions;
      - custo por nó;
      - tempo de propagação;
      - frequência de renderização.
    - Recursos opcionais DEVEM permanecer desacopláveis do núcleo quando não
      utilizados.
    - A descoberta cacheada de framework, Zag.js, combinação e perfil DEVE
      impedir verificações recorrentes no caminho crítico.

  - **Interoperabilidade entre contextos**
    - O contrato DEVE ser aplicável, conforme suporte real, a:
      - DOM;
      - Web Components;
      - React;
      - Preact;
      - Zag.js;
      - combinações React + Zag.js e Preact + Zag.js;
      - outros frameworks e toolkits;
      - Workers;
      - iframes autorizados;
      - processos;
      - ambientes virtuais;
      - comunicação remota intermediada.
    - A semântica DEVE permanecer estável, ainda que o transporte varie.
    - O contrato NÃO DEVE presumir comunicação síncrona.
    - Transportes assíncronos DEVEM suportar:
      - correlação;
      - timeout;
      - cancelamento;
      - ordenação;
      - falha;
      - reconexão.
    - Ambientes com limites de serialização DEVEM usar representações
      interoperáveis, sem expor objetos não transferíveis como parte obrigatória
      do protocolo.
    - Recursos dependentes de DOM, framework, Zag.js ou combinação DEVEM
      declarar sua limitação de ambiente e não contaminar o contrato universal.

  - **Documentação e exemplos**
    - A subnorma e a documentação DEVEM conter exemplos de:
      - núcleo sem framework;
      - `PageZone` simples;
      - árvore com múltiplos níveis;
      - múltiplos irmãos;
      - implementação alternativa;
      - adaptador genérico;
      - adaptador React;
      - adaptador Preact;
      - React + Zag.js;
      - Preact + Zag.js;
      - Zag.js ausente;
      - framework ausente;
      - framework carregado tardiamente;
      - cache de descoberta;
      - recurso dependente desativado;
      - escolha e importação de cada perfil de release;
      - matriz expandida por nova integração opcional;
      - registro;
      - snapshot;
      - atualização incremental;
      - propagação ascendente;
      - comando descendente;
      - encerramento normal;
      - kill;
      - falha parcial;
      - nó não responsivo;
      - erro de renderização;
      - remoção inesperada;
      - reconciliação;
      - hook;
      - evento;
      - extensão customizada.
    - Incluir diagramas textuais equivalentes a:

      ```text
      Root
      └─ App A
         ├─ App B
         │  └─ App C
         └─ App D
      ```

      ```text
      estado: App C
         → agregado por App B
         → agregado por App A
         → agregado por Root
      ```

      ```text
      comando: App A encerra App C
         → App A valida autoridade
         → App B encaminha dentro da subárvore
         → App C executa e confirma
         → resultado retorna em cascata
      ```

      ```text
      Componente React/Preact
         ↔ adaptador opcional
         ↔ máquina Zag.js opcional
         ↔ nó lógico
         ↔ núcleo autônomo
      ```

    - Incluir contraexemplos de:
      - núcleo importando React, Preact ou Zag.js;
      - máquina Zag.js usada como estado operacional ou autoridade;
      - árvore JSX usada como autoridade;
      - Context tratado como fonte de verdade;
      - filho controlando pai;
      - raiz consultando internals diretamente;
      - bypass de nó intermediário;
      - ciclo hierárquico;
      - registro duplicado;
      - `kill` reportado apenas porque componente foi desmontado;
      - estado saudável fabricado após timeout;
      - layout visual tratado como contrato arquitetural;
      - implementação externa rejeitada apenas por nomenclatura distinta;
      - extensão customizada alterando semântica comum;
      - verificação de framework repetida em cada renderização;
      - framework ausente causando falha do núcleo;
      - React, Preact ou Zag.js incluído no bundle principal;
      - bundle único contendo todas as combinações como única distribuição;
      - perfil sem Zag.js importando Zag.js;
      - perfil React importando Preact ou vice-versa;
      - matriz de release incompleta.
    - Cada exemplo DEVE indicar:
      - contexto;
      - dependências;
      - comportamento esperado;
      - responsabilidades;
      - resultado;
      - motivo de conformidade ou não conformidade.

  - **Schemas e artefatos**
    - Produzir, quando compatível com o repositório:
      - interfaces TypeScript do núcleo;
      - contrato genérico de adaptadores;
      - tipos especializados React;
      - tipos especializados Preact;
      - tipos e contratos especializados Zag.js;
      - perfis React + Zag.js e Preact + Zag.js;
      - manifesto da matriz de releases;
      - schema do manifesto;
      - schema de eventos;
      - schema de comandos;
      - schema de snapshots;
      - enumerações ou tipos de estados;
      - tabela de transições;
      - matriz de capacidades;
      - registro de ambiente;
      - adaptador de referência;
      - suíte contratual;
      - exemplo mínimo sem framework;
      - exemplos opcionais React, Preact, React + Zag.js e Preact + Zag.js.
    - Artefatos DEVEM ser:
      - versionados;
      - determinísticos;
      - validáveis;
      - reutilizáveis;
      - referenciados pela subnorma.
    - A documentação NÃO DEVE duplicar integralmente estruturas verificáveis por
      schema; deve explicar sua semântica e referenciá-las.
    - Tipos, schemas, implementação, adaptadores e exemplos DEVEM permanecer
      sincronizados.
    - Artefatos de React, Preact ou Zag.js NÃO DEVEM ser importados por
      consumidores do núcleo ou de outro perfil sem solicitação explícita.

  - **Ordem de implementação**
    - Executar, no mínimo, na seguinte sequência, registrando obrigatoriamente, e previamente, na RCF/(planejamento de FTs, etapas e tarefas) com commit imeditado e exclusivo para os mesmos, antes de efetivamente refletir/implementar em código ou alteração de dirertórios/scripts:
      1. inspecionar normas, implementação, build e dependências existentes;
      2. modelar conceitos, autoridade e hierarquia;
      3. separar árvore lógica, representação visual, árvore de framework e
         comportamento de interação;
      4. definir núcleo TypeScript independente de UI;
      5. definir contrato genérico de adaptadores;
      6. separar contrato arquitetural de regras visuais, de framework e de
         toolkit;
      7. criar a subnorma;
      8. definir tipos, manifestos e schemas;
      9. implementar identidade, registro e vínculo no núcleo;
      10. implementar comunicação vertical;
      11. implementar agregação e snapshots;
      12. implementar eventos e comandos;
      13. implementar ciclo de vida;
      14. implementar encerramento e kill;
      15. implementar hooks;
      16. implementar recuperação e fail-safe;
      17. implementar descoberta e cache de ambientes, frameworks, Zag.js,
          combinações e adaptadores;
      18. criar adaptador genérico de referência;
      19. avaliar React e Preact conforme o estado real;
      20. avaliar Zag.js e delimitar apenas comportamentos de UI apropriados;
      21. implementar os adaptadores aprovados sem impor framework ou toolkit;
      22. implementar integrações Zag.js aprovadas sem transferir lógica do
          núcleo;
      23. definir manifesto geral da matriz de releases;
      24. gerar os perfis mínimos standalone, React, React + Zag.js, Preact e
          Preact + Zag.js;
      25. segregar bundles, tipos e entry points;
      26. incorporar a regra geral de combinações ao RCF;
      27. atualizar RCF, subnorma e `README.md`;
      28. executar testes unitários, integrados, contratuais, de bundle, de
          matriz e de resiliência;
      29. validar com implementação sem framework e implementação alternativa
          representativa;
      30. validar separadamente cada perfil publicado em ambiente limpo.
    - A escolha entre React e Preact e a adoção de Zag.js DEVEM ocorrer após:
      - definição do núcleo;
      - estabilização do contrato de adaptadores;
      - análise de dependências e bundle;
      - verificação do ecossistema real do repositório;
      - comprovação de ganho sem transferência indevida de responsabilidades.
    - A ordem PODE ser ajustada quando dependências reais exigirem, mas NÃO DEVE
      permitir:
      - estabilizar APIs antes de definir autoridade e precedência;
      - implementar lógica central dentro de framework ou Zag.js;
      - fazer o núcleo depender do adaptador provisório;
      - publicar perfil antes de validar sua combinação isoladamente;
      - adicionar integração opcional sem atualizar a matriz de release.

  - **Validação e aceite**
    - Confirmar por testes que:
      - comportamentos atuais permanecem compatíveis;
      - o núcleo funciona sem DOM, React, Preact ou Zag.js;
      - nenhum framework ou toolkit é necessário para inicializar ou utilizar a
        engine;
      - `PageZone` funciona sem filhos;
      - filhos são vinculados somente ao pai imediato;
      - ciclos são rejeitados;
      - identificadores duplicados são rejeitados;
      - cada nó conhece apenas sua subárvore;
      - filho não controla pai ou ancestral;
      - pai não controla nós fora de sua subárvore;
      - toda alteração é agregada e comunicada ao superior;
      - a raiz recebe visão completa da árvore;
      - quantidade de aplicações abertas está correta;
      - filhos diretos e descendentes permanecem distinguíveis;
      - profundidade e níveis estão corretos;
      - largura estrutural por nível está correta;
      - posição entre irmãos não é confundida com layout visual;
      - estados operacionais são agregados sem ocultar falhas;
      - snapshots e atualizações incrementais convergem ao mesmo estado;
      - eventos duplicados não duplicam transições;
      - mensagens fora de ordem são detectadas ou reconciliadas;
      - falha de filho não corrompe pai ou irmãos;
      - nó não responsivo permanece distinguível de encerrado;
      - encerramento normal respeita hooks e ciclo de vida;
      - kill valida autoridade;
      - desmontagem visual não é confundida com kill confirmado;
      - kill confirmado remove ou revoga efetivamente o nó;
      - falha de kill permanece visível;
      - operações em cascata informam resultados parciais;
      - remoção inesperada atualiza a árvore;
      - reconstrução recupera estado consistente;
      - manifestos inválidos não ativam integrações;
      - implementações alternativas funcionam por contrato;
      - adaptadores não alteram regras de negócio;
      - comunicação funciona sem dependência de nomes concretos;
      - regra arquitetural funciona com layout diferente;
      - hooks inválidos ou lentos não bloqueiam indefinidamente a árvore;
      - extensões desconhecidas essenciais são rejeitadas;
      - extensões opcionais seguras podem ser ignoradas;
      - segurança, isolamento e fail-safe permanecem ativos;
      - árvores profundas não causam recursão insegura;
      - árvores largas não provocam propagação desproporcional;
      - bundle e custo operacional permanecem proporcionais;
      - o núcleo não importa React, Preact, Zag.js ou tipos específicos;
      - adaptadores e máquinas opcionais permanecem segregados;
      - React não é exigido para usar Preact;
      - Preact não é exigido para usar React;
      - ausência dos frameworks ou de Zag.js não produz falha do núcleo;
      - framework ou Zag.js presente é identificado somente por mecanismo
        seguro;
      - descoberta não é repetida por componente, máquina, renderização ou
        instância;
      - resultado da descoberta e da combinação é reutilizado no mesmo contexto
        compatível;
      - contexts distintos não compartilham cache incompatível;
      - carregamento tardio atualiza o registro;
      - estados ausente, pendente, incompatível, combinação incompleta e
        disponível permanecem distintos;
      - recurso dependente somente é ativado após validação;
      - capacidades não disponíveis são informadas explicitamente;
      - fallback core é utilizado quando previsto;
      - recursos sem fallback falham de forma localizada e determinística;
      - adaptadores React e Preact, quando implementados, passam pela mesma
        suíte contratual;
      - integrações React + Zag.js e Preact + Zag.js passam pela suíte comum e
        pelas validações específicas;
      - máquinas Zag.js não substituem árvore, autoridade, estados operacionais
        nem ciclo de vida do núcleo;
      - Context, hooks e reducers não substituem a árvore e os estados do
        núcleo;
      - portals e estruturas visuais divergentes preservam a hierarquia lógica;
      - erro de renderização não corrompe o núcleo;
      - rerenders são limitados às projeções afetadas;
      - React, Preact e Zag.js não são incorporados ao bundle principal;
      - entry points comuns não carregam adaptadores ou máquinas opcionais;
      - a release contém, no mínimo, perfis standalone, Preact, Preact + Zag.js,
        React e React + Zag.js;
      - cada perfil contém somente código e tipos da combinação declarada;
      - o perfil standalone funciona sem dependências opcionais;
      - perfis sem Zag.js funcionam com Zag.js ausente;
      - perfis React não resolvem Preact e perfis Preact não resolvem React;
      - perfis combinados validam conjuntamente framework, Zag.js e adaptadores;
      - exports permitem selecionar diretamente o perfil;
      - a matriz de release é determinística, completa e coerente com o
        manifesto;
      - nova integração opcional expande a matriz com todas as combinações
        válidas e com sua ausência;
      - uma variante universal, se existir, não substitui os bundles
        especializados;
      - RCF, subnorma, tipos, schemas, testes, adaptadores, matriz de release e
        documentação descrevem o mesmo contrato;
      - o `README.md` e o RCF principal vinculam diretamente a subnorma;
      - outro projeto consegue implementar contêiner compatível, com estrutura
        visual e framework distintos, usando apenas a subnorma e os artefatos
        normativos.

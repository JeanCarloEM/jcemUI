- [ ] **Evoluir `PageZone` e seu `ContentWrapper` para formar uma arquitetura
      padronizada, hierárquica, aninhável, monitorável e interoperável de
      contêineres de aplicações**, com comunicação vertical bidirecional,
      agregação em cascata, controle operacional descendente, manifestos, hooks e
      contratos reutilizáveis, sem corromper as diretrizes, regras de negócio,
      isolamento, estrutura, comportamento, compatibilidade ou recursos atuais do
      projeto.
  - **Natureza e finalidade**
    - Tratar esta tarefa como adição de recursos e aprimoramento evolutivo da
      implementação existente, NÃO como reescrita, substituição arquitetural ou
      licença para alterar contratos atuais sem necessidade.
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
      - APIs e integrações existentes.
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
      - testes;
      - documentação.
    - A solução DEVE acrescentar capacidade de conhecimento, comunicação,
      monitoramento e controle hierárquicos sem transformar `PageZone` em
      componente monolítico, controlador global ou dependência obrigatória para
      implementações compatíveis.

  - **Modelo conceitual**
    - `PageZone` representa conceitualmente um contêiner de aplicação.
    - Seu `ContentWrapper` representa a área subordinada em que PODEM existir:
      - conteúdo próprio;
      - aplicações;
      - outros `PageZone`;
      - implementações semanticamente equivalentes.
    - Vários `PageZone` PODE estar aninhado no `ContentWrapper` de outro
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
    - A relação estrutural DEVE formar uma árvore ou floresta acíclica:
      - cada nó subordinado possui, no máximo, um pai hierárquico imediato;
      - um nó raiz não possui pai;
      - ciclos diretos ou indiretos são inválidos;
      - referências auxiliares NÃO DEVEM alterar a hierarquia de autoridade.

  - **Separação entre implementação e contrato**
    - `PageZone` e `ContentWrapper` são elementos reais deste repositório, mas
      seus nomes, estrutura física e tecnologia de implementação NÃO DEVEM ser
      confundidos com o contrato conceitual.
    - O contrato DEVE permitir que outro componente, objeto, Web Component,
      componente de framework, estrutura virtual ou implementação equivalente
      substitua `PageZone` e/ou `ContentWrapper`, desde que cumpra integralmente
      as normas de:
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
         interoperabilidade.
    - Regras visuais específicas deste repositório NÃO DEVEM ser impostas a
      implementações externas que adotem o contrato arquitetural.
    - O contrato arquitetural NÃO DEVE depender de uma aparência, layout ou
      estrutura visual específica.
    - Conceitos e microconceitos comuns PODEM ser compartilhados entre as
      normas, mas suas responsabilidades DEVEM permanecer separadas.
    - Quando necessário, regras visuais DEVEM apenas referenciar o contrato
      arquitetural, sem duplicá-lo.

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
      - definir contratos independentes de tecnologia;
      - ser consumível por humanos e IAs;
      - possuir linguagem normativa;
      - conter exemplos conformes e não conformes;
      - permitir reutilização por projetos com estrutura visual distinta;
      - ser diretamente mencionada e vinculada pelo RCF principal;
      - ser mencionada e vinculada pelo `README.md` em seção apropriada.
    - Alterações no RCF, em `PageZone`, `ContentWrapper` ou nos contratos de
      integração DEVEM incluir análise de impacto e atualização sincronizada
      dessa subnorma, de seus schemas, tipos, exemplos e testes.

  - **Microconceitos normativos**
    - Definir, no mínimo:
      - **Contêiner de Aplicação**: unidade equivalente a `PageZone`;
      - **Área de Conteúdo**: unidade equivalente a `ContentWrapper`;
      - **Nó**: contêiner participante da árvore;
      - **Raiz**: nó sem superior;
      - **Pai**: superior hierárquico imediato;
      - **Filho**: subordinado hierárquico imediato;
      - **Descendente**: filho direto ou indireto;
      - **Subárvore**: nó e todos os seus descendentes;
      - **Profundidade**: distância hierárquica entre nó e raiz considerada;
      - **Nível**: posição relativa na hierarquia;
      - **Largura estrutural**: quantidade de nós existentes em um nível ou
        grupo de filhos, sem implicar layout visual;
      - **Snapshot**: representação consistente do estado hierárquico em um
        instante;
      - **Evento hierárquico**: alteração propagada pela cadeia;
      - **Comando operacional**: solicitação de ação sobre nó autorizado;
      - **Agregação**: consolidação do estado próprio com o dos descendentes;
      - **Vínculo**: associação válida entre pai e filho;
      - **Capacidade**: operação declarada e suportada por um nó;
      - **Adaptador**: camada de conformidade para implementação equivalente.
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
      - descobrir partes da hierarquia acima além do estritamente fornecido
        pelo contrato.
    - O pai PODE emitir comandos aos seus descendentes somente dentro de sua
      própria subárvore e das capacidades autorizadas.
    - A autoridade DEVE ser derivada da hierarquia válida, e não de referências
      arbitrárias, acesso ao DOM, posse de identificadores ou ordem de
      carregamento.
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
    - A agregação DEVE preservar identidade e origem; um resumo numérico NÃO
      DEVE substituir a capacidade de localizar o nó correspondente.
    - O pai NÃO DEVE precisar reinspecionar internals dos filhos para reconstruir
      informações que estes já têm obrigação de fornecer.
    - Informações redundantes DEVEM ser minimizadas sem comprometer autonomia,
      diagnóstico ou recuperação.

  - **Identidade e endereçamento**
    - Cada nó DEVE possuir identificador estável e inequívoco dentro do contexto
      hierárquico aplicável.
    - O contrato DEVE distinguir:
      - identidade lógica;
      - identidade de instância;
      - caminho hierárquico;
      - nome de apresentação;
      - tipo ou implementação.
    - O caminho PODE mudar quando houver reparentalização autorizada; a
      identidade lógica NÃO DEVE ser confundida com esse caminho.
    - Identificadores NÃO DEVEM depender exclusivamente:
      - da posição no DOM;
      - do índice visual;
      - da ordem de carregamento;
      - de texto exibido;
      - de endereço de memória.
    - Colisões DEVEM ser detectadas antes da confirmação do vínculo.
    - Comandos, eventos e respostas DEVEM carregar identificação suficiente de:
      - origem;
      - destino;
      - correlação;
      - revisão;
      - contexto.

  - **Registro e vínculo hierárquico**
    - Um filho DEVE registrar-se somente no pai imediato que contém ou hospeda
      legitimamente sua instância.
    - O registro DEVE validar:
      - identidade;
      - compatibilidade de contrato;
      - capacidades;
      - manifesto;
      - versão;
      - ausência de ciclo;
      - autoridade do pai;
      - duplicidade;
      - estado inicial.
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
      histórico explicitamente separado do estado atual.
    - Reparentalização, caso permitida pelo estado real do projeto, DEVE ser
      atômica ou transacionalmente equivalente, sem período em que o nó pertença
      simultaneamente a duas árvores de autoridade.

  - **Manifesto de conformidade**
    - Cada implementação participante DEVE disponibilizar manifesto otimizado,
      legível por máquina e suficiente para declarar:
      - identidade do contrato;
      - versão;
      - tipo de nó;
      - implementação;
      - capacidades;
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
    - O manifesto DEVE conter somente informações necessárias ao acoplamento,
      sem duplicar definições já fornecidas por tipos ou schemas reutilizáveis.
    - Reutilizar prioritariamente:
      - TypeScript;
      - `.d.ts`;
      - JSON Schema;
      - contratos de eventos consolidados;
      - padrões assíncronos nativos;
      - formatos já normatizados no repositório.
    - Um manifesto completo PODE declarar recursos adicionais, mas o contrato
      DEVE identificar o subconjunto efetivamente usado.
    - A ausência de capacidade DEVE ser explicitamente distinguida de:
      - capacidade desconhecida;
      - capacidade temporariamente indisponível;
      - capacidade incompatível;
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
    - Cada transição DEVE declarar:
      - origem permitida;
      - destino;
      - causa;
      - ator;
      - efeitos;
      - possibilidade de cancelamento;
      - timeout;
      - eventos emitidos;
      - atualização agregada.
    - Transições inválidas DEVEM ser rejeitadas, não reinterpretadas.
    - O pai DEVE receber alterações de estado de toda a subárvore por
      propagação.
    - O estado agregado NÃO DEVE ocultar estados críticos minoritários apenas
      porque a maioria dos descendentes está operacional.

  - **Hooks**
    - Definir hooks para os momentos relevantes do ciclo de vida:
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
      - árvore completa.
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
      - a operação é cancelada;
      - o nó é degradado;
      - o nó é encerrado;
      - ocorre escalonamento.
    - A resposta NÃO DEVE depender de interpretação implícita.

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
      - alteração incremental.
    - Eventos DEVEM ser imutáveis após emissão ou semanticamente equivalentes.
    - Comandos potencialmente destrutivos DEVEM possuir confirmação,
      correlação ou mecanismo equivalente que permita determinar o resultado.
    - Mensagens duplicadas NÃO DEVEM causar duplicação de registro, transição ou
      encerramento.
    - A implementação DEVE suportar idempotência onde repetição possa ocorrer.
    - A propagação em cascata DEVE impedir:
      - loops;
      - eco;
      - tempestades de eventos;
      - reenvio indefinido;
      - perda silenciosa de eventos críticos.
    - Eventos agregados DEVEM preservar referência às origens afetadas.

  - **Severidade e diagnóstico**
    - Distinguir rigorosamente estado operacional de severidade diagnóstica.
    - Normatizar níveis equivalentes a:
      - `notice`: informação operacional relevante sem anomalia;
      - `warn`: condição anormal ou risco recuperável;
      - `error`: operação específica falhou, mas o nó PODE continuar;
      - `fail`: nó ou capacidade essencial tornou-se incapaz de cumprir seu
        contrato;
      - `fatal`, quando realmente necessário: integridade do nó ou da subárvore
        não pode ser preservada.
    - `kill` NÃO DEVE ser tratado como severidade; é comando operacional
      coercitivo.
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
      - descendentes afetados.
    - Diagnósticos NÃO DEVEM expor dados sensíveis nem internals desnecessários.
    - Falhas de um filho DEVEM ser comunicadas ao pai e agregadas sem
      necessariamente tornar toda a árvore falha quando o isolamento permitir
      continuidade segura.

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
      - inconsistências.
    - Consultas DEVEM poder ser:
      - pontuais;
      - agregadas;
      - filtradas;
      - por identificador;
      - por estado;
      - por nível;
      - por capacidade.
    - A observação NÃO DEVE conceder mutação.
    - Snapshots DEVEM possuir revisão suficiente para detectar desatualização.
    - O monitoramento DEVE distinguir:
      - estado confirmado;
      - estado transitório;
      - estado desconhecido;
      - nó não responsivo;
      - informação desatualizada.
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

  - **Encerramento normal**
    - O encerramento normal DEVE permitir:
      - aviso prévio;
      - hooks;
      - persistência autorizada;
      - liberação de recursos;
      - encerramento ordenado de descendentes;
      - cancelamento de operações;
      - confirmação final.
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

  - **Interrupção forçada e `kill`**
    - `kill` DEVE representar interrupção coercitiva usada quando:
      - encerramento normal falhar;
      - nó não responder;
      - timeout for excedido;
      - integridade ou segurança exigirem interrupção imediata;
      - política autorizada determinar.
    - `kill` DEVE ser capacidade explicitamente declarada.
    - A existência do comando lógico NÃO garante que todo ambiente consiga
      interromper fisicamente execução isolada; o contrato DEVE distinguir:
      - solicitação de kill;
      - interrupção efetiva;
      - isolamento do nó;
      - remoção lógica;
      - confirmação.
    - Em contextos como Worker ou processo isolado, a implementação PODE usar
      mecanismo nativo de terminação.
    - Em componentes sem isolamento físico, o `kill` DEVE aplicar a forma mais
      forte disponível de:
      - bloquear novas operações;
      - cancelar tarefas;
      - desconectar eventos;
      - revogar capacidades;
      - liberar recursos;
      - remover o nó;
        sem alegar terminação física não realizada.
    - `kill` DEVE:
      - validar autoridade;
      - registrar origem e motivo;
      - ser idempotente;
      - possuir timeout;
      - gerar diagnóstico;
      - atualizar a árvore;
      - comunicar o resultado ao superior.
    - Falha do `kill` DEVE produzir estado inequívoco, como
      `kill-failed`, `unresponsive` ou equivalente normatizado.
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
      - desconexão.
    - Uma falha localizada NÃO DEVE corromper:
      - pai;
      - irmãos;
      - ancestrais;
      - estado global;
      - outras subárvores.
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
      - reconexão.
    - A reconstrução NÃO DEVE exigir acesso irrestrito aos internals dos filhos.
    - Estado desconhecido DEVE permanecer explicitamente desconhecido; NÃO DEVE
      ser fabricado como saudável ou encerrado.

  - **Segurança e isolamento**
    - A comunicação DEVE ocorrer por interfaces controladas.
    - Filhos NÃO DEVEM receber acesso direto ao estado privado do pai.
    - Pais NÃO DEVEM receber acesso irrestrito ao estado privado dos filhos.
    - O contrato DEVE expor apenas:
      - estado necessário;
      - capacidades aprovadas;
      - operações autorizadas;
      - diagnósticos permitidos.
    - Referências DOM, objetos internos, closures, stores ou recursos privados
      NÃO DEVEM ser compartilhados como substituição do contrato.
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
    - Extensões e plugins NÃO DEVEM ampliar suas próprias permissões.

  - **Pluggabilidade e expansividade**
    - O contrato DEVE permitir:
      - implementações alternativas;
      - adaptadores;
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
      - mutação irrestrita do protocolo.
    - Extensões DEVEM declarar:
      - namespace ou origem;
      - versão;
      - compatibilidade;
      - capacidades;
      - fallback;
      - comportamento quando desconhecidas.
    - Consumidores DEVEM ignorar extensões desconhecidas somente quando isso for
      explicitamente seguro; extensões essenciais desconhecidas DEVEM impedir a
      ativação da integração afetada.

  - **Desempenho e escalabilidade**
    - A comunicação em cascata DEVE evitar:
      - varredura integral da árvore para toda alteração;
      - repetição de snapshots completos desnecessários;
      - serialização redundante;
      - eventos duplicados;
      - listeners globais por nó quando houver solução hierárquica mais
        eficiente.
    - Alterações locais DEVEM gerar atualizações incrementais quando isso
      preservar consistência.
    - Snapshots completos DEVEM permanecer disponíveis para:
      - inicialização;
      - recuperação;
      - reconciliação;
      - auditoria;
        sem se tornarem o único mecanismo operacional.
    - Eventos frequentes PODEM ser agrupados ou reduzidos, desde que:
      - estados críticos não sejam atrasados indevidamente;
      - ordem semântica seja preservada;
      - o resultado final seja determinístico.
    - A implementação DEVE ser adequada a árvores profundas e largas.
    - O suporte arquitetural NÃO DEVE ampliar desproporcionalmente:
      - bundle;
      - memória;
      - listeners;
      - custo por nó;
      - tempo de propagação.
    - Recursos opcionais DEVEM permanecer desacopláveis do núcleo quando não
      utilizados.

  - **Interoperabilidade entre contextos**
    - O contrato DEVE ser aplicável, conforme suporte real, a:
      - DOM;
      - Web Components;
      - frameworks;
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

  - **Documentação e exemplos**
    - A subnorma e a documentação DEVEM conter exemplos de:
      - `PageZone` simples;
      - árvore com múltiplos níveis;
      - múltiplos irmãos;
      - implementação alternativa;
      - adaptador;
      - registro;
      - snapshot;
      - atualização incremental;
      - propagação ascendente;
      - comando descendente;
      - encerramento normal;
      - kill;
      - falha parcial;
      - nó não responsivo;
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

    - Incluir contraexemplos de:
      - filho controlando pai;
      - raiz consultando internals diretamente;
      - bypass de nó intermediário;
      - ciclo hierárquico;
      - registro duplicado;
      - `kill` reportado sem confirmação;
      - estado saudável fabricado após timeout;
      - layout visual tratado como contrato arquitetural;
      - implementação externa rejeitada apenas por nomenclatura distinta;
      - extensão customizada alterando semântica comum.
    - Cada exemplo DEVE indicar:
      - contexto;
      - comportamento esperado;
      - responsabilidades;
      - resultado;
      - motivo de conformidade ou não conformidade.

  - **Schemas e artefatos**
    - Produzir, quando compatível com o repositório:
      - interfaces TypeScript;
      - schema do manifesto;
      - schema de eventos;
      - schema de comandos;
      - schema de snapshots;
      - enumerações ou tipos de estados;
      - tabela de transições;
      - matriz de capacidades;
      - adaptador de referência;
      - suíte contratual;
      - exemplo mínimo.
    - Artefatos DEVEM ser:
      - versionados;
      - determinísticos;
      - validáveis;
      - reutilizáveis;
      - referenciados pela subnorma.
    - A documentação NÃO DEVE duplicar integralmente estruturas verificáveis por
      schema; deve explicar sua semântica e referenciá-las.
    - Tipos, schemas, implementação e exemplos DEVEM permanecer sincronizados.

  - **Ordem de implementação**
    - Executar, no mínimo, na seguinte sequência:
      1. inspecionar normas e implementação existentes;
      2. modelar conceitos, autoridade e hierarquia;
      3. separar contrato arquitetural de regras visuais;
      4. criar a subnorma;
      5. definir tipos, manifestos e schemas;
      6. implementar identidade, registro e vínculo;
      7. implementar comunicação vertical;
      8. implementar agregação e snapshots;
      9. implementar eventos e comandos;
      10. implementar ciclo de vida;
      11. implementar encerramento e kill;
      12. implementar hooks;
      13. implementar recuperação e fail-safe;
      14. criar adaptador de referência;
      15. atualizar RCF e `README.md`;
      16. executar testes unitários, integrados, contratuais e de resiliência;
      17. validar com implementação alternativa representativa.
    - A ordem PODE ser ajustada quando dependências reais exigirem, mas NÃO DEVE
      permitir estabilizar APIs antes de definir autoridade, hierarquia e
      precedência.

  - **Validação e aceite**
    - Confirmar por testes que:
      - comportamentos atuais permanecem compatíveis;
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
      - RCF, subnorma, tipos, schemas, testes e documentação descrevem o mesmo
        contrato;
      - o `README.md` e o RCF principal vinculam diretamente a subnorma;
      - outro projeto consegue implementar contêiner compatível, com estrutura
        visual distinta, usando apenas a subnorma e os artefatos normativos.

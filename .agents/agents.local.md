# Extensão operacional local — jcemUI

Esta extensão limita-se ao contexto operacional local do jcemUI e permanece subordinada ao `AGENTS.md`, ao `RCF.md` e aos cenários gerenciados aplicáveis.

## Contexto do produto

- O repositório implementa uma biblioteca de interface reutilizável e sua demonstração Web Page Like.
- `RCF.md` é a SSOT de produto; este arquivo não cria requisito, regra de negócio ou contrato arquitetural.
- `assets/ui.svg` é a fonte autoritativa do esqueleto visual, nos limites normatizados pelo RCF.
- Regras de blog, Jekyll, Minimal Mistakes, posts, conteúdo editorial e pipelines editoriais não se aplicam a este repositório.

## Limites locais

- Extensões locais não substituem nem duplicam `./.agents/core/`, `./.agents/meta/` ou `./.agents/scenarios/`.
- Mudança reutilizável de governança deve seguir a via upstream prevista pelo cenário gerenciado correspondente.
- O estado de execução permanece exclusivamente em `./.agents/continue.ia`; `handoff.md` permanece derivado.

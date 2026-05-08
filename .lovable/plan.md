## Problema

No Hero (`src/components/Hero.tsx`), o container dos CTAs usa `flex flex-col sm:flex-row flex-wrap`. Como cada idioma tem comprimentos de texto diferentes (ex.: alemão "Ich möchte verstehen, wie Therapie mir helfen kann" é bem mais longo que o português), os botões:

- Quebram para uma segunda linha em alguns idiomas (`flex-wrap`)
- Ficam com alturas diferentes entre si quando um texto quebra internamente
- "Pulam de posição" ao trocar o idioma

## Solução

Tornar o layout dos CTAs previsível e estável, independente do tamanho do texto:

1. **Remover `flex-wrap`** — impede que o segundo botão pule para baixo em idiomas longos.
2. **Botões com largura igual em desktop** (`flex-1` + `basis-0`) e com `max-w` razoável, para que mesmo com textos diferentes ocupem o mesmo espaço.
3. **Alinhar alturas** com `items-stretch` no container e `text-center` + `leading-tight` nos botões, permitindo quebra de linha interna sem desalinhar.
4. **Mobile**: manter empilhado (`flex-col`), cada botão ocupando 100% da largura — comportamento já estável.
5. **Reduzir levemente o padding horizontal** (`px-6` em vez de `px-8`) para acomodar textos longos sem precisar quebrar em duas linhas em idiomas como alemão/holandês.

## Detalhes técnicos

Arquivo afetado: `src/components/Hero.tsx` (apenas o `<div>` dos CTAs e classes dos dois `<button>`).

```text
Antes:  flex flex-col sm:flex-row flex-wrap gap-4
Depois: flex flex-col sm:flex-row items-stretch gap-4

Botões:
- adicionar: flex-1 sm:basis-0 sm:max-w-xs text-center leading-tight
- ajustar:   px-6 (em vez de px-8)
```

Sem mudanças em traduções, lógica, analytics ou outros componentes.
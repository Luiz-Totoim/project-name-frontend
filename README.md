# NewsExplorer — Frontend

Aplicação React (CRA) com pesquisa de notícias, UI acessível e integração com API.

## Sumário
- [Stack](#stack)
- [Setup](#setup)
- [Scripts](#scripts)
- [Ambiente](#ambiente)
- [Critérios do roteiro](#critérios-do-roteiro)
- [Como contribuir](#como-contribuir)
- [Checklist de revisão](#checklist-de-revisão)

## Stack
- React 18 + Create React App
- CSS modular simples (arquivos por componente)
- ESLint (React, Hooks, A11y) + Prettier
- Testing Library (React/Jest DOM)

## Setup
1. Instale dependências:
   ```powershell
   npm install
   ```
2. Crie o arquivo `.env` baseado em `.env.example` e informe sua chave:
   - `REACT_APP_NEWS_API_KEY=...`
   - `REACT_APP_NEWS_API_LANG=pt` (opcional)
3. Rode em desenvolvimento:
   ```powershell
   npm start
   ```

## Scripts
- `npm start`: roda o dev server
- `npm run build`: gera build de produção
- `npm test`: executa testes (Jest/Testing Library)
- `npm run lint`: checa ESLint
- `npm run lint:fix`: corrige problemas auto-fix
- `npm run format`: formata com Prettier
- `npm run format:check`: checa formatação
- `npm run check:branding`: valida ausência de termos proibidos (Copilot/ChatGPT/OpenAI/IA)

## Ambiente
- Use `.env.example` como base; não commite segredos.
- O projeto usa `AbortController` para cancelar buscas em progresso.

## Critérios do roteiro
- [x] Etapa 1 — Marcação e JSX
- [x] Etapa 1 — UI Kit e interação
- [x] Etapa 1 — Responsividade e acessibilidade
- [x] Etapa 2 — Conectar API e lógica React
- [x] Etapa 2 — Paginação “Mostrar mais”
- [x] Testes e linting (configuração + testes básicos)
- [ ] Boas práticas e limpeza (hooks custom, constantes em MAIÚSCULAS, cleanups)
- [ ] Performance (lazy images, otimizações)
- [ ] Documentação final (expandir exemplos, troubleshooting)
- [ ] Deploy (Netlify/Vercel/GitHub Pages)

## Como contribuir
- Branch por etapa/feature: `feature/<descr>-etapaX`.
- Commits: `Aplicativo front-end — Etapa X: <descrição curta>`.
- Abra PRs com checklist (template em `.github/PULL_REQUEST_TEMPLATE.md`).

## Checklist de revisão
- Build rodou sem erros (`npm run build`)?
- Lint sem erros (`npm run lint`)?
- Testes passaram (`npm test`)?
- Branding sem termos proibidos (`npm run check:branding`)?
- Acessibilidade: foco visível, `aria-*` correto, modal fecha por ESC/overlay/x, `role="dialog"` no painel?
- Responsividade: sem rolagem horizontal, grid se adapta ≥ 320px?
- API: erro tratado, preloader mostra, “Nada encontrado” quando vazio?
- Paginação: exibe 3 e carrega +3 por clique?
- Segurança: links externos com `rel="noopener noreferrer"`?
- Documentação: README atualizado?

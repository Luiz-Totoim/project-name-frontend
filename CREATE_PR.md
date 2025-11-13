# Como Criar o Pull Request

## Opção 1: Via GitHub Web UI (mais rápido)

1. Abra no navegador: https://github.com/Luiz-Totoim/project-name-frontend/pull/new/feat/project-info
2. A página já vai reconhecer a branch `feat/project-info`
3. Selecione `main` como branch base (se não estiver selecionada)
4. Preencha o título e descrição (veja abaixo) e clique em "Create pull request"

### Título do PR
```
feat: add project-info metadata and screenshots list
```

### Descrição do PR
```
## O que foi feito

- Adicionado diretório `project-info` com:
  - `project-info/screenshots.txt` — lista de caminhos das capturas fornecidas (54 imagens)
  - `project-info/README_pt-BR.md` — resumo do projeto NewsExplorer e instruções técnicas
  - `project-info/manifest.json` — metadados do projeto
- Adicionado `.github/PULL_REQUEST_TEMPLATE.md` para padronizar PRs futuras

## Por que

Organizar e documentar as informações iniciais do projeto (requisitos, arquitetura conceitual, screenshots) para facilitar o desenvolvimento da primeira etapa do front-end.

## Como testar

1. Checkout na branch `feat/project-info`
2. Verificar o diretório `project-info` e seus conteúdos
3. Ler `project-info/README_pt-BR.md` para entender os requisitos do projeto

## Notas

- As imagens em si ainda não foram copiadas para o workspace; `screenshots.txt` contém os caminhos locais
- Próximas etapas: criar esqueleto do front-end (React + Vite) e implementar página de busca com integração à News API
```

---

## Opção 2: Via GitHub CLI (se tiver instalado)

Execute no PowerShell:

```powershell
cd "c:\Users\totoi\Desktop\project-name-frontend"
gh pr create --base main --head feat/project-info --title "feat: add project-info metadata and screenshots list" --body "## O que foi feito

- Adicionado diretório \`project-info\` com:
  - \`project-info/screenshots.txt\` — lista de caminhos das capturas fornecidas (54 imagens)
  - \`project-info/README_pt-BR.md\` — resumo do projeto NewsExplorer e instruções técnicas
  - \`project-info/manifest.json\` — metadados do projeto
- Adicionado \`.github/PULL_REQUEST_TEMPLATE.md\` para padronizar PRs futuras

## Por que

Organizar e documentar as informações iniciais do projeto (requisitos, arquitetura conceitual, screenshots) para facilitar o desenvolvimento da primeira etapa do front-end.

## Como testar

1. Checkout na branch \`feat/project-info\`
2. Verificar o diretório \`project-info\` e seus conteúdos
3. Ler \`project-info/README_pt-BR.md\` para entender os requisitos do projeto

## Notas

- As imagens em si ainda não foram copiadas para o workspace; \`screenshots.txt\` contém os caminhos locais
- Próximas etapas: criar esqueleto do front-end (React + Vite) e implementar página de busca com integração à News API"
```

---

## Opção 3: Via curl (se souber seu GitHub token)

Substitua `YOUR_GITHUB_TOKEN` pelo seu token pessoal:

```powershell
$headers = @{
    "Authorization" = "token YOUR_GITHUB_TOKEN"
    "Accept"        = "application/vnd.github.v3+json"
}

$body = @{
    "title" = "feat: add project-info metadata and screenshots list"
    "head"  = "feat/project-info"
    "base"  = "main"
    "body"  = "..."  # copie a descrição acima
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://api.github.com/repos/Luiz-Totoim/project-name-frontend/pulls" `
    -Method POST `
    -Headers $headers `
    -Body $body `
    -ContentType "application/json"
```

---

**Próximo passo após criar o PR:**
- Mergear o PR ou deixar para revisão
- Começar a etapa 2: gerar esqueleto do front-end (React + Vite)

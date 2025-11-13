NewsExplorer — resumo do projeto

Objetivo

Desenvolver um front-end onde usuários possam pesquisar notícias (usando a News API) e salvar artigos nos seus perfis.

Requisitos principais

- Ao inserir uma palavra-chave na barra de pesquisa, o site deve enviar uma requisição à News API, buscar todos os artigos relevantes da última semana e exibir uma lista de cartões para cada artigo encontrado.
- Todos os artigos salvos pelo usuário devem ser exibidos em uma seção especial do site (página de itens salvos).

Implementação de front-end (escopo mínimo)

O front-end consiste em duas páginas principais:

1) Página principal com caixa de pesquisa
   - Barra de pesquisa com botão "Procurar".
   - Exibir resultados em cards (título, descrição/resumo, fonte, data, imagem, botão para salvar).
   - Paginação ou scroll infinito opcional.

2) Página de itens salvos
   - Lista de artigos salvos pelo usuário.
   - Permitir remover (desfavoritar) e abrir o artigo original.

Observações técnicas e sugestões

- Autenticação: para salvar itens por usuário, é necessário um mecanismo de autenticação (pode ser simulado localmente ou integrado ao back-end se houver).
- News API: use parâmetros para filtrar por data (última semana) e por palavra-chave; trate limites de rate e erros de rede.
- Armazenamento local: enquanto não houver back-end, considerar localStorage para protótipo.
- Acessibilidade e responsividade: garantir que a UI funcione em dispositivos móveis.

Arquivos relacionados

- `screenshots.txt` — lista com todos os caminhos locais das capturas de tela que você enviou.
- `manifest.json` — metadados do projeto (criado automaticamente).

Próximos passos sugeridos

1) Copiar as imagens do diretório original (C:\Users\totoi\Pictures\Screenshots) para `project-info\images` neste workspace. Abaixo há comandos PowerShell sugeridos.
2) Decidir se haverá back-end (API para salvar artigos) ou se iniciaremos com protótipo local (localStorage).
3) Criar esqueleto do projeto front-end (por exemplo React + Vite) e começar pela página de busca.

Comandos PowerShell (copiar os arquivos listados para a pasta do projeto)

# criar pasta de imagens no workspace
New-Item -ItemType Directory -Path "c:\Users\totoi\Desktop\project-name-frontend\project-info\images" -Force

# copiar todos os arquivos listados em screenshots.txt (exemplo: copiar todos .png do diretório Screenshots)
Copy-Item -Path "C:\Users\totoi\Pictures\Screenshots\*.png" -Destination "c:\Users\totoi\Desktop\project-name-frontend\project-info\images\" -Force

# OU copiar arquivos específicos:
Copy-Item -Path "C:\Users\totoi\Pictures\Screenshots\Captura de tela 2025-11-13 104931.png" -Destination "c:\Users\totoi\Desktop\project-name-frontend\project-info\images\" -Force

Se quiser, eu executo os comandos para você (nota: eu não tenho acesso direto aos seus arquivos locais), ou posso gerar um script .ps1 pronto para você rodar.

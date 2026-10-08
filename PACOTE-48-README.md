# Trattoria D'Elite - pacote de 48 melhorias
## Escopo
O site publicado usa GitHub Pages (estático). A API ASP.NET Core e o SQL Server Express local não são hospedados pelo GitHub Pages. Não expor o SQL Server Express do computador à internet.
## Recursos
- 1 a 8: páginas e módulos já existentes no site.
- Central recursos.html: catálogo das 48 melhorias com situação de cada uma.
- laboratorio.html: 26 módulos demonstrativos no navegador; SEM persistência entre dispositivos, SEM integração SQL, SEM dados reais de pagamentos ou entregas.
- App instalável: manifest.webmanifest e sw.js com cache restrito a recursos públicos. Nenhuma resposta de API nem páginas de perfil/checkout é armazenada no cache offline.
- Tema escuro, pular para conteúdo, carregamento lento de imagens e mapa do site para SEO.
- Link do cardápio por QR Code público gerado externamente pela API goQR, que recebe somente a URL pública do cardápio.
## Requer trabalho no backend
- Contas reais (#19), avaliações com fotos verificadas (#20), permissões de funcionários (#32), cobrança e cupons reais, estoques e reservas multiusuário, notificações push reais e idempotência de pedidos (#48).
- Recomendado: API ASP.NET Core hospedada com HTTPS, autenticação/cookies HttpOnly, validação no servidor, autorização por função, rate-limiting, migrações SQL, auditoria e backups testados.
- Não use contas ou senhas reais na versão demonstrativa.
## Reversão
Backup do código anterior à atualização: branch backup-antes-pacote-48-20261008. Reverta em novo commit, evitando reescrever histórico; alterações no banco não foram efetuadas.
## Observação
A central demonstra recursos e NÃO constitui uma entrega de 48 sistemas completos e integrados. O status de cada recurso aparece na própria central.
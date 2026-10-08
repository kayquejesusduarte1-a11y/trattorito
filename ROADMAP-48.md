# Trattoria D'Elite — 48 melhorias (acompanhamento)

Estado atualizado em 2026-10-08. **Ativa** = funcionalidade visível/operacional no site estático; **Demonstração** = só armazenamento local e simulação, sem funcionamento no restaurante; **Parcial** = parte visual ou técnica pronta, ainda incompleta; **Servidor necessário** = depende de infraestrutura autenticada.

O GitHub Pages NÃO acessa SQL Server local. Este repositório NÃO inclui o Program.cs da API local. Dados, pedidos, acesso, estoque e reservas reais exigem servidor hospedado, validação, autenticação e testes de integração. Não cadastrar dados reais ou cartão.

Número | Melhoria | Estado | Onde conferir
---|---|---|---
| 1 | Página inicial premium | Ativa | `index.html` |
| 2 | Personalização de pratos | Demonstração | `pratos.html` |
| 3 | Carrinho inteligente | Demonstração | `carrinho.html` |
| 4 | Fidelidade | Demonstração | `index.html` |
| 5 | Acompanhamento visual | Demonstração | `pedido.html` |
| 6 | Versão mobile | Ativa | `index.html` |
| 7 | Busca inteligente | Ativa | `pratos.html` |
| 8 | Recomendações | Ativa | `pratos.html` |
| 9 | Reserva de mesas | Demonstração | `#reservas` |
| 10 | Pedir novamente | Demonstração | `#pedidos` |
| 11 | Painel administrativo | Demonstração | `painel.html` |
| 12 | Painel da cozinha | Demonstração | `#gestao` |
| 13 | Controle de estoque | Demonstração | `#gestao` |
| 14 | Relatórios e gráficos | Demonstração | `#gestao` |
| 15 | Assistente virtual | Demonstração | `#ajuda` |
| 16 | Aplicativo instalável (PWA) | Parcial | `#tecnologia` |
| 17 | Modo claro e escuro | Ativa | `#tecnologia` |
| 18 | Central de notificações | Demonstração | `#gestao` |
| 19 | Perfil do cliente | Demonstração | `perfil.html` |
| 20 | Avaliações com fotos | Parcial | `avaliacoes.html` |
| 21 | Menu do dia | Demonstração | `#menu-dia` |
| 22 | Promoções programadas | Demonstração | `combos.html` |
| 23 | QR Code do cardápio | Parcial | `#tecnologia` |
| 24 | Lista de ingredientes | Parcial | `#cardapio-info` |
| 25 | Comparador de pratos | Ativa | `#cardapio-info` |
| 26 | Acessibilidade | Parcial | `index.html` |
| 27 | Monte seu próprio prato | Demonstração | `#monte` |
| 28 | Agendar pedidos | Demonstração | `#reservas` |
| 29 | Informações alimentares | Parcial | `#cardapio-info` |
| 30 | Comprovante PDF | Ativa | `#pedidos` |
| 31 | Caixa digital (PDV) | Demonstração | `#gestao` |
| 32 | Sistema de funcionários | Servidor necessário | `#seguranca` |
| 33 | Impressão de comandas | Demonstração | `#gestao` |
| 34 | Cronômetro de preparo | Demonstração | `#gestao` |
| 35 | Aberto ou fechado | Demonstração | `#gestao` |
| 36 | Cancelamento de pedidos | Demonstração | `#pedidos` |
| 37 | Central de ajuda | Ativa | `#ajuda` |
| 38 | Cardápio sazonal | Demonstração | `#menu-dia` |
| 39 | Histórico de alterações | Demonstração | `#gestao` |
| 40 | Painel de entregadores | Demonstração | `#gestao` |
| 41 | Lista de espera | Demonstração | `#reservas` |
| 42 | Eventos e encomendas | Demonstração | `#reservas` |
| 43 | Três idiomas | Parcial | `#tecnologia` |
| 44 | Galeria do restaurante | Ativa | `#galeria` |
| 45 | Site mais rápido | Parcial | `index.html` |
| 46 | SEO para Google | Parcial | `index.html` |
| 47 | Backup do sistema | Parcial | `#tecnologia` |
| 48 | Proteção contra pedidos duplicados | Parcial | `#seguranca` |

## Pendências fundamentais para a versão real

- Publicar API ASP.NET Core com HTTPS e servidor SQL acessível de forma segura (não expor SQLEXPRESS residencial na internet).
- Autenticação real em servidor, cookies seguros, recuperação de conta e permissões separadas para clientes, funcionários e administração.
- Criar rotas de pedidos, atualizações de status, reservas, estoques, agenda, promoções, taxas de entrega e idempotência com validação no servidor e testes de autorização.
- Garantir pagamentos apenas com processador reconhecido; não coletar dados de cartão no site escolar.
- Implantar cópias de segurança do SQL Server, monitoramento, logs e tratamento de dados pessoais.
- Revisar acessibilidade, fotos, informações de alérgenos, tradução completa, PWA instalável em dispositivos e SEO local somente com dados reais.

## Segurança

Recursos criados em `recursos48.html` usam apenas `localStorage` (não são um backend). A aplicação não autoriza gestão de funcionários no GitHub Pages. O backup JSON exporta somente dados ilustrativos e não contém contas nem senhas.

## Reversão

Antes de implementar esta etapa, foi criada a branch `backup-antes-48-melhorias-20261008`. Para desfazer, é possível restaurar os arquivos dessa revisão em um novo commit, sem apagar o histórico.

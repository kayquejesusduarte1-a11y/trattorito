-- Trattoria D'Elite: importacao inicial do cardapio que ja existe no site.
-- Gerado a partir das 3 paginas do repositorio: 26 pratos, 11 sobremesas, 2 bebidas.
-- Nao altera HTML, CSS, fotos ou funcionamento do site.
-- Pode executar mais de uma vez: so insere produtos cujo Nome ainda nao existe.
USE Trattorito;
GO

IF OBJECT_ID(N'dbo.Produtos', N'U') IS NULL
BEGIN
    THROW 50001, 'A tabela dbo.Produtos nao existe. Crie-a antes de importar.', 1;
END;
GO

SET XACT_ABORT ON;
BEGIN TRANSACTION;

-- Se ja existir um produto com o mesmo Nome, preservamos o cadastro atual.
INSERT INTO dbo.Produtos (Nome, Descricao, Preco, Categoria)
SELECT Fonte.Nome, Fonte.Descricao, Fonte.Preco, Fonte.Categoria
FROM (VALUES
  (N'Spaghetti alla Norma', N'Spaghetti ao molho de tomate com berinjela, ricota e manjericão fresco.', 39.90, N'Pratos Principais'),
  (N'Spaghetti alla Carbonara', N'Espaguete cremoso com queijo, ovos e pancetta, finalizado com pimenta-do-reino.', 49.90, N'Pratos Principais'),
  (N'Ravioli al Pesto', N'Ravioli recheado com pesto de manjericão e queijo, servido com molho especial.', 38.90, N'Pratos Principais'),
  (N'Spaghetti Cacio e Pepe', N'Espaguete envolvido em molho cremoso de queijo pecorino e pimenta-do-re-reino.', 42.90, N'Pratos Principais'),
  (N'Gnocchi alla Sorrentina', N'Nhoque macio com molho de tomate, manjericão e queijo gratinado.', 38.90, N'Pratos Principais'),
  (N'Fettuccine ao Pesto com Camarões', N'Fettuccine ao pesto com camarões, ervas frescas e parmesão.', 74.90, N'Pratos Principais'),
  (N'Pizza ai Funghi', N'Pizza artesanal com mix de cogumelos, mozzarella e ervas.', 59.90, N'Pratos Principais'),
  (N'Ravioli de Queijo ao Molho Cremoso', N'Ravioli recheado com queijo servido com molho cremoso e ervas.', 59.90, N'Pratos Principais'),
  (N'Risoto de Funghi', N'Risoto cremoso com funghi, queijo e sabor marcante.', 79.90, N'Pratos Principais'),
  (N'Pizza Margherita', N'Pizza artesanal com tomate, mozzarella, manjericão e azeite.', 49.90, N'Pratos Principais'),
  (N'Receita de Ensalada de Pasta con Pollo', N'Ensalada de pasta com frango, vegetais e molho leve.', 39.90, N'Pratos Principais'),
  (N'Filé Mignon ao Molho de Vinho Tinto', N'Filé mignon grelhado servido com molho encorpado e acompanhamento.', 89.90, N'Pratos Principais'),
  (N'Pollo al limone con rosmarino', N'Frango assado com limão, alecrim e ervas, acompanhado de batatas.', 59.90, N'Pratos Principais'),
  (N'Beef Stew', N'Carne cozida lentamente com legumes, ervas e molho encorpado.', 69.90, N'Pratos Principais'),
  (N'Beef carpaccio with arugula and parmesan', N'Carpaccio bovino com rúcula, parmesão e tempero da casa.', 64.90, N'Pratos Principais'),
  (N'Carpaccio di Manzo', N'Finas fatias de carne bovina com azeite, limão e parmesão.', 69.90, N'Pratos Principais'),
  (N'Risoto Cremoso de Cogumelos', N'Arroz arbóreo cremoso com cogumelos, ervas e parmesão.', 49.90, N'Pratos Principais'),
  (N'Fettuccine ao Molho Cremoso com Parmesão', N'Fettuccine em molho cremoso com parmesão e ervas.', 45.90, N'Pratos Principais'),
  (N'Fettuccine ao molho Pesto', N'Fettuccine ao pesto fresco de manjericão, parmesão e azeite.', 40.90, N'Pratos Principais'),
  (N'Ravioli de Limão siciliano', N'Ravioli recheado com limão siciliano, queijo cremoso e ervas.', 25.90, N'Pratos Principais'),
  (N'Salada Caesar com Camarão Grelhado', N'Folhas frescas, camarão grelhado, parmesão e molho Caesar.', 59.90, N'Pratos Principais'),
  (N'Salada Caprese', N'Tomate, mozzarella de búfala e manjericão fresco com azeite.', 29.90, N'Pratos Principais'),
  (N'Caponata de Berinjela', N'Berinjela assada com tomates, azeitonas e temperos mediterrâneos.', 24.90, N'Pratos Principais'),
  (N'Burrata com Tomates-Cereja', N'Burrata cremosa acompanhada de tomates-cereja, folhas e azeite.', 30.90, N'Pratos Principais'),
  (N'Creme de Abóbora', N'Creme aveludado de abóbora com ervas e sementes.', 35.90, N'Pratos Principais'),
  (N'Sopa Cremosa de Abacate com Torradas', N'Sopa cremosa de abacate acompanhada de torradas crocantes.', 39.90, N'Pratos Principais'),
  (N'Cannoli de Limão Siciliano', N'Cannoli crocante com recheio de creme de limão e merengue.', 29.90, N'Sobremesas'),
  (N'Panna Cotta de Maracujá', N'Creme doce e aveludado à base de creme de leite com calda de maracujá.', 28.90, N'Sobremesas'),
  (N'Cannoli de Pistache', N'Cannoli crocante com recheio de ricota e pontas de pistache.', 34.90, N'Sobremesas'),
  (N'Panna Cotta de Frutas Vermelhas', N'Base cremosa de leite e gelatina com calda de frutas vermelhas.', 31.90, N'Sobremesas'),
  (N'Tiramisù', N'Camadas de mascarpone, café e biscoito, finalizadas com cacau.', 32.90, N'Sobremesas'),
  (N'Torta de Frutas Vermelhas', N'Torta de chocolate com creme de frutas vermelhas.', 34.90, N'Sobremesas'),
  (N'Panna Cotta de Café', N'Creme de leite cozido com um toque de café tostado.', 29.90, N'Sobremesas'),
  (N'Torta de Maracujá', N'Base crocante de biscoito, recheio cremoso de maracujá e cobertura de chantilly.', 31.90, N'Sobremesas'),
  (N'Classic Sicilian Cannoli', N'Massa doce e crocante, recheada com creme de ricota adocicado e gotas de chocolate.', 32.90, N'Sobremesas'),
  (N'Torta Caprese', N'Tradicional bolo italiano de chocolate e amêndoas sem farinha, com açúcar de confeiteiro.', 31.90, N'Sobremesas'),
  (N'Sfogliatella', N'Doce napolitano de massa folhada crocante, recheado com creme de ricota doce.', 31.90, N'Sobremesas'),
  (N'Limonada Rosa', N'Limonada refrescante de limão com um delicado toque de frutas vermelhas.', 19.99, N'Bebidas'),
  (N'Limonada', N'Clássica e refrescante, feita com limão e servida bem gelada. Uma opção leve e equilibrada para qualquer momento.', 19.99, N'Bebidas')
) AS Fonte(Nome, Descricao, Preco, Categoria)
WHERE NOT EXISTS (
    SELECT 1
    FROM dbo.Produtos AS Existente WITH (UPDLOCK, HOLDLOCK)
    WHERE Existente.Nome = Fonte.Nome
);

COMMIT TRANSACTION;
GO

SELECT Categoria, COUNT(*) AS Quantidade
FROM dbo.Produtos
GROUP BY Categoria
ORDER BY Categoria;

SELECT Id, Nome, Categoria, Preco
FROM dbo.Produtos
ORDER BY Categoria, Nome;
GO

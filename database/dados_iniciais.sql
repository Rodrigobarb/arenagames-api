-- Dados de exemplo (inseridos só se o banco estiver vazio)

insert into jogos (nome, genero) values
 ('League of Legends', 'MOBA'),
 ('Counter-Strike 2', 'FPS'),
 ('Valorant', 'FPS'),
 ('Rocket League', 'Esporte');

insert into equipes (nome, sigla, cidade, jogo) values
 ('Lobos do Planalto', 'LDP', 'Passo Fundo', 1),
 ('Gaúchos Gaming', 'GGX', 'Porto Alegre', 2),
 ('IFSul Titans', 'IFT', 'Passo Fundo', 3),
 ('Serra Esports', 'SER', 'Caxias do Sul', 4);

insert into jogadores (nickname, nome, funcao, equipe) values
 ('Lobinho', 'Carlos Silva', 'Mid', 1),
 ('Guri', 'Pedro Souza', 'Atirador', 1),
 ('Chimarrao', 'Lucas Lima', 'Entry', 2),
 ('Tchê', 'Mateus Rocha', 'AWP', 2),
 ('Titan01', 'Ana Costa', 'Duelista', 3),
 ('Neblina', 'Julia Martins', 'Atacante', 4);

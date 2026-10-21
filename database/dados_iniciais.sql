-- Dados iniciais para demonstração (só são inseridos se o banco estiver vazio)

insert into jogos (titulo, genero, desenvolvedora, jogadores_por_time) values
 ('League of Legends', 'MOBA', 'Riot Games', 5),
 ('Counter-Strike 2', 'FPS Tático', 'Valve', 5),
 ('Valorant', 'FPS Tático', 'Riot Games', 5),
 ('Rocket League', 'Esporte / Carros', 'Psyonix', 3),
 ('EA Sports FC 26', 'Esporte / Futebol', 'EA Sports', 1);

insert into equipes (nome, sigla, cidade, data_fundacao, ativa) values
 ('Lobos do Planalto', 'LDP', 'Passo Fundo', '2021-03-10', true),
 ('Gaúchos Gaming', 'GGX', 'Porto Alegre', '2019-08-22', true),
 ('Serra Esports', 'SER', 'Caxias do Sul', '2020-01-15', true),
 ('IFSul Titans', 'IFT', 'Passo Fundo', '2023-04-05', true),
 ('Pampa Legends', 'PLG', 'Santa Maria', '2018-11-30', true),
 ('Erechim Storm', 'ERS', 'Erechim', '2022-06-18', false);

insert into campeonatos (nome, descricao, premiacao, data_inicio, data_fim, situacao, max_equipes, jogo) values
 ('Arena Cup LoL 2026', 'Campeonato regional de League of Legends em formato MD3.', 5000.00, '2026-11-07', '2026-11-29', 'Inscrições abertas', 8, 1),
 ('Copa Planalto CS2', 'Torneio de Counter-Strike 2 com fase de grupos e playoffs.', 3500.00, '2026-10-01', '2026-10-30', 'Em andamento', 8, 2),
 ('Valorant Spike Series', 'Série de partidas rápidas de Valorant entre equipes do RS.', 2000.00, '2026-08-05', '2026-08-26', 'Finalizado', 4, 3),
 ('Rocket Arena 3v3', 'Campeonato de Rocket League 3x3.', 1200.00, '2026-12-01', null, 'Inscrições abertas', 8, 4);

insert into inscricoes (campeonato, equipe, data_inscricao, pontos, colocacao) values
 (1, 1, '2026-10-10', 0, null),
 (1, 2, '2026-10-11', 0, null),
 (1, 4, '2026-10-12', 0, null),
 (2, 2, '2026-09-20', 9, null),
 (2, 3, '2026-09-21', 6, null),
 (2, 5, '2026-09-22', 3, null),
 (3, 1, '2026-07-20', 12, 1),
 (3, 3, '2026-07-21', 8, 2),
 (3, 5, '2026-07-22', 4, 3),
 (4, 4, '2026-10-15', 0, null);

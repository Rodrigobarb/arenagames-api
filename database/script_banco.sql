-- =====================================================
--  Arena Games - Script do banco de dados (PostgreSQL)
-- =====================================================

-- Jogos (modalidades)
create table if not exists jogos (
   id serial not null primary key,
   nome varchar(50) not null,
   genero varchar(40) not null
);

-- Equipes: cada equipe joga UM jogo (chave estrangeira)
create table if not exists equipes (
   id serial not null primary key,
   nome varchar(50) not null,
   sigla varchar(6) not null,
   cidade varchar(50),
   jogo integer not null,
   foreign key (jogo) references jogos (id)
);

-- Jogadores: cada jogador pertence a UMA equipe (chave estrangeira)
create table if not exists jogadores (
   id serial not null primary key,
   nickname varchar(30) not null,
   nome varchar(50) not null,
   funcao varchar(30),
   equipe integer not null,
   foreign key (equipe) references equipes (id)
);

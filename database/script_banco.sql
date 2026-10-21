-- =====================================================
--  Arena Games - Script do banco de dados (PostgreSQL)
--  Sistema de gerenciamento de campeonatos de e-sports
-- =====================================================

-- Jogos (modalidades) disputados nos campeonatos
create table if not exists jogos (
   id serial not null primary key,
   titulo varchar(60) not null,
   genero varchar(40) not null,
   desenvolvedora varchar(60),
   jogadores_por_time integer not null,
   check (jogadores_por_time > 0)
);

-- Equipes (times) que participam dos campeonatos
create table if not exists equipes (
   id serial not null primary key,
   nome varchar(60) not null,
   sigla varchar(6) not null,
   cidade varchar(60),
   data_fundacao date,
   ativa boolean not null default true
);

-- Campeonatos: cada campeonato pertence a UM jogo (chave estrangeira)
create table if not exists campeonatos (
   id serial not null primary key,
   nome varchar(80) not null,
   descricao text,
   premiacao numeric(12,2) not null default 0,
   check (premiacao >= 0),
   data_inicio date not null,
   data_fim date,
   situacao varchar(20) not null default 'Inscrições abertas',
   check (situacao in ('Inscrições abertas', 'Em andamento', 'Finalizado')),
   max_equipes integer not null default 8,
   check (max_equipes >= 2),
   jogo integer not null,
   foreign key (jogo) references jogos (id)
);

-- Inscrições: liga uma equipe a um campeonato (duas chaves estrangeiras)
create table if not exists inscricoes (
   id serial not null primary key,
   campeonato integer not null,
   equipe integer not null,
   data_inscricao date not null default current_date,
   pontos integer not null default 0,
   check (pontos >= 0),
   colocacao integer,
   check (colocacao is null or colocacao > 0),
   foreign key (campeonato) references campeonatos (id),
   foreign key (equipe) references equipes (id),
   unique (campeonato, equipe)
);

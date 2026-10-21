# Arena Games - API (Backend)

API REST do **Arena Games**, sistema de gerenciamento de campeonatos de e-sports.
Trabalho prático da disciplina de Programação para Web - IFSul Passo Fundo.

## Tecnologias
Node.js, Express, PostgreSQL (biblioteca `pg`) e CORS.

## Banco de dados
| Tabela | Descrição | Chave estrangeira |
|---|---|---|
| `jogos` | modalidades (LoL, CS2, Valorant, Rocket League...) | - |
| `equipes` | times participantes | - |
| `campeonatos` | torneios | `jogo` → `jogos.id` |
| `inscricoes` | equipe inscrita em um campeonato, com pontos e colocação | `campeonato` → `campeonatos.id`, `equipe` → `equipes.id` |

O script está em `database/script_banco.sql`. Ao iniciar, a API cria as tabelas (se não existirem)
e insere dados de exemplo quando o banco está vazio (`database/inicializaBanco.js`).

## Rotas
| Método | Rota | Ação |
|---|---|---|
| GET | `/jogo` | lista todos |
| GET | `/jogo/:id` | busca por id |
| POST | `/jogo` | cadastra |
| PUT | `/jogo` | altera (id no corpo) |
| DELETE | `/jogo/:id` | remove |

O mesmo padrão vale para `/equipe`, `/campeonato` e `/inscricao`.

## Como rodar localmente
Crie o banco `arenagames` no PostgreSQL e execute:
```bash
npm install
npm run start:dev
```
Em produção (Render) defina as variáveis `DATABASE_URL` e `NODE_ENV=production`.

## Estrutura (arquitetura em camadas)
```
config.js        conexão com o banco (local ou nuvem)
index.js         arquivo principal do Express
entities/        classes das entidades
usecases/        consultas SQL e regras de negócio
controllers/     tratam requisição e resposta HTTP
routes/          mapeiam rotas e verbos HTTP para os controllers
database/        script SQL, dados iniciais e inicialização
```

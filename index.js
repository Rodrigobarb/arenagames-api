const express = require('express')
const cors = require('cors')
const rotas = require('./routes/rotas')
const { inicializaBanco } = require('./database/inicializaBanco')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Rota inicial só para conferir se a API está no ar
app.get('/', (request, response) => {
    response.status(200).json({
        api: 'Arena Games API',
        descricao: 'Cadastro de jogos, equipes e jogadores de e-sports',
        rotas: ['/jogo', '/equipe', '/jogador']
    });
});

app.use(rotas);

inicializaBanco()
    .catch(err => console.error('Erro ao inicializar o banco: ' + err))
    .finally(() => {
        app.listen(process.env.PORT || 3002, () => {
            console.log('Servidor da API rodando....')
        })
    });

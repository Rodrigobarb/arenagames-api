class Inscricao {
    constructor(id, campeonato, equipe, data_inscricao, pontos, colocacao, campeonato_nome, equipe_nome, equipe_sigla) {
        this.id = id;
        this.campeonato = campeonato;
        this.equipe = equipe;
        this.data_inscricao = data_inscricao;
        this.pontos = pontos;
        this.colocacao = colocacao;
        this.campeonato_nome = campeonato_nome;
        this.equipe_nome = equipe_nome;
        this.equipe_sigla = equipe_sigla;
    }
}

module.exports = Inscricao;

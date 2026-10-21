class Campeonato {
    constructor(id, nome, descricao, premiacao, data_inicio, data_fim, situacao, max_equipes, jogo, jogo_titulo, total_inscritos) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.premiacao = premiacao;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.situacao = situacao;
        this.max_equipes = max_equipes;
        this.jogo = jogo;
        this.jogo_titulo = jogo_titulo;
        this.total_inscritos = total_inscritos;
    }
}

module.exports = Campeonato;

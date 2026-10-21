class Equipe {
    constructor(id, nome, sigla, cidade, data_fundacao, ativa) {
        this.id = id;
        this.nome = nome;
        this.sigla = sigla;
        this.cidade = cidade;
        this.data_fundacao = data_fundacao;
        this.ativa = ativa;
    }
}

module.exports = Equipe;

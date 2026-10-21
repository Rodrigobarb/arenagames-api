// Traduz os erros do PostgreSQL para mensagens amigáveis
const traduzErro = (err) => {
    switch (err.code) {
        case '23503': // violação de chave estrangeira
            return 'o registro está vinculado a outro cadastro (chave estrangeira). Remova os vínculos primeiro.';
        case '23505': // violação de unique
            return 'já existe um registro com esses dados.';
        case '23514': // violação de check
            return 'algum valor informado não é permitido (' + (err.constraint || 'check') + ').';
        case '23502': // not null
            return 'o campo "' + err.column + '" é obrigatório.';
        case '22P02':
        case '22007':
        case '22008':
            return 'algum valor informado está em formato inválido.';
        default:
            return err.message || err;
    }
}

module.exports = { traduzErro };

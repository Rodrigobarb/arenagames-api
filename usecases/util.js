// Campos opcionais que chegam vazios do formulário viram null no banco
const vazioParaNulo = (valor) => (valor === '' || valor === undefined ? null : valor);

module.exports = { vazioParaNulo };

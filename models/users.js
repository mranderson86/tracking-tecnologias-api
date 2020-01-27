const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema(
  {
    nome:{
      type: String,
      required: true,
      min: 3,
      max: 50
    },
    sobrenome: {
      type: String,
      required: true,
      min: 3,
      max: 50
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 100
    },
    senha: {
      type: String,
      required: true,
      min: 6,
      max: 52,
    },
    avatarURL: String
  }
);
// Virtual para recuperar o nome completo do usuário
UsuarioSchema.virtual('nome_completo').get(function() {
  /* 
    Retorna uma string vazia caso haja algum erro no preenchimento dos dados
    e o nome ou o sobrenome estejam vazios.
  */

  const nome_completo = '';
  if (this.nome && this.sobrenome) {
    nome_completo = this.nome + this.sobrenome;
  }

  if (!this.nome || !this.sobrenome) {
    sobrenome = '';
  }

  return nome_completo;
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
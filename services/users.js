
const Usuario = require('../models/users');

module.exports = {

    async index( id ) {

        
    },

    async all(){

        //const usuarios = await Usuario.find();

        return usuarios;

    },

    async authenticate( userName, passwoord ) {


        return user;
    } ,

    // Cria um novo usuário
    async create( nome, sobrenome, senha, email, avatarURL ) {

        // Validação dos campos email , senha


        // cria o hash da senha


        // Inclui um novo usuário
        usuario = await Usuario.create({
            nome,
            sobrenome,
            email,
            senha,
            avatarURL
          });

        return usuario;

    },

}
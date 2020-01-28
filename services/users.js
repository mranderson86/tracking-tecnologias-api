


const UserModel = require('../models/users');

module.exports = {

    async index( id ) {

        const user = await UserModel.findById( id , (err,res) => {
            if(err){
                console.log(err);
            }
        })
        
        return user;
    },

    async all() {

        const users =  await UserModel.find((err,res) => {
            if(err){
                console.log(err);
            }
            
        });

        return users;

    },

    // Autentica usuário atráves do usuário e senha
    async authenticate( email, senha ) {

        const user = await UserModel.findOne( { email , senha }, (err,res) => {
            if(err){
                console.log(err);
            }
        })
        
        return user;

    } ,

    // Cria um novo usuário
    async create( nome, sobrenome, senha, email, avatarURL ) {

        // Validação dos campos email , senha
        if(email === ""){
            return null;
        }

        if(senha === ""){
            return null;
        }

        if(nome === ""){
            return null;
        }

        // cria o hash da senha
        


        // Inclui um novo usuário
        const user = await UserModel.create({
            nome,
            sobrenome,
            email,
            senha,
            avatarURL
          });

        return user;

    },

}
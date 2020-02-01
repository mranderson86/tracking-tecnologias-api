


const UserModel = require('../models/users');

module.exports = {

    async index( id ) {


        const user = await UserModel.findById( id , (err,res) => {
            if(err){
                console.log(err);
            }
        });
        
        return user;
    },

    async all(id) {

        let users;

        if(id != null) {
            users =  await UserModel.find({ _id : id }).exec();    
        }else {

            users =  await UserModel.find((err,res) => {
                if(err){
                    console.log(err);
                }
            
            });
        }

        return users;

    },

    // Autentica usuário atráves do usuário e senha
    async authenticate( email ) {

        const user = await UserModel.findOne( { email }, (err,res) => {
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

    // Remove um usuário
    async delete( id ) {

        const user = await UserModel.findByIdAndDelete( id , (err,res) => {
            if(err){
                console.log(err);
            }
        });
        
        return user;
    }

}
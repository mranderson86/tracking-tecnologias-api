
const UserService = require('../services/users');


module.exports = {

    async index(request , response ) {
        
        return res.status(200).json({ message : 'Only User' });
    },

    async all(request , response ) {

        //const usuarios = await Usuario.find();

        //return res.json(usuarios);

        return response.status(200).json({ message : 'All users' });

        //return res.status(200).json({ message : 'Hello World' });
    },

    async authenticate( request , response ) {

        const { username, password } = request.body;

        newUser = await UserService.authenticate( username, password);

        // ocorreu algum erro ao criar usuário 
        if(newUser === undefined) {
            return response.statusCode(401).json({ message: 'Erro ao autenticar usuário' });
        }

        return response.status(200).json(newUser);

    },

    async create( request , response ) {

        const { nome, sobrenome, senha, email, avatarURL } = request.body;

        newUser = await UserService.create(
            nome, sobrenome, senha, email, avatarURL
        )

        // ocorreu algum erro ao criar usuário 
        if(newUser === undefined) {
            return response.statusCode(400).json({ message: 'Erro ao criar usuário' })
        }

        return response.status(200).json(newUser);

    },

    async delete( request , response ) {

        const { id } = request.params;

    }



};
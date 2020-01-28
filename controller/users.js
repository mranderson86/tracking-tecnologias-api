
const UserService = require('../services/users');


module.exports = {

    // consulta dados de um único usuário
    async index(request , response ) {

        const { id } = request.query;
        
        const user = await UserService.index(id);

        return response.status(200).json(user);
    },

    // retorna todos os usuários cadastrados
    async all(request , response ) {

        const users = await UserService.all();

        return response.status(200).json(users);
    },

    // autentica usuário e gera um token de autenticação
    async authenticate( request , response ) {

        const { username, password } = request.body;

        newUser = await UserService.authenticate( username, password);

        // ocorreu algum erro ao criar usuário 
        if(newUser === null) {
            return response.status(401).json({ message: 'Erro ao autenticar usuário' });
        }

        return response.status(200).json(newUser);

    },

    async create( request , response ) {

        const { nome, sobrenome, senha, email, avatarURL } = request.body;

        const newUser = await UserService.create(
            nome, sobrenome, senha, email, avatarURL
        )

        // ocorreu algum erro ao criar usuário 
        if(newUser === null) {
            return response.statusCode(400).json({ message: 'Erro ao criar usuário' })
        }

        return response.status(200).json(newUser);

    },

    async delete( request , response ) {

        const { id } = request.query;

    }



};
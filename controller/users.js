const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const settingAuth = require('../settings/auth');

const UserService = require('../services/users');

module.exports = {

    // consulta dados de um único usuário
    async index(request , response ) {
        
        const { id } = request.params;
        
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

        const { email, password } = request.body;

        // Verifica se o usuário existe
        const newUser = await UserService.authenticate( email );

        // Usuário não encontrado.
        if(newUser === null) {
            return response.status(400).json({ message: 'Usuário não existe' });
        }

        // senha hash do usuário cadastro
        const passwordHash = newUser.senha;

        // compara com senha informada pelo usuário
        const passwordOK = bcrypt.compare(password, passwordHash);

        // ocorreu algum erro ao autenticar usuário
        if(!passwordOK) {
            return response.status(401).json({ message: 'Usuário e/ou senha está incorreto' });
        }

        newUser.senha = undefined;

        // usuário autenticado
        // gera o token de autenticação
        // expira em 1 dia
        const token = jwt.sign({ id: newUser._id }, settingAuth.secret, { expiresIn: 86400 } );

        return response.status(200).json( { newUser , token } );

    },

    // Cadastra um novo usuário
    async create( request , response ) {

        const { nome, sobrenome, senha, email, avatarURL } = request.body;

        // cria o hash da senha
        const passwordHash = await bcrypt.hash(senha, 10);

        const newUser = await UserService.create(
            nome, sobrenome, passwordHash, email, avatarURL
        )

        // ocorreu algum erro ao criar usuário 
        if(newUser === null) {
            return response.statusCode(400).json({ message: 'Erro ao criar usuário' })
        }

        // Evita que a senha seja devolvida para o usuário
        newUser.senha =  undefined;

        return response.status(200).json(newUser);

    },

    // Exclui um usuário cadastrado
    async delete( request , response ) {

        const { id } = request.query;

        const user = await UserService.delete(id);

        return response.status(200).json(user);
    }



};
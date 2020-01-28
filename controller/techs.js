
const TechService = require('../services/techs');


module.exports = {

    // consulta dados de um único usuário
    async index(request , response ) {
        
        const { id } = request.params;
        
        const tech = await TechService.index(id);

        return response.status(200).json(tech);
    },

    // retorna todos os usuários cadastrados
    async all(request , response ) {

        const techs = await TechService.all();

        return response.status(200).json(techs);
    },

    async create(request, response) {
        const { techname } = request.body;

        const newTech = await TechService.create(
            techname
        );

        return response.status(200).json(newTech);
    }
};
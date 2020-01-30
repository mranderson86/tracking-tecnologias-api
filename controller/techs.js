
const TechService = require('../services/techs');


module.exports = {

    // consulta dados de uma única tecnologia
    async index(request , response ) {
    
        try{

            const { id } = request.query;
            const tech = await TechService.index(id);

            return response.status(200).json(tech);
        }catch(err){
            return response.status(400).json(err);
        }
    },

    // retorna todas as tecnologias cadastradas
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
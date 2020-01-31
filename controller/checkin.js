
const checkinService = require('../services/checkin');

module.exports = {

    // Insere um novo check-in por usuário em alguma tecnologia
    async create( request , response ) {
        const { IdUser, IdTech } = request.body;

        const newCheckin = await checkinService.create( IdUser, IdTech);

        if( newCheckin === null) {
            return response.status(400).json({ message: 'Falha ao criar um novo check-in' });
        }
        
        return response.status(200).json(newCheckin);
    },
    
    async all(request, response ) {

        const allCheck = await checkinService.all();

        return response.status(200).json(allCheck);
    },

    // consulta usuários por tecnologia
    async usersByTech (request , response) {

        const result = await checkinService.usersByTech();

        return response.status(200).json(result);
    },

    // consulta o total de check-ins por tecnlogia de cada usuário
    // agrupando por tecnologia
    async techByUsers ( request  , response ) {

        const result = await checkinService.techByUsers();

        return response.status(200).json(result);

    },

}
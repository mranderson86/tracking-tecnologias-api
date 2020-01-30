
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
    
    async all( request, response ) {

        const allCheck = await checkinService.all();

        return response.status(200).json(allCheck);
    },

    // consulta check-ins por tecnologia
    async usersByTech () {

    },

    // consulta o total de check-ins por usuário
    // agrupando por tecnologia
    async techByUsers () {

    },

}
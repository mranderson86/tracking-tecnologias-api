
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

    // consulta check-ins por tecnologia
    async usersByTech () {

    },

    // consulta check-ins por usuário
    async techByUsers () {

    },

}
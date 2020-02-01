
const checkinService = require('../services/checkin');

module.exports = {

    // Insere um novo check-in por usuário em alguma tecnologia
    // Recebe um ou vários check-in(s) a cada requisição
    async create( request , response ) {
        
        let checkList = [];

        checkList = request.body;

        if(checkList == null ) {
            return response.status(400).json({ message: 'Falha ao criar check-in' });
        }

        if( checkList.length == 0 ){
            return response.status(400).json({ message: 'Falha ao criar check-in' });
        }

        const newCheckin = await checkinService.create(checkList);

        if( newCheckin == null) {
            return response.status(400).json({ message: 'Falha ao criar check-in' });
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
    async techByUsers(request  , response) {

        const result = await checkinService.techByUsers();

        return response.status(200).json(result);

    },

    // consulta de um determinado usuário já fez check-in no dia
    async checkinToday( request, response ) {
        return response.status(200).json({ checkinToday: true });
    }

}
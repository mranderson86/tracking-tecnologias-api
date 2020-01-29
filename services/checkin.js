
const CheckinModel = require('../models/checkin');

module.exports = {

    // Cadastra um novo check-in
    async create(IdUser, IdTech) {

        const checkin = await CheckinModel.create({
            usuario: IdUser,
            tecnologia: IdTech
        });

        return checkin;

    },

    // consulta check-ins por tecnologia
    async usersByTech () {

    },

    // consulta check-ins por usuário
    async techByUsers () {

    },

}
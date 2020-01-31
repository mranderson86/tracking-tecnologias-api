
const CheckinModel = require('../models/checkin');
const TechService = require('../services/techs');
const UserService = require('../services/users');

module.exports = {

    // Cadastra um novo check-in
    async create(IdUser, IdTech) {

        const checkin = await CheckinModel.create({
            usuario: IdUser,
            tecnologia: IdTech
        });

        return checkin;

    },

    // Devolve todos os check-ins cadastrados
    async all() {
        const allCheckins = await CheckinModel.find();

        return allCheckins;
    },

    // consulta check-ins por tecnologia
    async usersByTech () {

        let usersTech = [];

        // consulta todas as tecnologias cadastradas
        const allTechs = await TechService.all();

        // consulta todos os checkins
        const allCheckins = await this.all();

        usersTech = allTechs.map(tech => {

            let IdTech = tech.id;
            let CounterCheck = [];

            // filtra os checkin para cada tecnologia
            CounterCheck = allCheckins.filter(
                checkin => checkin.tecnologia == IdTech
            );
                
            return {

                idTech : IdTech,
                techName: tech.techname,
                numberOfCheck: CounterCheck.length

            }
                 
        });


        return usersTech;
    },

    // consulta check-ins por tecnologica de cada usuário
    async techByUsers () {

        let techsUser = [];

        // consulta todas as tecnologias cadastradas
        const allUsers = await UserService.all();

        // consulta todos os checkins
        const allCheckins = await this.all();

        // consulta todas as tecnlogias
        const allTechs = await TechService.all();

        techsUser = allUsers.map( user => {

            let IdUser = user.id;
            let CheckByUser = [];
            let CheckByTech = [];

            // filtra os checkin para cada usuário
            CheckByUser = allCheckins.filter(
                checkin => checkin.usuario == IdUser
            );

            // Lista de checkins de cada usuário
            CheckByTech = allTechs.map(tech => {

               // Filtra por tecnologia    
               let filterCheckByTech = CheckByUser.filter(techUser => techUser.tecnologia == tech.id);

               // Devolve id da tecnologia, o nome e a quantidade de Check-ins
               return {
                   IdTech: tech.id,
                   techName: tech.techname,
                   CounterCheckin: filterCheckByTech.length
               }

            });
                
            // Devolve lista de usuários com lista de tecnologia 
            // de cada usuário e quantidade de check-ins                
            return {

                IdUser : IdUser,
                UserName: user.nome,
                Techs: CheckByTech

            }
                 
        });

        return techsUser;

    },

}
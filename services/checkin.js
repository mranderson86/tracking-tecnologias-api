
const CheckinModel = require('../models/checkin');
const TechService = require('../services/techs');
const UserService = require('../services/users');

module.exports = {

    // função que verifica se o usuário já fez check-in na mesma tecnologia
    // no mesmo dia
    async userCheckToday( checkList ) {

        const dt = new Date();
        const newDt = new Date(`${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`) ; 

        const  query = { 
            usuario: check.IdUser, 
            tecnologia: check.IdTech, 
            data: newDt 
        };
        
        let queryCounterCheckin = [];

        // Consulta se já não existe um check-in
        // registrado para o usuário e a tecnologia na mesma data
        queryCounterCheckin = await CheckinModel.find(query).exec();

    },

    // Cadastra um ou mais de check-in
    async create(checkList = []) {

        const dt = new Date();
        const newDt = new Date(`${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`) ; 

        const  query = { 
             usuario: checkList[0].IdUser, 
             data: newDt 
        }; 

        let queryListCheckin = [];

        // Consulta se já não existe nenhum check-in
        // registrado para o usuário na mesma data
        queryListCheckin = await CheckinModel.find(query).exec();

        let result;
        let newListCheckin = [];

        // Nenhum check-in registrado esse usuário
        // na mesma data ou seja primeiro check-in do dia
        if(queryListCheckin.length == 0){
            

            newListCheckin = checkList.map( check => {
                return { 
                    usuario: check.IdUser, 
                    tecnologia: check.IdTech, 
                    data: newDt 
                };
            })

            if(newListCheckin!= undefined) {
                if(newListCheckin.length > 0) {

                    result = await CheckinModel.create(newListCheckin);

                }
            }

        } else {

            // Percorre a lista de check-ins existente em busca de possível 
            // Duplicidade de check-ins para a mesma tecnologia
            const newListCheckin = checkList.map(newCheckin => {
                
                let hasCheck  = [];
                // Verifica se houver alguma tecnologia que já foi feito check-in
                // para aquele usuário na mesma data
                hasCheck = queryListCheckin.filter(oldCheckin => 
                    newCheckin.IdTech == oldCheckin.tecnologia);

                    console.log(hasCheck);

                // nenhuma tecnologia encontrada
                if(hasCheck.length == 0){
                    // insere o novo check-in de tecnologia
                    return { 
                        usuario: newCheckin.IdUser, 
                        tecnologia: newCheckin.IdTech, 
                        data: newDt 
                    };
                }

            });

            const newListCheckinFilter = newListCheckin.filter(c => c != undefined);

            if(newListCheckinFilter!= undefined) {
                if(newListCheckinFilter.length > 0) {
                    result = await CheckinModel.create(newListCheckinFilter);
                }
            }

            
                
        }

        return result;

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

    // consulta total de check-ins por tecnologia de cada usuário
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
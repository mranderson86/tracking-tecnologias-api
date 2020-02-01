
const CheckinModel = require('../models/checkin');
const TechService = require('../services/techs');
const UserService = require('../services/users');

module.exports = {

    // função que verifica quais tecnologia o usuário já fez check-in
    // no mesmo dia
    async userCheckToday( idUser ) {

        const dt = new Date();
        const newDt = new Date(`${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`) ; 

        const  query = { 
            usuario: IdUser, 
            data: newDt 
        };
        
        let queryCheckin = [];

        // Consulta se já não existe um check-in
        // registrado para o usuário e a tecnologia na mesma data
        queryCheckin = await CheckinModel.find(query).exec();

        return queryCheckin;
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

    // devolve todos os check-in de um usuário
    async byUser( queryCondition = {}) {

        let allCheckins;
        allCheckins = await CheckinModel.find(queryCondition).exec();

        return allCheckins;
    },

    // Devolve todos os check-ins cadastrados
    async all() {

        let allCheckins;
        allCheckins = await CheckinModel.find().exec();

        return allCheckins;
    },

    // consulta o total check-ins por tecnologia
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

        // consulta todas os usuários cadastrados
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

            }).filter(f => f.CounterCheckin != 0);
                
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


    // consulta total de check-ins por tecnologia para um único usuário
    async techByUser (id) {

        // dados do usuário
        const userData = await UserService.index(id);

        // consulta todos os checkins
        const allCheckins = await this.byUser({ usuario: id });

        // consulta todas as tecnlogias
        const allTechs = await TechService.all();

        let CheckByTech = [];

        // Lista de checkins do usuário
        CheckByTech = allTechs.map(tech => {

               // Filtra por tecnologia    
               let filterCheckByTech = allCheckins.filter(techUser => techUser.tecnologia == tech.id);

               // Devolve id da tecnologia, o nome e a quantidade de Check-ins
               return {
                   IdTech: tech.id,
                   techName: tech.techname,
                   CounterCheckin: filterCheckByTech.length
               }

        }).filter(f => f.CounterCheckin != 0);
                
        // Devolve lista de usuários com lista de tecnologia 
        // de cada usuário e quantidade de check-ins                
        return {

            IdUser : id,
            UserName: userData.nome,
            Techs: CheckByTech

        }

    },


    // consulta total de check-ins por tecnologia para um único usuário no dia
    async techByUserToday (id) {

        // dados do usuário
        const userData = await UserService.index(id);

        const dt = new Date();
        const newDt = new Date(`${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`) ; 

        const  query = { 
             usuario: id, 
             data: newDt 
        }; 

        // consulta todos os checkins por usuário e data atual
        const allCheckins = await this.byUser(query);

        // consulta todas as tecnlogias
        const allTechs = await TechService.all();

        let CheckByTech = [];

        // Lista de checkins do usuário
        CheckByTech = allTechs.map(tech => {

               // Filtra por tecnologia    
               let filterCheckByTech = allCheckins.filter(techUser => techUser.tecnologia == tech.id);

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

            IdUser : id,
            UserName: userData.nome,
            Techs: CheckByTech

        }

    },


    // consulta total de check-ins por tecnologia para de todos usuário no dia
    async techByUserToday () {

        let techsUser = [];

        // consulta todas os usuários cadastrados
        const allUsers = await UserService.all();

        const dt = new Date();
        const newDt = new Date(`${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`) ; 

        // consulta todos os checkins
        const allCheckins = await this.byUser({
            data: newDt
        });

        // consulta todas as tecnlogias
        const allTechs = await TechService.all();

        // totaliza check-in por tecnologia para cada usuário
        techsUser = allUsers.map( user => {

            let IdUser = user.id;
            let CheckByUser = [];
            let CheckByTech = [];

            // filtra os checkin para cada usuário
            CheckByUser = allCheckins.filter(
                checkin => checkin.usuario == IdUser
            );

            if(CheckByUser.length !=0){

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
 
                }).filter(tech => tech.CounterCheckin != 0);
                 
                // Devolve lista de usuários com lista de tecnologia 
                // de cada usuário e quantidade de check-ins                
                return {
 
                    IdUser : IdUser,
                    UserName: user.nome,
                    Techs: CheckByTech
 
                }

            }
     
        }).filter(f => f != null);

        return techsUser;

    }

}
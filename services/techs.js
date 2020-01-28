const TechModel = require('../models/techs');

module.exports = {

    async index( id ) {


        const tech = await TechModel.findById( id , (err,res) => {
            if(err){
                console.log(err);
            }
        });
        
        return tech;
    },

    async all() {

        const techs =  await TechModel.find((err,res) => {
            if(err){
                console.log(err);
            }
            
        });

        return techs;

    },

    async create(techname) {
        const tech = await TechModel.create({
            techname
        });

        return tech;
    }
}
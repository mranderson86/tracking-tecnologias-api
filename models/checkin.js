const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historicoSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId, 
      ref: 'Usuario', 
      required: true
    },
    tecnologia: {
      type: Schema.Types.ObjectId,
      ref: 'Tecnologias',
      required: true
    },
    data : {
      //type: Schema.Types.String
      type: Date
      //default: new Date()
    }
  }
);

module.exports = mongoose.model('Historico', historicoSchema);
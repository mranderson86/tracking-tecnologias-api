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
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model('Historico', historicoSchema);
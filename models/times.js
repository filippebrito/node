var mongoose 	= require('mongoose');
var Schema	 	= mongoose.Schema;

var timesSchema	= new Schema({
	nome: {type: String, required: true, trim: true}
});

module.exports = mongoose.model('Times', timesSchema);
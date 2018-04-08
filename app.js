var express 	= require('express');
var mongoose 	= require('mongoose');
var bodyParser 	= require('body-parser');
var Times		= require('./models/times');

var app 		= express();

// conexao mongoDB
mongoose.connect('mongodb://localhost/api', function(err){
	if(err){
		console.log('Erro ao conectar no mongoDB: ' + err);
	}
});

app.use(bodyParser());

var porta = process.env.PORT || 3000;

// Rotas
var router = express.Router();
router.get('/', function(req, res){
	res.json({message: "API Acadetec" });
});

router.route('/times')
	.post(function(req, res){
		var times = new Times();
		times.nome = req.body.nome;

		times.save(function(err){
			if(err){
				res.send(err);
			}else{
				res.json({message: "Time cadastrado com sucesso!"});
			}
		});
	})
	.get(function(req, res){
		Times.find(function(err, dados){
			if(err){
				res.send(err);
			}else{
				res.json(dados);
			}
		})
	});

router.route('/times/:id')
	.get(function(req, res){
		Times.findById(req.params.id, function(err, dados){
			if(err){
				res.send(err);
			}else{
				res.json(dados);
			}
		})
	})
	.put(function(req, res){
		Times.findById(req.params.id, function(err, dados){
			if(err){
				res.send(err);
			}else{
				dados.nome = req.body.nome;
				dados.save(function(err){
					if(err){
						res.send(err);
					}else{
						res.json({message: "Time atualizado com sucesso!"});
					}
				});
			}
		})
	})
	.delete(function(req, res){
		Times.remove({_id: req.params.id}, function(err, dados){
			if(err){
				res.send(err);
			}else{
				res.json({message: "Time excluído com sucesso!"});
			}
		})
	});

app.use("/api", router);

app.listen(porta , function(){
	console.log("Servidor rodando na porta " + porta);
});
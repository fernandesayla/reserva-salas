module.exports = function(app) {


  app.get("/reservas",function(req, res) {

    var connection = app.persistencia.connectionFactory();
    var reservaDao = new app.persistencia.ReservaDao(connection);
    res.setHeader('Access-Control-Allow-Origin','*');
    reservaDao.listaCidade(function(erro, cidades){
      if (erro){
        res.status(500).send(erro);
        return;
      }else {
        reservaDao.listaSalas(function(err, salas){
          if (err){
            res.status(500).send(err);

            return;
          }else {

            reservaDao.lista(function(err, reservas){


              if (err){
                res.status(500).send(err);

                return;
              }else {

                var response = {
                  cidades: cidades,
                  salas : salas,
                  reservas : reservas,


                }
                res.status(201).json(response);
              }




            })

          }


        })





        /*  reservaDao.lista(cidades,function(erro, resultado){
        if (erro){
        res.status(500).send(erro);
        return;
      }else {
      console.log('reservas: ' + JSON.stringify(resultado) + 'cidades: ' + JSON.stringify(cidades));
      res.setHeader('Access-Control-Allow-Origin','*');


      var response = {
      reservas: resultado
    }
    res.status(201).json(response);
  }

}) ;*/
}






});



});

app.get("/reserv",function(req, res) {


  var connection = app.persistencia.connectionFactory();
  var reservaDao = new app.persistencia.ReservaDao(connection);
  reservaDao.listaSalas(function(erro, resultado){
    if (erro){
      res.status(500).send(erro);
      return;
    }else {

      resultado.forEach(function(sala) {


        reservaDao.buscaPorSalaId(sala.sala_id, function(e, eventos){
          if (e){
            res.status(500).send(e);
            return;
          }else {
            //  return eventos

          }

        })




        //profile.get(username, topic);
      });

      function random(response) {
        console.log("Request handler random was called.");
        response.setHeader('Access-Control-Allow-Origin','*');
        response.writeHead(200, {"Content-Type": "application/json"});
        var otherArray = ["item1", "item2"];
        var otherObject = { item1: "item1val", item2: "item2val" };
        var json = JSON.stringify({
          anObject: otherObject,
          anArray: otherArray,
          another: "item"
        });
        response.end(json);
      }
      //  console.log('reservas: ' + JSON.stringify(resultado));



      random(res)
      res.status(201).json();
    }

  }) ;

});

app.get("/salas/:acesso",function(req, res) {
  console.log(req.params.acesso);


  var connection = app.persistencia.connectionFactory();
  var reservaDao = new app.persistencia.ReservaDao(connection);
  reservaDao.listaSalas(function(erro, resultado){
    if (erro){
      res.status(500).send(erro);
      return;
    }
    else {
      console.log('reserva criado: ' + resultado);
      res.setHeader('Access-Control-Allow-Origin','*');


      var response = {
        salas: resultado
      }
      res.status(201).json(response);
    }



  }) ;

});

app.get("/reservas/:sala_id/:start",function(req, res) {
  var reservas = {
    sala_id: req.params.sala_id  ,
    start: req.params.start


  };


  console.log(reservas);


  var connection = app.persistencia.connectionFactory();
  var reservaDao = new app.persistencia.ReservaDao(connection);
  reservaDao.listaByDataBySala(reservas, function(erro, resultado){
    if (erro){
      res.status(500).send(erro);
      return;
    }else{
      console.log(reservas);
      console.log('reserva criado: ' + resultado);
      res.setHeader('Access-Control-Allow-Origin','*');


      var response = {
        reservas: resultado

      }
      res.status(201).json(response);
    }

  }) ;

});

app.get("/reservas/:acesso/:sala_id/:start",function(req, res) {
  var reservas = {
    sala_id: req.params.sala_id  ,
    start: req.params.start,
    acesso: req.params.acesso

  };


  console.log(reservas);


  var connection = app.persistencia.connectionFactory();
  var reservaDao = new app.persistencia.ReservaDao(connection);
  reservaDao.listaByDataBySala(reservas, function(erro, resultado){
    if (erro){
      res.status(500).send(erro);
      return;
    }else{
      console.log(reservas);
      console.log('reserva criado: ' + resultado);
      res.setHeader('Access-Control-Allow-Origin','*');


      var response = {
        reservas: resultado

      }
      res.status(201).json(response);
    }

  }) ;

});

/*
app.get("/salas",function(req, res) {
//  var acesso = req.params.acesso

var connection = app.persistencia.connectionFactory();
var reservaDao = new app.persistencia.ReservaDao(connection);

reservaDao.listaSalas( function(erro, resultado){
if (erro){
res.status(500).send(erro);
return;
}else{


console.log('reserva criado: ' + resultado);
res.setHeader('Access-Control-Allow-Origin','*');


var response = {
salas: resultado

}
res.status(201).json(response);


}

}) ;

});*/

app.delete('/reservas/reserva/:id', function(req, res){
  var reserva = {};
  var id = req.params.id;

  reserva.id = id;
  //  reserva.status = 'CANCELADO';

  var connection = app.persistencia.connectionFactory();
  var reservaDao = new app.persistencia.ReservaDao(connection);

  reservaDao.deleta(reserva, function(erro){
    if (erro){
      res.status(500).send(erro);
      return;
    }
    console.log('reserva cancelada');
    res.status(204).send(reserva);
  });
});
app.put('/reservas/reserva/:id', function(req, res){

  var reserva = {};
  var id = req.params.id;

  reserva.id = id;
  //reserva.status = 'CONFIRMADO';

  var connection = app.persistencia.connectionFactory();
  var reservaDao = new app.persistencia.ReservaDao(connection);

  reservaDao.atualiza(reserva, function(erro){
    if (erro){
      res.status(500).send(erro);
      return;
    }
    console.log('reserva criado');
    res.send(reserva);
  });

});


app.post("/reservas/salvar",function(req, res) {
  var body = req.body;


  var reserva = req.body["reservas"];

  console.log(body);
  console.log('processando reserva...');

  console.log(reserva);

  var connection = app.persistencia.connectionFactory();
  var reservaDao = new app.persistencia.ReservaDao(connection);

  //reserva.status = "CRIADO";
  //  reserva.data = new Date;


  let reserv  = {

    title : reserva.title,
    start:  new Date(reserva.start),
    end:  new Date(reserva.end),
    sala_id: reserva.sala_id,
    sala: reserva.sala,
    cidade: reserva.cidade,
    cidade_id: reserva.cidade_id

  }
  reservaDao.salva(reserv, function(erro, resultado){
    if(erro){
      console.log('Erro ao inserir no banco:' + erro);
      res.setHeader('Access-Control-Allow-Origin','*');
      res.status(500).send(erro);
    }else {
      reserva.id = resultado.insertId;
      console.log('reserva criado' );
      res.setHeader('Access-Control-Allow-Origin','*');

      res.location('/reservas/reserva/' + resultado.insertId);
      var response = {
        dados_da_reserva: reserva,
        links: [
          {
            href:"https://dicre2.intranet.bb.com.br/reservas/salvar/"
            + reserva.id,
            rel:"confirmar",
            method:"PUT"
          },
          {
            href:"https://dicre2.intranet.bb.com.br/reservas/salvar/"
            + reserva.id,
            rel:"cancelar",
            method:"DELETE"
          }
        ]
      }



      res.status(201).json(reserva);
    }



  });
});

}


/*
curl http://localhost:3000/reservas/reserva -X POST -v -H "Content-type: application/json" -d @files/reserva.json | json_pp

/*
`ID`, `SALA_ID`, `SALA`, `DATA`, `INICIO`, `FIM`, `AREA`, `CONTATO`, `FONE`, `ASSUNTO`, `RESP`

curl http://localhost:3000/reservas/reserva \
-X POST \
-v \
-H "Content-type: application/json" \
-d '{
"SALA_ID": "1",
"SALA": "Sala 4 - 7º Oeste",
"DATA": "2017-12-28",
"INICIO": "8",
"FIM" : "17",
"AREA" : "GESEM MPE",
"CONTATO" : "BLÇA",
"FONE" : "11963",
"ASSUNTO" : "bla",
"RESP" : "F1522457"
}'

curl http://localhost:3000/reservas/reserva \
-X POST \
-v \
-H "Content-type: application/json" \
-d '{
"forma_de_reserva": "payfast",
"valor": "10.87",
"moeda": "BRL",
"descricao": "descrição do reserva"
}'

*/

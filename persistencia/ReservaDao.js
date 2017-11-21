function ReservaDao(connection) {
  this._connection = connection;
}

ReservaDao.prototype.salva = function(reserva,callback) {
  this._connection.query('INSERT INTO reservas SET ?', reserva, callback);
}

ReservaDao.prototype.lista = function(callback) {
  this._connection.query('select * from reservas  WHERE start >= "2017-11-14"   order  by sala_id, start desc  ',callback);
}
ReservaDao.prototype.listaCidade = function(callback) {
  this._connection.query('select cidade, cidade_id from reservas  group by cidade, cidade_id order by cidade_id',callback);
}

ReservaDao.prototype.listaByDataBySalaAcesso = function ( reservas  ,callback) {

  this._connection.query("select * from reservas where sala_id=? AND start=? AND acesso=? limit 10 " , [reservas.sala_id, reservas.start , reservas.acesso]  ,callback);
}

ReservaDao.prototype.listaByDataBySala = function ( reservas  ,callback) {

  this._connection.query("select * from reservas where sala_id=? AND start=? limit 10 " , [reservas.sala_id, reservas.start ]  ,callback);
}

ReservaDao.prototype.listaSalas = function (callback) {

  this._connection.query("select sala_id, sala , cidade, cidade_id  from reservas  group by sala_id, sala ,cidade, cidade_id" , callback);
}

ReservaDao.prototype.buscaPorId = function (id,callback) {
  this._connection.query("select * from reservas where id = ?",[id],callback);
}


ReservaDao.prototype.buscaPorSalaId = function (sala_id,callback) {
  this._connection.query("select * from reservas where sala_id = ?",[sala_id],callback);
}


ReservaDao.prototype.deleta = function (id,callback) {
  this._connection.query("DELETE from reservas where id = ?",[id],callback);
}

ReservaDao.prototype.atualiza = function(reserva,callback) {
  this._connection.query('UPDATE reservas SET sala_id=?,sala=?,data=?,inicio=?,fim=?,area=?,contato=?,fone=?,assunto=?,resp=? where id = ?', [reserva.sala_id, reserva.sala, reserva.data, reserva.inicio, reserva.fim, reserva.area, reserva.contato, reserva.fone, reserva.assunto, reserva.resp ], callback);
}



module.exports = function(){
  return ReservaDao;
};

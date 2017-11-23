var mysql  = require('mysql');

function createDBConnection(){
  return mysql.createConnection({
   //host: '0.0.0.0',
    host: 'dicre2.intranet.bb.com.br',
    user: 'root',
    password: 'credidf',
    database: 'teste',
    timezone: 'utc'
  });
}

module.exports = function() {
  return createDBConnection;
}

var mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sercan9892",
    database: "library",
  });
  var sqlkullan = (querystring,veriler) =>{
    if(veriler){
    return new Promise((resolve, reject) => {
        con.query(
          querystring,veriler,

          function (err, result) {
            if (err) {    
               reject(err);
            }
            resolve(result);
          }
        );
      });}
      return new Promise((resolve, reject) => {
        con.query(
          querystring,
          function (err, result) {
            if (err) {
    
               reject(err);
            }
            resolve(result);
          }
        );
      });
  }
  module.exports= {
      sqlkullan,
  }
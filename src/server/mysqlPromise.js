const { rejects } = require("assert")

const query = (connection,statement,params) => {
  return new Promise((resolve,reject) => {
    connection.query(statement,params,(err,results,fields) => {
      if(err){
        reject(err);
      }else {
        resolve(results,fields);
      }
    });
  });
}

module.exports = {
  query : query
}
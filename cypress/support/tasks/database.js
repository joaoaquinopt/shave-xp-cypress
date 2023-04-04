const { Pool } = require('pg')

const dbConfig = {
    host: 'babar.db.elephantsql.com',
    user: 'vypdkcjr',
    password: 'JbQ98rqa-nK4eE1L1RqSENpvBHbAAgBd',
    database: 'vypdkcjr',
    port: 5432
}

module.exports = {
    removeUser(email) {
        return new Promise(function (resolve) {
          const pool = new Pool(dbConfig)

          pool.query('DELETE FROM users WHERE email = $1', [email], function(error, result){
            if(error){
              throw error
            }
            resolve({ success: result })
          })
        })
      }
}
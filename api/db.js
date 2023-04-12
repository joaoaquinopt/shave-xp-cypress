const { Pool } = require('pg')

const dbConfig = {
    host: 'babar.db.elephantsql.com',
    user: 'vypdkcjr',
    password: 'JbQ98rqa-nK4eE1L1RqSENpvBHbAAgBd',
    database: 'vypdkcjr',
    port: 5432
}

const pool = new Pool(dbConfig)

async function tokenUser (email) {
    const sql = 'select b.token from users A inner join user_tokens B on A.id = B.user_id where A.email = $1 order by b.created_at desc limit 1'
    const result = await pool.query(sql, [email])
    return result.rows[0]
}

async function deleteUser(email) {
    await pool.query('DELETE FROM users WHERE email = $1', [email])
}

async function insertUser(user) {
    const sql = 'INSERT INTO users (name, email, password, is_shaver) VALUES ($1, $2, $3, $4) returning id'
    const data = [user.name, user.email, user.password, user.is_shaver]
    
    const result = await pool.query(sql, data)
    const {id} = result.rows[0]

    return id
}

module.exports = {
    deleteUser,
    insertUser,
    tokenUser
}


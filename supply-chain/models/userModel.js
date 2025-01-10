const mysql = require('mysql2')
//connecting to database
const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'supplyschema'
});


const getAllUsers = async () => {
    const [result,fields]  = await connection.promise().query('SELECT * FROM users')
    return result
}

module.exports = { getAllUsers }
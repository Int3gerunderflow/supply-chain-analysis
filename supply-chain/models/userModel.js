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

const insertIntoDatabase = async (params) => {
    const {username, password, pfp} = params
    try {
        const [result, fields] = await connection.promise().query(`INSERT INTO users (username,passphrase,profilePicLocation) 
            VALUES ('${username}', '${password}', '${pfp}')`);
        return result
    } catch (error) {
        console.log(error)
        return error.code
    }
    
    
}

module.exports = { getAllUsers, insertIntoDatabase }
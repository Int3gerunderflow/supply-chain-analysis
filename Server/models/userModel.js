const mysql = require('mysql2')

//connecting to database
const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'supplyschema'
});

//main methods associated with database operations
const getAllUsers = async () => {
    //use execute instead of query since it caches results
    const [result,fields]  = await connection.promise().execute('SELECT * FROM users;')
    return result
}

const getSingleUserByID = async (id) => {
    const [result,fields]  = await connection.promise().execute(`SELECT * FROM users WHERE id='${id}';`)
    return result[0]
}

const findUserIDByUsername = async (username) => {
    const [result,fields]  = await connection.promise().execute(`SELECT id FROM users WHERE username='${username}';`)
    return result[0].id
}

const insertIntoDatabase = async (params) => {
    const {username, password, pfp} = params
    try {
        const [result, fields] = await connection.promise().query(`INSERT INTO users (username,passphrase,profilePicLocation) 
            VALUES ('${username}', '${password}', '${pfp}');`);
        return result
    } catch (error) {
        return error.code
    }  
}

const updateUserInDatabase = async (params) => {
    const {id, username, password, pfp} = params

    try {
        const [result,fields] = await connection.promise().query(`UPDATE users SET 
            username = '${username}', 
            passphrase = '${password}', 
            profilePicLocation = '${pfp}' 
            WHERE id=${id};`)
        return result
    } catch (error) {
        return error.code
    }
}

const deleteUserInDatabase = async (id) => {
    try {
        const [result, fields] = await connection.promise().query(`DELETE FROM users WHERE id=${id};`);
        return result
    } catch (error) {
        return error.code
    }  
}


module.exports = { getAllUsers, 
    findUserIDByUsername, 
    insertIntoDatabase, 
    updateUserInDatabase, 
    deleteUserInDatabase,
    getSingleUserByID
 }
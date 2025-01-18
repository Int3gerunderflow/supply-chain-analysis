const mysql = require('mysql2')

//connecting to database
const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'supplyschema'
});

//main methods associated with database operations
const getSupplyChainPostDetails = async (postID) => {
    //use execute instead of query since it caches results
    const [result,fields]  = await connection.promise().execute(`SELECT * FROM posts WHERE postID=${postID};`)
    return result[0]
}

module.exports = { getSupplyChainPostDetails }
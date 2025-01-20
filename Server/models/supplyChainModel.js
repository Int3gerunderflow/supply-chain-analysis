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

const makeNewPost = async (params) => {
    const {userID, adjacencyList, product, company, description} = params

    let JSONstring = 'JSON_ARRAY('
    //convert the adjacencyList JSON into the appropriate SQL query
    //build up a string with the appropriate syntax for the SQL database
    for (const entry in adjacencyList)
    {
        JSONstring += `JSON_OBJECT('${entry}',JSON_ARRAY(`
        const adjArray = adjacencyList[entry]
        for (const neighbor of adjArray)
        {
            JSONstring += neighbor
            JSONstring += ','
        }

        //if there were entries in the array take out the last character as it is an extra ','
        if(adjArray.length)
        {
            JSONstring = JSONstring.substring(0,JSONstring.length-1)
        }
        
        JSONstring += ')),'
    }
    JSONstring = JSONstring.substring(0,JSONstring.length-1)
    JSONstring += ')'

    /*for an input adjacency list JSON object the JSONstring should look like this in the end:

        adjacencyList: 
        {
            "1":[15],
            "14":[3,574,75,6,24]
        }

        vvvv  output result  vvvvv

        JSON_ARRAY(JSON_OBJECT('1',JSON_ARRAY(15)),JSON_OBJECT('14',JSON_ARRAY(3,574,75,6,24)))
    */

    try {
        const [result, fields] = await connection.promise().query(`INSERT INTO posts (userID, adjacencyList, product, company, description) 
            VALUES ('${userID}', ${JSONstring}, '${product}', '${company}', '${description}');`);
        return result
    } catch (error) {
        return error.code
    } 
}

const makeNewSupplier = async (params) => {
    const {postID, name, description, latitude, longitude} = params
    try {
        const [result, fields] = await connection.promise().query(`INSERT INTO suppliers (postID, name, description, latitude, longitude) 
        VALUES ('${postID}', '${name}', '${description}', ${latitude}, ${longitude});`);
        return result
    } catch (error) {
        return error
    }
}

const getSupplierByID = async (supplyID) => {
    const [result,fields] = await connection.promise().execute(`SELECT * FROM suppliers WHERE supplyID=${supplyID};`)
    return result[0]
}

const deletePostByID = async (postID) => {
    try {
        const [result, fields] = await connection.promise().query(`DELETE FROM posts WHERE postID=${postID};`);
        return result
    } catch (error) {
        return error.code
    } 
}

const deleteSupplierByID = async (supplyID) => {
    try {
        const [result, fields] = await connection.promise().query(`DELETE FROM suppliers WHERE supplyID=${supplyID};`);
        return result
    } catch (error) {
        return error.code
    } 
}
module.exports = { getSupplyChainPostDetails, getSupplierByID, makeNewPost, makeNewSupplier, deletePostByID, deleteSupplierByID }
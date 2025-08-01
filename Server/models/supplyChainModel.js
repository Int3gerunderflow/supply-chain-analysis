const mysql = require('mysql2')

//connecting to database
const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'supplyschema'
});

//main methods associated with database operations

const getAllPublicPostsInDatabase = async () => {
    //use execute instead of query since it caches results
    const [result,fields] = await connection.promise().execute(`SELECT * FROM posts WHERE public=true;`)
    return result
}

const getAllPostsAssociatedByUserID = async (userID) => {
    //use execute instead of query since it caches results
    const [result,fields] = await connection.promise().execute(`SELECT * FROM posts WHERE userID=${userID};`)
    return result
}

const getSupplyChainPostDetails = async (postID) => {
    
    const [result,fields]  = await connection.promise().execute(`SELECT * FROM posts WHERE postID=${postID};`)
    return result[0]
}

const makeNewBlankPost = async (params) => {
    const {userID, product, company, description, finalAssembly} = params

    try {
        const [result, fields] = await connection.promise().query(`INSERT INTO posts (userID, adjacencyList, product, company, description, finalAssembly,public) 
            VALUES ('${userID}', JSON_ARRAY(), '${product}', '${company}', '${description}', ${finalAssembly}, 0);`);
        return result
    } catch (error) {
        console.log(error)
        return error.code
    } 
}

const updatePostDetailsInDatabase = async (params) => {
    const {postID, userID, product, company, description} = params

    try {
        const [result, fields] = await connection.promise().query(`UPDATE POSTS SET
            userID ='${userID}', product='${product}', company= '${company}', description='${description}'
            WHERE postID = ${postID};`);
        return result
    } catch (error) {
        console.log(error)
        return error.code
    } 
}

const updatePostAdjListInDatabase = async (params) => {
    const {postID, userID, adjacencyList} = params

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

    if(Object.keys(adjacencyList).length > 0)
    {
        JSONstring = JSONstring.substring(0,JSONstring.length-1)
    }
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
        const [result, fields] = await connection.promise().query(`UPDATE posts SET  
            userID = ${userID}, adjacencyList = ${JSONstring}
            WHERE postID = ${postID};`);
        return result
    } catch (error) {
        console.log(error)
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
        throw error
    }
}

const updateSupplierInDatabase = async (params) => {
    const {supplyID, postID, name, latitude, longitude, description} = params
    try {
        const [result, fields] = await connection.promise().query(`UPDATE suppliers 
            SET postID='${postID}', name='${name}', description='${description}', latitude=${latitude}, longitude=${longitude} 
            WHERE supplyID=${supplyID};`);
        return result
    } catch (error) {
        throw error
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
module.exports = { 
    getAllPublicPostsInDatabase,
    getAllPostsAssociatedByUserID,
    getSupplyChainPostDetails, 
    getSupplierByID,
    makeNewBlankPost, 
    updatePostDetailsInDatabase,
    updatePostAdjListInDatabase, 
    makeNewSupplier, 
    updateSupplierInDatabase,
    deletePostByID, 
    deleteSupplierByID }
// setup connection ----------------------------
const pg = require("pg");
const dbURI = "postgres://muuwnipeayhmsa:8e3e43e4e4751c77aac9476de38ed7432ee4585995347b57b3893b2d16f591c1@ec2-63-33-14-215.eu-west-1.compute.amazonaws.com:5432/d5gc5vdkhkn0tr";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl:{rejectUnauthorized: false}
});
  
// database methods ----------------------------
let dbMethods = {}; //create empty object

//----------------------------------------------
dbMethods.getAllBlogPosts = function(){
    let sql = "SELECT * FROM blogposts"
    return pool.query(sql); //return the promise
}

//----------------------------------------------
dbMethods.createBlogPosts = function(heading, blogtext, userid){
    let sql = "INSERT INTO blogposts (id, date, heading, blogtext, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning *";
	let values = [heading, blogtext, userid];
    return pool.query(sql, values); //return the promise
}
//-----------------------------------------------
dbMethods.deleteBlogPosts = function(id){
    let sql = "DELETE FROM blogposts WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values);//return the promise
}
// export dbMethods---------------------------------
module.exports = dbMethods;

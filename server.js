const express = require("express");
const server = express();
const PORT = process.env.PORT || 8080;
server.set("port", PORT);

const blogposts = require("./modules/blogposts.js");
const authUtils = require("./modules/auth_utils.js");

// middleware ---------------------------
server.use(express.static("public"));
server.use(express.json());

server.use(blogposts);

let hash = authUtils.createHash("kongolav");
console.log(hash);

let token = authUtils.createToken("jostein", 1);
console.log(token);

let payload = authUtils.verifyToken(token);
console.log(payload);

//general error handlogig----------------
server.use(function(err, req, res, next){
	res.status(500).json({
		error: "something went wrong on the server!",
		descr: err
	}).end();
});
server.listen(server.get("port"), function(){
	
});
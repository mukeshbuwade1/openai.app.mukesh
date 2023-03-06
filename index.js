const express = require("express")
const bodyParser = require("body-parser")
const dotenv = require('dotenv')
var cors = require('cors')

// env config 
dotenv.config()

// rest object 
const server = express();

// middleware 
server.use(bodyParser.json());
server.use(cors()) 

// route 
server.use("/ai/v1/user", require("./route/textBasedRoute"))

// port 
const port = process.env.PORT || 8080

// listen 
server.listen(port, () => {
    console.log(`server is running on port number ${port}`)
})

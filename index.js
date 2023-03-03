const express = require("express")
const bodyParser = require("body-parser")
const dotenv = require('dotenv')

// env config 
dotenv.config()

// rest object 
const server = express();

// middleware 
server.use(bodyParser.json());

// route 
server.use("/ai/v1/user", require("./route/textBasedRoute"))

// port 
const port = process.env.PORT || 8080

// listen 
server.listen(port, () => {
    console.log(`server is running on port number ${port}`)
})

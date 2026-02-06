// Start server
// Connect server to Database


require('dotenv').config() //sabse first line aati ye server.js mein 
const app = require("./src/app");
const connectToDb = require("./src/config/database")

connectToDb()

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})
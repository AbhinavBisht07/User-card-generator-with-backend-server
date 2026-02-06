// Create server
// Config server

const express = require("express");
const userModel = require("./models/user.model")
const cors = require("cors");


const app = express();
app.use(cors()) //server starts accepting cross origin requests ..
app.use(express.json()) // middleware



// - POST /api/users
// - Create a user data
// - req.body = { name, profileURL, role, bio, email}
app.post("/api/users", async (req,res)=>{
    // console.log(req.body);
    const {name, profileURL, role, bio, email} = req.body;

    const user = await userModel.create({
        name, profileURL, role, bio, email
    })

    res.status(201).json({
        messsage: "User created successfully",
        user
    })
})

// - GET /api/users
// - Fetch users' data
app.get("/api/users", async (req,res)=>{
    const users = await userModel.find();

    res.status(200).json({
        message: "Users fetched successfully",
        users
    })
})

// - DELETE /api/users/:id
// - delete user based on requested user id
app.delete("/api/users/:id", async (req,res)=>{
    // console.log(req.params.id);
    const id = req.params.id;

    await userModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "User deleted successfully"
    })
})

// - PATCH /api/users/:id
// - Update user's data based onn requested user id
// - req.body = {}
app.patch("/api/users/:id", async (req, res)=>{
    const id  = req.params.id;
    const updates = req.body;

    await userModel.findByIdAndUpdate(
        id, // 1st argument - id to identify user/ user data
        { $set: updates }, // 2nd argument - contains what fields to modify and what new values to give those fields
    )

    res.status(200).json({
        message: "User's data updated successfully"
    })
}) 

module.exports = app
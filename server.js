const express=require("express");
const ejs=require("ejs");
const app=express();
const port=process.env.PORT || 8000;
let intial_path=require("path").join(__dirname,"public");

require("dotenv").config();

app.set("view engine",ejs);
app.use(express.json());
app.use(express.static(intial_path));

// Connecting the database
const mongoose=require("mongoose");


// Routes
app.get("/",(req,res)=>{
    res.render("home",{
        youtubers: []
    });
})

// Listening on port
app.listen(port, ()=>{
    console.log("Listening at port",port);
})
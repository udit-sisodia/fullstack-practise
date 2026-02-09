const express = require("express")

const app=express()

app.use(express.json())

const notes=[];


app.get("/",(req,res)=>{
    res.send("hello")
})

app.post("/notes" , (req , res ) => {
    notes.push(req.body);
    res.status(201).json({
        message:"notes created successfully"
    })
    console.log(notes);
})

app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes:notes
    });
})

module.exports=app;
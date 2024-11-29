const express=require("express");
const app=express();


app.listen(80,()=>{
    console.log("Server is on and listening on port 8080")
})

app.get("/",(req,res)=>{
    console.log(req)
})
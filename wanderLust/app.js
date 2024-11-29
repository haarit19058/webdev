const express=require("express");
const app=express();
const mongoose= require("mongoose");
const Listing=require("./Models/listing.js")
const path=require("path")
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));
const methodOverride=require("method-override")
app.use(methodOverride("_method"));


const ejs_mate=require("ejs-mate")
app.engine("ejs",ejs_mate)




app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

const Mongo_Url="mongodb+srv://haarit1905:hrc1905@cluster0.xhnngmm.mongodb.net/wanderlust"

main().then(()=>{
    console.log("Connected to db")
})
.catch(()=>{
    console.log("some error occured")
})
async function main(){
    await mongoose.connect(Mongo_Url)
}

app.get("/",(req,res)=>{
    res.send("Hi! I am root")
})


// app.get("/testlistings",async (req,res)=>{
//     let samplelisting=new Listing({
//         title:"my new villa",
//         description:"near beach",
//         price:2000,
//         location:"Calungat Goa",
//         country:"India"
//     })

//     await samplelisting.save();
//     console.log("sample was sent ")
//     res.send("succesful")
// }) 


app.get("/listings", async (req,res)=>{
    const alllistings= await Listing.find({});
    res.render("listings/index.ejs",{alllistings});
})

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
    // res.send("hrc")
})//new route is kept above show route because otherwise new will be considered as an id


app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id)
    res.render("listings/show.ejs",{listing})

})


app.post("/listings/new",(req,res)=>{
    let data=req.body;
    let list=new Listing({
        title:data.title,
        description:data.description,
        image:data.image,
        price:data.price,
        location:data.location,
        country:data.country
    })
    list.save()
    res.redirect("/listings")
})

app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
})


app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings`)
})

app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let deleted = await Listing.findByIdAndDelete(id)
    console.log(deleted)
    res.redirect("/listings")
})

app.listen(8080,()=>{
    console.log("Server is on and listening on port 8080")
})
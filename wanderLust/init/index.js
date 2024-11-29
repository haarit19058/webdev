const mongoose=require("mongoose");
const initdata=require("./data.js")
const Listing=require("../Models/listing.js")


const Mongo_Url="mongodb://127.0.0.1:27017/wanderlust"

main().then(()=>{
    console.log("Connected to db")
})
.catch(()=>{
    console.log("some error occured")
})
async function main(){
    await mongoose.connect(Mongo_Url)
}


const initDB=async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data was initiated")
};

initDB();
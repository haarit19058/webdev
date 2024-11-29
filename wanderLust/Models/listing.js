const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const listingSchema= new Schema({
    title:{type:String,required:true},
    description:String,
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1682686578842-00ba49b0a71a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D",
        set: (v)=>v===""?"https://unsplash.com/photos/wooden-structures-near-body-of-water--98y5HIFDs8":v,
        },
    price:Number,
    location:String,
    country:String
});


const Listing=mongoose.model("Listing",listingSchema);
module.exports = Listing;
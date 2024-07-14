const mongoose=require('mongoose')

const placeSchema=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    address:String,
    photos:Array,
    description:String,
    perks:[String],
    checkin:Number,
    checkout:Number,
    maxguest:Number,
    price:Number
});

const Placemodel=mongoose.model('Place',placeSchema)

module.exports=Placemodel;


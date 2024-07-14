const mongoose=require('mongoose')

const BookingSchema=new mongoose.Schema({
    booker:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    place:{type:mongoose.Schema.Types.ObjectId,ref:'Place'},
    price:Number,
    checkin:Date,
    checkout:Date,
    guest:Number,
    bookerName:String,
    bookerNumber:Number
})

const BookingModel=mongoose.model('Booking',BookingSchema);

module.exports=BookingModel;
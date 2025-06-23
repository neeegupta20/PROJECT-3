const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://wastenap:p%40ssw0rd%279%27%21@cluster0.gaehxqy.mongodb.net/");

const UserSchema=mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String
});

const UserModel=mongoose.model('User',UserSchema);

module.exports=UserModel;


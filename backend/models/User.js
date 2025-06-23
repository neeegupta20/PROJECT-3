const mongoose=require('mongoose');

mongoose.connect("YOUR MONGOOSE CONNECTION URL STRING");

const UserSchema=mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String
});

const UserModel=mongoose.model('User',UserSchema);

module.exports=UserModel;


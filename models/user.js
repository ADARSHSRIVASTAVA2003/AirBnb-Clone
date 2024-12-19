const  mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportlocalMongoose=require("passport-local-mongoose");

 
const userSchema =new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    username:{
        type:String,
        require:true,
        unique:true}
    // password:String,
})

userSchema.plugin(passportlocalMongoose);


module.exports=mongoose.model("user",userSchema)
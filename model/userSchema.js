const mongoose = require("mongoose");

const UserSchema=new mongoose.Schema({
   
      name:{
        type:String,
        required:true,
      },
      email:{
        type:String,
        required:true,
        unique:true,
      },
      password:{

        type:String,
        required:true,
      },
      lastName:{

        type:String,
        required:true,
      },
      phoneNumber:{

        type:String,
        required:true,
      },
      userName:{

        type:String,
        required:true,
        unique:true,
      },
      resetToken: {  
        type: String 
      },
      tokenExpiration: {
        
        type: Date 
      },
      profilePhoto: {
         type: String, default: "" 
        }, // Profile Image URL
      backgroundPhoto: {
         type: String, default: "" 
        },
         // Background Image URL
   
     otp: { type: String }, // Store OTP temporarily
  otpExpires: { type: Date }, // OTP expiration
      

})
 
const User=mongoose.model("user",UserSchema);

module.exports=User;
const User =require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Multer =require("multer");
const nodemailer =require("nodemailer")
const fs = require('fs');
const path =require("path")

require("dotenv").config();


async function UserSignup(req,res) {
       
    try {
        const {name,email,password,lastName,phoneNumber,userName}=req.body;

    const user=await User.findOne({email});

    if(user){
        return res.status(400).json({msg:"email is allready exists"})
    }

    const username=await User.findOne({userName});

    if(username){
        return res.status(400).json({msg:"user is allready exists"})
    }

    const hashedPassword= await bcrypt.hash(password,10)

    const userNew=await User({name,email,password:hashedPassword,lastName,phoneNumber,userName});

      await userNew.save();

      return res.status(200).json({msg:"User ctreat seccessfuly"});

    } catch (error) {
        
        return res.status(400).json({msg:"error",error});

    }
    

}

async function GetData(req,res) {

    const {email}=req.query; 
    const {userId}=req.user

    const userData= await User.findOne({_id:userId});

    if (!userData) {
          
        return res.status(400).json({msg:"User not found"});
    }
    

    return res.status(200).json(userData)
    
}

async function UserLogin(req,res) {

    try {

        const{email,password}=req.body;

    const user= await User.findOne({email});

    if(!user){

        return res.status(404).json({msg:"User not fount"});
    }
    
    const ismech= await bcrypt.compare(password,user.password);

    if (ismech) {
      
    

   const token=jwt.sign({userId:user._id},process.env.my_secret_key);



    return res.status(200).json({msg:"User Login seccessfuly",token,user});
    }    
    return res.status(404).json({msg:"password invalide"});
    } catch (error) {
        
        return res.status(400).json({msg:"error",error});

    }
    
    
}
    
async function forgetPassword(req,res) {
  
    try {
        const {email}=req.body;
       
        if (!email) return res.status(400).json({msg:"email not found"});
    
      const checkUser = await User.findOne({email});

      if(!checkUser) return res.status(400).json({msg:"user not fount"});

      const token = jwt.sign({email},process.env.my_secret_key)
          
      const transporter = nodemailer.createTransport({
        service:"gmail",
        port: 465,
        secure:true,
        auth:{
            user:process.env.my_email,
            pass:process.env.my_pass
        }
      })

      const receiver ={
         from:"amanwali@gmail.com",
         to:email,
         subject:"Password reset Requast",
         text:`click on this Link to generate your New password ${process.env.client_url} reset password ${token}`
      }

       await transporter.sendMail(receiver);

       return res.status(200).json({msg:"password Reset seccessfuly",token});
        
    } catch (error) {
        res.status(500).json({ message: error.message });
   
    }
   

    
}

async function generateOTP(req,res) {
    
    try {
            
        const { email } = req.body;
 
        const user = await User.findOne({email});
    
        if (!user) return res.status(404).json({ msg: "User not found" });
    
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    
    
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        const transporter = nodemailer.createTransport({
            service:"gmail",
            port: 465,
            secure:true,
            auth:{
                user:process.env.my_email,
                pass:process.env.my_pass
            }
          })
    
        const mailOptions = {
            from: "amanwali@gmail.com",
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
          };
      
         await transporter.sendMail(mailOptions);
      
          res.status(200).json({ msg: "OTP sent successfully" });
    } catch (error) {
          
        res.status(500).json({  message: error.message });
    }
   
}

async function verifyotp(req,res) {
    
    try {
        const {otp,email} = req.body;
        const user = await User.findOne({email});
    
        if (!user || user.otp !== otp || Date.now() > user.otpExpires) {
          return res.status(400).json({ msg: "Invalid or expired OTP" });
        }
    
        res.status(200).json({ msg: "OTP verified successfully" });
      } catch (error) {
        res.status(500).json({ msg: "Server error", error });
      }
}

async function resetPass(req,res) {

    try {

    const {userId}=req.user;
    const {password,email}=req.body;

    if (!password) return res.status(400).json({msg:"password not found"});

    // const decode = jwt.verify(userId,process.env.my_secret_key);

    const checkUser = await User.findById({email});
    if (!checkUser) return res.status(400).json({msg:"user not found"});

     const NewhasPassword=await bcrypt.hash(password,10);

     checkUser.password=NewhasPassword;

     checkUser.save();
  
     return res.status(200).json({msg:"password Reset seccessfuly"});

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
    

}
  
const UploadFile = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded!" });
        }

        console.log("Uploaded file:", req.file);


        const {email}=req.body;

        const user =await User.findOne({email})
       
        if (!user) {
             
            return res.status(404).json({msg:"user not found"});
        }
           
        if (user.profilePhoto) {
            const oldPhotoPath = path.join(__dirname, "../uploads", user.profilePhoto);
            if (fs.existsSync(oldPhotoPath)) fs.unlinkSync(oldPhotoPath);
        }

        user.profilePhoto = req.file.filename;
       await user.save();

       res.status(200).json({
        msg: "File uploaded successfully!",
        filePath: `/uploads/${req.file.filename}`,
    });

       
    } catch (error) {
        console.error("File upload error:", error);
        res.status(500).json({ message: "Server error while uploading file." });
    }
};
 async function GetImage(req,res) {
     
    const filename = req.params.filename;
    const filePath =path.join(__dirname,"../uploads",filename);
      
    try {
        if (!fs.existsSync(filePath)) {
             
            return res.status(404).json({msg:"file not found"})
        }

        res.sendFile(filePath);
    } catch (error) {
        
        console.error("File upload error:", error);
        res.status(500).json({ message: "Server error while uploading file." });
    }
 }

  async function updateUserData(req,res) {
     console.log("request on updateUserData ")
     try {
        const {name,email,phoneNumber,password}=req.body;
         const {userId}=req.user;
 
         const updatedUser = await User.findByIdAndUpdate(
             userId,
            { name, email, phoneNumber,password },
            { new: true }
          );
      
          if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
          }
      
          res.json(updatedUser);
   
        // const NewUser= await User.findById({userId})
        // if (!NewUser) {
             
        //     return res.status(404).json({msg:"User not found"});   
        //   }
        // if (name) NewUser.name=name;
        // if (email) NewUser.email=email;
        // if (phoneNumber) NewUser.phoneNumber=phoneNumber;
        // if(password){
        //   const hashedPassword= await bcrypt.hash(password,10);
        //   NewUser.password=hashedPassword;
        // }
 
        // await NewUser.save();
        // return res.status(200).json(NewUser);
     } catch (e) {
          console.log(e.message);
          return res.status(404).json({msg:e.message})
     }
       
  } 

  async function OldPassCheck(req,res) {
        
    
    const {odlPasss,newpassword}=req.body;
    const {userId}=req.user;

    const user = await User.findById({_id:userId});

    if (!user) {
         
        return res.status(404).json({msg:"user not found"});
    } 
    const isMatch = await bcrypt.compare(odlPasss, user.password);

    if (!isMatch) {
          
        return res.status(404).json({msg:"Odl password is invelide"});
         
    }
          
        user.password = await bcrypt.hash(newpassword, 10);
         
    await user.save()
    res.json({ message: "Password is correct" });
    
       
  }

module.exports={
    UserLogin,
    UserSignup,
    GetData,
    forgetPassword,
    resetPass,
    UploadFile,
    GetImage,
    updateUserData,
    OldPassCheck,
    generateOTP,
    verifyotp,
}






const express = require("express");
const upload =require("../upload")
const {UserLogin,UserSignup, GetData, forgetPassword,resetPass,UploadFile, GetImage, updateUserData, OldPassCheck, generateOTP, verifyotp}=require("../controller/user");
const authMiddleware = require("../authMiddleware");

const route=express.Router();

route.post("/login",UserLogin);
route.post("/signup",UserSignup);
route.get("/getdata",authMiddleware,GetData);
route.post("/forget_pass",forgetPassword);
route.post("/reset_pass",authMiddleware,resetPass);
route.post("/profile",upload.single('image'), UploadFile);
route.get("/get/uploads/:filename",GetImage);
route.put("/updatesettings",authMiddleware,updateUserData);
route.post("/checkpass",authMiddleware,OldPassCheck);
route.post("/generateOTP", generateOTP);
route.post("/otpverify",authMiddleware,verifyotp);



module.exports=route;
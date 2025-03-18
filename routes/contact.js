const express = require("express");
const {contact}=require("../controller/contact")
const route=express.Router();

route.post("/add",contact);

module.exports=route;
const express = require("express");
const upload =require("../upload")
const authMiddleware = require("../authMiddleware");
const {createOrder, getAllOrder}=require("../controller/order")
const route=express.Router();

route.post("/create",authMiddleware,createOrder);
route.get("/getall",authMiddleware,getAllOrder);


module.exports=route;
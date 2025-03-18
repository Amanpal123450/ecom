const express = require("express");
const upload =require("../upload")
const {getAllProduct,getProductById,CreatProduct,searchbra}=require("../controller/product")
const route=express.Router();

route.get("/search",searchbra);
route.get("/all",getAllProduct);
route.get("/:id",getProductById);
route.post("/add-product", upload.single('productImage'),CreatProduct);


module.exports=route;
const express = require("express");
const {addCart, getCart, removeitem, updateCartItem, clearCart}=require("../controller/cart");
const authMiddleware = require("../authMiddleware");
const route=express.Router();

route.post("/add",authMiddleware,addCart);
route.get("/get",authMiddleware,getCart);
route.delete("/remove",authMiddleware,removeitem);
route.delete("/clear",authMiddleware,clearCart);
route.put("/update",authMiddleware,updateCartItem)

module.exports=route;
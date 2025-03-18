const authMiddleware = require("../authMiddleware");
const {addToWishlist,getWishlist, removerWishlist, clearWishlist}=require("../controller/Wishlist")
const express = require("express");

const Router=express.Router();

Router.post("/add",authMiddleware,addToWishlist);
Router.get("/get",authMiddleware,getWishlist)
Router.delete("/remove",authMiddleware,removerWishlist)
Router.delete("/clear",authMiddleware,clearWishlist)

module.exports=Router;
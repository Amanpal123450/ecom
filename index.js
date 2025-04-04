const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const UserRoute=require("./routes/userRoutes")
const Product=require("./routes/product");
const cart=require("./routes/cart");
const wishlist=require("./routes/wishList");
const contact=require("./routes/contact")
const order=require("./routes/order");
mongoose.connect(
  "mongodb+srv://amanpal6000:Jt6nnrKck2pJy5EH@cluster0.l7has.mongodb.net/?retryWrites=true"
).then(() => {
    console.log("MongoDB connected");
  })
  .catch((e) => {
    console.log(e);
  });
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/",UserRoute);
  app.use("/product",Product);
  app.use("/cart",cart);
  app.use("/wistlist",wishlist);
  app.use("/contact",contact);
  app.use("/order",order);
  app.use("/uploads", express.static("uploads"));



app.listen(8000, () => {
  console.log("server is start");
});

// Jt6nnrKck2pJy5EH;

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VQQVNTIjp7Il9pZCI6IjY3OWI3NGJjNzYwZTYyYmQ4NDBjNDg0MCIsIm5hbWUiOiJtdWt1bCIsImVtYWlsIjoiYW1hbnBhbEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRxUkIwRXgvQjFaY1BpVi8xVlF5MzMub2tyUGVYUHVOVGdXa0xYOGZzZnVKNldLZnVkSVpLYSIsIl9fdiI6MH0sImlhdCI6MTczODI3NTcxMn0.ilJSLKlBdjdL6qhLvQsjGDjqmogUmcnhDuCLHeSeqk0"

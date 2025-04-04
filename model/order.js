const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },  // Ensure `name` is included
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      imageUrl: { type: String, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  orderNumber: { type: String, required: true },
  address: {
    phoneNumber: { type: String, required: true },
    postalCode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true }
  },
  status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);

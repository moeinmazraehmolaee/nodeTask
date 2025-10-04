const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_type: {
      type: String,
      required: true,
      enum: [
        "shirt",
        "t-shirt",
        "pants",
        "shorts",
        "skirt",
        "dress",
        "jacket",
        "coat",
        "sweater",
        "uniform",
        "shoes",
        "accessory",
        "hat",
        "scarf",
      ],
    },
    color: {
      type: String,
      required: true,
      enum: [
        "white",
        "black",
        "gray",
        "red",
        "blue",
        "green",
        "yellow",
        "orange",
        "purple",
        "pink",
        "brown",
        "beige",
        "navy",
        "maroon",
        "olive",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productsSchema);
module.exports = Products;

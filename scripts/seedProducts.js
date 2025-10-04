const mongoose = require("mongoose");
const Product = require("../models/Products.model");
const User = require("../models/User.model");
require("dotenv").config();

async function seedProducts() {
  await mongoose.connect(process.env.MONGODB_URI);

  const users = await User.find({});
  if (users.length === 0) {
    console.log(" No users found. Run seedUsers.js first!");
    await mongoose.disconnect();
    return;
  }

  const products = [
    { name: "School Uniform Shirt", product_type: "shirt", color: "white" },
    { name: "Summer T-Shirt", product_type: "t-shirt", color: "blue" },
    { name: "Formal Pants", product_type: "pants", color: "black" },
    { name: "Sports Shorts", product_type: "shorts", color: "gray" },
    { name: "Winter Jacket", product_type: "jacket", color: "navy" },
    { name: "Classic Coat", product_type: "coat", color: "brown" },
    { name: "Casual Sweater", product_type: "sweater", color: "green" },
    { name: "School Skirt", product_type: "skirt", color: "blue" },
    { name: "Uniform Dress", product_type: "dress", color: "beige" },
    { name: "Leather Shoes", product_type: "shoes", color: "black" },
    { name: "Student Hat", product_type: "hat", color: "red" },
    { name: "School Scarf", product_type: "scarf", color: "maroon" },
    { name: "PE Uniform", product_type: "uniform", color: "white" },
    { name: "Wool Accessory", product_type: "accessory", color: "pink" },
  ];

  const productsWithUsers = products.map((p, index) => ({
    ...p,
    user_id: users[index % users.length]._id, 
  }));

  const count = await Product.countDocuments();
  if (count > 0) {
    console.log(` ${count} products already exist. Skipping insert.`);
  } else {
    await Product.insertMany(productsWithUsers);
    console.log("Products seeded successfully!");
  }

  await mongoose.disconnect();
}

seedProducts()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(" Error seeding products:", err);
    process.exit(1);
  });

module.exports = { seedProducts };

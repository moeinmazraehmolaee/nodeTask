const Product = require("../models/Products.model");
const Role = require("../models/Role.model");

exports.createProduct = async (req, res) => {
  try {
    const { name, product_type, color } = req.body;

    const product = await Product.create({
      name,
      product_type,
      color,
      user_id: req.user._id,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating product" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const user = req.user;
    let filter = {};

    if (!user.is_super_admin) {
      const role = await Role.findById(user.role).populate("permissions");
   const hasPermission =
  role && Array.isArray(role.permissions) &&
  role.permissions.some(
    (perm) => perm.module === "Product" && perm.action === "View"
  );

      if (!hasPermission) {
        filter.user_id = user._id;
      }
    }

    const products = await Product.find(filter).populate(
      "user_id",
      "username name"
    );
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }

    const user = req.user;
    const canView =
      product.user_id.toString() === user._id.toString() || user.is_super_admin;

    if (!canView) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, product_type, color } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const user = req.user;
    const canEdit =
      product.user_id.toString() === user._id.toString() || user.is_super_admin;

    if (!canEdit) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    product.name = name ?? product.name;
    product.product_type = product_type ?? product.product_type;
    product.color = color ?? product.color;

    await product.save();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const user = req.user;
    const canDelete =
      product.user_id.toString() === user._id.toString() || user.is_super_admin;

    if (!canDelete) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    await product.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
};


const express = require("express");
const router = express.Router();
const {
  updateUserProfile,
  promoteToSuperAdmin,
  updateUserRole,
} = require("../controllers/user.controller");

const {
  validatePromoteSuperAdmin,
  validateUpdateUserRole,
  validateUpdateUserProfile,
} = require("../middlewares/validateUser");

// Update user profile
router.put("/:id/profile", validateUpdateUserProfile, updateUserProfile);

//  Promote to super admin
router.put(
  "/:id/promoteSuperAdmin",
  validatePromoteSuperAdmin,
  promoteToSuperAdmin
);

//  Update user role
router.put("/:id/role/:roleId", validateUpdateUserRole, updateUserRole);

module.exports = router;

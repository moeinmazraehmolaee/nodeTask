const User = require("../models/User.model");
const Role = require("../models/Role.model");

// Helper function to check permissions (reuse from previous logic)
const hasPermission = async (user, module, action) => {
  const userRole = await Role.findById(user.role).populate("permissions");
  return userRole.permissions.some(
    (perm) => perm.module === module && perm.action === action
  );
};

//  Update user name and phone
const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, username, password } = req.body;
    const currentUser = req.user;

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSelfUpdate =
      targetUser._id.toString() === currentUser._id.toString();

    if (isSelfUpdate) {
      if (name !== undefined) targetUser.name = name;
      if (phone !== undefined) targetUser.phone = phone;
      if (username !== undefined) targetUser.username = username;
      if (password !== undefined) targetUser.password = password;
    } else {
      const hasAccountEdit = await hasPermission(
        currentUser,
        "Account",
        "Edit"
      );
      const isSuperAdmin = currentUser.is_super_admin;

      if (!hasAccountEdit && !isSuperAdmin) {
        return res
          .status(403)
          .json({
            message:
              "Insufficient permissions to edit user account information",
          });
      }

      if (name !== undefined) targetUser.name = name;
      if (phone !== undefined) targetUser.phone = phone;
      if (username !== undefined) targetUser.username = username;
      if (password !== undefined) targetUser.password = password;
    }

    await targetUser.save();
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.log("error -->", error);
    res.status(500).json({ message: "internal server error" });
  }
};

//  Promote user to super admin
const promoteToSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    if (!currentUser.is_super_admin) {
      return res
        .status(403)
        .json({
          message: "Only super admins can promote users to super admin",
        });
    }

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return res.status(400).json({ message: "User not found" });
    }

    if (targetUser.is_super_admin) {
      return res.status(400).json({ message: "User is already a super admin" });
    }

    targetUser.is_super_admin = true;
    await targetUser.save();

    res
      .status(200)
      .json({ message: "User promoted to super admin successfully" });
  } catch (error) {
    console.log("error -->", error);
    res.status(500).json({ message: "internal server error" });
  }
};

// Update user role
const updateUserRole = async (req, res) => {
  try {
    const { id, roleId } = req.params;
    const currentUser = req.user;

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate role exists
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(400).json({ message: "Role not found" });
    }

    const hasRoleAssign = await hasPermission(currentUser, "Account", "Assign");

    if (!hasRoleAssign) {
      return res
        .status(403)
        .json({ message: "Insufficient permissions to assign role" });
    }

    targetUser.role = roleId;
    await targetUser.save();

    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    console.log("error -->", error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  updateUserProfile,
  promoteToSuperAdmin,
  updateUserRole,
};

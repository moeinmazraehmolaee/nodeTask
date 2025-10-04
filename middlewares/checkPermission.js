const Role = require("../models/Role.model");


function checkPermission(moduleName, actionName) {
  return async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      if (user.is_super_admin) return next();

      const role = await Role.findById(user.role).populate("permissions");
      if (!role) {
        return res.status(403).json({ success: false, message: "Role not found" });
      }

      const hasPermission = role.permissions.some(
        (perm) => perm.module === moduleName && perm.action === actionName
      );

      if (!hasPermission) {
        return res
          .status(403)
          .json({ success: false, message: "Permission denied" });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
}

module.exports = checkPermission;

const { body, param, validationResult } = require("express-validator");

const validateUpdateUserProfile = [
  param("id").isMongoId().withMessage("Invalid user ID format"),

  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 1 })
    .withMessage("Name cannot be empty")
    .trim(),

  body("phone")
    .optional()
    .isString()
    .withMessage("Phone must be a string")
    .matches(/^09\d{9}$/)
    .withMessage("Phone must match Iranian mobile format (09xxxxxxxxx)"),

  body("username")
    .optional()
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .trim(),

  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validatePromoteSuperAdmin = [
  param("id").isMongoId().withMessage("Invalid user ID format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdateUserRole = [
  param("id").isMongoId().withMessage("Invalid user ID format"),
  param("roleId").isMongoId().withMessage("Invalid role ID format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateUpdateUserRole,
  validatePromoteSuperAdmin,
  validateUpdateUserProfile,
};

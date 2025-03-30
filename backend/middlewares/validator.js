const { body, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// user-signup validation
const validateSignup = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  handleValidationErrors,
];

// user-login validation
const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is requierd"),
  handleValidationErrors,
];

// book-create validation
const validateBookCreation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("price").isFloat().withMessage("Price must be a number"),
  body("rating")
    .isFloat({ min: 1, max: 10 })
    .withMessage("Rating must be between 1 and 10"),
  handleValidationErrors,
];

module.exports = {
  validateSignup,
  validateLogin,
  validateBookCreation,
};

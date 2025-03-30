const express = require("express");
const { validateSignup, validateLogin } = require("../middlewares/validator");

const router = express.Router();

const authController = require("../controllers/auth-controller");

router.post("/signup", validateSignup, authController.signup);
router.post("/login", validateLogin, authController.login);

module.exports = router;

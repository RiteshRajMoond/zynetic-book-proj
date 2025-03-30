const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const bookController = require("../controllers/book-controller");
const { validateBookCreation } = require("../middlewares/validator");

router.get("/", bookController.getAllBooks);

router.get("/:id", bookController.getBookById);

// auth-middleware is used to protect the routes
router.post(
  "/",
  authMiddleware,
  validateBookCreation,
  bookController.createBook
);
router.put(
  "/:id",
  authMiddleware,
  validateBookCreation,
  bookController.updateBook
);
router.delete("/:id", authMiddleware, bookController.deleteBook);

module.exports = router;

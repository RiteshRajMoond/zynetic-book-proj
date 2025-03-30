const Book = require("../models/Book");

exports.createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json({ message: "Book created", book });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// supports pagination, filtering and partial searching, sorting by price and ratings
exports.getAllBooks = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      author,
      category,
      rating,
      price,
      title,
      sort,
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    let query = {};

    // Filtering
    if (author) query.author = author;
    if (category) query.category = category;
    if (rating) query.rating = { $gte: Number(rating) };
    if (price) query.price = { $lte: Number(price) };

    // partial search
    if (title) query.title = new RegExp(title, "i");

    // sorting
    let sortBy = {};
    if (sort) {
      const [field, order] = sort.split("_");
      sortBy[field] = order === "asc" ? 1 : -1;
    }

    const books = await Book.find(query)
      .sort(sortBy)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .lean();

    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limitNumber);

    return res.status(200).json({
      success: true,
      totalBooks,
      totalPages,
      currentPage: pageNumber,
      books,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error!", error: err });
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book fetched!", book });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!", error });
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ message: "Book Updated!", book });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!", error });
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found!" });
    return res.status(200).json({ message: "Book deleted!", book });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!", error });
  }
};

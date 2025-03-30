const mongoose = require("mongoose");
const Book = require("./models/Book"); // Adjust the path to your Book model
require("dotenv").config();

// Replace with your MongoDB connection string
const MONGO_URI = process.env.MONGO_URI;

// Function to generate random books
const generateBooks = (count) => {
  const genres = ["Fiction", "Non-Fiction", "Romance", "Adventure", "Dystopian", "Fantasy", "Science Fiction"];
  const books = [];

  for (let i = 1; i <= count; i++) {
    books.push({
      title: `Book Title ${i}`,
      author: `Author ${i}`,
      category: genres[Math.floor(Math.random() * genres.length)],
      price: (Math.random() * 100).toFixed(2), // Random price between 0 and 100
        rating: (Math.random() * 10).toFixed(1), // Random rating between 0 and 5
    });
  }

  return books;
};

const insertBooks = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const books = generateBooks(100); // Generate 100 books
    const result = await Book.insertMany(books);
    console.log("Books inserted successfully:", result);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting books:", error);
    mongoose.connection.close();
  }
};

insertBooks();
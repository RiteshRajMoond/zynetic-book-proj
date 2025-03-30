const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth-routes");
const bookRoutes = require("./routes/book-routes");
const errorHandler = require("./middlewares/error-handler");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});

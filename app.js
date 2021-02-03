const express = require("express");
const app = express();

//const morgan = require('morgan');
app.use(express.json());
const book = require("./api/books");

app.use("/books", book);

app.use((req, res, next) => {
  const error = new Error("Not Found: Message from Error Handling");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

module.exports = app;

const express = require("express");
const router = express.Router();
const books = require("../booksData/books.json");

let bookDirectory = books;

router.get("/", (req, res) => {
  res.status(200).json(bookDirectory);
});

router.post("/", (req, res) => {
  const body = req.body;

  const BookExist = bookDirectory.find((b) => b.id === parseInt(body.id));
  if (BookExist) {
    return res.status(400).send("Book Already Exist");
  }
  bookDirectory.push(body);
  res.status(200).send("Book Addedd Successfully");
});

router.get("/:bookId", (req, res) => {
  const id = req.params.bookId;
  const book = bookDirectory.find((b) => b.id === parseInt(id));
  if (!book) {
    res.status(400).json({
      message: `Book Not Found of Book Id: ${id}`,
    });
  } else {
    res.status(200).send(book);
  }
});

router.put("/:bookId", (req, res) => {
  const id = req.params.bookId;
  const body = req.body;
  bookDirectory.forEach((book, index) => {
    if (book.id === parseInt(id)) {
      bookDirectory[index] = body;
    }
  });
  return res.status(200).send(`Book with ID : ${id} has been updated`);
});

router.delete("/:bookId", (req, res) => {
  const id = req.params.bookId;

  let book = bookDirectory.find((b) => b.id === parseInt(id));
  if (!book) {
    return res.status(400).send(`Book Not Found of Book Id: ${id}`);
  }

  bookDirectory = bookDirectory.filter((b) => b.id !== parseInt(id));
  return res.status(200).send("Successfully Deleted");
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Hardcoded list of books
let books = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        reviews: ["excellent"]
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "9780061120084",
        reviews: []
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        isbn: "9780590353427",
        reviews: []
    },
    {
        title: "1984",
        author: "George Orwell",
        isbn: "9780451524935",
        reviews: []
    },

    // Add more books as needed
];

// Route to get all books
router.get("/", (req, res) => {
    res.json(books);
});

// Route to get a book by ISBN
router.get("/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(book => book.isbn === isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Route to get all books by an author
router.get("/author/:author", (req, res) => {
    const author = req.params.author;
    const authorBooks = books.filter(book => book.author === author);
    if (authorBooks.length > 0) {
        res.json(authorBooks);
    } else {
        res.status(404).json({ message: "No books found for this author" });
    }
});

// Route to get all books by title
router.get("/title/:title", (req, res) => {
    const title = req.params.title;
    const titleBooks = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
    if (titleBooks.length > 0) {
        res.json(titleBooks);
    } else {
        res.status(404).json({ message: "No books found with this title" });
    }
});

// Route to get book review
router.get("/:isbn/reviews", (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(book => book.isbn === isbn);
    if (book) {
        res.json(book.reviews);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Route to add or modify a book review
router.put("/:isbn/reviews", (req, res) => {
    // Extract ISBN from URL params and review from request body
    const isbn = req.params.isbn;
    const review = req.body.review;

    // Find the book by ISBN
    const book = books.find(book => book.isbn === isbn);

    // Check if the book exists
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Check if the review exists in the book's reviews array
    const existingReviewIndex = book.reviews.findIndex(existingReview => existingReview === review);

    if (existingReviewIndex !== -1) {
        // If review already exists, replace it with the new review
        book.reviews[existingReviewIndex] = review;
        return res.status(200).json({ message: "Review modified successfully", book });
    } else {
        // If review does not exist, add it to the book's reviews array
        book.reviews.push(review);
        return res.status(201).json({ message: "Review added successfully", book });
    }
});

// Route to delete a book review
router.delete("/:isbn/reviews/:review", (req, res) => {
    const isbn = req.params.isbn;
    const reviewToDelete = req.params.review;

    // Find the book by ISBN
    const book = books.find(book => book.isbn === isbn);

    if (!book) {
        // If book not found, return 404 Not Found
        return res.status(404).json({ message: "Book not found" });
    }

    // Check if the review exists for the book
    const reviewIndex = book.reviews.findIndex(existingReview => existingReview === reviewToDelete);

    if (reviewIndex !== -1) {
        // If review exists, delete it from the book's reviews array
        book.reviews.splice(reviewIndex, 1);
        return res.status(200).json({ message: "Review deleted successfully", book });
    } else {
        // If review doesn't exist, return 404 Not Found
        return res.status(404).json({ message: "Review not found for the specified book" });
    }
});

module.exports = router;

// Import the express module
const express = require('express');
// Import routers for books and users
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

// Create an instance of the Express application
const app = express();
// Define the port number
const PORT = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the users router at the '/user' base path
app.use('/user', usersRouter);

// Mount the books router at the '/books' base path
app.use('/books', booksRouter);

// Start the server

app.listen(PORT, () => console.log("Server is running at port " + PORT));
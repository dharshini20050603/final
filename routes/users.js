const express = require('express');

const router = express.Router();


let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gmail.com",
    password: "password123",
    DOB: "22-01-1990",
},
{
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gmail.com",
    password: "secret123",
    DOB: "21-07-1983",
},
{
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gmail.com",
    password: "example123",
    DOB: "21-03-1989",
},
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});
router.post("/login", (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body

  // Find user by email
  const user = users.find(user => user.email === email);

  // Check if user exists and if password matches
  if (user && user.password === password) {
      
      // Send success response with token
      res.status(200).json({ message: "User successfully logged in" });
  } else {
      // Send error response for invalid credentials
      res.status(401).json({ message: "Invalid email or password" });
  }
});
module.exports=router;
router.post("/register", (req, res) => {
  const { firstName, lastName, email, DOB } = req.body; // Extract user data from request body

  // Validate user data (e.g., check if required fields are provided)

  // Check if user with the same email already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
  }

  // Create a new user object
  const newUser = {
      firstName,
      lastName,
      email,
      DOB
  };

  // Add the new user to the list of users
  users.push(newUser);

  // Send a success response
  res.status(201).json({ message: "User successfully registered", user: newUser });
});
module.exports = router;
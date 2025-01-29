const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/topUsers');

// Create an item
router.post('/', async (req, res) => {
    const { name, email, password, number } = req.body;

    try {
        // Check for existing user with the same email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            number
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).send({ message: 'User not found' });
        res.send(updatedUser);
      } catch (error) {
        res.status(500).send({ message: 'Error updating user', error });
      }
});

router.put("/balance/:id", async (req, res) => {
    const { id } = req.params; // Extract the loan request ID from the route
    let { balance, check } = req.body; // Extract the balance and check value from the request body
  
    if (check === "dec") {
      balance = -balance; // Negate balance if check is "dec"
    }
  
    try {
      // Find the loan request by ID and increment its balance
      const updatedLoanRequest = await User.findByIdAndUpdate(
        id,
        { $inc: { balance: balance } }, // Use $inc to increment the balance
        { new: true, runValidators: true } // Return the updated document and validate fields
      );
  
      if (!updatedLoanRequest) {
        return res.status(404).json({ message: "Loan request not found" });
      }
  
      res.status(200).json({
        message: "Balance updated successfully",
        updatedLoanRequest,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating balance" });
    }
  });
  
  

module.exports = router;

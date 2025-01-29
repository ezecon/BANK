const express = require("express");
const router = express.Router();
const LoanRequest = require("../models/withdraw");

router.post("/", async (req, res) => {
  console.log("Request Body: ", req.body);

  try {
    const { receiverName, receiverAccount, amount, sender } = req.body; // Updated key names

    // Validate required fields
    if (!receiverName || !receiverAccount|| !sender  || !amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new Loan Request
    const newLoanRequest = new LoanRequest({
      receiverName, receiverAccount, amount, sender
    });

    // Save to database
    await newLoanRequest.save();
    res.status(200).json({ message: "Transfer request submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error submitting transfer request" });
  }
});

router.get('/all', async (req, res) => {
  try {
    const loanRequests = await LoanRequest.find(); // Retrieve all loan requests
    res.status(200).json(loanRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving loan requests" });
  }
});


// GET: Retrieve loan requests
router.get("/", async (req, res) => {
  try {
    const { userID } = req.query;

    let loanRequests;

    // If a userID is provided, filter loan requests by user
    if (userID) {
      loanRequests = await LoanRequest.find({ sender: userID });
    } else {
      // Otherwise, retrieve all loan requests
      loanRequests = await LoanRequest.find();
    }

    res.status(200).json(loanRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving loan requests" });
  }
});


// Define a PUT route
// PUT: Approve or update the loan status
router.put("/approve/:id", async (req, res) => {
  const { id } = req.params; // Extract the loan request ID from the route
  const { status } = req.body; // Extract the updated status from the request body

  try {
    // Find the loan request by ID and update its status
    const updatedLoanRequest = await LoanRequest.findByIdAndUpdate(
      id,
      { status }, // Update the status field
      { new: true, runValidators: true } // Return the updated document and validate fields
    );

    if (!updatedLoanRequest) {
      return res.status(404).json({ message: "Loan request not found" });
    }

    res.status(200).json({ message: "Loan status updated", updatedLoanRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating loan status" });
  }
});

module.exports = router;

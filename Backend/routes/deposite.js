const express = require("express");
const router = express.Router();
const LoanRequest = require("../models/deposite");

router.post("/", async (req, res) => {
  console.log("Request Body: ", req.body);

  try {
    const { userID, fullName, email, phone, depositeAmount, incomeProof, notes } = req.body; // Updated key names

    // Validate required fields
    if (!fullName || !email || !phone || !depositeAmount || !incomeProof) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new Loan Request
    const newLoanRequest = new LoanRequest({
      user: userID, // Use `user` to match the schema
      fullName,
      email,
      phone,
      depositeAmount, // Correct field name is already used here
      incomeProof,
      notes,
    });
    

    // Save to database
    await newLoanRequest.save();
    res.status(200).json({ message: "Deposite request submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error submitting loan request" });
  }
});

// GET: Retrieve loan requests
router.get("/", async (req, res) => {
  try {
    const { userID } = req.query;

    let loanRequests;

    // If a userID is provided, filter loan requests by user
    if (userID) {
      loanRequests = await LoanRequest.find({ user: userID });
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


module.exports = router;

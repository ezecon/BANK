const express = require('express');
const router = express.Router();
const LoanRequest = require("../models/loan.js");

// POST: Submit a loan request (already provided)
router.post("/", async (req, res) => {
  console.log("Request Body: ", req.body); 
  try {
    const { userID, fullName, email, phone, loanAmount, loanPurpose, incomeProof, notes } = req.body;

    if (!fullName || !email || !phone || !loanAmount || !loanPurpose || !incomeProof) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newLoanRequest = new LoanRequest({
      user: userID,
      fullName,
      email,
      phone,
      loanAmount,
      loanPurpose,
      incomeProof,
      notes,
    });

    await newLoanRequest.save();
    res.status(200).json({ message: "Loan request submitted successfully!" });
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


//post 
//get
//put
//delete
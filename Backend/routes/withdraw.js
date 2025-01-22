const express = require("express");
const router = express.Router();
const LoanRequest = require("../models/withdraw");

router.post("/", async (req, res) => {
  console.log("Request Body: ", req.body);

  try {
    const { fullName, picker, amount, dateOfWithdrawal } = req.body; // Updated key names

    // Validate required fields
    if (!fullName || !picker|| !dateOfWithdrawal  || !amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new Loan Request
    const newLoanRequest = new LoanRequest({
      fullName, picker, amount, dateOfWithdrawal
    });

    // Save to database
    await newLoanRequest.save();
    res.status(200).json({ message: "Withdraw request submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error submitting loan request" });
  }
});

module.exports = router;

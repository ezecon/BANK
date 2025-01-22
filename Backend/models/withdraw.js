const mongoose = require("mongoose");

const WithdrawRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    picker: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    dateOfWithdrawal: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);


const WithdrawRequest = mongoose.model("WithdrawRequest", WithdrawRequestSchema);

module.exports = WithdrawRequest;

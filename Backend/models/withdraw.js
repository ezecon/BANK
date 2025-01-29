const mongoose = require("mongoose");

const WithdrawRequestSchema = new mongoose.Schema(
  {
    receiverName: {
      type: String,
      required: true,
    },
    receiverAccount: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);


const WithdrawRequest = mongoose.model("WithdrawRequest", WithdrawRequestSchema);

module.exports = WithdrawRequest;

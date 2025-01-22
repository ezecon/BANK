const mongoose = require("mongoose");

const DepositeRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Phone number must be 10-15 digits"],
    },
    depositeAmount: {
      type: Number,
      required: true,
    },

    incomeProof: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


const DepositeRequest = mongoose.model("DepositeRequest", DepositeRequestSchema);

module.exports = DepositeRequest;

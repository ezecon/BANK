import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";

export default function WithdrawRequest() {
  const [formData, setFormData] = useState({
    fullName: "",
    picker: "",
    amount: "",
    dateOfWithdrawal: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData); // Log form data
    try {
      const response = await axios.post("http://localhost:8000/api/withdraw", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(response.status === 200) {
        alert("Loan request submitted successfully!");
        setFormData({
          fullName: "",
          picker: "",
          amount: "",
          dateOfWithdrawal: "",
        });
      }
      
    } catch (error) {
      console.error("Error submitting loan request:", error);
    }
  };
  
  
  return (
    <div className=" flex justify-center items-center px-4 mt-20">
      <div className=" shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Loan Request</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            color="blue"
            required
          />
          <Input
            label="Collector Name"
            type="text"
            name="picker"
            value={formData.email}
            onChange={handleChange}
            color="blue"
            required
          />
          <Input
            label="Date of Withrawal"
            type="date"
            name="dateOfWithdrawal"
            value={formData.phone}
            onChange={handleChange}
            color="blue"
            required
          />
          <Input
            label="Amount"
            type="number"
            name="amount"
            value={formData.loanAmount}
            onChange={handleChange}
            color="blue"
            required
          />
          <Button type="submit" color="blue" fullWidth disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </div>
    </div>
  );
}

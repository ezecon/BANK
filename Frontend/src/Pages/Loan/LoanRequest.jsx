import { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import { useToken } from "../../Componats/Hook/useToken";
import { useNavigate } from "react-router-dom";

export default function LoanRequest() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    loanAmount: "",
    loanPurpose: "",
    incomeProof: "",
    notes: "",
  });

  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.post("http://localhost:8000/api/verifyToken", { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
        } else {
          console.error("Token verification failed:", response.data);
          removeToken();
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        removeToken();
        navigate("/login");
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Include userID in the payload
      const payload = {
        ...formData,
        userID,
      };

      const response = await axios.post("http://localhost:8000/api/loan", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Loan request submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          loanAmount: "",
          loanPurpose: "",
          incomeProof: "",
          notes: "",
        });
      }
    } catch (error) {
      console.error("Error submitting loan request:", error);
      alert("Failed to submit loan request.");
    } finally {
      setLoading(false);
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
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            color="blue"
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            color="blue"
            required
          />
          <Input
            label="Loan Amount"
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            color="blue"
            required
          />
          <Input
            label="Loan Purpose"
            type="text"
            name="loanPurpose"
            value={formData.loanPurpose}
            onChange={handleChange}
            color="blue"
            required
          />
         <Input
          label="Income Proof"
          type="text"
          name="incomeProof"
          value={formData.incomeProof}
          onChange={handleChange}
          color="blue"
          required
        />

          <Input
            label="Additional Notes"
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            color="blue"
          />
          <Button type="submit" color="blue" fullWidth disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </div>
    </div>
  );
}

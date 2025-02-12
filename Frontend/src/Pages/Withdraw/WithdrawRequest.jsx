import { useEffect, useState } from "react";
import { Button, Input, Alert } from "@material-tailwind/react";
import axios from "axios";
import { useToken } from "../../Componats/Hook/useToken";
import { useNavigate } from "react-router-dom";

export default function WithdrawRequest() {
  const [formData, setFormData] = useState({
    receiverName: "",
    receiverAccount: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

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
    setError("");
    setSuccess(false);

    try {
      const payload = {
        ...formData,
        sender:userID,
      };
      const response = await axios.post(
        "http://localhost:8000/api/money-transfer",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setFormData({
          receiverName: "",
          receiverAccount: "",
          amount: "",
        });
      }
    } catch (error) {
      console.error("Error submitting transfer request:", error);
      setError("Failed to submit the money transfer request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 mt-20">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Money Transfer Request
        </h1>
        {success && (
          <Alert color="green" className="mb-4">
            Money Transfer request submitted successfully!
          </Alert>
        )}
        {error && (
          <Alert color="red" className="mb-4">
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Receiver Name"
            type="text"
            name="receiverName"
            value={formData.receiverName}
            onChange={handleChange}
            color="blue"
            required
          />
          <Input
            label="Receiver Account Number"
            type="text"
            name="receiverAccount"
            value={formData.receiverAccount}
            onChange={handleChange}
            color="blue"
            required
          />
          <Input
            label="Amount"
            type="number"
            name="amount"
            value={formData.amount}
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

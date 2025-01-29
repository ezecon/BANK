import { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../../Componats/Hook/useToken";

export default function OldDeposite() {
  const [formData, setFormData] = useState({
    accountNumber: "",
    balance: "",
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

    if (!formData.accountNumber || formData.balance <= 0) {
      alert("Please enter a valid account number and balance greater than 0.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        userID,
        check: "dec",
      };

      const response = await axios.put(
        `http://localhost:8000/api/users/balance/${formData.accountNumber}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Withdrawal request submitted successfully!");
        setFormData({
          accountNumber: "",
          balance: "",
        });
      }
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
      const message =
        error.response?.data?.message || "Failed to submit withdrawal request. Please try again.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 mt-20">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Withdraw</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Account Number"
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            color="blue"
            required
          />
          <Input
            label="Amount"
            type="number"
            name="balance"
            value={formData.balance}
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

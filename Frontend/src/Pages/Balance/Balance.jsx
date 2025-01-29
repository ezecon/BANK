import { useEffect, useState } from "react";
import { useToken } from "../../Componats/Hook/useToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Balance() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
          console.log("Token verification failed:", response.data);
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userID}`);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchUserData();
    }
  }, [userID]);

  return (
    <div className="mt-20 w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">BALANCE</h1>
      <div className="mt-4">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : data ? (
          <h2 className="text-xl font-medium">Balance: {data.balance}</h2>
        ) : (
          <p className="text-red-500">Failed to load balance. Please try again.</p>
        )}
      </div>
    </div>
  );
}

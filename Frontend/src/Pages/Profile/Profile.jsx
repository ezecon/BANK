import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../../Componats/Hook/useToken";

export default function Profile() {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Personal Information</h1>
        {data ? (
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Profile Image */}
            <div className="w-40 h-40 overflow-hidden rounded-full border-4 border-gray-300 shadow-md">
              <img
                src={data.image || "https://via.placeholder.com/150"}
                alt={data.name}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Profile Details */}
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-gray-800">
                {data.name || "N/A"}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Account Number: <span className="font-medium">{data._id}</span>
              </p>
              <p className="mb-2">
                <span className="font-medium text-gray-700">Email:</span> {data.email || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-medium text-gray-700">Phone:</span> {data.number || "N/A"}
              </p>
              {/* Optional Action Buttons */}
              <div className="mt-4">
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => navigate("/edit-profile")}
                >
                  Edit Profile
                </button>
                <button
                  className="px-4 py-2 ml-2 text-sm font-medium text-white bg-red-500 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={() => {
                    removeToken();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">No user data available.</p>
        )}
      </div>
    </div>
  );
}

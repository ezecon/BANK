import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../../Componats/Hook/useToken";
import { Button } from "@material-tailwind/react";

export default function OldDeposite() {
  const [depositHistory, setDepositHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, removeToken } = useToken();

  useEffect(() => {
    const fetchDepositHistory = async () => {
      try {
        if (!token) {
          console.error("Token is missing");
          return;
        }

        // Decode userID from token or use AuthContext
        const response = await axios.post("http://localhost:8000/api/verifyToken", { token });
        if (response.status === 200 && response.data.valid) {
          const userID = response.data.decoded.id;

          const depositResponse = await axios.get(`http://localhost:8000/api/deposit`, {
            params: { userID }, // Automatically formats the query string
        });
        console.log(depositResponse.data);
          setDepositHistory(depositResponse.data);
        } else {
          console.error("Invalid token");
          removeToken();
        }
      } catch (error) {
        console.error("Error fetching deposit history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositHistory();
  }, [token, removeToken]);

  if (loading) {
    return <div className="text-center mt-20">Loading deposit history...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Deposit History</h1>
      {depositHistory.length === 0 ? (
        <p className="text-center text-gray-500">No deposit history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Full Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Phone</th>
                <th className="px-4 py-2 border-b">Deposit Amount</th>
                <th className="px-4 py-2 border-b">Notes</th>
                <th className="px-4 py-2 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {depositHistory.map((deposit, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{deposit.fullName}</td>
                  <td className="px-4 py-2 border-b">{deposit.email}</td>
                  <td className="px-4 py-2 border-b">{deposit.phone}</td>
                  <td className="px-4 py-2 border-b">${deposit.depositeAmount}</td>
                  <td className="px-4 py-2 border-b">{deposit.notes || "N/A"}</td>
                  <td className="px-4 py-2 border-b">{new Date(deposit.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

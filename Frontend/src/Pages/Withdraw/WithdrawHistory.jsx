import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../../Componats/Hook/useToken";

export default function WithdrawHistory() {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, removeToken } = useToken();

  useEffect(() => {
    const fetchLoanHistory = async () => {
      try {
        if (!token) {
          console.error("Token is missing");
          return;
        }

        // Decode userID from the token or fetch it from your AuthContext
        const response = await axios.post("http://localhost:8000/api/verifyToken", { token });
        if (response.status === 200 && response.data.valid) {
          const userID = response.data.decoded.id;

          // Fetch loan history for the user
          const loanHistoryResponse = await axios.get(`http://localhost:8000/api/money-transfer?userID=${userID}`);
          setLoanRequests(loanHistoryResponse.data);
        } else {
          console.error("Invalid token");
          removeToken();
        }
      } catch (error) {
        console.error("Error fetching loan history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanHistory();
  }, [token, removeToken]);

  if (loading) {
    return <div className="text-center mt-20">Loading loan history...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Loan History</h1>
      {loanRequests.length === 0 ? (
        <p className="text-center text-gray-500">No loan history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Receiver Name</th>
                <th className="px-4 py-2 border-b">Receiver Account</th>
                <th className="px-4 py-2 border-b">Loan Amount</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((loan, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{loan.receiverName}</td>
                  <td className="px-4 py-2 border-b">{loan.receiverAccount}</td>
                  <td className="px-4 py-2 border-b">{loan.amount}</td>
                  <td className="px-4 py-2 border-b">{loan.status}</td>
                  <td className="px-4 py-2 border-b">{new Date(loan.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

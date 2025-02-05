import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../../../Componats/Hook/useToken";

export default function LoanRequest() {
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

        // Verify token
        const response = await axios.post("http://localhost:8000/api/verifyToken", { token });
        if (response.status === 200 && response.data.valid) {
          const userID = response.data.decoded.id;

          // Fetch loan history for the user
          const loanHistoryResponse = await axios.get(`http://localhost:8000/api/money-transfer/all`);
          const loanHistory = loanHistoryResponse.data.filter((loan) => loan.status === "Pending");
          setLoanRequests(loanHistory);
        } else {
          console.error("Invalid token");
          removeToken();
        }
      } catch (error) {
        console.error("Error fetching money transfer history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanHistory();
  }, [token, removeToken]); 



  //////////////////////////////
  const handleBalance = async (userID, balance, check) => {


    try {
      const payload = {
        userID,
        balance: balance,
        check: check,
      };

      const response = await axios.put(
        `http://localhost:8000/api/users/balance/${userID}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Add Balance request submitted successfully!");
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

  /////////////////////////////////////
  const handleApprove = async (loanID, receiverAccount, sender,balance, Status) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/money-transfer/approve/${loanID}`, { status: Status });
      if (response.status === 200) {
        alert("Money Transfer request approved successfully!");
        handleBalance(receiverAccount, balance, "add");
        handleBalance(sender, balance, "dec");
        // Remove the approved loan from the list
        setLoanRequests((prevRequests) => prevRequests.filter((loan) => loan._id !== loanID));
      }
    } catch (error) {
      console.error("Error approving Money Transfer request:", error);
      alert("Failed to approve the Money Transfer request. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading Money Transfer history...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Money Transfer Requests</h1>
      {loanRequests.length === 0 ? (
        <p className="text-center text-gray-500">No Money Transfer history found.</p>
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
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((loan) => (
                <tr key={loan._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{loan.receiverName}</td>
                  <td className="px-4 py-2 border-b">{loan.receiverAccount}</td>
                  <td className="px-4 py-2 border-b">{loan.amount}</td>
                  <td className="px-4 py-2 border-b">{loan.status}</td>
                  <td className="px-4 py-2 border-b">{new Date(loan.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleApprove(loan._id, loan.receiverAccount, loan.sender, loan.amount, "Approved")}
                      className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApprove(loan._id, "Rejected")}
                      className="mt-1 px-6 py-2 text-white bg-[red] hover:bg-[#ff6363] rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

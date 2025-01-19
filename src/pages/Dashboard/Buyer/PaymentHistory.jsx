import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/payment-history/${user?.email}`
        );
        setPaymentHistory(response.data);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchPaymentHistory();
    }
  }, [user?.email]);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Payment History
      </h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : paymentHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount (USD)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {payment.paymentId || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${(payment.amount / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(payment.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No payment history found.</p>
      )}
    </div>
  );
};

export default PaymentHistory;

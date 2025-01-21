import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { format } from "date-fns";

const WithdrawalInfo = () => {
  const { user, coin } = useAuth();
  const [coinToWithdraw, setCoinToWithdraw] = useState("");
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleCoinChange = (e) => {
    const coinValue = e.target.value;
    if (coinValue <= coin) {
      setCoinToWithdraw(coinValue);
    } else {
      toast.error("Withdrawal coins cannot exceed your total coins.");
    }
  };

  const withdrawAmount = (coinToWithdraw / 20).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (coinToWithdraw < 200) {
      toast.error("You need at least 200 coins to withdraw.");
      return;
    }

    const withdrawalData = {
      worker_email: user.email,
      worker_name: user.displayName,
      withdrawal_coin: coinToWithdraw,
      withdrawal_amount: withdrawAmount,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: format(new Date(), "dd-MM-yy"),
      status: "pending",
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/addWithdrawals`,
        withdrawalData
      );

      if (response.status === 201) {
        toast.success("Withdrawal request submitted successfully!");
        setCoinToWithdraw("");
        setPaymentSystem("");
        setAccountNumber("");
      } else {
        toast.error("Failed to submit withdrawal request.");
      }
    } catch (error) {
      console.error("Error submitting withdrawal:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-4xl font-bold mb-6 text-center">Withdraw Coins</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="mb-4">
          <strong>Your Current Coins:</strong> {coin}
        </p>
        <p className="mb-4">
          <strong>Withdrawable Amount:</strong> ${(coin / 20).toFixed(2)}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Coin to Withdraw */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600 font-bold mb-2">
                Coin to Withdraw
              </label>
              <input
                type="number"
                value={coinToWithdraw}
                onChange={handleCoinChange}
                placeholder="Enter coins to withdraw"
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                min="200"
                max={coin}
                required
              />
            </div>

            {/* Withdraw Amount */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600 font-bold mb-2">
                Withdraw Amount ($)
              </label>
              <input
                type="text"
                value={withdrawAmount}
                readOnly
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-gray-100"
              />
            </div>

            {/* Payment System */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600 font-bold mb-2">
                Select Payment System
              </label>
              <select
                value={paymentSystem}
                onChange={(e) => setPaymentSystem(e.target.value)}
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                required
              >
                <option value="">Select Payment System</option>
                <option value="Bkash">Bkash</option>
                <option value="Rocket">Rocket</option>
                <option value="Nagad">Nagad</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Account Number */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600 font-bold mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter your account number"
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          {coin >= 200 ? (
            <button
              type="submit"
              className="w-full mt-5 p-3 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 hover:bg-lime-600"
            >
              Withdraw
            </button>
          ) : (
            <div className="text-red-500 font-bold text-center mt-5">
              Insufficient coins to withdraw
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default WithdrawalInfo;

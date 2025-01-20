import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { CiCoins1 } from "react-icons/ci";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-toastify";

const WithdrawalInfo = () => {
  const { user } = useAuth();
  const [workerStats, setWorkerStats] = useState({
    totalCoins: 0,
    totalEarnings: 0,
  });
  const [withdrawalForm, setWithdrawalForm] = useState({
    withdrawalCoin: 0,
    withdrawalAmount: 0,
    paymentSystem: "",
    accountNumber: "",
  });
  const [uploadImage, setUploadImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [insufficientCoin, setInsufficientCoin] = useState(false);
  const [completionDate, setCompletionDate] = useState(null);

  const workerEmail = user?.email;

  useEffect(() => {
    if (!workerEmail) return;

    const fetchWorkerStats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/worker/stats`,
          {
            params: { workerEmail },
          }
        );
        setWorkerStats(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWorkerStats();
  }, [workerEmail]);

  const handleCoinChange = (e) => {
    const coinValue = parseInt(e.target.value, 10);
    setWithdrawalForm((prevState) => {
      const withdrawalAmount = (coinValue / 20).toFixed(2); // 20 coins = 1 dollar
      return {
        ...prevState,
        withdrawalCoin: coinValue,
        withdrawalAmount,
      };
    });

    if (coinValue > workerStats.totalCoins) {
      setInsufficientCoin(true);
    } else {
      setInsufficientCoin(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (insufficientCoin) {
      toast.error("Insufficient coins. Please enter a valid amount.");
      return;
    }

    const withdrawalData = {
      worker_email: workerEmail,
      worker_name: user?.name,
      withdrawal_coin: withdrawalForm.withdrawalCoin,
      withdrawal_amount: withdrawalForm.withdrawalAmount,
      payment_system: withdrawalForm.paymentSystem,
      account_number: withdrawalForm.accountNumber,
      withdraw_date: new Date(),
      status: "pending",
    };

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/worker/withdrawal`,
        withdrawalData
      );
      toast.success("Withdrawal request submitted successfully.");
      setLoading(false);
      setWithdrawalForm({
        withdrawalCoin: 0,
        withdrawalAmount: 0,
        paymentSystem: "",
        accountNumber: "",
      });
    } catch (err) {
      setLoading(false);
      toast.error("Error submitting withdrawal request.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Withdrawal Information
      </h1>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Total Earnings */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CiCoins1 className="text-4xl text-orange-400 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Total Earnings
          </h3>
          <p className="text-2xl font-bold text-gray-900 flex items-center">
            <CiCoins1 className="text-4xl text-orange-400" />
            {workerStats.totalEarnings}
          </p>
        </div>
      </div>

      {/* Withdrawal Form */}
      <form onSubmit={handleSubmit} className="space-y-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Coin to Withdraw */}
          <div className="space-y-1 ">
            <label htmlFor="withdrawalCoin" className="block text-gray-600">
              Coin To Withdraw
            </label>
            <input
              type="number"
              id="withdrawalCoin"
              value={withdrawalForm.withdrawalCoin}
              onChange={handleCoinChange}
              className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
              min="1"
              max={workerStats.totalCoins}
              required
            />
          </div>

          {/* Withdraw Amount */}
          <div className="space-y-1 ">
            <label htmlFor="withdrawalAmount" className="block text-gray-600">
              Withdraw Amount ($)
            </label>
            <input
              type="number"
              id="withdrawalAmount"
              value={withdrawalForm.withdrawalAmount}
              readOnly
              className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
            />
          </div>
        </div>

        {/* Payment System */}
        <div className="space-y-1 ">
          <label htmlFor="paymentSystem" className="block text-gray-600">
            Select Payment System
          </label>
          <select
            id="paymentSystem"
            value={withdrawalForm.paymentSystem}
            onChange={(e) =>
              setWithdrawalForm({
                ...withdrawalForm,
                paymentSystem: e.target.value,
              })
            }
            className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
            required
          >
            <option value="">Select</option>
            <option value="Bkash">Bkash</option>
            <option value="Rocket">Rocket</option>
            <option value="Nagad">Nagad</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Account Number */}
        <div className="space-y-1 ">
          <label htmlFor="accountNumber" className="block text-gray-600">
            Account Number
          </label>
          <input
            type="text"
            id="accountNumber"
            value={withdrawalForm.accountNumber}
            onChange={(e) =>
              setWithdrawalForm({
                ...withdrawalForm,
                accountNumber: e.target.value,
              })
            }
            className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
            required
          />
        </div>

        {/* Withdraw Button */}
        {insufficientCoin ? (
          <div className="text-center text-red-500">
            Insufficient coins. Please enter a valid amount.
          </div>
        ) : (
          <button
            type="submit"
            className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500"
            disabled={loading}
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              `Withdraw (Total: ${withdrawalForm.withdrawalAmount} $)`
            )}
          </button>
        )}
      </form>
    </div>
  );
};

export default WithdrawalInfo;

import { useState } from "react";
import axios from "axios";

function WithdrawalForm({ email }) {
  const [coinsToWithdraw, setCoinsToWithdraw] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("Bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCoinChange = (e) => {
    const coins = parseInt(e.target.value) || 0;
    setCoinsToWithdraw(coins);
    setWithdrawalAmount(coins / 20); // 20 coins = 1 dollar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`/user/withdrawal/${email}`, {
        withdrawalCoin: coinsToWithdraw,
        paymentSystem,
        accountNumber,
      });

      if (response.data.success) {
        setSuccessMessage("Withdrawal request submitted successfully.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred while processing your request.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="coins">Coins to Withdraw: </label>
        <input
          type="number"
          id="coins"
          value={coinsToWithdraw}
          onChange={handleCoinChange}
          min="1"
          required
        />
      </div>

      <div>
        <label htmlFor="amount">Withdrawal Amount ($): </label>
        <input
          type="number"
          id="amount"
          value={withdrawalAmount}
          disabled
          readOnly
        />
      </div>

      <div>
        <label htmlFor="paymentSystem">Payment System: </label>
        <select
          id="paymentSystem"
          value={paymentSystem}
          onChange={(e) => setPaymentSystem(e.target.value)}
          required
        >
          <option value="Bkash">Bkash</option>
          <option value="Rocket">Rocket</option>
          <option value="Nagad">Nagad</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="accountNumber">Account Number: </label>
        <input
          type="text"
          id="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
      </div>

      <div>
        {coinsToWithdraw < 200 ? (
          <p style={{ color: "red" }}>
            Insufficient coins for withdrawal (min 200 coins required).
          </p>
        ) : (
          <button type="submit">Withdraw</button>
        )}
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
  );
}

export default WithdrawalForm;

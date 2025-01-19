import React from "react";
import { useNavigate } from "react-router-dom"; // to navigate after card click

const PurchaseCoin = () => {
  const navigate = useNavigate();

  // Define the coin packages with prices
  const coinPackages = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
  ];

  const handlePaymentRedirect = (amount, coins) => {
    // Redirect to payment page with the specific amount and coins to be paid
    navigate(`/dashboard/payment-card/${amount * 100}`);
  };
  //   , { state: { amount, coins } }
  return (
    <div className="grid grid-cols-1 mt-20 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {coinPackages.map((pkg, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition-all duration-300"
          aria-label={`${pkg.coins} coins for $${pkg.price}`}
          onClick={() => handlePaymentRedirect(pkg.price, pkg.coins)}
        >
          <h3 className="text-2xl font-semibold">{pkg.coins} Coins</h3>
          <p className="text-xl text-gray-600">{`= $${pkg.price}`}</p>
        </div>
      ))}
    </div>
  );
};

export default PurchaseCoin;

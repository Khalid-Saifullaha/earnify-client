import React from "react";
import { useNavigate } from "react-router-dom";

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
    navigate(`/dashboard/payment-card/${amount * 100}`);
  };

  return (
    <div className="grid grid-cols-1 mt-20 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {coinPackages.map((pkg, index) => (
        <div
          key={index}
          className="p-6 bg-blue-500 text-white rounded-xl shadow-lg cursor-pointer hover:scale-105 transform transition-transform duration-300 hover:shadow-2xl"
          aria-label={`${pkg.coins} coins for $${pkg.price}`}
          onClick={() => handlePaymentRedirect(pkg.price, pkg.coins)}
        >
          <h3 className="text-3xl font-extrabold mb-2">{pkg.coins} Coins</h3>
          <p className="text-xl font-medium">{`= $${pkg.price}`}</p>
          <div className="mt-4">
            <button className="w-full py-2 px-4 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseCoin;

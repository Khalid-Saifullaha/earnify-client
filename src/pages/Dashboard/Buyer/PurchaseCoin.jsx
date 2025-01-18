import React from "react";

const PurchaseCoin = () => {
  const coinOptions = [
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
  ];

  const handleDummyPayment = (coins, price) => {
    alert(
      `Dummy payment successful! You purchased ${coins} coins for $${price}.`
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-2xl font-bold text-center my-6">Purchase Coins</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coinOptions.map((option) => (
          <div
            key={option.coins}
            className="bg-white shadow-lg rounded-lg p-6 text-center"
          >
            <h2 className="text-lg font-semibold">{option.coins} Coins</h2>
            <p className="text-gray-600 my-2">= ${option.price}</p>
            <button
              onClick={() => handleDummyPayment(option.coins, option.price)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;

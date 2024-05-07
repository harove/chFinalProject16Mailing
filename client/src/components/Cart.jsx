import React from 'react';

function Cart({ cart, removeFromCart }) {
  if (!cart.length) {
    return <div className="text-center py-4">Your cart is empty.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl font-bold tracking-tight text-gray-900 px-4 py-2 border-b border-gray-200">
        Your Cart
      </h2>
      <div className="divide-y divide-gray-200">
        {cart.map((item) => (
          <div key={item.id} className="px-4 py-4 flex items-center">
            <img
              className="w-16 h-16 rounded-full mr-4 object-cover"
              src={item?.signedUrl} // Assuming you have an image property in product data
              alt={item.name}
            />
            <div className="flex-grow">
              <h5 className="text-sm font-bold tracking-tight text-gray-900">{item.name}</h5>
              <p className="text-xs text-gray-500">{item.description && item.description.slice(0, 50) + "..."}</p>
              <span className="text-gray-600 text-xs">{/* Price can go here */}</span>
            </div>
            <button
              className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 px-2 py-1 rounded-md"
              onClick={() => removeFromCart(item)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {/* Add a section for cart total (optional) */}
    </div>
  );
}

export default Cart;

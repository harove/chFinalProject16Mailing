import React from 'react';

function ProductCard({key, product, onAddToCart }) {
    return (
      <div key={key} className="rounded-lg shadow-md overflow-hidden bg-white transform transition duration-300 hover:scale-105">
        <img className="w-full h-48 object-cover" src={product?.thumbnails[0]} alt={product.name} />
        <div className="p-4">
          <h5 className="text-xl font-bold tracking-tight text-gray-900">{product.name}</h5>
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-base font-medium text-gray-900">${product.price}</span>
            <button
              className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => onAddToCart(product)} // Call addToCart prop with product data
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProductCard;
  

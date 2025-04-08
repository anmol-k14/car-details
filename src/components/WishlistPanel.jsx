// components/WishlistPanel.jsx
import React from 'react';
import { Heart, Trash2 } from 'lucide-react';

const WishlistPanel = ({ wishlist, removeFromWishlist }) => {
  if (wishlist.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <Heart className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600" />
        <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Your wishlist is empty</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Save your favorite cars to compare them later</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Your Wishlist
        </h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {wishlist.length} {wishlist.length === 1 ? 'car' : 'cars'}
        </span>
      </div>
      
      <div className="space-y-4">
        {wishlist.map((car) => (
          <div 
            key={car.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex transition-colors duration-300"
          >
            <div className="w-1/3 relative">
              <img 
                src={car.image || "/api/placeholder/150/150"} 
                alt={car.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{car.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{car.brand}</p>
                </div>
                
                <button
                  onClick={() => removeFromWishlist(car.id)}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mt-2 flex justify-between items-end">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  ${car.price.toLocaleString()}
                </span>
                
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <span>{car.fuelType} • {car.seats} seats</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPanel;

// contexts/ThemeContext.js

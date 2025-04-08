import React from 'react';
import { X, Heart, Users, Fuel } from 'lucide-react';

const CarDetails = ({ car, onClose, isInWishlist, toggleWishlist }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn ">
        <div className="relative">
          <img 
            src={car.image || "/api/placeholder/800/400"} 
            alt={car.name} 
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{car.name}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">{car.brand}</p>
            </div>
            
            <button
              onClick={toggleWishlist}
              className="flex items-center space-x-2 py-2 px-4 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Heart 
                className={`h-5 w-5 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-500 dark:text-gray-400'}`} 
              />
              <span className="text-gray-700 dark:text-gray-300">
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </span>
            </button>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ${car.price.toLocaleString()}
              </span>
              
              <div className="flex space-x-4">
                <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-300">
                  <Users className="h-5 w-5" />
                  <span>{car.seats} seats</span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-300">
                  <Fuel className="h-5 w-5" />
                  <span>{car.fuelType}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {car.description || `The ${car.brand} ${car.name} is a ${car.seats}-seater vehicle with ${car.fuelType} engine. It offers excellent performance and comfort for its class.`}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Brand</span>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{car.brand}</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Model</span>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{car.name}</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Fuel Type</span>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{car.fuelType}</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Seating Capacity</span>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{car.seats} Seats</p>
                  </div>
                  
                  {car.transmission && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Transmission</span>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{car.transmission}</p>
                    </div>
                  )}
                  
                  {car.year && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Year</span>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{car.year}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="py-2 px-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
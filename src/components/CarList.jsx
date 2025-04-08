import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import CarDetails from './CarDetails';

const CarList = ({ 
  cars, 
  loading, 
  error, 
  toggleWishlist, 
  isInWishlist, 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const [selectedCar, setSelectedCar] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 p-4 rounded-md text-red-700 dark:text-red-200">
        <p>Error: {error}</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-md text-center">
        <p className="text-gray-600 dark:text-gray-300 text-lg">No cars found matching your criteria.</p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Available Cars
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div 
            key={car.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="relative">
              <img 
                src={car.image || "/api/placeholder/400/250"} 
                alt={car.name} 
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => toggleWishlist(car)}
                className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label={isInWishlist(car.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  className={`h-5 w-5 ${isInWishlist(car.id) ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} 
                />
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{car.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{car.brand}</p>
              
              <div className="mt-3 flex justify-between items-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  ${car.price.toLocaleString()}
                </span>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <span>{car.fuelType}</span>
                  <span>•</span>
                  <span>{car.seats} seats</span>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedCar(car)}
                className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-1">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 disabled:opacity-50"
            >
              &laquo; Prev
            </button>
            
            <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 disabled:opacity-50"
            >
              Next &raquo;
            </button>
          </div>
        </div>
      )}
      
      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetails 
          car={selectedCar} 
          onClose={() => setSelectedCar(null)} 
          isInWishlist={isInWishlist(selectedCar.id)}
          toggleWishlist={() => toggleWishlist(selectedCar)}
        />
      )}
    </div>
  );
};

export default CarList;
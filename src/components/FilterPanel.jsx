import React, { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange, onSortChange, sortType }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  
  const brands = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Tesla', 'Hyundai', 'Kia'];
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
  const seatingOptions = [2, 4, 5, 6, 7, 8];
  console.log(filters)
  
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const applyFilters = () => {
    onFilterChange(localFilters);
    setMobileFiltersVisible(false);
  };
  
  const clearFilters = () => {
    const emptyFilters = {
      brand: '',
      minPrice: '',
      maxPrice: '',
      fuelType: '',
      seats: ''
    };
    
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };
  
  return (
    <div className="w-full md:w-64 md:flex-shrink-0">
      <div className="flex md:hidden items-center justify-between mb-4">
        <button
          onClick={() => setMobileFiltersVisible(!mobileFiltersVisible)}
          className="flex items-center space-x-2 py-2 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm"
        >
          <SlidersHorizontal className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-300">Filters</span>
        </button>
        
        <select
          value={sortType}
          onChange={(e) => onSortChange(e.target.value)}
          className="py-2 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-300 ${mobileFiltersVisible ? 'block' : 'hidden md:block'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Filters</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear All
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Brand Filter */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Brand
            </label>
            <select
              id="brand"
              name="brand"
              value={localFilters.brand}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          
          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price Range
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={localFilters.minPrice}
                onChange={handleInputChange}
                className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={localFilters.maxPrice}
                onChange={handleInputChange}
                className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Fuel Type Filter */}
          <div>
            <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={localFilters.fuelType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {fuelTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* Seating Capacity Filter */}
          <div>
            <label htmlFor="seats" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Seating Capacity
            </label>
            <select
              id="seats"
              name="seats"
              value={localFilters.seats}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Capacity</option>
              {seatingOptions.map(seats => (
                <option key={seats} value={seats}>{seats} Seats</option>
              ))}
            </select>
          </div>
          
          {/* Sort Option (Desktop) */}
          <div className="hidden md:block">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort By
            </label>
            <select
              id="sort"
              value={sortType}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          
          {/* Apply Filters Button (Mobile) */}
          <div >
            <button
              onClick={applyFilters}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
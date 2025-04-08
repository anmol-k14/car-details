import React, { useState, useContext } from 'react';
import { Moon, Sun, Heart } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

const Navbar = ({ onSearch, wishlistCount, toggleWishlist, showingWishlist }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
              Car Finder
            </h1>
            
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-4 pr-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          <button
            onClick={toggleWishlist}
            className="relative flex items-center space-x-1 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Wishlist"
          >
            <Heart className={`h-5 w-5 ${showingWishlist ? 'text-red-500 fill-red-500' : 'text-gray-700 dark:text-gray-300'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
            <span className="hidden md:inline text-gray-700 dark:text-gray-300">
              {showingWishlist ? 'Back to Results' : 'Wishlist'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
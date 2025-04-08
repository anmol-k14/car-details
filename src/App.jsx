
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CarList from './components/CarList';
import WishlistPanel from './components/WishlistPanel';
import FilterPanel from './components/FilterPanel';
import { ThemeProvider } from './contexts/ThemeContext';
import { fetchCars } from './api';

function App() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showWishlist, setShowWishlist] = useState(false);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    seats: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('');

  const carsPerPage = 10;

  // Fetch cars from API
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        const data = await fetchCars();
        setCars(data.cars || []);
        setFilteredCars(data.cars || []);
      } catch (err) {
        setError('Failed to load cars. Please try again later.');
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('carFinderWishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Error parsing wishlist from localStorage:", e);
        localStorage.removeItem('carFinderWishlist');
      }
    }
  }, []);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('carFinderWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Filter cars based on selected filters and search query
  useEffect(() => {
    if (!cars.length) return;

    let result = [...cars];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(car => 
        car.name.toLowerCase().includes(query) || 
        car.brand.toLowerCase().includes(query) ||
        car.fuelType.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.brand) {
      result = result.filter(car => car.brand.toLowerCase() === filters.brand.toLowerCase());
    }
    
    if (filters.minPrice) {
      result = result.filter(car => car.price >= Number(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      result = result.filter(car => car.price <= Number(filters.maxPrice));
    }
    
    if (filters.fuelType) {
      result = result.filter(car => car.fuelType.toLowerCase() === filters.fuelType.toLowerCase());
    }
    
    if (filters.seats) {
      result = result.filter(car => car.seats === Number(filters.seats));
    }

    // Apply sorting
    if (sortType === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [cars, filters, searchQuery, sortType]);

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  // Wishlist functions
  const toggleWishlist = (car) => {
    const isInWishlist = wishlist.some(item => item.id === car.id);
    
    if (isInWishlist) {
      setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== car.id));
    } else {
      setWishlist(prevWishlist => [...prevWishlist, car]);
    }
  };

  const isInWishlist = (carId) => {
    return wishlist.some(item => item.id === carId);
  };

  // Function to handle search query changes
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Function to handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ">
        <Navbar 
          onSearch={handleSearch} 
          wishlistCount={wishlist.length} 
          toggleWishlist={() => setShowWishlist(!showWishlist)}
          showingWishlist={showWishlist}
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <FilterPanel 
              filters={filters} 
              onFilterChange={handleFilterChange}
              onSortChange={(type) => setSortType(type)}
              sortType={sortType}
            />
            
            <div className="flex-1">
              {showWishlist ? (
                <WishlistPanel 
                  wishlist={wishlist} 
                  removeFromWishlist={(carId) => {
                    const carToRemove = wishlist.find(car => car.id === carId);
                    if (carToRemove) {
                      toggleWishlist(carToRemove);
                    }
                  }}
                />
              ) : (
                <CarList 
                  cars={currentCars} 
                  loading={loading}
                  error={error}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
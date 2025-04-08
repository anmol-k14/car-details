  // api.js
  import { carsData } from './mockData';
  
  // Simulated API functions
  export const fetchCars = async () => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(carsData);
      }, 800);
    });
  };
  
# Car Details App

A React application for displaying and filtering car details using mock data.

## Overview

This application allows users to browse, search, and filter car information including models, brands, fuel types, and other specifications. The project is built with React 19 and styled with Tailwind CSS 4.

## Features

- Browse car details from mock data
- Filter cars by various criteria (make, model, fuel type)
- Responsive design for all device sizes
- Modern UI with intuitive navigation

## Project Structure

```
car-details/
├── public/
├── src/
│   ├── components/
│   │   ├── CarDetails.jsx
│   │   ├── CarList.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── Navbar.jsx
│   │   └── WishlistPanel.jsx
│   ├── contexts/
│   │   └── ThemeContext.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── mockData.js
├── .eslintrc.js
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/car-details.git
   cd car-details
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint
- `npm run preview` - Previews the production build locally

## Technologies Used

- React 19
- Tailwind CSS 4
- Vite 6
- Lucide React (for icons)

## Mock Data

The application uses mock data for car information, stored in `mockData.js`. You can extend or modify this file to add more car details or change the structure of the data.

## Styling

The project uses Tailwind CSS for styling. Custom styles can be added to `index.css`.

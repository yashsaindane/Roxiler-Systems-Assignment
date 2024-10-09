# Roxiler Systems Assignment - Transaction Dashboard

This project is a Transaction Dashboard built using the MERN stack (MongoDB, Express.js, React, Node.js). The application allows users to view and analyze transaction data with various statistics, a bar chart, and a pie chart.

## Features

- **Transaction Table**: Displays a list of transactions with options to filter by month and search.
- **Statistics**: Shows total sales, total sold items, and total not sold items for the selected month.
- **Charts**: Visual representations of transactions through a bar chart and a pie chart, illustrating the distribution of sales.
- **Responsive Design**: Built using Material UI for a responsive and modern user interface.

## Technologies Used

- **Frontend**: 
  - React
  - Material UI
  - Recharts
- **Backend**: 
  - Node.js
  - Express.js
- **Database**: 
  - MongoDB

## Getting Started

### Installation

1. **Clone the repository**:

   ```bash
   git clone  https://github.com/yashsaindane/Roxiler-Systems-Assignment.git

2. **Navigate to the project directory**:

   ```bash
   cd Roxiler-Systems-Assignment

3. **Install the backend dependencies**:

    ```bash
   cd backend
   npm install

4. **Install the frontend dependencies**:

    ```bash
   cd ../frontend
    npm install

5. **Set up your MongoDB database**:

   In the `Roxiler-Systems-Assignment/backend/server.js` file, update the MongoDB connection string:

   ```js
   mongodb://localhost:27017/

### Running the Application

1. **Start the backend server**:

    ```bash
   cd backend
    node server.js

2. **In another terminal, start the frontend server**:

    ```bash
   cd frontend
    npm start
    
3. **Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the application.**

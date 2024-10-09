import React, { useState, useEffect } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChartComponent from './components/BarChartComponent';
import PieChartComponent from './components/PieChartComponent';
import axios from 'axios';
import { Container, Paper } from '@mui/material';
import './App.css';

function App() {
  const [month, setMonth] = useState('03');
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [monthSelected, setMonthSelected] = useState(false);

  useEffect(() => {
    if (monthSelected) {
      setLoading(true);
      fetchCombinedData(month);
    }
  }, [month, monthSelected]);

  const fetchCombinedData = async (selectedMonth) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/transactions/combined?month=${selectedMonth}`
      );
      setStatistics(response.data.statistics);
      setBarChartData(response.data.barChartData);
      setPieChartData(response.data.pieChartData);
    } catch (error) {
      console.error('Error fetching combined data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
    setMonthSelected(true);
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        backgroundColor: '#edf6f6', 
        minHeight: '100vh', 
        padding: 3 
      }}
    >
      <Paper 
        sx={{ 
          padding: 2, 
          backgroundColor: '#edf6f6' 
        }}
      >
        <TransactionsTable month={month} onMonthChange={handleMonthChange} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Statistics statistics={statistics} month={month} />
            <BarChartComponent data={barChartData} month={month} />
            <PieChartComponent data={pieChartData} month={month} />
          </>
        )}
      </Paper>
    </Container>
  );
}

export default App;

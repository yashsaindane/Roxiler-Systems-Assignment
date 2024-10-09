import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from '@mui/material';
import axios from 'axios';

const TransactionsTable = ({ month, onMonthChange }) => { 
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions(month, searchText, page);
  }, [month, searchText, page]);

  const fetchTransactions = async (selectedMonth, searchText = '', page = 1) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions?month=${selectedMonth}&search=${searchText}&page=${page}`);
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#edf6f6', padding: 3 }}>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '50%',  
          width: '200px',        
          height: '200px',       
          margin: '0 auto',      
          boxShadow: 2           
        }}
      >
        <Typography variant="h4" align="center" sx={{ margin: 2 }}>
          Transaction Dashboard
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <TextField
          label="Search transaction"
          value={searchText}
          onChange={handleSearchChange}
          variant="outlined"
          sx={{ backgroundColor: '#f9e79f', borderRadius: 1 }}
        />
        <FormControl>
          <InputLabel>Select Month</InputLabel>
          <Select
            value={month}
            onChange={(e) => onMonthChange(e.target.value)} 
            sx={{ backgroundColor: '#f9e79f', borderRadius: 1 }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: '#f9e79f', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: '2px solid black', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ border: '2px solid black', fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ border: '2px solid black', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ border: '2px solid black', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ border: '2px solid black', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ border: '2px solid black', fontWeight: 'bold' }}>Sold</TableCell>
              <TableCell sx={{ border: '2px solid black', fontWeight: 'bold' }}>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell sx={{ border: '2px solid black' }}>{transaction.id}</TableCell>
                <TableCell sx={{ border: '2px solid black' }}>{transaction.title}</TableCell>
                <TableCell sx={{ border: '2px solid black' }}>{transaction.description}</TableCell>
                <TableCell sx={{ border: '2px solid black' }}>{transaction.price}</TableCell>
                <TableCell sx={{ border: '2px solid black' }}>{transaction.category}</TableCell>
                <TableCell sx={{ border: '2px solid black' }}>{transaction.sold ? 'Yes' : 'No'}</TableCell>
                <TableCell sx={{ border: '2px solid black' }}>
                  <img src={transaction.image} alt={transaction.title} style={{ width: '50px', height: '50px' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
        <Typography variant="body1">Page No: {page}</Typography>
        <Box>
          <Button
            onClick={handlePreviousPage}
            disabled={page === 1}
            sx={{ marginRight: 1, backgroundColor: '#f9e79f' }}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={page === totalPages}
            sx={{ backgroundColor: '#f9e79f' }}
          >
            Next
          </Button>
        </Box>
        <Typography variant="body1">Per Page: 10</Typography>
      </Box>
    </Box>
  );
};

export default TransactionsTable;
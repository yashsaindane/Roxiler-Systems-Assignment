import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material'; 

function Statistics({ statistics, month }) {
  const getMonthName = (month) => {
    return new Date(0, month - 1).toLocaleString('default', { month: 'long' });
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2, backgroundColor: '#f8df8c' }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
          Transaction Statistics - {getMonthName(month)}
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">Total Sale</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{statistics.totalSaleAmount}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">Total Sold Item</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{statistics.totalSoldItems}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1">Total Not Sold Item</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{statistics.totalNotSoldItems}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Statistics;

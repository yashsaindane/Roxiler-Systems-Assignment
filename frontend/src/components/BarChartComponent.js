import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

function BarChartComponent({ data, month }) {

  const getMonthName = (month) => {
    return new Date(0, month - 1).toLocaleString('default', { month: 'long' });
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Transactions Bar Chart - {getMonthName(month)}
        </Typography>
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </CardContent>
    </Card>
  );
}

export default BarChartComponent;

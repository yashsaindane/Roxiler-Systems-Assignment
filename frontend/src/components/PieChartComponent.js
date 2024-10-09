import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

function PieChartComponent({ data, month }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];

  const getMonthName = (month) => {
    return new Date(0, month - 1).toLocaleString('default', { month: 'long' });
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Transactions Pie Chart - {getMonthName(month)}
        </Typography>
        <PieChart width={600} height={300}>
          <Pie
            data={data}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </CardContent>
    </Card>
  );
}

export default PieChartComponent;

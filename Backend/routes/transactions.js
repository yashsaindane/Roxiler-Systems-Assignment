const express = require('express');
const axios = require('axios');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Initialize database with seed data
router.get('/initialize', async (req, res) => {
  try {
    const response = await axios.get(
      'https://s3.amazonaws.com/roxiler.com/product_transaction.json'
    );
    await Transaction.deleteMany({});
    await Transaction.insertMany(response.data);
    res.status(200).json({ message: 'Database initialized with seed data.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List all transactions with search and pagination
router.get('/', async (req, res) => {
  const { page = 1, perPage = 10, search = '', month } = req.query;

  const query = {};

  if (month) {
    query.dateOfSale = {
      $gte: new Date(`2021-${month}-01`),
      $lte: new Date(`2021-${month}-31`),
    };
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { price: parseFloat(search) || 0 },
    ];
  }

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    const total = await Transaction.countDocuments(query);
    res.status(200).json({
      transactions,
      totalPages: Math.ceil(total / perPage),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Statistics API
router.get('/statistics', async (req, res) => {
  const { month } = req.query;

  const query = {};

  if (month) {
    query.dateOfSale = {
      $gte: new Date(`2021-${month}-01`),
      $lte: new Date(`2021-${month}-31`),
    };
  }

  try {
    const totalSaleAmount = await Transaction.aggregate([
      { $match: query },
      { $match: { sold: true } },
      { $group: { _id: null, total: { $sum: '$price' } } },
    ]);

    const totalSoldItems = await Transaction.countDocuments({
      ...query,
      sold: true,
    });

    const totalNotSoldItems = await Transaction.countDocuments({
      ...query,
      sold: false,
    });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bar Chart API
router.get('/barchart', async (req, res) => {
  const { month } = req.query;

  const query = {};

  if (month) {
    query.dateOfSale = {
      $gte: new Date(`2021-${month}-01`),
      $lte: new Date(`2021-${month}-31`),
    };
  }

  const priceRanges = [
    { label: '0-100', min: 0, max: 100 },
    { label: '101-200', min: 101, max: 200 },
    { label: '201-300', min: 201, max: 300 },
    { label: '301-400', min: 301, max: 400 },
    { label: '401-500', min: 401, max: 500 },
    { label: '501-600', min: 501, max: 600 },
    { label: '601-700', min: 601, max: 700 },
    { label: '701-800', min: 701, max: 800 },
    { label: '801-900', min: 801, max: 900 },
    { label: '901-above', min: 901, max: Infinity },
  ];

  try {
    const data = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await Transaction.countDocuments({
          ...query,
          price: { $gte: range.min, $lte: range.max },
        });
        return { range: range.label, count };
      })
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pie Chart API
router.get('/piechart', async (req, res) => {
  const { month } = req.query;

  const query = {};

  if (month) {
    query.dateOfSale = {
      $gte: new Date(`2021-${month}-01`),
      $lte: new Date(`2021-${month}-31`),
    };
  }

  try {
    const data = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(
      data.map((item) => ({
        category: item._id,
        count: item.count,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Combined API
router.get('/combined', async (req, res) => {
  const { month } = req.query;

  try {
    const [statistics, barChartData, pieChartData] = await Promise.all([
      axios.get(`http://localhost:5000/api/transactions/statistics?month=${month}`),
      axios.get(`http://localhost:5000/api/transactions/barchart?month=${month}`),
      axios.get(`http://localhost:5000/api/transactions/piechart?month=${month}`),
    ]);

    res.status(200).json({
      statistics: statistics.data,
      barChartData: barChartData.data,
      pieChartData: pieChartData.data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

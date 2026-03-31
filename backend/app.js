const express = require('express');
const cors = require('cors');

const app = express();

const restaurantRoutes = require('./src/routes/restaurantRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);

module.exports = app;
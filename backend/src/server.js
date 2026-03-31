require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurantRoutes');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'}));
app.use('/api/restaurants', restaurantRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
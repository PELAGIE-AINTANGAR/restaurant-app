const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantController');

router.get('/', controller.getAllRestaurants);
router.get('/search', controller.searchRestaurants);
router.get('/filter', controller.filterRestaurants);
router.post('/', controller.createRestaurant);

module.exports = router;

const express = require('express');
const services = require('../services/restaurantService');
const { validateRestaurant } = require('../utils/validators');

async function getAllRestaurants(req, res) {
  try {
    const restaurants = await services.getAllRestaurants();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createRestaurant(req, res) {
  try {
    const errors = validateRestaurant(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const restaurant = await services.createRestaurant(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Erreur backend:', error.message);
    res.status(400).json({ message: error.message });  }
}


async function searchRestaurants(req, res) {
  const query = req.query.q || '';
  try {
    const restaurants = await services.searchRestaurants(query);
    res.json(restaurants);
  } catch (error) {
    console.error('Error in searchRestaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function filterRestaurants(req, res) {
  const cuisine = req.query.cuisine || '';
  try {
    const restaurants = await services.filterRestaurants({ cuisine });
    res.json(restaurants);
  } catch (error) {
    console.error('Error in filterRestaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



module.exports = {
  getAllRestaurants,
  createRestaurant,
  searchRestaurants,
  filterRestaurants
};


const db = require('../db/db');


async function getAllRestaurants() {
  const result = await db.query('SELECT * FROM restaurants');
  return result.rows;
}

async function createRestaurant(data) {
  const {name, address, latitude, longitude, cuisine_type, phone_number } = data;
  
  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    throw new Error('Invalid latitude');
  }
  if (isNaN(longitude) || longitude < -180 || longitude > 180) {
    throw new Error('Invalid longitude');
  }
  const result = await db.query(
    'INSERT INTO restaurants (name, address, latitude, longitude, cuisine_type, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, address, latitude, longitude, cuisine_type, phone_number]
  );
  return result.rows[0];
}


async function searchRestaurants(query) {
  if (!query) {
    const result = await db.query('SELECT * FROM restaurants');
    return result.rows;
  }
  const result = await db.query(
    'SELECT * FROM restaurants WHERE name ILIKE $1 OR address ILIKE $1 OR cuisine_type ILIKE $1',
    [`%${query}%`]
  );
  return result.rows;
}

async function filterRestaurants(filters) {
  let query = 'SELECT * FROM restaurants';
  const values = [];

  if (filters.cuisine) {
    query += ' WHERE cuisine_type = $1';
    values.push(filters.cuisine);
  }

  const result = await db.query(query, values);
  return result.rows;
}

module.exports = {
  getAllRestaurants,
  createRestaurant,
  searchRestaurants,
  filterRestaurants,
};  
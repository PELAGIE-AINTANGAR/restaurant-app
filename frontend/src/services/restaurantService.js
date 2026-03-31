const API_URL = 'http://localhost:3000/api/restaurants';


export async function getAllRestaurants() {
  const response = await fetch(`${API_URL}`);
  return response.json();
}


export async function createRestaurant(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function updateRestaurant(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function deleteRestaurant(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return response.json();
}

export async function searchRestaurants(query) {
  console.log('Searching restaurants with query:', query);
  const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
  return response.json();
}

export async function filterRestaurants(cuisine) {
  const response = await fetch(`${API_URL}/filter?cuisine=${encodeURIComponent(cuisine)}`);
  return response.json();
}

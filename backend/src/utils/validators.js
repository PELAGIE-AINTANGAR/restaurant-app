function validateRestaurant(data) {
  const errors = [];

  const {
    name,
    address,
    latitude,
    longitude,
    cuisine_type,
    phone_number
  } = data;

  if (!name || name.length < 3) {
    errors.push('Name must be at least 3 characters long');
  }

  if (!address || address.length < 10) {
    errors.push('Address must be at least 10 characters long');
  }

  const lat = parseFloat(latitude);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    errors.push('Latitude must be between -90 and 90');
  }

  const lon = parseFloat(longitude);
  if (isNaN(lon) || lon < -180 || lon > 180) {
    errors.push('Longitude must be between -180 and 180');
  }

  if (lat >= 48.82 && lat <= 48.90 && lon >= 2.22 && lon <= 2.47) {
    errors.push('Coordinates must be within Paris');
  }
  const cuisines = [
    'Française',
    'Italienne',
    'Asiatique',
    'Américaine',
    'Méditerranéenne',
    'Autre'
  ];

  if (!cuisine_type || !cuisines.includes(cuisine_type)) {
    errors.push('Invalid cuisine type');
  }

  if (phone_number && !/^\+?\d{8,15}$/.test(phone_number)) {
    errors.push('Invalid phone number');
  }

  return errors;
}

module.exports = {
  validateRestaurant
};
export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places')
  const resData = await response.json()
  if (!response.ok) {
    throw new Error('Failed to load places')
  }
  return resData.places
}

export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places')
  const resData = await response.json()
  if (!response.ok) {
    throw new Error('Failed to load user places')
  }
  return resData.places
}

export async function updatePlaces(places){

  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({places: places}),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const resData = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return resData.message;
}
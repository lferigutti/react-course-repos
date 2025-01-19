import Places from './Places.jsx';
import {useEffect, useState} from "react";
import ErrorPage from "./ErrorPage.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState({message:null})

  useEffect(() => {
    // This is more rudimentary way
    // fetch('http://localhost:3000/places').then((response)=>response.json()).then(
    //   (resData)=>{
    //     const places = resData.places
    //     setAvailablePlaces(places)
    // })

    // Better way is:
    async function fetchData(){
      setIsFetching(true)
      try {
        const places = await fetchAvailablePlaces()
        navigator.geolocation.getCurrentPosition((position)=>{
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
          setAvailablePlaces(sortedPlaces)
          setIsFetching(false)
        })

      } catch (error) {
          setError({message: error.message || 'Failed to load places, try again later'})
          setIsFetching(false)
      }

    }
    fetchData();
  }, []);


  if (error.message !== null) {
    return <ErrorPage title="An error has occurred" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Places are loading..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

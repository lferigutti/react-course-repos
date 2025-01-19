import {useCallback, useEffect, useRef, useState} from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from "./loc.js";


// this does not need useEffect because it is sync and fast
const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []
const initialPlacesPicked = storeIds.map((id)=>
  AVAILABLE_PLACES.find((place)=> place.id === id)
)
function App() {

  const modal = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([])
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(initialPlacesPicked);
  const [isModalOpen, setIsModalOpen] = useState(false)


  // this needs useEffect because it is async and could take forever
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    })
  }, []);



  function handleStartRemovePlace(id) {
    setIsModalOpen(true)
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
  setIsModalOpen(false)
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []
    if (storeIds.indexOf(id) === -1){
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storeIds]))
    }

  }

  // This is to avoid recreation on the funcion when rerender, and avoid infinite loops in a useEffect dependency
  const handleRemovePlace = useCallback(
    function handleRemovePlace() {
      setPickedPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
      );

      setIsModalOpen(false)

      const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []
      localStorage.setItem('selectedPlaces', JSON.stringify(storeIds.filter((id)=>id !== selectedPlace.current)))

  }, []);


  return (
    <>
      <Modal open={isModalOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
          fallbackText="We are working on that.."
        />
      </main>
    </>
  );
}

export default App;

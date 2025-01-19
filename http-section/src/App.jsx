import {useRef, useState, useCallback, useEffect} from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {fetchUserPlaces, updatePlaces} from "./http.js";
import ErrorPage from "./components/ErrorPage.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorUserUpdate, setErrorUserUpdate] = useState({isError: false, message: null})

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    async function fetchingData(){
      try {
        const userPlacesData = await fetchUserPlaces();
        setUserPlaces(userPlacesData)

      } catch (error){
        setErrorUserUpdate({isError: true, message: error.message})
        setUserPlaces(userPlaces)
      }
    }
    fetchingData();
  }, []);

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try {
      await updatePlaces([selectedPlace, ...userPlaces])
    } catch (error){
      setUserPlaces(userPlaces);
      setErrorUserUpdate({isError:true, message: error.message})
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      await updatePlaces(userPlaces.filter((place) => place.id !== selectedPlace.current.id))
    } catch (error){
      setErrorUserUpdate({isError: true, message: error.message})
      setUserPlaces(userPlaces)
    }


    setModalIsOpen(false);
  }, [userPlaces]);

  function handleClosingError(){
    setErrorUserUpdate({
      isError: false,
      message: null})
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <Modal open={errorUserUpdate.isError} onClose={handleClosingError} >
        {errorUserUpdate.isError && <ErrorPage
          title="An error has ocurred"
          message={errorUserUpdate.message || 'Failed To load data'}
          onConfirm={handleClosingError}
        />}
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
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;

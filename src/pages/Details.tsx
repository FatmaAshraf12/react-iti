import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import usePetId from '../hooks/usePetId';
import { useState, useContext, lazy, Suspense } from 'react';
import AdoptedPetContext from '../contexts/AdoptedPetContext';
const Modal = lazy(() => import('../components/Modal'));
import { Pet } from '../types/common';

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const [, setAdoptedPet] = useContext(AdoptedPetContext);

  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    throw new Error('no id');
  }
  const petQuery = usePetId(+id);
  //console.log(petQuery.data);
  const pet = petQuery?.data as Pet;

  return (
    <div className="details">
      {petQuery.isLoading && <Loader />}
      {petQuery.isError && <span>{(petQuery.error as Error).message}</span>}

      {petQuery.data && (
        <div>
          <h2>ID: {id}</h2>
          <img src={pet.images[0]} alt="" />
          <h2>Name: {pet.name}</h2>
          <h2>Animal : {pet.animal}</h2>
          <p>Description {pet.description}</p>
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <br />

          <button
            onClick={() => {
              navigate('/');
            }}
          >
            Back
          </button>
          {showModal && (
            <Suspense>
              <Modal>
                <div>
                  <h1>Would you like to adopt {pet.name}?</h1>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setAdoptedPet(pet);
                      }}
                    >
                      Yes
                    </button>
                    <button onClick={() => setShowModal(false)}>No</button>
                  </div>
                </div>
              </Modal>
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
};

export default Details;

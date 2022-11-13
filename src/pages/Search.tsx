import { useState, useContext } from 'react';
import useBreed from '../hooks/useBreed';
import usePet from '../hooks/usePet';
import AdoptedPetContext from '../contexts/AdoptedPetContext';
import ErrorBoundary from '../components/ErrorBoundary';
import Loader from '../components/Loader';
import Result from '../components/Result';
import { Animal, SearchParams as SearchParamsType } from '../types/common';
const Animals = ['dog', 'rabbit', 'bird'];

const Search = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);

  const [searchParams, setSearchParams] = useState<SearchParamsType>({
    city: '',
    animal: '' as Animal,
    breed: '',
  });

  const breedsQuery = useBreed(searchParams.animal);
  let breeds = breedsQuery?.data?.breeds ?? [];

  const petsQuery = usePet(searchParams);
  let pets = petsQuery?.data?.pets ?? [];

  /*********************** HANDLING FUNCTIONS **********************************/
  const handleSubmit = (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();
    const formDate = new FormData(e.currentTarget);
    const animal = formDate.get('animal');
    const city = formDate.get('city');
    const breed = formDate.get('breed');
    if (!animal && !breed) alert('please select values');
    else setSearchParams({ animal, city, breed } as SearchParamsType);
  };

  /****************************** RENDERING  *****************************************/
  return (
    <div className="search-params">
      <form action="" onSubmit={handleSubmit}>
        {adoptedPet && (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        )}
        <label htmlFor="city">city</label>
        <input type="text" id="city" name="city" placeholder="city" />
        <br />

        <label htmlFor="animal">Animal</label>
        <select
          id="animal"
          name="animal"
          onChange={(e) => {
            setSearchParams({
              ...searchParams,
              animal: e.target.value as Animal,
              breed: '',
            });
          }}
        >
          <option value="" key=""></option>
          {Animals.map((animal) => (
            <option value={animal} key={animal}>
              {animal}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="breed">Bread</label>
        <select id="breed" disabled={!breeds.length} name="breed">
          {breeds.map((breed) => (
            <option value={breed} key={breed}>
              {breed}
            </option>
          ))}
        </select>

        <br />
        <button>Submit</button>
      </form>

      {petsQuery.isLoading && (
        <div className="search loader-container">
          <Loader />
        </div>
      )}
      {petsQuery.isError && <span>{(petsQuery.error as Error).message}</span>}
      {petsQuery.data && (
        <ErrorBoundary>
          <Result pets={pets} />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default Search;

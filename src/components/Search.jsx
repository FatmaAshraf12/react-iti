import { useState, useEffect } from 'react';
import Pets from './Pets';

const Animals = ['dog', 'rabbit', 'bird'];
//const breeds = [ 'Havanese','German Shepherd','Dachshund','French Bulldog','Labrador','Husky','Shih Tzu','Pit Bull','Jack Russel Terrier','Boxer','Dalmation', 'Pekingese', 'Weimaraner','Australian Shepherd','Goldendoodle','Wheaten Terrier'];
var Breeds = [];
const Search = () => {
  const [city, setCity] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreeds] = useState([]);
  const [pets, setPets] = useState([]);

  /*********************** FETCH PETS  **********************************/
  const fetchPets = async () => {
    const res = await fetch(
      //`http://pets-v2.dev-apis.com/pets?animal=${animal}&city=${city}&`
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&city=${city}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  };

  /*********************** FETCH BREEDS  **********************************/
  const fetchBreeds = async (animal) => {
    const res = await fetch(
      `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );
    const json = await res.json();
    Breeds = json.breeds;
    setBreeds(Breeds[0]);
  };

  useEffect(() => {
    fetchPets();
  }, [city, animal, breed]);

  return (
    <div className="search">
      <form action="">
        <label htmlFor="city">city</label>
        <input
          type="text"
          id="city"
          value={city}
          placeholder="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <br />

        <label htmlFor="animal">Animal</label>
        <select
          id="animal"
          value={animal}
          onChange={(e) => {
            setAnimal(e.target.value);
            fetchBreeds(e.target.value);
          }}
        >
          {Animals.map((animal) => (
            <option value={animal} key={animal}>
              {animal}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="breed">Bread</label>
        <select
          id="breed"
          disabled={!Breeds.length}
          value={breed}
          onChange={(e) => {
            console.log(e.target.value);
            setBreeds(e.target.value);
          }}
        >
          {Breeds.map((breed) => (
            <option value={breed} key={breed}>
              {breed}
            </option>
          ))}
        </select>

        <br />
      </form>
      <div className="search-res">
        {!pets.length ? (
          <h1>No Pets found</h1>
        ) : (
          pets.map((pet) => {
            return (
              <Pets
                animal={pet.animal}
                name={pet.name}
                breed={pet.breed}
                key={pet.id}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Search;

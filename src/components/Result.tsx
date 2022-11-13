/* eslint-disable react/prop-types */
import { Pet as PetType } from '../types/common';

import Pets from './Pets';

type Props = {
  pets: PetType[];
};

const Result = ({ pets }: Props) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => (
          <Pets
            key={pet.id}
            animal={pet.animal}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={pet.city}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Result;

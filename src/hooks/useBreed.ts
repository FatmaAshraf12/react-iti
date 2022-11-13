import { useQuery, QueryFunction } from '@tanstack/react-query';
import { Animal,BreedListAPIResponse } from '../types/common';


const fetchBreeds : QueryFunction<BreedListAPIResponse,['breeds', Animal]> = async ({ queryKey }) =>  {
  const [, animal] = queryKey;

  if (!animal) return '';
  const res = await fetch(`https://pets-v2.dev-apis.com/breeds?animal=${animal}`);
  return res.json();
};

const useBreed = (animal:Animal) => {
  return useQuery(['breeds', animal], fetchBreeds);
};

export default useBreed;

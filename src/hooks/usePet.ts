import { QueryFunction,useQuery} from '@tanstack/react-query';
import { SearchParams ,SearchPetsAPIResponse} from '../types/common';


const fetchPets :QueryFunction< SearchPetsAPIResponse,['pets', SearchParams]> = async ({ queryKey }) =>  {

  const [, { animal, city, breed }] = queryKey;
  if (!animal || !breed) return '';
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&city=${city}&breed=${breed}`
  );
  return res.json();
};

const usePet = (searchParams:SearchParams) => {
  return useQuery(['pets', searchParams], fetchPets);
};

export default usePet;
//QueryFunction<BreedListAPIResponse,['breeds', Animal]> = async ({ queryKey }) =>  
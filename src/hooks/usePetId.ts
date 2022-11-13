import { useQuery,QueryFunction } from '@tanstack/react-query';
import { SearchPetsAPIResponse} from '../types/common';


//QueryFunction<BreedListAPIResponse,['breeds', Animal]> = async ({ queryKey }) =>  
const fetchPetById :QueryFunction<SearchPetsAPIResponse,['pet', number]> = async ({ queryKey }) =>   {
  const [, id] = queryKey;
  const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  const json = await res.json();
  console.log(json.pets[0]);
  return json.pets[0];
};

const usePetId = (id:number) => {
  return useQuery(['pet', id], fetchPetById);
};

export default usePetId;

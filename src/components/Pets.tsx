/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

type Props = {
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
  id: number;
};

const Pets = (props: Props) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = 'http://pets-images.dev-apis.com/pets/none.jpg';
  if (images.length) {
    hero = images[0];
  }
  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>
          {animal} — {breed} — {location} — {id}
        </h2>
      </div>
    </Link>
  );
};

export default Pets;

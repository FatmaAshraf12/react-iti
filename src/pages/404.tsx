import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="centerContent">
      <h2 style={{ textAlign: 'center' }}>not found</h2>

      <button>
        <Link to="/">Back to Home </Link>
      </button>
    </div>
  );
};

export default NotFound;

import React ,{useState,useEffect} from 'react';

const USERS_URL = 'https://example.com/api/users';

export default function Table () {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchData(page);
  }, [page])

  const fetchData = async (page) => {
    fetch(`https://example.com/api/users?page=${page}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(result.results);
          setTotal(result.count);
       
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
        
        {users.length && (
          users.map((data, idx) => (
          <tr  key={data.id}>
              <td>{data.id}</td>
              <td>{data.lastName}</td>
              <td>{data.firstName}</td>
          </tr>

          ))
          )
        }
        </tbody>
      </table>
      <section className="pagination">
        <button className="first-page-btn" disabled={!isLoaded ||page === 0}
        onClick={() => setPage(0)}
        >first</button>
        <button className="previous-page-btn" disabled={!isLoaded} 
        onClick={() => setPage((prevState) => prevState - 1)}>
        previous
        </button>

        <button className="next-page-btn" disabled={!isLoaded ||  page+1 ==Math.ceil(total / 10)} 
        onClick={() => setPage((prevState) => prevState + 1)}>
        next
        </button>
        <button className="last-page-btn"
         disabled={!isLoaded ||  page == Math.ceil(total / 10)-1 }
         onClick={() => setPage(Math.ceil(total / 10)-1)}
         >last</button>
      </section>
    </div>
  );
  
};

import React ,{useState,useEffect} from 'react';

const USERS_URL = 'https://example.com/api/users';

export default function Table () {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchData(0);
  }, [perPage])

  const fetchData = async (page) => {
    console.log('ff');
    fetch(`https://example.com/api/users?page=${page}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
          setTotalRows(result.total);
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
        
        {items.map((data, idx) => (
          <tr  key={data.id}>
              <td>{data.id}</td>
              <td>{data.lastName}</td>
              <td>{data.firstName}</td>
          </tr>

          ))}
        </tbody>
      </table>
      <section className="pagination">
        <button className="first-page-btn">first</button>
        <button className="previous-page-btn">previous</button>
        <button className="next-page-btn">next</button>
        <button className="last-page-btn">last</button>
      </section>
    </div>
  );
  
};

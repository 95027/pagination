import './App.css';
import {useEffect, useState} from 'react';


function App() {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  function fetchProducts (){
    fetch("https://dummyjson.com/users")
    .then(res => res.json())
    .then(data => setUsers(data.users))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const selectedPageHandler = (selected) => {
    setPage(selected);
  }


  return (
    <div className="app">
      <div>
        <h2>Tabular Data</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>FirstName</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {
            users.slice(page*5 - 5,page*5).map(user => {
              const {id, firstName, email, address} = user;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{firstName}</td>
                  <td>{email}</td>
                  <td>{address.city}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        users.length > 0 && (
        <div className='pagination'>
          {
            page > 1  && (
              <button onClick={() => setPage(page - 1)}>Prev</button>
            )
          }
          {
            [...Array(Math.floor(users.length / 5))].map((__, i) => {
              return <span
              key={i}
              className={page === i+1 ? "active" : null}
              onClick={() => selectedPageHandler(i+1)}>
                {i + 1}
              </span>
            })
            
          }
          {
            users.length / 5 > page && (
              <button onClick={() => setPage(page + 1)}>Next</button>
            )
          }
        </div>)
      }
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState();

  const search = (e) => {
    e.preventDefault();
    console.log(name);
    axios.get(`https://api.nationalize.io/?name=${name}`)
      .then(response => {
        console.log(response.data);
        setData(response.data.country);
      })
  }
  return (
    <div>
      <h2 className='title'>Predict country with name</h2>
      <div className='container'>
        <form onSubmit={search}>
          <input type="search" value={name} 
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value){
              setData();
            }
          }
          } 
          placeholder="Enter a name" />
          <button type="submit">Predict</button>
        </form>
        <h2>Your name is: {name}</h2>
        <div className='results'>
          {data?.map((country) => {
            return(
              <div className='country-num'>
                <h4>{country.country_id}</h4>
                <h5 className='percent'>{((country.probability) * 100).toFixed() } %</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

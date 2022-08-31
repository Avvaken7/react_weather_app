import React, {useState} from 'react';
import { Input, Box} from '@mui/material';

import WeatherCard from '../WeatherCard/WeatherCard';

const Service = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');

  const styles = {
    input: {
      width: '600px'
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      flexWrap: 'wrap',
      height: '100vh'
    }    
  }

  function fetchData (e) {
    e.preventDefault();
 
    if (name.length === 0) {
      return setError(true);
    }
    setError(false);
    setData([]);
    setLoading(true);

    const uriEncodedCity = encodeURIComponent(name);
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${uriEncodedCity},ua&units=metric&lang=ua&appid=${API_KEY}`)
      .then(response => response.json())
      .then(response => {
          if (response.cod !== 200) {
              throw new Error();
          }
          setData(response);
          setLoading(false);
      })
      .catch(err => {
          setError(true);
          setLoading(false);
          console.log(err.message);
      });
  };
  
  

  return (
    <Box component="main" sx={styles.main}>
      <Box component="form" onSubmit={fetchData}>
        <Input autoFocus sx={ styles.input } maxLength="50" placeholder="Enter your city" onChange={(e) => setName(e.target.value.trim())}/>
      </Box>
      <WeatherCard {...data} error={error} loading={loading}/>
    </Box>
  )
}

export default Service;
import React, { useState } from 'react';
import { InputBase, Box, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';


import { useFetch } from '../../hooks/http.hook';

import { API_KEY, BASE_URL } from '../../utils/utils';
import WeatherTemplate from '../weatherTemplate/WeatherTemplate';

const Service = () => {
  const [name, setName] = useState('');

  const uriEncodedCity = encodeURIComponent(name);
  const url = `${BASE_URL}/weather?q=${uriEncodedCity}&units=metric&appid=${API_KEY}`;

  const { data, error, isLoading, fetchData } = useFetch(url);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData();    
    setName('');
  }

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
      height: '100vh',
      paddingTop: '40px'
    }
  }

  return (
    <Box component="main" sx={styles.main}>
      <Box component="form" onSubmit={onSubmit}>
        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
            <InputBase
              maxLength="50"
              id='city'
              value={name}
              onChange={e => setName(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Enter your city"
              inputProps={{ 'aria-label': 'Enter your city' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onSubmit}>
              <SearchOutlinedIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Box>
      <WeatherTemplate {...data} error={error} isLoading={isLoading} />
        
    </Box>
  )
}

export default Service;


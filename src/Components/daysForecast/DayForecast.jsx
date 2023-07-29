import React from 'react';
import { CircularProgress, Stack, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import ForecastDaysList from '../forecastDaysList/ForecastDaysList';

import { API_KEY, BASE_URL } from '../../utils/utils';
import { useFetch } from '../../hooks/http.hook';


const DayForecast = ({ name }) => {

    const url = `${BASE_URL}/forecast?q=${name}&units=metric&appid=${API_KEY}`;

    const { data, error, isLoading, fetchData } = useFetch(url);
    const { cod } = data;

    const onSubmit = (e) => {
        e.preventDefault();
        fetchData();
    }

    return (
        <>
            <Button variant="contained" onClick={onSubmit}>See 5 days forecast</Button>
            {isLoading &&
                <CircularProgress />
            }
            {error &&
                <Stack sx={{ pt: 1 }}>
                    <Alert
                        sx={{ width: '28vw' }}
                        severity="info"
                    >Please enter a valid city</Alert>
                </Stack>
            }
            {cod === '200' ?
                <Grid xs={12}>
                    <ForecastDaysList data={data} />
                </Grid>
            :null
            }
        </>
    );
};

export default DayForecast;
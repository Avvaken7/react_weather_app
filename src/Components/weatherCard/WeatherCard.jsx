import React, { useState } from 'react';

import Box from '@mui/material/Box';
import { Alert, Stack, CircularProgress, Switch } from '@mui/material';

import { celsiusToFahrenheit, currentDate } from '../../utils/utils';

const WeatherCard = (props) => {
    const [checked, setChecked] = useState(false);

    const { main, name, wind, clouds, weather, sys } = props;
    
    const handleChange = () => {
        setChecked(checked => !checked);
    }

    const parentBox = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1,
        gridTemplateRows: 'repeat(3, 1fr)',
        gridTemplateAreas: `"name . temp"
                            "weather . feels"
                            "humadity wind clouds"`,
        alignItems: 'center',
        height: '400px',
        width: '640px',
        marginTop: '20px',
        position: 'relative',
        color: '#fff',
        fontWeight: '300',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            height: '400px',
            width: '640px',
            borderRadius: '20px',
            backgroundColor: '#fff',
            opacity: '.1',
            border: '1px solid #505050',
            zIndex: '-1'
        }
    }

    return (
        <>
            {props.loading &&
                <CircularProgress />
            }
            {props.error &&
                <Stack sx={{ width: '31.5%' }}>
                    <Alert severity="error" color="info">Please enter a valid city</Alert>
                </Stack>
            }
            {props.cod === 200 ?
                <>
                    <div>
                        <span><small>C</small></span>
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                            size="small"
                        />
                        <span><small>F</small></span>
                    </div>
                    <Box sx={parentBox} component='section'>
                        <Box sx={{ gridArea: 'name' }}>
                            <h2>{name} {sys.country}</h2>
                            <p>{currentDate}</p>
                        </Box>
                        <Box sx={{ gridArea: 'temp', fontSize: '3.5em' }}>
                            {checked ? celsiusToFahrenheit(main.temp) + '°F' : main.temp.toFixed() + '°C'}
                        </Box>
                        <Box sx={{ gridArea: 'weather' }}>
                            <p>{weather[0].main}</p>
                            <img src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`} alt='icon'></img>
                        </Box>
                        <Box sx={{ gridArea: 'feels', }}>
                            <p>Feels like</p>
                            {checked ? celsiusToFahrenheit(main.feels_like) + '°F' : main.feels_like.toFixed() + '°C'}
                        </Box>
                        <Box sx={{ gridArea: 'humadity' }}>
                            <p>Humadity {main.humidity}%</p>
                        </Box>
                        <Box sx={{ gridArea: 'wind' }}>
                            <p>Wind {wind.speed}m/s</p>
                        </Box>
                        <Box sx={{ gridArea: 'clouds' }}>
                            <p>Clouds {clouds.all}%</p>
                        </Box>
                    </Box>
                </>
                : null
            }
        </>
    )
}


export default WeatherCard;
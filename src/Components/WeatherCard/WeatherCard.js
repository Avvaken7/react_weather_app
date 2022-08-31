import React from 'react';
import Box from '@mui/material/Box';
import { Alert, Stack, CircularProgress } from '@mui/material';

const WeatherCard = props => {
    
    const {main, name, wind, clouds, weather} = props;

    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-US', options);

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
            <React.Fragment>
                <Box sx={ parentBox } component='section'>
                    <Box sx={{ gridArea: 'name'}}>
                        <h2>{name}</h2>
                        <p>{currentDate}</p>
                    </Box>
                    <Box sx={{ gridArea: 'temp', fontSize: '3.5em'}}>
                        <p>{main.temp.toFixed()}&deg;C</p>
                    </Box>
                    <Box sx={{ gridArea: 'weather'}}>
                        <p>{weather[0].main}</p>
                        <img src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`} alt='icon'></img>
                    </Box>
                    <Box sx={{ gridArea: 'feels',}}>
                        <p>Feels like</p>
                        <p>{main.feels_like.toFixed()}&deg;C</p>
                    </Box>
                    <Box sx={{ gridArea: 'humadity'}}>
                        <p>Humadity {main.humidity}%</p>
                    </Box>
                    <Box sx={{ gridArea: 'wind'}}>
                        <p>Wind {wind.speed}m/s</p>
                    </Box>
                    <Box sx={{ gridArea: 'clouds'}}>
                        <p>Clouds {clouds.all}%</p>
                    </Box>
                </Box>
            </React.Fragment>
        : null
        }
        </>
    )
}


export default WeatherCard;
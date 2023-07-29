import React, { memo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { CircularProgress, Stack, Alert } from '@mui/material';
import thermometer from '../../assets/weatherIcons/temperature.svg';
import DayForecast from '../daysForecast/DayForecast';

import { currentDate, convertTimestamps } from '../../utils/utils';

import styles from './weatherTemplate.module.css';


const WeatherTemplate = (props) => {

    const { main,
        name,
        wind,
        clouds,
        weather,
        sys,
        visibility,
        isLoading,
        error,
        cod
    } = props;

    return (
        <>
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
            {cod === 200 ?
                <Box sx={{ flexGrow: 1, paddingTop: 5 }}>
                    <Grid container spacing={4} className={styles.mainBox}>
                        <Grid xs={8}>
                            <Grid
                                xs={12}
                                spacing={2}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start'
                                }}>
                                <div className={styles.main_name}>
                                    <h1>{name} | {sys?.country}</h1>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${weather[0]?.icon}.png`}
                                        alt={weather[0]?.main}>
                                    </img>
                                </div>
                                <span>{currentDate}</span>

                            </Grid>
                            <Grid xs={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 3 }}>
                                <div className={styles.main_icon}>
                                    <img src={thermometer} alt={thermometer} />
                                </div>
                                <div className={styles.main_temp}>
                                    {main.temp.toFixed()}<span className={styles.celsius}>‎°C</span>
                                </div>
                                <div className={styles.main_feels_like}>
                                    <div className={styles.clouds}>{weather[0]?.description}</div>
                                    <div>
                                        <span>Feels like </span>
                                        {main.feels_like.toFixed()}<span>°</span>
                                    </div>
                                </div>
                            </Grid>
                            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className={styles.main_options}><span>Wind</span> {wind.speed}m/s</div>
                                <div className={styles.main_options}><span>Humadity</span> {main.humidity}%</div>
                                <div className={styles.main_options}><span>Pressure</span> {(main.pressure / 133.3 * 100).toFixed()}mm</div>
                                <div className={styles.main_options}><span>Clouds</span> {clouds.all}%</div>
                                <div className={styles.main_options}><span>Visibility</span> {visibility}</div>
                            </Grid>
                            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
                                <div>Sunrise: {convertTimestamps(sys.sunrise)} a.m.</div>
                                <div>Sunset: {convertTimestamps(sys.sunset)} p.m.</div>
                            </Grid>
                        </Grid>
                        <Grid xs={4}>
                            <div>Other information about weather
                                <p>lorem*5</p>
                            </div>
                        </Grid>
                        <Grid xs={12}>
                            <DayForecast name={name} />
                        </Grid>
                        <Grid xs={12}>
                            <div>Other information about weather</div>
                        </Grid>
                    </Grid>
                </Box >
                : null}
        </>

    );
};
export default memo(WeatherTemplate);
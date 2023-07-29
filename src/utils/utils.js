export const celsiusToFahrenheit = (temp) => {
    let fahrenheit = temp / 0.55 + 32
    return fahrenheit.toFixed();
}

export const convertTimestamps = (utc) => {
    let unix_timestamp = utc;
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let result = hours + ':' + minutes.substring(0, 2);
    return result;
}

/* Видалення сьогоднішнього дня із загального масиву днів */ 
export const trimTodayFromList = (array) => {
    let i = 0;
    while (i < array.length && !array[i].dt_txt.includes("00:00:00")) {
        i++;
    }
    return array.slice(0, i);
}

/* Створення даних для одного дня із п'яти */
export const getOneDayDataFromList = (array, start, end) => array.slice(start, end).map(element => {
    const temp = element.main.temp;
    const humidity = element.main.humidity;
    const windSpeed = element.wind.speed;
    const pressure = element.main.pressure;
    const clouds = element.clouds.all;
    return {
        temp,
        humidity,
        windSpeed,
        pressure,
        clouds
    };
});

/* Визначення максимальної та мінімальної температури поточного дня */
export const getMaxAndMinTempsOfDay = (array) => {
    const maxTemp = array.map(element => {
        if (!element) {
            return -Infinity;
        } else {
            return element.temp;
        }
    }).reduce((a, b) => Math.max(a, b));

    const minTemp = array.map(element => {
        if (!element) {
            return Infinity;
        } else {
            return element.temp;
        }
    }).reduce((a, b) => Math.min(a, b));

    return {
        maxTemp,
        minTemp
    };
};


export const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
export const BASE_URL = `https://api.openweathermap.org/data/2.5`;
let options = { year: 'numeric', month: 'long', day: 'numeric' };
export const currentDate = new Date().toLocaleDateString('en-US', options);



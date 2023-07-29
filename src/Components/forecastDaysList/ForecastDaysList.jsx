import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { trimTodayFromList, getOneDayDataFromList, getMaxAndMinTempsOfDay } from '../../utils/utils';
import ForecastDayCard from '../forecastDayCard/ForecastDayCard';

// import styles from './forecastDaysList.module.css';

const ForecastDaysList = (props) => {
    const { list } = props.data;

    /* Масив із сьогоднішнім днем */
    const trimmedDaysList = trimTodayFromList(list);
    /* Створення нового масиву днів без сьогоднішнього */
    const newListOfNextFiveDays = list.slice(trimmedDaysList.length, list.length - 1);
    console.log(newListOfNextFiveDays);
    /* Результатом виконання функції буде масив об'єктів одного дня. В даному випадку - першого */
    const oneOfFiveDayData = getOneDayDataFromList(newListOfNextFiveDays, 0, 8);
    console.log(oneOfFiveDayData);

    console.log(getMaxAndMinTempsOfDay(oneOfFiveDayData));

    /* Розмапить новий масив для відображення */
    const fiveDaysForecast = newListOfNextFiveDays.map(item => (
        <div key={uuidv4()}>{item.main.temp.toFixed() + 'C'} - {item.dt_txt}</div>
    ))

    return (
        <>
            <ForecastDayCard />
        </>
    );
};

export default ForecastDaysList;
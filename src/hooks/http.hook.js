import { useState } from "react";
import axios from 'axios';

export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = () => axios.get(url)
        .then(response => {
            setData(response.data);
            setIsLoading(false);
            setError(false);
        })
        .catch(error => {
            setError(true);
            setIsLoading(false);
        })
        .finally(() => {
            setIsLoading(false);
        });

    return { data, isLoading, error, fetchData };
};
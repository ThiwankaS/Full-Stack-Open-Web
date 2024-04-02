import axios from 'axios';

const baseURL = 'http://localhost:3000/api/diaries';

export const getDairyEntries = () => {
    return axios
            .get(baseURL)
            .then(response => response.data)
} 
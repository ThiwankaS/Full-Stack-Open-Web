import axios from 'axios';
import { NewDiaryEntry } from '../type';

const baseURL = 'http://localhost:3000/api/diaries';

export const getDairyEntries = () => {
    return axios
            .get(baseURL)
            .then(response => response.data)
}

export const createDairyEntries = (object : NewDiaryEntry) => {
    return axios
            .post(baseURL,object)
            .then(response => response.data)
}
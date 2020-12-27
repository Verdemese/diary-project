import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://english-diary-project-default-rtdb.firebaseio.com/'
});

export default instance;
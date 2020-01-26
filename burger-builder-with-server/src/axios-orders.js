import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-b4c57.firebaseio.com/'
});

export default instance;
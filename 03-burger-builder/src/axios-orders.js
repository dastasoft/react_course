import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://course-react-burger.firebaseio.com/'
});

export default instance;
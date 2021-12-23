import axios from 'axios';
import config from 'config';

const url = `${config.apiUrl}/game`;

const getData = () => { 
	return axios.get(url);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
getData,
};
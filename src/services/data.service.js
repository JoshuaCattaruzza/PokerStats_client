import axios from 'axios';

const url = 'http://localhost:4200/game';

const getData = () => { 
	return axios.get(url);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
getData,
};
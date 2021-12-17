import axios from 'axios';

const url = 'http://localhost:4200/auth/';

const signup = (username, password) => {
	return axios.post(url + 'signup', {
		username,
		password,
	});
};
const login = (username, password) => {
	return axios
		.post(url + 'signin', {
			username,
			password,
		})
		.then((response) => {
			console.log(response);
			if (response.data.accessToken) {
				localStorage.setItem('user', JSON.stringify(response.data));
			} else {
				console.log(response.data.accessToken);
			}
			return Promise.resolve();
		});
};
const logout = () => {
	localStorage.removeItem('user');
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	signup,
	login,
	logout,
};

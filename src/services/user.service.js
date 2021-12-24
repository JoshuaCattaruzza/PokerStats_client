import authHeader from './auth-header';
// import config from 'config';

const API_URL = `${config.apiUrl}/api/test/`;

const getPublicContent = () => {
	return fetch(API_URL + 'all');
};

const getUserBoard = () => {
	return fetch(API_URL + 'user', { headers: authHeader() });
};

const getModeratorBoard = () => {
	return fetch(API_URL + 'mod', { headers: authHeader() });
};

const getAdminBoard = () => {
	return fetch(API_URL + 'admin', { headers: authHeader() });
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getPublicContent,
	getUserBoard,
	getModeratorBoard,
	getAdminBoard,
};

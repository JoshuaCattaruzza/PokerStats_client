import { FETCH_DATA } from '../actions/types';

const initialState = {data: []}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case FETCH_DATA:
			return { ...state,
				data: payload.data };

		default:
			return state;
	}
}

import { FETCH_DATA } from './types';
import Dataservice
 from '../services/data.service';
export const getData = () => (dispatch) => {
    return Dataservice.getData().then((res)=>{
        dispatch({
            type: FETCH_DATA,
            payload: res,
        });
        return Promise.resolve();
    }
    )
};

import Constants from './constants';
import axios from 'axios';
import {createAction} from 'redux-actions';

const {
    DELETE_USER,
    ADD_USER,
    GET_USER_LIST,
    FILTER_LIST,
} = Constants;

export const deleteUser = createAction(DELETE_USER);
export const addUser = createAction(ADD_USER);
export const getUserList = createAction(GET_USER_LIST);
export const filterList = createAction(FILTER_LIST);

export function getUsersAsync() {
    return (dispatch) => {
        axios.get('http://localhost:3004/users')
            .then((response) => {
                // dispatch({type: 'GET_USER_LIST', payload: response.data});
                console.log(response.data);
                dispatch(
                    getUserList(response.data)
                )
            })
            .catch((error) => {
                console.log(error);
            })
    };
}
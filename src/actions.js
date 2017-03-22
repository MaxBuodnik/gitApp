import Constants from './constants';

import { createAction } from 'redux-actions';

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

//export { deleteUser };

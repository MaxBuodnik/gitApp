// const { DELETE_USER } = Constants;

import { handleActions } from 'redux-actions';
import Constants from './constants';
import update from 'react-addons-update';


const {
  DELETE_USER,
  ADD_USER,
  GET_USER_LIST,
  FILTER_LIST,
} = Constants;

const initialState = {
  userStore: []
};

export const rootReducer = handleActions({

  [ADD_USER]: (state, action) => update(state, {
    userStore: { $push: [action.payload] }
  }),

  [GET_USER_LIST]: (state, action) => update(state, {
    userStore: { $set: action.payload }
  }),

  [DELETE_USER]: (state, action) => {
   const index = state.userStore.findIndex(item => item.id === action.payload);
   return update(state, {
    userStore: { $splice: [[index, 1]] }
  })},

  [FILTER_LIST]: (state, action) => update(state, {
    userStore: { $set: action.payload }
  })

  }, initialState);





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

export const Events = (state) => state.events;

// const reducer = (state = { userStore: [] }, action) => {
//    if (action.type === 'GET_USER_LIST') {
//       return update(state, {
//         userStore: { $set: action.payload }
//       });
//    }
//
//    if (action.type === 'ADD_USER') {
//       return update(state, {
//         userStore: { $push: [action.payload] }
//       });
//    }
//
//    if (action.type === DELETE_USER) {
//     const index = state.userStore.findIndex(item => item.id === action.payload);
//     return update(state, {
//       userStore: { $splice: [[index, 1]] }
//     });
//    }
//
//    if (action.type === 'FILTER_LIST') {
//      return update(state, {
//        userStore: { $set: action.payload }
//      });
//    }
//     return state;
//  }

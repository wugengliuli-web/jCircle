import {ADD_DATA} from '../constants/majorBook'

const InitState = {
  data:[]
};

export const majorBook = (state=InitState,action) =>{
  const {type,data} = action;

  switch (type) {
    case ADD_DATA:
      return{
        ...state,
        data
      }
    default:
      return state
  }
};

import {SET_BOOK_DATA,SET_FILM_DATA} from '../constants/recommend'

//放在state里的初始值
const InitState = {
  bookRow:[],
  filmRow:[],
  hasBookMore: true,
  hasFilmMore: true,
  bookPageIndex:1,
  filmPageIndex:1
};


export const recommend = (state=InitState,action) =>{
  const {type,data} = action;
  let bookRow = state.bookRow.slice();
  let filmRow = state.filmRow.slice();
  switch (type) {
    case SET_BOOK_DATA:
      return{
        ...state,
        bookPageIndex:state.bookPageIndex+1,
        hasBookMore: data.book_row.length === 3,
        bookRow:data.currentPage === 1 ? data.book_row : bookRow.concat(data.book_row),
      };
    case SET_FILM_DATA:
      return {
        ...state,
        filmPageIndex:state.filmPageIndex+1,
        hasFilmMore: data.film_row.length === 3,
        filmRow:data.currentPage === 1 ? data.film_row : filmRow.concat(data.film_row),
      };
    default:
      return state
  }
};

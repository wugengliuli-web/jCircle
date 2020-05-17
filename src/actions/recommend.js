import Taro from '@tarojs/taro'
import { DEVELOP_URL } from '../lib/url'
import {SET_FILM_DATA,SET_BOOK_DATA}from '../constants/recommend'

const BOOK_TYPE = 0;
const FILM_TYPE = 1;

export const getBookList =(params)=>{
  const {currentPage,pageSize} =params;
  return async dispatch =>{
    const  resBook = await Taro.request({
      url:DEVELOP_URL+'/Recommend/pageList',
      data:{
        currentPage:currentPage,
        pageSize:pageSize,
        recType:BOOK_TYPE
      }
    });

    let {data:{data:{rows:book_row},code:book_code}} = resBook;
    let data = {
      book_row,
      currentPage
    };

    if(book_code===0){
      await dispatch({
        type:SET_BOOK_DATA,
        data
      });
      return true
    }
    return false
  }
};

export const getFilmList =(params)=>{
  const {currentPage,pageSize} =params;
  return async dispatch =>{
    const  resFilm = await Taro.request({
      url:DEVELOP_URL+'/Recommend/pageList',
      data:{
        currentPage:currentPage,
        pageSize:pageSize,
        recType:FILM_TYPE
      }
    });
    let {data:{data:{rows:film_row},code:film_code}} = resFilm;
    let data = {
      film_row,
      currentPage
    };

    if(film_code ===0){
      await dispatch({
        type:SET_FILM_DATA,
        data
      });
      return true
    }
    return false
  }
};

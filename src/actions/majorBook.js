import Taro from '@tarojs/taro'
import {
  DEVELOP_URL
} from '../lib/url'
import {ADD_DATA} from '../constants/majorBook'

export const getList = (params) => {
  const {major} = params;
  return async dispatch => {
    const res = await Taro.request({
      url: DEVELOP_URL + '/book/list',
      data: {
        major
      }
    });

    let {data:{data,code}} = res;

    if (code === 0) {
      await dispatch({
        type: ADD_DATA,
        data
      });
      return true
    }
    return false
  }

}

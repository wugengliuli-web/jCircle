import Taro from '@tarojs/taro'
import { DEVELOP_URL } from '../lib/url'
import {
    set_homeInfo
} from '../constants/home'

export const getHomeInfo = (pageIndex, size) => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP_URL + 'getList',
            data: {
                pageIndex,
                size
            }
        })
        let { data: { data, result } } = res
        if(result === 0) {
            await dispatch({
                type: set_homeInfo,
                data
            })
            return true
        } else {
            return false
        }
    }
}
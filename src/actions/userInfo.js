import {
    set_userInfo
} from '../constants/userInfo'
import Taro from '@tarojs/taro'
import { DEVELOP_URL } from '../lib/url'

export const setUserInfoAction = info => {
    return {
        type: set_userInfo,
        data: info
    }
}


export const login = body => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP_URL + 'user/login',
            method: 'PUT',
            data: body
        })
        const { data: { code } } = res
        return code === 0
    }
}
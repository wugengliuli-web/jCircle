import {
    add_dynamic
} from '../constants/releaseDynamics'
import { DEVELOP_URL } from '../lib/url'
import Taro from '@tarojs/taro'
export const addDynamicAction = (userID, nickName, value, poster, avatarUrl) => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP_URL + 'addDynamic',
            method: 'POST',
            data: {
                userID,
                nickName,
                value,
                poster,
                avatarUrl
            }
        })
        let { data: { result, data } } = res
        result = Number(result)
        if(result === 0) {
            await dispatch({
                type: add_dynamic,
                data
            })
        }
        return result === 0
    }
}
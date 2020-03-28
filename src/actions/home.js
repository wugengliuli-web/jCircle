import Taro from '@tarojs/taro'
import { DEVELOP_URL } from '../lib/url'
import {
    set_homeInfo,
    set_heart,
    set_comment
} from '../constants/home'

export const getHomeInfoAction = (pageIndex, size) => {
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
        }
        return result === 0
    }
}

export const setHeartAction = (userId, dynamicID, isHeart, index) => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP_URL + 'setHeart',
            method: 'POST',
            data: {
                userId,
                dynamicID,
                isHeart
            }
        })
        let { data: { result } } = res
        result = Number(result)
        if(result === 0) {
            await dispatch({
                type: set_heart,
                data: {
                    isHeart,
                    index
                }
            })
        }
        return result === 0
    }
}


export const setCommentAction = (userId, dynamicID, nickName, index, comment) => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP_URL + 'setComment',
            method: 'POST',
            data: {
                userId,
                dynamicID,
                index,
                nickName,
                comment
            }
        })
        let { data: { result } } = res
        result = Number(result)
        if(result === 0) {
            await dispatch({
                type: set_comment,
                data: {
                    comment,
                    index,
                    nickName
                }
            })
        }

        return result === 0
    }
}
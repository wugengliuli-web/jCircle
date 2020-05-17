import Taro from '@tarojs/taro'
import { DEVELOP_URL } from '../lib/url'
import {
    set_homeInfo,
    set_heart,
    set_comment
} from '../constants/home'

export const getHomeInfoAction = (pageIndex, size, wxID = '') => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP_URL + 'theme/pageListInfo',
            data: {
                currentPage: pageIndex,
                pageSize: size
            }
        })
        let { data: { data: { rows }, code } } = res
        // rows.sort((a,b) => -a.updateTime.localeCompare(b.updateTime))
        rows = rows.map(item => {
            let approves = item.approves
            let isHeart = false
            if(approves) {
                for(let item of approves) {
                    if(item.wexId === wxID) {
                        isHeart = true
                        break
                    }
                }
            }
            item['isHeart'] = isHeart
            return item
        })
        if(code === 0) {
            await dispatch({
                type: set_homeInfo,
                data: rows,
                pageIndex
            })
        }
        return code === 0
    }
}

export const setHeartAction = (userId, dynamicID, isHeart, index) => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP_URL + `${isHeart ? 'approve/praise' : 'approve/cancel' }`,
            method: `${isHeart ? 'POST' : 'PUT'}`,
            data: {
                wexId: userId,
                themeId: dynamicID,
                praise: isHeart ? 1 : 0
            }
        })
        let { data: { code } } = res
        if(code === 0) {
            await dispatch({
                type: set_heart,
                data: {
                    isHeart,
                    index
                }
            })
        }
        return code === 0
    }
}


export const setCommentAction = (userId, dynamicID, nickName, index, comment) => {
    return async dispatch => {
        const date = new Date()
        const res = await Taro.request({
            url: DEVELOP_URL + '/comment/add',
            method: 'POST',
            data: {
                themeId: dynamicID,
                content: comment,
                createTime: date.toLocaleString(),
                updateTime: date.toLocaleString(),
                wexId: userId
            }
        })
        let { data: { code } } = res
        if(code === 0) {
            await dispatch({
                type: set_comment,
                data: {
                    comment,
                    index,
                    nickName
                }
            })
        }

        return code === 0
    }
}
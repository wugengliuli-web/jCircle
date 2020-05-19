import { SET_MYRELEASE, DEL_MYRELEASE } from '../constants/myRelease'
import Taro from '@tarojs/taro'
import { DEVELOP_URL } from '../lib/url'
export const getMyReleaseAction = (id, size, pageIndex) => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP_URL + 'theme/pageListInfo',
            data: {
                wexId: id,
                currentPage: pageIndex,
                pageSize: size
            }
        })
        let { data: { data: { rows }, code } } = res
        // data.sort((a,b) => -a.time.localeCompare(b.time))
        if(code === 0) {
            await dispatch({
                type: SET_MYRELEASE,
                data: rows,
                pageIndex
            })
            return true
        }
        return false
    }
}

export const delReleaseAction = (index, key) => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP_URL + 'theme/del?id=' + key,
            method: 'delete',
            data: {
                id: key
            }
        })
        const { data: { code } } = res
        if(code === 0) {
            await dispatch({
                type: DEL_MYRELEASE,
                index
            })
            return true
        } 
        return false
    }
}
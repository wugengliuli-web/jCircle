import { SET_MYRELEASE } from '../constants/myRelease'
import Taro from '@tarojs/taro'
import { DEVELOP_URL } from '../lib/url'
export const getMyReleaseAction = (id, size, pageIndex, nickName, avatarUrl) => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP_URL + 'getMyRelease',
            data: {
                id,
                size,
                pageIndex,
                nickName,
                avatarUrl
            }
        })
        const { data: { result, data } } = res
        data.sort((a,b) => -a.time.localeCompare(b.time))
        if(result === 0) {
            await dispatch({
                type: SET_MYRELEASE,
                data
            })
            return true
        }
        return false
    }
}
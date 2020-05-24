import {
    add_dynamic
} from '../constants/releaseDynamics'
import { DEVELOP_URL } from '../lib/url'
import Taro from '@tarojs/taro'
export const addDynamicAction = (userID, value, poster) => {
    return async dispatch => {
        const date = new Date()
        const res = await Taro.request({
            url: DEVELOP_URL + 'theme/add',
            method: 'POST',
            data: {
                wexId: userID,
                content: value,
                images: poster,
                createTime: date.toLocaleString(),
                updateTime: date.toLocaleString(),
                status: 1
            }
        })
        let { data: { code } } = res
        return code === 0
    }
}


export const uploadFileAction = filePath => {
    return async dispatch => {
        const res = await Taro.uploadFile({
            url: DEVELOP_URL + '/Images/upload',
            filePath,
            name: 'file'
        })
        let { data } = res
        data = JSON.parse(data)
        const { code, msg } = data
        return msg
    }
}
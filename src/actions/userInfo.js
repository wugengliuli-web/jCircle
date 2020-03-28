import {
    set_userInfo
} from '../constants/userInfo'


export const setUserInfoAction = info => {
    return {
        type: set_userInfo,
        data: info
    }
}

import {
    set_userInfo
} from '../constants/userInfo'

const InitState = {
}


export const userInfo = (state = InitState, action) => {
    let { type, data } = action
    switch(type) {
        case set_userInfo:
            return {
                ...state,
                ...data
            }
        default:
            return state
    }
}
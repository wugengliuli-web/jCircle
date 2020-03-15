import {
    set_homeInfo
} from '../constants/home'

const InitState = {
    info: [],
    hasMore: true
}


export const home = (state = InitState, action) => {
    let { type, data } = action
    switch(type) {
        case set_homeInfo:
            return {
                ...state,
                info: state.info.concat(data),
                hasMore: data.length === 6 ? true : false
            }
        default:
            return state
    }
}
import {
    set_homeInfo,
    set_heart,
    set_comment
} from '../constants/home'

const InitState = {
    info: [],
    hasMore: true
}


export const home = (state = InitState, action) => {
    let { type, data } = action
    let info = state.info.slice()
    switch(type) {
        case set_homeInfo:
            return {
                ...state,
                info: state.info.concat(data),
                hasMore: data.length === 6 ? true : false
            }
        case set_heart:
            let { isHeart, index } = data
            info[index].isHeart = isHeart
            if(isHeart) {
                info[index].thumbsUp++
            } else {
                info[index].thumbsUp--
            }
            return {
                ...state,
                info
            }
        case set_comment:
            let {
                index: commentIndex,
                nickName,
                comment
            } = data
            info[commentIndex].comment.push({
                commentName: nickName,
                comment
            })
            return {
                ...state,
                info
            }
        default:
            return state
    }
}
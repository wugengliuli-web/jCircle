import {
    set_homeInfo,
    set_heart,
    set_comment
} from '../constants/home'
import {
    add_dynamic
} from '../constants/releaseDynamics'
const InitState = {
    info: [],
    hasMore: true,
    pageIndex: 1,  //请求页数
	hasAjax: false
}


export const home = (state = InitState, action) => {
    let { type, data } = action
    let info = state.info.slice()
    switch(type) {
        case set_homeInfo:
            return {
                ...state,
                info: state.info.concat(data),
                hasMore: data.length === 6 ? true : false,
                hasAjax: true,
                pageIndex: state.pageIndex + 1
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
        case add_dynamic:
            info.unshift(data)
            return {
                ...state,
                info
            }
        default:
            return state
    }
}
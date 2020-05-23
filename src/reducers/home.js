import {
    set_homeInfo,
    set_heart,
    set_comment
} from '../constants/home'
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
                info: action.pageIndex === 1 ? data : info.concat(data),
                hasMore: data.length === 6 ? true : false,
                pageIndex: action.pageIndex === 1 ? 1 : state.pageIndex + 1
            }
        case set_heart:
            let { isHeart, index } = data
            info[index].isHeart = isHeart
            if(isHeart) {
                info[index].approveNum++
            } else {
                info[index].approveNum--
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
            if(info[commentIndex].comments) {
                info[commentIndex].comments.push({
                    username: nickName,
                    content: comment
                })
            } else {
                info[commentIndex].comments = [{
                    username: nickName,
                    content: comment
                }]
            }
            return {
                ...state,
                info
            }
        default:
            return state
    }
}
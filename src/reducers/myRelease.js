import { SET_MYRELEASE } from '../constants/myRelease'
import {
    add_dynamic
} from '../constants/releaseDynamics'
const InitState = {
    release: [], //我的发布
    hasAjax: false, //判断是否发起第一次请求
    pageIndex: 1,
    hasMore: true
}


export const myRelease = (state = InitState, action) => {
    const { type, data } = action
    switch(type) {
        case SET_MYRELEASE:
            return {
                ...state,
                pageIndex: state.pageIndex + 1,
                release: state.release.concat(data),
                hasAjax: true,
                hasMore: data.length === 6 ? true : false
            }
        case add_dynamic:
            return {
                ...state,
                release: [data, ...state.release]
            }
        default:
            return state
    }
}
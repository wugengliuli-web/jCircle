import { SET_MYRELEASE, DEL_MYRELEASE } from '../constants/myRelease'
import {
    add_dynamic
} from '../constants/releaseDynamics'
const InitState = {
    release: [], //我的发布
    pageIndex: 1,
    hasMore: true
}


export const myRelease = (state = InitState, action) => {
    const { type, data } = action
    let info = state.release.slice()
    switch(type) {
        case SET_MYRELEASE:
            return {
                ...state,
                pageIndex: state.pageIndex + 1,
                release: action.pageIndex === 1 ? data : info.concat(data),
                hasMore: data.length === 6 ? true : false
            }
        case DEL_MYRELEASE:
            info.splice(action.index, 1)
            console.log(info, action.index)
            return {
                ...state,
                release: info
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
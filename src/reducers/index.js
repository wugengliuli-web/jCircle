import { combineReducers } from 'redux'
import { home } from '../reducers/home'
import { userInfo } from '../reducers/userInfo'
import { myRelease } from '../reducers/myRelease'
export default combineReducers({
    home,
    userInfo,
    myRelease
})

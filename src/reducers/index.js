import { combineReducers } from 'redux'
import { home } from '../reducers/home'
import { userInfo } from '../reducers/userInfo'
export default combineReducers({
    home,
    userInfo
})

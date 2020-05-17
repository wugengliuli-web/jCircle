import { combineReducers } from 'redux'
import { home } from '../reducers/home'
import { userInfo } from '../reducers/userInfo'
import { myRelease } from '../reducers/myRelease'
import {recommend} from "../reducers/recommend";

export default combineReducers({
    home,
    userInfo,
    myRelease,
    recommend
})

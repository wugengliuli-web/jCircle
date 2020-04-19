import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import { setUserInfoAction } from '../../actions/userInfo'
@connect(({ userInfo }) => ({ userInfo }))
class Login extends Component {


    config = {
		navigationBarTitleText: '登录'
	}

    errMsg = 'getUserInfo:fail auth deny'

    render() {
        return (
            <View className="container">
                <Button open-type="getUserInfo" onGetUserInfo={this.getUserInfo}>授权登录</Button>
            </View>
        )
    }

    getUserInfo = async info => {
        let { detail } = info
        let { errMsg } = detail
        if(errMsg === this.errMsg) return
        let {
            userInfo: {
                avatarUrl, //头像地址
                nickName //用户名
            },
            signature, //个性签名
            iv
        } = detail
        let { dispatch } = this.props
        const action = setUserInfoAction({
            avatarUrl,
            nickName,
            signature,
            iv
        })
        await dispatch(action)
        Taro.redirectTo({
            url: '/pages/index/index'
        })
    }
}


export default Login
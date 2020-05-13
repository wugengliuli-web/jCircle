import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import { setUserInfoAction, login } from '../../actions/userInfo'
import loginImg from '../../static/img/unknown_user.png'

@connect(({ userInfo }) => ({ userInfo }))
class Login extends Component {
    config = {
        navigationBarTitleText: '登录'
    }

    errMsg = 'getUserInfo:fail auth deny'

    render() {
        return (
            <View className="container">
                <Image
                    className={'loginImg'}
                    src={loginImg}
                    mode={"aspectFit"}
                />
                <View className='loginTip'>未登录</View>
                <Button className='loginBtn' open-type="getUserInfo" onGetUserInfo={this.getUserInfo}>登录</Button>
            </View>
        )
    }

    getUserInfo = async info => {
        let { detail } = info
        let { errMsg } = detail
        if (errMsg === this.errMsg) return
        let {
            userInfo: {
                avatarUrl, //头像地址
                nickName //用户名
            },
            signature, //个性签名
            iv
        } = detail
        try {
            let { dispatch } = this.props
            const actionLogin = login({
                avatar: avatarUrl,
                remark: '',
                userName: nickName,
                wexId: signature
            })
            const res = dispatch(actionLogin)
            if(res) {
                const actionSave = setUserInfoAction({
                    avatarUrl,
                    nickName,
                    signature,
                    iv: signature
                })
                await dispatch(actionSave)
                Taro.redirectTo({
                    url: '/pages/index/index'
                })
            } else {
                Taro.showToast({
					title: '请求出错了',
					icon: 'none',
					duration: 2000
				})
            }
        } catch(err) {
            Taro.showToast({
                title: '请求出错了',
                icon: 'none',
                duration: 2000
            })
        }
    }
}


export default Login

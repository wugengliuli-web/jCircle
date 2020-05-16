import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { AtTabBar } from 'taro-ui'
import homepage_sel from '../../static/img/homepage_sel.png'
import homepage_unsel from '../../static/img/homepage_unsel.png'
import Yizan_sel from '../../static/img/Yizan_sel.png'
import Yizan_unsel from '../../static/img/Yizan_unsel.png'
import mine_sel from '../../static/img/mine_sel.png'
import mine_unsel from '../../static/img/mine_unsel.png'
import './index.scss'
import { connect } from '@tarojs/redux'
import { setUserInfoAction } from '../../actions/userInfo'
@connect(({ userInfo }) => ({ userInfo }))
class TabBar extends Component {
    static defaultProps = {
        InitIndex: 0
    }

    render() {
        let { InitIndex } = this.props
        return (
            <AtTabBar
                className="tabBar"
                fixed
                backgroundColor={'#fff'}
                color="rgba(0,0,0,0.3)"
                fontSize={'20px'}
                iconSize={'48px'}
                selectedColor="rgba(0,0,0,0.45)"
                tabList={[
                    {
                        title: '首页',
                        selectedImage: homepage_sel,
                        image: homepage_unsel
                    }, {
                        title: '易赞',
                        selectedImage: Yizan_sel,
                        image: Yizan_unsel
                    }, {
                        pagePath: '/pages/index/index',
                        title: '个人',
                        selectedImage: mine_sel,
                        image: mine_unsel
                    }
                ]}
                onClick={this.link}
                current={InitIndex}
            />
        )
    }

    link = async index => {
        let { InitIndex } = this.props
        if(index === 0) {
            if(InitIndex === 0) return
            Taro.redirectTo({
                url: '/pages/index/index'
            })
        } else if(index === 1) {
            if(InitIndex === 1) return
            Taro.redirectTo({
                url: '/pages/recommend/index'
            })
        } else {
            if(InitIndex === 2) return
            let { userInfo: { iv } } = this.props
            if(iv) {
                Taro.redirectTo({
                    url: '/pages/personalCenter/index'
                })
                return
            }
            //如果是点击的个人界面
            const res = await Taro.getSetting()
            let { authSetting } = res
            if(authSetting['scope.userInfo']) {
                //如果已经获得授权
                const req = await Taro.getUserInfo()
                let {
                    userInfo: {
                        avatarUrl, //头像地址
                        nickName, //用户名
                    },
                    signature, //个性签名
                    iv
                } = req
                //拿到信息后存储到store中
                const { dispatch } = this.props
                const action = setUserInfoAction({
                    avatarUrl,
                    nickName,
                    signature,
                    iv: signature
                })
                await dispatch(action)
                Taro.redirectTo({
                    url: '/pages/personalCenter/index'
                })
            } else {
                //没有授权就跳转到登录页面
                Taro.redirectTo({
                    url: '/pages/login/index'
                })
            }
        }
    }
}

TabBar.propTypes = {
    InitIndex: PropTypes.number.isRequired
}

export default TabBar
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Navigator } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import TabBar from '../../component/tabBar/index'
import activity from '../../static/img/activity.png'
import { AtIcon } from 'taro-ui'
import message from '../../static/img/message.png'
import application from '../../static/img/application.png'
@connect(({ userInfo }) => ({ userInfo }))
class PersonalCenter extends Component {
    config = {
		navigationBarTitleText: '个人中心'
    }
    options = [{
        icon: activity,
        title: '我的发布',
        url: '/pages/myRelease/index'
    }, {
        icon: application,
        title: '发布动态',
        url: '/pages/releaseDynamics/index'
    }]
    render() {
        let {
            avatarUrl,
            nickName,
            signature
        } = this.props.userInfo
        return (
            <View className="container">
                <View className="head">
                    <View className="left">
                        <View className="headImg">
                            <Image className="img" src={avatarUrl} mode="scaleToFill" />
                        </View>
                        <View className="UserInfo">
                            <View className="name">{nickName}</View>
                            {/* <View className="signature">{signature}</View> */}
                        </View>
                    </View>
                </View>
                <View className="contentWrapper">
                    {
                        this.options.map(item => {
                            return (
                                <Navigator className="container" key={item.icon} url={item.url}>
                                    <View className="wrapper">
                                        <View className="left">
                                            <Image className="img" mode="scaleToFill" src={item.icon} />
                                            <View className="title">{item.title}</View>
                                        </View>
                                        <View className="right">
                                            <AtIcon value='chevron-right' size='16' color='#a8aaac'></AtIcon>
                                        </View>
                                    </View>
                                </Navigator>
                            )
                        })
                    }
                </View>
                <TabBar InitIndex={2} />
            </View>
        )
    }
}


export default PersonalCenter
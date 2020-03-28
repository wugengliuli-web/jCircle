import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Image, Input } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
import { setUserInfoAction } from '../../actions/userInfo'
import {
    setHeartAction,
    setCommentAction
} from '../../actions/home'
//动态组件
@connect(({ userInfo }) => ({ userInfo }))
class Dynamic extends Component {
    state = {
        value: ''
    }
    render() {
        let { 
            userId,
            name,
            avatar,
            text,
            comment = [],
            thumbsUp,
            poster,
            time,
            isHeart,
            index: key
        } = this.props
        //最多只显示3张图片
        poster = poster ? poster.slice(0, 3) : []
        return (
            <View className="dynamicContainer">
                <View className="header">
                    <View className="left">
                        <Image lazyLoad mode="scaleToFill" className="avatar" src={avatar} />
                    </View>
                    <View className="right">
                        <View className="name">{name}</View>
                        <View className="time">{time}</View>
                    </View>
                </View>
                <View className="contentWrapper">
                    <View className="textWrapper">
                        {text}
                    </View>
                    <View className="postContainer">
                        {
                            poster.length === 1 ?
                            poster.map((item, index) => {
                                return <Image onClick={() => this.viewImage(index)} mode="scaleToFill" src={item} key={item} className="poster"></Image>
                            })
                            :
                            poster.map((item, index) => {
                                return <Image onClick={() => this.viewImage(index)} mode="center" src={item} key={item} className="poster"></Image>
                            })
                        }
                    </View>
                </View>
                <View className="thumbsUpWrapper">
                    <View className="left">点赞数: {thumbsUp}</View>
                    <View className="right" onClick={() => this.turnHeart(key)}>
                        <AtIcon value={isHeart ? 'heart-2' : 'heart'} size='16' color={isHeart ? 'red' : '#999'}></AtIcon>
                    </View>
                </View>
                <View className="commentWrapper">
                    {
                        comment.map((item, index) => {
                            return (
                                <View key={String(index)} className="comment">
                                    <View className="name">{item.commentName}</View>
                                    <View className="commentContent">：{item.comment}</View>
                                </View>
                            )
                        })
                    }
                </View>
                <View className="inputWrapper">
                    <Input
                        className="input"
                        type='text'
                        placeholder='评论'
                        value={this.state.value}
                        onInput={this.handleChange}
                        onConfirm={() => this.submit(key)}
                    />
                </View>
            </View>
        )
    }
    //浏览图片
    viewImage = index => {
        let { poster } = this.props
        Taro.previewImage({
            current: poster[index],
            urls: poster
        })
    }
    //点赞
    turnHeart = async index => {
        const { dispatch, userInfo: { iv: IV } } = this.props
        if(!IV) {
            Taro.showLoading({
                title: '登录中'
            })
            await this.isAuthorized()
            Taro.hideLoading()
        }
        const { userInfo: { iv, nickName }, dynamicID, isHeart } = this.props
        Taro.showLoading({
            title: '点赞中'
        })
        try {
            const action = setHeartAction(iv, dynamicID, !isHeart, index)
            const res = await dispatch(action)
            if(res) {
                Taro.showToast({
                    title: '点赞成功',
                    icon: 'success',
                    duration: 2000
                })
            } else {
                Taro.showToast({
                    title: '点赞失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        } catch(err) {
            Taro.showToast({
                title: '点赞失败',
                icon: 'none',
                duration: 2000
            })
        }
        Taro.hideLoading()
    }

    //修改评论
    handleChange = e => {
        let { target: { value } } = e
        this.setState({
            value
        })
    }

    //提交评论
    submit = async index => {
        const { dispatch, userInfo: { iv: IV } } = this.props
        const { value } = this.state
        //判断是否登录
        if(!IV) {
            Taro.showLoading({
                title: '登录中'
            })
            await this.isAuthorized()
            Taro.hideLoading()
        }
        const { userInfo: { iv, nickName }, dynamicID } = this.props
        Taro.showLoading({
            title: '评论中'
        })
        try {
            const action = setCommentAction(iv, dynamicID, nickName, index, value)
            const res = await dispatch(action)
            console.log(res)
            if(res) {
                Taro.showToast({
                    title: '评论成功',
                    icon: 'success',
                    duration: 2000
                })
                this.setState({
                    value: ''
                })
            } else {
                Taro.showToast({
                    title: '评论失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        } catch(err) {
            Taro.showToast({
                title: '评论失败',
                icon: 'none',
                duration: 2000
            })
        }
        Taro.hideLoading()
    }

    //是否已经授权
    isAuthorized = async () => {
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
                iv
            })
            await dispatch(action)
        } else {
            //没有授权就跳转到登录页面
            Taro.redirectTo({
                url: '/pages/login/index'
            })
        }
    }
}

Dynamic.propTypes = {
    userId: PropTypes.string.isRequired,  //id
    name: PropTypes.string.isRequired,  //名字
    avatar: PropTypes.string.isRequired,  //头像
    text: PropTypes.string.isRequired,  //动态内容
    comment: PropTypes.array.isRequired,  //评论
    thumbsUp: PropTypes.number.isRequired,  //点赞数
    poster: PropTypes.array.isRequired,  //动态图片
    time: PropTypes.string.isRequired,  //发布时间
    isHeart: PropTypes.bool,  //是否点赞
    index: PropTypes.number.isRequired, //索引
    dynamicID: PropTypes.string.isRequired //活动ID
}

export default Dynamic
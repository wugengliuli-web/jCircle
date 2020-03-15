import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Image, Input } from '@tarojs/components'
import './index.scss'
import { AtIcon } from 'taro-ui'
//动态组件
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
            comment,
            thumbsUp,
            poster,
            time,
            isHeart,
            index
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
                    <View className="right" onClick={() => turnHeart(index)}>
                        <AtIcon value={isHeart ? 'heart-2' : 'heart'} size='16' color={isHeart ? 'red' : '#999'}></AtIcon>
                    </View>
                </View>
                <View className="inputWrapper">
                    <Input
                        className="input"
                        type='text'
                        placeholder='评论'
                        value={this.state.value}
                        onInput={this.handleChange}
                        onConfirm={this.submit}
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
        const { dispatch } = this.props
        Taro.showLoading({
            title: '点赞中'
        })
        try {

        } catch(err) {

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
    submit = async () => {
        console.log('submit')
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
    index: PropTypes.number.isRequired //索引
}

export default Dynamic
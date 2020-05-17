import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import Dynamic from '../../component/dynamic/index'
import Skeleton from 'taro-skeleton'
import { getMyReleaseAction } from '../../actions/myRelease'
@connect(({ myRelease, userInfo }) => ({ myRelease, userInfo }))
class MyRelease extends Component {

    config = {
		navigationBarTitleText: '我的发布'
    }

    size = 6
    state = {
        loading: true
    }

    async componentDidMount() {
        //判断是否请求过
        const { dispatch, userInfo: { iv: id } } = this.props
        try {
            const action = getMyReleaseAction(id, this.size, 1)
            const res = await dispatch(action)
            if(!res) {
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
        this.setState({
            loading: false
        })
    }


    render() {
        const { loading } = this.state
        const { myRelease: { release, hasMore } } = this.props
        return (
            <View>
                {
                    release.map((item, index) => (
                        <Dynamic
                            isMy={true}
                            className='dynamicWrapper' 
                            key={item.id}
                            userId={item.wexId}  //用户id
                            name={item.userName}  //用户名
                            avatar={item.avatar} //用户头像
                            text={item.content || []}  //用户动态内容
                            comment={item.comments || []}  //评论
                            thumbsUp={item.approveNum} //点赞数
                            poster={item.images || []} //动态图片
                            time={item.updateTime || ''}
                            isHeart={item.isHeart ? true : false}
                            index={index}
                            dynamicID={item.id}  //活动id
                        />
                    ))
                }
                <Skeleton
					title
					avatar
					row={2}
					loading={loading}
					animateName={'elastic'}
				></Skeleton>
				<Skeleton
					title
					avatar
					row={2}
					loading={loading}
					animateName={'elastic'}
				></Skeleton>
                {
					loading ?
					null
					:
					<View onClick={this.getMore} className="more">{hasMore ? '加载更多' : '已无更多'}</View>
				}
            </View>
        )
    }

    getMore = async e => {
        const { dispatch, myRelease: { pageIndex, hasMore }, userInfo: { iv: id, nickName, avatarUrl } } = this.props
        if(!hasMore) return
        this.setState({
            loading: true
        })
        try {
            const action = getMyReleaseAction(id, this.size, pageIndex, nickName, avatarUrl)
            const res = await dispatch(action)
            if(!res) {
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
        this.setState({
            loading: false
        })
    }

}

export default MyRelease
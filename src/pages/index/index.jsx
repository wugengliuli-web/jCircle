import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import TabBar from '../../component/tabBar/index'
import { connect } from '@tarojs/redux'
import { getHomeInfoAction } from '../../actions/home'
import Skeleton from 'taro-skeleton'
import Dynamic from '../../component/dynamic/index'
@connect(({ home, userInfo }) => ({ home, userInfo }))
class Index extends Component {
	size = 6  //每页请求多少个
	state = {
		loading: true
	}
	config = {
		navigationBarTitleText: '首页'
	}

	async componentDidMount() {
		const { userInfo: { iv: id } } = this.props
		let { dispatch } = this.props
		try {
			const action = getHomeInfoAction(1, this.size, id)
			const result = await dispatch(action)
			if(!result) {
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
		let { loading } = this.state
		let { info, hasMore } = this.props.home
		return (
			<View className="container">
				{
					this.hasAjax && !loading && info.length === 0 ?
					<View className="noData">暂无动态~~</View>
					:
					<View className="contentWrapper">
						{
							info.map((item, index) => {
								return <Dynamic
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
							})
						}
					</View>
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
				<TabBar InitIndex={0} />
			</View>
		)
	}


	getMore = async () => {
		const { home: { hasMore, pageIndex }, userInfo: { iv: id } } = this.props
		if(!hasMore) return
		let { dispatch } = this.props
		this.setState({
			loading: true
		})
		try {
			const action = getHomeInfoAction(pageIndex + 1, this.size, id)
			const result = await dispatch(action)
			if(!result) {
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

export default Index

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import TabBar from '../../component/tabBar/index'
import { connect } from '@tarojs/redux'
import { getHomeInfo } from '../../actions/home'
import Skeleton from 'taro-skeleton'
import Dynamic from '../../component/dynamic/index'
@connect(({ home }) => ({ home }))
class Index extends Component {

	hasAjax = false
	pageIndex = 1  //请求页数
	size = 6  //每页请求多少个
	state = {
		loading: true
	}

	async componentDidMount() {
		let { dispatch } = this.props
		if(!this.hasAjax) {
			// 如果还未发送请求
			this.hasAjax = true
			try {
				const action = getHomeInfo(this.pageIndex, this.size)
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
			this.pageIndex++
			this.setState({
				loading: false
			})
		}
	}

	render() {
		let { loading } = this.state
		let { info } = this.props.home
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
									id={item.id}  //用户id
									name={item.name}  //用户名
									avatar={item.avatar} //用户头像
									text={item.text}  //用户动态内容
									comment={item.comment}  //评论
									thumbsUp={item.thumbsUp} //点赞数
									poster={item.poster} //动态图片
									time={item.time}
									isHeart={item.isHeart ? true : false}
									index={index}
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
				<TabBar InitIndex={0} />
			</View>
		)
	}
}

export default Index

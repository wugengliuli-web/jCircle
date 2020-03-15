import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'
import TabBar from '../../component/tabBar/index'
class Index extends Component {
	render() {
		return (
			<View>
				aaa
				<TabBar InitIndex={0} />
			</View>
		)
	}
}

export default Index

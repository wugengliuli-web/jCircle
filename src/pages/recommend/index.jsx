import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import TabBar from '../../component/tabBar/index'
import './index.scss'
import { connect } from '@tarojs/redux'

@connect(({ userInfo }) => ({ userInfo }))
class Recommend extends Component {
  config = {
    navigationBarTitleText: '推荐'
  }

  render(){
    return(
      <View className='container'>

        <TabBar InitIndex={1} />
      </View>
    )
  }

}
export default Recommend

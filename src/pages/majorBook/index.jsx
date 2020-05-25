import {AtList, AtListItem} from 'taro-ui'
import Skeleton from 'taro-skeleton'
import {connect} from '@tarojs/redux'
import Taro, {Component} from '@tarojs/taro'
import {View, Picker} from '@tarojs/components'
import {getList} from '../../actions/majorBook'
import './index.scss'


@connect(({majorBook}) => ({majorBook}))
class MajorBook extends Component {
  config = {
    navigationBarTitleText: '专业书籍查询'
  };

  state = {
    loading: true,
    selector: ['软件工程', '计算机科学与技术', '信息安全', '医学影像'],
    selectorChecked: '软件工程'
  };

  getList = async (params) => {
    const {dispatch} = this.props;
    const defaultParams = {
      major: 0
    };

    const param = params || defaultParams;

    let action = getList({...param});
    const result = await dispatch(action);
    if (!result) {
      Taro.showToast({
        title: '请求出错了',
        icon: 'none',
        duration: 2000
      });
    }
    this.setState({
      loading: false
    })
  };

  async componentDidMount() {
    this.getList()
  }

  onChange = e => {
    const params = {
      major: Number(e.detail.value)
    };
    this.getList(params)
    this.setState({
      selectorChecked: this.state.selector[e.detail.value],
      loading: true
    });
  };

  render() {
    let {loading} = this.state;
    const {majorBook: {data}} = this.props;
    return (
      <View className='container'>
        <View>
          <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
            <AtList>
              <AtListItem
                title='请选择专业'
                extraText={this.state.selectorChecked}
              />
            </AtList>
          </Picker>
        </View>
        <View>
          {data.length !== 0 ?
            data.map((item, index) => {
              return <View key={index}>
                <AtList>
                  <AtListItem
                    title={item.bookName}
                    extraText={String(index + 1)}
                  />
                </AtList>
              </View>
            }) :
            <View className='noMore'>
              暂无信息
            </View>
          }
        </View>
        <Skeleton
          row={3}
          loading={loading}
          animateName='elastic'
        />
      </View>
    )
  }
}

export default MajorBook

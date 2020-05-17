import {AtSegmentedControl } from 'taro-ui'
import Skeleton from 'taro-skeleton'
import {connect} from '@tarojs/redux'
import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {getBookList, getFilmList} from '../../actions/recommend'
import './index.scss'

const filmSelect = 0;
const bookSelect = 1;
const TYPE = {
  BOOK: 'book',
  FILM: 'film'
};

@connect(({recommend}) => ({recommend}))
class Recommend extends Component {
  config = {
    navigationBarTitleText: '推荐'
  };

  state = {
    loading: true,
    current: 0,
  };

  getList = async (type,isMore) => {
    const {dispatch,recommend:{bookPageIndex,filmPageIndex}} = this.props;
    const bookPageParams = {
      currentPage:  1,
      pageSize: 10
    };
    const filmPageParams = {
      currentPage:  1,
      pageSize: 10
    };
    if(isMore){
      bookPageParams.currentPage=bookPageIndex;
      filmPageParams.currentPage=filmPageIndex;
    }


    let action;
    switch (type) {
      case TYPE.BOOK:
        action = getBookList({...bookPageParams});
        return await dispatch(action);
      case TYPE.FILM:
        action = getFilmList({...filmPageParams});
        return await dispatch(action);
      default:
        return false;
    }
  };

  handleClick(value) {
    this.setState({
      loading: true,
      current: value
    });
    switch (value) {
      case filmSelect:
        this.getList(TYPE.FILM)
          .then(result => {
            if(!result) {
              Taro.showToast({
                title: '请求出错了',
                icon: 'none',
                duration: 2000
              });
            }
            this.setState({
              loading: false
            });
          })
          .catch(e => {
            console.log(e);
            Taro.showToast({
              title: '请求出错了',
              icon: 'none',
              duration: 2000
            })
          });
        break;
      case bookSelect:
        this.getList(TYPE.BOOK)
          .then(result => {
            if(!result) {
              Taro.showToast({
                title: '请求出错了',
                icon: 'none',
                duration: 2000
              });
            }
            this.setState({
              loading: false
            });
          })
          .catch(e => {
            console.log(e);
            Taro.showToast({
              title: '请求出错了',
              icon: 'none',
              duration: 2000
            })
          });
        break;
      default:
        Taro.showToast({
          title: '请求出错了',
          icon: 'none',
          duration: 2000
        })
    }
  }

  async componentDidMount() {
    this.getList(TYPE.FILM)
      .then(result => {
        if(!result) {
          Taro.showToast({
            title: '请求出错了',
            icon: 'none',
            duration: 2000
          })
        }
        this.setState({
          loading: false
        })
      })
      .catch(e => {
        console.log(e);
        Taro.showToast({
          title: '请求出错了',
          icon: 'none',
          duration: 2000
        })
      });
  }

  getBookMore = async () => {
    let {recommend:{hasBookMore}}=this.props;
    if(!hasBookMore) return;
    this.getList(TYPE.BOOK,true)
  };
  getFilmMore = async ()=> {
    let {recommend:{hasFilmMore}}=this.props;
    if(!hasFilmMore) return;
    this.getList(TYPE.FILM,true)
  };

  render() {
    let {loading} = this.state;
    let {recommend:{bookRow,filmRow,hasBookMore,hasFilmMore}}=this.props;
    console.log(this.props)
    return (
      <View className='container'>
        <AtSegmentedControl
          values={['电影推荐', '书籍推荐']}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
        {
          this.state.current === 0
            ? <View className='tab-content'>
              {
                filmRow.map((item,index)=>{
                  return <View key={index} className='itemView'>
                    <View className='itemTitle'>{item.title}</View>
                    <View className='itemIntro'>{item.recIntroduce}</View>
                  </View>
                })
              }
              <Skeleton
                row={3}
                loading={loading}
                animateName='elastic'
              />
              {
                loading ?
                  null
                  :
                  <View onClick={this.getFilmMore} className='more'>{hasFilmMore ? '加载更多' : '已无更多'}</View>
              }
            </View>
            : null
        }
        {
          this.state.current === 1
            ? <View className='tab-content'>
              {
                bookRow.map((item,index)=>{
                  return <View key={index} className='itemView'>
                    <View className='itemTitle'>{item.title}</View>
                    <View className='itemIntro'>{item.recIntroduce}</View>
                  </View>
                })
              }
              <Skeleton
                row={3}
                loading={loading}
                animateName='elastic'
              />
              {
                loading ?
                  null
                  :
                  <View onClick={this.getBookMore} className='more'>{hasBookMore ? '加载更多' : '已无更多'}</View>
              }
            </View>
            : null
        }


      </View>
    )
  }

}

export default Recommend

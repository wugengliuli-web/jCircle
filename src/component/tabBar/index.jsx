import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { AtTabBar } from 'taro-ui'
import homepage_sel from '../../static/img/homepage_sel.png'
import homepage_unsel from '../../static/img/homepage_unsel.png'
import Yizan_sel from '../../static/img/Yizan_sel.png'
import Yizan_unsel from '../../static/img/Yizan_unsel.png'
import mine_sel from '../../static/img/mine_sel.png'
import mine_unsel from '../../static/img/mine_unsel.png'
import './index.scss'
class TabBar extends Component {
    static defaultProps = {
        InitIndex: 0
    }

    render() {
        let { InitIndex } = this.props
        return (
            <AtTabBar
                className="tabBar"
                fixed
                backgroundColor={'#fff'}
                color="rgba(0,0,0,0.3)"
                fontSize={'20px'}
                iconSize={'48px'}
                selectedColor="rgba(0,0,0,0.45)"
                tabList={[
                    {
                        title: '首页',
                        selectedImage: homepage_sel,
                        image: homepage_unsel
                    }, {
                        title: '易赞',
                        selectedImage: Yizan_sel,
                        image: Yizan_unsel
                    }, {
                        pagePath: '/pages/index/index',
                        title: '个人',
                        selectedImage: mine_sel,
                        image: mine_unsel
                    }
                ]}
                onClick={this.link}
                current={InitIndex}
            />
        )
    }

    link = index => {
        if(index === 0) {

        } else if(index === 1) {

        } else {

        }
    }
}

TabBar.propTypes = {
    InitIndex: PropTypes.number.isRequired
}

export default TabBar
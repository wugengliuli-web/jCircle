import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtTextarea, AtButton } from 'taro-ui'
import add_poster from '../../static/img/add_poster.png'
import { connect } from '@tarojs/redux'
import { addDynamicAction, uploadFileAction } from '../../actions/releaseDynamics'

@connect(({ userInfo }) => ({ userInfo }))
class ReleaseDynamics extends Component {
    config = {
		navigationBarTitleText: '发布动态'
    }
    state = {
        val: '',
        poster: [],
        loading: false
    }

    maxSize = 1024 * 1024 * 1

    render() {
        let { poster, loading, val } = this.state
        return (
            <View className="container">
                <AtTextarea
                    value={this.state.val}
                    onChange={this.handleChange}
                    maxLength={200}
                    placeholder='说点什么吧'
                />
                <View className="imgWrapper">
                    {
                        poster.map((item, index) => {
                            return <Image onClick={e => this.viewImg(index)} key={String(index)} src={item} mode="center" className="img" />
                        })
                    }
                    {
                        poster.length === 3 ?
                        null
                        :
                        <View className="addImg" onClick={e => this.addImg()}>
                            <Image className="img" src={add_poster} />
                        </View>
                    }
                </View>
                <AtButton onClick={this.submit} disabled={val.length < 3} loading={loading} className="btn" type='primary'>发布动态</AtButton>
            </View>
        )
    }

    handleChange = info => {
        this.setState({
            val: info
        })
    }

    addImg = async e => {
        try {
            const res = await Taro.chooseImage({
                count: 1
            })
            let { tempFilePaths, tempFiles } = res
            let { poster } = this.state
            const { size } = tempFiles[0]
            if(size > this.maxSize) {
                Taro.showToast({
                    title: '图片太大,限制1MB',
                    icon: 'none',
                    duration: 2000
                })
                return 
            }
            poster.push(tempFilePaths[0])
            this.setState({
                poster
            })
        } catch(err) {
            
        }
    }

    viewImg = index => {
        let { poster } = this.state
        Taro.previewImage({
            current: poster[index],
            urls: poster
        })
    }

    upLoadFile = async filePath => {
        const { dispatch } = this.props
        const action = await uploadFileAction(filePath)
        const res = await dispatch(action)
        return res
    }


    submit = async () => {
        this.setState({
            loading: true
        })
        try {
            //先上传图片
            let { userInfo: { iv }, dispatch } = this.props
            let { val, poster } = this.state
            const imgRes = await Promise.all(poster.map(item => this.upLoadFile(item)))
            const action = addDynamicAction(iv, val, imgRes)
            const res = await dispatch(action)
            if(res) {
                Taro.showToast({
                    title: '发布成功',
                    icon: 'success',
                    duration: 2000
                })
                setTimeout(function() {
                    Taro.reLaunch({
                        url: '/pages/index/index'
                    })
                }, 2000)
            } else {
                Taro.showToast({
                    title: '发布失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        } catch(err) {
            Taro.showToast({
                title: '发布失败',
                icon: 'none',
                duration: 2000
            })
        }
        this.setState({
            loading: false
        })
    }
}

export default ReleaseDynamics
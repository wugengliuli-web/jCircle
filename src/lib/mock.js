const delay = require('mocker-api/utils/delay'); // 延时 模拟请求异步问题
const Mock = require('mockjs');

const data = {
    'GET /api/getList': (req, res) => {
        res.status('200').json(Mock.mock({
            result: 0,
            'data|6': [{
                dynamicID: '@id', //动态id
                id: '@id',  //发布人id
                avatar: '@image(300x400, @color, @color, @word(5))',  //发布人头像
                name: '@cname(3, 5)',  //发布人姓名
                text: '@ctitle(10, 50)',  //内容
                'comment|0-3': [{
                    commentName: '@cname(3, 5)',
                    comment: '@ctitle(10, 20)'
                }],
                thumbsUp: '@integer(0,50)',  //点赞数
                'poster|0-5': [
                    '@image(300x400, @color, @color, @word(5))'
                ],
                time: '@datetime'
            }]
        }))
    },
    'POST /api/setHeart': (req, res) => {
        res.status('200').json({
            result: 0
        })
    },
    'POST /api/setComment': (req, res) => {
        res.status('200').json({
            result: 0
        })
    },
    'POST /api/addDynamic': (req, res) => {
        let { body: { userID, nickName, value, poster, avatarUrl } } = req
        res.status('200').json(Mock.mock({
            result: 0,
            data: {
                dynamicID: '@id', //动态id
                id: userID,
                name: nickName,
                text: value,
                comment: [],
                thumbsUp: 0,
                poster,
                time: '@now',
                avatar: avatarUrl
            }
        }))
    },
    'GET /api/getMyRelease': (req, res) => {
        const { id, nickName, avatarUrl } = req.query
        res.status('200').json(Mock.mock({
            result: 0,
            'data|1-2': [{
                dynamicID: '@id', //动态id
                id: id,  //发布人id
                avatar: avatarUrl,  //发布人头像
                name: nickName,  //发布人姓名
                text: '@ctitle(10, 50)',  //内容
                'comment|0-3': [{
                    commentName: '@cname(3, 5)',
                    comment: '@ctitle(10, 20)'
                }],
                thumbsUp: '@integer(0,50)',  //点赞数
                'poster|0-5': [
                    '@image(300x400, @color, @color, @word(5))'
                ],
                time: '@datetime'
            }]
        }))
    }
}

module.exports = delay(data, 500)
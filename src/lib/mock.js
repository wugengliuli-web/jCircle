const delay = require('mocker-api/utils/delay'); // 延时 模拟请求异步问题
const Mock = require('mockjs');

const data = {
    'GET /api/getList': (req, res) => {
        res.status('200').json(Mock.mock({
            result: 0,
            'data|6': [{
                id: '@id',  //发布人id
                avatar: '@image(300x400, @color, @color, @word(5))',  //发布人头像
                name: '@ctitle(3,5)',  //发布人姓名
                text: '@ctitle(10, 50)',  //内容
                'comment|0-3': [  //评论
                    '@ctitle(10, 20)'
                ],
                thumbsUp: '@integer(0,50)',  //点赞数
                'poster|0-5': [
                    '@image(300x400, @color, @color, @word(5))'
                ],
                time: '@datetime'
            }]
        }))
    }
}

module.exports = delay(data, 2000)
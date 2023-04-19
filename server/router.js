// 用于配置路由
let express = require('express')
let router = express.Router()
// 这里mydata数据库的表名是user
// http://127.0.0.1/data 后缀叫什么没有关系// localhost/data 主机名修改为localhost
/* let user = require('./API/api')
router.get('/user', user.get) */

/* router.get('/list/all', info.all)
router.get('/list/get', info.get)
router.get('/list/add', info.add)
router.get('/list/update', info.update) */

let seardata = require('./API/api')
// router.get('/getHttpList', seardata.getHttpList)
for (let method in seardata) {
    router.get('/' + method, seardata[method])
}

// ⭐del
let deldata = require('./API/del')
// router.get('/delHttpList', deldata.delHttpList)
for (let method in deldata) {
    router.get('/' + method, deldata[method])
}

// ⭐add
let adddata = require('./API/add')
// router.get('/list/add', info.add)
for (let method in adddata) {
    router.get('/' + method, adddata[method])
}

// ⭐update
let updatedata = require('./API/update')
// router.get('/list/add', info.add)
for (let method in updatedata) {
    router.get('/' + method, updatedata[method])
}










module.exports = router

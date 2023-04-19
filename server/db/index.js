// 配置数据库相关信息
let mysql = require('mysql')

let db = mysql.createPool({
    // host: '127.0.0.1',     //数据库IP地址
    host: 'localhost',     //数据库IP地址
    user: 'root',          //数据库登录账号
    password: 'root',      //数据库登录密码
    database: 'mydata',      //要操作的数据库， 库=》表=》字段
    port: '3306'
})
module.exports = db

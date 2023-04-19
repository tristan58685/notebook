// 用于操作数据库
let db = require('../db/index')

//查询库里的哪一个表
exports.getNotelist = (req, res) => {
    db.query('select * from note_list', (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            status: 200,
            data: data
        })
    })

}
exports.getTodolist = (req, res) => {
    // db.query('select * from todo_list', (err, data) => {
    //     if (err) {
    //         return res.send('错误：' + err.message)
    //     }
    //     res.send(data)
    // })
    db.query('select * from todo_list l left outer join todoitem_list r on l.id = r.id', (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        console.log(data);
        res.send(data)
    })
}
exports.getCountdownlist = (req, res) => {
    db.query('select * from countdown_list', (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            status: 200,
            data: data
        })
    })
}
exports.getHttpList = (req, res) => {
    db.query('select * from http_list', (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            status: 200,
            data: data
        })
    })
}

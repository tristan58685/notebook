// 用于操作数据库
let db = require('../db/index')

// 和add方法基本一致，sql根据不同情况做修改
exports.upNotelist = (req, res) => {
    var sql
    if (req.body.params.type === 'name') {
        sql = 'update note_list set name=? where id = ?'

    } else {
        sql = 'update note_list set text=? where id = ?'

    }     //通过id更新数据
    db.query(sql, [req.body.params.value, req.body.params.id], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        if (data.changedRows > 0) {
            res.send({
                status: 200,
                message: 'success'
            })
        } else {
            res.send({
                status: 202,
                message: 'error'
            })
        }
    })
}
exports.upTodolist = (req, res) => {        //通过id更新数据
    var sql = 'update todo_list set name = ?, address = ?, tel = ? where id = ?'
    db.query(sql, [req.query.name, req.query.address, req.query.tel, req.query.id], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        if (data.changedRows > 0) {
            res.send({
                status: 200,
                message: 'success'
            })
        } else {
            res.send({
                status: 202,
                message: 'error'
            })
        }
    })
}
exports.upCountdownlist = (req, res) => {
    // var sql = 'update countdown_list  where countdown = ?'
    var sql = 'update countdown_list set countdown=?'
    db.query(sql, [req.body.params.countdown], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        console.log(data);
        if (data.changedRows > 0) {
            res.send({
                status: 200,
                message: 'success'
            })
        } else {
            res.send({
                status: 202,
                message: 'error'
            })
        }
    })
}
exports.upHttpList = (req, res) => {        //通过id更新数据
    // [req.query.id, req.query.locations, req.query.nickname]
    var sql = 'update http_list set locations = ?, nickname = ?where id = ?'
    db.query(sql, [req.body.params.locations, req.body.params.nickname, req.body.params.id], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        if (data.changedRows > 0) {
            res.send({
                status: 200,
                message: 'success'
            })
        } else {
            res.send({
                status: 202,
                message: 'error',
                data: Data
            })
        }
    })
}

/* exports.update = (req, res) => {        //通过id更新数据
    var sql = 'update info set name = ?, address = ?, tel = ? where id = ?'
    db.query(sql, [req.query.name, req.query.address, req.query.tel, req.query.id], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        if (data.changedRows > 0) {
            res.send({
                status: 200,
                message: 'success'
            })
        } else {
            res.send({
                status: 202,
                message: 'error'
            })
        }
    })
} */
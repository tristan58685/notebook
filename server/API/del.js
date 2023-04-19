// 用于操作数据库
let db = require('../db/index')

/* exports.all = (req, res) => {        //获取info表全部数据
    var sql = 'select * from info'
    db.query(sql, (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
} */
/* exports.get = (req, res) => {        //通过id查询数据
    var sql = 'select * from info where id = ?'    //？用于占位
    db.query(sql, [req.query.id], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
} */
// ⭐删除数据
exports.delNotelist = (req, res) => {        //通过id删除数据
    var sql = 'delete from note_list where id = ?'
    db.query(sql, [req.query.id], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        if (data.affectedRows > 0) {
            res.send({
                status: 200,
                message: '删除成功'
            })
        } else {
            res.send({
                status: 202,
                message: '删除失败'
            })
        }
    })
}
exports.delTodolist = (req, res) => {        //通过id删除数据
    var sql = 'delete from todo_list where id = ?'
    db.query(sql, [req.query.id], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        if (data.affectedRows > 0) {
            res.send({
                status: 200,
                message: '删除成功'
            })
        } else {
            res.send({
                status: 202,
                message: '删除失败'
            })
        }
    })
}
exports.delCountdownlist = (req, res) => {        //通过id删除数据
    var sql = 'delete from countdown_list where id = ?'
    db.query(sql, [req.query.id], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        if (data.affectedRows > 0) {
            res.send({
                status: 200,
                message: '删除成功'
            })
        } else {
            res.send({
                status: 202,
                message: '删除失败'
            })
        }
    })
}

exports.delHttpList = (req, res) => {        //通过id删除数据
    var sql = 'delete from http_list where id = ?'
    db.query(sql, [req.query.id], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        if (data.affectedRows > 0) {
            res.send({
                status: 200,
                message: '删除成功'
            })
        } else {
            res.send({
                status: 202,
                message: '删除失败'
            })
        }
    })
}








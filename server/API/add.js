// 用于操作数据库
let db = require('../db/index')

// 根据不同的数据去修改每个sql

exports.addNotelist = (req, res) => {    //向note_list表添加数据    
    var sql = 'insert into note_list (id,dropdownStatus,editStatus,name,nameHtml,showStatus,text) values (?,?,?,?)'
    db.query(sql, [req.query.id, req.query.dropdownStatus, req.query.editStatus, req.query.name, req.query.nameHtml, req.query.showStatus, req.query.text,], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        if (data.affectedRows > 0) {
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
exports.addTodolist = (req, res) => {    //向todo_list表添加数据     
    var sql = 'insert into todo_list (id,listName) values (?,?,?,?)'
    db.query(sql, [req.query.id, req.query.listName], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        if (data.affectedRows > 0) {
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
exports.addCountdownlist = (req, res) => {     //向countdown_list表添加数据   
    var sql = 'insert into countdown_list (countDown) values (?,?,?,?)'
    db.query(sql, [req.query.countDown], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        if (data.affectedRows > 0) {
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
exports.addHttpList = (req, res) => {     //向http_list表添加数据   
    var sql = 'insert into http_list (id,locations,nickname,) values (?,?,?,?)'
    db.query(sql, [req.query.id, req.query.locations, req.query.nickname], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        if (data.affectedRows > 0) {
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

/* exports.add = (req, res) => {        //向info表添加数据
    var sql = 'insert into info (id,name,address,tel) values (?,?,?,?)'
    db.query(sql, [req.query.id, req.query.name, req.query.address, req.query.tel], (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        if (data.affectedRows > 0) {
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

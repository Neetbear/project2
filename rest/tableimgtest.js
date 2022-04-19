const mysql = require('./mysqlcon'); //여기서는 ./mysqlcon

const fs = require('fs');
var tmp = fs.readdirSync('./views/img/skin');

//TABLE imagetest 생성 -> mysql 수정 후 데이터 삽입

tmp.forEach(element => {
    let str = '';
    let test = fs.readdirSync(`./views/img/skin/${element}`);
    test.forEach(val => {
        str += val + '/';
    });
    const sql = `SELECT * FROM imagetest WHERE champid=("${element}")`;
    try {
        mysql.getConnection((err, connection)=>{
            if(err) throw err;
            connection.query(sql, (err, result)=>{
                if(err) throw err;
                else {
                    if(result.length === 0){
                        connection.query(`INSERT INTO imagetest (champid, src) VALUES ("${element}", "${str}")`, (err, result) => {
                            if (err) throw err;
                        });
                    }
                }
            });
            connection.release();
        });
    } catch (err) {
        console.log(err);
    } 
});



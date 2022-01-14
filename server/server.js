const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require('body-parser');
const io = require('socket.io')(http, { cors: { origin: "*" } });

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const pool = require("./mysqlcon");

// 로그인
app.post("/api/signin", (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;

        var sQuery = `SELECT userid, userpassword, useraddress, usernickname FROM signuptestdb where userid='${req.body.signinid}'`;   
        connection.query(sQuery, (err, result, fields) => {
            if(err) throw err;

            console.log(result[0]);
            if(result.length == 0) {
                console.log("아이디 오류");
                connection.release();
                res.send({message: "id error"});
            }
            else if(req.body.signinid == result[0].userid) {
                if(req.body.signinpassword == result[0].userpassword) {
                    console.log("로그인 성공");
                    console.log(result[0])
                    connection.release();
                    res.send(result[0]);
                }
                else {
                    console.log("비밀번호 오류");
                    connection.release();
                    res.send({message: "password error"});
                }
            }; 
        });
    });
})

//회원가입
app.post("/api/signup", (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;

        var sQuery = `INSERT INTO signuptestdb  (userid, userpassword, usernickname, useremail, userphonenumber, useraddress, useraddressdetail, usercategory) 
            VALUES ('${req.body.userid}', '${req.body.userpassword}', '${req.body.usernickname}', '${req.body.useremail}', '${req.body.userphonenumber}', '${req.body.useraddress}', '${req.body.useraddressdetatil}', '')`;
        var checkQuery = `SELECT userid FROM signuptestdb where userid='${req.body.userid}'`;
        // var sQuery2 = `SELECT * FROM userboard WHERE userid=${req.session.uid}`;
        
        connection.query(checkQuery, (err, result, fields) => {
            if(err) res.send({err: err});

            if(result[0]) {
                connection.release();
                console.log("이미 존재하는 아이디");
                res.send({message: "ID already exist"});
            } else {
                connection.query(sQuery, (err, result, fields) => {
                    if(err) throw err;
                
                    console.log("회원가입성공");
                });
                connection.release();
            };
        });
    });
});

//회원정보수정
app.post("/api/changeuser", (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err;

    var sQuery = `UPDATE signuptestdb SET usernickname='${req.body.usernickname}', useremail='${req.body.useremail}', userphonenumber='${req.body.userphonenumber}', 
      useraddress='${req.body.useraddress}', useraddressdetail='${req.body.useraddressdetatil}' WHERE userid='${req.body.userid}'`;

    connection.query(sQuery, (err, result, fields) => {
      if(err) throw err;
      
      console.log("회원정보변경성공");
      connection.release();
    });
  });
});

//마이페이지
app.post("/api/mypage", (req, res) => {
  console.log(req.body.signinid);
  pool.getConnection((err, connection) => {
      if(err) throw err;

      var sQuery = `SELECT * FROM signuptestdb where userid='${req.body.signinid}'`;
      connection.query(sQuery, (err, result, fields) => {
          if(err) res.send({err: err});

          console.log(result[0]);
          connection.release();
          res.send(result[0]);
      });
  });
});

//게시판1
app.get("/api/mainboard", (req, res)=>{
  const sqlQuery = "SELECT * FROM board1;";
  pool.getConnection((err, connection) => {
    if(err) throw err;
    
    connection.query(sqlQuery, (err, result)=>{
      res.send(result);
      connection.release();
    })
  })
})

app.get("/api/board", (req, res)=>{ 
  const sqlQuery = "SELECT * FROM board1;";
  pool.getConnection((err, connection) => {
    if(err) throw err;
    
    connection.query(sqlQuery, (err, result)=>{
      res.send(result);
      connection.release();
    })
  })
})

//지도
app.post("/api/map", (req, res) => {
  res.render(MapContainer);
});

app.post("/api/board", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const addr = req.body.addr;
  const sqlQuery = `INSERT INTO board1 (title, content, addr) VALUES (?,?,?)`;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    
    connection.query(sqlQuery, [title, content, addr], (err, result) => {
      res.send('success!');
      connection.release();
    });
  });
});

app.post('/api/mainboard/:idx', function(req, res){
  var idx = req.params.idx; // :idx 로 맵핑할 req 값을 가져온다
  var title = req.body.title
  var sql = "SELECT idx, title, content, " +   
  "addr  from board1 where idx=?";
  pool.getConnection((err, connection) => {
    if(err) throw err;
      connection.query(sql, [idx],title, function(err, rows){  // 한개의 글만조회하기때문에 마지막idx에 매개변수를 받는다
          if(err) console.error("err : " + err);
          res.send(rows)
      });
  });
});

//혜지니
app.get("/goodspage/:goods_number", (req, res)=> {
  res.sendFile(path.join(__dirname, '../market/src/goodsupload.js'))
  db.connect(function(err) {
    const sqlQuery = "SELECT * FROM testgoods WHERE id = ?";
    db.query(sqlQuery, (err, result)=>{
      res.send(result[0]);
    })
  })
});

// 채팅
app.get('/api/chat', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM messages', (err, messages) => {
      // console.log(messages)
      res.send(JSON.stringify(messages))
    });
  });
});

pool.getConnection((err, connection) => {
  if(err) throw err;
  console.log('testing')
  io.on("connection", (socket) => {
    console.log('확인용')
    socket.on("init", (payload) => {
      console.log(payload);
    });

    socket.on("send message", (msg) => {
      // console.log(msg);
      io.emit("receive message", { name : msg.name , message : msg.message, time : msg.time});
      connection.query("INSERT INTO messages (name, msg, time) VALUES ('" + msg.name + "', '" + msg.message + "', now())", function (err, res) {
        if (err) console.error("err : " + err)
      });
      connection.query(`SELECT * FROM messages WHERE (name="${msg.name}")`, function (err, res) {
        if (err) console.error("err : " + err)
        io.emit('nickname', res)
      });
    });
  });
});

const port = 5001;
http.listen(port, () => console.log(`express is running on ${port}`));
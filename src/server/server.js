const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');
const { check, validationResult, body } = require('express-validator');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const mysql = require('mysql');
const fs = require('fs-extra');
const rfs = require('rotating-file-stream');

const host = require('../host');

require('dotenv').config();


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

const logDirectory = path.resolve('log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accesLogStream = rfs.createStream('access.log', {
  size: '10MB',
  interval: '10d',
  compress: 'gzip',
  path: logDirectory
});


app.use(logger("combined", {
  stream: accesLogStream
}));

//セッション初期化
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

//passport初期化
app.use(passport.initialize());
app.use(passport.session());

//passport初期化
app.use(passport.initialize());
app.use(passport.session());

//セッションのシリアライズ化
passport.serializeUser(function (user, done) {
  //console.log("Serialize..")
  done(null, user);
});

//セッションのデシリアライズ化
passport.deserializeUser(function (obj, done) {
  //console.log("DeSerialize..")
  done(null, obj);
});

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_KEY_SECRET,
  callbackURL: 'http://' + host.name +':'+ host.port + '/twitter/callback'
}, function (token, tokenSecret, profile, callback) {
  //console.log("認証しました")
  return callback(null, profile);
}));

//distディレクトリ内の静的ファイルにアクセス
app.use(express.static(path.resolve('./', 'dist')));


const con = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'bucketList'
});



app.get('/api/user', (req, res) => {
  if (req.session.passport != undefined) {
    res.send(req.session.passport.user);
  } else {
    res.status(404).send(null);
  }
})

app.post('/api/createlist', [
  body('title', "タイトルは1文字以上50文字以内で入力してください").isLength({ min: 1, max: 50 }).trim().escape(),
  body('items.*', "項目は1文字以上50文字以内で入力してください").isLength({ min: 1, max: 50 }).trim().escape()
], (req, res) => {

  const createRandomID = () => {
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let T = '';
    const N = 10;
    for (var i = 0; i < N; i++) {
      const n = Math.floor(Math.random() * S.length);
      T = T + S[n];
    }
    return T;
  }

  let list_id = createRandomID();
  const twitter_id = req.session.passport.user.id;
  const list_title = req.body.title;
  const items = req.body.items;
  var status = 200;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  try {
    items.forEach((item, index) => {
      con.query("insert into bucketlist values(?,?,?,?,?,?)",
        [twitter_id, list_id, list_title, index + 1, item, 0]);
    });
  } catch (error) {
    console.log(error);
    status = 500;
  } finally {
    res.status(status).send('');
  }

});



app.get('/api/listcatalog', async (req, res) => {
  const twitter_id = req.session.passport.user.id;
  con.query('select distinct list_id, list_title from bucketlist where twitter_id=? order by list_id', [twitter_id], (err, result1) => {
    if (err) {
      console.log(err);
    } else {
      con.query('select list_id, count(list_id) as total  from bucketlist where twitter_id=? group by list_id order by list_id', [twitter_id], (err, result2) => {
        if (err) {
          console.log(err);
        } else {
          con.query('select list_id , count(is_done=1 or null) as done from bucketlist where twitter_id=? group by list_id order by list_id', [twitter_id], (err, result3) => {
            if (err) {
              console.log(err);
            } else {
              const resultArray = [];
              for (let i = 0; i < result1.length; ++i) {
                resultArray.push({ ...result1[i], ...result2[i], ...result3[i] });
              }
              //console.log(resultArray);
              res.send(resultArray);
            }
          })
        }
      })
    }
  })
  // [result1,field1] = await mysqlPromise.query(con,'select distinct list_id, list_title from bucketlist where twitter_id=? order by list_id',[twitter_id]);
  // console.log(result1);
  // [result2,field2] = await mysqlPromise.query(con,'select list_id, count(list_id) as total  from bucketlist where twitter_id=? group by list_id order by list_id',[twitter_id]);
  // console.log(result2);
  // [result3,field3] = await mysqlPromise.query(con,'select list_id , count(list_id) as done from bucketlist where twitter_id=? and is_done=1 group by list_id order_by list_id',[twitter_id]);
  // console.log(result3);
})


app.get('/api/listcatalog', (req, res) => {
  const twitter_id = req.session.passport.user.id;
  con.query('select distinct list_id, list_title  from bucketlist where twitter_id=?', [twitter_id], (error, result) => {
    if (error) console.log(error);
    else res.send(result);
  });
});


app.get('/api/list/:id', (req, res) => {
  const list_id = req.params.id;
  con.query("select list_title, item_id, item, is_done from bucketlist where list_id=?", [list_id], (error, result) => {
    if (error) { console.log(error); }
    res.send(result);
  });

})

app.put('/api/achievement/:list_id/:item_id', (req, res) => {
  con.query("update bucketlist set is_done = 1 where list_id = ? and item_id = ?", [req.params.list_id, req.params.item_id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send(result);
    } else {
      res.status(200).send(result);
    }
  });
})

app.delete('/api/deletelist/:list_id', (req, res) => {
  con.query('delete from bucketlist where list_id = ?', [req.params.list_id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send(result);
    } else {
      res.status(200).send(result);
    }
  });
})


app.get('/twitter/auth', passport.authenticate('twitter'));
app.get('/twitter/callback', passport.authenticate('twitter', {
  failureRedirect: '/'
}), function (req, res) {
  //console.log(req.session);
  res.redirect('/');
});

app.get('/api/logout',(req, res) => {
  req.session.destroy((err) => {
    if(err) console.log(err);
  });
  res.redirect('/');
})


app.get('*', function (req, res) {
  res.sendFile(path.resolve('./', 'dist', 'index.html'));
  //console.log(req.session);
})


app.listen(host.port,host.name, () => {
  process.setuid(1000);
  console.log('server running');
})


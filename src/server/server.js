const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const { ESRCH } = require('constants');
const TwitterStrategy = require('passport-twitter').Strategy;
const mysql = require('mysql');
const crypto = require('crypto');


require('dotenv').config();


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  callbackURL: 'http://127.0.0.1:3000/twitter/callback'
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

app.post('/api/createlist', (req, res) => {
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
  const json = {
    twitter_id : twitter_id,
    list_id : list_id,
    list_title : list_title,
    items : items
  }
  var status = 200;
  try {
    items.forEach((item, index) => {
      con.query("insert into bucketlist values(?,?,?,?,?,?)",
        [twitter_id, list_id, list_title, index + 1, item, 0]);
    });
  } catch (error) {
    console.log(error);
    status = 500;
  }finally{
    res.status(status).send(json);
  }

});



app.get('/api/listcatalog', (req,res) => {
  const twitter_id = req.session.passport.user.id;
  con.query('select distinct list_id, list_title  from bucketlist where twitter_id=?',[twitter_id],(error,result,fields)=> {
    console.log(result);
    res.send(result);
  })
});


app.get('/twitter/auth', passport.authenticate('twitter'));
app.get('/twitter/callback', passport.authenticate('twitter', {
  failureRedirect: '/'
}), function (req, res) {
  //console.log(req.session);
  res.redirect('/home');
});


app.get('*', function (req, res) {
  res.sendFile(path.resolve('./', 'dist', 'index.html'));
  //console.log(req.session);
})


app.listen(3000, () => {
  console.log('server running');
})


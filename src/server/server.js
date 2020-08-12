const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const { ESRCH } = require('constants');
const TwitterStrategy = require('passport-twitter').Strategy;

require('dotenv').config();


const app = express();

//セッション初期化
app.use(session({
    secret : 'secret-key',
    resave : true,
    saveUninitialized : false,
    //cookie : {secure:true}
  }));

//passport初期化
app.use(passport.initialize());
app.use(passport.session());

//passport初期化
app.use(passport.initialize());
app.use(passport.session());

//セッションのシリアライズ化
passport.serializeUser(function(user,done) {
  console.log("Serialize..")
  done(null,user);
});

//セッションのデシリアライズ化
passport.deserializeUser(function(obj, done) {
  console.log("DeSerialize..")
  done(null,obj);
});

passport.use(new TwitterStrategy({
  consumerKey : process.env.TWITTER_API_KEY,
  consumerSecret : process.env.TWITTER_API_KEY_SECRET,
  callbackURL : 'http://127.0.0.1:3000/twitter/callback'
},function(token,tokenSecret, profile, callback) {
  console.log("認証しました")
  return callback(null,profile);
}));

//distディレクトリ内の静的ファイルにアクセス
app.use(express.static(path.resolve('./','dist')));

app.get('/api',(req,res) => {
    res.send({
        api: 'test',
        api2: 'TEST'
    });
})

app.get('/api/user',(req,res) => {
  if(req.session.passport != undefined){
    res.send(req.session.passport.user);
  }else{
    res.send('404');
  }
})

app.get('/twitter/auth',passport.authenticate('twitter'));
app.get('/twitter/callback',passport.authenticate('twitter',{
  failureRedirect: '/'
}),function(req,res){
  console.log(req.session);
  res.redirect('/home');
});

app.get('*',function(req,res) {
    res.sendFile(path.resolve('./','dist','index.html'));
    console.log(req.session);
})

app.listen(3000, () => {
    console.log('server running');
})
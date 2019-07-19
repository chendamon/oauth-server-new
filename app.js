var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var bodyparser = require('body-parser');
var session = require('express-session');


// var OAuthServer = require('express-oauth-server');
// var models = require('./models/oauth');
var authorizeHandler = require('./middleware/authorizeHandler');
var oauth2server = require('./middleware/oauth2Server');

var app = express();
var router = express.Router();
//mongodb 数据库连接
mongoose.connect(config.get('mongoose:uri'),{useNewUrlParser:true,useCreateIndex:true});
mongoose.Promise = global.Promise;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyparser.json({ extended: false }));
app.use(bodyparser.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'sdfdasds-454-dfsadfa-sdfas',
  saveUninitialized:false,
  resave:true,
}));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// TODO: /oauth/authorise  /profile /register /login /
//07.10直接一上来就是authorize，不要什么applist了
app.use('/', router);
//Authorize part
router.route('/login').post(authorizeHandler.handleLogin,oauth2server.authorization);
router.route('/register').post(authorizeHandler.handleRegister,oauth2server.authorization);
router.route('/oauth/authorize')
  .get(authorizeHandler.verifyAuthorizeQuery,oauth2server.authorization)
  .post(oauth2server.authorize_pre,oauth2server.server.authorize({
    authenticateHandler: {
      handle: req => {
        console.log('[authenticatehandler] get req.session.user:',req.session.user.userId);
        return req.session.user;
      }
    }
  }));
//Token part
router.route('/oauth/token').post(oauth2server.token_pre,oauth2server.server.token({ }));
// router.route('/oauth/token').post((req,res)=>{
//   console.log('token req',req);
// });
//Authenticate part
router.route('/userinfo').get(oauth2server.server.authenticate({
}),oauth2server.userinfo);
// router.route('/userinfo').get((req,res)=>{
//   console.log('info req',req);
// });

module.exports = app;

//nodemon 代码更改后自动refresh用
// app.set('port', process.env.PORT || 3000);
// var server = app.listen(app.get('port'), function() {
//     console.log('Express server listening on port ' + server.address().port);
// });

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
//var login = require('./views/login.html');
//var register = require('./views/register.html');

//var session = require('express-session');

var app = express();


//set session
app.use(session({
	secret: 'secret',
	cookie: {maxAge: 1000*60*30}//session30分钟长度
}));

/*
app.use(function(req, res, next){
	res.locals.user = req.session.user;//从session获取user对象
	var err = req.session.error;//获取错误信息
	res.locals.message = "";
	if(err){
		res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'
		+err+'</div>';
	}
	next();//中间传递
});
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine("html", require("ejs".__express));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);//设置路由
app.use('/users', users);
app.use('/login', index);
app.use('/register', index);
app.use('/home', index);
app.use('/logout', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(3000);

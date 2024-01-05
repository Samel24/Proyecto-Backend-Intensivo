var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config(); // Para acceder a las variables de entorno
require('./config/connection');

var index = require('./routes/index');
var estudiantes = require('./routes/estudiantes.routes');
var usuarios = require('./routes/usuarios.routes');
var carreras = require('./routes/carreras.routes');
var sedes = require('./routes/sedes.routes');
var catedras = require('./routes/catedras.routes');
var profesores = require('./routes/profesores.routes');
var empleados = require('./routes/empleados.routes');
var eventos = require('./routes/eventos.routes');

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/estudiantes', estudiantes);
app.use('/usuarios', usuarios);
app.use('/carreras', carreras);
app.use('/sedes', sedes);
app.use('/catedras', catedras);
app.use('/profesores', profesores);
app.use('/empleados', empleados);
app.use('/eventos', eventos);

// Middleware para manejar rutas no encontradas y devolver error 404
app.use((req, res, next) => {
  res.status(404).json({ status: 404, mensaje: "Esta ruta no existe" });
});


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

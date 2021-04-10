import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import * as engines from 'consolidate';

// Routing
import { indexRouter } from './routes/index';

// PORT
const app = express();
const PORT = process.env.PORT || 3001;

// View Engines
app.use('/client', express.static(path.join(__dirname, 'build')));
app.set('views', path.join(__dirname, '../../client/build'));
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routing
app.get('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// start server at 3001
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

module.exports = app;

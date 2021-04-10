import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import * as engines from 'consolidate';
import * as mysql from 'mysql';
import Web3 from 'web3';

const web3 = new Web3('http://localhost:8545');
const insuranceContract = new web3.eth.Contract(
  [],
  '0x01E293f1f1dFcF7619cB792B6624E9e1969156fA'
);

// Routing
import { indexRouter } from './routes/index';

// PORT
const app = express();
const PORT = process.env.PORT || 3001;

// View Engines
app.use(express.static(path.join(__dirname, '../../client/build')));
app.engine('html', engines.mustache);
app.set('views', path.join(__dirname, '../../client/build'));
app.set('view engine', 'html');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// DB
const conn = mysql.createConnection({
  host: 'us-cdbr-east-03.cleardb.com',
  user: 'b312eaab7a44ed',
  password: '6880b72a',
  port: 3306,
  database: 'heroku_82ba81f3f5ed25f',
});

// Routing
app.get('/', indexRouter);

// Create Insurance
app.post('/api/create', async (req, res) => {
  const code = req.body.confirmationCode;
  const name = req.body.name;
  const dueDate = req.body.dueDate;
  const walletAddress = req.body.walletAddress;

  await insuranceContract.methods
    .insurancePayment()
    .send()
    .on('receipt', (receipt: any) => {
      console.log(receipt);
    });

  conn.query(
    `INSERT INTO insurance(confirmation_code, name, due_date, wallet_address) VALUES(?, ?, ?, ?)`,
    [code, name, dueDate, walletAddress],
    (err, rows, fields) => {
      if (err) {
        res.json({ code: 0 });
        throw err;
      } else {
        res.json({ code: 1 });
      }
    }
  );
});

// Get Insurance Data
app.post('/api/myPage', async (req, res) => {
  const walletAddress = req.body.walletAddress;

  const balance = await insuranceContract.methods
    .balance()
    .call()
    .on('receipt', (receipt: any) => {
      console.log(receipt);
    });

  const contractBalance = await insuranceContract.methods
    .getInsruanceBalance()
    .call()
    .on('receipt', (receipt: any) => {
      console.log(receipt);
    });

  conn.query(
    `SELECT * FROM insurance WHERE wallet_address=?`,
    [walletAddress],
    (err, rows, fields) => {
      if (err) {
        res.json({ code: 0 });
        throw err;
      } else {
        res.json({
          code: 1,
          confirmationCode: rows[0].confirmation_code,
          name: rows[0].name,
          dueDate: rows[0].due_date,
          balance: balance,
          contractBalance: contractBalance,
        });
      }
    }
  );
});

app.post('/api/withdraw', async (req, res) => {
  await insuranceContract.methods
    .withdraw()
    .send()
    .on('receipt', (receipt: any) => {
      console.log(receipt);
      res.json({
        receipt: receipt,
      });
    });
});

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

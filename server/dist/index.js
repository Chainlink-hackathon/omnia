"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const engines = __importStar(require("consolidate"));
const mysql = __importStar(require("mysql"));
// Routing
const index_1 = require("./routes/index");
// PORT
const app = express_1.default();
const PORT = process.env.PORT || 3001;
// View Engines
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
app.engine('html', engines.mustache);
app.set('views', path_1.default.join(__dirname, '../../client/build'));
app.set('view engine', 'html');
// Web3 Test
// app.use(express.static(path.join(__dirname, '../src/public')));
// app.set('views', path.join(__dirname, '../src/views'));
// app.set('view engine', 'ejs');
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
// DB
const conn = mysql.createConnection({
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'b312eaab7a44ed',
    password: '6880b72a',
    port: 3306,
    database: 'heroku_82ba81f3f5ed25f',
});
// Routing
app.get('/', index_1.indexRouter);
// Create Insurance
app.post('/api/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.body.confirmationCode;
    const name = req.body.name;
    const dueDate = req.body.dueDate;
    const walletAddress = req.body.walletAddress;
    conn.query(`INSERT INTO insurance(confirmation_code, name, due_date, wallet_address) VALUES(?, ?, ?, ?)`, [code, name, dueDate, walletAddress], (err, rows, fields) => {
        if (err) {
            res.json({ code: 0 });
            throw err;
        }
        else {
            res.json({
                code: 1,
            });
        }
    });
}));
// Get Insurance Data
app.post('/api/myPage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const walletAddress = req.body.walletAddress;
    conn.query(`SELECT * FROM insurance WHERE wallet_address=?`, [walletAddress], (err, rows, fields) => {
        if (err) {
            res.json({ code: 0 });
            throw err;
        }
        else {
            res.json({
                code: 1,
                confirmationCode: rows[0].confirmation_code,
                name: rows[0].name,
                dueDate: rows[0].due_date,
            });
        }
    });
}));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
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
//# sourceMappingURL=index.js.map
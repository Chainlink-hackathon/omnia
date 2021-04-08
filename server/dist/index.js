"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const FileStore = require("session-file-store");
const useFileStore = FileStore(express_session_1.default);
// Routing
const index_1 = require("./routes/index");
// PORT
const app = express_1.default();
const PORT = process.env.PORT || 3001;
// View Engines
app.set('views', path_1.default.join(__dirname, '../../client/build'));
app.set('view engine', 'html');
app.use(cors_1.default());
app.use(express_session_1.default({
    secret: 'omniapwd',
    resave: false,
    store: new useFileStore(),
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1200000,
    },
}));
app.use(morgan_1.default('dev'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
// Routing
app.get('/', index_1.indexRouter);
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
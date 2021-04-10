"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.mainRouter = express_1.default.Router();
exports.mainRouter.get('/', (req, res) => {
    res.json({
        response: '자알왔다잉',
    });
});
//# sourceMappingURL=main.js.map
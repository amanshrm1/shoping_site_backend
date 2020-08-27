"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
var PORT = 5000;
var default_1 = require("./default");
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/', default_1.router);
app.listen(PORT, function () {
    console.log("app is listning at " + PORT);
});

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dotenv = exports.prisma = void 0;
var body_parser_1 = __importDefault(require("body-parser"));
var graphql_yoga_1 = require("graphql-yoga");
var client_1 = require("@prisma/client");
var dotenv = __importStar(require("dotenv"));
exports.dotenv = dotenv;
dotenv.config();
var types_1 = __importDefault(require("./types"));
var user_1 = __importDefault(require("./resolvers/user"));
var product_1 = __importDefault(require("./resolvers/product"));
var description_1 = __importDefault(require("./resolvers/description"));
var category_1 = __importDefault(require("./resolvers/category"));
var order_1 = __importDefault(require("./resolvers/order"));
var checkout_1 = __importDefault(require("./resolvers/checkout"));
var prisma = new client_1.PrismaClient();
exports.prisma = prisma;
var default_1 = require("./default");
var options = {
    PORT: process.env.PORT,
    endpoint: process.env.ENDPOINT
};
var server = new graphql_yoga_1.GraphQLServer({
    typeDefs: types_1.default,
    resolvers: [user_1.default, product_1.default, description_1.default, category_1.default, order_1.default, checkout_1.default],
    context: function () {
        return {
            prisma: prisma
        };
    }
});
server.express.use(body_parser_1.default.urlencoded({ extended: true }));
server.express.use('/another', default_1.router);
server.start(options, function (_a) {
    var port = _a.port;
    console.log("The Sever is running at " + process.env.PORT + " !");
});

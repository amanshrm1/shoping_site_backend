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
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var client_1 = require("@prisma/client");
var dotenv = __importStar(require("dotenv"));
exports.dotenv = dotenv;
var types_1 = __importDefault(require("./types"));
var user_1 = __importDefault(require("./resolvers/user"));
var product_1 = __importDefault(require("./resolvers/product"));
var description_1 = __importDefault(require("./resolvers/description"));
var category_1 = __importDefault(require("./resolvers/category"));
var cart_1 = __importDefault(require("./resolvers/cart"));
var order_1 = __importDefault(require("./resolvers/order"));
var checkout_1 = __importDefault(require("./resolvers/checkout"));
var default_1 = require("./default");
// /*  Please Check the Explanation.txt for all the routes */
/* --------  created prisma client to deal with database ---------*/
var prisma = new client_1.PrismaClient();
exports.prisma = prisma;
dotenv.config();
/* -------- GraphqlServer object  ------------------------------ */
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: types_1.default,
    resolvers: [user_1.default, category_1.default, product_1.default, description_1.default, cart_1.default, order_1.default, checkout_1.default],
    context: function () {
        return {
            prisma: prisma
        };
    }
});
/*----------- Express integration ------------------------------------- */
var app = express_1.default();
app.use('/', default_1.router);
server.applyMiddleware({ app: app });
/* --------- Server starts ------------------------------------ */
app.listen(process.env.PORT, function () {
    console.log("server is running at " + process.env.PORT);
});

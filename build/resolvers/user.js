"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var index_1 = require("../index");
index_1.dotenv.config();
var secret = process.env.SECRET;
var tokenExpiry = process.env.EXPTOKENTIME;
exports.default = {
    Query: {
        /* ------------------ Query to get all Users --------------------------   */
        getAllUsers: function (parent, argv, _a) {
            var prisma = _a.prisma;
            return prisma.user.findMany();
        },
        /* ------------------ Query to get single Users --------------------------   */
        getUser: function (parent, _a, _b) {
            var where = _a.where;
            var prisma = _b.prisma;
            return prisma.user.findOne({
                where: {
                    userId: where.userId
                }
            });
        }
    },
    User: {
        /* ------------------ Query to get orders of Users --------------------------   */
        orders: function (parent, argv, _a) {
            var prisma = _a.prisma;
            return prisma.order.findMany({
                where: {
                    userID: parent.userId
                }
            });
        },
        /* ------------------ Query to get orders of Users --------------------------   */
        totalOrderAmount: function (parent, argv, _a) {
            var prisma = _a.prisma;
            return __awaiter(void 0, void 0, void 0, function () {
                var amountToBePayed, result, key;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            amountToBePayed = 0;
                            return [4 /*yield*/, prisma.order.findMany({
                                    where: {
                                        userID: parent.userId
                                    }
                                })];
                        case 1:
                            result = _b.sent();
                            if (result != []) {
                                for (key in result) {
                                    amountToBePayed += result[key].orderProductPrice;
                                }
                                console.log(amountToBePayed);
                                return [2 /*return*/, { amountToBePayed: amountToBePayed }];
                            }
                            throw new Error('User dont have any orders');
                    }
                });
            });
        }
    },
    Mutation: {
        /* ------------------ Mutation to get create User --------------------------   */
        createUser: function (parent, _a, _b) {
            var data = _a.data;
            var prisma = _b.prisma;
            return prisma.user.create({
                data: __assign({}, data)
            });
        },
        /* ------------------ Provide Token for track of user ---------------------- */
        loginUser: function (parent, _a, _b) {
            var where = _a.where;
            var prisma = _b.prisma;
            return __awaiter(void 0, void 0, void 0, function () {
                var userId, user, accessToken;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            userId = where.userId;
                            return [4 /*yield*/, prisma.user.findOne({
                                    where: {
                                        userId: where.userId
                                    }
                                })];
                        case 1:
                            user = _c.sent();
                            if (!user) {
                                throw new Error('User not found');
                            }
                            accessToken = jsonwebtoken_1.sign({ where: where }, secret, { expiresIn: tokenExpiry });
                            return [2 /*return*/, {
                                    accessToken: accessToken
                                }];
                    }
                });
            });
        },
        /* ------------------ Mutation to update User --------------------------   */
        updateUser: function (parent, _a, _b) {
            var data = _a.data, where = _a.where;
            var prisma = _b.prisma;
            return prisma.user.update({
                data: __assign({}, data),
                where: {
                    userId: where.userId
                }
            });
        },
        /* ------------------ Mutation to delete User --------------------------   */
        deleteUser: function (parent, _a, _b) {
            var where = _a.where;
            var prisma = _b.prisma;
            return prisma.user.delete({
                where: {
                    userId: where.userId
                }
            });
        }
    },
};

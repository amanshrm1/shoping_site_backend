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
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var index_1 = require("../index");
index_1.dotenv.config();
var tokenToCheck = process.env.ACCESSTOKEN4;
exports.default = {
    Query: {
        /* ------------------ Query to get all Orders --------------------------   */
        getAllOrders: function (parent, argv, _a) {
            var prisma = _a.prisma;
            return prisma.order.findMany();
        },
        /* ------------------ Query to get single Order --------------------------   */
        getOrder: function (parent, _a, _b) {
            var where = _a.where;
            var prisma = _b.prisma;
            return prisma.order.findOne({
                where: {
                    ItemId: where.ItemId
                }
            });
        }
    },
    Order: {
        /* ------------------ Query to get user related to order --------------------------   */
        user: function (parent, argv, _a) {
            var prisma = _a.prisma;
            return prisma.user.findOne({
                where: {
                    userId: parent.userID
                }
            });
        }
    },
    Mutation: {
        /* ------------------ Mutation to create Order --------------------------   */
        createOrder: function (parent, _a, _b) {
            var data = _a.data, where = _a.where;
            var prisma = _b.prisma;
            var extractedUserId = jsonwebtoken_1.decode(tokenToCheck, { complete: true });
            var createOrder = prisma.order.create({
                data: __assign(__assign({}, data), { belongs: {
                        connect: { userId: extractedUserId['payload']['where']['userId'] }
                    } })
            });
            return createOrder;
        },
        /* ------------------ Mutation to update Order --------------------------   */
        updateOrder: function (parent, _a, _b) {
            var data = _a.data, where = _a.where;
            var prisma = _b.prisma;
            return prisma.order.update({
                data: __assign({}, data),
                where: {
                    ItemId: where.ItemId
                }
            });
        },
        /* ------------------ Mutation to delete Order --------------------------   */
        deleteOrder: function (parent, _a, _b) {
            var where = _a.where;
            var prisma = _b.prisma;
            return prisma.order.delete({
                where: {
                    ItemId: where.ItemId
                }
            });
        }
    }
};

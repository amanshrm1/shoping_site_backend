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
exports.default = {
    Query: {
        /* ------------------ Query to get Descriptions --------------------------   */
        getDescriptions: function (parent, argv, _a) {
            var prisma = _a.prisma;
            return prisma.description.findMany();
        },
        /* ------------------ Query to get Description --------------------------   */
        getDescription: function (parent, _a, _b) {
            var where = _a.where;
            var prisma = _b.prisma;
            return prisma.description.findOne({
                where: {
                    descriptionId: where.descriptionID
                }
            });
        }
    },
    Mutation: {
        /* ------------------ Mutation to create Description --------------------------   */
        createDescription: function (parent, _a, _b) {
            var data = _a.data, where = _a.where;
            var prisma = _b.prisma;
            return prisma.description.create({
                data: __assign(__assign({}, data), { product: {
                        connect: { productId: where.descriptionID }
                    } })
            });
        },
        /* ------------------ Mutation to update Description --------------------------   */
        updateDescription: function (parent, _a, _b) {
            var data = _a.data, where = _a.where;
            var prisma = _b.prisma;
            return prisma.description.update({
                data: __assign({}, data),
                where: {
                    descriptionId: where.descriptionId
                }
            });
        },
    }
};

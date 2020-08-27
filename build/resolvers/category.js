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
        /* ------------------ Query to get all Categories --------------------------   */
        getCategories: function (parent, argv, _a) {
            var prisma = _a.prisma;
            return prisma.categories.findMany();
        },
        /* ------------------ Query to get single Category --------------------------   */
        getCategory: function (parent, _a, _b) {
            var where = _a.where;
            var prisma = _b.prisma;
            return prisma.categories.findOne({
                where: {
                    categoryId: where.categoryId
                }
            });
        }
    },
    Category: {
        /* ------------------ Query to get products related to particular Category --------------------------   */
        products: function (parent, argv, _a) {
            var prisma = _a.prisma;
            return prisma.product.findMany({
                where: {
                    categoryID: parent.categoryId
                }
            });
        }
    },
    Mutation: {
        /* ------------------ Mutation to create Category --------------------------   */
        createCategory: function (parent, _a, _b) {
            var data = _a.data;
            var prisma = _b.prisma;
            return prisma.categories.create({
                data: __assign({}, data)
            });
        },
        /* ------------------ Mutation to get update Category --------------------------   */
        updateCategory: function (parent, _a, _b) {
            var data = _a.data, where = _a.where;
            var prisma = _b.prisma;
            return prisma.categories.update({
                data: __assign({}, data),
                where: {
                    categoryId: where.categoryId
                }
            });
        },
        /* ------------------ Mutation to delete Category --------------------------   */
        deleteCategory: function (parent, _a, _b) {
            var where = _a.where;
            var prisma = _b.prisma;
            return prisma.categories.delete({
                where: {
                    categoryId: where.categoryId
                }
            });
        }
    }
};

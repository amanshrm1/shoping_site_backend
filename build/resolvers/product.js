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
        /* ------------------ Query to get all Products --------------------------   */
        getProducts: function (parent, argv, _a) {
            var prisma = _a.prisma;
            return prisma.product.findMany();
        },
        /* ------------------ Query to get all Categories --------------------------   */
        getProduct: function (parent, _a, _b) {
            var where = _a.where;
            var prisma = _b.prisma;
            return prisma.product.findOne({
                where: {
                    productId: where.productId
                }
            });
        }
    },
    Product: {
        /* ------------------ Query to get description of related Product --------------------------   */
        description: function (parent, argv, _a) {
            var prisma = _a.prisma;
            return prisma.description.findOne({
                where: {
                    descriptionID: parent.productId
                }
            });
        },
        /* ------------------ Query to get Category od related product--------------------------   */
        category: function (parent, argv, _a) {
            var prisma = _a.prisma;
            return prisma.categories.findOne({
                where: {
                    categoryId: parent.categoryID
                }
            });
        }
    },
    Mutation: {
        /* ------------------ Mutation to create Category --------------------------   */
        createProduct: function (parent, _a, _b) {
            var data = _a.data, where = _a.where;
            var prisma = _b.prisma;
            return prisma.product.create({
                data: __assign(__assign({}, data), { category: {
                        connect: { categoryId: where.categoryID }
                    } })
            });
        },
        /* ------------------ Mutation to delete Category --------------------------   */
        deleteProduct: function (parent, _a, _b) {
            var where = _a.where;
            var prisma = _b.prisma;
            return prisma.product.delete({
                where: {
                    productId: where.productId
                }
            });
        }
    }
};

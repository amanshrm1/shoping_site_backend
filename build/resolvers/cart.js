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
        getAllCartItem: function (parent, argv, _a) {
            var prisma = _a.prisma;
            return prisma.cart.findMany();
        }
    },
    Mutation: {
        createCartItem: function (parent, _a, _b) {
            var data = _a.data;
            var prisma = _b.prisma;
            return prisma.cart.create({
                data: __assign({}, data)
            });
        },
        deleteCartItem: function (parent, _a, _b) {
            var where = _a.where;
            var prisma = _b.prisma;
            return prisma.cart.delete({
                where: __assign({}, where)
            });
        },
        updateCartItem: function (parent, _a, _b) {
            var data = _a.data, where = _a.where;
            var prisma = _b.prisma;
            var cProductPrice = data.cProductPrice, cProductQuantity = data.cProductQuantity, cfProductPrice = data.cfProductPrice;
            var finalProductPrice = cProductPrice * cProductQuantity;
            var result = prisma.cart.update({
                data: {
                    cProductPrice: cfProductPrice,
                    cfProductPrice: finalProductPrice,
                    cProductQuantity: cProductQuantity
                },
                where: __assign({}, where)
            });
            return result;
        }
    }
};

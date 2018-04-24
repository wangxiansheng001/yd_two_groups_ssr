"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _dec, _dec2, _class, _desc, _value, _class2;

var _awilixKoa = require("awilix-koa");

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

let BoocController = (_dec = (0, _awilixKoa.route)("/"), _dec2 = (0, _awilixKoa.GET)(), _dec(_class = (_class2 = class BoocController {
    constructor({ bookService }) {
        this.bookService = bookService;
    }

    async getUser(ctx) {

        const result = this.bookService.getBookData();

        ctx.body = result;
    }

}, (_applyDecoratedDescriptor(_class2.prototype, "getUser", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "getUser"), _class2.prototype)), _class2)) || _class);
exports.default = BoocController;
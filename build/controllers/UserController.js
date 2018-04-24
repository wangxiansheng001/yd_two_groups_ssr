"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

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

let UserController = (_dec = (0, _awilixKoa.route)("/users"), _dec2 = (0, _awilixKoa.route)("/:id"), _dec3 = (0, _awilixKoa.GET)(), _dec(_class = (_class2 = class UserController {
    constructor({ userService }) {
        this.userService = userService;
    }

    async getUser(ctx) {
        console.info("消息1111111111111");
        const result = await this.userService.getData(ctx.params.id);
        console.info("消息" + result);
        ctx.body = await ctx.render('index', { data: result });
    }

}, (_applyDecoratedDescriptor(_class2.prototype, "getUser", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "getUser"), _class2.prototype)), _class2)) || _class);
// import IndexModel from '../models/indexModel';

// class indexController {

// constructor(){

// }

// indexAction() {
//     return async (ctx, next) => {
//         const indexModelIns = new IndexModel();
//         const result = await indexModelIns.getData();
//         // ctx.body = await ctx.render('index');
//         ctx.body = await ctx.render('index', { data: result });
//     }
// }

// testAction() {
//     return (ctx, next) => {
//         ctx.body = {
//             data:"hello test"
//         }
//     }
// }
// }

// export default indexController;

exports.default = UserController;
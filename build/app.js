"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _errorHandler = require("./middlewares/errorHandler");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { asClass, asValue, createContainer, Lifetime } = require('awilix');
const { loadControllers, scopePerRequest } = require("awilix-koa");

const app = new _koa2.default();

_log4js2.default.configure({
  appenders: { cheese: { type: 'file', filename: './logs/cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = _log4js2.default.getLogger('cheese');
_errorHandler2.default.error(app, logger);

//创建IOC的容器
const container = createContainer();
//每一次的请求都是一个 new model
app.use(scopePerRequest(container));

//装载所有的models 并将services 代码注入到constrollers
container.loadModules([__dirname + '/services/*.js'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
});
//注册所有的路由
app.use(loadControllers(__dirname + '/controllers/*.js', { cwd: __dirname }));

// 配置koa-static
app.use((0, _koaStatic2.default)(_config2.default.staticDir));

app.listen(_config2.default.port, () => {
  console.log(`开启登录系统 ${_config2.default.port}`);
});

module.exports = app;

// app.use(async(ctx) =>{
//      ctx.body = "HELLO WORLD2222222www2";
// });

// app.context.render = co.wrap(render({
//     root: config.viewDir,
//     autoescape: true,
//     cache: 'memory', // disable, set to false 
//     ext: 'html',
//     varControls:["[[","]]"],//控制模板的{{}}
//     writeBody:false
//   }));
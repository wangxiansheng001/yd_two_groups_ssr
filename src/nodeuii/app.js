import koa  from "koa";
import log4js from "log4js";
import co  from 'co';
import serve  from 'koa-static';
import config from './config';
import errorHandler from './middlewares/errorHandler';
const { asClass, asValue, createContainer,Lifetime} = require('awilix');
const { loadControllers, scopePerRequest } = require("awilix-koa");

const app = new koa();

log4js.configure({
  appenders: { cheese: { type: 'file', filename: './logs/cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese'); 
errorHandler.error(app,logger);

//创建IOC的容器
const container = createContainer();
//每一次的请求都是一个 new model
app.use(scopePerRequest(container));

//装载所有的models 并将services 代码注入到constrollers
container.loadModules([__dirname +'/services/*.js'],{
  formatName:'camelCase',
  resolverOptions:{
    lifetime: Lifetime.SCOPED
  } 
})
//注册所有的路由
app.use(loadControllers(__dirname + '/controllers/*.js', { cwd: __dirname }));

// 配置koa-static
app.use(serve(config.staticDir))

app.listen(config.port,()=>{
    console.log(`开启登录系统 ${config.port}`);
})

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






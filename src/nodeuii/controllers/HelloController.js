import {route, GET , POST, before} from "awilix-koa";

@route("/hello")
export default class HelloController{
    constructor({testService}){
        this.testService = testService;
        // this.userService = userService;
    }

 
    @GET()
    async getUser(ctx){
        console.log("dddddddddddddddddddddddddddddddddd=================>")
        const result = this.testService.find();
        console.log("dddddddddddddddddddddddddddddddddd=================>"+result);
        // const result2 = this.userService.getData('2');
        ctx.body = await ctx.render('index',{data:result});
    }

}

// import {route,GET,POST,before} from 'awilix-koa';
// @route('/')
// @route('/index.html')
// export default class helloAPI{
//     constructor({testService}){
//         this.testService = testService;
//     }
//     @GET()
//     async getUser(ctx){
//         const result = this.testService.find();
//         ctx.body = await ctx.render('index/pages/index', { data: result });
//     }
// }
import {route, GET , POST, before} from "awilix-koa";

@route("/users")
export default class UserController{
    constructor({ userService}){
        this.userService = userService;
        
    }

 
    @route("/:id")
    @GET()
    async getUser(ctx){
        console.info("消息1111111111111");
        const result = await this.userService.getData(ctx.params.id);
        console.info("消息"+result);
        ctx.body = await ctx.render('index',{data:result});
    }

}
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



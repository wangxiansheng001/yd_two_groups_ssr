import {route, GET , POST, before} from "awilix-koa";



@route("/")
export default class BoocController{
    constructor({  bookService   }){
        this.bookService = bookService;
    }

 
    @GET()
    async getUser(ctx){
        
        const result = this.bookService.getBookData();
       
        ctx.body = result;
    }

}
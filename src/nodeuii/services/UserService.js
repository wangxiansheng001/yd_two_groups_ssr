
import { resolve, reject } from "dns";
var Mock = require('mockjs');
const Random = Mock.Random;
/**
 * indexmodel 类 生成一段异步的数据
 * @class
 */

export default class UserService {


    constructor(app) { };
    /**
     * 获取具体的api接口数据
     * @return {promise} 返回异步出理的结果
     * @example
     * return new Promise 
     * getData()
     */
    getData(id) {
        return new Promise((resolve, reject) => {


            const produceNewsData = function () {
                let articles = [];
                for (let i = 0; i < 10; i++) {
                    let newArticleObject = {
                        title: Random.csentence(5, 30), //  Random.csentence( min, max )
                        author: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
                    }
                    articles.push(newArticleObject)
                }

                return {
                    articles: articles
                }
            }


            // setTimeout(()=>{
            produceNewsData().articles.map((item) => {
                resolve(`${id}` + "<p> " + `${item.title}` + "</p><br/>" + item.author);
            })

            // },1000);
            // throw new error("")
        });
    }
}

import { resolve, reject } from "dns";
import path, { dirname } from 'path'
import fs from 'fs'
// import koaRouter from 'koa-router'
import LRU from 'lru-cache'
import {createBundleRenderer} from 'vue-server-renderer'

import cheerio from 'cheerio';
// import config from '../config/config';
/*vue ssr start*/
//创建数据流
function createRenderer(bundle, template, clientManifest) {
    return createBundleRenderer(bundle, {
        cache: require('lru-cache')({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
        runInNewContext: false, // 推荐
        template,
        clientManifest
    })
}
const rootPath = path.join(__dirname, '..');
const template = fs.readFileSync(rootPath + '/assets/index.html', 'utf-8');
const $ = cheerio.load(template);

$('title').html('京程一灯');
$("head").append(' <meta name="keywords" content=京程一灯>');
// console.log('模板数据',$.html());
const serverBundle = require('../assets/vue-ssr-server-bundle.json');
const clientManifest = require('../assets/vue-ssr-client-manifest.json');
/**
 * indexmodel 类 生成一段异步的数据
 * @class
 */

export default class BookService {


    constructor(app) { };

    getBookData() {
        return async(ctx, next) => {
            const s = Date.now();
            const ssrrender = createRenderer(serverBundle, $.html(), clientManifest);
            const context = { url: ctx.url };
            function createSsrStreamPromise() {
                return new Promise((resolve, reject) => {
                    if (!ssrrender) {
                        return ctx.body = 'waiting for compilation.. refresh in a moment.'
                    }
                    const ssrStream = ssrrender.renderToStream(context);
                    ctx.status = 200;
                    ctx.type = 'html';
                    ssrStream.on('error', err =>{reject(err)}).pipe(ctx.res);
                });
            }
            await createSsrStreamPromise(context);
        };
    }
    
       
    
}
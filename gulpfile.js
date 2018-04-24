const gulp = require("gulp");

const babel = require("gulp-babel");

const watch = require("gulp-watch");

const rollup = require("gulp-rollup");

const replace = require("rollup-plugin-replace");

gulp.task('builddev',function(){
    return watch('./src/nodeuii/**/*.js',{
        ignoreInitial:false
    },()=>{
        gulp.src('./src/nodeuii/**/*.js')
        .pipe(babel({
            //不让外部的.babelrc映射内部
            babelrc:false,
            'plugins':[
                "transform-es2015-modules-commonjs",
                "transform-decorators-legacy"
            ]
        })).pipe(gulp.dest('build'))
    })
});

gulp.task('buildprod',()=>{
    gulp
    .src('./src/nodeuii/**/*.js')
    .pipe(
        babel({
        babelrc:false,
        // ignore:"./src/nodeuii/config/index.js",
        'plugins':["transform-es2015-modules-commonjs",
                    "transform-decorators-legacy"]
                
        
        })
    )
    .pipe(
        rollup({
            output:{format:"cjs"},
            input: ["./src/nodeuii/config/index.js"],
            plugins:[
                replace({
                    "process.env.NODE_ENV":JSON.stringify("production")
                })
            ]
        })
    ).pipe(gulp.dest("build"));

})

let _task = ["builddev"];
//上线
if(process.env.NODE_ENV == "production"){
    _task = ["buildprod"];
}


gulp.task('default',_task);

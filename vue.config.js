const path = require('path');
const proxy = require('./build/proxy');

// function resolve(dir) {
//     return path.join(__dirname, dir);
// }

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/'
        : '/',
    // filenameHashing: false,
    // pluginOptions: {
    //     lintStyleOnBuild: true,
    //     stylelint: {
    //         fix: false,
    //     },
    // },
    // chainWebpack: (config) => {
    //     // 设置 public 目录别名
    //     config.resolve.alias.set('#', resolve('public'));
    //     // 解决 vue-layer 使用时报错问题
    //     config.resolve.alias.set('vue$', 'vue/dist/vue.js');
    // },
    devServer: {
        port: 8080,
        proxy,
        // inline: false, // 关闭热更新
    },
    productionSourceMap: false,
    // css: {
    //     loaderOptions: {
    //         // 给 sass-loader 传递选项
    //         sass: {
    //             // @/ 是 src/ 的别名
    //             // 所以这里假设你有 `src/variables.scss` 这个文件
    //             data: '@import "@/assets/css/global_variable.scss";',
    //         },
    //     },
    // },
};

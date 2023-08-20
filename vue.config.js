const { defineConfig } = require("@vue/cli-service");
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    config.resolve = { // 配置解析别名
        extensions: ['.js', '.json', '.vue'],//自动添加文件名后缀
        alias: {
            '@': path.resolve(__dirname, './src'),
            // 'public': path.resolve(__dirname, './public'),
            '@c': path.resolve(__dirname, './src/components'),
            // 'common': path.resolve(__dirname, './src/common'),
            // 'api': path.resolve(__dirname, './src/api'),
            // 'views': path.resolve(__dirname, './src/views'),
            // 'data': path.resolve(__dirname, './src/data'),
            // 'vue': 'vue/dist/vue.esm.js',
        }
    }
  },
  //css相关配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false,  // 开启 CSS source maps
    loaderOptions: {
        scss: {
          additionalData: `@import "./src/styles/main.scss";`
        }
    },
  //  modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  
});

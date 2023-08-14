const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
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

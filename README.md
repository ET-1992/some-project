# 信息流JSSDK微服务开发基础类库

## 本地开发

### 开发调试
```shell
# 安装依赖
npm install

# 启动开发服务
npm run dev
```

### 本地预览ES6编译成ES5后的API支持
```shell
# 包含polyfills
http://{local IP}:9090/test/polyfill.html
# 没有包含polyfills
http://{local IP}:9090/test/nopolyfill.html
```

## 发布新版本基础类库

### Step 1:

修改 `package.json`中的 `version`;

### Step 2:

构建并发布到CDN，执行以下命令或提交代码到 `master` 分支

```shell
npm run publish
```

## 使用说明

### 为什么独立一个微服务基础类库？

原因：

1. 基于微服务开发架构进行开发，每一个JS-SDK在开发/生产阶段都需要依赖一些常用的工具类库；
2. JSSDK采用`ES6/7(ES2015/2017)`标准作为源码开发，必定使用了一些新增 `API`，但由于 `Babel` 默认只转换新的 `JavaScript` 句法（syntax），而不转换新的 `API` ，这需要通过 `polyfill` 来解决。
3. 每一个JS-SDK都是单独打包和发布的，如果每一个JSSDK都包含一份基础类库和一份polyfills，那么如果页面需要多个JS-SDK组合服务的，就会导致整体页面的冗余会比较大。


> Tips：`Babel`不支持哪些API？
> 比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会进行转码编译。Babel 默认不转码的 API 非常多，详细清单可以查看 [definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js) 文件。


### 本基础类库包含的内容：

1. 一份支持独立挂载的`ES6/7`新增全局对象及全局对象下的API的`ES5`版本`polyfill`，包含了 `fetch` 的支持；
2. 一份挂载在 `window.__SDKLIB__` 对象下的常用的函数类库；
3. 一份css的全局样式。

### 本函数库打包构建的js文件说明：

1. sdklibs.shim.js：包含本基础类库全部内容的整合包，支持在浏览器中独立引用；
2. sdklibs.js： 包含常用的函数类库和css的全局样式，但不包含polyfills；
3. polyfills.js： `ES6/7`新增全局对象及全局对象下的API的`ES5`版本`polyfill`，支持在浏览器中独立引用。

### 在项目中使用：

- 方法1. 单独引用 [sdklibs.shim.js](http://image.uc.cn/s/uae/g/1y/libs/sdklibs.shim.1.0.3.js);

例如：
```html
<script src="//image.uc.cn/s/uae/g/1y/libs/sdklibs.shim.1.0.3.js" crossorigin="anonymous"></script>
```

- 方法2. combo组合引用，[polyfills.js](http://image.uc.cn/s/uae/g/1y/libs/polyfills.1.0.3.js)和[sdklibs.js](http://image.uc.cn/s/uae/g/1y/libs/sdklibs.1.0.3.js);

例如： 将本基础类库、uc-jsdk以及分享sdk组合combo：
```html
<script src="//image.uc.cn/e/uaeext/m;1y/;libs/polyfills.1.0.3.js;libs/uc-jsdk.js;libs/uc-share-sdk.js;libs/sdklibs.1.0.3.js" crossorigin="anonymous"></script>
<!-- // or -->
<script src="//image.uc.cn/e/uaeext/m;1y/libs/;polyfills.1.0.3.js;uc-jsdk.js;uc-share-sdk.js;sdklibs.1.0.3.js;loader.v21.min.js" crossorigin="anonymous"></script>
```

**总之，在开发和生产阶段，同一个页面只需要引入一份本基础类库（包含polyfills和css样式）之后，在独立的JSSDK中则不再需要重复引用，避免不必要的冗余。**

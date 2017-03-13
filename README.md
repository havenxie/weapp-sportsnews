# 微信小程序 Sports News(体育新闻) 持续更新

## 小程序预览

<p align="center">
  <img src="./images/GIF2.gif" alt="体育新闻微信小程序演示" >
</p>

## 使用步骤

1. 将仓库克隆到本地：
  ```bash
  $ git clone https://github.com/havenxie/weapp-sportsnews.git weapp-sportsnews --depth 1
  $ cd weapp-sportsnews
  ```

2. 打开`微信Web开发者工具`
  - 我用的是0.11.122100版本
  - 不需要所谓的破解，网上所谓的破解只是针对之前的`0.9.092100`版本，新的官方版本不需要破解！
  - 下载链接：`https://pan.baidu.com/s/1qYld6Vi`   
    + `wechat_web_devtools_0.9.092300_x64.exe`（Windows 64位）
    + `wechat_web_devtools_0.9.092300_ia32.exe`（Windows 32位）
    + `wechat_web_devtools_0.9.092300.dmg`（macOS）


3. 选择`添加项目`，填写或选择相应信息
  - AppID：点击右下角`无AppID`（我也没有资格拿到）
  - 项目名称：随便填写，因为不涉及到部署，所以无所谓
  - 项目目录：选择刚刚克隆的文件夹
  - 点击`添加项目`

4. 你可以选择在`微信Web开发者工具`中编码（也可选择你喜欢的编辑器，我用的是sublime）

6. 通过左下角重启按钮，刷新编码过后的预览

7. 代码中用到了大量ES6的语法，可能需要node环境，请自行安装

8. 剩下的可以自由发挥了


## 微信小程序基本教程

### 创建一个项目文件夹，创建基本所需文件

#### app.js

项目主入口文件（用于创建应用程序对象）

```javascript
// App函数是一个全局函数，用于创建应用程序对象
App({
  // ========== 全局数据对象（整个应用程序共享） ==========
  globalData: { ... },

  // ========== 应用程序全局方法 ==========
  method1 (p1, p2) { ... },
  method2 (p1, p2) { ... },

  // ========== 生命周期方法 ==========
  // 应用程序启动时触发一次
  onLaunch () { ... },

  // 当应用程序进入前台显示状态时触发
  onShow () { ... },

  // 当应用程序进入后台状态时触发
  onHide () { ... }
})

```

#### app.json

项目配置声明文件（指定项目的一些信息，比如导航栏样式颜色等等）

```javascript
{
  // 当前程序是由哪些页面组成的（第一项默认为初始页面）
  // 所有使用到的组件或页面都必须在此体现
  // https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html#pages
  "pages": [ ... ],
  // 应用程序窗口设置
  // https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html#window
  "window": { ... },
  // 应用导航栏设置
  // https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html#tabBar
  "tabBar": { ... },
  // 网络超时设置
  // https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html#networkTimeout
  "networkTimeout": {},
  // 是否在控制台输出调试信息
  // https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html#debug
  "debug": true
}
```

#### app.wxss

[!可选!]项目全局的样式文件，内容遵循CSS标准语法


### 创建页面组件

每个页面组件也分为四个文件组成：

- page-name.js

  * 页面逻辑文件，用于处理页面生命周期控制和数据处理
  * 未完待续...

- page-name.json

 * 设置当前页面工作时的一些配置
 * 此处可以覆盖app.json中的window设置
 * 也就是说只可以设置window中设置的熟悉
 * 未完待续...

- page-name.wxml

  * wxml指的是`Wei Xin Markup Language`
  * 用于定义页面中元素结构的
  * 语法遵循XML语法，注意是XML语法，不是HTML语法
  * 未完待续...

- page-name.wxss

  * wxml指的是`Wei Xin Style Sheet`
  * 用于定义页面样式的
  * 语法遵循CSS语法，扩展了CSS基本用法和长度单位（主要就是rpx响应式像素）
  * 未完待续...


### 未完待续...




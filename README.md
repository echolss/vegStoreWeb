# 一款在线实时聊天招聘的webApp
* 前端：react16+react-redux+react-router4+antd-mobile

* 后端：node.js+express
* 数据库：mongodb
* 交互：socket.io+axios
* 工具：creat-react-app

## 运行项目

* [下载安装mongodb教程](http://blog.csdn.net/qq_22063697/article/details/78069787?locationNum=9&fps=1)
* npm install
* npm run build
* npm run server
    *  可以访问服务器：http://localhost:9093/
    *  可以访问本地：先：npm start   再访问：http://localhost:3000/


## 项目结构

```
│      .babelrc  给node后端配置jsx环境
│      .gitignore
│      package-lock.json
│      package.json
│      README.md
│
├─config  配置文件
│  
├─public
│  
├─scripts
│  
├─server  后台代码
│      module.js  用户信息的数据库模型...
│      server.js  SSR代码...
│      user.js  用户登录、注册一系列接口...
│          
└─src   
  │      cmrh.conf.js  处理SSR的图片、样式问题
  │      config.js  axios全局拦截请求
  │      Home.js  为实现后端首屏渲染，从index.js抽离出来的公共组件
  │      index.css  全部样式
  │      index.js  入口文件
  │      util.js  里面写了一些工具函数
  |
  ├─components  UI组件
  │  ├─AuthRoute  用来作路由跳转(根据用户是否登录/注册)
  │  ├─AvatarSelector  选择头像
  │  ├─Bubbly  对话框样式组件
  │  ├─HOCform  登录与注册通用的高阶组件
  │  ├─img  头像图片
  │  ├─Logo  登录注册页面的logo
  │  ├─TabLinkBar  主页面板页脚导航
  │  └─UserCard  用户信息卡片组件
  │      
  ├─containers  容器组件
  │  ├─Boss  显示所有求职者的组件
  │  ├─BossInfo  boss补充招聘信息的组件
  │  ├─Chat  聊天页面
  │  ├─Dashboard  主页面板
  │  ├─Login  登录
  │  ├─Message  消息列表
  │  ├─Register  注册组件
  │  ├─User  用户自己的信息
  │  ├─Worker  显示boss们
  │  └─WorkerInfo  worker补充自己的求职信息
  │  
  └─redux
    ├─actions
    │      chat.js  与聊天相关
    │      msg.js  与消息相关
    │      user.js  与用户相关
    └─reducers
          chat.js
          msg.js
          reducer.js  组合所有Reducer
          user.js
  
```

## 若有疑问，可以联系我

* QQ: 280508950 


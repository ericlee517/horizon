# 关于项目
Horizon没有使用Node.js或其他服务端项目，单纯使用Vue3+Picocss+原生Javascript开发。如果你需要部署该项目，并需要实现更多功能，建议使用Node.js或服务端语言配合开发。

# 如何部署
将项目直接下载解压就可以打开查看了。里面的作品数据都是测试数据，很多功能都没有做优化，请谨慎使用。

# 更新日志
> 自2024.7.19起开始更新

## 0.0.4
1、增加了简单的分类、搜索功能。
2、增加独立作品页面（简做，未细做）
本测试版本将会是最后一个测试版本，正式上线前不会再发布测试版本。


## v3.5-test
v3.5已更新，目前是优化了整体的UI和排版，增加了作者独立页面，优化了一些地方。

目前已知存在的问题暂未修改：
1、目录由于vue3的一些逻辑，使用的是localstorage来存储目录信息，有可能在多作品的情况下会出现一些问题，后续会对这方面优化改进。
2、访问无参数的books页面时不会自动跳转到正常页面 
3、侧边栏可能会有些逻辑问题，需要修改。
4、使用HopWeb生成Android App时需要携带PHP环境，App大小过大，需要使用图床。
5、浅色模式使用感受可能有点糟糕，需要继续优化。
6、首页布局后续还需要进行修改

会增加的功能：
1、分类和搜索
2、深浅色模式切换（开发的时候出现了一点问题，可能需要更长时间才能上线）
3、**开放内容下载**，目前预计支持txt格式。
4、对小说进行评论（由于是静态站点，可能会借助其他工具或者再开发一个工具）
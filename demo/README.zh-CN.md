# 正在听什么 — Fork 模板

[English](README.md)

一个自包含的单文件 HTML 页面，展示你此刻(或最近一次)在 Apple Music 上听的歌，数据来自
[ListenBrainz](https://listenbrainz.org/)。默认支持中英双语——首次打开会根据浏览器语言
自动判断，也可以随时点右上角的 🌐 按钮手动切换，选择会记住，下次打开还是你上次选的语言。

`demo/` 这个目录是仓库维护者自己实际在用的那份页面(`../index.html`)的一份独立、去个人化
拷贝——不带任何人的 relay 地址、账号信息或社交预览元数据。你可以随便 fork、随便改样式，
这里的改动不会影响维护者自己的部署，反之亦然。

## 快速上手(零后端)

1. 你需要一个真的在接收 Apple Music 收听记录的 ListenBrainz 账号。ListenBrainz 本身不
   直接支持 Apple Music scrobble，你需要一个桥接方案(比如 Last.fm 转 ListenBrainz 的导入，
   或者自己写一个 scrobbler)把收听记录导进去——这部分不在本模板的覆盖范围内。
2. 浏览器打开 `index.html?user=<你的 ListenBrainz 用户名>` 即可——不需要服务器、不需要
   构建步骤、不需要部署任何东西。页面会直接轮询 ListenBrainz。
3. 想真正发布出去:把 `index.html` 拷到你自己仓库(或新建一个空仓库)的根目录，然后给它
   开 GitHub Pages(Settings → Pages → Deploy from branch → `main` → `/ (root)`)。之后
   分享 `https://<你>.github.io/<仓库名>/?user=<用户名>` 这个链接就行。

## 语言

首次打开会读 `navigator.language` 自动判断语言(判断不出来时兜底英文)，之后随时可以点
工具栏里的 🌐 按钮手动切换。选择存在 `localStorage` 里，刷新/下次打开都会记住。

## 进阶功能(暂未包含)

维护者自己那份页面(`../index.html`)还额外支持留言墙、表情反应、访客计数、"历史播放
Top10 歌手"面板，以及延迟更低的实时播放状态——这些都靠一个小的 Cloudflare Worker 中继
(`?relay=` 参数)撑着，这部分源码目前还没公开。这个中继计划在配套的 macOS App 开源的
同时一并开源；在那之前，本模板按上面说的直连 ListenBrainz 模式就能跑得很好，只是没有
这些附加功能。

## 自定义

所有东西都在这一个 `index.html` 文件里——HTML 骨架、CSS、JS 全部内联，不涉及任何构建
工具链。想改翻译文案，找 `<script>` 块开头附近的 `STRINGS`；想改样式，改 `<style>` 块。

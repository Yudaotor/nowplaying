<div align="center">

# 正在听什么 ♪

**一个可以到处分享的 Apple Music 实时"正在听什么"网页——同步歌词、黑胶模式、留言墙，全部装在一个静态 HTML 文件里。**

**语言 / Language:** [English](README.md) | **简体中文**

![Single file](https://img.shields.io/badge/%E5%8D%95%E6%96%87%E4%BB%B6-%E6%97%A0%E6%9E%84%E5%BB%BA%E6%AD%A5%E9%AA%A4-success)
![Bilingual](https://img.shields.io/badge/%E7%95%8C%E9%9D%A2-%E4%B8%AD%E6%96%87%20%2F%20English-blue)
![GitHub Pages](https://img.shields.io/badge/%E6%89%98%E7%AE%A1%E5%9C%A8-GitHub%20Pages-222)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)

[**在线演示 →**](https://yudaotor.github.io/nowplaying/?user=yudaotor)

</div>

<div align="center">

<img src="images/web-preview-playing.png" width="720" alt="播放中：进度条走动、歌词逐字高亮、背景色随封面变化"><br>
<sub>播放中——歌词逐字高亮，背景色跟着封面走</sub>

<img src="images/web-preview-vinyl-dark.png" width="720" alt="深色主题 + 黑胶模式"><br>
<sub>黑胶模式——暂停时唱臂抬起</sub>

</div>

## 亮点

- **实时播放卡片**——封面、歌名/歌手/专辑、实时进度条（客户端外推，不用每秒轮询）、Mac/iPhone 设备图标
- **逐字同步歌词**，带翻译/罗马音，自动跟随当前行
- **黑胶模式** 💿——封面缩成唱片中心的标签，播放时匀速旋转、暂停时唱臂抬起（纯 CSS + Web Animations，不额外耗电）
- **最近播放**，按今天/更早分组、带近 30 天播放次数，另有全时段 **Top10 歌手**榜单
- **留言墙、❤️ 点赞、访客计数**，给来看你主页的人玩
- **中英双语界面**——自动跟随访客浏览器语言，🌐 按钮随时手动切换，选择会记住
- **氛围/浅色主题 + 沉浸全屏模式**——适合平板或副屏常驻显示
- **社交链接预览**——链接粘进 Slack/Discord/微信会自动展开当前歌名和封面
- **一个自包含的 `index.html`**——没有框架、没有构建步骤，任何静态托管都能放

<details>
<summary><b>完整功能导览</b>（每个模块具体是什么）</summary>

- **正在播放卡片**：封面（带呼吸缩放动效）、歌名/歌手/专辑、进度条（客户端外推实时位置，不用每秒轮询）、播放状态胶囊（"他正在播放" / "已暂停" / "上次播放 · N 分钟前"）、Mac/iPhone 设备图标。封面取不到时客户端会用 iTunes 搜索兜底占位，服务端解析出真封面后再无缝替换。
- **黑胶模式**（右上角 💿）：封面缩成黑胶唱片中心的"标签"，播放时匀速旋转、暂停时唱臂抬起。跟"方形封面"模式二选一，记在浏览器本地，不影响其他访客看到的样式。
- **同步歌词**：只在"当前正在播放、有精确进度"时显示。支持逐字高亮（网易云 yrc 格式）、整行高亮两种，罗马音/翻译各自一行。手动滑动歌词面板会暂停自动跟随，停手几秒后自动滚回当前行。
- **最近播放历史**：今天/更早分割线，每行标注设备图标 + 近 30 天播放次数（≥2 次才显示，避免满屏都是"×1"没有信息量）。今日统计单独一行"今日 · N 首 · 约 X 小时 Y 分"。
- **留言墙**：匿名（或填昵称）留一句话，全站共享，最多保留最新 50 条。纯 `textContent` 渲染，天然防 XSS。
- **表情反应**：一个 ❤️ 按钮，全站累计点赞数。
- **访客计数**：同一浏览器只计一次（`localStorage` 去重）。
- **历史播放 Top10 歌手**：按全时段总播放次数排的常驻榜单，一天更新一次。前三名有名次角标；头像优先取 QQ 音乐，查不到退到 Deezer，再不行退化成圆形首字母占位。
- **主题/沉浸模式**：🌗 在"氛围"（模糊封面做背景）和"浅色"之间切换；⛶ 进入沉浸全屏模式，隐藏次要信息、放大封面和歌词。
- **社交分享**：链接粘进微信/Slack/Discord 会自动展开当前在听的歌名+封面预览卡片。

</details>

## 部署一份自己的

按需选一种：

| | 能得到什么 | 从哪开始 |
|---|---|---|
| **零后端** | 正在播放 + 历史记录，直连 [ListenBrainz](https://listenbrainz.org/)——不要服务器、不用部署，就是一个静态文件 | [`demo/`](demo)——现成的 fork 模板，配 [5 分钟上手指南](demo/README.zh-CN.md) |
| **完整体验** | 上面全部 + 留言墙、点赞、访客计数、Top10 歌手、更低延迟的实时更新 | 部署 [`Yudaotor/nowplaying-workers`](https://github.com/Yudaotor/nowplaying-workers/blob/main/README.zh-CN.md) 里的免费 Cloudflare Worker 中继——它的 README 就是一份完整的从零搭建教程 |

### URL 参数

| 参数 | 含义 |
|---|---|
| `?user=<用户名>` | 要展示的 ListenBrainz 用户名（必填） |
| `?relay=<地址>` | 改从你自己的中继 Worker 读数据，覆盖内置默认值 |
| `?relay=off` | 完全跳过中继，直连 ListenBrainz |

## 仓库里有什么

- [`index.html`](index.html)——作者自己在线上跑的那份页面（就是上面的演示链接），内置了作者自己的中继地址
- [`demo/`](demo)——同一份页面的去个人化版本，专门给 fork 用：没有个人中继地址、没有个人元数据，中继默认关闭
- [`sw.js`](sw.js)——一个小 Service Worker，缓存页面壳和封面图让重复访问秒开（作者自己的部署在用；模板刻意没带它）

## 整体架构

```
Lyrimuse (macOS App + 采集器)  ──推送──▶  state-worker (Cloudflare Worker + KV)  ◀──读取──  本页面
                                                                                     └──兜底──▶ ListenBrainz
```

| 仓库 | 角色 |
|---|---|
| **Yudaotor/nowplaying**（本仓库） | 网页本体 |
| [**Yudaotor/nowplaying-workers**](https://github.com/Yudaotor/nowplaying-workers) | 背后可选的 Cloudflare Worker 中继，外加一个实时 README 徽章 |
| **Lyrimuse** | 推送实时状态的 macOS 菜单栏歌词 App（暂未开源——没有它页面也能靠 ListenBrainz 兜底正常跑） |

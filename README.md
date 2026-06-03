# 课伴AI — 大学生智能学习与资料整合平台

> 让 AI 成为每个大学生的专属学习伙伴

## 项目简介

**课伴AI** 是一款专为大学生打造的 AI 智能学习与资料整合平台，以微信小程序为主要载体。项目为《大学生创新创业基础》课程创业计划项目，核心交付物为项目策划书及功能演示 Demo。

### 核心功能

| 模块 | 说明 |
|------|------|
| AI 笔记整理 | 上传课件，AI 自动生成结构化笔记 |
| 复习提纲 | 基于笔记生成带重点标记的复习大纲 |
| 错题分析 | 录入错题，AI 分析错误原因并推荐知识点 |
| AI 答疑 | 对话框式 AI 学习助手 |
| 学习搭子 | AI 匹配同专业学习伙伴 |
| 知识视频 | 搜索并浏览知识点讲解视频（Mock） |
| 学习计划 | 个性化每日任务计划 |
| 绩点计算 | 成绩与学分输入自动算 GPA |

## 技术栈

- **前端** — 微信小程序（WXML + WXSS + JS）+ Web 端 HTML/CSS/JS
- **后端** — Node.js + Express（RESTful API，Mock AI 接口）
- **文档生成** — docx（项目策划书自动生成）

## 项目结构

```
dachuang/
├── server.js                        # Express 服务器（Mock API）
├── package.json                     # 项目依赖
├── project.config.json              # 微信小程序项目配置
├── public/                          # Web 端 Demo
│   ├── index.html                   # 入口页面
│   ├── css/style.css                # 样式
│   └── js/
│       ├── app.js                   # 应用逻辑 + Modal 管理
│       ├── data.js                  # Mock 数据
│       └── pages/                   # 页面组件
│           ├── home.js
│           ├── discover.js
│           └── profile.js
├── miniprogram/                     # 微信小程序源码
│   ├── app.js / app.json / app.wxss
│   ├── pages/                       # 小程序页面
│   └── utils/
├── docs/1-需求对齐/                  # 需求文档
│   ├── 产品定位.md
│   ├── 功能清单.md
│   ├── 技术约束.md
│   └── 用户故事.md
├── 课伴AI_项目策划书.js               # 策划书生成脚本
└── 课伴AI_项目策划书.docx             # 生成的策划书文档
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动 Demo 服务器
npm start
# 访问 http://localhost:3000

# 生成项目策划书
node 课伴AI_项目策划书.js
```

## 演示路线

1. 首页仪表盘（考试倒计时 + 待复习课程数）
2. 上传资料 → AI 生成笔记
3. 笔记页面 → 生成复习提纲
4. 错题分析 → 录入错题 → AI 分析
5. AI 答疑对话
6. 知识点视频搜索
7. 学习搭子匹配
8. 个人主页（学习成果概览）

> 完整演示约 3-5 分钟。

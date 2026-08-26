# 🧰 超能工具箱

> 一个纯前端的多功能网页工具箱，包含 45 个实用小工具，所有代码均为 HTML + CSS + JavaScript，无需任何外部依赖，兼容老旧浏览器（包括 IE11）。

## 📁 项目结构

```

my-toolbox/
├── index.html                     # 主页导航
├── README.md                      # 项目说明
├── LICENSE                        # Apache License 2.0
└── tools/                         # 所有工具独立存放
├── calculator/                # 计算器
├── base64/                    # Base64 编解码
├── timestamp/                 # 时间戳转换
├── color-converter/           # 颜色转换 (HEX ↔ RGB ↔ HSL)
├── json-formatter/            # JSON 格式化 / 压缩
├── password-generator/        # 密码生成器
├── word-counter/              # 字数统计
├── case-converter/            # 大小写转换
├── uuid-generator/            # UUID v4 生成器
├── url-encoder/               # URL 编码 / 解码
├── random-generator/          # 随机数生成器
├── base-converter/            # 进制转换 (2/8/10/16)
├── byte-converter/            # 字节单位换算
├── regex-tester/              # 正则表达式测试
├── html-entity/               # HTML 实体编解码
├── date-calculator/           # 日期计算器
├── text-processor/            # 文本行处理
├── temperature-converter/      # 温度换算
├── length-converter/          # 长度换算
├── weight-converter/          # 重量换算
├── speed-converter/           # 速度换算
├── area-converter/            # 面积换算
├── volume-converter/          # 体积换算
├── morse-code/                # 摩斯密码
├── unicode-converter/         # Unicode 码点编解码
├── md5-generator/             # MD5 哈希 (纯 JS)
├── base64-image/              # 图片转 Base64 DataURL
├── text-diff/                 # 文本对比 (行差异)
├── find-replace/              # 查找替换 (支持正则)
├── csv-markdown/              # CSV ⇄ Markdown 表格
├── word-frequency/            # 词频统计
├── color-picker/              # 颜色选择器
├── cron-explainer/            # Cron 表达式解析
├── sql-formatter/             # SQL 格式化
├── lorem-generator/           # Lorem 占位文本
├── roman-numeral/             # 罗马数字互转
├── number-to-chinese/         # 数字转中文大写
├── age-calculator/            # 年龄计算
├── bmi-calculator/            # BMI 身体质量指数
├── random-picker/             # 随机抽签
├── countdown-timer/           # 倒计时
├── stopwatch/                 # 秒表
├── url-parser/                # URL 解析
├── slug-generator/            # URL Slug 生成
└── calendar-generator/        # 月历生成
    └── 每个文件夹下均含 index.html

```

## 🚀 如何使用

1. 下载或克隆本仓库到本地。
2. 直接用浏览器打开 `index.html` 即可看到导航页。
3. 点击任意卡片进入对应工具页面。
4. 每个工具页面都包含 `← 返回工具箱` 链接，可快速返回主页。

## ✨ 已包含工具清单

| 图标 | 工具名 | 功能描述 |
|------|--------|----------|
| 📐 | 计算器 | 加减乘除四则运算 |
| 🔐 | Base64 编解码 | 文本与 Base64 互转（支持中文） |
| ⏰ | 时间戳转换 | Unix 秒级时间戳 ↔ 日期时间 |
| 🎨 | 颜色转换 | HEX、RGB、HSL 互相转换，带实时预览 |
| 📋 | JSON 格式化 | 格式化或压缩 JSON 字符串 |
| 🔑 | 密码生成器 | 自定义长度和字符类型，生成强密码 |
| 📊 | 字数统计 | 统计字符数、单词数、行数、段落数 |
| 📝 | 大小写转换 | 全大写、全小写、首字母大写、驼峰命名 |
| 🆔 | UUID 生成 | 生成随机 UUID v4 |
| 🌐 | URL 编解码 | 对 URL 或字符串进行 encodeURI/decodeURI |
| 🎲 | 随机数生成 | 生成指定范围内的随机整数或列表 |
| 🔢 | 进制转换 | 二进制 / 八进制 / 十进制 / 十六进制互转 |
| 📦 | 字节换算 | B / KB / MB / GB / TB 互相换算 |
| 🧪 | 正则测试 | 测试正则表达式，支持 g/i/m 标志 |
| 🔣 | HTML 实体 | HTML 实体的转义与反转义 |
| 📅 | 日期计算 | 计算两个日期的天数 / 周数 / 月数差 |
| 📝 | 文本行处理 | 排序 / 去重 / 反转 / 去空行 |
| 🌡️ | 温度换算 | 摄氏度 / 华氏度 / 开尔文互转 |
| 📏 | 长度换算 | m / km / 英寸 / 英尺 / 码 / 英里 |
| ⚖️ | 重量换算 | kg / g / 吨 / 磅 / 盎司 |
| 💨 | 速度换算 | m/s / km/h / mph / 节 |
| 🟦 | 面积换算 | m² / 公顷 / 英亩 / 平方英尺 |
| 🪣 | 体积换算 | L / m³ / 加仑 / 杯 / 液量盎司 |
| 📻 | 摩斯密码 | 文本与摩斯密码互转 |
| 🔡 | Unicode 编码 | 字符与码点互转 |
| 🔐 | MD5 哈希 | 纯 JS 实现的 MD5 计算 |
| 🖼️ | Base64 图片 | 图片文件编码为 DataURL |
| 🔍 | 文本对比 | 两个文本的行级差异 |
| 🔎 | 查找替换 | 支持正则的查找替换 |
| 📊 | CSV ⇄ MD | CSV 与 Markdown 表格互转 |
| 📈 | 词频统计 | 统计词语出现次数 |
| 🎨 | 颜色选择器 | HEX / RGB / HSL 实时转换 |
| ⏲️ | Cron 解析 | 解析标准 Cron 表达式 |
| 🗄️ | SQL 格式化 | 美化 SQL 语句 |
| 📝 | Lorem 生成 | 生成占位文本 |
| 🏛️ | 罗马数字 | 阿拉伯数字与罗马数字互转 |
| 💴 | 金额大写 | 数字转中文大写金额 |
| 🎂 | 年龄计算 | 计算年龄（岁/月/天） |
| ⚖️ | BMI 计算 | 身体质量指数及分类 |
| 🎯 | 随机抽签 | 从选项中随机抽签 |
| ⏳ | 倒计时 | 至目标时间的倒计时 |
| ⏱️ | 秒表 | 开始/暂停/重置计时 |
| 🌐 | URL 解析 | 拆分协议/主机/参数等 |
| 🔗 | Slug 生成 | 文本转 URL 友好字符串 |
| 📆 | 月历生成 | 生成指定年月的日历 |

## 🛠 扩展新工具

1. 在 `tools/` 下新建一个文件夹，例如 `my-new-tool/`。
2. 在里面创建 `index.html`，按任意工具模板写功能代码。
3. 在主页 `index.html` 的 `.grid` 中添加一个 `<a>` 卡片，指向新工具路径。

## 🌐 浏览器兼容性

- **Chrome / Firefox / Edge / Safari**（所有现代版本）：完美支持。
- **Internet Explorer 11**：兼容（未使用 ES6+ 新特性，已测试可用）。
- **Android WebView 83+**：流畅运行。

## ⚠️ 许可证

本项目基于 **Apache License 2.0** 开源授权，详细条款见仓库根目录的 `LICENSE` 文件。

- 您可以自由地使用、复制、修改、分发本项目的代码，包括用于商业用途。
- 在分发衍生作品时，需保留原始版权声明与许可证声明，并说明所做的修改。
- 本项目按 "AS IS" 提供，不附带任何明示或暗示的担保。

详见：[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)

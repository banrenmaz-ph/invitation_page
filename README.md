# 邀请函网站 | Invitation Page

一个精美的邀请函网页，用于活动和聚会的邀请。

## 功能特点

✨ **精美设计**
- 现代化的渐变背景
- 优雅的卡片式布局
- 流畅的动画效果

📱 **响应式设计**
- 完美适配桌面端和移动端
- 自适应各种屏幕尺寸

🎯 **交互功能**
- 在线确认参加功能
- 表单验证
- 友好的用户反馈

## 使用方法

1. 克隆或下载此仓库
2. 配置Google Sheets表单收集（见下方配置说明）
3. 在浏览器中打开 `index.html` 文件
4. 自定义活动信息

## Google Sheets配置

### 步骤1: 创建Google Sheets表格

1. 访问 [Google Sheets](https://sheets.new) 创建新表格
2. 命名表格（例如：邀请函回复收集）

### 步骤2: 部署Google Apps Script

1. 在Google Sheets中，点击菜单栏的 **Extensions (扩展)** > **Apps Script**
2. 删除默认代码，将 `Google-Apps-Script-Code.gs` 文件中的代码复制粘贴进去
3. 点击 **Save (保存)** 图标
4. 点击 **Deploy (部署)** > **New deployment (新建部署)**
5. 点击齿轮图标 ⚙️，选择 **Web app (Web应用)**
6. 填写配置：
   - **Description (描述)**: 邀请函表单收集
   - **Execute as (执行身份)**: Me (我/你的邮箱)
   - **Who has access (访问权限)**: Anyone (任何人)
7. 点击 **Deploy (部署)**
8. 复制获得的 **Web app URL**（格式：`https://script.google.com/macros/s/...`）

### 步骤3: 配置代码

1. 打开 `script.js` 文件
2. 找到第3行的 `GOOGLE_SCRIPT_URL` 常量
3. 将 `'YOUR_GOOGLE_SCRIPT_URL_HERE'` 替换为你的Web app URL

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/your-script-id/exec';
```

### 步骤4: 初始化表格（可选）

在Apps Script编辑器中：
1. 选择函数 `formatSheet`
2. 点击运行 ▶️
3. 授权脚本访问你的Google Sheets
4. 这会设置好表头和格式

### 步骤5: 测试

1. 打开 `index.html`
2. 点击"确认参加"按钮
3. 填写表单并提交
4. 检查Google Sheets表格是否出现新数据

**功能特点：**
- ✅ 完全免费
- ✅ 无限次提交
- ✅ 数据实时更新到表格
- ✅ 自动添加时间戳
- ✅ 美观的表格格式
- ✅ 可导出为Excel、CSV等格式

## 自定义内容

### 修改活动信息

编辑 `index.html` 文件中的以下部分：

```html
<!-- 活动时间 -->
<p>2026年4月20日</p>
<p class="time">14:00 - 18:00</p>

<!-- 活动地点 -->
<p>上海市浦东新区</p>
<p class="location">陆家嘴金融中心</p>

<!-- 活动主题 -->
<p>春日聚会 & 创意分享</p>
```

### 修改样式

编辑 `styles.css` 文件可以自定义：
- 颜色主题
- 字体样式
- 动画效果
- 布局结构

### 修改JavaScript功能

编辑 `script.js` 文件可以：
- 添加表单验证规则
- 修改提交逻辑
- 添加更多交互功能

## 文件结构

```
invitation_page/
├── index.html      # 主页面
├── styles.css      # 样式文件
├── script.js       # JavaScript交互
└── README.md       # 说明文档
```

## 技术栈

- HTML5
- CSS3 (动画、Flexbox、Grid)
- Vanilla JavaScript (无依赖)

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 部署

可以部署到任何静态网站托管服务：

- GitHub Pages
- Netlify
- Vercel
- 或任何web服务器

## 许可证

MIT License

---

**享受您的邀请函网站！** 🎉

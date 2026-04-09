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

🖼️ **图片展示**（新功能）
- 支持添加活动相关图片
- 网格布局展示
- 点击放大查看
- 灵活管理图片内容

⚙️ **图片管理**（新功能）
- 可视化配置编辑器
- 添加/编辑/删除图片
- 调整图片显示顺序
- 生成配置代码
- 配置随代码版本控制

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

## 图片管理功能使用说明

### 工作原理

图片配置直接存储在 `config.js` 文件中，这意味着：
- ✅ 配置随代码一起版本控制
- ✅ 所有用户看到相同的图片
- ✅ 修改后推送到 GitHub 即可更新
- ✅ 简单可靠，无需后端

### 方式一：使用可视化编辑器（推荐）

1. 在浏览器中打开 `admin.html`
2. 使用可视化界面添加、编辑、删除图片
3. 调整图片显示顺序
4. 点击"生成配置代码"按钮
5. 复制生成的代码
6. 打开 `config.js` 文件，找到 `gallery.images` 部分
7. 用生成的代码替换原有的图片数组
8. 保存文件并刷新邀请函页面查看效果

**访问管理界面：**
- 在邀请函页面右下角点击齿轮图标 ⚙️
- 或直接在浏览器中打开 `admin.html`

### 方式二：直接编辑配置文件

直接编辑 `config.js` 文件中的 `gallery.images` 数组：

```javascript
gallery: {
    // ... 其他配置
    images: [
        {
            id: 1,
            url: 'https://example.com/image1.jpg',
            caption: '图片说明'
        },
        {
            id: 2,
            url: 'https://example.com/image2.jpg',
            caption: '另一张图片'
        }
    ]
}
```

**注意事项：**
- 每张图片需要一个唯一的 `id`
- `url` 必须是有效的图片链接
- `caption` 是可选的图片说明
- 添加或删除图片后记得保存文件

### 图片URL来源建议

- **免费图库**：Unsplash、Pexels、Pixabay
- **图床服务**：imgur、Cloudinary
- **自建服务器**：将图片放在自己的服务器上
- **GitHub仓库**：可以将图片放在项目的 `images/` 目录中

## 部署到 GitHub Pages

1. 将项目推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择主分支作为发布源
4. 访问 `https://你的用户名.github.io/invitation_page/`

### 推送命令示例

```bash
# 初始化仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "更新图片配置"

# 推送到 GitHub
git push origin main
```

### 更新图片流程

1. 在本地编辑 `config.js` 或使用 `admin.html` 生成配置
2. 在浏览器中刷新页面验证效果
3. 提交并推送到 GitHub
4. 等待 GitHub Pages 自动部署（通常需要几秒钟）

## 文件结构

```
invitation_page/
├── index.html          # 主页面
├── admin.html          # 图片管理界面（新增）
├── styles.css          # 主页面样式
├── admin.css           # 管理界面样式（新增）
├── script.js           # 主页面交互
├── admin.js            # 管理界面逻辑（新增）
├── config.js           # 配置文件（新增）
├── README.md           # 说明文档
└── Google-Apps-Script-Code.gs  # Google Apps Script代码
```

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

# 个人学术网站

这是一个为CS PhD学生设计的简洁、现代化的个人学术网站。网站采用响应式设计，适合在各种设备上浏览。

## 功能特点

- 🎨 现代化设计，采用渐变色彩和卡片式布局
- 📱 完全响应式，支持手机、平板和桌面设备
- ⚡ 快速加载，优化的CSS和JavaScript
- 🎯 针对学术人员优化的内容结构
- 🔗 支持GitHub Pages托管

## 网站结构

```
personal_page/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript交互
└── README.md           # 项目说明
```

## 自定义内容

### 1. 个人信息修改

在 `index.html` 中修改以下内容：

- **姓名**: 将 "石一鹤" 替换为你的姓名
- **职位**: 修改 "计算机科学博士研究生" 为你的职位
- **研究领域**: 更新研究描述和技能标签
- **统计数据**: 修改研究经验、论文数量等项目

### 2. 研究方向

在 `index.html` 的 `.research-grid` 部分修改研究方向：

```html
<div class="research-card">
    <div class="research-icon">
        <i class="fas fa-brain"></i>
    </div>
    <h3>你的研究方向</h3>
    <p>研究描述...</p>
</div>
```

### 3. 学术论文

在 `index.html` 的 `.publications-list` 部分添加你的论文：

```html
<div class="publication-item">
    <div class="publication-year">2024</div>
    <div class="publication-content">
        <h3>论文标题</h3>
        <p class="publication-authors">作者列表</p>
        <p class="publication-venue">会议/期刊名称</p>
        <div class="publication-links">
            <a href="论文链接" class="publication-link">
                <i class="fas fa-external-link-alt"></i> 论文链接
            </a>
            <a href="代码链接" class="publication-link">
                <i class="fab fa-github"></i> 代码
            </a>
        </div>
    </div>
</div>
```

### 4. 联系方式

在 `index.html` 的 `.contact-info` 部分更新你的联系信息：

- 邮箱地址
- GitHub链接
- LinkedIn链接
- 地址信息

## 部署到GitHub Pages

### 方法一：直接部署

1. 在GitHub上创建一个新的仓库，命名为 `你的用户名.github.io`
2. 将网站文件上传到仓库
3. 在仓库设置中启用GitHub Pages
4. 选择主分支作为源
5. 访问 `https://你的用户名.github.io` 查看网站

### 方法二：使用其他仓库名

1. 创建任意名称的仓库
2. 上传网站文件
3. 在仓库设置中启用GitHub Pages
4. 选择主分支作为源
5. 网站将部署在 `https://你的用户名.github.io/仓库名`

## 本地预览

1. 下载所有文件到本地
2. 用浏览器打开 `index.html` 文件
3. 或者使用本地服务器（推荐）：
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 使用Node.js
   npx serve .
   ```

## 自定义样式

### 修改颜色主题

在 `styles.css` 中修改CSS变量：

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    --text-color: #1e293b;
    --background-color: #f8fafc;
}
```

### 修改字体

在 `index.html` 的 `<head>` 部分更换Google Fonts链接：

```html
<link href="https://fonts.googleapis.com/css2?family=你的字体:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

然后在 `styles.css` 中更新字体族：

```css
body {
    font-family: '你的字体', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

## 添加新功能

### 添加博客部分

1. 在导航菜单中添加博客链接
2. 创建新的section用于博客内容
3. 可以链接到外部博客平台或添加简单的博客列表

### 添加项目展示

1. 在导航菜单中添加项目链接
2. 创建项目展示section
3. 使用卡片布局展示项目截图和描述

### 添加简历下载

在联系部分添加简历下载链接：

```html
<div class="contact-item">
    <i class="fas fa-file-pdf"></i>
    <div>
        <h3>简历</h3>
        <p><a href="path/to/resume.pdf" target="_blank">下载PDF版本</a></p>
    </div>
</div>
```

## 性能优化建议

1. **图片优化**: 如果添加个人照片，请压缩图片大小
2. **字体优化**: 考虑使用系统字体以减少加载时间
3. **代码压缩**: 部署前可以压缩CSS和JavaScript文件
4. **CDN使用**: 考虑将静态资源托管在CDN上

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 许可证

MIT License - 可自由使用和修改

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

---

**注意**: 记得将示例内容替换为你的真实信息，并确保所有链接都是有效的。 
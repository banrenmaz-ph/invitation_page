// ==================== 图片配置编辑器 ====================
const ConfigEditor = {
    images: [],
    sampleImages: [
        {
            id: 1,
            url: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?w=600',
            caption: '美好时光'
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',
            caption: '温馨聚会'
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600',
            caption: '欢聚时刻'
        },
        {
            id: 4,
            url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600',
            caption: '派对现场'
        },
        {
            id: 5,
            url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600',
            caption: '音乐节'
        }
    ],

    // 加载示例图片
    loadSampleImages() {
        if (this.images.length > 0) {
            if (!confirm('当前已有图片，是否要清空并加载示例图片？')) {
                return;
            }
        }
        this.images = JSON.parse(JSON.stringify(this.sampleImages));
        this.render();
        this.showToast('示例图片加载成功！', 'success');
    },

    // 尝试从当前配置加载（通过读取 CONFIG 对象）
    loadCurrentConfig() {
        try {
            if (window.CONFIG && window.CONFIG.gallery && window.CONFIG.gallery.images) {
                if (this.images.length > 0) {
                    if (!confirm('当前列表已有图片，是否要覆盖？')) {
                        return;
                    }
                }
                this.images = JSON.parse(JSON.stringify(window.CONFIG.gallery.images));
                this.render();
                this.showToast('当前配置加载成功！', 'success');
            } else {
                this.showToast('未找到当前配置，请确保 config.js 已正确加载', 'error');
            }
        } catch (e) {
            console.error('加载配置失败:', e);
            this.showToast('加载配置失败', 'error');
        }
    },

    // 添加图片
    addImage(url, caption = '') {
        const newImage = {
            id: Date.now(),
            url: url.trim(),
            caption: caption.trim()
        };
        this.images.push(newImage);
        this.render();
        this.showToast('图片添加成功！', 'success');
    },

    // 更新图片
    updateImage(id, url, caption) {
        const index = this.images.findIndex(img => img.id === id);
        if (index !== -1) {
            this.images[index] = {
                ...this.images[index],
                url: url.trim(),
                caption: caption.trim()
            };
            this.render();
            this.showToast('图片更新成功！', 'success');
        }
    },

    // 删除图片
    deleteImage(id) {
        if (confirm('确定要删除这张图片吗？')) {
            this.images = this.images.filter(img => img.id !== id);
            this.render();
            this.showToast('图片已删除', 'success');
        }
    },

    // 上移图片
    moveUp(id) {
        const index = this.images.findIndex(img => img.id === id);
        if (index > 0) {
            [this.images[index], this.images[index - 1]] = [this.images[index - 1], this.images[index]];
            this.render();
        }
    },

    // 下移图片
    moveDown(id) {
        const index = this.images.findIndex(img => img.id === id);
        if (index < this.images.length - 1) {
            [this.images[index], this.images[index + 1]] = [this.images[index + 1], this.images[index]];
            this.render();
        }
    },

    // 清空所有图片
    clearAll() {
        if (this.images.length === 0) {
            this.showToast('列表已经是空的', 'info');
            return;
        }
        if (confirm('确定要清空所有图片吗？')) {
            this.images = [];
            this.render();
            this.showToast('已清空所有图片', 'success');
        }
    },

    // 生成配置代码
    generateConfigCode() {
        if (this.images.length === 0) {
            this.showToast('请先添加图片', 'error');
            return;
        }

        const code = `        images: [
${this.images.map(img => `            {
                id: ${img.id},
                url: '${img.url}',
                caption: '${img.caption}'
            }`).join(',\n')}
        ]`;

        const codeBlock = document.getElementById('codeBlock');
        const codeOutput = document.getElementById('codeOutput');

        codeBlock.textContent = code;
        codeOutput.style.display = 'block';

        // 滚动到代码区域
        codeOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        this.showToast('配置代码生成成功！', 'success');
    },

    // 复制代码到剪贴板
    copyCode() {
        const codeBlock = document.getElementById('codeBlock');
        const code = codeBlock.textContent;

        navigator.clipboard.writeText(code).then(() => {
            this.showToast('代码已复制到剪贴板！', 'success');
        }).catch(err => {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = code;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                this.showToast('代码已复制到剪贴板！', 'success');
            } catch (e) {
                this.showToast('复制失败，请手动复制', 'error');
            }
            document.body.removeChild(textArea);
        });
    },

    // 渲染图片列表
    render() {
        const imageList = document.getElementById('imageList');
        const imageCount = document.getElementById('imageCount');
        const emptyState = document.getElementById('emptyState');
        const codeOutput = document.getElementById('codeOutput');

        imageCount.textContent = this.images.length;

        // 隐藏代码输出区域（需要重新生成）
        codeOutput.style.display = 'none';

        if (this.images.length === 0) {
            imageList.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        imageList.style.display = 'grid';
        emptyState.style.display = 'none';

        imageList.innerHTML = this.images.map((img, index) => `
            <div class="image-item">
                <img src="${img.url}" alt="${img.caption || '图片'}" class="image-thumb"
                     onerror="this.src='https://via.placeholder.com/80x80?text=加载失败'">
                <div class="image-info">
                    <div class="image-url">${this.truncateUrl(img.url, 50)}</div>
                    <div class="image-caption">${img.caption || '无说明'}</div>
                </div>
                <div class="image-actions">
                    <button class="icon-btn move-up" onclick="ConfigEditor.moveUp(${img.id})"
                            title="上移" ${index === 0 ? 'disabled' : ''}>↑</button>
                    <button class="icon-btn move-down" onclick="ConfigEditor.moveDown(${img.id})"
                            title="下移" ${index === this.images.length - 1 ? 'disabled' : ''}>↓</button>
                    <button class="icon-btn edit" onclick="EditModal.open(${img.id})" title="编辑">✏️</button>
                    <button class="icon-btn delete" onclick="ConfigEditor.deleteImage(${img.id})" title="删除">🗑️</button>
                </div>
            </div>
        `).join('');
    },

    // 截断URL显示
    truncateUrl(url, maxLength) {
        if (url.length <= maxLength) return url;
        return url.substring(0, maxLength) + '...';
    },

    // 显示提示消息
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast toast-${type} toast-show`;

        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }
};

// ==================== 编辑弹窗 ====================
const EditModal = {
    modal: null,
    form: null,
    currentImageId: null,

    init() {
        this.modal = document.getElementById('editModal');
        this.form = document.getElementById('editImageForm');

        // 关闭按钮
        this.modal.querySelector('.close').addEventListener('click', () => this.close());

        // 点击外部关闭
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.close();
            }
        });

        // 表单提交
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.save();
        });
    },

    open(imageId) {
        this.currentImageId = imageId;
        const image = ConfigEditor.images.find(img => img.id === imageId);

        if (image) {
            document.getElementById('editImageId').value = image.id;
            document.getElementById('editImageUrl').value = image.url;
            document.getElementById('editImageCaption').value = image.caption || '';

            this.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },

    close() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.currentImageId = null;
    },

    save() {
        const id = parseInt(document.getElementById('editImageId').value);
        const url = document.getElementById('editImageUrl').value;
        const caption = document.getElementById('editImageCaption').value;

        if (url.trim()) {
            ConfigEditor.updateImage(id, url, caption);
            this.close();
        } else {
            alert('请输入图片URL');
        }
    }
};

// ==================== 表单处理 ====================
const FormHandler = {
    init() {
        const addImageForm = document.getElementById('addImageForm');

        addImageForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const url = document.getElementById('imageUrl').value;
            const caption = document.getElementById('imageCaption').value;

            if (url.trim()) {
                ConfigEditor.addImage(url, caption);
                addImageForm.reset();
            } else {
                alert('请输入图片URL');
            }
        });

        // 清空按钮
        document.getElementById('clearBtn').addEventListener('click', () => {
            ConfigEditor.clearAll();
        });

        // 加载示例图片
        document.getElementById('loadSampleBtn').addEventListener('click', () => {
            ConfigEditor.loadSampleImages();
        });

        // 加载当前配置
        document.getElementById('loadCurrentBtn').addEventListener('click', () => {
            ConfigEditor.loadCurrentConfig();
        });

        // 生成配置代码
        document.getElementById('generateBtn').addEventListener('click', () => {
            ConfigEditor.generateConfigCode();
        });

        // 复制代码
        document.getElementById('copyCodeBtn').addEventListener('click', () => {
            ConfigEditor.copyCode();
        });
    }
};

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    EditModal.init();
    FormHandler.init();
    ConfigEditor.render();
});

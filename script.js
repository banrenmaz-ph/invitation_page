// ==================== 配置加载 ====================
let CONFIG;
try {
    CONFIG = window.CONFIG || {
        googleScriptUrl: 'YOUR_GOOGLE_SCRIPT_URL_HERE',
        animation: {
            pageLoadDelay: 100,
            detailItemStartDelay: 500,
            detailItemDelay: 100,
            scheduleItemStartDelay: 800,
            scheduleItemDelay: 100,
            successMessageDuration: 3000
        },
        validation: {
            phoneRegex: /^1[3-9]\d{9}$/
        }
    };
} catch (e) {
    console.warn('配置文件未加载，使用默认配置');
}

// ==================== DOM元素 ====================
const DOM = {
    rsvpBtn: document.getElementById('rsvpBtn'),
    modal: document.getElementById('modal'),
    closeBtn: document.querySelector('.close'),
    rsvpForm: document.getElementById('rsvpForm'),
    successMessage: document.getElementById('successMessage'),
    submitBtn: null
};

// ==================== 弹窗管理 ====================
const Modal = {
    open() {
        DOM.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    },

    close() {
        DOM.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    },

    init() {
        DOM.rsvpBtn.addEventListener('click', () => this.open());
        DOM.closeBtn.addEventListener('click', () => this.close());

        window.addEventListener('click', (event) => {
            if (event.target === DOM.modal) {
                this.close();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DOM.modal.style.display === 'block') {
                this.close();
            }
        });
    }
};

// ==================== 表单管理 ====================
const FormManager = {
    validate(formData) {
        // 验证必填字段
        if (!formData.name || !formData.phone) {
            return {
                valid: false,
                message: '请填写完整信息'
            };
        }

        // 验证手机号
        if (!CONFIG.validation.phoneRegex.test(formData.phone)) {
            return {
                valid: false,
                message: '请输入正确的手机号码'
            };
        }

        return { valid: true };
    },

    getFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            guests: document.getElementById('guests').value,
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
        };
    },

    async submit(formData) {
        const validation = this.validate(formData);
        if (!validation.valid) {
            alert(validation.message);
            return false;
        }

        // 检查是否配置了Google Script URL
        if (!CONFIG.googleScriptUrl || CONFIG.googleScriptUrl === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
            console.warn('请先配置Google Apps Script URL！当前仅记录到控制台');
            console.log('提交的数据:', formData);
            this.simulateSubmit(formData);
            return true;
        }

        return await this.submitToGoogleSheets(formData);
    },

    simulateSubmit(formData) {
        setTimeout(() => {
            Modal.close();
            SuccessMessage.show();
            DOM.rsvpForm.reset();
        }, 500);
    },

    async submitToGoogleSheets(formData) {
        const submitBtn = DOM.rsvpForm.querySelector('.submit-button');
        submitBtn.disabled = true;
        submitBtn.textContent = '提交中...';

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时

            await fetch(CONFIG.googleScriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            Modal.close();
            SuccessMessage.show();
            DOM.rsvpForm.reset();
            return true;

        } catch (error) {
            console.error('提交失败:', error);
            if (error.name === 'AbortError') {
                alert('请求超时，请检查网络连接后重试');
            } else {
                alert('提交失败，请稍后重试或联系主办方');
            }
            return false;
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '提交';
        }
    },

    init() {
        DOM.rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = this.getFormData();
            await this.submit(formData);
        });

        // 实时输入验证
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');

        nameInput.addEventListener('input', function() {
            this.value = this.value.trim();
        });

        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
        });
    }
};

// ==================== 成功消息 ====================
const SuccessMessage = {
    show() {
        DOM.successMessage.style.display = 'block';
        setTimeout(() => {
            DOM.successMessage.style.display = 'none';
        }, CONFIG.animation.successMessageDuration);
    }
};

// ==================== 动画管理 ====================
const Animation = {
    fadeInElements() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, CONFIG.animation.pageLoadDelay);
    },

    animateDetailItems() {
        const detailItems = document.querySelectorAll('.detail-item');
        detailItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, CONFIG.animation.detailItemStartDelay + index * CONFIG.animation.detailItemDelay);
        });
    },

    animateScheduleItems() {
        const scheduleItems = document.querySelectorAll('.schedule-list li');
        scheduleItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, CONFIG.animation.scheduleItemStartDelay + index * CONFIG.animation.scheduleItemDelay);
        });
    },

    init() {
        window.addEventListener('load', () => {
            this.fadeInElements();
            this.animateDetailItems();
            this.animateScheduleItems();
        });
    }
};

// ==================== 图片展示管理 ====================
const Gallery = {
    images: [],

    loadImages() {
        // 从配置中读取图片
        if (CONFIG.gallery && CONFIG.gallery.images) {
            this.images = CONFIG.gallery.images;
        } else {
            console.warn('未找到图片配置');
            this.images = [];
        }
    },

    render() {
        const container = document.getElementById('galleryContainer');
        if (!container) return;

        if (this.images.length === 0) {
            container.innerHTML = '<p class="no-images">暂无图片</p>';
            return;
        }

        container.innerHTML = this.images.map((img, index) => `
            <div class="gallery-item" data-index="${index}">
                <img src="${img.url}" alt="${img.caption}" loading="lazy">
                ${img.caption ? `<div class="gallery-caption">${img.caption}</div>` : ''}
            </div>
        `).join('');

        // 添加点击事件
        container.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                this.openLightbox(index);
            });
        });
    },

    openLightbox(index) {
        const img = this.images[index];
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="${img.url}" alt="${img.caption}">
            ${img.caption ? `<div class="lightbox-caption">${img.caption}</div>` : ''}
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            this.closeLightbox(lightbox);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox(lightbox);
            }
        });
    },

    closeLightbox(lightbox) {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }, 300);
    },

    init() {
        this.loadImages();
        this.render();
    }
};

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    Modal.init();
    FormManager.init();
    Animation.init();
    Gallery.init();
});

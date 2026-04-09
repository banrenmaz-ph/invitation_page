// 获取DOM元素
const rsvpBtn = document.getElementById('rsvpBtn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const rsvpForm = document.getElementById('rsvpForm');
const successMessage = document.getElementById('successMessage');

// 打开弹窗
rsvpBtn.addEventListener('click', function() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// 关闭弹窗
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// 点击弹窗外部关闭
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Google Apps Script配置 - 请替换为你的部署URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE'; // 部署后获得的Web App URL

// 表单提交
rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // 获取表单数据
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        guests: document.getElementById('guests').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
    };

    // 验证表单
    if (!formData.name || !formData.phone) {
        alert('请填写完整信息');
        return;
    }

    // 验证手机号
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
        alert('请输入正确的手机号码');
        return;
    }

    // 检查是否配置了Google Script URL
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE' || GOOGLE_SCRIPT_URL === '') {
        console.warn('请先配置Google Apps Script URL！当前仅记录到控制台');
        console.log('提交的数据:', formData);

        // 开发模式下延迟1秒后显示成功
        setTimeout(() => {
            modal.style.display = 'none';
            showSuccessMessage();
            rsvpForm.reset();
            document.body.style.overflow = 'auto';
        }, 500);
        return;
    }

    // 禁用提交按钮，防止重复提交
    const submitBtn = rsvpForm.querySelector('.submit-button');
    submitBtn.disabled = true;
    submitBtn.textContent = '提交中...';

    // 发送数据到Google Sheets
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script要求
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        // no-cors模式下无法读取响应，但成功提交会返回200

        // 关闭弹窗
        modal.style.display = 'none';

        // 显示成功消息
        showSuccessMessage();

        // 重置表单
        rsvpForm.reset();

        // 恢复滚动
        document.body.style.overflow = 'auto';
    })
    .catch(error => {
        console.error('提交失败:', error);
        alert('提交失败，请稍后重试或联系主办方');
    })
    .finally(() => {
        // 恢复提交按钮
        submitBtn.disabled = false;
        submitBtn.textContent = '提交';
    });
});

// 显示成功消息
function showSuccessMessage() {
    successMessage.style.display = 'block';

    // 3秒后自动关闭
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 为详情项添加动画
const detailItems = document.querySelectorAll('.detail-item');
detailItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    setTimeout(() => {
        item.style.transition = 'all 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    }, 500 + index * 100);
});

// 为流程列表添加动画
const scheduleItems = document.querySelectorAll('.schedule-list li');
scheduleItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
    setTimeout(() => {
        item.style.transition = 'all 0.4s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, 800 + index * 100);
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// 表单输入验证
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');

nameInput.addEventListener('input', function() {
    this.value = this.value.trim();
});

phoneInput.addEventListener('input', function() {
    // 只允许输入数字
    this.value = this.value.replace(/\D/g, '');
});

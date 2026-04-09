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

// 表单提交
rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // 获取表单数据
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        guests: document.getElementById('guests').value,
        message: document.getElementById('message').value
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

    // 模拟提交（实际应用中应该发送到服务器）
    console.log('提交的数据:', formData);

    // 关闭弹窗
    modal.style.display = 'none';

    // 显示成功消息
    showSuccessMessage();

    // 重置表单
    rsvpForm.reset();

    // 恢复滚动
    document.body.style.overflow = 'auto';
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

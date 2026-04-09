// 配置文件
const CONFIG = {
    // Google Sheets配置
    googleScriptUrl: 'YOUR_GOOGLE_SCRIPT_URL_HERE',

    // 活动信息
    event: {
        date: '2026年4月20日',
        time: '14:00 - 18:00',
        location: '浙江省衢州市常山县白石镇新塘岭村',
        locationDetail: '家宴',
        theme: '春日聚会 & 创意分享',
        rsvpDeadline: '4月20日'
    },

    // 活动流程
    schedule: [
        { time: '14:00', activity: '签到 & 欢迎饮品' },
        { time: '14:30', activity: '开场致辞' },
        { time: '15:00', activity: '主题分享' },
        { time: '16:00', activity: '茶歇 & 自由交流' },
        { time: '17:00', activity: '互动游戏' },
        { time: '18:00', activity: '结束 & 合影留念' }
    ],

    // 动画配置
    animation: {
        pageLoadDelay: 100,
        detailItemStartDelay: 500,
        detailItemDelay: 100,
        scheduleItemStartDelay: 800,
        scheduleItemDelay: 100,
        successMessageDuration: 3000,
        bodyTransitionDuration: 500
    },

    // 表单验证
    validation: {
        phoneRegex: /^1[3-9]\d{9}$/,
        maxGuests: 2
    },

    // 图片展示配置
    gallery: {
        enabled: true,
        layout: 'grid', // 'grid' 或 'slider'
        gridColumns: 3,
        enableLightbox: true,
        // 图片列表 - 可以直接在这里添加/修改/删除图片
                images: [
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
        ]
        
    }
};

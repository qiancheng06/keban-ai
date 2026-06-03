const app = getApp()

Page({
  data: {
    userName: app.globalData.user.name,
    school: app.globalData.user.school,
    major: app.globalData.user.major,
    stats: app.globalData.stats,
    badges: [
      { id: 1, icon: '🏅', name: '初出茅庐', desc: '首次使用', unlocked: true },
      { id: 2, icon: '🔥', name: '连续学习', desc: '连续5天学习', unlocked: true },
      { id: 3, icon: '📝', name: '笔记达人', desc: '完成10篇笔记', unlocked: true },
      { id: 4, icon: '⭐', name: '错题克星', desc: '分析30道错题', unlocked: false },
      { id: 5, icon: '👑', name: '学神', desc: '连续30天', unlocked: false },
    ],
    courses: [
      { id: 1, name: '高等数学', percent: 80, color: 'linear-gradient(90deg, #2563EB, #60A5FA)', notes: 6, errors: 15, lastStudy: '今天 14:30' },
      { id: 2, name: 'C++程序设计', percent: 42, color: 'linear-gradient(90deg, #7C3AED, #A78BFA)', notes: 3, errors: 8, lastStudy: '昨天 20:15' },
      { id: 3, name: '大学英语', percent: 90, color: 'linear-gradient(90deg, #059669, #34D399)', notes: 3, errors: 11, lastStudy: '周三 18:20' },
    ],
    activities: [
      { id: 1, text: '上传了高等数学第三章课件，AI 笔记已生成', time: '今天 14:30', color: '#2563EB' },
      { id: 2, text: '分析了 2 道错题（不定积分相关）', time: '昨天 20:15', color: '#DC2626' },
      { id: 3, text: '生成了 C++ 面向对象复习提纲', time: '昨天 10:00', color: '#7C3AED' },
      { id: 4, text: '加入了"小王"的学习搭子', time: '周三 18:20', color: '#D97706' },
      { id: 5, text: '完成大学英语四级阅读练习', time: '周三 15:00', color: '#059669' },
    ],
    showCourses: true,
    showActivities: true
  },
  toggleSection(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ [key]: !this.data[key] })
  },
  showMyNotes() {
    const list = app.globalData.notes.map(n => n.title).join('\n')
    wx.showModal({ title: '我的笔记', content: list || '暂无笔记', showCancel: false })
  },
  showMyErrors() {
    const errors = [
      '求 f(x)=x² 在 x=2 处的导数 · 概念混淆',
      '计算 ∫ x·eˣ dx · 方法错误',
      '求矩阵 [[1,2],[3,4]] 的特征值 · 计算失误'
    ]
    wx.showModal({ title: '错题本', content: errors.join('\n\n') + '\n\n共 3 道错题', showCancel: false })
  }
})

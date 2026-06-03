App({
  globalData: {
    user: { name: '李同学', avatar: '👨‍🎓', school: '某某大学', major: '计算机科学' },
    stats: { daysUntilExam: 23, pendingCourses: 3, streakDays: 5, totalNotes: 12, totalErrors: 34, studyHours: 28 },
    notes: [
      { id: 1, title: '高等数学第三章笔记', course: '高数', likes: 128, preview: '导数与微分全章节知识点梳理，包含定义、求导法则、高阶导数...', emoji: '📐' },
      { id: 2, title: 'C++面向对象编程总结', course: 'C++', likes: 96, preview: '类、继承、多态核心概念图解，附代码示例...', emoji: '💻' },
      { id: 3, title: '大学英语四级高频词汇', course: '大英', likes: 234, preview: '100个四级高频词汇+例句，考前必背...', emoji: '📖' },
      { id: 4, title: '线性代数公式大全', course: '线代', likes: 156, preview: '矩阵、行列式、向量组核心公式汇总...', emoji: '📊' },
      { id: 5, title: '数据结构复习笔记', course: '数据结构', likes: 87, preview: '链表、栈、队列、树、图总结...', emoji: '🗂️' }
    ],
    videos: [
      { id: 1, title: '高等数学-极限运算的5种方法', course: '高数', duration: '15:30', views: '2.3万' },
      { id: 2, title: 'C++指针从入门到精通', course: 'C++', duration: '42:15', views: '5.1万' },
      { id: 3, title: '大学英语四级阅读理解技巧', course: '大英', duration: '28:00', views: '8.7万' },
      { id: 4, title: '线性代数-矩阵的特征值与特征向量', course: '线代', duration: '33:20', views: '3.2万' },
      { id: 5, title: '概率论-全概率公式与贝叶斯公式', course: '概率论', duration: '25:45', views: '4.8万' }
    ],
    buddies: [
      { id: 1, name: '小王', major: '计算机科学', commonCourses: ['高数', 'C++'], target: '考研', avatar: '👨‍💻' },
      { id: 2, name: '小李', major: '软件工程', commonCourses: ['C++', '数据结构'], target: '期末考试', avatar: '👩‍💻' },
      { id: 3, name: '小张', major: '信息管理', commonCourses: ['高数'], target: '考研', avatar: '🧑‍💻' }
    ],
    aiNote: {
      title: '高等数学 - 第三章 导数与微分',
      sections: [
        { heading: '3.1 导数的概念', points: ['导数的定义：f\'(x) = lim(Δx→0) Δy/Δx', '左导数与右导数', '可导与连续的关系：可导必连续，连续不一定可导'] },
        { heading: '3.2 求导法则', points: ['四则运算法则：(u±v)\' = u\'±v\'', '复合函数求导（链式法则）：dy/dx = dy/du · du/dx', '隐函数求导：两边同时对x求导'] },
        { heading: '3.3 高阶导数', points: ['二阶导数：y″ = d²y/dx²', 'Leibniz公式：(uv)⁽ⁿ⁾ = ΣC(n,k)u⁽ⁿ⁻ᵏ⁾v⁽ᵏ⁾'] },
        { heading: '3.4 微分', points: ['微分的定义：dy = f\'(x)dx', '微分与导数的关系：可微 ⇔ 可导'] }
      ]
    },
    aiOutline: {
      title: '高等数学（上）期末复习提纲',
      keyPoints: [
        { topic: '极限计算', importance: '★★★★★', tips: '必考2-3题，重点掌握洛必达法则和等价无穷小替换' },
        { topic: '导数与微分', importance: '★★★★★', tips: '复合函数求导必考，链式法则要熟练' },
        { topic: '中值定理', importance: '★★★★☆', tips: '罗尔定理和拉格朗日中值定理是证明题热点' },
        { topic: '不定积分', importance: '★★★★★', tips: '换元法和分部积分法是核心' },
        { topic: '定积分', importance: '★★★★☆', tips: '重点掌握牛顿-莱布尼茨公式' }
      ],
      examPredict: ['极限计算大题', '导数应用题（切线/法线）', '中值定理证明题', '定积分求面积/体积']
    }
  }
})

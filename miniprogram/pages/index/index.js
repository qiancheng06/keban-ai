const app = getApp()

Page({
  data: {
    ...app.globalData,
    userName: app.globalData.user.name,
    stats: app.globalData.stats,
    notes: app.globalData.notes,
    aiNote: app.globalData.aiNote,
    aiOutline: app.globalData.aiOutline,
    buddies: app.globalData.buddies.map(b => ({...b, invited: false})),
    showModal: false,
    modalType: '',
    modalTitle: '',
    uploading: false, uploadDone: false,
    errorInput: '', errorLoading: false, errorResult: null,
    chatInput: '', chatHistory: [],
    planTasks: [
      { text: '复习导数定义与求导法则', done: true },
      { text: '练习复合函数求导（链式法则）', done: true },
      { text: '复习中值定理（罗尔、拉格朗日）', done: false },
      { text: '练习不定积分（换元法）', done: false },
      { text: '综合模拟测试', done: false }
    ],
    gpaCourses: [
      { name: '高等数学', score: '85', credit: '5' },
      { name: 'C++程序设计', score: '78', credit: '4' },
      { name: '大学英语', score: '92', credit: '3' }
    ],
    gpaResult: null,
    noteDetail: {}
  },
  onLoad() {
    this.setData({ noteDetail: app.globalData.notes[0] })
  },
  // Modal
  showModal(type, title) {
    this.setData({ showModal: true, modalType: type, modalTitle: title, errorResult: null, gpaResult: null, uploadDone: false })
  },
  closeModal() {
    this.setData({ showModal: false })
  },
  preventMove() {},
  // Upload
  showUpload() { this.showModal('upload', '上传资料') },
  simulateUpload() {
    this.setData({ uploading: true })
    setTimeout(() => this.setData({ uploading: false, uploadDone: true }), 2000)
  },
  showNoteFromUpload() {
    this.setData({ modalType: 'note', modalTitle: 'AI 笔记' })
  },
  // Note
  showNote() { this.showModal('note', 'AI 笔记') },
  showOutline() { this.showModal('outline', '复习提纲') },
  showError() { this.showModal('error', '错题分析') },
  showChat() { this.showModal('chat', 'AI 答疑') },
  showBuddy() { this.showModal('buddy', '学习搭子') },
  showPlan() { this.showModal('plan', '学习计划') },
  showGPA() { this.showModal('gpa', '绩点计算器') },
  // Error
  onErrorInput(e) { this.setData({ errorInput: e.detail.value }) },
  submitError() {
    if (!this.data.errorInput.trim()) return
    this.setData({ errorLoading: true })
    setTimeout(() => {
      this.setData({
        errorLoading: false,
        errorResult: {
          analysis: '混淆了导数定义与微分概念。导数 f\'(x) 是函数在 x 处的瞬时变化率，微分 dy = f\'(x)dx 是函数增量的线性主部。',
          relatedKnowledge: ['导数的定义', '微分的定义', '可导与可微的关系'],
          recommendation: '建议复习 3.1 节导数的概念 和 3.4 节微分，重点关注定义中的极限表达式。'
        }
      })
    }, 1500)
  },
  // Chat
  onChatInput(e) { this.setData({ chatInput: e.detail.value }) },
  sendChat() {
    const { chatInput, chatHistory } = this.data
    if (!chatInput.trim()) return
    chatHistory.push({ role: 'user', content: chatInput })
    this.setData({ chatHistory, chatInput: '' })
    setTimeout(() => {
      chatHistory.push({ role: 'ai', content: '这是个好问题！建议查看相关章节笔记，重点关注定义和例题推导过程。' })
      this.setData({ chatHistory })
    }, 1000)
  },
  // Buddy
  inviteBuddy(e) {
    const id = e.currentTarget.dataset.id
    const buddies = this.data.buddies.map(b => b.id === id ? {...b, invited: true} : b)
    this.setData({ buddies })
  },
  // GPA
  onGPAInput(e) {
    const { field, index } = e.currentTarget.dataset
    this.setData({ [`gpaCourses[${index}].${field}`]: e.detail.value })
  },
  addGPACourse() {
    this.setData({ gpaCourses: this.data.gpaCourses.concat({ name: '', score: '', credit: '' }) })
  },
  calcGPA() {
    const { gpaCourses } = this.data
    let totalScore = 0, totalCredit = 0
    gpaCourses.forEach(c => {
      const score = parseFloat(c.score), credit = parseFloat(c.credit)
      if (score && credit) { totalScore += score * credit; totalCredit += credit }
    })
    this.setData({ gpaResult: totalCredit > 0 ? (totalScore / totalCredit / 20 - 1).toFixed(2) : '0.00' })
  },
  // Note Detail
  showNoteDetail(e) {
    const id = e.currentTarget.dataset.id
    const note = app.globalData.notes.find(n => n.id === id) || {}
    this.setData({ noteDetail: note })
    this.showModal('noteDetail', note.title)
  },
})

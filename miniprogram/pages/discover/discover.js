const app = getApp()

Page({
  data: {
    currentTab: 'video',
    searchQuery: '',
    buddies: app.globalData.buddies.map(b => ({...b, invited: false})),
    filteredVideos: app.globalData.videos,
    filteredNotes: app.globalData.notes,
    cateIndicatorLeft: 0,
    cateIndicatorWidth: 0
  },
  onReady() {
    this.updateIndicator()
  },
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab }, () => this.updateIndicator())
    this.filterContent()
  },
  updateIndicator() {
    const query = this.createSelectorQuery()
    query.selectAll('.cate-tab').boundingClientRect()
    query.select('.cate-tab.active').boundingClientRect()
    query.exec((res) => {
      const tabs = res[0] || []
      const active = res[1]
      if (active) {
        this.setData({
          cateIndicatorLeft: active.left - (tabs[0]?.left || 0),
          cateIndicatorWidth: active.width
        })
      }
    })
  },
  onSearch(e) {
    this.setData({ searchQuery: e.detail.value })
    this.filterContent()
  },
  clearSearch() {
    this.setData({ searchQuery: '' })
    this.filterContent()
  },
  filterContent() {
    const q = this.data.searchQuery
    const allVideos = app.globalData.videos
    const allNotes = app.globalData.notes
    this.setData({
      filteredVideos: q ? allVideos.filter(v => v.title.includes(q) || v.course.includes(q)) : allVideos,
      filteredNotes: q ? allNotes.filter(n => n.title.includes(q) || n.course.includes(q)) : allNotes
    })
  },
  inviteBuddy(e) {
    const id = e.currentTarget.dataset.id
    const buddies = this.data.buddies.map(b => b.id === id ? {...b, invited: true} : b)
    this.setData({ buddies })
  },
  showNoteDetail(e) {
    const id = e.currentTarget.dataset.id
    const note = app.globalData.notes.find(n => n.id === id) || {}
    wx.showModal({ title: note.title, content: note.preview + '\n\nAI 补充：该章节是重点，建议多练习相关题型。', showCancel: false })
  },
  showVideoDetail(e) {
    const v = e.currentTarget.dataset.item
    wx.showModal({ title: v.title, content: `课程：${v.course}\n时长：${v.duration}\n播放：${v.views}次\n\n演示版暂不支持播放，完整版将集成视频播放器。`, showCancel: false })
  },
})

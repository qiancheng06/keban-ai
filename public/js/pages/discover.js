const DiscoverPage = {
  currentTab: 'video',
  searchQuery: '',

  render() {
    return `
      <div style="padding:12px 0">
        <div class="search-bar">
          <span class="icon">🔍</span>
          <input id="discover-search" placeholder="搜索知识点、课程、笔记..." value="${this.searchQuery}" oninput="DiscoverPage.onSearch(this.value)">
          ${this.searchQuery ? '<span class="icon" style="cursor:pointer" onclick="DiscoverPage.clearSearch()">✕</span>' : ''}
        </div>
      </div>
      <div class="cate-tabs">
        <div class="cate-tab ${this.currentTab === 'video' ? 'active' : ''}" onclick="DiscoverPage.switchTab('video')">🎬 视频</div>
        <div class="cate-tab ${this.currentTab === 'note' ? 'active' : ''}" onclick="DiscoverPage.switchTab('note')">📝 笔记</div>
        <div class="cate-tab ${this.currentTab === 'buddy' ? 'active' : ''}" onclick="DiscoverPage.switchTab('buddy')">👥 搭子</div>
      </div>
      <div id="discover-content">${this.renderContent()}</div>
    `;
  },

  renderContent() {
    if (this.currentTab === 'video') return this.renderVideos();
    if (this.currentTab === 'note') return this.renderNotes();
    return this.renderBuddies();
  },

  renderVideos() {
    const q = this.searchQuery;
    const list = q ? MOCK.videos.filter(v => v.title.includes(q) || v.course.includes(q)) : MOCK.videos;
    if (list.length === 0) return '<div style="text-align:center;padding:40px;color:#999">未找到相关视频</div>';
    return list.map(v => `
      <div class="video-item">
        <div class="video-thumb">${v.course === '高数' ? '📐' : v.course === 'C++' ? '💻' : v.course === '大英' ? '📖' : v.course === '线代' ? '📊' : '🎲'}</div>
        <div class="video-info">
          <div class="video-title">${v.title}</div>
          <div class="video-meta"><span>${v.course}</span><span>${v.duration}</span><span>${v.views}次</span></div>
        </div>
      </div>
    `).join('');
  },

  renderNotes() {
    const q = this.searchQuery;
    const list = q ? MOCK.notes.filter(n => n.title.includes(q) || n.course.includes(q)) : MOCK.notes;
    if (list.length === 0) return '<div style="text-align:center;padding:40px;color:#999">未找到相关笔记</div>';
    return list.map(n => `
      <div class="feed-card" onclick="App.showNoteDetail(${n.id})">
        <div class="feed-card-title">${n.emoji} ${n.title}</div>
        <div class="feed-card-desc">${n.preview}</div>
        <div class="feed-card-meta"><span>📚 ${n.course}</span><span>❤️ ${n.likes}</span></div>
      </div>
    `).join('');
  },

  renderBuddies() {
    return `
      <div style="padding:0 16px 12px;font-size:13px;color:#888">基于你的专业和学习目标，为你推荐：</div>
      ${MOCK.buddies.map(b => `
        <div style="padding:0 16px">
          <div class="buddy-card">
            <div class="buddy-avatar">${b.avatar}</div>
            <div class="buddy-info">
              <div class="buddy-name">${b.name}</div>
              <div class="buddy-meta">${b.major} · 目标：${b.target}</div>
              <div class="buddy-tags">${b.commonCourses.map(c => `<span class="buddy-tag">${c}</span>`).join('')}</div>
            </div>
            <button class="buddy-btn">组队</button>
          </div>
        </div>
      `).join('')}
    `;
  },

  switchTab(tab) {
    this.currentTab = tab;
    App.renderPage('discover');
  },

  onSearch(val) {
    this.searchQuery = val;
    const content = document.getElementById('discover-content');
    if (content) content.innerHTML = this.renderContent();
  },

  clearSearch() {
    this.searchQuery = '';
    document.getElementById('discover-search').value = '';
    const content = document.getElementById('discover-content');
    if (content) content.innerHTML = this.renderContent();
  }
};

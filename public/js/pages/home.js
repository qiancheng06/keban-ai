const HomePage = {
  render() {
    const s = MOCK.stats;
    return `
      <div class="greeting">👋 早上好，<strong>${MOCK.user.name}</strong>！</div>
      <div class="stats-row">
        <div class="stat-card"><div class="stat-number">${s.daysUntilExam}</div><div class="stat-label">距期末考 (天)</div></div>
        <div class="stat-card"><div class="stat-number">${s.pendingCourses}</div><div class="stat-label">待复习课程</div></div>
        <div class="stat-card"><div class="stat-number">${s.streakDays}</div><div class="stat-label">连续学习 (天)</div></div>
      </div>
      <div class="grid-8">
        <div class="grid-item" onclick="App.showUploadModal()"><div class="grid-icon">📤</div><div class="grid-text">上传资料</div></div>
        <div class="grid-item" onclick="App.showNoteModal()"><div class="grid-icon">📝</div><div class="grid-text">AI笔记</div></div>
        <div class="grid-item" onclick="App.showOutlineModal()"><div class="grid-icon">📋</div><div class="grid-text">复习提纲</div></div>
        <div class="grid-item" onclick="App.showErrorModal()"><div class="grid-icon">❌</div><div class="grid-text">错题分析</div></div>
        <div class="grid-item" onclick="App.showChatModal()"><div class="grid-icon">🤖</div><div class="grid-text">AI答疑</div></div>
        <div class="grid-item" onclick="App.showBuddyModal()"><div class="grid-icon">👥</div><div class="grid-text">学习搭子</div></div>
        <div class="grid-item" onclick="App.showPlanModal()"><div class="grid-icon">📅</div><div class="grid-text">学习计划</div></div>
        <div class="grid-item" onclick="App.showGPAModal()"><div class="grid-icon">📊</div><div class="grid-text">绩点计算</div></div>
      </div>
      <div class="section">
        <div class="section-title"><span>🔥 学霸笔记推荐</span><span class="section-more" onclick="App.switchTab('discover')">查看更多 →</span></div>
      </div>
      <div class="h-scroll">
        ${MOCK.notes.map(n => `
          <div class="h-card" onclick="App.showNoteDetail(${n.id})">
            <div class="h-card-emoji">${n.emoji}</div>
            <div class="h-card-title">${n.title}</div>
            <div class="h-card-sub">❤️ ${n.likes}</div>
          </div>
        `).join('')}
      </div>
      <div class="section" style="padding-top:4px">
        <div class="section-title"><span>🎬 知识点视频搜索</span></div>
        <div class="search-bar" onclick="App.switchTab('discover')">
          <span class="icon">🔍</span>
          <input placeholder="搜索你想学的知识点..." readonly>
        </div>
      </div>
    `;
  }
};

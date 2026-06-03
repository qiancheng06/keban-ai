const ProfilePage = {
  render() {
    const s = MOCK.stats;
    const u = MOCK.user;
    return `
      <div class="user-header">
        <div class="user-avatar">${u.avatar}</div>
        <div class="user-name">${u.name}</div>
        <div class="user-desc">${u.school} · ${u.major}</div>
      </div>
      <div class="stats-grid">
        <div class="stat-cell"><div class="num">${s.totalNotes}</div><div class="lbl">📝 笔记数</div></div>
        <div class="stat-cell"><div class="num">${s.totalErrors}</div><div class="lbl">❌ 错题数</div></div>
        <div class="stat-cell"><div class="num">${s.studyHours}</div><div class="lbl">⏱️ 学习时长(h)</div></div>
      </div>
      <div class="section-title" style="padding:0 16px 8px;margin:0">📋 功能菜单</div>
      <div class="menu-list">
        <div class="menu-item" onclick="App.showNoteListModal()"><span class="menu-icon">📝</span><span class="menu-text">我的笔记</span><span class="menu-arrow">›</span></div>
        <div class="menu-item" onclick="App.showErrorListModal()"><span class="menu-icon">❌</span><span class="menu-text">错题本</span><span class="menu-arrow">›</span></div>
        <div class="menu-item" onclick="App.showPlanModal()"><span class="menu-icon">📅</span><span class="menu-text">学习计划</span><span class="menu-arrow">›</span></div>
        <div class="menu-item" onclick="App.showBuddyModal()"><span class="menu-icon">👥</span><span class="menu-text">我的学习搭子</span><span class="menu-arrow">›</span></div>
        <div class="menu-item"><span class="menu-icon">📊</span><span class="menu-text">学习报告</span><span class="menu-arrow">›</span></div>
        <div class="menu-item"><span class="menu-icon">⚙️</span><span class="menu-text">设置</span><span class="menu-arrow">›</span></div>
      </div>
    `;
  }
};

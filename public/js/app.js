const App = {
  currentPage: 'home',

  init() {
    document.querySelectorAll('.tab-item').forEach(el => {
      el.addEventListener('click', () => this.switchTab(el.dataset.page));
    });
    this.switchTab('home');
  },

  switchTab(page) {
    this.currentPage = page;
    document.querySelectorAll('.tab-item').forEach(el => el.classList.toggle('active', el.dataset.page === page));
    this.renderPage(page);
    const titles = { home: '课伴AI', discover: '发现', profile: '我的' };
    document.getElementById('nav-title').textContent = titles[page] || '课伴AI';
  },

  renderPage(page) {
    const container = document.getElementById('page-container');
    const pages = { home: HomePage, discover: DiscoverPage, profile: ProfilePage };
    const html = pages[page].render ? pages[page].render() : '';
    container.innerHTML = html;
  },

  // ===== Modal helpers =====
  showModal(title, bodyHtml) {
    const existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';
    overlay.innerHTML = `
      <div class="modal-box">
        <div class="modal-title">${title}</div>
        <div id="modal-body">${bodyHtml}</div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">关闭</button>
      </div>
    `;
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  },

  // ===== Upload Modal =====
  showUploadModal() {
    this.showModal('📤 上传资料', `
      <div style="margin-bottom:12px;font-size:13px;color:#888">支持 PPT、PDF、Word 格式</div>
      <div class="upload-zone">
        <div class="upload-icon">📄</div>
        <div class="upload-text">点击选择文件</div>
        <div class="upload-hint">或拖拽文件到此处</div>
      </div>
      <div id="upload-result" style="display:none;margin-top:12px">
        <div style="padding:12px;background:#f0f7ff;border-radius:8px;font-size:13px">
          ✅ 已上传：高等数学第三章课件.pptx
        </div>
        <div style="margin-top:8px">
          <div class="loading"><span class="spinner"></span> AI 正在生成笔记...</div>
        </div>
      </div>
    `);
    setTimeout(() => {
      document.querySelector('.upload-zone')?.addEventListener('click', () => {
        document.getElementById('upload-result').style.display = 'block';
        setTimeout(() => {
          const loading = document.querySelector('#upload-result .loading');
          if (loading) {
            loading.innerHTML = `<div style="padding:12px;background:#e8f5e9;border-radius:8px;font-size:13px">✅ 笔记生成完成！<br>共提取 4 个章节、12 个知识点</div>
            <div style="margin-top:8px;text-align:center"><a href="#" onclick="document.querySelector('.modal-overlay').remove();App.showNoteModal();return false" style="color:#2B6CB0">查看笔记详情 →</a></div>`;
          }
        }, 2500);
      });
    }, 100);
  },

  // ===== Note Modal =====
  showNoteModal() {
    const note = MOCK.aiNote;
    const sections = note.sections.map(s => `
      <div class="note-section">
        <div class="note-h3">${s.heading}</div>
        ${s.points.map(p => `<div class="note-li">${p}</div>`).join('')}
      </div>
    `).join('');
    this.showModal('📝 AI 笔记', `
      <div style="font-size:16px;font-weight:700;margin-bottom:12px">${note.title}</div>
      ${sections}
    `);
  },

  // ===== Outline Modal =====
  showOutlineModal() {
    const o = MOCK.aiOutline;
    const points = o.keyPoints.map(k => `
      <div style="padding:10px 12px;background:#f8f9ff;border-radius:8px;margin-bottom:8px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-weight:600;font-size:14px">${k.topic}</span>
          <span style="font-size:12px;color:#d69e2e">${k.importance}</span>
        </div>
        <div style="font-size:12px;color:#888;margin-top:4px">💡 ${k.tips}</div>
      </div>
    `).join('');
    const predicts = o.examPredict.map(p => `<div style="padding:4px 0;font-size:13px;color:#555">📌 ${p}</div>`).join('');
    this.showModal('📋 复习提纲', `
      <div style="font-size:16px;font-weight:700;margin-bottom:12px">${o.title}</div>
      <div style="font-weight:600;margin-bottom:8px">📌 核心考点</div>
      ${points}
      <div style="font-weight:600;margin:12px 0 8px">🎯 考试预测</div>
      ${predicts}
    `);
  },

  // ===== Error Analysis Modal =====
  showErrorModal() {
    this.showModal('❌ 错题分析', `
      <div style="margin-bottom:12px">
        <div style="font-size:13px;color:#888;margin-bottom:6px">输入题目内容：</div>
        <textarea id="error-input" style="width:100%;height:80px;border:1px solid #ddd;border-radius:8px;padding:8px;font-size:13px;resize:none" placeholder="例如：求函数 f(x)=x² 在 x=2 处的导数"></textarea>
      </div>
      <button id="error-btn" style="width:100%;padding:10px;background:#2B6CB0;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer" onclick="App.submitError()">AI 分析</button>
      <div id="error-result" style="display:none;margin-top:12px"></div>
    `);
  },

  submitError() {
    const input = document.getElementById('error-input');
    const btn = document.getElementById('error-btn');
    const result = document.getElementById('error-result');
    if (!input.value.trim()) { alert('请输入题目内容'); return; }
    btn.disabled = true; btn.textContent = '分析中...';
    result.style.display = 'block';
    result.innerHTML = '<div class="loading"><span class="spinner"></span> AI 正在分析...</div>';
    setTimeout(() => {
      const a = MOCK.aiAnalysis;
      result.innerHTML = `
        <div style="padding:12px;background:#fff4f0;border-radius:8px;margin-bottom:8px">
          <div style="font-size:13px;font-weight:600;color:#c53030">❌ 错误类型：${a.errorType}</div>
          <div style="font-size:13px;color:#555;margin-top:6px">${a.analysis}</div>
        </div>
        <div style="padding:10px 12px;background:#f0f7ff;border-radius:8px;margin-bottom:8px">
          <div style="font-size:13px;font-weight:600;color:#2B6CB0">📚 关联知识点</div>
          ${a.relatedKnowledge.map(k => `<div style="font-size:12px;color:#555;padding:2px 0">• ${k}</div>`).join('')}
        </div>
        <div style="padding:10px 12px;background:#f0fff4;border-radius:8px">
          <div style="font-size:13px;font-weight:600;color:#38a169">💡 学习建议</div>
          <div style="font-size:12px;color:#555;margin-top:4px">${a.recommendation}</div>
        </div>
      `;
      btn.disabled = false; btn.textContent = 'AI 分析';
    }, 2000);
  },

  // ===== Chat Modal =====
  showChatModal() {
    const qaPairs = [
      { q: '怎么理解导数定义？', a: '导数 f\'(x) 表示函数在 x 处的瞬时变化率，就是 Δx→0 时 Δy/Δx 的极限。可以理解为"某一点的变化速度"。' },
      { q: '链式法则怎么用？', a: '链式法则用于复合函数求导：dy/dx = dy/du × du/dx。例如 y = sin(x²)，令 u = x²，y = sin(u)，则 y\' = cos(u) × 2x = 2x·cos(x²)。' },
    ];
    this.showModal('🤖 AI 答疑助手', `
      <div style="margin-bottom:12px;max-height:300px;overflow-y:auto" id="chat-box">
        <div style="padding:10px 12px;background:#eef2ff;border-radius:10px 10px 10px 2px;margin-bottom:8px;font-size:13px;color:#555">👋 同学你好！有什么学习问题可以问我~</div>
        ${qaPairs.map((p, i) => `
          <div style="text-align:right;margin-bottom:6px"><span style="display:inline-block;padding:8px 12px;background:#2B6CB0;color:#fff;border-radius:10px 10px 2px 10px;font-size:13px">${p.q}</span></div>
          <div style="padding:8px 12px;background:#f5f5f5;border-radius:10px 10px 10px 2px;margin-bottom:8px;font-size:13px;color:#555">${p.a}</div>
        `).join('')}
      </div>
      <div style="display:flex;gap:8px">
        <input id="chat-input" placeholder="输入你的问题..." style="flex:1;padding:8px 12px;border:1px solid #ddd;border-radius:20px;font-size:13px;outline:none">
        <button style="padding:8px 16px;background:#2B6CB0;color:#fff;border:none;border-radius:20px;font-size:13px;cursor:pointer" onclick="App.sendChat()">发送</button>
      </div>
    `);
  },

  sendChat() {
    const input = document.getElementById('chat-input');
    const box = document.getElementById('chat-box');
    if (!input.value.trim()) return;
    box.innerHTML += `<div style="text-align:right;margin-bottom:6px"><span style="display:inline-block;padding:8px 12px;background:#2B6CB0;color:#fff;border-radius:10px 10px 2px 10px;font-size:13px">${input.value}</span></div>`;
    box.innerHTML += `<div style="padding:8px 12px;background:#f5f5f5;border-radius:10px 10px 10px 2px;margin-bottom:8px;font-size:13px;color:#555">🤔 让我想想... 这是一个好问题！建议你查看相关章节的笔记内容。</div>`;
    input.value = '';
    box.scrollTop = box.scrollHeight;
  },

  // ===== Buddy Modal =====
  showBuddyModal() {
    const buddies = MOCK.buddies;
    this.showModal('👥 学习搭子', `
      <div style="font-size:13px;color:#888;margin-bottom:12px">基于你的专业和目标，AI 为你推荐以下学习伙伴：</div>
      ${buddies.map(b => `
        <div class="buddy-card">
          <div class="buddy-avatar">${b.avatar}</div>
          <div class="buddy-info">
            <div class="buddy-name">${b.name}</div>
            <div class="buddy-meta">${b.major} · 目标：${b.target}</div>
            <div class="buddy-tags">${b.commonCourses.map(c => `<span class="buddy-tag">${c}</span>`).join('')}</div>
          </div>
          <button class="buddy-btn" onclick="this.textContent='已邀请';this.style.background='#e8f5e9';this.style.borderColor='#38a169';this.style.color='#38a169';this.disabled=true">组队</button>
        </div>
      `).join('')}
    `);
  },

  // ===== Plan Modal =====
  showPlanModal() {
    const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
    const tasks = [
      { d: 'Day 1', t: '复习导数定义与求导法则', done: true },
      { d: 'Day 2', t: '练习复合函数求导（链式法则）', done: true },
      { d: 'Day 3', t: '复习中值定理（罗尔、拉格朗日）', done: false },
      { d: 'Day 4', t: '练习不定积分（换元法）', done: false },
      { d: 'Day 5', t: '综合模拟测试', done: false },
    ];
    this.showModal('📅 学习计划', `
      <div style="display:flex;gap:8px;margin-bottom:12px;overflow-x:auto">
        <div style="flex-shrink:0;background:#2B6CB0;color:#fff;padding:6px 14px;border-radius:16px;font-size:12px;cursor:pointer">📊 高数</div>
        <div style="flex-shrink:0;background:#f0f0f0;padding:6px 14px;border-radius:16px;font-size:12px;cursor:pointer;color:#888">💻 C++</div>
        <div style="flex-shrink:0;background:#f0f0f0;padding:6px 14px;border-radius:16px;font-size:12px;cursor:pointer;color:#888">📖 大英</div>
      </div>
      <div style="font-size:13px;color:#888;margin-bottom:8px">距考试 23 天 · 每日任务</div>
      ${tasks.map(t => `
        <label style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f0f0f0;cursor:pointer">
          <input type="checkbox" ${t.done ? 'checked' : ''} style="width:16px;height:16px;accent-color:#2B6CB0">
          <span style="font-size:13px;${t.done ? 'color:#aaa;text-decoration:line-through' : 'color:#555'}">${t.t}</span>
        </label>
      `).join('')}
      <div style="margin-top:12px;padding:8px 12px;background:#f0f7ff;border-radius:8px;font-size:12px;color:#2B6CB0">📌 AI 建议：本周重点突破中值定理部分</div>
    `);
  },

  // ===== GPA Modal =====
  showGPAModal() {
    this.showModal('📊 绩点计算器', `
      <div id="gpa-list">
        <div class="gpa-row" style="display:flex;gap:8px;margin-bottom:8px">
          <input placeholder="课程名" style="flex:2;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
          <input placeholder="成绩" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
          <input placeholder="学分" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
        </div>
        <div class="gpa-row" style="display:flex;gap:8px;margin-bottom:8px">
          <input placeholder="高等数学" value="高等数学" style="flex:2;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
          <input placeholder="成绩" value="85" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
          <input placeholder="学分" value="5" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
        </div>
        <div class="gpa-row" style="display:flex;gap:8px;margin-bottom:8px">
          <input placeholder="C++程序设计" value="C++程序设计" style="flex:2;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
          <input placeholder="成绩" value="78" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
          <input placeholder="学分" value="4" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
        </div>
        <div class="gpa-row" style="display:flex;gap:8px;margin-bottom:8px">
          <input placeholder="大学英语" value="大学英语" style="flex:2;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
          <input placeholder="成绩" value="92" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
          <input placeholder="学分" value="3" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
        </div>
      </div>
      <button style="width:100%;padding:8px;background:#f0f0f0;border:1px dashed #ccc;border-radius:8px;font-size:13px;color:#888;cursor:pointer;margin-bottom:12px" onclick="App.addGPARow()">＋ 添加课程</button>
      <button id="gpa-btn" style="width:100%;padding:10px;background:#2B6CB0;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer" onclick="App.calcGPA()">计算绩点</button>
      <div id="gpa-result" style="display:none;margin-top:12px;padding:12px;background:#f0fff4;border-radius:8px;text-align:center">
        <div style="font-size:12px;color:#888">你的平均绩点</div>
        <div style="font-size:32px;font-weight:800;color:#38a169">3.52</div>
        <div style="font-size:12px;color:#888;margin-top:4px">优秀！继续保持 🎉</div>
      </div>
    `);
  },

  addGPARow() {
    const list = document.getElementById('gpa-list');
    const row = document.createElement('div');
    row.className = 'gpa-row';
    row.style.cssText = 'display:flex;gap:8px;margin-bottom:8px';
    row.innerHTML = `
      <input placeholder="课程名" style="flex:2;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
      <input placeholder="成绩" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
      <input placeholder="学分" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px">
    `;
    list.appendChild(row);
  },

  calcGPA() {
    const result = document.getElementById('gpa-result');
    if (result) result.style.display = 'block';
  },

  // ===== Note Detail (from hot notes) =====
  showNoteDetail(id) {
    const n = MOCK.notes.find(x => x.id === id) || MOCK.notes[0];
    this.showModal(`📝 ${n.title}`, `
      <div style="margin-bottom:8px"><span style="font-size:13px;color:#888">📚 ${n.course} · ❤️ ${n.likes}</span></div>
      <div style="font-size:13px;color:#555;line-height:1.8">${n.preview}</div>
      <div style="margin-top:12px;padding:10px;background:#f8f9ff;border-radius:8px;font-size:13px;color:#2B6CB0">💡 AI 补充：该章节的导数和微分是后续积分的基础，建议重点掌握求导法则。</div>
    `);
  },

  // ===== Note List =====
  showNoteListModal() {
    this.showModal('📝 我的笔记', `
      ${MOCK.notes.map(n => `
        <div class="feed-card" onclick="document.querySelector('.modal-overlay').remove();setTimeout(()=>App.showNoteDetail(${n.id}),100)">
          <div class="feed-card-title">${n.emoji} ${n.title}</div>
          <div class="feed-card-desc">${n.preview}</div>
          <div class="feed-card-meta"><span>📚 ${n.course}</span><span>❤️ ${n.likes}</span></div>
        </div>
      `).join('')}
    `);
  },

  // ===== Error List =====
  showErrorListModal() {
    const errors = [
      { q: '求 f(x)=x² 在 x=2 处的导数', type: '概念混淆', status: '已分析' },
      { q: '计算 ∫ x·eˣ dx', type: '方法错误', status: '已分析' },
      { q: '求矩阵 [[1,2],[3,4]] 的特征值', type: '计算失误', status: '已分析' },
    ];
    this.showModal('❌ 错题本', `
      ${errors.map(e => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:#fff;border-radius:8px;margin-bottom:6px;border:1px solid #f0f0f0">
          <div>
            <div style="font-size:13px;font-weight:600">${e.q}</div>
            <div style="font-size:12px;color:#c53030">${e.type}</div>
          </div>
          <span style="font-size:12px;color:#38a169">✅ ${e.status}</span>
        </div>
      `).join('')}
      <div style="text-align:center;padding:12px;font-size:13px;color:#888">共 ${errors.length} 道错题</div>
    `);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());

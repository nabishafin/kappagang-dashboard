
// ===========================
// PAGE NAVIGATION
// ===========================
function switchPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById('page-' + pageName);
  if (page) page.classList.add('active');
  const nav = document.querySelector(`.nav-item[data-page="${pageName}"]`);
  if (nav) nav.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Re-init charts if visible
  setTimeout(initVisibleCharts, 50);
}

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    const page = item.getAttribute('data-page');
    if (page) switchPage(page);
  });
});

function toggleSwitch(el) {
  el.classList.toggle('on');
}

// ===========================
// VIDEO DATA & CARDS
// ===========================
const videos = [
  { id:1, title:'Neon Drift: Protocol 7', studio:'Astra Studio', cat:'Sci-Fi', dur:'08:42', views:'1.2M', rating:4.9, status:'published', img:'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80', gradient:'linear-gradient(135deg,#7e22ce,#ec4899)' },
  { id:2, title:'Visions of Cobalt', studio:'Luna Void', cat:'Cyber-Noir', dur:'12:15', views:'840K', rating:4.8, status:'published', img:'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&q=80', gradient:'linear-gradient(135deg,#dc2626,#ec4899)' },
  { id:3, title:'The Glitch Horizon', studio:'Pixel Rebel', cat:'Experimental', dur:'05:30', views:'420K', rating:4.7, status:'published', img:'https://images.unsplash.com/photo-1614853035795-9a1f3275fe50?w=600&q=80', gradient:'linear-gradient(135deg,#065f46,#0891b2)' },
  { id:4, title:'Silicon Soul', studio:'Nebula Studios', cat:'3D Feature', dur:'15:00', views:'3.1M', rating:5.0, status:'published', img:'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80', gradient:'linear-gradient(135deg,#1e3a8a,#06b6d4)' },
  { id:5, title:'The Terminal Code', studio:'Code Walker', cat:'Documentary', dur:'09:10', views:'156K', rating:4.6, status:'published', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', gradient:'linear-gradient(135deg,#064e3b,#10b981)' },
  { id:6, title:'Data Stream Dreams', studio:'Vivid Void', cat:'Art Film', dur:'07:45', views:'2.1M', rating:4.9, status:'published', img:'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=600&q=80', gradient:'linear-gradient(135deg,#312e81,#7c3aed)' },
  { id:7, title:'Echoes of Tomorrow', studio:'Astra Studio', cat:'Sci-Fi', dur:'11:22', views:'—', rating:0, status:'draft', img:'', gradient:'linear-gradient(135deg,#1f2937,#6b21a8)' },
  { id:8, title:'Velvet Static', studio:'Astra Studio', cat:'Experimental', dur:'04:18', views:'—', rating:0, status:'processing', img:'', gradient:'linear-gradient(135deg,#831843,#9333ea)' },
];

function videoCardHTML(v) {
  const statusLabel = v.status === 'published' ? 'PUBLISHED'
                    : v.status === 'draft' ? 'DRAFT'
                    : 'PROCESSING';
  const thumbContent = v.img
    ? `<img src="${v.img}" alt="${v.title}" />`
    : `<div style="width:100%;height:100%;background:${v.gradient};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.4);font-size:11px;font-weight:600">${v.status === 'processing' ? 'PROCESSING...' : 'NO THUMBNAIL'}</div>`;
  const views = v.views !== '—' ? `<span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>${v.views}</span>` : '<span style="opacity:0.5">No views yet</span>';
  const rating = v.rating > 0 ? `<span><svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${v.rating}</span>` : '';

  return `
    <div class="video-card" onclick="switchPage('edit')">
      <div class="video-thumb">
        ${thumbContent}
        <div class="video-status ${v.status}"><span class="dot"></span>${statusLabel}</div>
        <div class="video-duration">${v.dur}</div>
      </div>
      <div class="video-info">
        <div class="video-title">${v.title}</div>
        <div class="video-meta">${views}${rating}<span>${v.cat}</span></div>
        <div class="video-actions">
          <button class="video-action primary" onclick="event.stopPropagation();switchPage('edit')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit
          </button>
          <button class="video-action" onclick="event.stopPropagation();openVideoStats(${v.id})">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            Stats
          </button>
          <button class="video-action" onclick="openVideoMenu(event,${v.id})">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Populate grids
document.getElementById('libraryGrid').innerHTML = videos.map(videoCardHTML).join('');
document.getElementById('dashVideoGrid').innerHTML = videos.slice(0, 4).map(videoCardHTML).join('');

// Top videos list
const topVideos = videos.filter(v => v.status === 'published').slice(0, 5);
document.getElementById('topVideosList').innerHTML = topVideos.map((v, i) => `
  <div class="top-video-item">
    <div class="top-video-rank ${i === 0 ? 'gold' : ''}">${String(i+1).padStart(2,'0')}</div>
    <div class="top-video-thumb"><img src="${v.img}" alt=""/></div>
    <div class="top-video-info">
      <div class="top-video-title">${v.title}</div>
      <div class="top-video-stat">${v.views} views · ⭐ ${v.rating}</div>
    </div>
  </div>
`).join('');

// Transaction history (donations + ad revenue + withdrawals)
const transactions = [
  { type:'donation', name:'Sora N.', initials:'SN', color:'linear-gradient(135deg,#ec4899,#f59e0b)', video:'Neon Drift: Protocol 7', msg:'Absolutely magical! 💜', status:'completed', date:'2 min ago', amount:100, sign:'+' },
  { type:'ad', name:'Ad Revenue', initials:'AD', color:'linear-gradient(135deg,#ec4899,#f472b6)', video:'Neon Drift: Protocol 7', msg:'CPM earnings', status:'completed', date:'Today', amount:48.20, sign:'+' },
  { type:'donation', name:'Diego R.', initials:'DR', color:'linear-gradient(135deg,#10b981,#06b6d4)', video:'Neon Drift: Protocol 7', msg:'The animation style is incredible', status:'completed', date:'1 hr ago', amount:50, sign:'+' },
  { type:'donation', name:'Jamie Morales', initials:'JM', color:'linear-gradient(135deg,#06b6d4,#3b82f6)', video:'Neon Drift: Protocol 7', msg:'—', status:'completed', date:'2 hrs ago', amount:25, sign:'+' },
  { type:'donation', name:'Luna V.', initials:'LV', color:'linear-gradient(135deg,#a855f7,#ec4899)', video:'Visions of Cobalt', msg:'Keep making art ✨', status:'completed', date:'3 hrs ago', amount:15, sign:'+' },
  { type:'withdrawal', name:'Bank Transfer', initials:'BT', color:'linear-gradient(135deg,#10b981,#34d399)', video:'••••4812 · Astra Studio LLC', msg:'Approved in 4h', status:'approved', date:'Today 8:00 AM', amount:1840, sign:'-' },
  { type:'donation', name:'Priya K.', initials:'PK', color:'linear-gradient(135deg,#f59e0b,#ef4444)', video:'Silicon Soul', msg:'—', status:'completed', date:'5 hrs ago', amount:10, sign:'+' },
  { type:'ad', name:'Ad Revenue', initials:'AD', color:'linear-gradient(135deg,#ec4899,#f472b6)', video:'Data Stream Dreams', msg:'CPM + clicks', status:'completed', date:'Yesterday', amount:62.40, sign:'+' },
  { type:'donation', name:'Marcus T.', initials:'MT', color:'linear-gradient(135deg,#7c3aed,#06b6d4)', video:'Data Stream Dreams', msg:'This series is everything', status:'pending', date:'Yesterday', amount:75, sign:'+' },
  { type:'withdrawal', name:'Bank Transfer', initials:'BT', color:'linear-gradient(135deg,#10b981,#34d399)', video:'••••4812 · Pending review', msg:'—', status:'pending', date:'Yesterday', amount:500, sign:'-' },
  { type:'donation', name:'Yuki H.', initials:'YH', color:'linear-gradient(135deg,#ec4899,#a855f7)', video:'The Glitch Horizon', msg:'—', status:'completed', date:'2 days ago', amount:20, sign:'+' },
  { type:'withdrawal', name:'PayPal', initials:'PP', color:'linear-gradient(135deg,#06b6d4,#3b82f6)', video:'paypal@astrastudio.com', msg:'1.5% fee applied', status:'completed', date:'May 20, 2026', amount:980, sign:'-' },
];

const typeLabels = {
  donation: '<span class="badge badge-donation">Donation</span>',
  ad: '<span class="badge badge-ad">Ad Revenue</span>',
  withdrawal: '<span class="badge badge-withdrawal">Withdrawal</span>',
};
const statusLabels = {
  completed: '<span class="badge badge-completed">Completed</span>',
  pending: '<span class="badge badge-pending">Pending</span>',
  approved: '<span class="badge badge-approved">Approved</span>',
  rejected: '<span class="badge badge-rejected">Rejected</span>',
};

document.getElementById('donationsBody').innerHTML = transactions.map(d => `
  <tr>
    <td>${typeLabels[d.type]}</td>
    <td>
      <div class="user-cell">
        <div class="user-avatar-sm" style="background:${d.color}">${d.initials}</div>
        <div><div style="font-weight:600;font-size:13px">${d.name}</div></div>
      </div>
    </td>
    <td style="color:var(--text-secondary);font-size:12px;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.video}</td>
    <td>${statusLabels[d.status]}</td>
    <td style="color:var(--text-muted);font-size:12px">${d.date}</td>
    <td class="amount-cell" style="text-align:right;color:${d.sign === '+' ? 'var(--accent-green)' : 'var(--accent-pink)'}">${d.sign}$${d.amount.toFixed(2)}</td>
  </tr>
`).join('');

// ===========================
// CHARTS
// ===========================
Chart.defaults.font.family = "'DM Sans', sans-serif";
Chart.defaults.color = '#6c6c80';
Chart.defaults.borderColor = 'rgba(255,255,255,0.05)';

const chartCommonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { display: false },
    tooltip: {
      enabled: true,
      backgroundColor: '#14141f',
      titleColor: '#ffffff',
      bodyColor: '#b8b8c8',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      padding: 10,
      cornerRadius: 8,
      displayColors: true,
      boxPadding: 4,
    }
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { font: { size: 11 } }
    },
    y: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      border: { display: false },
      ticks: { font: { size: 11 } }
    }
  }
};

const chartsInitialized = new Set();

function makeGradient(ctx, color1, color2) {
  const g = ctx.createLinearGradient(0, 0, 0, 300);
  g.addColorStop(0, color1);
  g.addColorStop(1, color2);
  return g;
}

function initVisibleCharts() {
  // Dashboard chart
  if (!chartsInitialized.has('dashChart')) {
    const canvas = document.getElementById('dashChart');
    if (canvas && canvas.offsetParent !== null) {
      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['1','5','10','15','20','25','30'],
          datasets: [
            {
              label: 'Views',
              data: [22000, 28000, 35000, 32000, 48000, 55000, 62000],
              borderColor: '#a855f7',
              backgroundColor: makeGradient(ctx, 'rgba(168,85,247,0.3)', 'rgba(168,85,247,0)'),
              borderWidth: 2.5,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#a855f7',
              pointRadius: 0,
              pointHoverRadius: 6
            },
            {
              label: 'Earnings',
              data: [180, 240, 310, 280, 420, 510, 620],
              borderColor: '#ec4899',
              backgroundColor: 'transparent',
              borderWidth: 2.5,
              fill: false,
              tension: 0.4,
              pointBackgroundColor: '#ec4899',
              pointRadius: 0,
              pointHoverRadius: 6,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          ...chartCommonOptions,
          interaction: { intersect: false, mode: 'index' },
          scales: {
            x: chartCommonOptions.scales.x,
            y: { ...chartCommonOptions.scales.y, position: 'left' },
            y1: {
              position: 'right',
              grid: { display: false },
              border: { display: false },
              ticks: { font: { size: 11 }, color: '#ec4899' }
            }
          }
        }
      });
      chartsInitialized.add('dashChart');
    }
  }

  // Earnings chart
  if (!chartsInitialized.has('earningsChart')) {
    const canvas = document.getElementById('earningsChart');
    if (canvas && canvas.offsetParent !== null) {
      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Wk 1','Wk 2','Wk 3','Wk 4'],
          datasets: [{
            data: [1840, 2120, 1980, 2552],
            backgroundColor: makeGradient(ctx, '#a855f7', 'rgba(168,85,247,0.3)'),
            borderRadius: 8,
            borderSkipped: false,
            barThickness: 36
          }]
        },
        options: chartCommonOptions
      });
      chartsInitialized.add('earningsChart');
    }
  }

  // Revenue pie
  if (!chartsInitialized.has('revenuePie')) {
    const canvas = document.getElementById('revenuePie');
    if (canvas && canvas.offsetParent !== null) {
      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Donations (TipJar)', 'Ad Revenue'],
          datasets: [{
            data: [86, 14],
            backgroundColor: ['#a855f7', '#ec4899'],
            borderColor: '#14141f',
            borderWidth: 4,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: { legend: { display: false } }
        }
      });
      chartsInitialized.add('revenuePie');
    }
  }

  // Ad Revenue chart
  if (!chartsInitialized.has('adRevenueChart')) {
    const canvas = document.getElementById('adRevenueChart');
    if (canvas && canvas.offsetParent !== null) {
      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['May 1','May 4','May 7','May 10','May 13','May 16','May 19','May 22','May 25'],
          datasets: [{
            label: 'Ad Revenue',
            data: [28, 42, 38, 55, 49, 68, 74, 82, 96],
            borderColor: '#ec4899',
            backgroundColor: makeGradient(ctx, 'rgba(236,72,153,0.25)', 'rgba(236,72,153,0)'),
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#ec4899',
            pointRadius: 0,
            pointHoverRadius: 6
          }]
        },
        options: chartCommonOptions
      });
      chartsInitialized.add('adRevenueChart');
    }
  }

  // Analytics chart
  if (!chartsInitialized.has('analyticsChart')) {
    const canvas = document.getElementById('analyticsChart');
    if (canvas && canvas.offsetParent !== null) {
      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Apr 24','Apr 28','May 2','May 6','May 10','May 14','May 18','May 22'],
          datasets: [
            {
              label: 'This period',
              data: [12000, 18000, 22000, 19000, 28000, 35000, 42000, 48000],
              borderColor: '#a855f7',
              backgroundColor: makeGradient(ctx, 'rgba(168,85,247,0.25)', 'rgba(168,85,247,0)'),
              borderWidth: 2.5,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#a855f7',
              pointRadius: 0,
              pointHoverRadius: 6
            },
            {
              label: 'Previous',
              data: [10000, 14000, 16000, 14500, 22000, 26000, 30000, 38000],
              borderColor: 'rgba(255,255,255,0.2)',
              borderWidth: 2,
              borderDash: [4, 4],
              fill: false,
              tension: 0.4,
              pointRadius: 0
            }
          ]
        },
        options: chartCommonOptions
      });
      chartsInitialized.add('analyticsChart');
    }
  }
}

// Initial chart render
initVisibleCharts();

// Tag input handler (basic)
document.querySelectorAll('.tags-input').forEach(wrap => {
  const input = wrap.querySelector('input');
  if (!input) return;
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      e.preventDefault();
      const tag = document.createElement('span');
      tag.className = 'tag-pill';
      tag.innerHTML = input.value.trim() + ' <span class="remove">×</span>';
      tag.querySelector('.remove').addEventListener('click', () => tag.remove());
      wrap.insertBefore(tag, input);
      input.value = '';
    }
  });
});

// FAQ accordion handler
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ===========================
// CREATOR DROPDOWN
// ===========================
function toggleCreatorDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById('creatorDropdown');
  const chevron = document.getElementById('creatorChevron');
  const isOpen = dropdown.classList.contains('show');
  closeAllDropdowns();
  if (!isOpen) {
    dropdown.classList.add('show');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }
}
function closeCreatorDropdown() {
  const dropdown = document.getElementById('creatorDropdown');
  const chevron = document.getElementById('creatorChevron');
  if (dropdown) dropdown.classList.remove('show');
  if (chevron) chevron.style.transform = '';
}
function handleLogout() {
  closeCreatorDropdown();
  showToast('Logged out', 'You have been signed out securely.', 'info');
}

// ===========================
// CLOSE ALL DROPDOWNS
// ===========================
function closeAllDropdowns() {
  document.querySelectorAll('.dropdown-menu.show').forEach(d => d.classList.remove('show'));
  document.querySelectorAll('.search-dropdown.show').forEach(d => d.classList.remove('show'));
  closeCreatorDropdown();
  const ctx = document.getElementById('videoContextMenu');
  if (ctx) ctx.remove();
}
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown-wrap') && !e.target.closest('#creatorCard') && !e.target.closest('#globalSearchWrap') && !e.target.closest('#videoContextMenu')) {
    closeAllDropdowns();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllDropdowns();
    document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
  }
});

// ===========================
// DROPDOWN MENUS (filter/sort)
// ===========================
function toggleDropdown(id, event) {
  event.stopPropagation();
  const menu = document.getElementById(id);
  const wasOpen = menu.classList.contains('show');
  closeAllDropdowns();
  if (!wasOpen) menu.classList.add('show');
}

function applyFilter(filter, item) {
  const menu = item.closest('.dropdown-menu');
  menu.querySelectorAll('.dropdown-item').forEach(i => {
    i.classList.remove('active');
    // strip any leading checkmark SVG
    i.innerHTML = i.innerHTML.replace(/^<svg[\s\S]*?<\/svg>\s*/,'');
  });
  item.classList.add('active');
  item.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>${item.textContent.trim()}`;
  closeAllDropdowns();
  showToast('Filter applied', 'Showing: ' + filter, 'info');
}

function applySort(sort, item) {
  const menu = item.closest('.dropdown-menu');
  menu.querySelectorAll('.dropdown-item').forEach(i => {
    i.classList.remove('active');
    i.innerHTML = i.innerHTML.replace(/^<svg[\s\S]*?<\/svg>\s*/,'');
  });
  item.classList.add('active');
  item.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>${item.textContent.trim()}`;
  const lbl = document.getElementById('sortLabel');
  if (lbl) lbl.textContent = 'Sort: ' + sort;
  closeAllDropdowns();
}

// ===========================
// LIBRARY FILTER
// ===========================
function filterLibrary(status, chip) {
  document.querySelectorAll('.filter-chip[data-status]').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const filtered = status === 'all' ? videos : videos.filter(v => v.status === status);
  document.getElementById('libraryGrid').innerHTML = filtered.map(videoCardHTML).join('');
}

// ===========================
// PUBLISH / SAVE
// ===========================
function handlePublish() {
  showToast('Published!', 'Your animation is now live and discoverable.', 'success');
  setTimeout(() => switchPage('library'), 1400);
}

function handleSaveChanges(btn) {
  const original = btn.innerHTML;
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="save-check-anim"><polyline points="20 6 9 17 4 12"/></svg> Saved!`;
  btn.style.background = 'linear-gradient(135deg,#10b981,#34d399)';
  btn.style.boxShadow = '0 0 20px rgba(16,185,129,0.4)';
  btn.disabled = true;
  showToast('Changes saved', 'Your updates have been applied successfully.', 'success');
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.style.boxShadow = '';
    btn.disabled = false;
  }, 2600);
}

// ===========================
// SCHEDULE MODAL
// ===========================
function openScheduleModal() {
  document.getElementById('scheduleModal').classList.add('show');
}
function closeScheduleModal() {
  document.getElementById('scheduleModal').classList.remove('show');
}
function updateSchedPreview() {
  const d = document.getElementById('schedDate').value;
  const t = document.getElementById('schedTime').value;
  const preview = document.getElementById('schedPreview');
  const previewText = document.getElementById('schedPreviewText');
  if (d && t) {
    const dateStr = new Date(d + 'T' + t).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    previewText.textContent = `Scheduled for ${dateStr} at ${t} UTC`;
    preview.style.display = 'flex';
  } else {
    preview.style.display = 'none';
  }
}
function confirmSchedule() {
  const d = document.getElementById('schedDate').value;
  const t = document.getElementById('schedTime').value;
  if (!d || !t) { showToast('Missing info', 'Please select a date and time.', 'error'); return; }
  closeScheduleModal();
  const dateStr = new Date(d + 'T' + t).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  showToast('Scheduled!', `Will publish ${dateStr} at ${t} UTC.`, 'success');
}

// ===========================
// DANGER MODAL (Delete / Unpublish)
// ===========================
function confirmDangerAction(type) {
  const modal = document.getElementById('dangerModal');
  const titleEl = document.getElementById('dangerTitle');
  const subEl = document.getElementById('dangerSub');
  const btn = document.getElementById('dangerConfirmBtn');
  if (type === 'delete') {
    titleEl.textContent = 'Delete Video?';
    subEl.textContent = 'This action is permanent. All stats, comments, and earnings data for this video will be lost.';
    btn.textContent = 'Yes, Delete Forever';
    btn.onclick = () => { closeDangerModal(); showToast('Video deleted', 'The animation has been permanently removed.', 'error'); setTimeout(() => switchPage('library'), 1200); };
  } else {
    titleEl.textContent = 'Unpublish Video?';
    subEl.textContent = 'The video will be hidden from your public profile. You can re-publish it anytime from your library.';
    btn.textContent = 'Unpublish';
    btn.style.background = 'linear-gradient(135deg,#f59e0b,#d97706)';
    btn.style.boxShadow = '0 0 20px rgba(245,158,11,0.35)';
    btn.onclick = () => { closeDangerModal(); showToast('Video unpublished', 'Set to draft. You can re-publish anytime.', 'info'); };
  }
  modal.classList.add('show');
}
function closeDangerModal() {
  document.getElementById('dangerModal').classList.remove('show');
}

// ===========================
// PAYMENT SETTINGS MODAL
// ===========================
function openPaymentSettings() {
  document.getElementById('paymentSettingsModal').classList.add('show');
}
function closePaymentSettingsModal() {
  document.getElementById('paymentSettingsModal').classList.remove('show');
}

// ===========================
// VIDEO STATS MODAL
// ===========================
function openVideoStats(videoId) {
  const v = videos.find(x => x.id === videoId);
  if (!v) return;
  if (v.status !== 'published') { showToast('No stats yet', 'Stats are only available once a video is published.', 'info'); return; }
  document.getElementById('statsModalTitle').textContent = v.title;
  document.getElementById('videoStatsModal').classList.add('show');
}
function closeVideoStatsModal() {
  document.getElementById('videoStatsModal').classList.remove('show');
}

function openShareModal(videoId) {
  const v = videos.find(x => x.id === videoId);
  if (v) {
    document.getElementById('shareLinkInput').value = `https://channelinf.com/v/${v.id || '9Xq2mF'}`;
  }
  document.getElementById('shareModal').classList.add('show');
}
function closeShareModal() {
  document.getElementById('shareModal').classList.remove('show');
}
function copyShareLink() {
  const input = document.getElementById('shareLinkInput');
  input.select();
  document.execCommand('copy');
  showToast('Link copied!', 'Video share link copied to clipboard.', 'success');
}

// ===========================
// VIDEO CONTEXT MENU (3-dots)
// ===========================
function openVideoMenu(event, videoId) {
  event.stopPropagation();
  closeAllDropdowns();
  const btn = event.currentTarget || event.target.closest('button');
  const rect = btn.getBoundingClientRect();
  const menu = document.createElement('div');
  menu.id = 'videoContextMenu';
  menu.className = 'dropdown-menu show';
  menu.style.cssText = `position:fixed;width:190px;right:auto;z-index:1000;top:${rect.bottom + 6}px;left:${Math.min(rect.left, window.innerWidth - 200)}px`;
  const v = videos.find(x => x.id === videoId);
  menu.innerHTML = `
    <div class="dropdown-item" onclick="switchPage('edit');document.getElementById('videoContextMenu').remove()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      Edit Metadata
    </div>
    <div class="dropdown-item" onclick="openVideoStats(${videoId});document.getElementById('videoContextMenu').remove()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
      View Stats
    </div>
    <div class="dropdown-item" onclick="openShareModal(${videoId});document.getElementById('videoContextMenu').remove()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
      Share
    </div>
    <div class="dropdown-divider"></div>
    <div class="dropdown-item" style="color:var(--accent-amber)" onclick="confirmDangerAction('unpublish');document.getElementById('videoContextMenu').remove()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
      Unpublish
    </div>
    <div class="dropdown-item danger" onclick="confirmDangerAction('delete');document.getElementById('videoContextMenu').remove()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2 2h4a2 2 0 0 1 2 2v2"/></svg>
      Delete Permanently
    </div>
  `;
  document.body.appendChild(menu);
}

// ===========================
// AVATAR UPLOAD
// ===========================
function triggerAvatarUpload() {
  document.getElementById('avatarFileInput').click();
}
function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const avatar = document.getElementById('profileAvatar');
    if (avatar) {
      avatar.style.backgroundImage = `url(${e.target.result})`;
      avatar.style.backgroundSize = 'cover';
      avatar.style.backgroundPosition = 'center';
      avatar.textContent = '';
    }
    showToast('Photo updated', 'Your profile photo has been changed successfully.', 'success');
  };
  reader.readAsDataURL(file);
}

// ===========================
// NOTIFICATIONS
// ===========================
function markAllRead() {
  document.querySelectorAll('.notif-item.unread').forEach(item => {
    item.classList.remove('unread');
  });
  const cnt = document.getElementById('unreadCount');
  if (cnt) cnt.textContent = '0';
  showToast('All caught up', 'All notifications marked as read.', 'success');
}

function markNotifRead(item) {
  if (item.classList.contains('unread')) {
    item.classList.remove('unread');
    const cnt = document.getElementById('unreadCount');
    if (cnt) { const n = parseInt(cnt.textContent||'0') - 1; cnt.textContent = Math.max(0,n); }
  }
}

function deleteNotif(btn) {
  const item = btn.closest('.notif-item');
  item.style.transition = 'all 0.3s ease';
  item.style.transform = 'translateX(40px)';
  item.style.opacity = '0';
  item.style.maxHeight = item.offsetHeight + 'px';
  setTimeout(() => {
    item.style.maxHeight = '0';
    item.style.padding = '0';
    item.style.margin = '0';
    item.style.overflow = 'hidden';
    setTimeout(() => item.remove(), 200);
  }, 300);
}

function filterNotifs(type, tab) {
  document.querySelectorAll('.notif-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const allItems = document.querySelectorAll('.notif-item');
  allItems.forEach(item => {
    if (type === 'all') { item.style.display = ''; }
    else if (type === 'unread') { item.style.display = item.classList.contains('unread') ? '' : 'none'; }
    else { item.style.display = item.getAttribute('data-type') === type ? '' : 'none'; }
  });
  // Hide group headers when all items in their group are hidden
  const groups = [
    { hdr: 'today', listId: 'notifListToday' },
    { hdr: 'yesterday', listId: 'notifListYesterday' },
    { hdr: 'week', listId: 'notifListWeek' },
  ];
  groups.forEach(g => {
    const hdr = document.querySelector(`.notif-group-header[data-group="${g.hdr}"]`);
    const list = document.getElementById(g.listId);
    if (!hdr || !list) return;
    const visible = Array.from(list.querySelectorAll('.notif-item')).some(i => i.style.display !== 'none');
    hdr.style.display = visible ? '' : 'none';
  });
}

// ===========================
// UPLOAD DROPZONE
// ===========================
(function() {
  const dropzone = document.querySelector('.dropzone');
  if (!dropzone) return;
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'video/*,.mp4,.mov,.webm,.avi';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  dropzone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', e => { if (e.target.files[0]) handleFileUpload(e.target.files[0]); });

  dropzone.addEventListener('dragover', e => {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--brand-purple)';
    dropzone.style.background = 'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(192,38,211,0.05))';
  });
  dropzone.addEventListener('dragleave', () => {
    dropzone.style.borderColor = '';
    dropzone.style.background = '';
  });
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.background = '';
    if (e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files[0]);
  });
})();

function handleFileUpload(file) {
  const dz = document.querySelector('.dropzone');
  if (!dz) return;
  const sizeMB = (file.size / 1024 / 1024).toFixed(1);
  dz.style.cursor = 'default';
  dz.innerHTML = `
    <div class="dropzone-icon" style="background:linear-gradient(135deg,rgba(168,85,247,0.3),rgba(16,185,129,0.2));box-shadow:0 0 24px rgba(168,85,247,0.3)">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
    </div>
    <h3 style="max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${file.name}</h3>
    <p>${sizeMB} MB · ${file.type || 'video file'}</p>
    <div style="width:80%;max-width:300px;margin-top:20px">
      <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:8px">
        <span id="uploadStatus">Uploading…</span>
        <span id="uploadPct">0%</span>
      </div>
      <div style="height:6px;background:var(--bg-input);border-radius:3px;overflow:hidden;box-shadow:inset 0 1px 2px rgba(0,0,0,0.2)">
        <div id="uploadBar" style="width:0%;height:100%;background:var(--gradient-brand);transition:width 0.25s ease;border-radius:3px"></div>
      </div>
    </div>
  `;
  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 10 + 3;
    if (pct > 100) pct = 100;
    const bar = document.getElementById('uploadBar');
    const pctEl = document.getElementById('uploadPct');
    if (bar) bar.style.width = pct.toFixed(1) + '%';
    if (pctEl) pctEl.textContent = Math.round(pct) + '%';
    if (pct >= 100) {
      clearInterval(interval);
      const statusEl = document.getElementById('uploadStatus');
      if (statusEl) statusEl.textContent = '✓ Upload complete';
      if (statusEl) statusEl.style.color = 'var(--accent-green)';
      if (bar) bar.style.background = 'linear-gradient(90deg,#10b981,#34d399)';
      showToast('Upload complete!', `"${file.name}" is ready to publish.`, 'success');
    }
  }, 160);
}

// ===========================
// GLOBAL SEARCH
// ===========================
(function() {
  const searchInput = document.getElementById('globalSearchInput');
  const searchDrop = document.getElementById('searchDropdown');
  if (!searchInput || !searchDrop) return;

  const searchIndex = [
    { type:'page', icon:'📊', title:'Dashboard', sub:'Overview & stats', page:'dashboard' },
    { type:'page', icon:'📹', title:'My Content', sub:'Your video library', page:'library' },
    { type:'page', icon:'⬆️', title:'Upload', sub:'Upload new animation', page:'upload' },
    { type:'page', icon:'📈', title:'Analytics', sub:'Audience & performance insights', page:'analytics' },
    { type:'page', icon:'💰', title:'Earnings & Wallet', sub:'Donations and revenue', page:'monetization' },
    { type:'page', icon:'🔔', title:'Notifications', sub:'5 unread alerts', page:'notifications' },
    { type:'page', icon:'👤', title:'Creator Profile', sub:'Astra Studio', page:'profile' },
    { type:'page', icon:'⚙️', title:'Settings', sub:'Account & security', page:'settings' },
    { type:'page', icon:'🎫', title:'Contact Support', sub:'Get help from our team', page:'support' },
    ...videos.map(v => ({ type:'video', icon:'🎬', title:v.title, sub:`${v.cat} · ${v.views} views · ${v.status}`, page:'edit', status:v.status })),
  ];

  function hl(text, q) {
    if (!q) return text;
    return text.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'), '<mark>$1</mark>');
  }

  searchInput.addEventListener('input', e => {
    const q = e.target.value.trim();
    if (!q) { searchDrop.classList.remove('show'); return; }
    const results = searchIndex.filter(r => r.title.toLowerCase().includes(q.toLowerCase()) || r.sub.toLowerCase().includes(q.toLowerCase())).slice(0,8);
    if (!results.length) {
      searchDrop.innerHTML = `<div class="search-empty"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>No results for "<strong>${e.target.value}</strong>"</div>`;
    } else {
      const pages = results.filter(r => r.type === 'page');
      const vids = results.filter(r => r.type === 'video');
      const statusColor = s => s === 'published' ? '#10b981' : s === 'draft' ? '#f59e0b' : '#06b6d4';
      let html = '';
      if (pages.length) {
        html += `<div class="search-dropdown-header">Pages & Sections</div>`;
        html += pages.map(r => `<div class="search-result-item" onclick="switchPage('${r.page}');document.getElementById('searchDropdown').classList.remove('show');document.getElementById('globalSearchInput').value=''"><div class="search-result-icon" style="font-size:18px;background:rgba(168,85,247,0.12)">${r.icon}</div><div class="search-result-text"><div class="search-result-title">${hl(r.title,q)}</div><div class="search-result-meta">${r.sub}</div></div><span class="search-result-badge" style="background:rgba(168,85,247,0.15);color:var(--brand-purple-light)">Page</span></div>`).join('');
      }
      if (vids.length) {
        html += `<div class="search-dropdown-header">Videos</div>`;
        html += vids.map(r => `<div class="search-result-item" onclick="switchPage('${r.page}');document.getElementById('searchDropdown').classList.remove('show');document.getElementById('globalSearchInput').value=''"><div class="search-result-icon" style="font-size:18px;background:rgba(168,85,247,0.12)">${r.icon}</div><div class="search-result-text"><div class="search-result-title">${hl(r.title,q)}</div><div class="search-result-meta">${r.sub}</div></div><span class="search-result-badge" style="background:rgba(${r.status==='published'?'16,185,129':r.status==='draft'?'245,158,11':'6,182,212'},0.15);color:${statusColor(r.status)};text-transform:capitalize">${r.status}</span></div>`).join('');
      }
      searchDrop.innerHTML = html;
    }
    searchDrop.classList.add('show');
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) searchDrop.classList.add('show');
  });
})();

// ===========================
// DASHBOARD PERIOD BUTTONS
// ===========================
const periodData = {
  7:  { labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], views:[18000,22000,19000,28000,35000,42000,38000], earnings:[140,180,150,240,310,380,320] },
  30: { labels:['1','5','10','15','20','25','30'], views:[22000,28000,35000,32000,48000,55000,62000], earnings:[180,240,310,280,420,510,620] },
  90: { labels:['Mar','Apr','May (wk1)','May (wk2)','May (wk3)','May (wk4)'], views:[85000,120000,138000,145000,162000,178000], earnings:[680,980,1100,1200,1380,1520] },
};
document.querySelectorAll('.period-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.btn-group');
    group.querySelectorAll('.period-btn').forEach(b => { b.className = 'btn-ghost period-btn'; b.style.cssText = 'font-size:11px;padding:6px 10px'; });
    btn.className = 'btn-secondary period-btn';
    btn.style.cssText = 'font-size:11px;padding:6px 10px';
    const period = parseInt(btn.getAttribute('data-period'));
    const d = periodData[period] || periodData[30];
    // Update the dashboard chart
    const chart = Object.values(Chart.instances).find(c => c.canvas && c.canvas.id === 'dashChart');
    if (chart) {
      chart.data.labels = d.labels;
      chart.data.datasets[0].data = d.views;
      chart.data.datasets[1].data = d.earnings;
      chart.update('active');
    }
  });
});

// ===========================
// MOBILE SIDEBAR
// ===========================
function toggleMobileSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('open');
  overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
}
function closeMobileSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.remove('open');
  overlay.style.display = 'none';
}
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => { if (window.innerWidth <= 900) closeMobileSidebar(); });
});

// ===========================
// TOAST NOTIFICATION SYSTEM
// ===========================
let toastTimer = null;
function showToast(title, sub, type = 'info') {
  const toast = document.getElementById('toast');
  const iconEl = document.getElementById('toastIcon');
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastSub').textContent = sub;
  const icons = {
    success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
  };
  iconEl.innerHTML = icons[type] || icons.info;
  iconEl.className = `toast-icon ${type}`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => hideToast(), 4000);
}
function hideToast() {
  document.getElementById('toast').classList.remove('show');
}

// ===========================
// WITHDRAWAL FLOW
// ===========================
let currentWithdrawStep = 1;

function openWithdrawFlow() {
  const panel = document.getElementById('withdrawFlowPanel');
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  goWithdrawStep(1);
}
function closeWithdrawFlow() {
  document.getElementById('withdrawFlowPanel').style.display = 'none';
  goWithdrawStep(1);
}
function goWithdrawStep(step) {
  currentWithdrawStep = step;
  for (let i = 1; i <= 3; i++) {
    const body = document.getElementById('wbody' + i);
    const dot = document.getElementById('wstep' + i);
    if (body) body.style.display = (i === step) ? 'block' : 'none';
    if (dot) {
      dot.classList.remove('active', 'done');
      if (i < step) dot.classList.add('done');
      else if (i === step) dot.classList.add('active');
    }
  }
  if (step === 3) {
    const amt = parseFloat(document.getElementById('withdrawAmountInput').value) || 500;
    const feeEl = document.querySelector('#wbody3 [style*="processing fee"] strong') || null;
    const amtEl = document.getElementById('confirmAmount');
    const rcvEl = document.getElementById('confirmReceive');
    if (amtEl) amtEl.textContent = '$' + amt.toFixed(2);
    if (rcvEl) rcvEl.textContent = '$' + amt.toFixed(2);
  }
}
function setWithdrawAmount(amount, el) {
  const input = document.getElementById('withdrawAmountInput');
  if (input) input.value = amount;
  document.querySelectorAll('.amount-preset').forEach(p => p.classList.remove('active'));
  if (el) el.classList.add('active');
  const amtEl = document.getElementById('confirmAmount');
  const rcvEl = document.getElementById('confirmReceive');
  if (amtEl) amtEl.textContent = '$' + parseFloat(amount).toFixed(2);
  if (rcvEl) rcvEl.textContent = '$' + parseFloat(amount).toFixed(2);
}
function selectPaymentMethod(card) {
  document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}
function submitWithdrawal() {
  const amt = parseFloat(document.getElementById('withdrawAmountInput').value) || 500;
  closeWithdrawFlow();
  showToast('Withdrawal Submitted!', '$' + amt.toFixed(2) + ' request sent — processing in 1 business day.', 'success');
  // Update status tracking counts visually
  const pendingCount = document.querySelector('.status-pending .status-track-count');
  if (pendingCount) {
    const n = parseInt(pendingCount.textContent) + 1;
    pendingCount.textContent = n;
  }
}

// ===========================
// SUPPORT TICKET
// ===========================
function submitSupportTicket() {
  const cat = document.getElementById('supportCategory');
  if (cat && !cat.value) {
    showToast('Missing category', 'Please select a support category.', 'error');
    return;
  }
  showToast('Ticket Submitted!', 'Our team will respond within 2 hours. Check your email for confirmation.', 'success');
}


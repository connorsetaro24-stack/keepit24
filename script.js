// ========================================
// alive@keep;t 24 — JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initCounters();
  loadBibleVerse();
  loadBlogPosts();
  loadApprovedStories();
  loadFounderData();
  loadTeamData();
  loadWaterData();
  loadSiteSettings();
  loadReel();
  loadWhatsAppLink();
});

// ========== MOBILE NAVIGATION ==========
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.section-header, .founder-grid, .team-card, .testimonial-card, .blog-card, ' +
    '.water-showcase, .verse-card, .contact-grid, .share-story, .church-finder'
  );

  elements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ========== STAT COUNTERS ==========
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, 16);
      });
    }
  }, { threshold: 0.5 });

  if (counters.length > 0) {
    observer.observe(counters[0].closest('.stats-bar'));
  }
}

// ========== BIBLE VERSE OF THE DAY ==========
const bibleVerses = [
  { text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."', ref: 'Jeremiah 29:11' },
  { text: '"Come to me, all you who are weary and burdened, and I will give you rest."', ref: 'Matthew 11:28' },
  { text: '"The Lord is close to the brokenhearted and saves those who are crushed in spirit."', ref: 'Psalm 34:18' },
  { text: '"I can do all things through Christ who strengthens me."', ref: 'Philippians 4:13' },
  { text: '"Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."', ref: 'Joshua 1:9' },
  { text: '"He heals the brokenhearted and binds up their wounds."', ref: 'Psalm 147:3' },
  { text: '"Cast all your anxiety on him because he cares for you."', ref: '1 Peter 5:7' },
  { text: '"The Lord is my strength and my shield; my heart trusts in him, and he helps me."', ref: 'Psalm 28:7' },
  { text: '"When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you."', ref: 'Isaiah 43:2' },
  { text: '"No weapon forged against you will prevail."', ref: 'Isaiah 54:17' },
  { text: '"But those who hope in the Lord will renew their strength. They will soar on wings like eagles."', ref: 'Isaiah 40:31' },
  { text: '"God is our refuge and strength, an ever-present help in trouble."', ref: 'Psalm 46:1' },
  { text: '"So do not fear, for I am with you; do not be dismayed, for I am your God."', ref: 'Isaiah 41:10' },
  { text: '"He gives strength to the weary and increases the power of the weak."', ref: 'Isaiah 40:29' },
  { text: '"The Lord your God is in your midst, a mighty one who will save; he will rejoice over you with gladness."', ref: 'Zephaniah 3:17' },
  { text: '"And we know that in all things God works for the good of those who love him."', ref: 'Romans 8:28' },
  { text: '"Be strong and take heart, all you who hope in the Lord."', ref: 'Psalm 31:24' },
  { text: '"Trust in the Lord with all your heart and lean not on your own understanding."', ref: 'Proverbs 3:5' },
  { text: '"The righteous cry out, and the Lord hears them; he delivers them from all their troubles."', ref: 'Psalm 34:17' },
  { text: '"Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid."', ref: 'John 14:27' },
  { text: '"If God is for us, who can be against us?"', ref: 'Romans 8:31' },
  { text: '"The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full."', ref: 'John 10:10' },
  { text: '"Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!"', ref: '2 Corinthians 5:17' },
  { text: '"Weeping may stay for the night, but rejoicing comes in the morning."', ref: 'Psalm 30:5' },
  { text: '"My grace is sufficient for you, for my power is made perfect in weakness."', ref: '2 Corinthians 12:9' },
  { text: '"Blessed is the man who remains steadfast under trial, for when he has stood the test he will receive the crown of life."', ref: 'James 1:12' },
  { text: '"The Lord is my light and my salvation — whom shall I fear?"', ref: 'Psalm 27:1' },
  { text: '"Fear not, for I have redeemed you; I have summoned you by name; you are mine."', ref: 'Isaiah 43:1' },
  { text: '"In my distress I called to the Lord, and he answered me."', ref: 'Psalm 120:1' },
  { text: '"Yet in all these things we are more than conquerors through Him who loved us."', ref: 'Romans 8:37' },
  { text: '"Create in me a clean heart, O God, and renew a right spirit within me."', ref: 'Psalm 51:10' },
];

function loadBibleVerse() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const index = dayOfYear % bibleVerses.length;
  const verse = bibleVerses[index];

  document.getElementById('verseText').textContent = verse.text;
  document.getElementById('verseRef').textContent = '— ' + verse.ref;
}

// ========== BLOG — Load from localStorage ==========
function loadBlogPosts() {
  const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  const today = new Date();
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

  const blogDay = document.getElementById('blogDay');
  const blogMonth = document.getElementById('blogMonth');
  const blogTitle = document.getElementById('blogTitle');
  const blogBody = document.getElementById('blogBody');
  const blogBody2 = document.getElementById('blogBody2');

  if (posts.length > 0) {
    const latest = posts[0];
    const d = new Date(latest.date);
    if (blogDay) blogDay.textContent = d.getDate();
    if (blogMonth) blogMonth.textContent = months[d.getMonth()];
    if (blogTitle) blogTitle.textContent = latest.title;
    if (blogBody) blogBody.textContent = latest.body;
    if (blogBody2) blogBody2.textContent = '';
  } else {
    if (blogDay) blogDay.textContent = today.getDate();
    if (blogMonth) blogMonth.textContent = months[today.getMonth()];
  }
}

// ========== TESTIMONIAL SUBMISSION (now goes to pending) ==========
function submitStory(e) {
  e.preventDefault();

  const name = document.getElementById('storyName').value.trim();
  const journey = document.getElementById('storyJourney').value.trim();
  const text = document.getElementById('storyText').value.trim();

  if (!name || !text) return;

  const pending = JSON.parse(localStorage.getItem('pendingStories') || '[]');
  pending.push({
    id: Date.now(),
    name: name,
    journey: journey,
    text: text,
    date: new Date().toISOString()
  });
  localStorage.setItem('pendingStories', JSON.stringify(pending));

  const form = document.getElementById('storyForm');
  form.reset();

  const msg = document.createElement('div');
  msg.className = 'success-message';
  msg.innerHTML = 'Message sent in for review.<br><span style="font-weight:400; font-size:0.9rem; color: #a0a0a0;">Keep up to date with our page to see your testimony go live!</span>';
  form.parentNode.insertBefore(msg, form);
  setTimeout(() => msg.remove(), 8000);
}

// ========== LOAD APPROVED STORIES ==========
function loadApprovedStories() {
  const approved = JSON.parse(localStorage.getItem('approvedStories') || '[]');
  const grid = document.getElementById('testimonialsGrid');
  if (!grid || approved.length === 0) return;

  approved.forEach(story => {
    const card = document.createElement('div');
    card.className = 'testimonial-card fade-in visible';
    card.innerHTML = `
      <div class="testimonial-quote">"</div>
      <p>${escapeHTML(story.text)}</p>
      <div class="testimonial-author">
        <span class="author-name">${escapeHTML(story.name)}</span>
        ${story.journey ? `<span class="author-detail">${escapeHTML(story.journey)}</span>` : ''}
      </div>
    `;
    grid.appendChild(card);
  });
}

// ========== CONTACT FORM (now stores messages) ==========
function submitContact(e) {
  e.preventDefault();

  const form = document.getElementById('contactForm');
  const inputs = form.querySelectorAll('input, select, textarea');
  const message = {
    id: Date.now(),
    name: inputs[0].value,
    email: inputs[1].value,
    phone: inputs[2].value,
    topic: inputs[3].value,
    message: inputs[4].value,
    date: new Date().toISOString()
  };

  const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  messages.push(message);
  localStorage.setItem('contactMessages', JSON.stringify(messages));

  const msg = document.createElement('div');
  msg.className = 'success-message';
  msg.innerHTML = 'Message sent!';
  form.parentNode.insertBefore(msg, form.nextSibling);
  form.reset();
  setTimeout(() => msg.remove(), 8000);
}

// ========== JOIN BROTHERHOOD ==========
function openJoinModal() {
  document.getElementById('joinModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeJoinModal() {
  document.getElementById('joinModal').style.display = 'none';
  document.body.style.overflow = '';
}

function checkJoinRules() {
  const checks = document.querySelectorAll('.join-check');
  const allChecked = Array.from(checks).every(c => c.checked);
  const linkArea = document.getElementById('joinLinkArea');
  const lockedMsg = document.getElementById('joinLockedMsg');

  if (allChecked) {
    linkArea.style.display = 'block';
    lockedMsg.style.display = 'none';
  } else {
    linkArea.style.display = 'none';
    lockedMsg.style.display = 'block';
  }
}

// ========== CHURCH FINDER ==========
function findChurches() {
  const location = document.getElementById('churchLocation').value.trim();
  const resultsDiv = document.getElementById('churchResults');

  if (!location) {
    resultsDiv.innerHTML = '<div class="church-placeholder"><p style="color: var(--red-light);">Please enter a city or area to search.</p></div>';
    return;
  }

  const mapsUrl = 'https://www.google.com/maps/search/christian+church+near+' + encodeURIComponent(location);

  resultsDiv.innerHTML = `
    <div class="church-list">
      <div class="church-item" style="grid-column: 1 / -1; text-align: center; padding: 30px;">
        <h4 style="margin-bottom: 12px;">Christian Churches near ${escapeHTML(location)}</h4>
        <p style="margin-bottom: 16px;">Click below to view all Christian churches near you on Google Maps.</p>
        <a href="${mapsUrl}" target="_blank" rel="noopener" class="btn btn-primary" style="display: inline-block;">Open Google Maps →</a>
      </div>
    </div>
    <div style="margin-top: 20px; border-radius: 12px; overflow: hidden; border: 1px solid var(--gray-dark);">
      <iframe
        width="100%"
        height="400"
        style="border:0; display:block;"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/search?q=christian+church+near+${encodeURIComponent(location)}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8">
      </iframe>
    </div>
  `;
}

// ========================================
// ADMIN PANEL
// ========================================

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

function showAdminLogin() {
  document.getElementById('adminLoginModal').style.display = 'flex';
  document.getElementById('adminError').style.display = 'none';
  document.getElementById('adminUser').value = '';
  document.getElementById('adminPass').value = '';
}

function closeAdminLogin() {
  document.getElementById('adminLoginModal').style.display = 'none';
}

function adminLogin() {
  const user = document.getElementById('adminUser').value.trim();
  const pass = document.getElementById('adminPass').value;

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    document.getElementById('adminLoginModal').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    sessionStorage.setItem('adminLoggedIn', 'true');
    loadAdminPanel();
    document.getElementById('adminPanel').scrollIntoView({ behavior: 'smooth' });
  } else {
    document.getElementById('adminError').style.display = 'block';
  }
}

function adminLogout() {
  sessionStorage.removeItem('adminLoggedIn');
  document.getElementById('adminPanel').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchAdminTab(tab, btn) {
  document.querySelectorAll('.admin-tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.admin-tab').forEach(el => el.classList.remove('active'));
  document.getElementById('adminTab-' + tab).classList.add('active');
  btn.classList.add('active');

  if (tab === 'stories') loadPendingStories();
  if (tab === 'messages') loadMessages();
  if (tab === 'blog') loadBlogHistory();
  if (tab === 'founder') loadFounderForm();
  if (tab === 'team') loadTeamForm();
  if (tab === 'water') loadWaterForm();
  if (tab === 'reels') loadReelForm();
  if (tab === 'settings') loadSettingsForm();
}

function loadAdminPanel() {
  loadBlogHistory();
  loadPendingStories();
  loadMessages();
}

// ========== ADMIN: BLOG EDITOR ==========
function saveBlogPost() {
  const title = document.getElementById('blogTitleInput').value.trim();
  const body = document.getElementById('blogBodyInput').value.trim();

  if (!title || !body) {
    showBlogMsg('Please fill in both title and message.', true);
    return;
  }

  const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  posts.unshift({
    id: Date.now(),
    title: title,
    body: body,
    date: new Date().toISOString()
  });
  localStorage.setItem('blogPosts', JSON.stringify(posts));

  document.getElementById('blogTitleInput').value = '';
  document.getElementById('blogBodyInput').value = '';
  showBlogMsg('Blog post published!', false);
  loadBlogHistory();
  loadBlogPosts();
}

function showBlogMsg(text, isError) {
  const el = document.getElementById('blogSaveMsg');
  if (isError) {
    el.innerHTML = `<div class="success-message" style="border-color: var(--gray-dark);">${escapeHTML(text)}</div>`;
  } else {
    el.innerHTML = `<div class="success-message" style="background: rgba(39, 174, 96, 0.15); border-color: #27ae60; color: #27ae60; font-weight: 600;">${escapeHTML(text)}</div>`;
  }
  setTimeout(() => { el.innerHTML = ''; }, 4000);
}

function loadBlogHistory() {
  const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  const el = document.getElementById('blogHistory');
  if (!el) return;

  if (posts.length === 0) {
    el.innerHTML = '<p class="admin-empty">No blog posts yet. Write your first one above.</p>';
    return;
  }

  el.innerHTML = '<h4 style="font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 16px;">Previous Posts</h4>' +
    '<div class="blog-history-grid">' +
    posts.map(p => {
      const d = new Date(p.date);
      return `
        <div class="blog-history-item">
          <div class="blog-hist-date">${d.toLocaleDateString()} ${d.toLocaleTimeString()}</div>
          <h4>${escapeHTML(p.title)}</h4>
          <p>${escapeHTML(p.body).substring(0, 200)}${p.body.length > 200 ? '...' : ''}</p>
          <button class="admin-btn-delete" onclick="deleteBlogPost(${p.id})" style="margin-top: 10px;">Delete</button>
        </div>
      `;
    }).join('') + '</div>';
}

function deleteBlogPost(id) {
  let posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  posts = posts.filter(p => p.id !== id);
  localStorage.setItem('blogPosts', JSON.stringify(posts));
  loadBlogHistory();
  loadBlogPosts();
}

// ========== ADMIN: PENDING STORIES ==========
function loadPendingStories() {
  const pending = JSON.parse(localStorage.getItem('pendingStories') || '[]');
  const el = document.getElementById('pendingStoriesList');
  if (!el) return;

  if (pending.length === 0) {
    el.innerHTML = '<p class="admin-empty">No pending stories to review.</p>';
    return;
  }

  el.innerHTML = pending.map(s => {
    const d = new Date(s.date);
    return `
      <div class="admin-story-card">
        <h4>${escapeHTML(s.name)}</h4>
        <div class="admin-meta">${s.journey ? escapeHTML(s.journey) + ' · ' : ''}${d.toLocaleDateString()} ${d.toLocaleTimeString()}</div>
        <p>${escapeHTML(s.text)}</p>
        <div class="admin-actions">
          <button class="admin-btn-approve" onclick="approveStory(${s.id})">Approve</button>
          <button class="admin-btn-reject" onclick="rejectStory(${s.id})">Reject</button>
        </div>
      </div>
    `;
  }).join('');
}

function approveStory(id) {
  let pending = JSON.parse(localStorage.getItem('pendingStories') || '[]');
  const story = pending.find(s => s.id === id);
  if (!story) return;

  pending = pending.filter(s => s.id !== id);
  localStorage.setItem('pendingStories', JSON.stringify(pending));

  const approved = JSON.parse(localStorage.getItem('approvedStories') || '[]');
  approved.unshift(story);
  localStorage.setItem('approvedStories', JSON.stringify(approved));

  loadPendingStories();

  const grid = document.getElementById('testimonialsGrid');
  if (grid) {
    const card = document.createElement('div');
    card.className = 'testimonial-card fade-in visible';
    card.innerHTML = `
      <div class="testimonial-quote">"</div>
      <p>${escapeHTML(story.text)}</p>
      <div class="testimonial-author">
        <span class="author-name">${escapeHTML(story.name)}</span>
        ${story.journey ? `<span class="author-detail">${escapeHTML(story.journey)}</span>` : ''}
      </div>
    `;
    grid.insertBefore(card, grid.children[3] || null);
  }
}

function rejectStory(id) {
  let pending = JSON.parse(localStorage.getItem('pendingStories') || '[]');
  pending = pending.filter(s => s.id !== id);
  localStorage.setItem('pendingStories', JSON.stringify(pending));
  loadPendingStories();
}

// ========== ADMIN: MESSAGES ==========
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  const el = document.getElementById('messagesList');
  if (!el) return;

  if (messages.length === 0) {
    el.innerHTML = '<p class="admin-empty">No messages yet.</p>';
    return;
  }

  el.innerHTML = '<div class="admin-messages-grid">' + messages.slice().reverse().map(m => {
    const d = new Date(m.date);
    return `
      <div class="admin-message-card">
        <h4>${escapeHTML(m.name)}</h4>
        <div class="admin-meta">${d.toLocaleDateString()} ${d.toLocaleTimeString()} · ${escapeHTML(m.topic)}</div>
        <p>${escapeHTML(m.message)}</p>
        <p style="font-size: 0.85rem; color: var(--red-light);">
          ${m.email ? '✉ ' + escapeHTML(m.email) : ''}
          ${m.phone ? ' · ☎ ' + escapeHTML(m.phone) : ''}
        </p>
        <div class="admin-actions" style="margin-top: 10px;">
          <a href="mailto:${escapeHTML(m.email)}" class="admin-btn-approve" style="text-decoration:none;">Reply by Email</a>
          ${m.phone ? `<a href="tel:${escapeHTML(m.phone)}" class="admin-btn-approve" style="text-decoration:none; background: var(--red);">Call</a>` : ''}
          <button class="admin-btn-delete" onclick="deleteMessage(${m.id})">Delete</button>
        </div>
      </div>
    `;
  }).join('') + '</div>';
}

function deleteMessage(id) {
  let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  messages = messages.filter(m => m.id !== id);
  localStorage.setItem('contactMessages', JSON.stringify(messages));
  loadMessages();
}

// ========== ADMIN: REELS ==========
function extractReelCode(url) {
  const match = url.match(/instagram\.com\/(?:reel|reels|p)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

function buildReelEmbed(code) {
  return `<iframe src="https://www.instagram.com/reel/${code}/embed/" width="400" height="680" frameborder="0" scrolling="no" allowtransparency="true" allowfullscreen="true" style="border-radius:12px;"></iframe>`;
}

function saveReel() {
  const url = document.getElementById('reelUrlInput').value.trim();
  if (!url) return;
  const code = extractReelCode(url);
  if (!code) {
    showSaveMsg('reelSaveMsg', 'Invalid Instagram reel link. Please paste a valid URL.', true);
    return;
  }
  localStorage.setItem('reelUrl', url);
  loadReel();
  loadReelPreview();
  showSaveMsg('reelSaveMsg', 'Reel saved!');
}

function loadReel() {
  const url = localStorage.getItem('reelUrl');
  if (!url) return;
  const code = extractReelCode(url);
  if (!code) return;
  const el = document.getElementById('reelEmbed');
  if (el) el.innerHTML = buildReelEmbed(code);
}

function loadReelPreview() {
  const url = localStorage.getItem('reelUrl');
  const preview = document.getElementById('reelPreview');
  if (!preview) return;
  if (!url) { preview.innerHTML = ''; return; }
  const code = extractReelCode(url);
  if (!code) return;
  preview.innerHTML = '<label style="margin-bottom:8px; display:block;">Current Reel Preview</label>' + buildReelEmbed(code);
}

function loadReelForm() {
  const url = localStorage.getItem('reelUrl');
  if (url) setVal('reelUrlInput', url);
  loadReelPreview();
}

// ========== ADMIN: FOUNDER ==========
function loadFounderData() {
  const data = JSON.parse(localStorage.getItem('founderData') || 'null');
  if (!data) return;
  if (data.title) setText('founderTitleEl', data.title);
  if (data.p1) setText('founderP1El', data.p1);
  if (data.p2) setText('founderP2El', data.p2);
  if (data.quote) setText('founderQuoteEl', data.quote);
  if (data.video) {
    const el = document.getElementById('founderVideoEl');
    if (el) el.href = data.video;
  }
  if (data.photo) {
    const pageImg = document.getElementById('founderPhotoImg');
    if (pageImg) pageImg.src = data.photo;
    const previewImg = document.getElementById('founderPhotoPreview');
    if (previewImg) previewImg.src = data.photo;
  }
}

function saveFounder() {
  const existing = JSON.parse(localStorage.getItem('founderData') || '{}');
  const data = {
    title: document.getElementById('founderTitle').value.trim(),
    p1: document.getElementById('founderP1').value.trim(),
    p2: document.getElementById('founderP2').value.trim(),
    quote: document.getElementById('founderQuote').value.trim(),
    video: document.getElementById('founderVideo').value.trim(),
    photo: existing.photo || ''
  };
  localStorage.setItem('founderData', JSON.stringify(data));
  loadFounderData();
  showSaveMsg('founderSaveMsg', 'Founder info saved!');
}

function previewFounderPhoto() {
  const fileInput = document.getElementById('founderPhotoInput');
  const preview = document.getElementById('founderPhotoPreview');
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    preview.src = dataUrl;

    const data = JSON.parse(localStorage.getItem('founderData') || '{}');
    data.photo = dataUrl;
    localStorage.setItem('founderData', JSON.stringify(data));

    const pageImg = document.getElementById('founderPhotoImg');
    if (pageImg) pageImg.src = dataUrl;
  };
  reader.readAsDataURL(file);
}

function loadFounderForm() {
  const data = JSON.parse(localStorage.getItem('founderData') || 'null');
  if (!data) return;
  setVal('founderTitle', data.title);
  setVal('founderP1', data.p1);
  setVal('founderP2', data.p2);
  setVal('founderQuote', data.quote);
  setVal('founderVideo', data.video);
  if (data.photo) {
    const previewImg = document.getElementById('founderPhotoPreview');
    if (previewImg) previewImg.src = data.photo;
  }
}

// ========== ADMIN: TEAM ==========
function loadTeamData() {
  const data = JSON.parse(localStorage.getItem('teamData') || 'null');
  if (!data) return;

  for (let i = 1; i <= 3; i++) {
    const t = data['t' + i];
    if (!t) continue;
    if (t.name) setText('t' + i + 'Name', t.name);
    if (t.role) setText('t' + i + 'Role', t.role);
    if (t.testimonial !== undefined) setText('t' + i + 'Test', t.testimonial);
    if (t.phone) {
      const phoneEl = document.getElementById('t' + i + 'Phone');
      if (phoneEl) {
        phoneEl.href = 'tel:' + t.phone.replace(/\s/g, '');
        phoneEl.textContent = 'Call: ' + t.phone;
      }
    }
    if (t.email) {
      const emailEl = document.getElementById('t' + i + 'Email');
      if (emailEl) emailEl.href = 'mailto:' + t.email;
    }
    if (t.photo) {
      const pageImg = document.querySelector('#teamCard' + i + ' .team-photo img');
      if (pageImg) pageImg.src = t.photo;
      const previewImg = document.getElementById('team' + i + 'PhotoPreview');
      if (previewImg) previewImg.src = t.photo;
    }
  }
}

function saveTeam() {
  const data = JSON.parse(localStorage.getItem('teamData') || '{}');
  for (let i = 1; i <= 3; i++) {
    const existing = data['t' + i] || {};
    data['t' + i] = {
      name: document.getElementById('team' + i + 'Name').value.trim(),
      role: document.getElementById('team' + i + 'Role').value.trim(),
      phone: document.getElementById('team' + i + 'Phone').value.trim(),
      email: document.getElementById('team' + i + 'Email').value.trim(),
      testimonial: document.getElementById('team' + i + 'Testimonial').value.trim(),
      photo: existing.photo || ''
    };
  }
  localStorage.setItem('teamData', JSON.stringify(data));
  loadTeamData();
  showSaveMsg('teamSaveMsg', 'Team info saved!');
}

function previewTeamPhoto(num) {
  const fileInput = document.getElementById('team' + num + 'Photo');
  const preview = document.getElementById('team' + num + 'PhotoPreview');
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    preview.src = dataUrl;

    const data = JSON.parse(localStorage.getItem('teamData') || '{}');
    if (!data['t' + num]) data['t' + num] = {};
    data['t' + num].photo = dataUrl;
    localStorage.setItem('teamData', JSON.stringify(data));

    const pageImg = document.querySelector('#teamCard' + num + ' .team-photo img');
    if (pageImg) pageImg.src = dataUrl;
  };
  reader.readAsDataURL(file);
}

function loadTeamForm() {
  const data = JSON.parse(localStorage.getItem('teamData') || 'null');
  if (!data) return;
  for (let i = 1; i <= 3; i++) {
    const t = data['t' + i];
    if (!t) continue;
    setVal('team' + i + 'Name', t.name);
    setVal('team' + i + 'Role', t.role);
    setVal('team' + i + 'Phone', t.phone);
    setVal('team' + i + 'Email', t.email);
    setVal('team' + i + 'Testimonial', t.testimonial);
  }
}

// ========== ADMIN: ALIVE WATER ==========
function loadWaterData() {
  const data = JSON.parse(localStorage.getItem('waterData') || 'null');
  if (!data) return;
  if (data.headline) setText('waterHeadlineEl', data.headline);
  if (data.f1) setText('wf1', data.f1);
  if (data.f2) setText('wf2', data.f2);
  if (data.f3) setText('wf3', data.f3);
  if (data.f4) setText('wf4', data.f4);
  if (data.email) {
    const el = document.getElementById('waterOrderEl');
    if (el) el.href = 'mailto:' + data.email + '?subject=Alive Water Order';
  }
  if (data.video) {
    const el = document.getElementById('waterVideoEl');
    if (el) el.href = data.video;
  }
}

function saveWater() {
  const data = {
    headline: document.getElementById('waterHeadline').value.trim(),
    f1: document.getElementById('waterF1').value.trim(),
    f2: document.getElementById('waterF2').value.trim(),
    f3: document.getElementById('waterF3').value.trim(),
    f4: document.getElementById('waterF4').value.trim(),
    email: document.getElementById('waterEmail').value.trim(),
    video: document.getElementById('waterVideo').value.trim()
  };
  localStorage.setItem('waterData', JSON.stringify(data));
  loadWaterData();
  showSaveMsg('waterSaveMsg', 'Water info saved!');
}

function loadWaterForm() {
  const data = JSON.parse(localStorage.getItem('waterData') || 'null');
  if (!data) return;
  setVal('waterHeadline', data.headline);
  setVal('waterF1', data.f1);
  setVal('waterF2', data.f2);
  setVal('waterF3', data.f3);
  setVal('waterF4', data.f4);
  setVal('waterEmail', data.email);
  setVal('waterVideo', data.video);
}

// ========== ADMIN: SITE SETTINGS ==========
function loadSiteSettings() {
  const data = JSON.parse(localStorage.getItem('siteSettings') || 'null');
  if (!data) return;
  if (data.phone) setText('sitePhoneEl', data.phone);
  if (data.email) setText('siteEmailEl', data.email);
  if (data.location) setText('siteLocationEl', data.location);
}

function saveSiteSettings() {
  const data = {
    phone: document.getElementById('sitePhone').value.trim(),
    email: document.getElementById('siteEmail').value.trim(),
    location: document.getElementById('siteLocation').value.trim()
  };
  localStorage.setItem('siteSettings', JSON.stringify(data));
  loadSiteSettings();
  showSaveMsg('settingsSaveMsg', 'Site settings saved!');
}

function loadSettingsForm() {
  const data = JSON.parse(localStorage.getItem('siteSettings') || 'null');
  if (data) {
    setVal('sitePhone', data.phone);
    setVal('siteEmail', data.email);
    setVal('siteLocation', data.location);
  }
  const waLink = localStorage.getItem('whatsappLink');
  if (waLink) setVal('whatsappLinkInput', waLink);
}

function saveWhatsAppLink() {
  const url = document.getElementById('whatsappLinkInput').value.trim();
  if (!url) return;
  localStorage.setItem('whatsappLink', url);
  loadWhatsAppLink();
  showSaveMsg('whatsappSaveMsg', 'WhatsApp link saved!');
}

function loadWhatsAppLink() {
  const url = localStorage.getItem('whatsappLink');
  if (!url) return;
  const el = document.getElementById('joinWhatsAppLink');
  if (el) el.href = url;
}

// ========== ADMIN: Load forms when switching tabs ==========
const origSwitchTab = switchAdminTab;
switchAdminTab = function(tab, btn) {
  document.querySelectorAll('.admin-tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.admin-tab').forEach(el => el.classList.remove('active'));
  document.getElementById('adminTab-' + tab).classList.add('active');
  btn.classList.add('active');

  if (tab === 'stories') loadPendingStories();
  if (tab === 'messages') loadMessages();
  if (tab === 'blog') loadBlogHistory();
  if (tab === 'founder') loadFounderForm();
  if (tab === 'team') loadTeamForm();
  if (tab === 'water') loadWaterForm();
  if (tab === 'settings') loadSettingsForm();
};

// ========== UTILITY ==========
function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el && val) el.textContent = val;
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el && val) el.value = val;
}

function showSaveMsg(id, text, isError) {
  const el = document.getElementById(id);
  if (!el) return;
  const bg = isError ? 'rgba(192, 57, 43, 0.15)' : 'rgba(39, 174, 96, 0.15)';
  const clr = isError ? 'var(--red-light)' : '#27ae60';
  el.innerHTML = `<div class="success-message" style="background: ${bg}; border-color: ${clr}; color: ${clr}; font-weight: 600;">${escapeHTML(text)}</div>`;
  setTimeout(() => { el.innerHTML = ''; }, 4000);
}

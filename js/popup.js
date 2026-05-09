const DB_KEY = 'ms_users';
const SESSION_KEY = 'ms_session';
const COUNTER_KEY = 'ms_counter';

function getDB() {
  try { return JSON.parse(localStorage.getItem(DB_KEY) || '[]'); }
  catch(e) { return []; }
}

function saveUser(data) {
  const db = getDB();
  const existing = db.find(u => u.email === data.email.toLowerCase());
  if (!existing) {
    db.push({ ...data, email: data.email.toLowerCase(), date: new Date().toISOString(), visits: 1 });
  } else {
    existing.visits = (existing.visits || 1) + 1;
    existing.last_visit = new Date().toISOString();
  }
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  incrementCounter();
  return existing || db[db.length - 1];
}

function getSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }
  catch(e) { return null; }
}

function setSession(data) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

function incrementCounter() {
  const current = parseInt(localStorage.getItem(COUNTER_KEY) || '54');
  localStorage.setItem(COUNTER_KEY, current + 1);
}

function getCounter() {
  return parseInt(localStorage.getItem(COUNTER_KEY) || '54') + 1;
}

function createPopupHTML() {
  return `
    <div id="ms-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(10,15,30,0.88);z-index:9999;display:flex;align-items:center;justify-content:center;padding:10px;">
      <div style="background:#fff;border-radius:12px;max-width:440px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.4);">

        <div style="background:#1a1a2e;padding:10px 16px;border-radius:12px 12px 0 0;">
          <div style="font-size:0.65rem;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;">MAVERICK STRATEGIST</div>
          <div style="font-family:Georgia,serif;font-size:0.95rem;color:#fff;font-weight:bold;margin-top:2px;">Unlock the Strategy Engine</div>
          <div style="font-size:0.72rem;color:#8899bb;margin-top:1px;"><strong id="popup-counter" style="color:#c9a84c;">55</strong> professionals have used this tool.</div>
        </div>

        <div style="padding:10px 16px;">

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;">
            <div>
              <label style="display:block;font-weight:600;font-size:0.75rem;color:#1a1a2e;margin-bottom:2px;">Full Name *</label>
              <input id="popup-name" type="text" placeholder="Your name" style="width:100%;padding:5px 8px;border:1.5px solid #dde2ea;border-radius:5px;font-size:0.8rem;outline:none;"/>
            </div>
            <div>
              <label style="display:block;font-weight:600;font-size:0.75rem;color:#1a1a2e;margin-bottom:2px;">Email *</label>
              <input id="popup-email" type="email" placeholder="your@email.com" style="width:100%;padding:5px 8px;border:1.5px solid #dde2ea;border-radius:5px;font-size:0.8rem;outline:none;"/>
            </div>
          </div>

          <div style="margin-bottom:6px;">
            <label style="display:block;font-weight:600;font-size:0.75rem;color:#1a1a2e;margin-bottom:2px;">Company <span style="font-weight:400;color:#999;">(optional)</span></label>
            <input id="popup-company" type="text" placeholder="Your firm or company" style="width:100%;padding:5px 8px;border:1.5px solid #dde2ea;border-radius:5px;font-size:0.8rem;outline:none;"/>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;">
            <div>
              <label style="display:block;font-weight:600;font-size:0.75rem;color:#1a1a2e;margin-bottom:3px;">I am a *</label>
              <label style="display:flex;align-items:center;gap:5px;border:1.5px solid #dde2ea;border-radius:5px;padding:5px 7px;cursor:pointer;margin-bottom:3px;" id="type-individual-label">
                <input type="radio" name="popup-type" value="individual" onchange="selectType('individual')" style="accent-color:#c9a84c;"/>
                <span style="font-size:0.75rem;font-weight:600;color:#1a1a2e;">Individual / Family</span>
              </label>
              <label style="display:flex;align-items:center;gap:5px;border:1.5px solid #dde2ea;border-radius:5px;padding:5px 7px;cursor:pointer;" id="type-corporate-label">
                <input type="radio" name="popup-type" value="corporate" onchange="selectType('corporate')" style="accent-color:#c9a84c;"/>
                <span style="font-size:0.75rem;font-weight:600;color:#1a1a2e;">Professional / Corporate</span>
              </label>
            </div>
            <div>
              <label style="display:block;font-weight:600;font-size:0.75rem;color:#1a1a2e;margin-bottom:3px;">Read the book? *</label>
              <label style="display:flex;align-items:center;gap:5px;border:1.5px solid #dde2ea;border-radius:5px;padding:5px 7px;cursor:pointer;margin-bottom:3px;" id="read-yes-label">
                <input type="radio" name="popup-read" value="yes" onchange="selectRead('yes')" style="accent-color:#c9a84c;"/>
                <span style="font-size:0.75rem;font-weight:600;color:#1a5c1a;">Yes — full analysis</span>
              </label>
              <label style="display:flex;align-items:center;gap:5px;border:1.5px solid #dde2ea;border-radius:5px;padding:5px 7px;cursor:pointer;" id="read-no-label">
                <input type="radio" name="popup-read" value="no" onchange="selectRead('no')" style="accent-color:#c9a84c;"/>
                <span style="font-size:0.75rem;font-weight:600;color:#a02020;">Not yet — partial</span>
              </label>
            </div>
          </div>

          <div id="popup-error" style="display:none;color:#a02020;font-size:0.75rem;margin-bottom:5px;padding:4px 8px;background:#fde8e8;border-radius:5px;"></div>

          <button onclick="submitPopup()" style="width:100%;padding:10px;background:#1a1a2e;color:#fff;border:none;border-radius:7px;font-weight:700;font-size:0.9rem;cursor:pointer;">
            Unlock My Analysis →
          </button>

          <p style="font-size:0.65rem;color:#999;text-align:center;margin:5px 0 0;">Your data is never sold or shared.</p>
        </div>
      </div>
    </div>
  `;
}

function selectType(val) {
  document.getElementById('type-individual-label').style.borderColor = val === 'individual' ? '#c9a84c' : '#dde2ea';
  document.getElementById('type-corporate-label').style.borderColor = val === 'corporate' ? '#c9a84c' : '#dde2ea';
}

function selectRead(val) {
  document.getElementById('read-yes-label').style.borderColor = val === 'yes' ? '#1a5c1a' : '#dde2ea';
  document.getElementById('read-no-label').style.borderColor = val === 'no' ? '#a02020' : '#dde2ea';
}

function showError(msg) {
  const el = document.getElementById('popup-error');
  el.textContent = msg;
  el.style.display = 'block';
}

function showWelcome(user) {
  const msg = document.createElement('div');
  msg.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9998;background:#1a1a2e;color:#fff;padding:12px 18px;border-radius:10px;box-shadow:0 8px 32px rgba(0,0,0,0.3);border-left:4px solid #c9a84c;max-width:280px;font-size:0.85rem;';
  msg.innerHTML = user.has_read
    ? `<strong style="color:#c9a84c">Full analysis unlocked</strong><br>Welcome ${user.name.split(' ')[0]}. Both engines ready.`
    : `<strong style="color:#c9a84c">Partial analysis unlocked</strong><br>Welcome ${user.name.split(' ')[0]}. Read The New Trustees for full results.`;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 4000);
}

function showEnginePopup(callback) {
  const session = getSession();
  if (session) { callback(session); return; }
  const div = document.createElement('div');
  div.innerHTML = createPopupHTML();
  document.body.appendChild(div.firstElementChild);
  document.getElementById('popup-counter').textContent = getCounter();
  window._engineCallback = callback;
}

window.submitPopup = function() {
  const name = document.getElementById('popup-name').value.trim();
  const email = document.getElementById('popup-email').value.trim();
  const company = document.getElementById('popup-company').value.trim();
  const typeEl = document.querySelector('input[name="popup-type"]:checked');
  const readEl = document.querySelector('input[name="popup-read"]:checked');

  if (!name) { showError('Please enter your full name.'); return; }
  if (!email || !email.includes('@')) { showError('Please enter a valid email.'); return; }
  if (!typeEl) { showError('Please select Individual or Professional.'); return; }
  if (!readEl) { showError('Please answer the book question.'); return; }

  const userData = { name, email, company, type: typeEl.value, has_read: readEl.value === 'yes' };
  saveUser(userData);
  setSession(userData);

  fetch('https://formspree.io/f/xjglalvd', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, company, type: typeEl.value, has_read: readEl.value, timestamp: new Date().toISOString() })
  }).catch(() => {});

  document.getElementById('ms-overlay').remove();
  showWelcome(userData);
  if (window._engineCallback) setTimeout(() => window._engineCallback(userData), 500);
};

window.exportDB = function() {
  const db = getDB();
  console.log('Total users:', db.length);
  console.table(db);
  const csv = ['Name,Email,Company,Type,Has Read,Date']
    .concat(db.map(u => `"${u.name}","${u.email}","${u.company||''}","${u.type}","${u.has_read}","${u.date}"`))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'maverick_users.csv';
  a.click();
};

function resetSession() {
  sessionStorage.removeItem('ms_session');
  location.reload();
}

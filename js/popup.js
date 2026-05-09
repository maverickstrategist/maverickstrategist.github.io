// ── DATABASE (localStorage as zero-cost database) ─────────────────────────────
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
    db.push({
      ...data,
      email: data.email.toLowerCase(),
      date: new Date().toISOString(),
      engines_used: [],
      visits: 1
    });
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

// ── POPUP HTML ────────────────────────────────────────────────────────────────
function createPopupHTML() {
  return `
    <div id="ms-overlay" style="
      position:fixed;top:0;left:0;right:0;bottom:0;
      background:rgba(10,15,30,0.85);
      z-index:9999;display:flex;align-items:center;justify-content:center;
      backdrop-filter:blur(4px);padding:20px;
    ">
      <div style="
        background:#fff;border-radius:14px;
        max-width:480px;width:100%;max-height:90vh;overflow-y:auto;
        box-shadow:0 20px 60px rgba(0,0,0,0.4);
        overflow:hidden;
      ">
        <!-- Header -->
        <div style="background:#1a1a2e;padding:16px 24px 12px;">
          <div style="font-size:0.72rem;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">MAVERICK STRATEGIST</div>
          <div style="font-family:Georgia,serif;font-size:1.1rem;color:#fff;font-weight:bold;line-height:1.3;">
            Access the Strategy Engine
          </div>
          <div style="font-size:0.88rem;color:#8899bb;margin-top:8px;">
            Used by <strong id="popup-counter" style="color:#c9a84c;">55</strong> professionals worldwide. 
            Enter your details to unlock your analysis.
          </div>
        </div>

        <!-- Form -->
        <div style="padding:16px 24px;">
          <div style="margin-bottom:10px;">
            <label style="display:block;font-weight:600;font-size:0.88rem;color:#1a1a2e;margin-bottom:6px;">Full Name *</label>
            <input id="popup-name" type="text" placeholder="Your full name"
              style="width:100%;padding:10px 14px;border:1.5px solid #dde2ea;border-radius:8px;font-size:0.95rem;outline:none;transition:border-color .2s;"
              onfocus="this.style.borderColor='#c9a84c'" onblur="this.style.borderColor='#dde2ea'"
            />
          </div>

          <div style="margin-bottom:10px;">
            <label style="display:block;font-weight:600;font-size:0.88rem;color:#1a1a2e;margin-bottom:6px;">Email Address *</label>
            <input id="popup-email" type="email" placeholder="your@email.com"
              style="width:100%;padding:10px 14px;border:1.5px solid #dde2ea;border-radius:8px;font-size:0.95rem;outline:none;transition:border-color .2s;"
              onfocus="this.style.borderColor='#c9a84c'" onblur="this.style.borderColor='#dde2ea'"
            />
          </div>

          <div style="margin-bottom:10px;">
            <label style="display:block;font-weight:600;font-size:0.88rem;color:#1a1a2e;margin-bottom:6px;">Company Name <span style="color:#999;font-weight:400;">(optional for individuals)</span></label>
            <input id="popup-company" type="text" placeholder="Your company or firm"
              style="width:100%;padding:10px 14px;border:1.5px solid #dde2ea;border-radius:8px;font-size:0.95rem;outline:none;transition:border-color .2s;"
              onfocus="this.style.borderColor='#c9a84c'" onblur="this.style.borderColor='#dde2ea'"
            />
          </div>

          <div style="margin-bottom:10px;">
            <label style="display:block;font-weight:600;font-size:0.88rem;color:#1a1a2e;margin-bottom:8px;">I am a *</label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <label id="type-individual-label" style="
                display:flex;align-items:center;gap:10px;
                border:1.5px solid #dde2ea;border-radius:8px;
                padding:8px 12px;cursor:pointer;transition:all .2s;
              ">
                <input type="radio" name="popup-type" value="individual" id="type-individual"
                  onchange="selectType('individual')"
                  style="accent-color:#c9a84c;width:16px;height:16px;"
                />
                <div>
                  <div style="font-weight:600;font-size:0.88rem;color:#1a1a2e;">Individual</div>
                  <div style="font-size:0.75rem;color:#999;">Family / Settlor</div>
                </div>
              </label>
              <label id="type-corporate-label" style="
                display:flex;align-items:center;gap:10px;
                border:1.5px solid #dde2ea;border-radius:8px;
                padding:8px 12px;cursor:pointer;transition:all .2s;
              ">
                <input type="radio" name="popup-type" value="corporate" id="type-corporate"
                  onchange="selectType('corporate')"
                  style="accent-color:#c9a84c;width:16px;height:16px;"
                />
                <div>
                  <div style="font-weight:600;font-size:0.88rem;color:#1a1a2e;">Professional</div>
                  <div style="font-size:0.75rem;color:#999;">Corporate / Adviser</div>
                </div>
              </label>
            </div>
          </div>

          <div style="margin-bottom:12px;">
            <label style="display:block;font-weight:600;font-size:0.88rem;color:#1a1a2e;margin-bottom:8px;">Have you read The New Trustees? *</label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <label id="read-yes-label" style="
                display:flex;align-items:center;gap:10px;
                border:1.5px solid #dde2ea;border-radius:8px;
                padding:8px 12px;cursor:pointer;transition:all .2s;
              ">
                <input type="radio" name="popup-read" value="yes" id="read-yes"
                  onchange="selectRead('yes')"
                  style="accent-color:#c9a84c;width:16px;height:16px;"
                />
                <div>
                  <div style="font-weight:600;font-size:0.88rem;color:#1a1a2e;">Yes</div>
                  <div style="font-size:0.75rem;color:#1a5c1a;">Full analysis unlocked</div>
                </div>
              </label>
              <label id="read-no-label" style="
                display:flex;align-items:center;gap:10px;
                border:1.5px solid #dde2ea;border-radius:8px;
                padding:8px 12px;cursor:pointer;transition:all .2s;
              ">
                <input type="radio" name="popup-read" value="no" id="read-no"
                  onchange="selectRead('no')"
                  style="accent-color:#c9a84c;width:16px;height:16px;"
                />
                <div>
                  <div style="font-weight:600;font-size:0.88rem;color:#1a1a2e;">Not yet</div>
                  <div style="font-size:0.75rem;color:#a02020;">Partial analysis</div>
                </div>
              </label>
            </div>
          </div>

          <div id="popup-error" style="display:none;color:#a02020;font-size:0.85rem;margin-bottom:12px;padding:8px 12px;background:#fde8e8;border-radius:6px;"></div>

          <button onclick="submitPopup()" style="
            width:100%;padding:14px;
            background:#1a1a2e;color:#fff;
            border:none;border-radius:8px;
            font-weight:700;font-size:1rem;
            cursor:pointer;transition:background .2s;
          "
          onmouseover="this.style.background='#c9a84c';this.style.color='#1a1a2e'"
          onmouseout="this.style.background='#1a1a2e';this.style.color='#fff'"
          >
            Unlock My Analysis →
          </button>

          <p style="font-size:0.75rem;color:#999;text-align:center;margin-top:12px;">
            Your data is never sold or shared. Used only to improve this platform.
          </p>
        </div>
      </div>
    </div>
  `;
}

function selectType(val) {
  document.getElementById('type-individual-label').style.borderColor = val === 'individual' ? '#c9a84c' : '#dde2ea';
  document.getElementById('type-individual-label').style.background = val === 'individual' ? '#fffdf5' : '#fff';
  document.getElementById('type-corporate-label').style.borderColor = val === 'corporate' ? '#c9a84c' : '#dde2ea';
  document.getElementById('type-corporate-label').style.background = val === 'corporate' ? '#fffdf5' : '#fff';
}

function selectRead(val) {
  document.getElementById('read-yes-label').style.borderColor = val === 'yes' ? '#1a5c1a' : '#dde2ea';
  document.getElementById('read-yes-label').style.background = val === 'yes' ? '#e8f4e8' : '#fff';
  document.getElementById('read-no-label').style.borderColor = val === 'no' ? '#a02020' : '#dde2ea';
  document.getElementById('read-no-label').style.background = val === 'no' ? '#fde8e8' : '#fff';
}

function submitPopup() {
  const name = document.getElementById('popup-name').value.trim();
  const email = document.getElementById('popup-email').value.trim();
  const company = document.getElementById('popup-company').value.trim();
  const typeEl = document.querySelector('input[name="popup-type"]:checked');
  const readEl = document.querySelector('input[name="popup-read"]:checked');
  const errorEl = document.getElementById('popup-error');

  // Validation
  if (!name) { showError('Please enter your full name.'); return; }
  if (!email || !email.includes('@')) { showError('Please enter a valid email address.'); return; }
  if (!typeEl) { showError('Please select whether you are an Individual or Professional.'); return; }
  if (!readEl) { showError('Please tell us whether you have read the book.'); return; }

  errorEl.style.display = 'none';

  const userData = {
    name,
    email,
    company,
    type: typeEl.value,
    has_read: readEl.value === 'yes',
  };

  // Save to database
  saveUser(userData);

  // Save session
  setSession(userData);

  // Send to FormSpree (free email collection service)
  fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name, email, company,
      type: typeEl.value,
      has_read: readEl.value,
      timestamp: new Date().toISOString(),
      source: 'Strategy Engine Popup'
    })
  }).catch(() => {}); // Fail silently if FormSpree not configured

  // Remove popup
  document.getElementById('ms-overlay').remove();

  // Show welcome message briefly
  showWelcome(userData);
}

function showError(msg) {
  const el = document.getElementById('popup-error');
  el.textContent = msg;
  el.style.display = 'block';
}

function showWelcome(user) {
  const msg = document.createElement('div');
  msg.style.cssText = `
    position:fixed;top:24px;right:24px;z-index:9998;
    background:#1a1a2e;color:#fff;
    padding:16px 24px;border-radius:10px;
    box-shadow:0 8px 32px rgba(0,0,0,0.3);
    border-left:4px solid #c9a84c;
    max-width:320px;font-size:0.92rem;
    animation:slideIn .3s ease;
  `;
  msg.innerHTML = user.has_read
    ? `<strong style="color:#c9a84c">Full analysis unlocked ✓</strong><br>Welcome ${user.name.split(' ')[0]}. Both engines are ready for you.`
    : `<strong style="color:#c9a84c">Partial analysis unlocked</strong><br>Welcome ${user.name.split(' ')[0]}. Read The New Trustees to unlock full recommendations.`;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 4000);
}

// ── POPUP TRIGGER ─────────────────────────────────────────────────────────────
function showEnginePopup(callback) {
  const session = getSession();
  if (session) {
    // Already registered this session — go straight to engine
    callback(session);
    return;
  }
  // Insert popup
  const div = document.createElement('div');
  div.innerHTML = createPopupHTML();
  document.body.appendChild(div.firstElementChild);

  // Update counter display
  document.getElementById('popup-counter').textContent = getCounter();

  // Store callback for after submission
  window._engineCallback = callback;
}

// Override submitPopup to also fire callback
const _originalSubmit = submitPopup;
window.submitPopup = function() {
  const name = document.getElementById('popup-name').value.trim();
  const email = document.getElementById('popup-email').value.trim();
  const company = document.getElementById('popup-company').value.trim();
  const typeEl = document.querySelector('input[name="popup-type"]:checked');
  const readEl = document.querySelector('input[name="popup-read"]:checked');
  const errorEl = document.getElementById('popup-error');

  if (!name) { showError('Please enter your full name.'); return; }
  if (!email || !email.includes('@')) { showError('Please enter a valid email address.'); return; }
  if (!typeEl) { showError('Please select whether you are an Individual or Professional.'); return; }
  if (!readEl) { showError('Please tell us whether you have read the book.'); return; }

  errorEl.style.display = 'none';

  const userData = { name, email, company, type: typeEl.value, has_read: readEl.value === 'yes' };

  saveUser(userData);
  setSession(userData);

  fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, company, type: typeEl.value, has_read: readEl.value, timestamp: new Date().toISOString() })
  }).catch(() => {});

  document.getElementById('ms-overlay').remove();
  showWelcome(userData);

  if (window._engineCallback) {
    setTimeout(() => window._engineCallback(userData), 500);
  }
};

// ── ADMIN EXPORT (type exportDB() in browser console) ─────────────────────────
window.exportDB = function() {
  const db = getDB();
  const readers = db.filter(u => u.has_read);
  const nonReaders = db.filter(u => !u.has_read);
  const individuals = db.filter(u => u.type === 'individual');
  const corporates = db.filter(u => u.type === 'corporate');

  console.log('=== MAVERICK STRATEGIST DATABASE ===');
  console.log(`Total users: ${db.length}`);
  console.log(`Have read book: ${readers.length}`);
  console.log(`Have not read: ${nonReaders.length}`);
  console.log(`Individuals: ${individuals.length}`);
  console.log(`Professionals/Corporate: ${corporates.length}`);
  console.log('');
  console.log('--- NON-READERS (email these about the book) ---');
  nonReaders.forEach(u => console.log(`${u.name} | ${u.email} | ${u.company || 'no company'} | ${u.type}`));
  console.log('');
  console.log('--- ALL USERS ---');
  console.table(db);

  // Download as CSV
  const csv = ['Name,Email,Company,Type,Has Read,Date']
    .concat(db.map(u => `"${u.name}","${u.email}","${u.company||''}","${u.type}","${u.has_read}","${u.date}"`))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'maverick_strategist_users.csv';
  a.click();
  console.log('CSV downloaded.');
};


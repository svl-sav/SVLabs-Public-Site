const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const nav = $('#main-nav'), menu = $('.menu-button');
const mobile = window.matchMedia('(max-width: 800px)');
function syncMenu() { menu.hidden = !mobile.matches; nav.dataset.collapsed = String(mobile.matches); menu.setAttribute('aria-expanded', 'false'); }
syncMenu();
mobile.addEventListener('change', syncMenu);
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.dataset.collapsed = String(!open); });
nav.addEventListener('click', event => { if (mobile.matches && event.target.closest('a')) { nav.dataset.collapsed = 'true'; menu.setAttribute('aria-expanded', 'false'); } });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && mobile.matches && menu.getAttribute('aria-expanded') === 'true') { nav.dataset.collapsed = 'true'; menu.setAttribute('aria-expanded', 'false'); menu.focus(); } });

const scenes = {
  arrival: {kicker:'AN APPROVED PERSON ARRIVES',title:'A welcome that knows the moment.',caption:'A welcome, made personal.',steps:['Entry event received','Welcome lights recalled','Sound & image selected'],link:'/services/av-lighting',label:'Explore personalized AV'},
  meeting: {kicker:'A MEETING SCENE IS SELECTED',title:'The room gets ready with you.',caption:'From arrival to the first idea.',steps:['Room scene requested','Display & audio prepared','Lighting shifts for the meeting'],link:'/services/av-lighting',label:'Explore coordinated rooms'},
  closing: {kicker:'AN APPROVED CLOSING COMMAND',title:'One routine. Fewer loose ends.',caption:'A considered end to the day.',steps:['Closing is confirmed','Lighting & AV settle','After-hours rules selected'],link:'/services/custom-automation',label:'Explore custom routines'}
};
const studio = $('.experience-studio');
if (studio) {
  let timers = [], current = 'arrival';
  const play = $('#replay-demo');
  play.hidden = false;
  function playSequence() {
    timers.forEach(clearTimeout); timers = [];
    studio.dataset.stage = '0';
    const steps = [...$('#demo-steps').children];
    steps.forEach(step => step.classList.remove('active'));
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    steps.forEach((step, i) => timers.push(setTimeout(() => { step.classList.add('active'); studio.dataset.stage = String(i + 1); }, reduced ? 0 : i * 850)));
    play.textContent = 'Replay sequence ↻';
  }
  function selectScene(id) {
    const scene = scenes[id]; current = id; studio.dataset.mode = id;
    document.querySelectorAll('[data-scene]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.scene === id)));
    $('#demo-kicker').textContent = scene.kicker;
    $('#demo-title').textContent = scene.title;
    $('#scene-caption').textContent = scene.caption;
    $('#demo-steps').innerHTML = scene.steps.map((text, i) => '<li><span>' + (i + 1) + '</span>' + text + '</li>').join('');
    $('#demo-link').href = scene.link;
    $('#demo-link').textContent = scene.label + ' ↗';
    playSequence();
  }
  document.querySelectorAll('[data-scene]').forEach(button => button.addEventListener('click', () => selectScene(button.dataset.scene)));
  play.addEventListener('click', playSequence);
  window.addEventListener('pagehide', () => timers.forEach(clearTimeout));
}

const finder = $('[data-finder]');
if (finder) {
  const input = $('#service-search'), clear = $('#clear-search');
  const cards = [...finder.querySelectorAll('[data-service]')];
  const normal = value => value.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  const stop = new Set(['a','an','the','and','with','for','i','my','want','to','when','someone','somebody','on','in','of','at','can','you','do','how','we','our','me','need','is']);
  const synonyms = { wifi:['wifi','wi fi','wireless'], wireless:['wifi','wireless'], lights:['lights','lighting'], light:['light','lighting'], music:['music','audio','sound'], speakers:['speaker','audio'], camera:['camera','cctv'], cameras:['camera','cctv'], arrives:['arrival','entry','welcome'], arrival:['arrival','entry','welcome'], tv:['tv','display','screen'], screens:['screen','display'], automations:['automation'], internet:['internet','network','wifi'] };
  let filter = 'all';
  const params = new URLSearchParams(location.search);
  if (params.has('q')) input.value = params.get('q').slice(0, 200);
  if (['home','business'].includes(params.get('space'))) filter = params.get('space');
  input.maxLength = 200;
  function update() {
    const tokens = [...new Set(normal(input.value).split(' ').filter(token => token && !stop.has(token)))];
    let count = 0;
    cards.forEach(card => {
      const text = normal(card.dataset.search);
      const match = tokens.every(token => (synonyms[token] || [token]).some(word => text.includes(word)));
      const visible = (filter === 'all' || card.dataset.audience.split(' ').includes(filter)) && match;
      card.hidden = !visible;
      if (visible) count++;
    });
    finder.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    $('#search-status').textContent = (input.value || filter !== 'all') ? count + ' matching service' + (count === 1 ? '' : 's') + (input.value ? ' for “' + input.value + '”' : '') : '6 ways to connect your space';
    $('#empty-search').hidden = count !== 0;
    clear.hidden = input.value.length === 0;
    const url = new URL(location.href);
    input.value ? url.searchParams.set('q', input.value) : url.searchParams.delete('q');
    filter === 'all' ? url.searchParams.delete('space') : url.searchParams.set('space', filter);
    history.replaceState(null, '', url);
  }
  input.addEventListener('input', update);
  clear.addEventListener('click', () => { input.value = ''; update(); input.focus(); });
  finder.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; update(); }));
  $('#reset-search').addEventListener('click', () => { filter = 'all'; input.value = ''; update(); input.focus(); });
  update();
}

const form = $('#brief-form');
if (form) {
  document.body.classList.add('brief-ready');
  const key = 'connected-spaces-brief';
  const getBrief = () => { const data = new FormData(form); return {space:data.get('space'),priorities:data.getAll('priority'),meeting:data.get('meeting'),notes:$('#project-notes').value}; };
  function briefHTML() {
    const b = getBrief();
    return '<span class="brief-type">' + esc(b.space) + '</span><h3>' + esc(b.meeting) + '</h3><ul>' + b.priorities.map(p => '<li>' + esc(p) + '</li>').join('') + '</ul>' + (b.notes ? '<h3>Your ideas & context</h3><p>' + esc(b.notes) + '</p>' : '');
  }
  function updateBrief() {
    const b = getBrief();
    $('#brief-preview').innerHTML = '<span class="brief-type">' + esc(b.space) + '</span>' + (b.priorities.length ? '<ul>' + b.priorities.map(p => '<li>' + esc(p) + '</li>').join('') + '</ul>' : '<p class="brief-empty">Choose the things you’d like to explore.</p>') + '<div class="brief-meeting">YOUR PREFERRED NEXT STEP<strong>' + esc(b.meeting) + '</strong></div>';
    $('#customer-print').innerHTML = '<h1>My connected space</h1>' + briefHTML() + '<p>Share this with your salesperson to arrange your walkthrough or guided call. Meeting not yet booked.</p>';
    try { localStorage.setItem(key, JSON.stringify(b)); $('#draft-status').textContent = 'Draft saved in this browser.'; } catch { $('#draft-status').textContent = 'Browser storage is unavailable. Download your brief to keep a copy.'; }
  }
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && typeof saved === 'object') {
      form.querySelectorAll('[name=space]').forEach(el => { if (el.value === saved.space) el.checked = true; });
      form.querySelectorAll('[name=meeting]').forEach(el => { if (el.value === saved.meeting) el.checked = true; });
      form.querySelectorAll('[name=priority]').forEach(el => el.checked = Array.isArray(saved.priorities) && saved.priorities.includes(el.value));
      $('#project-notes').value = typeof saved.notes === 'string' ? saved.notes.slice(0,6000) : '';
    }
  } catch {}
  const interestMap = {'home-automation':'Custom home or business automation','access-control-security':'Simpler access management','av-lighting':'Personalized sound, screens and lighting','network-design':'Reliable connectivity','business-integration':'Business-system integration','custom-automation':'Custom home or business automation'};
  const interest = interestMap[new URLSearchParams(location.search).get('interest')];
  if (interest) form.querySelectorAll('[name=priority]').forEach(el => { if (el.value === interest) el.checked = true; });
  form.querySelector('[type=submit]').disabled = false;
  form.addEventListener('input', updateBrief);
  form.addEventListener('submit', event => { event.preventDefault(); $('#finished-brief').innerHTML = briefHTML(); $('#brief-dialog').showModal(); });
  $('#close-brief').addEventListener('click', () => $('#brief-dialog').close());
  $('#print-brief').addEventListener('click', () => window.print());
  $('#save-brief').addEventListener('click', () => {
    const b = getBrief(), text = ['MY CONNECTED SPACE','',b.space,b.meeting,'',...b.priorities.map(p=>'• ' + p),'',b.notes,'','Share this brief with your salesperson to arrange a visit or guided demo. Meeting not yet booked.'].join('\n');
    const url = URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = 'my-walkthrough-brief.txt'; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url),3000);
  });
  updateBrief();
}

import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'signal-vector-labs-walkthrough-v1';
const spaces = ['Home', 'Office', 'Retail or hospitality', 'Warehouse or multi-site'];
const priorities = ['Entry and visitor experience', 'Camera views and useful alerts', 'Reliable Wi-Fi and business network', 'Sound, screens and lighting', 'Business-system connections', 'A custom home or business routine'];
const meetingOptions = ['On-site walkthrough', 'Guided call with a visual demo'];

export default function WalkthroughPlanner({ email }) {
  const [space, setSpace] = useState(spaces[0]);
  const [selected, setSelected] = useState([]);
  const [meeting, setMeeting] = useState(meetingOptions[0]);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    let draft;
    let stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
      const legacy = localStorage.getItem('connected-spaces-brief');
      draft = JSON.parse(stored || legacy || 'null');
    } catch { /* Keep the form usable when browser storage is disabled or invalid. */ }
    if (draft) {
      try {
      if (spaces.includes(draft.space)) setSpace(draft.space);
      else if (draft.space === 'Shop or hospitality') setSpace('Retail or hospitality');
      const oldPriorities = {
        'A better arrival experience': 'Entry and visitor experience',
        'Clearer visibility': 'Camera views and useful alerts',
        'Simpler access management': 'Entry and visitor experience',
        'Connected alerts and responses': 'Camera views and useful alerts',
        'Reliable connectivity': 'Reliable Wi-Fi and business network',
        'Personalized sound, screens and lighting': 'Sound, screens and lighting',
        'Business-system integration': 'Business-system connections',
        'Custom home or business automation': 'A custom home or business routine',
      };
      const savedPriorities = Array.isArray(draft.selected) ? draft.selected : draft.priorities;
      if (Array.isArray(savedPriorities)) setSelected(savedPriorities.map((x) => oldPriorities[x] || x).filter((x) => priorities.includes(x)));
      if (meetingOptions.includes(draft.meeting)) setMeeting(draft.meeting);
      else if (draft.meeting === 'Sales call and visual demo') setMeeting('Guided call with a visual demo');
      if (typeof draft.notes === 'string') setNotes(draft.notes.slice(0, 4000));
      setHasSaved(true);
      if (!stored) localStorage.removeItem('connected-spaces-brief');
      } catch { /* Ignore malformed saved fields. */ }
    }
    const interest = new URLSearchParams(window.location.search).get('interest');
    const interested = {
      'home-automation': 'A custom home or business routine',
      'access-control-security': 'Entry and visitor experience',
      'av-lighting': 'Sound, screens and lighting',
      'network-design': 'Reliable Wi-Fi and business network',
      'business-integration': 'Business-system connections',
      'custom-automation': 'A custom home or business routine',
    }[interest];
    if (interested) setSelected((current) => current.includes(interested) ? current : [...current, interested]);
  }, []);

  const brief = useMemo(() => [
    'Hello Signal Vector Labs,', '',
    'I would like to explore a systems integration project.',
    `Space: ${space}`, `Preferred next step: ${meeting}`,
    '', 'What I would like to explore:', ...(selected.length ? selected.map((item) => `• ${item}`) : ['• I would like help identifying the right starting point.']),
    '', 'Project details:', notes.trim() || 'I would like to discuss the space, existing systems and possible workflows.',
    '', 'Please contact me to arrange the walkthrough or guided visual demo.',
  ].join('\n'), [space, selected, meeting, notes]);
  const mailto = `mailto:${email}?subject=${encodeURIComponent('Plan a Signal Vector Labs walkthrough')}&body=${encodeURIComponent(brief)}`;

  function persist(next = { space, selected, meeting, notes }) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setSaved(true); setHasSaved(true); }
    catch { setSaved(false); }
  }
  useEffect(() => {
    const timer = setTimeout(() => persist({ space, selected, meeting, notes }), 220);
    return () => clearTimeout(timer);
  }, [space, selected, meeting, notes]);
  function togglePriority(item) { setSelected((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]); setSaved(false); }
  function downloadBrief() {
    const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'signal-vector-labs-walkthrough.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <div className="planner-layout">
    <form className="planner-form" onSubmit={(event) => event.preventDefault()}>
      <fieldset className="planner-step"><legend><span className="step-no">1</span>What kind of space are we planning for?</legend>
        <div className="choice-list">{spaces.map((item) => <label className="choice-label" key={item}><input type="radio" name="space" checked={space === item} onChange={() => { setSpace(item); setSaved(false); }} /><span>{item}</span></label>)}</div>
      </fieldset>
      <fieldset className="planner-step"><legend><span className="step-no">2</span>What would you like to improve?</legend>
        <div className="choice-list">{priorities.map((item) => <label className="choice-label" key={item}><input type="checkbox" checked={selected.includes(item)} onChange={() => togglePriority(item)} /><span>{item}</span></label>)}</div>
      </fieldset>
      <fieldset className="planner-step"><legend><span className="step-no">3</span>How should we explore the idea?</legend>
        <div className="choice-list">{meetingOptions.map((item) => <label className="choice-label" key={item}><input type="radio" name="meeting" checked={meeting === item} onChange={() => { setMeeting(item); setSaved(false); }} /><span>{item}</span></label>)}</div>
      </fieldset>
      <div className="planner-step"><label className="mb-3 block font-bold" htmlFor="project-notes">What should we know before we meet?</label>
        <textarea className="notes-control" id="project-notes" maxLength={4000} value={notes} onChange={(event) => { setNotes(event.target.value); setSaved(false); }} placeholder="Tell us about the rooms, equipment, network, business systems or routine you want to connect." />
        <p className="mt-2 text-xs text-slate-500">Optional. Keep sensitive passwords or private access details out of this form.</p>
      </div>
    </form>
    <aside className="planner-summary" aria-live="polite">
      <p className="eyebrow">YOUR CONVERSATION STARTER</p><h2>A useful first meeting.</h2>
      <div className="summary-list"><div className="summary-item"><small>SPACE</small><p>{space}</p></div><div className="summary-item"><small>WHAT TO EXPLORE</small><p>{selected.length ? selected.join(' · ') : 'Start with your idea and we will map the options.'}</p></div><div className="summary-item"><small>NEXT STEP</small><p>{meeting}</p></div></div>
      <div className="planner-actions"><a className="btn btn-primary" href={mailto}>Email this walkthrough request <span aria-hidden="true">→</span></a><button className="btn btn-white" type="button" onClick={downloadBrief}>Download a copy</button></div>
      <p className="planner-fine">{saved ? 'Draft saved in this browser.' : hasSaved ? 'Saving your updates…' : 'Your draft stays in this browser until you choose to share it.'} Email opens your own mail app. No meeting is booked automatically.</p>
    </aside>
  </div>;
}

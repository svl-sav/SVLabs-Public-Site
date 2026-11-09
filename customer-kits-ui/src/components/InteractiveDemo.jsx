import { useState } from 'react';

const demos = [
  { id: 'arrival', label: 'A person arrives', title: 'A more personal welcome', intro: 'One approved entry event can start a considered response across the space.', service: '/services/av-lighting', rows: [
    ['01', 'Entry event', 'An approved person arrives at the entrance', 'Access'], ['02', 'Automation rule', 'Check identity, time and current operating mode', 'Logic'], ['03', 'Coordinated response', 'Show the camera view and alert the right host', 'Security'], ['04', 'Personalized scene', 'Set lighting, play a selected sound or image', 'AV + lighting'],
  ] },
  { id: 'meeting', label: 'A meeting begins', title: 'The room is ready to work', intro: 'A simple control can prepare supported sound, display and lighting systems together.', service: '/services/av-lighting', rows: [
    ['01', 'Room control', 'A button or agreed calendar event starts the scene', 'Control'], ['02', 'Room conditions', 'Confirm the room is available and the scene is enabled', 'Logic'], ['03', 'AV setup', 'Select the display source and prepare meeting audio', 'AV'], ['04', 'Lighting', 'Recall the agreed presentation scene', 'Lighting'],
  ] },
  { id: 'closing', label: 'The business closes', title: 'Close with fewer loose ends', intro: 'A guided closing workflow can coordinate devices and show anything that needs attention.', service: '/services/custom-automation', rows: [
    ['01', 'Closing command', 'An authorized person starts the closing routine', 'Control'], ['02', 'Readiness check', 'Confirm the agreed rooms and devices are ready', 'Operations'], ['03', 'Set the building', 'Recall lighting, AV and after-hours rules', 'Systems'], ['04', 'Report exceptions', 'Surface actions that need a person to finish', 'Handoff'],
  ] },
];

export default function InteractiveDemo() {
  const [active, setActive] = useState(demos[0]);
  return <section className="demo-card" aria-label="Interactive integration examples">
    <div className="demo-topline"><small>SIGNAL VECTOR / WALKTHROUGH</small><span className="demo-status"><i /> Example mode</span></div>
    <div className="demo-tabs" role="group" aria-label="Choose an example workflow">
      {demos.map((demo) => <button key={demo.id} type="button" aria-pressed={active.id === demo.id} onClick={() => setActive(demo)}>{demo.label}</button>)}
    </div>
    <div className="demo-main" aria-live="polite">
      <p className="eyebrow">ONE EVENT. A CONNECTED RESPONSE.</p>
      <h2>{active.title}</h2><p>{active.intro}</p>
      <div className="demo-flow">
        {active.rows.map(([number, title, description, category]) => <div key={number + title} className="demo-flow-step">
          <span className="flow-index">{number}</span><span><strong>{title}</strong><small>{description}</small></span><span className="flow-arrow" aria-label={category}>→</span>
        </div>)}
      </div>
    </div>
    <div className="demo-card-note"><a href={active.service} className="font-bold text-blue hover:underline">See how we design this kind of integration →</a><br />Conceptual example. The exact behavior depends on equipment, available interfaces, permissions and project scope.</div>
  </section>;
}

import { useEffect, useState } from 'react';
import { room } from '../../visuals.mjs';

const scenarios = [
  {
    id: 'arrival',
    label: 'A visitor arrives',
    caption: 'A welcome, made personal.',
    kicker: 'WHEN AN APPROVED PERSON ARRIVES',
    title: 'A welcome that knows the moment.',
    intro: 'See how an entry event could connect access, cameras, lighting and AV in one considered response.',
    service: '/services/access-control-security',
    serviceLabel: 'Explore entry + camera integration',
    steps: [
      ['Entry event', 'An approved credential or agreed arrival event starts the flow.'],
      ['Check the context', 'The rule checks schedule, identity and the current operating mode.'],
      ['Bring the right view', 'The host gets a useful camera view and a timely notification.'],
      ['Set the welcome', 'Supported lighting, sound or display content creates the selected scene.'],
    ],
  },
  {
    id: 'meeting',
    label: 'A meeting starts',
    caption: 'The room is ready to work.',
    kicker: 'WHEN IT IS TIME TO MEET',
    title: 'The room gets ready with you.',
    intro: 'A room control or approved schedule can coordinate the display, meeting audio and lighting.',
    service: '/services/av-lighting',
    serviceLabel: 'Explore coordinated AV + lighting',
    steps: [
      ['Start the scene', 'A room control or approved schedule requests the meeting setup.'],
      ['Check availability', 'The workflow confirms the room and chosen scene are available.'],
      ['Prepare the room', 'Supported display, audio and lighting systems recall their settings.'],
      ['Keep people in control', 'Room controls stay available, with a clear way to end or adjust the scene.'],
    ],
  },
  {
    id: 'closing',
    label: 'The business closes',
    caption: 'A calmer end to the day.',
    kicker: 'WHEN THE TEAM CLOSES UP',
    title: 'One routine. Fewer loose ends.',
    intro: 'A guided close can apply after-hours settings and surface anything that needs a person to check.',
    service: '/services/custom-automation',
    serviceLabel: 'Explore custom business routines',
    steps: [
      ['Start the close', 'An authorized person starts the agreed closing routine.'],
      ['Check exceptions', 'The system shows any agreed room or device status that needs attention.'],
      ['Set after-hours mode', 'Supported lighting, AV and security scenes change to the selected mode.'],
      ['Hand off clearly', 'Staff can review exceptions and use manual controls when needed.'],
    ],
  },
];

const roomMarkup = room();

export default function InteractiveDemo() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const active = scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0];

  useEffect(() => {
    setActiveStep(0);
    setPlaying(false);
  }, [activeId]);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setTimeout(() => {
      if (activeStep >= active.steps.length - 1) setPlaying(false);
      else setActiveStep((step) => step + 1);
    }, 1150);
    return () => window.clearTimeout(timer);
  }, [active, activeStep, playing]);

  const toggleSequence = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (activeStep >= active.steps.length - 1) setActiveStep(0);
    setPlaying(true);
  };

  return <section
    className="demo-card"
    aria-label="Interactive example of connected home and business systems"
    data-mode={active.id}
    data-stage={activeStep + 1}
  >
    <div className="demo-topline">
      <div><small>SIGNAL VECTOR / WALKTHROUGH</small><span className="demo-topline-sub">One real-world moment, connected end to end</span></div>
      <span className="demo-status"><i /> Illustrative concept</span>
    </div>

    <div className="demo-scene" aria-label="Illustrated room showing connected systems">
      <div className="demo-room-art" dangerouslySetInnerHTML={{ __html: roomMarkup }} />
      <svg className="demo-signal-path" viewBox="0 0 760 510" aria-hidden="true">
        <path className="signal-line signal-line-a" d="M163 195 C218 188 270 131 334 119" />
        <path className="signal-line signal-line-b" d="M334 119 C393 124 434 166 465 190 S518 230 534 252" />
        <circle className="signal-point signal-point-entry" cx="163" cy="195" r="10" />
        <circle className="signal-point signal-point-network" cx="334" cy="119" r="10" />
        <circle className="signal-point signal-point-response" cx="534" cy="252" r="10" />
      </svg>
      <span className="scene-label scene-label-entry"><i />Entry</span>
      <span className="scene-label scene-label-network"><i />Network + logic</span>
      <span className="scene-label scene-label-response"><i />AV + lighting</span>
      <div className="scene-caption"><i /><span>{active.caption}</span></div>
    </div>

    <div className="demo-scenario-row">
      <div className="demo-scenario-label"><span>CHOOSE A MOMENT</span><span>See what could happen next</span></div>
      <div className="demo-tabs" role="group" aria-label="Choose an example scenario">
        {scenarios.map((scenario) => <button
          key={scenario.id}
          type="button"
          aria-pressed={active.id === scenario.id}
          onClick={() => setActiveId(scenario.id)}
        >{scenario.label}</button>)}
      </div>
    </div>

    <div className="demo-story" aria-live="polite">
      <div className="demo-story-heading">
        <div>
          <p className="eyebrow">{active.kicker}</p>
          <h2>{active.title}</h2>
          <p className="demo-intro">{active.intro}</p>
        </div>
        <button className="sequence-button" type="button" onClick={toggleSequence} aria-pressed={playing}>
          <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>{playing ? 'Pause steps' : 'Play steps'}
        </button>
      </div>

      <ol className="demo-timeline" aria-label="Example integration sequence">
        {active.steps.map(([title, detail], index) => <li key={title}>
          <button
            type="button"
            className="demo-step"
            aria-current={activeStep === index ? 'step' : undefined}
            onClick={() => { setActiveStep(index); setPlaying(false); }}
          >
            <span className="demo-step-index">0{index + 1}</span>
            <span className="demo-step-copy"><strong>{title}</strong><small>{detail}</small></span>
            {index < active.steps.length - 1 && <span className="demo-step-connector" aria-hidden="true" />}
          </button>
        </li>)}
      </ol>

      <div className="demo-story-footer">
        <a href={active.service}>{active.serviceLabel} <span aria-hidden="true">→</span></a>
        <span>People keep manual controls and clear override options.</span>
      </div>
    </div>

    <p className="demo-card-note">Illustrative possibilities. The final workflow depends on your equipment, interfaces, permissions and project scope.</p>
  </section>;
}

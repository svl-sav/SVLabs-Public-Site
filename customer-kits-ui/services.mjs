// Customer language and examples. These describe design possibilities, not bundled hardware promises.
export const companySummary = 'Network design, UniFi integration, AV and custom automation for homes and businesses.';
export const services = [
  {
    slug: 'home-automation', title: 'Home automation', icon: 'home', audience: ['home'],
    serviceName: 'Custom home automation',
    seoTitle: 'Custom Home Automation & Smart Home Integration',
    whoFor: 'Households that want simpler arrivals, evening routines and room controls.',
    connections: ['Lighting controls', 'Audio & displays', 'Entry events', 'Home network'],
    headline: 'Come home to your kind of comfortable.',
    description: 'Custom home automation for lighting, music, entry and everyday routines. Connect the devices you use into scenes that fit the way you live.',
    short: 'Lighting, music and everyday routines that respond together.',
    tags: 'house residential smart home morning night away shades scene routine comfort',
    intro: 'An arrival, a bedtime routine or a single button can bring several systems together. We design the sequence around your household, including what you still want to control yourself.',
    example: { name: 'The welcome-home scene', trigger: 'An approved arrival event', condition: 'The household is home and the scene is enabled', actions: ['Entry lighting shifts to an evening setting', 'A selected audio zone starts at a preset level', 'A wall display opens the chosen home view'], result: 'One arrival. A home that feels ready.' },
    scope: [
      ['Everyday scenes', 'Bring lighting, AV and supported controls into morning, evening, entertaining or away routines. Decide which rooms participate and what happens when you change a setting manually.'],
      ['Personalized arrivals', 'Use an agreed credential, device or other supported event to select a scene. Set the right times, rooms and volume so a welcome never becomes an interruption.'],
      ['Control that stays simple', 'Choose buttons, apps or touch interfaces around the people using them. Keep a clear way to pause a routine and operate essential functions directly.']
    ],
    questions: [
      ['Can you work with equipment I already own?', 'Yes, existing equipment is part of the discovery conversation. We check the exact models, available control interfaces and network access before defining what can be reused.'],
      ['Does a personalized arrival need facial recognition?', 'No. A credential or another supported event may be enough. We agree the identification method with you, including guest behavior and household preferences, before choosing equipment.'],
      ['What if my internet connection drops?', 'We identify which actions can run locally and which depend on an online service. The design should document the expected behavior during an outage and a practical manual fallback.']
    ],
    discovery: ['Your rooms and the routines you repeat', 'Existing lighting, AV and control models', 'Who uses the space, including guests', 'What should happen during an outage'],
    related: ['av-lighting', 'network-design', 'custom-automation']
  },
  {
    slug: 'access-control-security', title: 'Access & camera integration', icon: 'access', audience: ['home', 'business'],
    serviceName: 'UniFi access control & camera integration',
    seoTitle: 'UniFi Access Control & Camera Integration',
    whoFor: 'Homes and businesses coordinating visitors, entrances and security events.',
    connections: ['UniFi Access', 'UniFi Protect', 'Intercoms & door events', 'Alert destinations'],
    headline: 'Know what happened. Make the next step easier.',
    description: 'UniFi access control and camera integration with visitor entry, door events, relevant views and custom notification workflows for homes and businesses.',
    short: 'Connect visitor entry, door events, camera views and useful alerts.',
    tags: 'unifi ubiquiti protect access camera security door lock visitor badge intercom alarm cctv recording notification after hours',
    intro: 'A door event is more useful when the right person can see the context. We plan entry permissions, camera coverage and response workflows together, with attention to the physical doors and the people who use them.',
    example: { name: 'A visitor at the entrance', trigger: 'A visitor uses the entry station', condition: 'Route by opening hours and the assigned host', actions: ['Notify the person responsible for the entrance', 'Bring up the relevant camera or entry view', 'Let an authorized person choose the next action'], result: 'A clearer handoff from visitor to host.' },
    scope: [
      ['Entry & permissions', 'Map staff, residents, visitors and delivery needs to the entrances they use. Plan credentials, schedules, intercoms and the workflow for changing access.'],
      ['Camera coverage', 'Review viewing angles, low-light conditions, identification distances and recording needs. Use the scene and retention requirements to choose cameras and storage.'],
      ['Event-driven responses', 'Connect supported door, camera or alarm events to useful notifications and screen views. Define recipients, escalation and how repeated events are handled.']
    ],
    questions: [
      ['Can a door event bring up a camera?', 'That is a workflow we can scope. We first confirm that the selected entry and camera systems expose the needed events and that the destination display or app can show the relevant view.'],
      ['Will the design work with my existing doors?', 'Door construction, locks, exit hardware, power and cabling all affect the plan. A site walkthrough helps establish the hardware and installation scope before equipment is selected.'],
      ['Can alerts change after business hours?', 'Yes, time and operating mode can be part of a custom rule. We agree what is actionable, who receives it and what happens when an alert is not acknowledged.']
    ],
    discovery: ['Doors, access groups and visitor flow', 'Areas to see and recording expectations', 'Existing locks, cabling and camera equipment', 'Who should receive and act on events'],
    related: ['network-design', 'av-lighting', 'business-integration']
  },
  {
    slug: 'av-lighting', title: 'Sound, screens & lighting', icon: 'av', audience: ['home', 'business'],
    serviceName: 'AV & lighting integration',
    seoTitle: 'AV, Lighting & Personalized Arrival Integration',
    whoFor: 'Homes, meeting spaces and customer-facing rooms that need coordinated scenes.',
    connections: ['Audio zones', 'Displays & signage', 'Lighting controls', 'Approved arrival events'],
    headline: 'Make the whole room part of the experience.',
    description: 'Custom AV and lighting integration for personalized arrivals, multi-zone audio, display content, meeting spaces and coordinated home or business scenes.',
    short: 'Set the scene with coordinated audio, display content and lighting.',
    tags: 'av audio video music sound screen tv television display image images signage speakers lighting lights welcome person entry meeting conference',
    intro: 'The lights change, a chosen sound plays and the screen shows the right content. We connect those moments into a deliberate experience, from a familiar home arrival to a customer welcome or meeting-room routine.',
    example: { name: 'A personalized welcome', trigger: 'A supported event identifies an approved person', condition: 'The welcome is enabled for this person and time', actions: ['Play the selected sound in the arrival zone', 'Show the chosen image or message on a display', 'Recall the matching lighting scene'], result: 'Sound, image and atmosphere, coordinated.' },
    scope: [
      ['Audio by zone', 'Choose where sound belongs, how loud it starts and whether it interrupts existing audio. Plan control of supported amplifiers, players and speakers around the room.'],
      ['Screens with a purpose', 'Coordinate welcome imagery, signage, source selection or meeting content. Define who manages the content and which displays change for each event.'],
      ['Lighting scenes', 'Set brightness and supported lighting controls around arrivals, opening hours, presentations or evening routines. Preserve an obvious manual override.']
    ],
    questions: [
      ['Can a specific person trigger their own sound and image?', 'Yes, that is a custom workflow we design. The source event, identification method, audio system and display controls must support the connection. You choose who participates and what guests experience.'],
      ['Can this include my meeting room?', 'Yes. A room scene can coordinate supported displays, sources, audio and lighting. We map how people start a meeting and verify the equipment interfaces before defining a one-touch workflow.'],
      ['Who provides the media?', 'We agree content ownership, formats and update responsibilities during design. Bring example images, sounds or signage you want to use so the demonstration reflects your intended experience.']
    ],
    discovery: ['Rooms, audio zones and display locations', 'Your AV and lighting equipment models', 'Desired sounds, images and scenes', 'Volume limits, quiet hours and manual controls'],
    related: ['home-automation', 'access-control-security', 'custom-automation']
  },
  {
    slug: 'network-design', title: 'Network design & Wi-Fi', icon: 'network', audience: ['home', 'business'],
    serviceName: 'UniFi network design & Wi-Fi',
    seoTitle: 'UniFi Network Design & Wi-Fi for Home and Business',
    whoFor: 'Homes and businesses planning better coverage, connected devices or expansion.',
    connections: ['UniFi Network', 'Wi-Fi access points', 'Switches & PoE', 'Business applications'],
    headline: 'Give every connection a solid foundation.',
    description: 'UniFi network design for business and home: Wi-Fi coverage, switching, device segmentation, PoE planning and infrastructure for connected systems.',
    short: 'Plan Wi-Fi, wired connections and the systems that depend on them.',
    tags: 'wifi wi-fi wi fi wireless internet slow dead zones coverage network networking ubiquiti unifi business lan vlan poe switch access point cabling router',
    intro: 'Cameras, entry systems, AV and business devices all share the same foundation. We design the network around coverage, capacity and device roles, then plan the connections your automations need.',
    example: { name: 'A workplace ready for the day', trigger: 'Staff, guests and connected devices join the network', condition: 'Each device uses its intended network and permissions', actions: ['Place access points around real coverage needs', 'Separate guest traffic and operational devices', 'Allow the specific connections required by integrations'], result: 'Connectivity designed for the way you operate.' },
    scope: [
      ['Wi-Fi coverage & capacity', 'Review floor plans, materials, busy areas and the devices sharing each space. Plan access-point placement and verify coverage against how people actually use the building.'],
      ['Wired infrastructure', 'Map switches, uplinks, cable runs, rack space and power. Check port counts and PoE needs for cameras, access devices and access points, with room for the agreed expansion.'],
      ['Network integration', 'Separate device groups where appropriate and document which systems need to communicate. Consider business applications, remote access and the continuity requirements of connected workflows.']
    ],
    questions: [
      ['Can you improve Wi-Fi dead zones?', 'We start by reviewing layout, materials, access-point placement and the existing network. That identifies whether the solution needs different placement, additional wired access points or changes elsewhere in the infrastructure.'],
      ['Do you design business networks as well as homes?', 'Yes. The design can cover staff and guest connectivity, cameras, access, AV and business-system integrations. Capacity, separation and support needs are scoped to the site.'],
      ['Does every device need to be UniFi?', 'The network may support equipment from multiple vendors. We verify each device’s connectivity, power and access requirements; integrations also depend on the interfaces that the connected equipment exposes.']
    ],
    discovery: ['Floor plans, materials and problem areas', 'Internet service and existing network equipment', 'Device counts, cable routes and PoE needs', 'Business applications and expected growth'],
    related: ['access-control-security', 'business-integration', 'home-automation']
  },
  {
    slug: 'business-integration', title: 'Business-system integration', icon: 'business', audience: ['business'],
    serviceName: 'Business-system integration',
    seoTitle: 'Business-System Integration & Workflow Automation',
    whoFor: 'Teams connecting visitor handling, shared spaces and repeated operational tasks.',
    connections: ['Software APIs & webhooks', 'Building events', 'Team notifications', 'Operational displays'],
    headline: 'Connect the building to the work inside it.',
    description: 'Custom business-system integration linking supported entry events, displays, notifications and operational applications into practical workflows.',
    short: 'Turn building events into useful handoffs for your team.',
    tags: 'business office workflow integration crm booking scheduling app software api webhook staff team visitor notification dashboard handoff hospitality retail shop',
    intro: 'Your building and your business software should support the same process. We map the event, the information your team needs and the next action, then connect the systems that can support that handoff.',
    example: { name: 'An arrival becomes a useful handoff', trigger: 'A supported visitor check-in or entry event', condition: 'Match the event to a host or agreed team queue', actions: ['Pass approved event details to the connected system', 'Notify the responsible team through a supported channel', 'Update a display or workflow status when supported'], result: 'Less relaying the same information by hand.' },
    scope: [
      ['Operational handoffs', 'Map reception, visitor handling, shared spaces or opening routines. Define who owns each stage and what information helps them complete it.'],
      ['Application connections', 'Review APIs, webhooks and available interfaces for the software you use. Confirm permissions, licensing and the data each integration needs before setting the scope.'],
      ['Useful failure handling', 'Design for duplicate events, delayed responses and unavailable systems. Decide whether to retry, notify a person or leave the action for manual completion.']
    ],
    questions: [
      ['Can you connect to our CRM, booking or other business system?', 'We can assess it. Bring the product name, version and the workflow you want. Availability depends on its API or supported integration methods, account permissions and licensing.'],
      ['Can this reduce repeated manual work?', 'That is the goal of a well-chosen workflow. We identify the specific repeated steps and demonstrate the proposed handoff so you can judge its value before expanding the scope.'],
      ['What information needs to be shared?', 'Only the fields agreed for the workflow should be part of the design. We identify the source, destination, access permissions and ownership of that information during discovery.']
    ],
    discovery: ['The repeated process and the people involved', 'Software names, versions and integration access', 'What data is needed at each step', 'Who handles exceptions and future changes'],
    related: ['custom-automation', 'network-design', 'access-control-security']
  },
  {
    slug: 'custom-automation', title: 'Custom automation', icon: 'automation', audience: ['home', 'business'],
    serviceName: 'Custom automation for home & business',
    seoTitle: 'Custom Automation for Homes & Businesses',
    whoFor: 'Households and teams with a specific routine or an advanced workflow to build.',
    connections: ['Buttons & schedules', 'Supported sensors', 'UniFi events', 'Third-party systems'],
    headline: 'Tell us what should happen next.',
    description: 'Custom automations for homes and businesses, from simple routines to advanced event-driven workflows across UniFi and supported third-party systems.',
    short: 'Start with an idea. Build the triggers, rules and actions around it.',
    tags: 'custom advanced generic automation automations automate routine trigger sensor condition rule timer schedule button webhook api home business if then',
    intro: 'A sensor, a button, an arrival or a business event can become the starting point. We turn your idea into a clear sequence: what starts it, when it should run and how every connected system should respond.',
    example: { name: 'An after-hours routine', trigger: 'An approved closing command is issued', condition: 'The designated operator confirms the space is ready', actions: ['Recall the agreed lighting and AV settings', 'Switch supported notifications to the after-hours rules', 'Report actions that could not complete'], result: 'A repeatable closing routine with visible exceptions.' },
    scope: [
      ['Simple, useful routines', 'Start with one repeatable moment: a button, a schedule or a supported event. Choose the connected actions that remove unnecessary steps from the day.'],
      ['Advanced logic', 'Add conditions such as time, operating mode or device state. Scope delays, branching, repeated events and overrides so the workflow behaves predictably.'],
      ['A design you can verify', 'Define successful outcomes and exception cases before expanding the workflow. Demonstrate the behavior and agree what happens when a device or service is unavailable.']
    ],
    questions: [
      ['How should I describe an automation idea?', 'Use everyday language: “When this happens, and these conditions are true, I want these things to happen.” Include when it should not run and how you would stop or override it.'],
      ['Can we start small and add more later?', 'Yes. We can scope a first workflow and identify what future additions would depend on. The network, device interfaces and control approach should be considered before the first phase.'],
      ['Does buying UniFi equipment include these workflows?', 'Custom workflows are designed and scoped separately from the hardware foundation. The proposal should identify the equipment, integration work, dependencies and any ongoing services needed for your specific idea.']
    ],
    discovery: ['The event that should start the workflow', 'Conditions, exceptions and manual overrides', 'The exact devices and services involved', 'What a successful demonstration looks like'],
    related: ['home-automation', 'av-lighting', 'business-integration']
  }
];
export const publicPaths = ['/', '/services', ...services.map(s => '/services/' + s.slug), '/plan'];

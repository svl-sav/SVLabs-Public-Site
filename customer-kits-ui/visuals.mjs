const paths = {
  home: '<path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-8h6v8"/>',
  access: '<path d="M6 21V3h12v18M3 21h18M14 12h.01"/><path d="M9 3v18"/>',
  av: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4m-3-9 2 2 4-4"/>',
  network: '<path d="M3 8a15 15 0 0 1 18 0M6 12a10 10 0 0 1 12 0m-9 4a5 5 0 0 1 6 0"/><circle cx="12" cy="20" r="1"/>',
  business: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><path d="M14 6h4v5M6 14v4h5m4-13 3 1 1-3"/>',
  automation: '<path d="m13 2-9 12h7l-1 8 10-13h-7z"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  check: '<path d="m5 12 4 4L19 6"/>'
};
export function icon(name) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.automation) + '</svg>';
}
export function room() {
  return '<svg class="room-art" viewBox="0 0 760 510" role="img" aria-label="Illustrated connected space with an entry door, lighting, display, audio and wireless network">' +
  '<defs><linearGradient id="floor" x2="1" y2="1"><stop stop-color="#edf2f8"/><stop offset="1" stop-color="#dbe3ed"/></linearGradient><linearGradient id="window" x2="0" y2="1"><stop stop-color="#dbe3ed"/><stop offset="1" stop-color="#edf2f8"/></linearGradient><pattern id="grain" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M0 31h32" stroke="#b9c8dd" stroke-width=".5"/></pattern><filter id="shadow"><feGaussianBlur stdDeviation="13"/></filter></defs>' +
  '<ellipse cx="393" cy="421" rx="267" ry="37" fill="#203650" opacity=".12" filter="url(#shadow)"/>' +
  '<path d="m86 278 278-152 313 166-279 164Z" fill="#b9c8dd"/><path d="m86 266 278-154 313 168-279 163Z" fill="url(#floor)"/><path d="m86 266 278-154 313 168-279 163Z" fill="url(#grain)" opacity=".5"/>' +
  '<path d="M86 266V106L363 2v110Z" fill="#edf2f8"/><path d="M363 2 677 156v164L363 112Z" fill="#dbe3ed"/><path d="M363 2v110" stroke="#b9c8dd" stroke-width="2"/><path d="M86 106 363 2 677 156" stroke="#f6f8fc" stroke-width="7" fill="none"/>' +
  '<path d="m425 71 177 87v87l-177-98Z" fill="url(#window)" stroke="#f6f8fc" stroke-width="6"/><path d="m486 101 1 80m55-54v85" stroke="#f6f8fc" stroke-width="4"/>' +
  '<path d="M131 244V126l69-28v106Z" fill="#203650"/><path class="door-panel" d="M140 228V132l49-20v88Z" fill="#586a82"/><path d="M179 170v18" stroke="#edf2f8" stroke-width="3"/><rect x="212" y="154" width="8" height="17" rx="2" fill="#203650"/><circle class="device-led" cx="216" cy="160" r="2" fill="#dbe3ed"/>' +
  '<path class="light-beam" d="m235 63 16-6 76 245-172-8Z" fill="#ffe7ac" opacity=".0"/><path d="m230 61 35-13v7l-35 14Z" fill="#586a82"/><path class="lamp" d="m234 68 28-10" stroke="#edf2f8" stroke-width="4"/>' +
  '<path d="m400 130 90 47v62l-90-50Z" fill="#203650" stroke="#f6f8fc" stroke-width="4"/><path d="m410 146 70 36v40l-70-39Z" fill="#3d526f"/><path class="screen-art" d="m419 163 16 25 14-3 23 23-53-29Z" fill="#b9c8dd"/><path d="m424 164 32 17" stroke="#dbe3ed" stroke-width="2"/>' +
  '<path d="m508 229 14 8v33l-14-8Z" fill="#203650"/><ellipse cx="515" cy="250" rx="3" ry="7" fill="#6d7e96"/><g class="sound-waves" fill="none" stroke="#3d526f" stroke-width="2"><path d="M529 248q13 12 0 24M539 243q20 19 0 38"/></g>' +
  '<path d="m234 286 158-86 171 91-161 94Z" fill="#b9c8dd"/><path d="m248 288 145-78 155 83-147 84Z" fill="#dbe3ed"/>' +
  '<path d="m289 247 62-34 75 39-63 35Z" fill="#f6f8fc"/><path d="m289 247 74 40v28l-74-40Z" fill="#dbe3ed"/><path d="m363 287 63-35v29l-63 34Z" fill="#b9c8dd"/><path d="m309 242 43-23 56 30-42 24Z" fill="#edf2f8"/>' +
  '<path d="m419 306 75-43 65 35-76 45Z" fill="#586a82"/><path d="m419 306 64 37v27l-64-38Z" fill="#3d526f"/><path d="m483 343 76-45v28l-76 44Z" fill="#586a82"/><path d="m478 325 47-27 27 15-47 27Z" fill="#b9c8dd"/>' +
  '<path d="m273 324 46-25 41 21-46 27Z" fill="#f6f8fc"/><path d="M281 330v27m66-29v23m-33-8v31" stroke="#6d7e96" stroke-width="4"/><ellipse cx="316" cy="323" rx="9" ry="5" fill="#586a82"/>' +
  '<ellipse cx="597" cy="317" rx="19" ry="11" fill="#b9c8dd"/><path d="m581 309 4 24q13 14 25 0l4-24Z" fill="#edf2f8"/><ellipse cx="598" cy="309" rx="17" ry="9" fill="#b9c8dd"/><path d="M598 310v-58m0 29q-33-12-22-33 27 6 22 33m0 10q35-12 27-36-27 8-27 36m0-24q-20-33 0-49 20 22 0 49" fill="#586a82" stroke="#586a82" stroke-width="2"/>' +
  '<ellipse cx="334" cy="119" rx="16" ry="8" fill="#f6f8fc" stroke="#6d7e96"/><ellipse class="device-led" cx="334" cy="119" rx="7" ry="3" fill="#b9c8dd"/>' +
  '<g class="wifi-waves" fill="none" stroke="#586a82" stroke-width="1.5" opacity=".65"><ellipse cx="334" cy="119" rx="32" ry="16"/><ellipse cx="334" cy="119" rx="47" ry="23"/></g>' +
  '</svg>';
}

// Animal artwork for Omas Arche: hand-built SVGs in a chunky, round style with thick outlines.
// Every animal shares the same animation hooks:
//   .bob          the whole animal, breathes gently
//   .eyes-open    normal eyes, blink now and then
//   .eyes-happy   closed "^ ^" eyes, shown while the animal is happy
//   .wiggle-l/-r  ears or flippers, twitch from time to time
//   .wag          tail, sways
//   .glow         a soft light (the glow snail)
// Add the class "happy" to the wrapper for a short hop with happy eyes.
(() => {
  const INK = '#2d1b3d';
  const LINE = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;

  const eye = (x, y, rx = 6.5, ry = 8) => `
    <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${INK}"/>
    <circle cx="${x + rx * 0.35}" cy="${y - ry * 0.38}" r="${rx * 0.4}" fill="#fff"/>
    <circle cx="${x - rx * 0.3}" cy="${y + ry * 0.35}" r="${rx * 0.18}" fill="#fff"/>`;
  const eyes = (lx, rx, y, w, h) => `
    <g class="eyes-open"><g class="eye">${eye(lx, y, w, h)}</g><g class="eye">${eye(rx, y, w, h)}</g></g>
    <g class="eyes-happy" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round">
      <path d="M${lx - 6} ${y + 2} Q${lx} ${y - 6} ${lx + 6} ${y + 2}"/>
      <path d="M${rx - 6} ${y + 2} Q${rx} ${y - 6} ${rx + 6} ${y + 2}"/>
    </g>`;
  const blush = (lx, rx, y, color = '#ff8fab') =>
    `<ellipse cx="${lx}" cy="${y}" rx="6" ry="3.5" fill="${color}" opacity="0.75"/><ellipse cx="${rx}" cy="${y}" rx="6" ry="3.5" fill="${color}" opacity="0.75"/>`;
  const smile = (x, y) => `<path d="M${x - 5} ${y} Q${x - 2.5} ${y + 4} ${x} ${y} Q${x + 2.5} ${y + 4} ${x + 5} ${y}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`;
  const shadow = '<ellipse cx="60" cy="117" rx="32" ry="5" fill="rgba(0,0,0,0.22)"/>';

  const ART = {
    // Mondhase: a lavender-white rabbit with a crescent moon on its forehead
    hase: `
      ${shadow}
      <g class="bob">
        <circle class="wag" cx="88" cy="101" r="8" fill="#fbf9ff" ${LINE}/>
        <g class="wiggle-l">
          <ellipse cx="44" cy="30" rx="11" ry="26" transform="rotate(-12 44 30)" fill="#e9e3ff" ${LINE}/>
          <ellipse cx="44" cy="32" rx="5" ry="17" transform="rotate(-12 44 32)" fill="#ffb3c7"/>
        </g>
        <g class="wiggle-r">
          <ellipse cx="76" cy="30" rx="11" ry="26" transform="rotate(12 76 30)" fill="#e9e3ff" ${LINE}/>
          <ellipse cx="76" cy="32" rx="5" ry="17" transform="rotate(12 76 32)" fill="#ffb3c7"/>
        </g>
        <ellipse cx="60" cy="94" rx="30" ry="22" fill="#e9e3ff" ${LINE}/>
        <ellipse cx="60" cy="98" rx="17" ry="12" fill="#fbf9ff"/>
        <ellipse cx="46" cy="113" rx="10" ry="5.5" fill="#e9e3ff" ${LINE}/>
        <ellipse cx="74" cy="113" rx="10" ry="5.5" fill="#e9e3ff" ${LINE}/>
        <ellipse cx="60" cy="66" rx="32" ry="28" fill="#e9e3ff" ${LINE}/>
        <path d="M57 40 a8 8 0 1 0 9 11 a6 6 0 1 1 -9 -11z" fill="#ffd43b"/>
        ${eyes(47, 73, 66, 6.5, 8)}
        ${blush(38, 82, 77)}
        <path d="M57 73 L63 73 L60 77 Z" fill="#ff8fab" stroke="#ff8fab" stroke-width="2" stroke-linejoin="round"/>
        ${smile(60, 79)}
      </g>`,

    // Moosfuchs: a fox with moss instead of fur and a little sprout on its head
    fuchs: `
      ${shadow}
      <g class="bob">
        <g class="wag">
          <ellipse cx="95" cy="84" rx="14" ry="27" transform="rotate(35 95 84)" fill="#7bc96f" ${LINE}/>
          <ellipse cx="104" cy="66" rx="8" ry="10" transform="rotate(35 104 66)" fill="#fff3d6"/>
          <circle cx="92" cy="90" r="3.5" fill="#4f9a4a"/>
        </g>
        <g class="wiggle-l">
          <path d="M33 52 L37 17 L57 40 Z" fill="#7bc96f" ${LINE}/>
          <path d="M39 42 L41 27 L50 38 Z" fill="#ffcf9e"/>
        </g>
        <g class="wiggle-r">
          <path d="M87 52 L83 17 L63 40 Z" fill="#7bc96f" ${LINE}/>
          <path d="M81 42 L79 27 L70 38 Z" fill="#ffcf9e"/>
        </g>
        <ellipse cx="58" cy="96" rx="27" ry="20" fill="#7bc96f" ${LINE}/>
        <ellipse cx="58" cy="100" rx="15" ry="11" fill="#fff3d6"/>
        <circle cx="40" cy="92" r="4" fill="#4f9a4a"/>
        <ellipse cx="45" cy="113" rx="9" ry="5" fill="#7bc96f" ${LINE}/>
        <ellipse cx="71" cy="113" rx="9" ry="5" fill="#7bc96f" ${LINE}/>
        <ellipse cx="60" cy="63" rx="32" ry="26" fill="#7bc96f" ${LINE}/>
        <path d="M34 70 Q60 96 86 70 Q74 62 60 66 Q46 62 34 70 Z" fill="#fff3d6"/>
        <circle cx="47" cy="44" r="5" fill="#4f9a4a"/><circle cx="71" cy="42" r="4" fill="#4f9a4a"/><circle cx="60" cy="40" r="3" fill="#4f9a4a"/>
        <path d="M60 38 Q60 30 61 26" fill="none" ${LINE}/>
        <path d="M61 27 Q70 18 76 24 Q70 32 61 27 Z" fill="#a9e34b" ${LINE}/>
        ${eyes(47, 73, 61, 6, 7.5)}
        ${blush(39, 81, 72)}
        <ellipse cx="60" cy="71" rx="4.5" ry="3.5" fill="${INK}"/>
        ${smile(60, 76)}
      </g>`,

    // Glühschnecke: a mint snail whose spiral shell glows when it's happy
    schnecke: `
      <defs>
        <radialGradient id="snail-glow">
          <stop offset="0" stop-color="#ffe066" stop-opacity="0.85"/>
          <stop offset="1" stop-color="#ffe066" stop-opacity="0"/>
        </radialGradient>
      </defs>
      ${shadow}
      <circle class="glow" cx="74" cy="64" r="46" fill="url(#snail-glow)"/>
      <g class="bob">
        <rect x="14" y="88" width="94" height="24" rx="12" fill="#9be3d0" ${LINE}/>
        <circle cx="74" cy="64" r="28" fill="#ffd43b" ${LINE}/>
        <path d="M74 64 m-4 0 a4 4 0 1 1 8 0 a9 9 0 1 1 -18 0 a14 14 0 1 1 28 0 a19 19 0 1 1 -38 0"
          fill="none" stroke="#f08c00" stroke-width="4" stroke-linecap="round"/>
        <circle cx="84" cy="48" r="4" fill="#fff" opacity="0.7"/>
        <g class="wiggle-l">
          <path d="M28 70 L21 40" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
          <path d="M28 70 L21 40" fill="none" stroke="#9be3d0" stroke-width="4" stroke-linecap="round"/>
        </g>
        <g class="wiggle-r">
          <path d="M42 70 L46 40" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
          <path d="M42 70 L46 40" fill="none" stroke="#9be3d0" stroke-width="4" stroke-linecap="round"/>
        </g>
        <ellipse cx="35" cy="80" rx="20" ry="19" fill="#9be3d0" ${LINE}/>
        <circle cx="21" cy="37" r="9" fill="#9be3d0" ${LINE}/>
        <circle cx="46" cy="37" r="9" fill="#9be3d0" ${LINE}/>
        ${eyes(21, 46, 37, 5.5, 6.5)}
        ${blush(25, 45, 86)}
        ${smile(35, 85)}
      </g>`,

    // Frostpinguin: a penguin in an ice-blue striped scarf
    pinguin: `
      ${shadow}
      <g class="bob">
        <ellipse cx="48" cy="114" rx="10" ry="5" fill="#ffa94d" ${LINE}/>
        <ellipse cx="72" cy="114" rx="10" ry="5" fill="#ffa94d" ${LINE}/>
        <g class="wiggle-l"><ellipse cx="28" cy="80" rx="9" ry="20" transform="rotate(25 28 80)" fill="#33406b" ${LINE}/></g>
        <g class="wiggle-r"><ellipse cx="92" cy="80" rx="9" ry="20" transform="rotate(-25 92 80)" fill="#33406b" ${LINE}/></g>
        <ellipse cx="60" cy="72" rx="34" ry="42" fill="#33406b" ${LINE}/>
        <ellipse cx="60" cy="86" rx="23" ry="26" fill="#f4f8ff"/>
        <circle cx="49" cy="56" r="13" fill="#f4f8ff"/>
        <circle cx="71" cy="56" r="13" fill="#f4f8ff"/>
        <path d="M36 32 Q42 26 48 32 Q54 26 60 32" fill="none" stroke="#f4f8ff" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
        ${eyes(49, 71, 56, 5.5, 7)}
        ${blush(41, 79, 66)}
        <path d="M53 63 Q60 59 67 63 Q60 73 53 63 Z" fill="#ffa94d" ${LINE}/>
        <g>
          <path d="M30 88 Q60 100 90 88 L90 97 Q60 109 30 97 Z" fill="#7cc6f2" ${LINE}/>
          <path d="M76 98 L86 98 L84 116 L74 114 Z" fill="#7cc6f2" ${LINE}/>
          <path d="M44 93 L44 102 M60 96 L60 105 M76 93 L76 102" stroke="#f4f8ff" stroke-width="3"/>
        </g>
      </g>`,

    // Eisotter: a frosty otter holding a little ice crystal
    otter: `
      ${shadow}
      <g class="bob">
        <g class="wag"><ellipse cx="92" cy="106" rx="19" ry="7" transform="rotate(-20 92 106)" fill="#9bb7d4" ${LINE}/></g>
        <g class="wiggle-l"><circle cx="36" cy="42" r="8" fill="#9bb7d4" ${LINE}/><circle cx="36" cy="42" r="3.5" fill="#ffd6e0"/></g>
        <g class="wiggle-r"><circle cx="84" cy="42" r="8" fill="#9bb7d4" ${LINE}/><circle cx="84" cy="42" r="3.5" fill="#ffd6e0"/></g>
        <ellipse cx="60" cy="94" rx="28" ry="22" fill="#9bb7d4" ${LINE}/>
        <ellipse cx="60" cy="98" rx="17" ry="13" fill="#fff6e6"/>
        <ellipse cx="47" cy="114" rx="9" ry="5" fill="#9bb7d4" ${LINE}/>
        <ellipse cx="73" cy="114" rx="9" ry="5" fill="#9bb7d4" ${LINE}/>
        <path d="M60 88 L70 99 L60 111 L50 99 Z" fill="#c5ecff" ${LINE}/>
        <path d="M60 92 L60 101 M56.5 95.5 L60 92 L63.5 95.5" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <ellipse cx="50" cy="104" rx="7.5" ry="6" fill="#9bb7d4" ${LINE}/>
        <ellipse cx="70" cy="104" rx="7.5" ry="6" fill="#9bb7d4" ${LINE}/>
        <ellipse cx="60" cy="60" rx="31" ry="25" fill="#9bb7d4" ${LINE}/>
        <ellipse cx="60" cy="71" rx="16" ry="10" fill="#fff6e6"/>
        ${eyes(47, 73, 56, 6, 7.5)}
        ${blush(37, 83, 67)}
        <ellipse cx="60" cy="66" rx="5.5" ry="3.8" fill="${INK}"/>
        ${smile(60, 71)}
        <path d="M44 68 L32 66 M44 72 L33 74 M76 68 L88 66 M76 72 L87 74" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
      </g>`,
  };

  const STYLE = `
    .animal { display: inline-block; line-height: 0; cursor: pointer; }
    .animal svg { width: 100%; height: 100%; overflow: visible; }
    .animal .bob { transform-box: fill-box; transform-origin: 50% 100%; animation: animal-breathe 2.6s ease-in-out infinite; animation-delay: var(--d, 0s); }
    .animal .eye { transform-box: fill-box; transform-origin: 50% 50%; animation: animal-blink 4.2s infinite; animation-delay: var(--d, 0s); }
    .animal .wiggle-l, .animal .wiggle-r { transform-box: fill-box; transform-origin: 50% 100%; animation: animal-wiggle 5s ease-in-out infinite; animation-delay: var(--d, 0s); }
    .animal .wiggle-r { animation-delay: calc(var(--d, 0s) + 0.15s); }
    .animal .wag { transform-box: fill-box; transform-origin: 0% 100%; animation: animal-wag 1.8s ease-in-out infinite; animation-delay: var(--d, 0s); }
    .animal .glow { transform-box: fill-box; transform-origin: 50% 50%; animation: animal-glow 2.4s ease-in-out infinite; }
    .animal .eyes-happy { opacity: 0; }
    .animal.happy .eyes-open { opacity: 0; }
    .animal.happy .eyes-happy { opacity: 1; }
    .animal.happy .bob { animation: animal-hop 0.55s ease-out; }
    .animal.happy .glow { animation: animal-glow-burst 0.6s ease-out; }
    @keyframes animal-breathe { 50% { transform: scale(1.03, 0.97); } }
    @keyframes animal-blink { 0%, 93%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.1); } }
    @keyframes animal-wiggle { 0%, 80%, 100% { transform: rotate(0); } 85% { transform: rotate(-9deg); } 90% { transform: rotate(7deg); } 95% { transform: rotate(-3deg); } }
    @keyframes animal-wag { 50% { transform: rotate(-8deg); } }
    @keyframes animal-glow { 50% { opacity: 0.55; transform: scale(0.92); } }
    @keyframes animal-glow-burst { 40% { transform: scale(1.25); opacity: 1; } }
    @keyframes animal-hop {
      0% { transform: scale(1); } 25% { transform: translateY(0) scale(1.12, 0.86); }
      55% { transform: translateY(-14%) scale(0.92, 1.1); } 80% { transform: translateY(0) scale(1.06, 0.94); } 100% { transform: scale(1); }
    }
    @media (prefers-reduced-motion: reduce) {
      .animal .bob, .animal .eye, .animal .wiggle-l, .animal .wiggle-r, .animal .wag, .animal .glow { animation: none; }
    }`;

  let styled = false;
  function ensureStyle() {
    if (styled) return;
    const el = document.createElement('style');
    el.textContent = STYLE;
    document.head.appendChild(el);
    styled = true;
  }

  // Returns the markup for one animal; size is the rendered width and height in px.
  // A random delay keeps several animals on screen from blinking in sync.
  function html(id, size) {
    ensureStyle();
    const delay = (Math.random() * -4).toFixed(2);
    return `<span class="animal" data-animal="${id}" style="width:${size}px;height:${size}px;--d:${delay}s">` +
      `<svg viewBox="0 0 120 124" aria-hidden="true">${ART[id]}</svg></span>`;
  }

  // Makes an animal hop with happy eyes for a moment.
  function cheer(el) {
    el.classList.remove('happy');
    void el.getBoundingClientRect();
    el.classList.add('happy');
    clearTimeout(el._cheer);
    el._cheer = setTimeout(() => el.classList.remove('happy'), 700);
  }

  window.ArcheAnimals = { ids: Object.keys(ART), html, cheer };
})();

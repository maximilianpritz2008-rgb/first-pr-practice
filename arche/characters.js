// Character portraits for Omas Arche, in the same round, thick-outlined style as the animals.
// Each character has three moods: 'neutral', 'happy' and 'surprised'.
// Animation hooks: .bob (breathing), .eye (blinking), .glow (Funke's antenna light).
(() => {
  const INK = '#2d1b3d';
  const LINE = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
  const THIN = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;

  const HEAD = 'M50 96 Q50 42 100 42 Q150 42 150 96 Q150 140 100 156 Q50 140 50 96 Z';
  const torso = color => `<path d="M28 222 Q32 172 100 168 Q168 172 172 222 Z" fill="${color}" ${LINE}/>`;
  const neck = skin => `<rect x="86" y="138" width="28" height="36" rx="10" fill="${skin}" ${LINE}/>`;
  const ears = skin => `<ellipse cx="51" cy="106" rx="9" ry="13" fill="${skin}" ${LINE}/><ellipse cx="149" cy="106" rx="9" ry="13" fill="${skin}" ${LINE}/>`;
  const blush = `<ellipse cx="70" cy="125" rx="9" ry="5" fill="#ff9fb0" opacity="0.55"/><ellipse cx="130" cy="125" rx="9" ry="5" fill="#ff9fb0" opacity="0.55"/>`;
  const nose = `<path d="M100 111 Q104 119 98 122" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`;
  // Grandma's pendant: the key to the ark, worn by both player characters
  const pendant = `<path d="M84 170 Q100 196 116 170" fill="none" stroke="#e6b84a" stroke-width="2"/>
    <circle cx="100" cy="196" r="7" fill="#ffcf5a" ${THIN}/><circle cx="100" cy="196" r="3" fill="#3ec7b6"/>`;

  // Almond eyes: a large iris clipped by the eye shape, a heavy upper lash line and a soft lower lid.
  let eyeId = 0;
  function eyes(mood, iris, { lashes = false } = {}) {
    return [80, 120].map(x => {
      const y = 104, side = x < 100 ? -1 : 1;
      if (mood === 'happy') {
        return `<path d="M${x - 12} ${y + 2} Q${x} ${y - 9} ${x + 12} ${y + 2}" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>` +
          (lashes ? `<path d="M${x + side * 12} ${y + 2} l${side * 5} -4" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` : '');
      }
      const k = mood === 'surprised' ? 1.25 : 1;
      const id = `eye-clip-${++eyeId}`;
      // A full, rounded eye whose outer corner sits a little higher than the inner one.
      const top = `M${x - 13} ${y + 2} C${x - 11} ${y - 15 * k} ${x + 9} ${y - 16 * k} ${x + 13} ${y - 1 - side}`;
      const shape = `${top} C${x + 11} ${y + 10 * k} ${x - 9} ${y + 12 * k} ${x - 13} ${y + 2} Z`;
      const ir = mood === 'surprised' ? 8 : 10;
      return `<g class="eye">
        <clipPath id="${id}"><path d="${shape}"/></clipPath>
        <path d="${shape}" fill="#fff"/>
        <g clip-path="url(#${id})">
          <circle cx="${x + 0.5}" cy="${y + 1}" r="${ir}" fill="${iris}"/>
          <circle cx="${x + 0.5}" cy="${y + 4}" r="${ir * 0.75}" fill="rgba(255,255,255,0.18)"/>
          <circle cx="${x + 0.5}" cy="${y + 1}" r="${ir * 0.48}" fill="${INK}"/>
          <circle cx="${x + 3.5}" cy="${y - 3}" r="2.8" fill="#fff"/><circle cx="${x - 2.5}" cy="${y + 5}" r="1.3" fill="#fff"/>
        </g>
        <path d="${top}" fill="none" stroke="${INK}" stroke-width="${lashes ? 5 : 4}" stroke-linecap="round"/>
        ${lashes ? `<path d="M${x + side * 13} ${y - 1 - side} l${side * 6} -4 M${x + side * 9} ${y - 10 * k} l${side * 4} -5" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` : ''}
        <path d="M${x - 6} ${y + 9 * k} Q${x + 2} ${y + 10.5 * k} ${x + 9} ${y + 7 * k}" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round" opacity="0.5"/>
      </g>`;
    }).join('');
  }
  function brows(mood, color) {
    const lift = mood === 'surprised' ? -7 : mood === 'happy' ? -2 : 0;
    return [80, 120].map(x => {
      const side = x < 100 ? -1 : 1;
      return `<path d="M${x - side * 12} ${84 + lift} Q${x + side * 2} ${76 + lift} ${x + side * 13} ${82 + lift}" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>`;
    }).join('');
  }
  function mouth(mood) {
    if (mood === 'happy') return `<path d="M86 129 Q100 147 114 129 Z" fill="#8a2d3b" ${THIN}/><ellipse cx="100" cy="139" rx="6" ry="3" fill="#ff8fa0"/>`;
    if (mood === 'surprised') return `<ellipse cx="100" cy="134" rx="6" ry="8" fill="#8a2d3b" ${THIN}/>`;
    return `<path d="M92 131 Q100 137 108 131" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  }

  const ART = {
    // The player as a young woman: freckles, red-brown bob, a flower from the greenhouse, grandma's pilot jacket
    heldin(mood) {
      const skin = '#ffd9c0', hair = '#b5532f';
      return `
        <path d="M46 100 Q40 34 100 30 Q160 34 154 100 L158 164 Q146 174 134 162 L132 150 L68 150 L66 162 Q54 174 42 164 Z" fill="${hair}" ${LINE}/>
        ${torso('#2fa59a')}
        <path d="M80 170 L100 200 L120 170 Z" fill="#7a4a35" ${THIN}/>
        <path d="M70 174 L86 206 M130 174 L114 206" stroke="#1f7d74" stroke-width="4" stroke-linecap="round"/>
        ${neck(skin)}${pendant}${ears(skin)}
        <path d="M46 118 l0 10" stroke="#ffa94d" stroke-width="4" stroke-linecap="round"/><circle cx="46" cy="131" r="3" fill="#ffa94d"/>
        <path d="${HEAD}" fill="${skin}" ${LINE}/>
        ${blush}
        <g fill="#c97a5a"><circle cx="66" cy="118" r="1.5"/><circle cx="72" cy="122" r="1.5"/><circle cx="64" cy="124" r="1.5"/>
          <circle cx="134" cy="118" r="1.5"/><circle cx="128" cy="122" r="1.5"/><circle cx="136" cy="124" r="1.5"/></g>
        ${eyes(mood, '#8a5a2b', { lashes: true })}${brows(mood, '#7a3820')}${nose}${mouth(mood)}
        <path d="M48 104 Q40 40 96 32 Q156 30 154 100 Q150 80 140 70 Q132 60 118 56 Q96 70 70 74 Q56 82 48 104 Z" fill="${hair}" ${LINE}/>
        <path d="M118 56 Q108 46 92 40" fill="none" stroke="#7a3820" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M50 100 Q46 130 56 152 Q60 132 58 110 Z M150 100 Q156 130 144 152 Q140 132 142 110 Z" fill="${hair}" ${LINE}/>
        <path d="M66 52 Q80 42 98 40 M126 46 Q138 54 144 66" fill="none" stroke="#d9774b" stroke-width="4" stroke-linecap="round"/>
        <g ${THIN}>
          <ellipse cx="50" cy="66" rx="10" ry="5" transform="rotate(-35 50 66)" fill="#69db7c"/>
          <circle cx="58" cy="56" r="9" fill="#ffb36b"/><circle cx="70" cy="50" r="8" fill="#ffc38a"/><circle cx="66" cy="66" r="8" fill="#ffb36b"/>
        </g>
        <g fill="#f08c3a"><circle cx="58" cy="56" r="3"/><circle cx="70" cy="50" r="2.6"/><circle cx="66" cy="66" r="2.6"/></g>`;
    },

    // The player as a young man: tousled golden hair, amber eyes, dark sweater with a white collar
    held(mood) {
      const skin = '#f7cfae', hair = '#e3b55e';
      return `
        <path d="M48 100 Q44 38 100 32 Q156 38 152 100 L150 120 L50 120 Z" fill="${hair}" ${LINE}/>
        ${torso('#2b2b3a')}
        <path d="M60 196 Q100 206 140 196" fill="none" stroke="#3d3d52" stroke-width="3"/>
        ${neck(skin)}
        <path d="M84 168 L100 184 L90 194 Z M116 168 L100 184 L110 194 Z" fill="#f4f4f8" ${THIN}/>
        ${pendant}${ears(skin)}
        <path d="${HEAD}" fill="${skin}" ${LINE}/>
        ${blush}
        ${eyes(mood, '#d98a2b')}${brows(mood, '#a5752a')}${nose}${mouth(mood)}
        <path d="M46 104 Q38 48 76 36 Q100 24 126 34 Q160 46 154 104 Q150 86 142 78 Q142 94 130 98 Q130 82 118 72 Q116 90 102 94 Q102 78 90 72 Q84 90 70 94 Q74 80 66 76 Q56 86 46 104 Z" fill="${hair}" ${LINE}/>
        <path d="M90 34 Q88 22 100 20 Q98 28 106 32" fill="${hair}" ${LINE}/>
        <path d="M70 50 Q84 40 102 40 M116 42 Q132 46 142 58 M92 60 Q96 70 92 78" fill="none" stroke="#f6d98f" stroke-width="4" stroke-linecap="round"/>`;
    },

    // Grandma Hilde: big round glasses, grey bun, lavender scarf
    oma(mood) {
      const skin = '#f6d0bb', hair = '#d7d4e3';
      return `
        <circle cx="100" cy="36" r="22" fill="${hair}" ${LINE}/>
        <path d="M86 30 Q100 22 114 30" fill="none" stroke="#f3f1f8" stroke-width="3.5" stroke-linecap="round"/>
        ${torso('#7d86b8')}
        ${neck(skin)}${ears(skin)}
        <path d="${HEAD}" fill="${skin}" ${LINE}/>
        <path d="M68 166 Q100 184 132 166 L136 182 Q100 202 64 182 Z" fill="#a99bd6" ${LINE}/>
        <path d="M118 180 L128 210 L114 212 Z" fill="#a99bd6" ${LINE}/>
        ${blush}
        <path d="M52 100 l-6 -3 M52 106 l-7 1 M148 100 l6 -3 M148 106 l7 1" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
        <path d="M80 138 Q76 132 78 126 M120 138 Q124 132 122 126" fill="none" stroke="#d9a58c" stroke-width="2.5" stroke-linecap="round"/>
        ${eyes(mood, '#6b7fae')}${brows(mood, '#a8a3bd')}${nose}${mouth(mood)}
        <g fill="rgba(255,255,255,0.16)" stroke="${INK}" stroke-width="4.5">
          <circle cx="78" cy="104" r="22"/><circle cx="122" cy="104" r="22"/>
        </g>
        <path d="M98 100 Q100 96 102 100 M56 102 L50 100 M144 102 L150 100" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
        <path d="M66 92 Q72 86 80 86" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
        <path d="M50 98 Q44 44 100 40 Q156 44 150 98 Q144 68 124 60 Q100 74 76 60 Q56 68 50 98 Z" fill="${hair}" ${LINE}/>
        <path d="M66 58 Q80 48 96 50 M110 50 Q126 50 136 60" fill="none" stroke="#f3f1f8" stroke-width="3.5" stroke-linecap="round"/>`;
    },

    // Funke, the ship's engineer: a rusty work suit and a helmet he never takes off.
    // His face is two glowing lights behind the visor, which change with his mood.
    funke(mood) {
      const rust = '#c46a2c', dark = '#8a4520', glow = '#3ef0d5';
      let lights;
      if (mood === 'happy') {
        lights = `<path d="M74 110 Q85 98 96 110 M104 110 Q115 98 126 110" fill="none" stroke="${glow}" stroke-width="6" stroke-linecap="round" filter="url(#funke-glow)"/>`;
      } else if (mood === 'surprised') {
        lights = `<circle cx="85" cy="105" r="8" fill="${glow}" filter="url(#funke-glow)"/><circle cx="115" cy="105" r="8" fill="${glow}" filter="url(#funke-glow)"/>`;
      } else {
        lights = `<g class="eye"><rect x="74" y="101" width="22" height="9" rx="4.5" fill="${glow}" filter="url(#funke-glow)"/>
          <rect x="104" y="101" width="22" height="9" rx="4.5" fill="${glow}" filter="url(#funke-glow)"/></g>`;
      }
      return `
        <defs>
          <filter id="funke-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        ${torso(rust)}
        <path d="M58 190 L142 190 M62 204 L138 204" stroke="${dark}" stroke-width="4" stroke-linecap="round"/>
        <rect x="88" y="178" width="24" height="10" rx="4" fill="${glow}" filter="url(#funke-glow)"/>
        <ellipse cx="44" cy="190" rx="26" ry="17" fill="${rust}" ${LINE}/>
        <ellipse cx="156" cy="190" rx="26" ry="17" fill="${rust}" ${LINE}/>
        <path d="M30 186 Q44 178 58 186 M142 186 Q156 178 170 186" fill="none" stroke="${dark}" stroke-width="3"/>
        <ellipse cx="100" cy="164" rx="34" ry="10" fill="#4a3a3a" ${LINE}/>
        <path d="M128 44 L140 20" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
        <circle class="glow" cx="141" cy="18" r="6" fill="${glow}" filter="url(#funke-glow)"/>
        <path d="M46 108 Q44 36 100 34 Q156 36 154 108 Q154 150 100 158 Q46 150 46 108 Z" fill="${rust}" ${LINE}/>
        <path d="M60 62 Q100 46 140 62" fill="none" stroke="${dark}" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="70" cy="74" r="5" fill="${dark}" opacity="0.45"/><circle cx="134" cy="138" r="6" fill="${dark}" opacity="0.4"/>
        <g fill="#ffd8a8"><circle cx="56" cy="90" r="2.5"/><circle cx="144" cy="90" r="2.5"/><circle cx="62" cy="130" r="2.5"/><circle cx="138" cy="130" r="2.5"/></g>
        <circle cx="47" cy="110" r="7" fill="${dark}" ${THIN}/><circle cx="153" cy="110" r="7" fill="${dark}" ${THIN}/>
        <rect x="62" y="82" width="76" height="44" rx="21" fill="#1a1430" ${LINE}/>
        <path d="M70 90 Q78 86 88 87" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity="0.35"/>
        ${lights}
        <path d="M88 138 L112 138 M90 145 L110 145" stroke="${dark}" stroke-width="3.5" stroke-linecap="round"/>`;
    },
  };

  const NAMES = { heldin: 'Du', held: 'Du', oma: 'Oma Hilde', funke: 'Funke' };

  const STYLE = `
    .portrait { display: inline-block; line-height: 0; }
    .portrait svg { width: 100%; height: 100%; overflow: visible; }
    .portrait .bob { transform-box: fill-box; transform-origin: 50% 100%; animation: portrait-breathe 3.2s ease-in-out infinite; animation-delay: var(--d, 0s); }
    .portrait .eye { transform-box: fill-box; transform-origin: 50% 50%; animation: portrait-blink 4.6s infinite; animation-delay: var(--d, 0s); }
    .portrait .glow { animation: portrait-glow 1.6s ease-in-out infinite; }
    .portrait.pop .bob { animation: portrait-pop 0.4s ease-out; }
    @keyframes portrait-breathe { 50% { transform: scale(1.012, 0.99); } }
    @keyframes portrait-blink { 0%, 94%, 100% { transform: scaleY(1); } 97% { transform: scaleY(0.1); } }
    @keyframes portrait-glow { 50% { opacity: 0.35; } }
    @keyframes portrait-pop { 40% { transform: translateY(-4%) scale(1.03); } }
    @media (prefers-reduced-motion: reduce) { .portrait .bob, .portrait .eye, .portrait .glow { animation: none; } }`;

  let styled = false;
  function ensureStyle() {
    if (styled) return;
    const el = document.createElement('style');
    el.textContent = STYLE;
    document.head.appendChild(el);
    styled = true;
  }

  // Markup for one portrait. size is the rendered width in px (the height follows the 200:222 frame).
  function html(id, mood = 'neutral', size = 120) {
    ensureStyle();
    const delay = (Math.random() * -4).toFixed(2);
    return `<span class="portrait" data-character="${id}" style="width:${size}px;height:${Math.round(size * 1.11)}px;--d:${delay}s">` +
      `<svg viewBox="0 0 200 222" aria-hidden="true"><g class="bob">${ART[id](mood)}</g></svg></span>`;
  }

  window.ArcheCharacters = { ids: Object.keys(ART), moods: ['neutral', 'happy', 'surprised'], names: NAMES, html };
})();

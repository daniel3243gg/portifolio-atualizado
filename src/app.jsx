const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ---------------- Toast hook ---------------- */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const push = (msg) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };
  const node = (
    <div style={{ position:'fixed', top: 60, right: 30, zIndex: 9999, display:'flex', flexDirection:'column', gap: 8 }}>
      {toasts.map(t => <div key={t.id} className="toast">▸ {t.msg}</div>)}
    </div>
  );
  return [push, node];
}

/* ---------------- Sound control ---------------- */
function SoundControl() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(() => localStorage.getItem('bgm_muted') === '1');
  const [vol, setVol]     = useState(() => parseFloat(localStorage.getItem('bgm_vol') ?? '0.45'));
  const [showVol, setShowVol] = useState(false);

  // Lazily create the <audio> once
  useEffect(() => {
    let a = document.getElementById('__bgm');
    if (!a) {
      a = document.createElement('audio');
      a.id = '__bgm';
      a.src = 'assets/audio/bgm.mp3';
      a.loop = true;
      a.preload = 'auto';
      document.body.appendChild(a);
    }
    audioRef.current = a;
    a.volume = vol;
    a.muted = muted;
    const tryPlay = () => { a.play().catch(() => {}); };
    tryPlay();
    // Start on first user interaction if blocked
    const onFirst = () => { tryPlay(); window.removeEventListener('keydown', onFirst); window.removeEventListener('click', onFirst); };
    window.addEventListener('keydown', onFirst);
    window.addEventListener('click', onFirst);
    return () => {
      window.removeEventListener('keydown', onFirst);
      window.removeEventListener('click', onFirst);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
    localStorage.setItem('bgm_muted', muted ? '1' : '0');
  }, [muted]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = vol;
    localStorage.setItem('bgm_vol', String(vol));
  }, [vol]);

  return (
    <div
      className="sound-ctrl"
      onMouseEnter={() => setShowVol(true)}
      onMouseLeave={() => setShowVol(false)}
    >
      <button
        className={"sound-btn " + (muted ? 'muted' : '')}
        onClick={() => setMuted(m => !m)}
        title={muted ? 'Ativar som' : 'Silenciar'}
        aria-label="Toggle sound"
      >
        {muted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        )}
      </button>
      <span className="sound-label">{muted ? 'MUTED' : 'BGM'}</span>
      {!muted && (
        <div className="vol-bars" aria-hidden="true">
          <i className={vol > 0.05 ? 'on' : ''}></i>
          <i className={vol > 0.25 ? 'on' : ''}></i>
          <i className={vol > 0.45 ? 'on' : ''}></i>
          <i className={vol > 0.65 ? 'on' : ''}></i>
          <i className={vol > 0.85 ? 'on' : ''}></i>
        </div>
      )}
      <div className={"vol-pop " + (showVol ? 'open' : '')}>
        <input
          type="range" min="0" max="1" step="0.01"
          value={vol}
          onChange={(e) => { setVol(parseFloat(e.target.value)); if (muted) setMuted(false); }}
        />
      </div>
    </div>
  );
}

/* ---------------- HUD shell ---------------- */
function HUDShell({ screen, level, gold = 1234, achievements = 0 }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const tStr = time.toLocaleTimeString('pt-BR', { hour12: false });
  const dStr = time.toLocaleDateString('pt-BR');
  return (
    <div className="hud">
      <div className="hud-top">
        <div className="hud-cluster">
          <span className="hud-dot"></span>
          <span>CYBERDECK OS v2.7.4</span>
          <span style={{color:'var(--text-mute)'}}>·</span>
          <span>NODE: {screen.toUpperCase()}</span>
        </div>
        <div className="hud-cluster">
          <span style={{color:'var(--text-mute)'}}>USR://</span>
          <span style={{color:'var(--cyan)'}}>daniel3243gg</span>
          <span style={{color:'var(--text-mute)'}}>·</span>
          <span>LV {level}</span>
        </div>
        <div className="hud-cluster">
          <span style={{color:'var(--magenta)'}}>◆</span>
          <span>{achievements} CONQUISTAS</span>
          <span style={{color:'var(--text-mute)'}}>·</span>
          <span style={{color:'var(--yellow)'}}>₡ {gold.toLocaleString('pt-BR')}</span>
          <SoundControl />
        </div>
      </div>
      <div className="hud-corner tl"></div>
      <div className="hud-corner tr"></div>
      <div className="hud-corner bl"></div>
      <div className="hud-corner br"></div>
      <div className="hud-bottom">
        <div className="hud-cluster">
          <span className="hud-dot cy"></span>
          <span>SIGNAL · 5G NEURAL</span>
        </div>
        <div className="hud-cluster">
          <span style={{color:'var(--text-mute)'}}>[ ESC ]</span> VOLTAR
          <span style={{color:'var(--text-mute)'}}>· [ ⌘K / / ]</span> COMANDOS
          <span style={{color:'var(--text-mute)'}}>· [ ↑↓←→ ]</span> NAVEGAR
        </div>
        <div className="hud-cluster">
          <span>{dStr}</span>
          <span style={{color:'var(--text-mute)'}}>·</span>
          <span style={{color:'var(--green)'}}>{tStr}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Boot screen ---------------- */
function BootScreen({ onDone }) {
  const lines = useMemo(() => [
    { txt: '[ NEURAL-LINK ] establishing handshake...', cls: 'cy' },
    { txt: '[ OK ] cyberdeck/kernel v2.7.4 loaded', cls: 'ok' },
    { txt: '[ OK ] decrypting credentials/ user_token.bin', cls: 'ok' },
    { txt: '[ OK ] mounting /home/daniel3243gg ........... 100%', cls: 'ok' },
    { txt: '[ WARN ] 3 background processes hogging RAM', cls: 'warn' },
    { txt: '> loading skill_tree.dll ............. [ OK ]', cls: '' },
    { txt: '> loading quest_log.db .............. [ OK ]', cls: '' },
    { txt: '> loading journey.bin ............... [ OK ]', cls: '' },
    { txt: '> spawning user profile ............. [ OK ]', cls: 'mg' },
    { txt: '[ READY ] welcome back, runner.', cls: 'ok' },
  ], []);

  const [shown, setShown] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (shown >= lines.length) { setTimeout(() => setReady(true), 400); return; }
    const t = setTimeout(() => setShown((s) => s + 1), 240);
    return () => clearTimeout(t);
  }, [shown, lines.length]);

  useEffect(() => {
    if (!ready) return;
    const handler = (e) => { e.preventDefault(); onDone(); };
    window.addEventListener('keydown', handler);
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('click', handler);
    };
  }, [ready, onDone]);

  return (
    <div className="boot">
      <div className="boot-terminal">
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} className="line"><span className={l.cls}>{l.txt}</span></div>
        ))}
        {shown < lines.length && <div className="line"><span className="caret"></span></div>}
      </div>
      {ready && (
        <div className="fade-in" style={{ textAlign: 'center' }}>
          <div className="boot-logo glitch-jitter">CYBERDECK</div>
          <div className="boot-sub">DANIEL FELICIANO · PORTFOLIO OS</div>
          <div className="press-key">▸ press any key to jack in ◂</div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Character Select ---------------- */
function CharacterSelect({ onEnter }) {
  const d = window.DATA;
  const [titleIdx, setTitleIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTitleIdx((i) => (i + 1) % d.identity.titles.length), 2400);
    return () => clearInterval(t);
  }, [d.identity.titles.length]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Enter' || e.key === ' ') onEnter(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onEnter]);

  return (
    <div className="screen fade-in">
      <div className="screen-title">
        <span className="num">00</span>
        <h1>Character <span className="glow-mg">Select</span></h1>
        <span className="crumb">/ initial / one_choice_only</span>
      </div>

      <div className="charsel">
        <div>
          <div className="char-portrait">
            <img src="assets/img/daniel.png" alt={d.identity.name} />
            <div className="char-id-badge">
              <span>OPERATOR ID</span>
              <strong>{d.identity.handle}</strong>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.2em', color: 'var(--text-mute)' }}>
            <span>▣ 1 / 1</span>
            <span>RESIDENCE :: {d.identity.location}</span>
          </div>
        </div>

        <div className="char-info">
          <div>
            <span className="label-tag">▸ DOSSIER · CLASSIFIED</span>
            <div className="char-class" style={{marginTop: 14}}>
              <h2>{d.identity.name}</h2>
              <span className="lv">LV.{d.identity.level}</span>
            </div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize: 14, color:'var(--magenta)', letterSpacing:'.15em', marginTop: 6, minHeight: '1.4em' }}>
              ▸ {d.identity.titles[titleIdx]}<span className="caret"></span>
            </div>
          </div>

          <p className="char-bio">{d.identity.bio}</p>

          <div className="panel" style={{ padding: 18 }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--cyan)', marginBottom: 12 }}>▸ ATTRIBUTES</div>
            <div className="stats-grid">
              {Object.entries(d.stats).map(([k, v]) => (
                <div className="stat-cell" key={k}>
                  <div className="lbl">{k}</div>
                  <div className="val">{v}</div>
                  <div className="bar"><i style={{width: v + '%'}}></i></div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel panel-mg" style={{ padding: 18 }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--magenta)', marginBottom: 12 }}>▸ VITALS</div>
            <div className="vitals">
              {d.vitals.map(v => (
                <div className="vital-row" key={v.k}>
                  <span style={{color: v.cls === 'hp' ? 'var(--green)' : v.cls === 'mp' ? 'var(--cyan)' : 'var(--yellow)'}}>{v.k}</span>
                  <div className={"vital-bar " + v.cls}><i style={{width: v.value + '%'}}></i></div>
                  <span style={{color:'var(--text)'}}>{v.value} / 100</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:'flex', gap: 12, flexWrap: 'wrap', marginTop: 6 }}>
            <button className="btn-cyber" onClick={onEnter}>▸ Enter the Net &nbsp;[ Enter ]</button>
            <button className="btn-cyber mg" onClick={() => window.dispatchEvent(new CustomEvent('open-cmd'))}>▸ Commands &nbsp;[ / ]</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Hub ---------------- */
function Hub({ goTo }) {
  const d = window.DATA;
  const [focus, setFocus] = useState(0);
  const areas = d.hubAreas;

  useEffect(() => {
    const h = (e) => {
      if (window.__modalOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); setFocus((i) => (i + 1) % areas.length); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')    { e.preventDefault(); setFocus((i) => (i - 1 + areas.length) % areas.length); }
      if (e.key === 'Enter' || e.key === ' ')              { e.preventDefault(); goTo(areas[focus].id); }
      const n = parseInt(e.key, 10);
      if (!isNaN(n) && n >= 1 && n <= areas.length) { setFocus(n - 1); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [focus, areas, goTo]);

  return (
    <div className="screen fade-in">
      <div className="screen-title">
        <span className="num">00</span>
        <h1>Main <span className="glow-cy">Hub</span></h1>
        <span className="crumb">/ cyberdeck / hub_main</span>
      </div>

      <div className="hub">
        <div className="hub-header">
          <div className="hub-greeting">
            ▸ Welcome back, <span className="name">{d.identity.name.split(' ')[0]}</span>
          </div>
          <span className="label-tag mg">▸ ALL SYSTEMS OPERATIONAL</span>
        </div>

        <div className="hub-stats">
          <div className="hub-stat">
            <div className="lbl">Class Level</div>
            <div className="val">{d.identity.level}</div>
          </div>
          <div className="hub-stat mg">
            <div className="lbl">Quests Done</div>
            <div className="val">{d.quests.filter(q => q.status === 'done').length} / {d.quests.length}</div>
          </div>
          <div className="hub-stat yl">
            <div className="lbl">Skills Mastered</div>
            <div className="val">{d.skillTree.nodes.length}</div>
          </div>
          <div className="hub-stat gn">
            <div className="lbl">Years Coding</div>
            <div className="val">3+</div>
          </div>
        </div>

        <div className="hub-grid">
          {areas.map((a, i) => (
            <button
              key={a.id}
              className={`area-card ${a.color} ${i === focus ? 'active' : ''}`}
              onMouseEnter={() => setFocus(i)}
              onClick={() => goTo(a.id)}
            >
              <div className="area-num">{a.num}</div>
              <div className="area-icon">{areaIcon(a.icon)}</div>
              <div>
                <div className="area-tag">{a.tag}</div>
                <h3>{a.title}</h3>
              </div>
              <div className="area-sub">{a.sub}</div>
              <div className="area-cta">{a.cta} &nbsp; <span style={{opacity:.6}}>[{i+1}]</span></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function areaIcon(name) {
  if (name === 'skills') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="4" r="2"/><circle cx="4" cy="14" r="2"/><circle cx="20" cy="14" r="2"/><circle cx="12" cy="20" r="2"/>
      <path d="M12 6v6m-7 4l5-2m9 2l-5-2m-2 4v-2"/>
    </svg>
  );
  if (name === 'quests') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16v3l-2 2v9l-6 4-6-4V9L4 7z"/><path d="M9 12l2 2 4-4"/>
    </svg>
  );
  if (name === 'jornada') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M6 8v8l6-4 6 4V8"/>
    </svg>
  );
  if (name === 'contato') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="6" width="18" height="12" rx="1"/><path d="M3 8l9 6 9-6"/>
    </svg>
  );
  if (name === 'hack') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="14" rx="1"/>
      <path d="M6 9l3 2-3 2M11 13h5"/>
      <path d="M9 21h6"/>
    </svg>
  );
  return null;
}

/* ---------------- Back button ---------------- */
function BackBar({ goTo }) {
  return (
    <div className="screen-actions">
      <button className="btn-cyber" onClick={() => goTo('hub')}>◂ Back to Hub &nbsp;[ Esc ]</button>
    </div>
  );
}

/* expose */
Object.assign(window, { useToast, HUDShell, BootScreen, CharacterSelect, Hub, BackBar });

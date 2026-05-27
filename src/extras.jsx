function CommandPalette({ open, close, goTo, openMinigame, openHack }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);

  const cmds = useMemo(() => [
    { id:'hub',     label:'▸ Go to Main Hub',       hint:'NAV',  kbd:'0', action: () => goTo('hub') },
    { id:'skills',  label:'▸ Skill Tree',           hint:'AREA', kbd:'1', action: () => goTo('skills') },
    { id:'quests',  label:'▸ Quest Log',            hint:'AREA', kbd:'2', action: () => goTo('quests') },
    { id:'jornada', label:'▸ Jornada',               hint:'AREA', kbd:'3', action: () => goTo('jornada') },
    { id:'contato', label:'▸ Comm Link · Contato',  hint:'AREA', kbd:'4', action: () => goTo('contato') },
    { id:'hack',    label:'▸ Hack The Operator · text adventure', hint:'GAME', kbd:'5', action: () => openHack() },
    { id:'charsel', label:'▸ Character Select',     hint:'NAV',  kbd:'',  action: () => goTo('charsel') },
    { id:'mail',    label:'▸ Send Mail · daniew1000@gmail.com', hint:'CTA', kbd:'', action: () => window.location.href = 'mailto:daniew1000@gmail.com' },
    { id:'gh',      label:'▸ Open GitHub Profile',  hint:'CTA',  kbd:'',  action: () => window.open('https://github.com/daniel3243gg', '_blank') },
    { id:'li',      label:'▸ Open LinkedIn',        hint:'CTA',  kbd:'',  action: () => window.open('https://www.linkedin.com/in/daniel-feliciano-vieira-brandao-57ab66201/', '_blank') },
    { id:'snake',   label:'▸ Launch mini-game · CYBER SNAKE', hint:'EASTER EGG', kbd:'', action: () => openMinigame() },
    { id:'theme',   label:'▸ Toggle CRT scanlines', hint:'CFG',  kbd:'',  action: () => document.body.classList.toggle('no-scanlines') },
    { id:'reboot',  label:'▸ Reboot OS',            hint:'SYS',  kbd:'',  action: () => goTo('boot') },
  ], [goTo, openMinigame, openHack]);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return cmds;
    return cmds.filter(c => c.label.toLowerCase().includes(t) || c.hint.toLowerCase().includes(t));
  }, [q, cmds]);

  useEffect(() => { setIdx(0); }, [q, open]);

  useEffect(() => {
    if (!open) return;
    const h = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i + 1, filtered.length - 1)); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        const c = filtered[idx];
        if (c) { c.action(); close(); }
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, filtered, idx, close]);

  if (!open) return null;
  return (
    <div className="cmd-palette" onClick={close}>
      <div className="cmd-box" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="▸ TYPE A COMMAND..."
        />
        <div className="cmd-list">
          {filtered.length === 0 && (
            <div className="cmd-item" style={{color:'var(--text-mute)'}}>▸ no commands match "{q}"</div>
          )}
          {filtered.map((c, i) => (
            <div
              key={c.id}
              className={`cmd-item ${i === idx ? 'active' : ''}`}
              onMouseEnter={() => setIdx(i)}
              onClick={() => { c.action(); close(); }}
            >
              <span>{c.label}</span>
              <span className="kbd">{c.kbd && `[ ${c.kbd} ]`} {c.hint}</span>
            </div>
          ))}
        </div>
        <div style={{ padding:'10px 24px', fontSize: 10, letterSpacing:'.25em', color:'var(--text-mute)', fontFamily:'var(--font-mono)', borderTop:'1px solid rgba(0,240,255,.1)' }}>
          [ ↑↓ ] navigate · [ enter ] run · [ esc ] close
        </div>
      </div>
    </div>
  );
}

function Minigame({ open, close }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => parseInt(localStorage.getItem('snake_best') || '0', 10));
  const [over, setOver] = useState(false);

  useEffect(() => {
    if (!open) return;
    const W = 24, H = 16, CELL = 22;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = W * CELL; canvas.height = H * CELL;
    const ctx = canvas.getContext('2d');

    let snake = [{ x: 10, y: 8 }, { x: 9, y: 8 }, { x: 8, y: 8 }];
    let dir = { x: 1, y: 0 };
    let pending = null;
    let food = spawnFood();
    let alive = true;
    let s = 0;
    setScore(0); setOver(false);
    stateRef.current = { tick: null };

    function spawnFood() {
      while (true) {
        const f = { x: Math.floor(Math.random() * W), y: Math.floor(Math.random() * H) };
        if (!snake.some(p => p.x === f.x && p.y === f.y)) return f;
      }
    }

    function draw() {
      // bg
      ctx.fillStyle = '#05071a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // grid
      ctx.strokeStyle = 'rgba(31,42,94,.4)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= W; i++) { ctx.beginPath(); ctx.moveTo(i*CELL, 0); ctx.lineTo(i*CELL, H*CELL); ctx.stroke(); }
      for (let i = 0; i <= H; i++) { ctx.beginPath(); ctx.moveTo(0, i*CELL); ctx.lineTo(W*CELL, i*CELL); ctx.stroke(); }
      // food
      ctx.fillStyle = '#ff2bd6';
      ctx.shadowColor = '#ff2bd6'; ctx.shadowBlur = 14;
      ctx.fillRect(food.x*CELL+3, food.y*CELL+3, CELL-6, CELL-6);
      ctx.shadowBlur = 0;
      // snake
      snake.forEach((p, i) => {
        const c = i === 0 ? '#00f0ff' : '#0a8a99';
        ctx.fillStyle = c;
        ctx.shadowColor = '#00f0ff'; ctx.shadowBlur = i === 0 ? 12 : 4;
        ctx.fillRect(p.x*CELL+2, p.y*CELL+2, CELL-4, CELL-4);
      });
      ctx.shadowBlur = 0;
    }

    function step() {
      if (!alive) return;
      if (pending) { dir = pending; pending = null; }
      const head = { x: (snake[0].x + dir.x + W) % W, y: (snake[0].y + dir.y + H) % H };
      if (snake.some(p => p.x === head.x && p.y === head.y)) {
        alive = false; setOver(true);
        const b = Math.max(best, s);
        setBest(b);
        localStorage.setItem('snake_best', String(b));
        return;
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        s += 10; setScore(s);
        food = spawnFood();
      } else {
        snake.pop();
      }
      draw();
    }

    draw();
    stateRef.current.tick = setInterval(step, 110);

    const onKey = (e) => {
      const k = e.key;
      if (k === 'Escape') { e.preventDefault(); close(); return; }
      const dirs = {
        ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 },
      };
      const nd = dirs[k];
      if (!nd) return;
      e.preventDefault();
      if (nd.x === -dir.x && nd.y === -dir.y) return;
      pending = nd;
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearInterval(stateRef.current.tick);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  if (!open) return null;
  return (
    <div className="minigame" onClick={close}>
      <div className="mg-shell" onClick={(e) => e.stopPropagation()}>
        <div className="mg-title glitch" data-text="CYBER SNAKE">CYBER SNAKE</div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 10, fontFamily:'var(--font-mono)', fontSize: 13, letterSpacing:'.2em' }}>
          <span style={{color:'var(--cyan)'}}>▸ SCORE: <strong style={{color:'var(--yellow)'}}>{score}</strong></span>
          <span style={{color:'var(--magenta)'}}>▸ BEST: <strong style={{color:'var(--green)'}}>{best}</strong></span>
        </div>
        <canvas ref={canvasRef} className="mg-canvas"></canvas>
        <div className="mg-hint">
          {over
            ? '▸ GAME OVER · press [ ESC ] to close · click outside to retry'
            : '▸ [ wasd / arrows ] move · [ esc ] close'}
        </div>
      </div>
    </div>
  );
}

function useKonami(onTrigger) {
  useEffect(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let i = 0;
    const h = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === seq[i].toLowerCase() || k === seq[i]) { i++; if (i === seq.length) { i = 0; onTrigger(); } }
      else { i = (k === seq[0]) ? 1 : 0; }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onTrigger]);
}

Object.assign(window, { CommandPalette, Minigame, useKonami });

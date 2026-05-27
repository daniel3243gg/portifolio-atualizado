/* ============================================================
   SkillTree.jsx — interactive node graph (Path of Exile-style)
   ============================================================ */

function SkillTree({ goTo }) {
  const d = window.DATA;
  const { nodes, edges } = d.skillTree;
  const [selected, setSelected] = useState(nodes[0].id);
  const node = nodes.find(n => n.id === selected);

  // Convert percentages to absolute px inside the canvas via a sized container
  const colors = {
    cy: 'var(--cyan)', mg: 'var(--magenta)', yl: 'var(--yellow)', gn: 'var(--green)'
  };

  return (
    <div className="screen fade-in">
      <div className="screen-title">
        <span className="num">01</span>
        <h1>Skill <span className="glow-cy">Tree</span></h1>
        <span className="crumb">/ hub / area_01 / talents</span>
      </div>

      <div className="tree-wrap">
        <div className="panel tree-side">
          <h4>▸ Legend</h4>
          <div style={{ display:'grid', gap: 10, fontFamily:'var(--font-mono)', fontSize: 12, color:'var(--text-dim)', lineHeight: 1.7 }}>
            <div><span style={{color:'var(--cyan)'}}>◆ LANG / CLOUD</span> — Linguagens & AWS</div>
            <div><span style={{color:'var(--magenta)'}}>◆ MOBILE / QA</span> — Mobile & Testes</div>
            <div><span style={{color:'var(--yellow)'}}>◆ BACKEND / ARCH</span> — Servidores & Padrões</div>
            <div><span style={{color:'var(--green)'}}>◆ AI / LLM</span> — IA generativa</div>
          </div>

          <h4 style={{marginTop: 24}}>▸ Stats</h4>
          <div style={{ display:'grid', gap: 6, fontFamily:'var(--font-mono)', fontSize: 12, color:'var(--text-dim)' }}>
            <div>Nodes desbloqueados: <strong style={{color:'var(--cyan)'}}>{nodes.length} / {nodes.length}</strong></div>
            <div>Pontos gastos: <strong style={{color:'var(--yellow)'}}>{nodes.reduce((s,n)=>s+(n.level||0),0)}</strong></div>
            <div>Master nodes: <strong style={{color:'var(--magenta)'}}>{nodes.filter(n=>n.master).length}</strong></div>
          </div>

          <h4 style={{marginTop: 24}}>▸ Controls</h4>
          <div style={{ fontFamily:'var(--font-mono)', fontSize: 11, color:'var(--text-mute)', lineHeight: 1.8 }}>
            <div>[ click ] — focus node</div>
            <div>[ ↑↓←→ ] — navigate</div>
            <div>[ esc ] — exit area</div>
          </div>
        </div>

        <div>
          <div className="tree-canvas" id="tree-canvas">
            <svg className="tree-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              {edges.map(([a, b], i) => {
                const A = nodes.find(n => n.id === a);
                const B = nodes.find(n => n.id === b);
                if (!A || !B) return null;
                const active = selected === a || selected === b;
                return (
                  <line key={i}
                    x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                    stroke={active ? colors[A.color] : 'rgba(0,240,255,0.18)'}
                    strokeWidth={active ? '0.25' : '0.12'}
                    vectorEffect="non-scaling-stroke"
                    style={{ filter: active ? `drop-shadow(0 0 4px ${colors[A.color]})` : 'none' }}
                  />
                );
              })}
            </svg>
            {nodes.map(n => (
              <div
                key={n.id}
                className={`tree-node ${n.master ? 'master' : ''} ${selected === n.id ? 'selected' : ''}`}
                style={{ left: n.x + '%', top: n.y + '%', '--cy': colors[n.color] }}
                onClick={() => setSelected(n.id)}
              >
                <div className="hex" style={{ borderColor: colors[n.color], '--cy': colors[n.color] }}>
                  {n.label}
                </div>
                <div className="lvl">{n.level}</div>
              </div>
            ))}
          </div>

          <div className={`panel panel-${node.color === 'cy' ? '' : node.color}`} style={{ marginTop: 16 }}>
            <div className="tree-detail">
              <div style={{ display:'flex', alignItems:'baseline', gap: 12, flexWrap:'wrap' }}>
                <h3>{node.title}</h3>
                <span className="lv" style={{ fontFamily:'var(--font-pixel)', fontSize: 26, color: colors[node.color], textShadow: `0 0 6px ${colors[node.color]}` }}>LV.{node.level}</span>
                {node.master && <span className="label-tag yl">▸ MASTER NODE</span>}
              </div>
              <div className="sub" style={{ color: colors[node.color] }}>{node.sub}</div>
              <ul>
                {node.details.map((det, i) => <li key={i}>{det}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BackBar goTo={goTo} />
    </div>
  );
}

/* ============================================================
   Quests.jsx — projects as quest log
   ============================================================ */

const rarityMap = {
  legendary: { cls: 'leg',  label: 'LENDÁRIO',  color: 'var(--yellow)' },
  epic:      { cls: 'epic', label: 'ÉPICO',     color: 'var(--magenta)' },
  rare:      { cls: 'rare', label: 'RARO',      color: 'var(--cyan)' },
  common:    { cls: 'comm', label: 'COMUM',     color: 'var(--text-dim)' }
};

function Quests({ goTo }) {
  const d = window.DATA;
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === 'all' ? d.quests : d.quests.filter(q => q.rarity === filter);

  return (
    <div className="screen fade-in">
      <div className="screen-title">
        <span className="num">02</span>
        <h1>Quest <span className="glow-mg">Log</span></h1>
        <span className="crumb">/ hub / area_02 / missions</span>
      </div>

      <div className="quests-wrap">
        <div style={{ display:'flex', flexWrap:'wrap', gap: 10, alignItems:'center', marginBottom: 4 }}>
          <span className="label-tag mg">▸ FILTER BY RARITY</span>
          {['all', 'legendary', 'epic', 'rare'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="btn-cyber"
              style={{
                padding: '8px 14px',
                fontSize: 11,
                color: filter === f ? 'var(--bg-0)' : (rarityMap[f]?.color || 'var(--cyan)'),
                background: filter === f ? (rarityMap[f]?.color || 'var(--cyan)') : 'transparent',
                borderColor: rarityMap[f]?.color || 'var(--cyan)'
              }}
            >
              {f === 'all' ? 'ALL' : rarityMap[f].label}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontFamily:'var(--font-mono)', fontSize: 12, color:'var(--text-dim)' }}>
            ▸ Showing {filtered.length} / {d.quests.length}
          </span>
        </div>

        <div className="quests-grid">
          {filtered.map(q => {
            const r = rarityMap[q.rarity];
            return (
              <div
                key={q.id}
                className={`quest-card rarity-${r.cls} ${expanded === q.id ? 'expanded' : ''}`}
                onClick={() => setExpanded(expanded === q.id ? null : q.id)}
              >
                <div className="quest-img">
                  <img src={q.img} alt={q.title} onError={(e)=>{ e.target.style.display='none'; }} />
                </div>
                <div className="quest-body">
                  <div className="quest-meta">
                    <span className={`rarity-badge ${r.cls}`}>◆ {r.label}</span>
                    <span className={`quest-status ${q.status}`}>
                      {q.status === 'done' ? '✓ COMPLETED' : '◐ IN PROGRESS'}
                    </span>
                  </div>
                  <h3 className="quest-title">{q.title}</h3>
                  <p className="quest-desc">{q.desc}</p>
                  <div className="quest-tags">
                    {q.tags.map(t => <span key={t} className="quest-tag">{t}</span>)}
                  </div>
                  <div className="quest-reward">
                    <span>▸ <strong>+{q.rewards.xp} XP</strong></span>
                    <span>▸ <strong>₡ {q.rewards.gold}</strong></span>
                    {q.rewards.item && <span>▸ <strong style={{color:'var(--magenta)'}}>{q.rewards.item}</strong></span>}
                    {q.url && (
                      <a
                        href={q.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cyber"
                        style={{ marginLeft:'auto', padding:'4px 12px', fontSize:10, letterSpacing:'.15em' }}
                        onClick={(e) => e.stopPropagation()}
                      >▸ ACESSAR</a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BackBar goTo={goTo} />
    </div>
  );
}

/* ============================================================
   Journey.jsx — formation + experience timeline
   ============================================================ */

function Journey({ goTo }) {
  const d = window.DATA;
  return (
    <div className="screen fade-in">
      <div className="screen-title">
        <span className="num">03</span>
        <h1>Journey <span className="glow-yl">Log</span></h1>
        <span className="crumb">/ hub / area_03 / timeline</span>
      </div>

      <div className="journey-wrap">
        <div className="journey-section">
          <h2>▸ Experiência Profissional</h2>
          <div className="journey-list">
            {d.experience.map((e, i) => (
              <div className={`journey-item ${e.current ? 'current' : ''}`} key={i}>
                <h3>
                  {e.role} <span style={{color:'var(--magenta)'}}>@ {e.company}</span>
                  {e.current && <span className="now-tag">● NOW</span>}
                </h3>
                <div className="date">{e.date}</div>
                <div className="body">{e.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="journey-section">
          <h2 style={{color:'var(--cyan)', textShadow:'var(--shadow-cyan)'}}>▸ Formação & Certificações</h2>
          <div className="journey-list">
            {d.formation.map((f, i) => (
              <div className="journey-item" key={i}>
                <h3>{f.title}</h3>
                <div className="date">{f.date}</div>
                <div className="org">▸ {f.org}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="journey-section">
          <h2 style={{color:'var(--green)', textShadow:'var(--shadow-green)'}}>▸ Idiomas & Competências</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 20 }} className="lang-comp-grid">
            <div className="panel panel-gn" style={{ padding: 18 }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--green)', marginBottom: 14 }}>▸ LANGUAGES</div>
              {d.languages.map((l) => (
                <div key={l.name} style={{ marginBottom: 14 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--font-mono)', fontSize: 12, letterSpacing:'.15em', textTransform:'uppercase', marginBottom: 6 }}>
                    <span>{l.name}</span><span style={{color:'var(--cyan)'}}>{l.level}</span>
                  </div>
                  <div className="vital-bar mp"><i style={{width: l.value + '%'}}></i></div>
                </div>
              ))}
            </div>
            <div className="panel panel-yl" style={{ padding: 18 }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--yellow)', marginBottom: 14 }}>▸ INVENTORY · COMPETENCIES</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap: 8 }}>
                {d.competencies.map(c => (
                  <span key={c} className="quest-tag" style={{ color:'var(--yellow)', borderColor:'rgba(255,234,0,.3)' }}>{c}</span>
                ))}
              </div>
              <div style={{ marginTop: 18, fontFamily:'var(--font-mono)', fontSize: 11, color:'var(--text-mute)', letterSpacing:'.15em' }}>
                ▸ OBJECTIVE: <span style={{color:'var(--text)'}}>{d.identity.objective}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BackBar goTo={goTo} />
    </div>
  );
}

/* ============================================================
   Contact.jsx — terminal-style comm link
   ============================================================ */

function Contact({ goTo }) {
  const d = window.DATA;
  const lines = [
    { type: 'cmd', text: 'cyberdeck://daniel3243gg/contact --establish-link' },
    { type: 'out', text: 'Estabelecendo conexão segura...' },
    { type: 'out', text: 'Handshake completo. Canal aberto.' },
    { type: 'cmd', text: 'cat ./identity.json' }
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown(s => s + 1), 500);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div className="screen fade-in">
      <div className="screen-title">
        <span className="num">04</span>
        <h1>Comm <span className="glow-gn">Link</span></h1>
        <span className="crumb">/ hub / area_04 / contact</span>
      </div>

      <div className="term-wrap">
        <div className="term-bar">
          <span className="dot" style={{background:'var(--red)'}}></span>
          <span className="dot" style={{background:'var(--yellow)'}}></span>
          <span className="dot" style={{background:'var(--green)'}}></span>
          <span style={{marginLeft: 14}}>daniel3243gg@cyberdeck ~ /contact</span>
          <span style={{marginLeft:'auto', color:'var(--green)'}}>● ENCRYPTED</span>
        </div>

        {lines.slice(0, shown).map((l, i) => (
          <div className="term-line" key={i}>
            {l.type === 'cmd' ? <><span className="prompt">$</span><span className="cmd">{l.text}</span></> : <span className="out">{l.text}</span>}
          </div>
        ))}
        {shown < lines.length && <div className="term-line"><span className="prompt">$</span><span className="caret"></span></div>}

        {shown >= lines.length && (
          <div className="fade-in">
            <div className="contact-grid">
              <div className="contact-row">
                <span className="k">▸ Operator</span>
                <span className="v">{d.identity.name}</span>
              </div>
              <div className="contact-row">
                <span className="k">▸ Handle</span>
                <span className="v glow-cy" style={{fontFamily:'var(--font-mono)'}}>{d.identity.handle}</span>
              </div>
              <div className="contact-row">
                <span className="k">▸ Email</span>
                <span className="v"><a href={`mailto:${d.identity.email}`}>{d.identity.email}</a></span>
              </div>
              <div className="contact-row">
                <span className="k">▸ Phone</span>
                <span className="v">{d.identity.phone}</span>
              </div>
              <div className="contact-row">
                <span className="k">▸ LinkedIn</span>
                <span className="v"><a href={d.identity.linkedin} target="_blank" rel="noreferrer">/in/daniel-feliciano-vieira-brandao</a></span>
              </div>
              <div className="contact-row">
                <span className="k">▸ GitHub</span>
                <span className="v"><a href={d.identity.github} target="_blank" rel="noreferrer">github.com/daniel3243gg</a></span>
              </div>
              <div className="contact-row" style={{ gridColumn: '1 / -1' }}>
                <span className="k">▸ Location</span>
                <span className="v">{d.identity.location}</span>
              </div>
            </div>

            <div style={{ marginTop: 28, fontFamily:'var(--font-mono)', fontSize: 13, color:'var(--text-dim)', lineHeight: 1.8 }}>
              <div><span className="prompt" style={{color:'var(--green)'}}>$</span> <span className="cmd" style={{color:'var(--cyan)'}}>echo $OBJECTIVE</span></div>
              <div>▸ {d.identity.objective}</div>
              <div style={{ marginTop: 18, color:'var(--green)' }}><span className="caret">▸ Aguardando contato</span></div>
            </div>

            <div style={{ display:'flex', gap: 12, marginTop: 24, flexWrap:'wrap' }}>
              <a className="btn-cyber gn" href={`mailto:${d.identity.email}`}>▸ Send Mail</a>
              <a className="btn-cyber" href={d.identity.linkedin} target="_blank" rel="noreferrer">▸ LinkedIn</a>
              <a className="btn-cyber mg" href={d.identity.github} target="_blank" rel="noreferrer">▸ GitHub</a>
            </div>
          </div>
        )}
      </div>

      <BackBar goTo={goTo} />
    </div>
  );
}

/* expose */
Object.assign(window, { SkillTree, Quests, Journey, Contact });

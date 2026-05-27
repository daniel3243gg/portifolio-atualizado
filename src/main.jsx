function App() {
  // screen: boot | charsel | hub | skills | quests | jornada | contato
  const [screen, setScreen] = useState('boot');
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mgOpen, setMgOpen] = useState(false);
  const [hackOpen, setHackOpen] = useState(false);
  const [pushToast, toastNode] = useToast();

  const goTo = useCallback((s) => {
    if (s === 'hack') { setHackOpen(true); setCmdOpen(false); return; }
    setScreen(s);
    setCmdOpen(false);
    setMgOpen(false);
    setHackOpen(false);
    window.scrollTo(0, 0);
  }, []);

  // Track which modals are open via window flag — used by Hub/global handlers
  useEffect(() => {
    window.__modalOpen = cmdOpen || mgOpen || hackOpen;
  }, [cmdOpen, mgOpen, hackOpen]);

  // Global keys: ⌘K, /, ?, esc
  useEffect(() => {
    const h = (e) => {
      // When a modal is open, only listen for Escape — let the modal handle the rest
      if (window.__modalOpen) {
        if (e.key === 'Escape' && cmdOpen) { setCmdOpen(false); }
        return;
      }
      if ((e.key === '/' || (e.key === 'k' && (e.ctrlKey || e.metaKey))) && screen !== 'boot') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      } else if (e.key === 'Escape') {
        if (screen !== 'hub' && screen !== 'boot' && screen !== 'charsel') {
          e.preventDefault(); setScreen('hub');
        }
      } else if (e.key === '~' || e.key === '`') {
        if (screen !== 'boot') { e.preventDefault(); setMgOpen(true); }
      } else if ((e.key === 'h' || e.key === 'H') && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        if (screen !== 'boot') { e.preventDefault(); setHackOpen(true); }
      }
    };
    const openCmd = () => setCmdOpen(true);
    window.addEventListener('keydown', h);
    window.addEventListener('open-cmd', openCmd);
    return () => {
      window.removeEventListener('keydown', h);
      window.removeEventListener('open-cmd', openCmd);
    };
  }, [screen, cmdOpen, mgOpen, hackOpen]);

  // Konami unlock
  useKonami(() => pushToast('KONAMI CODE · +30 LCK · achievement: HIDDEN PATH'));

  // Welcome toast when entering hub for first time
  useEffect(() => {
    if (screen === 'hub' && !sessionStorage.getItem('hub_welcomed')) {
      sessionStorage.setItem('hub_welcomed', '1');
      setTimeout(() => pushToast('Tip: press [ / ] to open commands · [ ` ] for mini-game'), 800);
    }
  }, [screen]);

  return (
    <>
      <div className="bg-grid"></div>
      <div className="sweep-line"></div>
      <div className="noise"></div>
      <div className="scanlines"></div>
      <div className="vignette"></div>

      {screen !== 'boot' && (
        <HUDShell
          screen={screen}
          level={window.DATA.identity.level}
          gold={9842}
          achievements={12}
        />
      )}

      {screen === 'boot'    && <BootScreen onDone={() => goTo('charsel')} />}
      {screen === 'charsel' && <CharacterSelect onEnter={() => goTo('hub')} />}
      {screen === 'hub'     && <Hub goTo={goTo} />}
      {screen === 'skills'  && <SkillTree goTo={goTo} />}
      {screen === 'quests'  && <Quests goTo={goTo} />}
      {screen === 'jornada' && <Journey goTo={goTo} />}
      {screen === 'contato' && <Contact goTo={goTo} />}

      <CommandPalette
        open={cmdOpen}
        close={() => setCmdOpen(false)}
        goTo={goTo}
        openMinigame={() => setMgOpen(true)}
        openHack={() => setHackOpen(true)}
      />
      <Minigame open={mgOpen} close={() => setMgOpen(false)} />
      <HackGame open={hackOpen} close={() => setHackOpen(false)} />

      {toastNode}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

/* ============================================================
   HackGame.jsx — "Hack The Operator" text-adventure terminal
   ============================================================ */

/* ---------- Virtual filesystem ---------- */
const HACK_FS = (() => {
  const f = (content, shard = true, encrypted = false, key = null) =>
    ({ type: 'file', content, shard, encrypted, key });
  const d = (children) => ({ type: 'dir', children });

  return d({
    'README.md': f(
`╔══════════════════════════════════════════════════════════╗
║  OPERATOR DOSSIER · daniel3243gg                         ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  MISSÃO: extrair o dossiê completo do operador.          ║
║  Use comandos para navegar o filesystem.                 ║
║                                                          ║
║  Comece com:   help                                      ║
║                whoami                                    ║
║                ls                                        ║
║                tree                                      ║
║                                                          ║
║  Há ${'\u00A0'}arquivos comuns e arquivos protegidos.            ║
║  Encontre os arquivos .enc e tente: decrypt <arquivo>    ║
║                                                          ║
║  Bonne chasse, runner.                                   ║
╚══════════════════════════════════════════════════════════╝`,
      true
    ),

    'whoami.txt': f(
`DANIEL FELICIANO VIEIRA BRANDÃO
@daniel3243gg · LV.27

> Dev full stack em formação pelo BIOPARK (Toledo - PR).
> Constrói sistemas mobile, backends e arquiteturas escaláveis.
> Atualmente: Programador na SISTEMAS SINGULARES (remoto, Java/JSF).
> Antes disso: Flutter dev na Calory, fundador da Nexus Manage,
> trainee na BZS Tecnologia.

> Stack: Flutter, Golang, Python, PHP, Java, AWS, LLMs.
> Caça bugs por hobby. Refatora por vício.`
    ),

    'bio': d({
      'origin.txt': f(
`> ORIGIN STORY

Comecei programando em 2017, com um curso de informática básica
na Sintrascoopa. Em 2022 ainda estudava Administração e Marketing
no Colégio Estadual Ceretta — não imaginava que dois anos depois
estaria fundando uma plataforma SaaS pro Mercado Livre.

Algoritmo veio em 2023 (Curso em Vídeo). Daí virou avalanche:
PHP, SQL, Flutter, Python, Go, IA. Sem freio.`
      ),

      'objective.txt': f(
`> CAREER OBJECTIVE

Tornar-se referência na área e alcançar o cargo de TECH LEAD.

Estudo todo dia. Refatoro projetos antigos pra cravar conceitos
novos. Não acredito em "linguagem favorita" — acredito em escolher
a ferramenta certa pro problema.`
      ),

      'personality.enc': f(
`▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓ PERSONALITY MATRIX · ENCRYPTED                ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

> Conteúdo bloqueado. Tente: decrypt personality.enc
> Hint: a chave é a stack que mais aparece nos meus projetos.
> (3 letras, em minúsculo)`,
        true, true, 'dart'
      ),
    }),

    'skills': d({
      'languages.json': f(
`{
  "expert":     ["Dart / Flutter"],
  "advanced":   ["Python", "PHP", "JavaScript", "Golang", "SQL", "Java"],
  "frameworks": ["Flutter", "FastAPI", "Echo (Go)", "Laravel", "Yii2",
                 "JSF + Primefaces", "Angular"],
  "state_mgmt": ["GetX", "Provider", "BLoC"],
  "testing":    ["pytest", "PHPUnit", "JUnit", "Dart test",
                 "Widget/Integration tests"]
}`
      ),

      'cloud.md': f(
`# AWS Operations

- IAM     :: usuários, roles, MFA, policies
- VPC     :: subnets pub/priv, IGW, NAT, SG, NACL, routing
- EC2     :: AMIs, EBS, Elastic IP, Load Balancers, ASG
- S3      :: buckets, versioning, lifecycle, CloudFront
- Route53 :: hosted zones, registros, health checks
- HA      :: multi-AZ, failover, disaster recovery`
      ),

      'ai.md': f(
`# AI / LLM Stack

> Trabalho diário com GPT (OpenAI) e Claude (Anthropic).

- RAG completo (retrieval + generation)
- Embeddings: OpenAI, sentence-transformers
- Vector DBs: Pinecone, Weaviate, Chroma, Qdrant
- MCPs (Model Context Protocol) — servidores customizados
- Chat com IA em produção (CRM Médico, 24/7)`
      ),

      'mobile.md': f(
`# Mobile Engineering

Flutter é a especialidade. Lancei apps que rodam em
maquininhas Stone via Platform Channels (integração nativa).

- Widgets, GetX, Provider, BLoC
- Unit / Widget / Integration tests
- Isolates pra processos pesados
- Apps lançados: CSBar, CsSalão, Vértice, FrutNorte`
      ),
    }),

    'projects': d({
      'crm_clinica.log': f(
`╔ LEGENDARY ════════════════════════════════════════════════╗
║ CRM MÉDICO · Plataforma SaaS com IA                       ║
╚═══════════════════════════════════════════════════════════╝

Stack: Golang · Echo v4 · GORM · PostgreSQL · WebSocket
       JWT · API Keys · LLMs · MCPs · n8n/Make/Zapier
       Hostinger KVM4 (infra própria)

Responsabilidades:
  - Backend completo com Clean Architecture
  - Permissões granulares por roles hierárquicos
  - Chat 24/7 com LLMs pra atendimento automatizado
  - Prontuários eletrônicos, multi-clínica, assinaturas
  - Configurei infra do zero, multi-AZ

Status: ✓ COMPLETED · +4800 XP`
      ),

      'nexus_manage.log': f(
`╔ LEGENDARY ════════════════════════════════════════════════╗
║ NEXUS MANAGE · Backend Mercado Livre                      ║
╚═══════════════════════════════════════════════════════════╝

Stack: FastAPI · Peewee · MySQL · Mercado Livre API

Fundei a empresa e construí o back-end inteiro.
Automações de venda, controle de estoque, relatórios.
Definir fluxo de dados + segurança + performance.

Aprendi mais sobre arquitetura aqui do que em qualquer curso.

Status: ✓ COMPLETED · +4200 XP`
      ),

      'csbar.log': f(
`╔ EPIC ═════════════════════════════════════════════════════╗
║ CSBAR · Maquininha Stone pra Bares/Restaurantes           ║
╚═══════════════════════════════════════════════════════════╝

Stack: Flutter · Stone SDK · Platform Channels (Java/Kotlin)

Front-end mobile que roda DENTRO da maquininha Stone.
Controle de mesas, tickets, pagamentos — tudo num só device.
Primeira vez que usei Platform Channels em produção.

Status: ✓ COMPLETED · +2800 XP`
      ),

      'cssalao.log': f(
`╔ EPIC ═════════════════════════════════════════════════════╗
║ CSSALÃO · Mobile + Backend pra Salões                     ║
╚═══════════════════════════════════════════════════════════╝

Stack: Flutter (front) · Golang + Echo + GORM + MySQL (back)
       Stone Native Bridge

Solução completa: pessoas, atendimentos, contas, pagamentos.
Roda no celular E na maquininha. Mesma codebase Flutter.

Status: ✓ COMPLETED · +2700 XP`
      ),

      'vertice.log': f(
`╔ EPIC ═════════════════════════════════════════════════════╗
║ VÉRTICE · Gestão pra Micro Empreendedores                 ║
╚═══════════════════════════════════════════════════════════╝

Stack: Flutter · BLoC · Clean Architecture · SOLID
       Dio · Freezed · Equatable · Provider

Desenvolvido em parceria. UX/UI focado em quem nunca usou
sistema de gestão antes. Lançamento previsto: Play Store.

Status: ✓ COMPLETED · +2600 XP`
      ),

      'frutnorte.log': f(
`╔ RARE ═════════════════════════════════════════════════════╗
║ ERP FRUTNORTE · Desktop em Flutter                        ║
╚═══════════════════════════════════════════════════════════╝

Stack: Flutter Desktop · MySQL 15 · GetX

CRUD de pessoas/produtos, entrada/saída, controle de acesso.
Provou que Flutter Desktop é viável pra ERP.

Status: ✓ COMPLETED · +2000 XP`
      ),

      'discord_bot.log': f(
`╔ RARE ═════════════════════════════════════════════════════╗
║ DISCORD BOT · Hobby Project                               ║
╚═══════════════════════════════════════════════════════════╝

Stack: Python · Azure SQL · discord.py

Bot multifuncional com xadrez, truco e envio de e-mails
direto pelo chat. Foi onde aprendi Azure na prática.

Status: ✓ COMPLETED · +1500 XP`
      ),

      'mangas.log': f(
`╔ RARE ═════════════════════════════════════════════════════╗
║ MANGÁS · Leitor Mobile                                    ║
╚═══════════════════════════════════════════════════════════╝

Stack: Flutter · API externa

App pra leitura de mangás asiáticos. Três telas principais:
recomendações, lançamentos, em andamento.

Status: ◐ IN PROGRESS · +1800 XP`
      ),
    }),

    'experience': d({
      'sistemas_singulares.log': f(
`# ATUAL · ABR/2026 → AGORA · REMOTO

> SISTEMAS SINGULARES · Programador de Software · Tempo integral

Stack: Java · JSF (JavaServer Faces) · Primefaces
       JavaScript · jQuery · PostgreSQL

Engenharia de sistemas + engenharia web.
Voltei pro mundo Java/web tradicional depois de muita
experiência com Flutter e Go — combinação rara de stacks.`
      ),

      'calory.log': f(
`# 03/2024 → 09/2025 · CALORY SISTEMA

Analista e Desenvolvedor de Sistemas.
Apps em Flutter do zero — planejamento, UI, integração com DB.
Operação ágil, projetos desafiadores em produção.

Foi o palco principal pro meu domínio de Flutter.`
      ),

      'nexus_manage.log': f(
`# 04/2024 → 03/2025 · NEXUS MANAGE (FUNDADOR)

Fundador e principal dev do back-end.
FastAPI + Peewee + MySQL — arquitetura escalável.
Integrações com Mercado Livre, automações, segurança.

Aqui aprendi que arquitetura > código bonito.`
      ),

      'bzs.log': f(
`# 03/2023 → 12/2023 · BZS TECNOLOGIA

Dev Trainee — primeira experiência de mercado.
Stack: PHP7 (Yii2), Python, jQuery, Bootstrap.
Suporte de rotinas + criação de features.

Yii2 + PHP7 foi onde aprendi a entregar dentro do prazo.`
      ),

      'herbolab.log': f(
`# 09/2022 → 11/2022 · HERBOLAB

Auxiliar Administrativo (pré-código).
Planilhas, textos, entregas, metas mensais.
Soft skills: gestão estratégica, resolução de problemas.

Não era dev, mas já estava no caminho.`
      ),
    }),

    'formation': d({
      'biopark.txt': f(
`# BIOPARK EDUCAÇÃO · 02/2025 → 06/2027

Análise e Desenvolvimento de Sistemas. CURSANDO.
Foco em arquitetura, banco de dados e desenvolvimento web.`
      ),
      'flutter.txt': f(
`# UDEMY · 02/2024 — 25/02/2024

Flutter Completo. Acelerou minha curva no framework.
Depois disso, virou minha especialidade.`
      ),
      'php_sql.txt': f(
`# UDEMY + BZS · 10/2023 → 01/2024

PHP 7 Completo + SQL.
Base sólida pra trabalhar com Yii2 e MySQL na BZS.`
      ),
      'algoritmo.txt': f(
`# CURSO EM VÍDEO · 01/2023 → 04/2023

Algoritmo do Gustavo Guanabara.
O ponto exato onde eu virei dev.`
      ),
    }),

    'contact': d({
      'comm.json': f(
`{
  "email":    "daniew1000@gmail.com",
  "phone":    "+55 47 9 9639 4653",
  "linkedin": "/in/daniel-feliciano-vieira-brandao-57ab66201",
  "github":   "github.com/daniel3243gg",
  "location": "BioPark · Toledo · PR",
  "open_to":  ["remoto", "híbrido", "full-time", "freelance"]
}`
      ),
    }),

    '.secrets': d({
      '.coffee_log': f(
`# DAILY COFFEE LOG

> Cup count: ████████ 8 / day (average)
> Caffeine dependency: critical
> Bug-fixing speed without coffee: -42%
> Bug-creating speed with too much coffee: +200%
> Optimal range: 3-5 cups`
      ),
      '.confession.enc': f(
`▓ CONFISSÕES DO OPERADOR · ENCRYPTED ▓

> decrypt .confession.enc
> Hint: o ano em que comecei a programar de verdade.
> (4 dígitos)`,
        true, true, '2023'
      ),
      '.konami': f(
`> Você encontrou o arquivo escondido.
> Tente o código konami em qualquer tela:
> ↑ ↑ ↓ ↓ ← → ← → B A
> +30 LCK · achievement: HIDDEN PATH`
      ),
    }),
  });
})();

/* ---------- Decrypted contents ---------- */
const DECRYPTED = {
  'personality.enc':
`> PERSONALITY MATRIX · DECRYPTED ✓

Curioso até o último bit. Quando algo quebra eu não
descanso até saber o porquê. Refatorar código antigo me dá
o mesmo prazer que terminar um livro.

Sou direto, evito reuniões longas, prefiro um README bom
a uma documentação de 40 páginas. Trabalho melhor remoto,
em silêncio, com headphone e dois monitores.

Acredito em SOLID, mas não como religião — só como bússola.
Acredito em testes, mas só quando entregam confiança real.
Acredito em código simples antes de código esperto.

> +1 SHARD · achievement: UNDER THE HOOD`,

  '.confession.enc':
`> CONFISSÕES · DECRYPTED ✓

A verdade: comecei a programar tarde, comparado à galera
da faculdade. Aos 19 eu ainda fazia curso de Admin/Marketing.
Em 1 ano e meio entrei como trainee na BZS. Em mais 1 ano
fundei uma empresa. Em mais 1 fui contratado full time
em projeto crítico.

Não foi sorte. Foi 4-6h de estudo por dia, todo dia, por
muitos meses seguidos. Continua sendo.

> Se você leu até aqui, obrigado por se interessar.
>   — daniel3243gg

> +1 SHARD · achievement: TRUE NAME`,
};

/* ---------- Total shards calc ---------- */
function countShards(node) {
  if (node.type === 'file') return node.shard ? 1 : 0;
  return Object.values(node.children).reduce((s, c) => s + countShards(c), 0);
}
const TOTAL_SHARDS = countShards(HACK_FS) + Object.keys(DECRYPTED).length;

/* ---------- FS helpers ---------- */
function resolvePath(cwd, arg) {
  if (!arg || arg === '~' || arg === '/') return [];
  let parts;
  if (arg.startsWith('/')) parts = arg.slice(1).split('/');
  else if (arg === '..') return cwd.slice(0, -1);
  else if (arg.startsWith('../')) {
    const up = arg.split('/').filter(Boolean);
    let p = [...cwd];
    for (const seg of up) {
      if (seg === '..') p = p.slice(0, -1);
      else p.push(seg);
    }
    return p;
  } else parts = [...cwd, ...arg.split('/').filter(Boolean)];
  return parts.filter(p => p && p !== '.');
}
function getNode(path) {
  let n = HACK_FS;
  for (const seg of path) {
    if (n.type !== 'dir' || !n.children[seg]) return null;
    n = n.children[seg];
  }
  return n;
}
function fmtPath(cwd) {
  return '~/' + cwd.join('/');
}

/* ---------- Boot banner ---------- */
const BANNER =
`┌──────────────────────────────────────────────────────────┐
│                                                          │
│   ██╗  ██╗ █████╗  ██████╗██╗  ██╗                       │
│   ██║  ██║██╔══██╗██╔════╝██║ ██╔╝                       │
│   ███████║███████║██║     █████╔╝                        │
│   ██╔══██║██╔══██║██║     ██╔═██╗                        │
│   ██║  ██║██║  ██║╚██████╗██║  ██╗                       │
│   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   THE OPERATOR        │
│                                                          │
│   Conectado a daniel3243gg@cyberdeck                     │
│   Encrypted shell · TLS 1.3 · Session ${Math.random().toString(36).slice(2,8).toUpperCase()}            │
│                                                          │
│   ▸ Missão: extrair o dossiê completo.                   │
│   ▸ ${TOTAL_SHARDS} shards escondidos no filesystem.                  │
│   ▸ Digite 'help' pra ver os comandos disponíveis.       │
│                                                          │
└──────────────────────────────────────────────────────────┘`;

/* ---------- The component ---------- */
function HackGame({ open, close }) {
  const [cwd, setCwd] = useState([]);
  const [history, setHistory] = useState([]); // command history
  const [histIdx, setHistIdx] = useState(-1);
  const [lines, setLines] = useState([{ kind: 'banner', text: BANNER }]);
  const [input, setInput] = useState('');
  const [shards, setShards] = useState(() => new Set());
  const [decrypted, setDecrypted] = useState(() => new Set());
  const inputRef = useRef(null);
  const logRef = useRef(null);

  // Reset on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lines]);

  const print = (text, kind = 'out') => setLines((ls) => [...ls, { kind, text }]);

  const ack = (name) => {
    if (shards.has(name)) return;
    setShards((s) => new Set([...s, name]));
    setTimeout(() => print(`\n▸ +1 SHARD recovered · ${shards.size + 1}/${TOTAL_SHARDS}`, 'ok'), 30);
  };

  const run = (rawCmd) => {
    const cmd = rawCmd.trim();
    print(`${fmtPath(cwd)} $ ${rawCmd}`, 'cmd');
    if (!cmd) return;
    setHistory((h) => [...h, cmd]); setHistIdx(-1);

    const [op, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(' ');

    switch (op) {
      case 'help':
      case '?': {
        print(
`COMANDOS DISPONÍVEIS

  help                 esta mensagem
  whoami               quem é o operador
  ls [dir]             listar diretório
  cd <dir>             entrar em diretório (cd .. volta, cd ~ home)
  pwd                  caminho atual
  cat <arquivo>        ler arquivo
  tree                 árvore completa
  find <termo>         buscar arquivos por nome
  decrypt <arquivo>    descriptografar arquivo .enc (use a chave)
  stats                progresso da missão
  clear                limpar tela
  exit                 fechar terminal

DICAS

  Use TAB pra ver o que tem dentro de uma pasta com 'ls'.
  Arquivos começando com '.' são ocultos — use 'ls -a'.
  Você venceu quando coletar todos os shards.`,
          'out'
        );
        break;
      }

      case 'whoami': {
        const n = getNode(['whoami.txt']);
        print(n.content, 'out'); ack('whoami.txt');
        break;
      }

      case 'pwd': {
        print(fmtPath(cwd), 'out'); break;
      }

      case 'ls': {
        const showHidden = rest.includes('-a') || rest.includes('-la') || rest.includes('-al');
        const target = rest.find((r) => !r.startsWith('-'));
        const path = target ? resolvePath(cwd, target) : cwd;
        const n = getNode(path);
        if (!n) { print(`ls: ${target || ''}: caminho inválido`, 'err'); break; }
        if (n.type !== 'dir') { print(target, 'out'); break; }
        const entries = Object.entries(n.children)
          .filter(([k]) => showHidden || !k.startsWith('.'));
        if (entries.length === 0) { print('(vazio — tente: ls -a)', 'out'); break; }
        const out = entries.map(([k, v]) => {
          const tag = v.type === 'dir' ? '📁' : (v.encrypted && !decrypted.has(k) ? '🔒' : '📄');
          const color = v.type === 'dir' ? 'cy' : (v.encrypted ? 'mg' : '');
          return { name: k, tag, color };
        });
        print({ kind: 'ls', entries: out }, 'ls');
        break;
      }

      case 'cd': {
        if (!arg || arg === '~' || arg === '/') { setCwd([]); break; }
        const path = resolvePath(cwd, arg);
        const n = getNode(path);
        if (!n) { print(`cd: ${arg}: caminho não encontrado`, 'err'); break; }
        if (n.type !== 'dir') { print(`cd: ${arg}: não é um diretório`, 'err'); break; }
        setCwd(path);
        break;
      }

      case 'cat':
      case 'read':
      case 'open': {
        if (!arg) { print('uso: cat <arquivo>', 'err'); break; }
        const path = resolvePath(cwd, arg);
        const n = getNode(path);
        if (!n) { print(`cat: ${arg}: arquivo não encontrado`, 'err'); break; }
        if (n.type !== 'file') { print(`cat: ${arg}: é um diretório`, 'err'); break; }
        const fname = path[path.length - 1];
        if (n.encrypted && !decrypted.has(fname)) {
          print(`cat: ${arg}: ARQUIVO PROTEGIDO. Tente 'decrypt ${arg}'`, 'warn');
          print(n.content, 'mg');
          break;
        }
        const text = decrypted.has(fname) ? DECRYPTED[fname] : n.content;
        print(text, 'out');
        if (n.shard) ack(fname);
        break;
      }

      case 'decrypt': {
        if (!arg) { print('uso: decrypt <arquivo>', 'err'); break; }
        const parts = arg.split(/\s+/);
        const target = parts[0];
        const path = resolvePath(cwd, target);
        const n = getNode(path);
        if (!n || n.type !== 'file' || !n.encrypted) {
          print(`decrypt: ${target}: nada pra descriptografar.`, 'err'); break;
        }
        const fname = path[path.length - 1];
        if (decrypted.has(fname)) { print(`decrypt: ${target}: já descriptografado.`, 'warn'); break; }

        const key = parts[1];
        if (!key) {
          // interactive prompt: just tell them
          print(`decrypt: chave necessária.\nUso: decrypt ${target} <chave>\n${n.content}`, 'mg'); break;
        }
        if (key.toLowerCase() === (n.key || '').toLowerCase()) {
          print(`> chave aceita. Descriptografando...\n> ████████████████████████ 100%`, 'cy');
          setDecrypted((s) => new Set([...s, fname]));
          setTimeout(() => {
            print(DECRYPTED[fname] || '(conteúdo perdido)', 'out');
            ack(fname);
          }, 600);
        } else {
          print(`> chave incorreta. tentativa registrada.`, 'err');
        }
        break;
      }

      case 'tree': {
        const lines = [];
        function walk(node, prefix = '', name = '~') {
          lines.push(`${prefix}${name}${node.type === 'dir' ? '/' : ''}`);
          if (node.type === 'dir') {
            const kids = Object.entries(node.children);
            kids.forEach(([k, v], i) => {
              const last = i === kids.length - 1;
              walk(v, prefix + (last ? '   ' : '│  '), (last ? '└─ ' : '├─ ') + k);
            });
          }
        }
        walk(HACK_FS);
        print(lines.join('\n'), 'out');
        break;
      }

      case 'find': {
        if (!arg) { print('uso: find <termo>', 'err'); break; }
        const results = [];
        function walk(node, path = []) {
          if (node.type === 'dir') {
            Object.entries(node.children).forEach(([k, v]) => walk(v, [...path, k]));
          } else if (path.join('/').toLowerCase().includes(arg.toLowerCase())) {
            results.push('~/' + path.join('/'));
          }
        }
        walk(HACK_FS);
        print(results.length ? results.join('\n') : `(nenhum match para "${arg}")`, results.length ? 'out' : 'warn');
        break;
      }

      case 'stats': {
        const pct = Math.round((shards.size / TOTAL_SHARDS) * 100);
        print(
`╔════════════════════════════════════════════════╗
║   PROGRESSO DA MISSÃO                          ║
╠════════════════════════════════════════════════╣
║   Shards coletados : ${String(shards.size).padStart(2)} / ${TOTAL_SHARDS}                  ║
║   Completude       : ${String(pct).padStart(3)}%                       ║
║   Arquivos .enc    : ${decrypted.size} descriptografado(s)        ║
║   Comandos rodados : ${String(history.length + 1).padStart(3)}                       ║
╚════════════════════════════════════════════════╝`,
          'ok'
        );
        if (shards.size >= TOTAL_SHARDS) {
          print(`\n✓ DOSSIER COMPLETO. Você descobriu quem é o operador.\nachievement unlocked: 🏆  OPERATOR REVEALED`, 'ok');
        }
        break;
      }

      case 'clear':
      case 'cls': {
        setLines([]); break;
      }

      case 'exit':
      case 'quit':
      case 'logout': {
        print('▸ encerrando sessão...', 'cy');
        setTimeout(close, 300);
        break;
      }

      /* Easter eggs */
      case 'sudo': {
        print(`[sudo] senha pra ${arg || 'comando'}: ********\n> permissão negada. você não é root aqui — você é o intruso. 😏`, 'warn'); break;
      }
      case 'vim':
      case 'nvim':
      case 'emacs':
      case 'nano': {
        print(`> não tente abrir um editor dentro de um terminal dentro de um portfolio.\n> você não vai conseguir sair de qualquer jeito.`, 'warn'); break;
      }
      case 'rm': {
        print(`> nope. nice try.`, 'err'); break;
      }
      case 'hello':
      case 'hi':
      case 'oi': {
        print(`olá, runner. digite 'help' pra começar.`, 'cy'); break;
      }
      case 'matrix': {
        print(`> wake up, neo...`, 'gn'); break;
      }
      case 'coffee': {
        print(`☕ ☕ ☕ ☕ ☕ ☕ ☕ ☕\n+1 cup. caffeine level: critical.`, 'yl'); break;
      }
      case 'date': {
        print(new Date().toString(), 'out'); break;
      }
      case 'echo': {
        print(arg || '', 'out'); break;
      }
      case 'man': {
        print(`man: página não encontrada. nem tudo é unix.\ntente 'help'.`, 'warn'); break;
      }

      default:
        print(`${op}: comando não reconhecido. tente 'help'.`, 'err');
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const v = input;
      setInput('');
      run(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const i = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(i); setInput(history[i]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < 0) return;
      const i = histIdx + 1;
      if (i >= history.length) { setHistIdx(-1); setInput(''); }
      else { setHistIdx(i); setInput(history[i]); }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault(); setLines([]);
    } else if (e.key === 'Escape') {
      e.preventDefault(); close();
    }
  };

  if (!open) return null;

  const pct = (shards.size / TOTAL_SHARDS) * 100;
  return (
    <div className="hack-wrap" onClick={() => inputRef.current?.focus()}>
      <div className="hack-frame">
        <div className="hack-titlebar">
          <span className="dot" style={{background:'var(--red)'}}></span>
          <span className="dot" style={{background:'var(--yellow)'}}></span>
          <span className="dot" style={{background:'var(--green)'}}></span>
          <span className="hack-title">daniel3243gg@cyberdeck — /usr/bin/zsh — 120×40</span>
          <div className="hack-progress">
            <span className="lbl">DOSSIER</span>
            <div className="bar"><i style={{width: pct + '%'}}></i></div>
            <span className="val">{shards.size}/{TOTAL_SHARDS}</span>
          </div>
          <button className="hack-close" onClick={close} title="Fechar [ESC]">✕</button>
        </div>
        <div className="hack-log" ref={logRef}>
          {lines.map((l, i) => {
            if (l.kind === 'ls') {
              return (
                <div key={i} className="hack-ls">
                  {l.text.entries.map((e, j) => (
                    <span key={j} className={`hack-ls-item ${e.color}`}>
                      <span className="ico">{e.tag}</span>{e.name}
                    </span>
                  ))}
                </div>
              );
            }
            return <pre key={i} className={`hack-line ${l.kind}`}>{l.text}</pre>;
          })}
          <div className="hack-prompt-row">
            <span className="prompt">
              <span className="usr">runner</span>
              <span className="at">@</span>
              <span className="host">cyberdeck</span>
              <span className="sep">:</span>
              <span className="cwd">{fmtPath(cwd)}</span>
              <span className="sep">$</span>
            </span>
            <input
              ref={inputRef}
              className="hack-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              autoFocus
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
        </div>
        <div className="hack-statusbar">
          <span className="mono" style={{color:'var(--green)'}}>● CONNECTED</span>
          <span className="mono" style={{color:'var(--text-dim)'}}>↑↓ history</span>
          <span className="mono" style={{color:'var(--text-dim)'}}>tab autocomplete *</span>
          <span className="mono" style={{color:'var(--text-dim)'}}>ctrl+l clear</span>
          <span className="mono" style={{marginLeft:'auto', color: shards.size === TOTAL_SHARDS ? 'var(--yellow)' : 'var(--cyan)'}}>
            {shards.size === TOTAL_SHARDS ? '🏆 OPERATOR REVEALED' : `▸ ${shards.size}/${TOTAL_SHARDS} shards`}
          </span>
          <span className="mono" style={{color:'var(--text-mute)'}}>ESC pra sair</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HackGame });

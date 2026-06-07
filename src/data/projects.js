window.DATA = window.DATA || {};

window.DATA.quests = [
  {
    id: 9,
    rarity: "legendary",
    status: "active",
    title: "PontoVision · Ponto Eletrônico com IA",
    img: "assets/img/pontovision.png",
    url: "https://app.pontovision.com.br/dashboard",
    desc: "Sistema empresarial completo de ponto eletrônico: totem Flutter offline-first com reconhecimento facial (FaceNet 128D + ML Kit), BLoC, sqflite e sync automático. API Spring Boot 3.3 com JWT, Flyway migrations, geração de PDF via OpenHTMLToPDF + Thymeleaf, NTP para hora legal brasileira e Google Cloud Storage. Chatbot IA (Mistral) com análise de documentos, relatórios automáticos e fluxo de ações pendentes. Infra 100% Terraform no GCP: Cloud Run, Cloud SQL, GCS, DNS e domínios customizados. JaCoCo ≥ 90% de cobertura.",
    tags: ["Java", "Spring Boot", "Flutter", "BLoC", "FastAPI", "Mistral AI", "FaceNet", "PostgreSQL", "GCP", "Terraform", "Docker", "JWT"],
    rewards: { xp: 5200, gold: 2400, item: "Attendance Architect" }
  },
  {
    id: 10,
    rarity: "epic",
    status: "done",
    title: "Deployed · Agente IA no Microsoft Teams",
    img: "assets/img/hackbot.jpg",
    desc: "Agente IA corporativo integrado ao Microsoft Teams e Jira — batizado de Deployed. FastAPI + Agno + DeepSeek com 30+ ferramentas: CRUD completo de tickets Jira, boards Trello, pesquisa web (DuckDuckGo + trafilatura), análise de PDFs, geração de planilhas e automações via n8n. Memória dupla — global (admin) e contextual por sessão (SQLite). Onboarding automático vinculando Teams ID à conta Jira, cooldown de notificações por ticket e retry com backoff exponencial.",
    tags: ["Python", "FastAPI", "DeepSeek", "Agno", "Jira", "Trello", "Teams", "n8n", "SQLite", "PDF"],
    rewards: { xp: 3200, gold: 1100, item: "Multi-Integration Relay" }
  },
  {
    id: 1,
    rarity: "legendary",
    status: "done",
    title: "CRM Médico · Plataforma com IA",
    img: "assets/img/crm_clinica.jpg",
    desc: "CRM para clínicas médicas em Golang + Echo v4 + GORM + PostgreSQL. Tentei aplicar Clean Architecture, autenticação JWT + API Key, WebSocket e integração com LLMs. Também mexi com infra na Hostinger. Foi o projeto onde mais aprendi sobre estruturar um backend do zero.",
    tags: ["Golang", "Echo", "GORM", "PostgreSQL", "Clean Arch", "JWT", "WebSocket", "LLM", "MCPs"],
    rewards: { xp: 4800, gold: 2000, item: "Backend Architect Sigil" }
  },
  {
    id: 2,
    rarity: "legendary",
    status: "done",
    title: "Nexus Manage · Backend Mercado Livre",
    img: "assets/img/nexus.jpg",
    desc: "Plataforma de gestão para vendedores do Mercado Livre — tentativa de produto próprio. Back-end em FastAPI + Peewee + MySQL. Integrações com APIs externas, automações de vendas, controle de estoque. Aprendi muito sobre o que é construir algo pensando no usuário real.",
    tags: ["FastAPI", "Peewee", "MySQL", "Mercado Livre API"],
    rewards: { xp: 4200, gold: 1800, item: "Founder Token" }
  },
  {
    id: 3,
    rarity: "epic",
    status: "done",
    title: "CSBar · App para Maquininhas Stone",
    img: "assets/img/csbar.jpg",
    desc: "Controle de mesas, tickets e pagamentos para restaurantes e bares — tudo rodando direto na maquininha de cartão Stone. Front-end em Flutter, integração nativa via Platform Channels e cobertura de testes unitários.",
    tags: ["Flutter", "Stone", "Mobile", "Platform Channels"],
    rewards: { xp: 2800, gold: 900, item: "Native Bridge" }
  },
  {
    id: 4,
    rarity: "epic",
    status: "done",
    title: "CsSalão · Mobile para Salões",
    img: "assets/img/cssalao.jpg",
    desc: "Solução de controle para salões de beleza: pessoas, atendimentos, contas e pagamentos. Front-end em Flutter, back-end em Golang com Echo + GORM + MySQL, integração com maquininhas Stone e testes unitários. Roda em mobile e na maquininha.",
    tags: ["Flutter", "Golang", "Echo", "GORM", "MySQL", "Stone"],
    rewards: { xp: 2700, gold: 850 }
  },
  {
    id: 5,
    rarity: "epic",
    status: "done",
    title: "Vértice · Gestão para Micro Empreendedores",
    img: "assets/img/vertice_app.jpg",
    desc: "App mobile completo em Flutter com BLoC, Clean Architecture e princípios SOLID. Gestão de vendas, produtos, dashboard com métricas. Stack: BLoC, Provider, Dio, Freezed, Equatable. Previsão de lançamento na Play Store.",
    tags: ["Flutter", "BLoC", "Clean Arch", "Dio", "Freezed", "SOLID"],
    rewards: { xp: 2600, gold: 800, item: "MEI Compass" }
  },
  {
    id: 6,
    rarity: "rare",
    status: "done",
    title: "ERP FrutNorte · Desktop em Flutter",
    img: "assets/img/frutnorte.jpg",
    desc: "ERP desktop em Flutter + MySQL 15 + GetX. CRUD de pessoas e produtos, controle de entrada/saída e gestão de acessos.",
    tags: ["Flutter", "MySQL", "GetX", "Desktop"],
    rewards: { xp: 2000, gold: 600 }
  },
  {
    id: 7,
    rarity: "rare",
    status: "active",
    title: "Mangás App · Leitor Mobile",
    img: "assets/img/mangas.jpg",
    desc: "App Android/iOS para leitura de mangás conectando a usuários via API online. Três telas principais: recomendações, lançamentos e mangás em andamento.",
    tags: ["Flutter", "Mobile", "API"],
    rewards: { xp: 1800, gold: 500 }
  },
  {
    id: 8,
    rarity: "rare",
    status: "done",
    title: "Discord Bot · Python + Azure",
    img: "assets/img/discordBot.jpeg",
    desc: "Bot Discord totalmente em Python com banco Azure. Jogos integrados (xadrez, truco) e utilidades como envio de e-mails direto do chat sem precisar de plataforma externa.",
    tags: ["Python", "Azure", "Discord API"],
    rewards: { xp: 1500, gold: 400 }
  }
];

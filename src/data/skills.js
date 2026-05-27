window.DATA = window.DATA || {};

// master: true = nó raiz de categoria (exibido maior no grafo)
window.DATA.skillTree = {
  nodes: [
    { id: "core_arch", x: 18, y: 22, color: "yl", master: true, label: "ARCHITECTURE", level: 9,
      title: "Arquitetura & Padrões", sub: "Clean · SOLID · MVC",
      details: [
        "MVC, MVVM, Clean Architecture",
        "SOLID, DRY, KISS",
        "Repository, Factory, Strategy, Observer, Singleton, Adapter"
      ]
    },

    { id: "core_lang", x: 18, y: 50, color: "cy", master: true, label: "LANGUAGES", level: 7,
      title: "Linguagens de Programação", sub: "Stack poliglota",
      details: [
        "Domínio profundo de paradigmas: OOP, funcional, procedural",
        "Foco em código limpo, SOLID, DRY, KISS",
        "Migração fluida entre stacks"
      ]
    },
    { id: "py", x: 8, y: 25, color: "cy", label: "PYTHON", level: 9,
      title: "Python · Avançado", sub: "Automação · Scraping · Data",
      details: [
        "Tipos nativos, estruturas de dados, POO e herança",
        "Requests, Pandas, Beautiful Soup, Seaborn, FastAPI",
        "Automação, raspagem e análise de dados"
      ]
    },
    { id: "php", x: 8, y: 50, color: "cy", label: "PHP", level: 8,
      title: "PHP · Avançado", sub: "Laravel · Yii2",
      details: [
        "Tipos nativos, POO, PDO, tratamento de erros",
        "Laravel e Yii2 — APIs robustas e sistemas web escaláveis",
        "PHPUnit para testes"
      ]
    },
    { id: "js", x: 8, y: 75, color: "cy", label: "JS / TS", level: 7,
      title: "JavaScript · Avançado", sub: "Angular · SPA",
      details: [
        "Tipos nativos e funcionalidades modernas da linguagem",
        "Front-end com HTML, CSS, Bootstrap, SASS/LESS",
        "Angular intermediário: SPA, RxJS, componentes reutilizáveis"
      ]
    },
    { id: "sql", x: 30, y: 25, color: "cy", label: "SQL", level: 8,
      title: "SQL · Avançado", sub: "MySQL · PostgreSQL",
      details: [
        "Modelagem relacional e consultas complexas",
        "Otimização de queries e boas práticas no MySQL/PostgreSQL"
      ]
    },
    { id: "go", x: 30, y: 75, color: "cy", label: "GOLANG", level: 8,
      title: "Golang · Avançado", sub: "Echo · GORM",
      details: [
        "Backends performáticos com Echo Framework v4",
        "GORM para PostgreSQL e MySQL",
        "Clean Architecture e separação de responsabilidades"
      ]
    },

    { id: "core_mobile", x: 50, y: 22, color: "mg", master: true, label: "MOBILE", level: 9,
      title: "Mobile Engineering", sub: "Especialidade principal",
      details: [
        "Foco em apps de produção lançados em campo",
        "UX/UI moderno, performance e integração nativa"
      ]
    },
    { id: "flutter", x: 42, y: 10, color: "mg", label: "FLUTTER", level: 10,
      title: "Dart & Flutter · Expert", sub: "Estado da arte",
      details: [
        "Domínio de widgets e gerenciamento de estado com GetX, Provider, BLoC",
        "Unit / Widget / Integration Tests, Isolates",
        "Platform Channels (Android/iOS) e micro front-ends"
      ]
    },
    { id: "bloc", x: 58, y: 10, color: "mg", label: "BLOC", level: 8,
      title: "BLoC Pattern", sub: "State management",
      details: [
        "Aplicado em Vértice App (gestão para MEIs)",
        "Combinado com Provider, Freezed, Dio, Equatable",
        "Arquitetura escalável e testável"
      ]
    },
    { id: "stone", x: 50, y: 35, color: "mg", label: "STONE NATIVE", level: 7,
      title: "Integração Stone", sub: "Platform Channels",
      details: [
        "Integração nativa com maquininhas Stone (CSBar, CsSalão)",
        "Apps que rodam tanto no celular quanto na maquininha"
      ]
    },

    { id: "core_backend", x: 50, y: 50, color: "yl", master: true, label: "BACKEND", level: 8,
      title: "Backend & APIs", sub: "Servidores que aguentam",
      details: [
        "FastAPI · Echo · Laravel · Yii2",
        "REST · WebSocket · JWT · API Keys",
        "Microservices e arquiteturas distribuídas"
      ]
    },
    { id: "fastapi", x: 50, y: 65, color: "yl", label: "FASTAPI", level: 8,
      title: "FastAPI", sub: "Python async",
      details: [
        "Back-end do Nexus Manage construído sobre FastAPI + Peewee + MySQL",
        "APIs assíncronas, validação com Pydantic"
      ]
    },
    { id: "java", x: 34, y: 65, color: "yl", label: "JAVA · JSF", level: 7,
      title: "Java · JSF · Primefaces", sub: "Engenharia web · stack atual",
      details: [
        "Stack principal na Syngular Systemas (atual)",
        "JSF (JavaServer Faces) + Primefaces para front-end web",
        "JavaScript + jQuery no client side",
        "PostgreSQL como banco relacional"
      ]
    },
    { id: "echo", x: 42, y: 78, color: "yl", label: "ECHO + GORM", level: 8,
      title: "Echo · GORM", sub: "Go web framework",
      details: [
        "CRM Médico em Go com Echo v4 + GORM + PostgreSQL",
        "Middlewares custom, paginação, upload, webhooks",
        "WebSocket em tempo real"
      ]
    },
    { id: "rest", x: 58, y: 78, color: "yl", label: "REST · WS", level: 8,
      title: "APIs REST & WebSocket", sub: "Real-time communication",
      details: [
        "Design de APIs RESTful escaláveis",
        "WebSocket para chat e atualizações em tempo real",
        "Webhooks para automação (n8n, Make, Zapier)"
      ]
    },

    { id: "core_ai", x: 82, y: 22, color: "gn", master: true, label: "AI · LLM", level: 9,
      title: "Inteligência Artificial", sub: "Sistemas com IA generativa",
      details: [
        "Trabalho diário com OpenAI GPT e Anthropic Claude",
        "RAG, embeddings, vector DBs, MCPs"
      ]
    },
    { id: "llm", x: 90, y: 10, color: "gn", label: "LLMS", level: 9,
      title: "Large Language Models", sub: "GPT · Claude",
      details: [
        "Integração via APIs REST (OpenAI, Anthropic)",
        "Aplicações com IA generativa em produção",
        "Chat inteligente 24/7 no CRM Médico"
      ]
    },
    { id: "rag", x: 74, y: 10, color: "gn", label: "RAG", level: 8,
      title: "Retrieval Augmented Generation", sub: "Context retrieval",
      details: [
        "Pipelines RAG completos",
        "Recuperação de contexto relevante",
        "Geração baseada em documentos"
      ]
    },
    { id: "vec", x: 90, y: 35, color: "gn", label: "VECTOR DBS", level: 8,
      title: "Embeddings & Vector DBs", sub: "Pinecone · Weaviate · Chroma",
      details: [
        "Geração e busca de embeddings semânticos",
        "Pinecone, Weaviate, Chroma, Qdrant",
        "Indexação vetorial e queries semânticas"
      ]
    },
    { id: "mcp", x: 74, y: 35, color: "gn", label: "MCPs", level: 8,
      title: "Model Context Protocol", sub: "Tool integration",
      details: [
        "MCPs para integração de contextos e ferramentas com LLMs",
        "Desenvolvimento de servidores MCP",
        "Extensão de capacidades de modelos"
      ]
    },

    { id: "core_cloud", x: 82, y: 55, color: "cy", master: true, label: "AWS · CLOUD", level: 8,
      title: "AWS · GCP · Cloud Operations", sub: "Multi-cloud",
      details: [
        "AWS: IAM · VPC · EC2 · S3 · Route 53",
        "GCP: Cloud Run · Cloud SQL · GCS · Cloud DNS",
        "Terraform para IaC em ambas as clouds",
        "Alta disponibilidade e disaster recovery"
      ]
    },
    { id: "iam", x: 90, y: 70, color: "cy", label: "IAM", level: 8,
      title: "AWS IAM", sub: "Identity & access",
      details: [
        "Usuários, grupos, roles e policies",
        "MFA, access keys, compliance"
      ]
    },
    { id: "vpc", x: 74, y: 70, color: "cy", label: "VPC · EC2", level: 8,
      title: "VPC · EC2", sub: "Networking & compute",
      details: [
        "Subnets pub/priv, Internet/NAT Gateway, SGs, NACLs",
        "AMIs, Elastic IP, EBS, Load Balancers, Auto Scaling",
        "Multi-AZ deployments e failover"
      ]
    },
    { id: "s3", x: 90, y: 90, color: "cy", label: "S3 · R53", level: 7,
      title: "S3 · Route 53", sub: "Storage & DNS",
      details: [
        "Buckets, versioning, lifecycle policies",
        "CloudFront integration, IAM policies",
        "DNS hosted zones, health checks, routing policies"
      ]
    },
    { id: "ha", x: 74, y: 90, color: "cy", label: "HIGH AVAIL", level: 8,
      title: "Alta Disponibilidade", sub: "Multi-AZ · DR",
      details: [
        "Arquiteturas resilientes",
        "Load balancing, failover, backup strategies"
      ]
    },

    { id: "spring", x: 24, y: 82, color: "yl", label: "SPRING BOOT", level: 7,
      title: "Spring Boot · Spring Security", sub: "Java · REST · JWT",
      details: [
        "Spring Boot 3.3, Spring Data JPA, Spring Security",
        "JWT auth com JJWT 0.12, Flyway migrations automáticas",
        "Geração de PDF via OpenHTMLToPDF + Thymeleaf",
        "NTP (Hora Legal Brasileira) e Google Cloud Storage — PontoVision"
      ]
    },

    { id: "docker", x: 60, y: 60, color: "cy", label: "DOCKER", level: 7,
      title: "Docker · Compose", sub: "Containerização",
      details: [
        "Dockerfiles multi-stage para Java (Maven) e Python",
        "Docker Compose orquestrando backend, chatbot e fake GCS",
        "Variáveis de ambiente, volumes e redes customizadas"
      ]
    },

    { id: "terraform", x: 68, y: 80, color: "cy", label: "TERRAFORM", level: 7,
      title: "Terraform · IaC", sub: "GCP provisioning",
      details: [
        "Infra completa do PontoVision provisionada como código",
        "Módulos: Cloud Run, Cloud SQL, GCS bucket, DNS, domínios",
        "Variáveis, outputs, locals e módulos reutilizáveis",
        "State remoto e separação por ambiente (dev/prod)"
      ]
    },

    { id: "gcp", x: 62, y: 88, color: "cy", label: "GCP", level: 7,
      title: "Google Cloud Platform", sub: "Cloud Run · SQL · GCS",
      details: [
        "Cloud Run para deploy de containers serverless",
        "Cloud SQL (PostgreSQL) com socket factory",
        "GCS para documentos, assets e URLs assinadas",
        "Cloud DNS com domínios customizados e health checks"
      ]
    },

    { id: "agents", x: 74, y: 48, color: "gn", label: "AI AGENTS", level: 8,
      title: "Agentes de IA · Agno", sub: "Agentic AI · Tools",
      details: [
        "Framework Agno com 30+ ferramentas plugáveis",
        "Memória persistente SQLite: global (admin) e contextual por sessão",
        "Integração Jira, Trello, web search (DuckDuckGo + trafilatura), PDF",
        "Retry com backoff exponencial, cooldown de notificações, onboarding automático"
      ]
    },

    { id: "core_qa", x: 50, y: 92, color: "mg", master: true, label: "QA · TESTS", level: 8,
      title: "Qualidade & Testes", sub: "Pytest · PHPUnit · JUnit",
      details: [
        "Python (pytest, unittest), PHP (PHPUnit), Java (JUnit)",
        "Golang (testing), Dart (test), Flutter Widget/Integration",
        "Mocking, stubbing, E2E"
      ]
    }
  ],

  edges: [
    ["core_lang", "py"], ["core_lang", "php"], ["core_lang", "js"], ["core_lang", "sql"], ["core_lang", "go"],
    ["core_mobile", "flutter"], ["core_mobile", "bloc"], ["core_mobile", "stone"],
    ["core_backend", "fastapi"], ["core_backend", "echo"], ["core_backend", "rest"], ["core_backend", "java"],
    ["core_ai", "llm"], ["core_ai", "rag"], ["core_ai", "vec"], ["core_ai", "mcp"],
    ["core_cloud", "iam"], ["core_cloud", "vpc"], ["core_cloud", "s3"], ["core_cloud", "ha"],
    ["java", "spring"], ["core_backend", "docker"], ["docker", "core_cloud"],
    ["core_cloud", "terraform"], ["core_cloud", "gcp"],
    ["core_ai", "agents"],
    ["core_lang", "core_arch"],
    ["core_arch", "core_mobile"],
    ["core_mobile", "core_backend"],
    ["core_backend", "core_qa"],
    ["core_backend", "core_ai"],
    ["core_ai", "core_cloud"],
    ["core_lang", "core_backend"],
    ["go", "core_backend"],
    ["py", "core_ai"]
  ]
};

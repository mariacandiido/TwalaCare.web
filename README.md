# TwalaCare - Plataforma de Farmácia Online

TwalaCare é uma plataforma completa de e-commerce farmacêutico desenvolvida em React com TypeScript, permitindo que clientes comprem medicamentos online de múltiplas farmácias, com suporte a entrega rápida e gestão de pedidos em tempo real.

## 🚀 Características Principais

### Para Clientes

- 🛒 Catálogo de medicamentos com filtros por categoria, provincia e farmácia
- 🛍️ Carrinho de compras inteligente
- 📋 Multi-step checkout com validação de receita médica
- 📱 Rastreamento de pedidos em tempo real
- 👤 Gerenciamento de perfil e endereço
- 💳 Múltiplos métodos de pagamento (Multicaixa, Unitel, Entrega)

### Para Farmácias

- 📊 Dashboard com estatísticas de vendas
- 📦 Gerenciamento de produtos e estoque
- 📈 Acompanhamento de pedidos
- ⭐ Avaliação média de clientes
- 👨‍💼 Perfil e informações da farmácia

### Para Entregadores

- 🚚 Visualização de entregas disponíveis
- 📍 Rastreamento de rota
- 💰 Acompanhamento de ganhos
- ⭐ Avaliação de desempenho
- 👤 Gerenciamento de perfil

### Para Administradores

- 👥 Gerenciamento completo de usuários
- 🏥 Aprovação de farmácias
- 📊 Relatórios e análises
- 🔐 Controle de acesso e permissões
- ⚙️ Configurações do sistema

## 🛠️ Stack Tecnológico

### Frontend

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápido
- **Tailwind CSS v4** - Styling utility-first
- **React Router** - Roteamento
- **Zustand** - Gerenciamento de estado
- **React Hook Form** - Gerenciamento de formulários
- **Radix UI** - Componentes base acessíveis
- **Lucide React** - Ícones SVG
- **Recharts** - Gráficos e análises

### Ferramentas de Desenvolvimento

- **ESLint** - Linting
- **Prettier** - Code formatting
- **TypeScript Compiler** - Verificação de tipos

## 📦 Instalação

### Pré-requisitos

- Node.js 16+
- npm 8+

### Setup

```bash
# Clonar repositório
git clone <repo-url>
cd ProjectoMC-main

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

O projeto estará disponível em `http://localhost:5173`

**Painel Admin:** Para ver farmácias e entregadores criados no site (registo), aceda ao admin **na mesma aplicação**: `http://localhost:5173/admin`. Se usar `npm run dev:admin` (porta 5174), os dados de registo não aparecem porque o localStorage é diferente por origem.

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── admin/           # Componentes de Admin
│   ├── cliente/         # Componentes de Cliente
│   ├── entregador/      # Componentes de Entregador
│   ├── farmacia/        # Componentes de Farmácia
│   ├── layout/          # Componentes de Layout
│   ├── ui/              # Componentes UI reutilizáveis
│   └── [pages]          # Páginas principais
├── hooks/               # Custom Hooks
├── services/            # Serviços de API
├── store/               # Zustand stores
├── types/               # TypeScript interfaces
├── utils/               # Funções utilitárias
├── styles/              # CSS global
└── [config files]
```

## 🔐 Autenticação

O projeto implementa autenticação mock para demonstração. Credenciais de teste:

### Cliente

- Email: `joao@example.com`
- Tipo: Cliente

### Farmácia

- Email: `central@pharmacy.com`
- Tipo: Farmácia

### Entregador

- Email: `carlos@delivery.com`
- Tipo: Entregador

### Admin

- Email: `admin@twalcare.com`
- Tipo: Administrador

**Obs**: A senha pode ser qualquer valor (mock).

## 📚 Rotas da Aplicação

### Públicas

```
GET  /                    # Home
GET  /login               # Login
GET  /farmacos            # Catálogo de Medicamentos
GET  /farmacias           # Farmácias
GET  /sobre-nos           # Sobre Nós
GET  /faq                 # Perguntas Frequentes
GET  /carrinho            # Carrinho
GET  /checkout            # Checkout
```

### Cliente (Autenticado)

```
GET  /cliente/dashboard   # Dashboard
GET  /cliente/pedidos     # Meus Pedidos
GET  /cliente/perfil      # Meu Perfil
```

### Farmácia (Autenticado)

```
GET  /farmacia/dashboard  # Dashboard
GET  /farmacia/produtos   # Produtos
GET  /farmacia/pedidos    # Pedidos
GET  /farmacia/perfil     # Perfil
```

### Entregador (Autenticado)

```
GET  /entregador/dashboard    # Dashboard
GET  /entregador/entregas     # Entregas
GET  /entregador/perfil       # Perfil
```

### Admin (Autenticado)

```
GET  /admin/dashboard     # Dashboard
GET  /admin/usuarios      # Gerenciar Usuários
GET  /admin/perfil        # Perfil
```

## 📊 Componentes Principais

### Páginas

- **Home** - Página inicial com carrossel e destaques
- **Farmacos** - Catálogo de medicamentos com filtros
- **Farmacias** - Listagem de farmácias
- **Checkout** - Multi-step checkout

### Dashboards

- **ClienteDashboard** - Visão geral de pedidos
- **FarmaciaDashboard** - Vendas e pedidos
- **EntregadorDashboard** - Entregas do dia
- **AdminDashboard** - Métricas gerais

### Componentes UI

- Botões, Inputs, Cards
- Tabelas, Diálogos, Drawers
- Abas, Dropdowns, Menus
- Forms e Validações

## 🎯 Funcionalidades Implementadas

✅ Autenticação mock com diferentes tipos de usuário
✅ Catálogo de medicamentos com busca avançada
✅ Carrinho de compras com persistência
✅ Checkout multi-step
✅ Validação de receita médica
✅ Gestão de pedidos
✅ Rastreamento de entregas
✅ Dashboards por tipo de usuário
✅ Gerenciamento de perfil
✅ Responsivo mobile-first
✅ Acessibilidade (WCAG 2.1)

## 🚧 Próximas Implementações

- [ ] Integração com API backend
- [ ] Autenticação real com JWT
- [ ] Notificações push
- [ ] Mapa interativo de rastreamento
- [ ] Sistema de avaliações e comentários
- [ ] Recomendações personalizadas
- [ ] Dark mode
- [ ] Internacionalização (i18n)
- [ ] Progressive Web App (PWA)

## 🐛 Troubleshooting

### Erro de compilação TypeScript

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Porta 5173 já em uso

```bash
npm run dev -- --port 3000
```

## 📝 Linters e Formatação

```bash
# Verificar erros
npm run lint

# Formatar código
npm run format
```

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License.

## 👥 Autores

- Desenvolvedor - [Your Name]
- Design - [Your Name]

## 📧 Suporte

Para suporte, envie um email para support@twalcare.com ou abra uma issue no repositório.

---

**Desenvolvido com ❤️ para Angola**

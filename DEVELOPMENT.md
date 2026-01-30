# Configuração de Ambiente

## Desenvolvimento

Para rodar o projeto em desenvolvimento:

```bash
npm install
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## Build para Produção

```bash
npm run build
```

## Estrutura do Projeto

### `/src/components`

- **Componentes de Página**: Home.tsx, Farmacos.tsx, Farmacias.tsx, etc.
- **Layout**: DashboardLayout.tsx, Header.tsx, Navbar.tsx, Footer.tsx
- **Cliente**: ClienteDashboard.tsx, ClientePedidos.tsx, ClientePerfil.tsx
- **Farmácia**: FarmaciaDashboard.tsx, FarmaciaProdutos.tsx, FarmaciaPedidos.tsx, FarmaciaPerfil.tsx
- **Entregador**: EntregadorDashboard.tsx, EntregadorEntregas.tsx, EntregadorPerfil.tsx
- **Admin**: AdminDashboard.tsx, AdminUsuarios.tsx, AdminPerfil.tsx
- **UI**: Componentes shadcn/ui reutilizáveis

### `/src/store`

- **Zustand Stores**: cartStore.ts, usuariosStore.ts
  - Gerenciamento de estado global (carrinho, usuários)

### `/src/services`

- **API Services**:
  - authService.ts - Autenticação (login, register, logout)
  - medicamentoService.ts - Medicamentos (busca, filtros)
  - pedidoService.ts - Pedidos (CRUD)

### `/src/hooks`

- Hooks customizados: useAuth.ts, usePedidos.ts
- Lógica reutilizável para componentes

### `/src/types`

- Tipos TypeScript: index.ts
- Interfaces para User, Medicamento, Pedido, etc.

### `/src/utils`

- Funções utilitárias: formatting.ts
- Formatação de datas, moeda, validações

### `/src/styles`

- CSS global e configurações Tailwind

## Rotas da Aplicação

### Públicas

- `/` - Home
- `/login` - Login
- `/farmacos` - Catálogo de Medicamentos
- `/farmacias` - Farmácias
- `/sobre-nos` - Sobre Nós
- `/faq` - Perguntas Frequentes
- `/carrinho` - Carrinho de Compras
- `/checkout` - Checkout

### Cliente

- `/cliente/dashboard` - Dashboard
- `/cliente/pedidos` - Meus Pedidos
- `/cliente/perfil` - Perfil

### Farmácia

- `/farmacia/dashboard` - Dashboard
- `/farmacia/produtos` - Gestão de Produtos
- `/farmacia/pedidos` - Pedidos
- `/farmacia/perfil` - Perfil

### Entregador

- `/entregador/dashboard` - Dashboard
- `/entregador/entregas` - Entregas
- `/entregador/perfil` - Perfil

### Admin

- `/admin/dashboard` - Dashboard
- `/admin/usuarios` - Gerenciar Usuários
- `/admin/perfil` - Perfil

## Funcionalidades Implementadas

✅ **Autenticação Mock**: Login com diferentes tipos de usuário
✅ **Catálogo de Medicamentos**: Busca, filtros por categoria, província, farmácia
✅ **Carrinho de Compras**: Adicionar/remover itens, atualizar quantidades
✅ **Checkout**: Multi-step com endereço, receita médica, pagamento
✅ **Dashboards**: Para Cliente, Farmácia, Entregador e Admin
✅ **Gerenciamento de Perfis**: Edição de dados pessoais
✅ **Pedidos**: Visualização e rastreamento
✅ **Entregas**: Gerenciamento de entregas
✅ **Usuários**: Gerenciamento de usuários (Admin)

## Tecnologias Utilizadas

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS v4** - Styling
- **React Router** - Roteamento
- **Zustand** - State Management
- **React Hook Form** - Formulários
- **Lucide React** - Ícones
- **Radix UI** - Componentes base
- **Vite** - Build tool

## Próximas Implementações

- [ ] Integração com API backend
- [ ] Autenticação real com JWT
- [ ] Notificações em tempo real
- [ ] Rastreamento de entrega em mapa
- [ ] Sistema de avaliações
- [ ] Histórico de pedidos
- [ ] Recomendações personalizadas

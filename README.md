# Gov Monitor Dashboard

Sistema de monitoramento e gestão de fábricas e alertas ambientais.

## 📋 Descrição

O Gov Monitor Dashboard é uma aplicação web desenvolvida para monitorar e gerenciar fábricas, seus níveis de emissão de CO2 e alertas ambientais. O sistema permite o acompanhamento em tempo real do status das fábricas, conformidade ambiental e gestão de alertas.

## 🚀 Funcionalidades

### Dashboard
- Visão geral do sistema com cards informativos
- Total de fábricas monitoradas
- Alertas ativos
- Fábricas irregulares (emissão acima do limite)
- Total de inspeções realizadas
- Lista de alertas recentes
- Lista de fábricas monitoradas

### Fábricas
- Listagem de todas as fábricas
- Filtros por status e busca por texto
- Visualização detalhada de cada fábrica
- Edição de informações
- Histórico de inspeções
- Monitoramento de emissão de CO2
- Indicador de conformidade ambiental
- Status de ativação/desativação

### Alertas
- Listagem de todos os alertas
- Filtros por status e severidade
- Busca por texto
- Visualização detalhada de cada alerta
- Gestão de status (Pendente, Em Andamento, Notificado, Resolvido)
- Histórico de ações realizadas

## 🛠️ Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Prisma (ORM)
- PostgreSQL
- Tailwind CSS
- Shadcn/ui
- NextAuth.js
- Lucide Icons

## 📦 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Preencha as variáveis no arquivo `.env` com suas configurações.

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Popule o banco de dados com dados iniciais:
```bash
npx prisma db seed
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔧 Configuração do Banco de Dados

O projeto utiliza PostgreSQL como banco de dados. Certifique-se de ter um servidor PostgreSQL rodando e configure as seguintes variáveis de ambiente:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/gov_monitor"
```

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

#### Industry (Fábricas)
- id: Identificador único
- name: Nome da fábrica
- location: Localização
- status: Status (active/inactive)
- type: Tipo de indústria
- capacity: Capacidade
- description: Descrição
- maxCO2Emission: Emissão máxima de CO2 permitida
- currentCO2Emission: Emissão atual de CO2
- compliance: Percentual de conformidade
- lastInspection: Data da última inspeção

#### Alert (Alertas)
- id: Identificador único
- title: Título do alerta
- description: Descrição
- severity: Severidade (critical/high/medium/low)
- status: Status (pending/in_progress/notified/resolved)
- createdAt: Data de criação
- resolvedAt: Data de resolução
- details: Detalhes técnicos
- actions: Ações realizadas
- industryId: Referência à fábrica

## 🔐 Autenticação

O sistema utiliza NextAuth.js para autenticação. Configure as seguintes variáveis de ambiente:

```env
NEXTAUTH_SECRET="seu_secret_aqui"
NEXTAUTH_URL="http://localhost:3000"
```

## 🎨 Interface

### Cores e Status

#### Status de Fábricas
- Ativo: Verde
- Inativo: Cinza

#### Status de Alertas
- Pendente: Amarelo
- Em Andamento: Azul
- Notificado: Vermelho
- Resolvido: Verde

#### Severidade de Alertas
- Crítico: Vermelho
- Alto: Laranja
- Médio: Amarelo
- Baixo: Verde

#### Conformidade
- < 75%: Verde
- 75-100%: Amarelo
- > 100%: Vermelho

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Desktop: Layout completo
- Tablet: Layout adaptado
- Mobile: Layout simplificado

## 🔄 Atualizações em Tempo Real

- Atualização automática dos dados a cada 5 minutos
- Botão de atualização manual disponível
- Indicador de última atualização

## 📈 Monitoramento

### Métricas Principais
- Total de fábricas
- Alertas ativos
- Fábricas irregulares
- Total de inspeções

### Indicadores de Conformidade
- Percentual de emissão de CO2
- Status de alertas
- Histórico de inspeções

## 🔍 Busca e Filtros

### Fábricas
- Busca por nome, localização, tipo
- Filtro por status (Ativo/Inativo)

### Alertas
- Busca por título, descrição, fábrica
- Filtro por status e severidade

## 📄 Paginação

- 4 itens por página na lista de fábricas
- 3 itens por página na lista de alertas
- Navegação entre páginas
- Contador de itens exibidos

## 🚨 Alertas

### Tipos de Alertas
- Emissão de CO2
- Vazamento de produtos químicos
- Falha em sistemas
- Contaminação
- Temperatura

### Gestão de Alertas
- Criação automática
- Atualização de status
- Notificações
- Histórico de ações

## 🔧 Manutenção

### Banco de Dados
```bash
# Criar nova migração
npx prisma migrate dev

# Atualizar schema
npx prisma generate

# Resetar banco de dados
npx prisma db reset
```

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar em produção
npm start
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 
# 🚀 Guia de Deploy na Vercel - AvalaiAi

Este guia detalha como fazer o deploy do projeto AvalaiAi na Vercel.

## 📋 Pré-requisitos

- [ ] Conta na [Vercel](https://vercel.com)
- [ ] Conta no [Supabase](https://supabase.com)
- [ ] Projeto configurado no Supabase
- [ ] Código do projeto no GitHub (recomendado)

## 🗄️ 1. Configuração do Banco de Dados

### 1.1 Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Crie uma nova organização (se necessário)
4. Clique em "New Project"
5. Preencha:
   - **Name**: `avalaiai-db` (ou nome de sua escolha)
   - **Database Password**: Crie uma senha forte
   - **Region**: Escolha a região mais próxima (ex: South America)
6. Clique em "Create new project"

### 1.2 Executar Schema do Banco

1. Aguarde o projeto ser criado (pode levar alguns minutos)
2. No painel do Supabase, vá para **SQL Editor**
3. Clique em "New query"
4. Copie todo o conteúdo do arquivo `database-schema.sql`
5. Cole no editor SQL
6. Clique em "Run" para executar o script
7. Verifique se todas as tabelas foram criadas em **Table Editor**

### 1.3 Obter Credenciais

1. Vá para **Settings** > **API**
2. Copie os seguintes valores:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** key (chave pública)

## 🚀 2. Deploy na Vercel

### Método 1: Deploy via GitHub (Recomendado)

#### 2.1 Preparar Repositório

1. Crie um repositório no GitHub
2. Faça push do código:
```bash
git init
git add .
git commit -m "Initial commit - AvalaiAi"
git branch -M main
git remote add origin https://github.com/seu-usuario/avalai-ai.git
git push -u origin main
```

#### 2.2 Conectar na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Selecione o repositório `avalai-ai`
5. Configure o projeto:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (padrão)
   - **Build Command**: `npm run build` (padrão)
   - **Output Directory**: `dist` (padrão)

#### 2.3 Configurar Variáveis de Ambiente

1. Na seção "Environment Variables", adicione:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_publica_aqui
```

2. Clique em "Deploy"

### Método 2: Deploy via CLI

#### 2.1 Instalar CLI da Vercel

```bash
npm i -g vercel
```

#### 2.2 Fazer Login

```bash
vercel login
```

#### 2.3 Deploy

```bash
vercel
```

Siga as instruções:
- **Set up and deploy**: Yes
- **Which scope**: Sua conta
- **Link to existing project**: No
- **Project name**: `avalai-ai`
- **Directory**: `./`
- **Override settings**: No

#### 2.4 Configurar Variáveis de Ambiente

```bash
vercel env add VITE_SUPABASE_URL
# Cole a URL do Supabase

vercel env add VITE_SUPABASE_ANON_KEY
# Cole a chave pública
```

#### 2.5 Redeploy com Variáveis

```bash
vercel --prod
```

## ✅ 3. Verificação do Deploy

### 3.1 Testar o Site

1. Acesse a URL fornecida pela Vercel
2. Verifique se:
   - [ ] Site carrega corretamente
   - [ ] Design está responsivo
   - [ ] Navegação funciona
   - [ ] Busca está visível
   - [ ] Não há erros no console

### 3.2 Testar Conexão com Banco

1. Abra o console do navegador (F12)
2. Vá para a aba "Network"
3. Tente usar alguma funcionalidade que acesse o banco
4. Verifique se não há erros de CORS ou conexão

## 🔧 4. Configurações Avançadas

### 4.1 Domínio Customizado

1. Na Vercel Dashboard, vá para o projeto
2. Clique em "Settings" > "Domains"
3. Adicione seu domínio customizado
4. Configure os DNS conforme instruções

### 4.2 Analytics

1. Na Vercel Dashboard, vá para "Analytics"
2. Ative o Vercel Analytics
3. Adicione o script no projeto se necessário

### 4.3 Monitoramento

1. Configure alertas de uptime
2. Monitore performance
3. Configure logs de erro

## 🐛 5. Solução de Problemas

### Build Falha

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Erro de Variáveis de Ambiente

1. Verifique se as variáveis estão corretas
2. Certifique-se que começam com `VITE_`
3. Redeploy após adicionar variáveis

### Erro de CORS

1. Verifique configurações do Supabase
2. Adicione domínio da Vercel nas configurações do Supabase

### Erro 404 em Rotas

1. Verifique se `vercel.json` está configurado
2. Confirme se rewrites estão corretos

## 📊 6. Monitoramento Pós-Deploy

### Métricas Importantes

- **Core Web Vitals**
- **Tempo de carregamento**
- **Taxa de erro**
- **Uptime**

### Ferramentas Recomendadas

- Vercel Analytics
- Google Analytics
- Sentry (para erros)
- Uptime Robot (monitoramento)

## 🔄 7. Atualizações Futuras

### Deploy Automático

Com GitHub conectado:
1. Faça push para `main`
2. Deploy automático será executado
3. Verifique na Vercel Dashboard

### Deploy Manual

```bash
vercel --prod
```

## 📞 8. Suporte

Se encontrar problemas:

1. Verifique logs na Vercel Dashboard
2. Consulte documentação da Vercel
3. Verifique configurações do Supabase
4. Entre em contato com suporte se necessário

---

✅ **Parabéns!** Seu projeto AvalaiAi está agora online e pronto para uso!


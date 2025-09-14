# AvalaiAi - Avaliação Inteligente de Produtos

Uma plataforma moderna e inteligente para comparar produtos e avaliações de diversas lojas online como Amazon, Mercado Livre, Shopee e muito mais.

## 🚀 Características

- **Design Responsivo**: Interface moderna que funciona perfeitamente em desktop e mobile
- **Busca Inteligente**: Encontre produtos em múltiplas lojas com busca alimentada por IA
- **Comparação de Preços**: Compare preços em tempo real entre diferentes lojas
- **Análise de Avaliações**: IA analisa milhares de avaliações para dar insights precisos
- **Verificação de Qualidade**: Detecta avaliações falsas e garante informações confiáveis

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Database**: Supabase (PostgreSQL)
- **Deploy**: Vercel

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd avalai-ai
```

2. Instale as dependências:
```bash
npm install
# ou
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Configure suas credenciais do Supabase no arquivo `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🗄️ Configuração do Banco de Dados

1. Crie um novo projeto no [Supabase](https://supabase.com)
2. Execute o script SQL em `database-schema.sql` no SQL Editor do Supabase
3. Configure as variáveis de ambiente com as credenciais do seu projeto

## 🚀 Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
pnpm run dev
```

O site estará disponível em `http://localhost:5173`

## 📱 Deploy na Vercel

### Método 1: Via CLI da Vercel

1. Instale a CLI da Vercel:
```bash
npm i -g vercel
```

2. Faça login na Vercel:
```bash
vercel login
```

3. Deploy o projeto:
```bash
vercel
```

### Método 2: Via GitHub

1. Faça push do código para um repositório GitHub
2. Conecte o repositório na [Vercel Dashboard](https://vercel.com/dashboard)
3. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automático será feito a cada push

## 🏗️ Estrutura do Projeto

```
avalai-ai/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes React
│   │   └── ui/            # Componentes UI (shadcn/ui)
│   ├── lib/               # Utilitários e configurações
│   │   └── supabase.js    # Configuração do Supabase
│   ├── App.jsx            # Componente principal
│   ├── App.css            # Estilos globais
│   └── main.jsx           # Ponto de entrada
├── database-schema.sql     # Schema do banco de dados
├── vercel.json            # Configuração da Vercel
└── README.md              # Documentação
```

## 🎨 Componentes Principais

- **Header**: Navegação responsiva com menu mobile
- **HeroSection**: Seção principal com busca
- **FeaturesSection**: Características da plataforma
- **PopularProductsSection**: Produtos em destaque
- **StatsSection**: Estatísticas da plataforma
- **Footer**: Rodapé com links e informações

## 🔧 Configurações Importantes

### Supabase
- Row Level Security (RLS) habilitado
- Políticas de segurança configuradas
- Schema otimizado para performance

### Vercel
- Build automático configurado
- Redirects para SPA configurados
- Headers CORS configurados

## 📊 Schema do Banco de Dados

O projeto inclui um schema completo com:

- **users**: Usuários da plataforma
- **stores**: Lojas parceiras (Amazon, Mercado Livre, etc.)
- **categories**: Categorias de produtos
- **products**: Produtos cadastrados
- **product_offers**: Ofertas de produtos por loja
- **reviews**: Avaliações de produtos
- **favorites**: Produtos favoritos dos usuários
- **comparisons**: Comparações de produtos
- **ai_analysis**: Análises de IA
- **price_history**: Histórico de preços

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato através do email: suporte@avalaiai.com

---

Desenvolvido com ❤️ para ajudar você a tomar melhores decisões de compra!


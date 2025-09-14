import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Search, Star, TrendingUp, Shield, Users, Award, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import './App.css'

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">AvalaiAi</h1>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Início
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Produtos
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Comparar
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Sobre
              </a>
            </div>
          </nav>

          <div className="hidden md:block">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Começar Agora
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <a href="#" className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
              Início
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
              Produtos
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
              Comparar
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
              Sobre
            </a>
            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
              Começar Agora
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

// Hero Section
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Avaliações Inteligentes de
            <span className="text-blue-600"> Produtos</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Compare preços e avaliações de produtos das principais lojas online como Amazon, Mercado Livre, Shopee e muito mais. 
            Tome decisões de compra mais inteligentes com nossa IA.
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Busque por qualquer produto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700">
                Buscar
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="flex items-center">
              <Shield className="h-4 w-4 mr-1 text-green-500" />
              Avaliações Verificadas
            </span>
            <span className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-blue-500" />
              Preços Atualizados
            </span>
            <span className="flex items-center">
              <Award className="h-4 w-4 mr-1 text-yellow-500" />
              IA Avançada
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: "Busca Inteligente",
      description: "Encontre produtos em múltiplas lojas com nossa busca alimentada por IA"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Comparação de Preços",
      description: "Compare preços em tempo real entre Amazon, Mercado Livre, Shopee e outras"
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      title: "Análise de Avaliações",
      description: "IA analisa milhares de avaliações para dar insights precisos"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Verificação de Qualidade",
      description: "Detectamos avaliações falsas e garantimos informações confiáveis"
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "Comunidade Ativa",
      description: "Milhões de usuários compartilhando experiências reais"
    },
    {
      icon: <Award className="h-8 w-8 text-red-600" />,
      title: "Recomendações Personalizadas",
      description: "Sugestões baseadas no seu histórico e preferências"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher o AvalaiAi?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma utiliza inteligência artificial avançada para oferecer as melhores recomendações de produtos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Popular Products Section
const PopularProductsSection = () => {
  const products = [
    {
      name: "iPhone 15 Pro",
      category: "Smartphones",
      rating: 4.8,
      reviews: 2847,
      price: "R$ 7.999",
      stores: ["Amazon", "Mercado Livre", "Magazine Luiza"],
      image: "/api/placeholder/300/200"
    },
    {
      name: "Samsung Galaxy S24",
      category: "Smartphones", 
      rating: 4.7,
      reviews: 1923,
      price: "R$ 4.299",
      stores: ["Shopee", "Amazon", "Casas Bahia"],
      image: "/api/placeholder/300/200"
    },
    {
      name: "MacBook Air M3",
      category: "Notebooks",
      rating: 4.9,
      reviews: 1456,
      price: "R$ 9.999",
      stores: ["Amazon", "Apple Store", "Fast Shop"],
      image: "/api/placeholder/300/200"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Produtos Mais Avaliados
          </h2>
          <p className="text-xl text-gray-600">
            Veja os produtos com melhor custo-benefício segundo nossa IA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg"></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">{product.category}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} avaliações)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-green-600">{product.price}</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Comparar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {product.stores.map((store, storeIndex) => (
                    <Badge key={storeIndex} variant="outline" className="text-xs">
                      {store}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            Ver Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  )
}

// Stats Section
const StatsSection = () => {
  const stats = [
    { number: "10M+", label: "Produtos Analisados" },
    { number: "500K+", label: "Usuários Ativos" },
    { number: "50+", label: "Lojas Parceiras" },
    { number: "99.9%", label: "Precisão da IA" }
  ]

  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Números que Impressionam
          </h2>
          <p className="text-xl text-blue-100">
            Milhões de pessoas confiam no AvalaiAi para suas decisões de compra
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-blue-100 text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">AvalaiAi</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              A plataforma mais inteligente para comparar produtos e tomar decisões de compra informadas. 
              Utilizamos IA avançada para analisar milhões de produtos e avaliações.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                Facebook
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                Twitter
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                Instagram
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Produto</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Buscar Produtos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Comparar Preços</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Avaliações IA</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Carreiras</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 AvalaiAi. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <FeaturesSection />
              <PopularProductsSection />
              <StatsSection />
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App


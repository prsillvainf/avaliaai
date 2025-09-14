-- AvalaiAi Database Schema
-- This is a completely independent database schema for the AvalaiAi project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stores table (Amazon, Mercado Livre, Shopee, etc.)
CREATE TABLE stores (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    api_endpoint TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id),
    brand VARCHAR(255),
    model VARCHAR(255),
    sku VARCHAR(255),
    image_url TEXT,
    images JSONB DEFAULT '[]',
    specifications JSONB DEFAULT '{}',
    features JSONB DEFAULT '[]',
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product offers table (prices from different stores)
CREATE TABLE product_offers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    store_id UUID REFERENCES stores(id),
    external_id VARCHAR(255), -- Store's internal product ID
    url TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount_percentage DECIMAL(5,2),
    currency VARCHAR(3) DEFAULT 'BRL',
    availability VARCHAR(50) DEFAULT 'in_stock',
    shipping_info JSONB DEFAULT '{}',
    seller_info JSONB DEFAULT '{}',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(product_id, store_id, external_id)
);

-- Reviews table
CREATE TABLE reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    store_id UUID REFERENCES stores(id),
    external_review_id VARCHAR(255), -- Original review ID from store
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(500),
    comment TEXT,
    pros JSONB DEFAULT '[]',
    cons JSONB DEFAULT '[]',
    verified_purchase BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    total_votes INTEGER DEFAULT 0,
    ai_sentiment_score DECIMAL(3,2), -- AI-analyzed sentiment (-1 to 1)
    ai_summary TEXT, -- AI-generated summary
    is_verified BOOLEAN DEFAULT false, -- Verified by AI as legitimate
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User favorites
CREATE TABLE favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, product_id)
);

-- Product comparisons
CREATE TABLE comparisons (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    product_ids JSONB NOT NULL, -- Array of product IDs
    criteria JSONB DEFAULT '{}', -- Comparison criteria and weights
    ai_recommendation JSONB DEFAULT '{}', -- AI-generated recommendation
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search history
CREATE TABLE search_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    query VARCHAR(500) NOT NULL,
    filters JSONB DEFAULT '{}',
    results_count INTEGER DEFAULT 0,
    clicked_product_id UUID REFERENCES products(id),
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI analysis results
CREATE TABLE ai_analysis (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    analysis_type VARCHAR(100) NOT NULL, -- 'review_summary', 'price_prediction', 'quality_score'
    analysis_data JSONB NOT NULL,
    confidence_score DECIMAL(3,2),
    model_version VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(product_id, analysis_type)
);

-- Price history for tracking
CREATE TABLE price_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_offer_id UUID REFERENCES product_offers(id) ON DELETE CASCADE,
    price DECIMAL(10,2) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_rating ON products(rating DESC);
CREATE INDEX idx_products_name ON products USING gin(to_tsvector('portuguese', name));
CREATE INDEX idx_product_offers_product ON product_offers(product_id);
CREATE INDEX idx_product_offers_store ON product_offers(store_id);
CREATE INDEX idx_product_offers_price ON product_offers(price);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created ON reviews(created_at DESC);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_search_history_user ON search_history(user_id);
CREATE INDEX idx_search_history_query ON search_history USING gin(to_tsvector('portuguese', query));
CREATE INDEX idx_price_history_offer ON price_history(product_offer_id);
CREATE INDEX idx_price_history_date ON price_history(recorded_at DESC);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

-- Users can only see and edit their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Favorites policies
CREATE POLICY "Users can view own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);

-- Comparisons policies
CREATE POLICY "Users can view own comparisons" ON comparisons FOR SELECT USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "Users can insert own comparisons" ON comparisons FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comparisons" ON comparisons FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comparisons" ON comparisons FOR DELETE USING (auth.uid() = user_id);

-- Search history policies
CREATE POLICY "Users can view own search history" ON search_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own search history" ON search_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access for main tables
CREATE POLICY "Public read access for stores" ON stores FOR SELECT USING (true);
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for product_offers" ON product_offers FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read access for ai_analysis" ON ai_analysis FOR SELECT USING (true);
CREATE POLICY "Public read access for price_history" ON price_history FOR SELECT USING (true);

-- Insert sample data
INSERT INTO stores (name, slug, logo_url, website_url) VALUES
('Amazon', 'amazon', 'https://logo.clearbit.com/amazon.com', 'https://amazon.com.br'),
('Mercado Livre', 'mercado-livre', 'https://logo.clearbit.com/mercadolivre.com.br', 'https://mercadolivre.com.br'),
('Shopee', 'shopee', 'https://logo.clearbit.com/shopee.com.br', 'https://shopee.com.br'),
('Magazine Luiza', 'magazine-luiza', 'https://logo.clearbit.com/magazineluiza.com.br', 'https://magazineluiza.com.br'),
('Casas Bahia', 'casas-bahia', 'https://logo.clearbit.com/casasbahia.com.br', 'https://casasbahia.com.br'),
('Apple Store', 'apple-store', 'https://logo.clearbit.com/apple.com', 'https://apple.com/br'),
('Fast Shop', 'fast-shop', 'https://logo.clearbit.com/fastshop.com.br', 'https://fastshop.com.br');

INSERT INTO categories (name, slug, description, icon) VALUES
('Smartphones', 'smartphones', 'Celulares e smartphones', 'smartphone'),
('Notebooks', 'notebooks', 'Notebooks e laptops', 'laptop'),
('Tablets', 'tablets', 'Tablets e iPads', 'tablet'),
('Eletrônicos', 'eletronicos', 'Eletrônicos em geral', 'zap'),
('Casa e Jardim', 'casa-jardim', 'Produtos para casa e jardim', 'home'),
('Moda', 'moda', 'Roupas e acessórios', 'shirt'),
('Esportes', 'esportes', 'Artigos esportivos', 'dumbbell'),
('Livros', 'livros', 'Livros e e-books', 'book'),
('Games', 'games', 'Jogos e consoles', 'gamepad2'),
('Beleza', 'beleza', 'Produtos de beleza e cuidados pessoais', 'sparkles');


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema types for TypeScript (optional)
export const TABLES = {
  PRODUCTS: 'products',
  REVIEWS: 'reviews', 
  STORES: 'stores',
  USERS: 'users',
  FAVORITES: 'favorites',
  COMPARISONS: 'comparisons'
}

// Helper functions for common database operations
export const productService = {
  // Get all products
  async getProducts() {
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .select(`
        *,
        stores (name, logo_url),
        reviews (rating, comment, created_at)
      `)
    
    if (error) throw error
    return data
  },

  // Get product by ID
  async getProduct(id) {
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .select(`
        *,
        stores (name, logo_url),
        reviews (rating, comment, created_at, users(name))
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Search products
  async searchProducts(query) {
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .select(`
        *,
        stores (name, logo_url)
      `)
      .ilike('name', `%${query}%`)
      .order('rating', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Add product to favorites
  async addToFavorites(userId, productId) {
    const { data, error } = await supabase
      .from(TABLES.FAVORITES)
      .insert([
        { user_id: userId, product_id: productId }
      ])
    
    if (error) throw error
    return data
  },

  // Remove from favorites
  async removeFromFavorites(userId, productId) {
    const { error } = await supabase
      .from(TABLES.FAVORITES)
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)
    
    if (error) throw error
  },

  // Get user favorites
  async getUserFavorites(userId) {
    const { data, error } = await supabase
      .from(TABLES.FAVORITES)
      .select(`
        products (
          *,
          stores (name, logo_url)
        )
      `)
      .eq('user_id', userId)
    
    if (error) throw error
    return data.map(item => item.products)
  }
}

export const reviewService = {
  // Add review
  async addReview(productId, userId, rating, comment) {
    const { data, error } = await supabase
      .from(TABLES.REVIEWS)
      .insert([
        {
          product_id: productId,
          user_id: userId,
          rating,
          comment
        }
      ])
    
    if (error) throw error
    return data
  },

  // Get product reviews
  async getProductReviews(productId) {
    const { data, error } = await supabase
      .from(TABLES.REVIEWS)
      .select(`
        *,
        users (name, avatar_url)
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

export const storeService = {
  // Get all stores
  async getStores() {
    const { data, error } = await supabase
      .from(TABLES.STORES)
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  }
}


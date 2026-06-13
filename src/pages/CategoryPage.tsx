import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ProductCard } from '../components/ProductCard';
import type { ProductWithCategory, Category } from '../types';

const categoryImages: Record<string, string> = {
  'saude-e-beleza': 'https://images.pexels.com/photos/3781553/pexels-photo-3781553.jpeg',
  'casa-e-utensilios': 'https://images.pexels.com/photos/4228691/pexels-photo-4228691.jpeg',
  'moda-e-estilo': 'https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg',
};

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch category
        const { data: categoryData } = await supabase
          .from('categories')
          .select('*')
          .eq('slug', slug)
          .single();

        if (categoryData) {
          setCategory(categoryData);

          // Fetch products in category
          const { data: productsData } = await supabase
            .from('products')
            .select('*, categories(*)')
            .eq('category_id', categoryData.id)
            .order('created_at', { ascending: false });

          setProducts(productsData || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Categoria não encontrada</h2>
          <p className="text-gray-600">A categoria solicitada não existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Hero */}
      <section className="relative h-64 overflow-hidden">
        <img
          src={categoryImages[slug || '']}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              {category.name}
            </h1>
            <p className="text-white/80 mt-2">
              {products.length} produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">Nenhum produto encontrado nesta categoria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

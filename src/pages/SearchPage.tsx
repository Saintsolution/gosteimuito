import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ProductCard } from '../components/ProductCard';
import type { ProductWithCategory } from '../types';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function searchProducts() {
      setLoading(true);
      try {
        // Search by code (exact match) or title (partial match)
        const { data } = await supabase
          .from('products')
          .select('*, categories(*)')
          .or(`code.ilike.%${query}%,title.ilike.%${query}%`)
          .order('created_at', { ascending: false });

        setProducts(data || []);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      searchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Buscando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-8 h-8 text-rose-500" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Resultados da Busca
            </h1>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span>Buscando por:</span>
            <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-medium flex items-center gap-2">
              "{query}"
              <X className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Nenhum produto encontrado
              </h2>
              <p className="text-gray-600">
                Não encontramos nenhum produto com o código ou título "{query}".
              </p>
              <p className="text-gray-500 text-sm mt-4">
                Verifique se o código está correto ou tente buscar por outro termo.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                {products.length} produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

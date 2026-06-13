import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Tag, Star, Flame, LogOut, ShoppingBag } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { ProductWithCategory, Category } from '../../types';

export function AdminPage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<ProductWithCategory | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    description: '',
    price: '',
    photos: '',
    category_id: '',
    featured: false,
    bestseller: false,
    offer_of_the_day: false,
    link: '',
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsAdmin(loggedIn);
    if (loggedIn) {
      fetchData();
    }
  }, []);

  async function fetchData() {
    try {
      const [{ data: productsData }, { data: categoriesData }] = await Promise.all([
        supabase.from('products').select('*, categories(*)').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name'),
      ]);

      setProducts(productsData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    window.location.href = '/';
  }

  function resetForm() {
    setFormData({
      code: '',
      title: '',
      description: '',
      price: '',
      photos: '',
      category_id: '',
      featured: false,
      bestseller: false,
      offer_of_the_day: false,
      link: '',
    });
    setEditingProduct(null);
    setShowForm(false);
  }

  function editProduct(product: ProductWithCategory) {
    setEditingProduct(product);
    setFormData({
      code: product.code,
      title: product.title,
      description: product.description || '',
      price: product.price.toString(),
      photos: product.photos?.join(', ') || '',
      category_id: product.category_id?.toString() || '',
      featured: product.featured,
      bestseller: product.bestseller,
      offer_of_the_day: product.offer_of_the_day,
      link: product.link || '',
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const productData = {
      code: formData.code,
      title: formData.title,
      description: formData.description || null,
      price: parseFloat(formData.price),
      photos: formData.photos.split(',').map((p) => p.trim()).filter(Boolean),
      category_id: parseInt(formData.category_id) || null,
      featured: formData.featured,
      bestseller: formData.bestseller,
      offer_of_the_day: formData.offer_of_the_day,
      link: formData.link || null,
      updated_at: new Date().toISOString(),
    };

    try {
      if (editingProduct) {
        await supabase.from('products').update(productData).eq('id', editingProduct.id);
      } else {
        await supabase.from('products').insert({ ...productData, created_at: new Date().toISOString() });
      }
      fetchData();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Erro ao salvar produto. Verifique se o código já não está em uso.');
    }
  }

  async function deleteProduct(productId: number) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      await supabase.from('products').delete().eq('id', productId);
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-rose-500" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Painel Administrativo</h1>
              <p className="text-sm text-gray-500">GOSTEIMUITO</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Add Product Button */}
        {!showForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Adicionar Produto
            </button>
          </div>
        )}

        {/* Product Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editingProduct ? 'Editar Produto' : 'Novo Produto'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código *
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  >
                    <option value="">Selecione...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fotos (URLs separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={formData.photos}
                    onChange={(e) => setFormData({ ...formData, photos: e.target.value })}
                    placeholder="https://exemplo.com/foto1.jpg, https://exemplo.com/foto2.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  />
                </div>

                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link Externo (opcional)
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 text-rose-500 rounded border-gray-300 focus:ring-rose-500"
                  />
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4 text-rose-500" />
                    <span className="text-gray-700">Destaque</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.bestseller}
                    onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                    className="w-5 h-5 text-rose-500 rounded border-gray-300 focus:ring-rose-500"
                  />
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="text-gray-700">Mais Vendido</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.offer_of_the_day}
                    onChange={(e) => setFormData({ ...formData, offer_of_the_day: e.target.checked })}
                    className="w-5 h-5 text-rose-500 rounded border-gray-300 focus:ring-rose-500"
                  />
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700">Oferta do Dia</span>
                  </div>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-rose-600 hover:to-orange-600 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  {editingProduct ? 'Salvar Alterações' : 'Adicionar Produto'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Todos os Produtos ({products.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.photos?.[0] || 'https://via.placeholder.com/50'}
                          alt={product.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="max-w-xs">
                          <p className="font-medium text-gray-800 truncate">{product.title}</p>
                          <p className="text-sm text-gray-500 truncate">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {product.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {product.categories?.name || '-'}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {product.bestseller && (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
                            <Star className="w-3 h-3" />
                            Vendido
                          </span>
                        )}
                        {product.offer_of_the_day && (
                          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                            <Flame className="w-3 h-3" />
                            Oferta
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => editProduct(product)}
                          className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  imageUrl: string;
}

export function CategoryCard({ category, imageUrl }: CategoryCardProps) {
  const categoryColors: Record<string, string> = {
    'saude-e-beleza': 'from-pink-500 to-rose-500',
    'casa-e-utensilios': 'from-amber-500 to-orange-500',
    'moda-e-estilo': 'from-violet-500 to-purple-500',
  };

  const gradient = categoryColors[category.slug] || 'from-gray-500 to-gray-700';

  return (
    <Link
      to={`/categoria/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 block"
    >
      {/* Background Image */}
      <div className="aspect-[4/3] relative">
        <img
          src={imageUrl}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 inset-x-0 p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
        <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
          <span className="font-medium">Ver Produtos</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

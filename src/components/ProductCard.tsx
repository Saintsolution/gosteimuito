import { Link } from 'react-router-dom';
import { Tag, TrendingUp, Flame } from 'lucide-react';
import type { ProductWithCategory } from '../types';

interface ProductCardProps {
  product: ProductWithCategory;
  showBadge?: boolean;
}

export function ProductCard({ product, showBadge = true }: ProductCardProps) {
  const photo = product.photos?.[0] || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg';

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={photo}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Badges */}
        {showBadge && (
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.offer_of_the_day && (
              <span className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                <Flame className="w-3 h-3" />
                OFERTA DO DIA
              </span>
            )}
            {product.bestseller && (
              <span className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                <TrendingUp className="w-3 h-3" />
                MAIS VENDIDO
              </span>
            )}
          </div>
        )}
        {/* Code Badge */}
        <div className="absolute top-3 right-3 bg-gray-900/80 text-white text-xs font-mono px-2 py-1 rounded">
          {product.code}
        </div>
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category */}
        {product.categories && (
          <p className="text-xs text-rose-500 font-medium uppercase tracking-wider mb-1">
            {product.categories.name}
          </p>
        )}

        {/* Title */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-gray-500 text-sm mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4 text-rose-500" />
            <span className="text-xl font-bold text-gray-900">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
          {product.link ? (
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-rose-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
            >
              Comprar
            </a>
          ) : (
            <Link
              to={`/search?q=${product.code}`}
              className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-rose-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
            >
              Ver Detalhes
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

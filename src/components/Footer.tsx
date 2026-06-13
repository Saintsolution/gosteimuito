import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Slogan */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-rose-500" />
              <span className="text-xl font-bold">GOSTEIMUITO</span>
            </Link>
            <p className="text-gray-400 font-medium italic">COMPREI E GOSTEI</p>
            <p className="text-gray-400 text-sm">
              A sua loja completa para Saúde, Casa e Moda. Qualidade e confiança em cada produto.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categoria/saude-e-beleza" className="text-gray-400 hover:text-rose-500 transition-colors">
                  Saúde e Beleza
                </Link>
              </li>
              <li>
                <Link to="/categoria/casa-e-utensilios" className="text-gray-400 hover:text-rose-500 transition-colors">
                  Casa e Utensílios
                </Link>
              </li>
              <li>
                <Link to="/categoria/moda-e-estilo" className="text-gray-400 hover:text-rose-500 transition-colors">
                  Moda e Estilo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-rose-500" />
                contato@gosteimuito.com
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-rose-500" />
                (11) 99999-9999
              </li>
            </ul>
          </div>

          {/* Admin and Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Acesso</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin/login"
                  className="text-gray-400 hover:text-rose-500 transition-colors text-sm"
                >
                  Área Administrativa
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2026 GOSTEIMUITO. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="text-sm">Feito com</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}

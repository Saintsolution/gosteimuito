import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={`
        bg-black
        sticky
        top-0
        z-50
        shadow-lg
        transition-all
        duration-300
      `}
    >
      <div
        className={`
          max-w-7xl
          mx-auto
          px-4
          transition-all
          duration-300
          ${scrolled ? 'py-1' : 'py-3'}
        `}
      >
        <div className="grid grid-cols-[100px_1fr_100px] items-center">
          
          {/* Logo Circular */}
          <Link to="/" className="flex items-center justify-start">
            <img
              src="/gosteimuito_transparente.png"
              alt="GosteiMuito"
              className={`
                object-contain
                transition-all
                duration-300
                ${scrolled
                  ? 'h-14 w-14'
                  : 'h-24 w-24'
                }
              `}
            />
          </Link>

          {/* Lettering */}
          <div className="flex justify-center">
            <img
              src="/gosteimuito.png"
              alt="GosteiMuito"
              className={`
                object-contain
                transition-all
                duration-300
                ${scrolled
                  ? 'h-12 md:h-16'
                  : 'h-24 md:h-32'
                }
              `}
            />
          </div>

          {/* Menu */}
          <div className="flex justify-end">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-[#f4cf88] transition-colors"
            >
              {menuOpen ? (
                <X className="w-10 h-10" />
              ) : (
                <Menu className="w-10 h-10" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Expandido */}
      {menuOpen && (
        <nav className="bg-[#111111] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col gap-3 text-center">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-[#f4cf88] transition-colors text-lg"
              >
                Início
              </Link>

              <Link
                to="/categoria/moda-e-estilo"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-[#f4cf88] transition-colors text-lg"
              >
                Moda & Estilo
              </Link>

              <Link
                to="/categoria/casa-e-utensilios"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-[#f4cf88] transition-colors text-lg"
              >
                Casa & Decoração
              </Link>

              <Link
                to="/categoria/saude-e-beleza"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-[#f4cf88] transition-colors text-lg"
              >
                Saúde & Beleza
              </Link>

            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
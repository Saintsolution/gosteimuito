import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Sparkles, TrendingUp } from 'lucide-react';

const categories = [
  {
    title: 'Moda & Estilo',
    subtitle: 'Achadinhos para vestir bem, pagar menos e se apaixonar pelo look.',
    slug: 'moda-e-estilo',
    image: '/MODA.png',
  },
  {
    title: 'Casa & Decoração',
    subtitle: 'Coisas práticas, bonitas e úteis para deixar sua casa mais charmosa.',
    slug: 'casa-e-utensilios',
    image: '/CASA.png',
  },
  {
    title: 'Saúde & Beleza',
    subtitle: 'Cuidados, beleza e bem-estar para você gostar ainda mais de se cuidar.',
    slug: 'saude-e-beleza',
    image: '/SAUDE.png',
  },
];

export function HomePage() {
  const [searchCode, setSearchCode] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const code = searchCode.trim();

    if (code) {
      navigate(`/search?q=${encodeURIComponent(code)}`);
      setSearchCode('');
    }
  };

  return (
    <div className="min-h-screen bg-[#fff4df] font-['Poppins',sans-serif]">
      <section className="bg-[#8e1119] py-7">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-[#f4cf88] tracking-wide">
            Quem gosta, volta!
          </h1>

          <form onSubmit={handleSearch} className="mt-5 mx-auto max-w-[360px] md:max-w-[440px]">
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                maxLength={8}
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="DIGITE O CÓDIGO"
                className="w-full h-14 rounded-full bg-white pl-14 pr-5 text-center text-xl md:text-2xl font-medium tracking-[0.18em] text-[#3a1717] placeholder-[#9b7d58] focus:outline-none focus:ring-4 focus:ring-[#f4cf88] shadow-md"
              />

              <button
                type="submit"
                aria-label="Buscar produto"
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8e1119] hover:text-[#c76018] transition-colors"
              >
                <Search className="w-7 h-7" />
              </button>
            </div>
          </form>

          <p className="mt-5 max-w-3xl mx-auto text-white/90 text-base md:text-xl font-medium">
            Achadinhos escolhidos para facilitar sua vida, combinar com seu estilo
            e fazer você dizer: gostei muito.
          </p>
        </div>
      </section>

      <section className="bg-[#fff4df] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 shadow-lg border border-[#8e1119]">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/categoria/${category.slug}`}
                className="relative block overflow-hidden group border border-[#8e1119]"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-72 md:h-[430px] object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h2 className="text-2xl md:text-3xl font-black text-white">
                    {category.title}
                  </h2>

                  <p className="mt-2 text-sm md:text-base text-white/90 leading-snug">
                    {category.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff4df] pt-0 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#8e1119] text-[#f4cf88] px-6 py-3 shadow-md">
              <Sparkles className="w-4 h-4" />
              <span className="font-black text-sm tracking-widest">
                OFERTAS DO DIA
              </span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white border border-[#e5c98c] p-8 text-center">
            <p className="text-[#3a1717]/70 font-medium">
              Em breve, os achadinhos em oferta aparecerão aqui.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            <TrendingUp className="w-7 h-7 text-[#8e1119]" />
            <h2 className="text-3xl md:text-4xl font-black text-[#3a1717]">
              Mais Vendidos
            </h2>
          </div>

          <div className="bg-[#fff4df] border border-[#e5c98c] p-8 text-center">
            <p className="text-[#3a1717]/70 font-medium">
              Os produtos mais procurados vão aparecer aqui.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 bg-[#8e1119]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-3xl font-black text-white mb-2">
            Viu no vídeo? Digite o código e encontre rapidinho.
          </h2>

          <p className="text-lg md:text-2xl font-bold italic text-[#f4cf88]">
            COMPREI E GOSTEI
          </p>
        </div>
      </section>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { ArrowRight, UtensilsCrossed, Star, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 pt-20">
      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-32 flex flex-1 items-center justify-center text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-apple-600 text-xs font-semibold uppercase tracking-wider mb-2 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-black" />
            <span>Exclusivo para amantes de la cocina</span>
          </div>
          <h1 className="sf-pro-title text-6xl md:text-8xl text-black leading-[1.1] tracking-tight">
            El Arte de la <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-black via-apple-500 to-black/60">Gastronomía</span>
          </h1>
          <p className="text-lg md:text-xl text-apple-400 max-w-2xl mx-auto font-medium">
            Descubre, guarda y organiza las mejores recetas en un recetario digital diseñado con precisión obsesiva.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
            <Link to="/register" className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full font-medium hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
              Comenzar Ahora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-apple-600 liquid-glass hover:bg-white/60 hover:text-black transition-all duration-300 text-center">
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-24 px-4 relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 px-4">
          <div className="liquid-card p-10 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mx-auto text-black mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="sf-pro-title text-xl text-black mb-3">100+ Recetas</h3>
            <p className="text-apple-500 text-sm leading-relaxed">Almacena hasta cien de tus creaciones en un espacio enfocado puramente en tu contenido.</p>
          </div>
          <div className="liquid-card p-10 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mx-auto text-black mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="sf-pro-title text-xl text-black mb-3">Colección Visual</h3>
            <p className="text-apple-500 text-sm leading-relaxed">Conserva y destaca cada platillo con una interfaz donde la imagen es la verdadera protagonista.</p>
          </div>
          <div className="liquid-card p-10 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mx-auto text-black mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="sf-pro-title text-xl text-black mb-3">Instantáneo</h3>
            <p className="text-apple-500 text-sm leading-relaxed">Encuentra instantáneamente la receta que necesitas con una búsqueda fluida y animaciones de a 60fps.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, UtensilsCrossed, Star, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative px-4 pt-32 pb-40 flex flex-1 items-center justify-center text-center overflow-hidden">
        {/* Decorative background grid and gradients */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-stone-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-brand-200/50 rounded-full blur-3xl opacity-50 mix-blend-multiply translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-stone-200/50 rounded-full blur-3xl opacity-50 mix-blend-multiply -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium mb-4 shadow-sm">
            <Star className="w-4 h-4 fill-brand-500" />
            <span>La plataforma para los amantes de la cocina</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-stone-900 tracking-tight text-balance leading-tight">
            El Arte de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">Alta Gastronomía</span> en tu Hogar
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Descubre, guarda y organiza las mejores recetas culinarias. Culinaria es tu recetario digital premium para elevar tus habilidades en la cocina al siguiente nivel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link to="/register" className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-500 text-white px-8 py-4 rounded-full font-medium hover:bg-brand-600 transition-all shadow-xl hover:shadow-brand-500/20 active:scale-95">
              Comenzar Ahora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 hover:text-brand-600 transition-colors drop-shadow-sm active:scale-95 text-center">
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="bg-white/80 backdrop-blur-sm py-24 px-4 border-t border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <div className="space-y-4 text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto text-brand-500 mb-6 group-hover:scale-110 group-hover:bg-brand-100 transition-all duration-300">
                <UtensilsCrossed className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">100+ Recetas</h3>
              <p className="text-stone-600 leading-relaxed">Almacena hasta cien de tus creaciones favoritas en un espacio elegante y minimalista diseñado para inspirar.</p>
            </div>
            <div className="space-y-4 text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto text-brand-500 mb-6 group-hover:scale-110 group-hover:bg-brand-100 transition-all duration-300">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">Colección Premium</h3>
              <p className="text-stone-600 leading-relaxed">Sube fotos de tus platillos y mantén una galería visual de tu progreso culinario con lujo de detalle.</p>
            </div>
            <div className="space-y-4 text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto text-brand-500 mb-6 group-hover:scale-110 group-hover:bg-brand-100 transition-all duration-300">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">Búsqueda Rápida</h3>
              <p className="text-stone-600 leading-relaxed">Encuentra instantáneamente la receta que necesitas con nuestro buscador optimizado en tiempo real.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

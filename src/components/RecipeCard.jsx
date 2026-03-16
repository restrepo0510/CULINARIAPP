import { Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

export default function RecipeCard({ recipe, onEdit, onDelete, onView }) {
  return (
    <div 
      className="group liquid-card overflow-hidden flex flex-col border-0 cursor-pointer"
      onClick={() => onView(recipe)}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden m-2 rounded-2xl bg-black/5">
        {recipe.image_url ? (
          <img 
            src={recipe.image_url} 
            alt={recipe.name} 
            className="w-full h-full object-cover group-hover:scale-105 group-hover:blur-[2px] transition-all duration-500"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-apple-400">
            <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
            <span className="text-xs font-medium">Sin imagen</span>
          </div>
        )}
        
        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="liquid-glass rounded-full p-1.5 flex gap-1 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="p-3 text-apple-600 hover:text-black hover:bg-white/40 rounded-full transition-all"
              title="Editar receta"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="p-3 text-apple-600 hover:text-brand-500 hover:bg-white/40 rounded-full transition-all"
              title="Eliminar receta"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Indicador "ver receta" */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
          <span className="text-white text-[11px] font-medium">Ver receta completa</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col pt-3">
        <h3 className="sf-pro-title text-lg text-black line-clamp-2 leading-tight mb-2">
          {recipe.name}
        </h3>
        {recipe.description && (
          <p className="text-sm text-apple-500 line-clamp-2 mb-4 font-medium leading-relaxed">
            {recipe.description}
          </p>
        )}
      </div>
    </div>
  );
}

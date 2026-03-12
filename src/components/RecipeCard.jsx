import { Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

export default function RecipeCard({ recipe, onEdit, onDelete }) {
  return (
    <div className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image Section */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {recipe.image_url ? (
          <img 
            src={recipe.image_url} 
            alt={recipe.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-stone-400">
            <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
            <span className="text-xs font-medium">Sin imagen</span>
          </div>
        )}
        
        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={onEdit}
            className="p-2.5 bg-white text-stone-700 hover:text-brand-600 rounded-full hover:scale-110 transition-all shadow-lg"
            title="Editar receta"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={onDelete}
            className="p-2.5 bg-white text-stone-700 hover:text-red-600 rounded-full hover:scale-110 transition-all shadow-lg"
            title="Eliminar receta"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif font-bold text-lg text-stone-900 line-clamp-2 leading-tight">
            {recipe.name}
          </h3>
        </div>
        
        {recipe.description && (
          <p className="text-sm text-stone-500 line-clamp-2 mb-4">
            {recipe.description}
          </p>
        )}
        
        <div className="mt-auto pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-400 font-medium font-mono">
          <span className="truncate">ID: {recipe.id.split('-')[0]}</span>
        </div>
      </div>
    </div>
  );
}

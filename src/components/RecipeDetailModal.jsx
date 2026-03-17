import { X, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function RecipeDetailModal({ recipe, onClose, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false);

  if (!recipe) return null;

  const formatDescription = (text) => {
    if (!text) return <p className="text-apple-400 italic text-sm">Sin descripción</p>;

    return text.split('\n').map((line, i) => {
      if (line.trim() === '') return <div key={i} className="h-2" />;

      const isSectionHeader = /^[⏱🛒📋💡🍽]/.test(line.trim());
      if (isSectionHeader) {
        return (
          <p key={i} className="font-bold text-black text-sm mt-4 mb-1 first:mt-0">
            {line}
          </p>
        );
      }

      const isStep = /^\d+\./.test(line.trim());
      if (isStep) {
        return (
          <p key={i} className="text-apple-600 text-sm ml-3 mb-1 leading-relaxed">
            {line}
          </p>
        );
      }

      if (line.trim().startsWith('•')) {
        return (
          <p key={i} className="text-apple-600 text-sm ml-5 mb-0.5 leading-relaxed">
            {line}
          </p>
        );
      }

      return (
        <p key={i} className="text-apple-600 text-sm mb-1 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-0 sm:p-4 sm:pt-20"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-apple-600/20 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative w-full sm:max-w-lg max-h-[85vh] liquid-glass rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col border border-white/40 shadow-[0_32px_64px_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen */}
        <div className="relative h-52 shrink-0 bg-black/5">
          {recipe.image_url && !imgError ? (
            <img
              src={recipe.image_url}
              alt={recipe.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-apple-400">
              <ImageIcon className="w-10 h-10 mb-2 opacity-40" />
              <span className="text-xs font-medium">Sin imagen</span>
            </div>
          )}

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Botones editar / eliminar */}
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              onClick={() => { onClose(); onEdit(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 backdrop-blur-sm text-black hover:bg-white text-xs font-semibold shadow transition-colors"
            >
              Editar
            </button>
            <button
              onClick={() => { onClose(); onDelete(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/80 backdrop-blur-sm text-white hover:bg-red-500 text-xs font-semibold shadow transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <h2 className="sf-pro-title text-2xl text-black leading-tight mb-1">
            {recipe.name}
          </h2>
          <p className="text-apple-400 text-xs font-mono mb-5">
            Guardada el {new Date(recipe.created_at).toLocaleDateString('es-CO', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </p>

          <div className="bg-white/40 rounded-2xl p-4 border border-white/50">
            {formatDescription(recipe.description)}
          </div>

          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
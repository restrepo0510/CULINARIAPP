import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { X, Loader2, Link as LinkIcon } from 'lucide-react';

export default function RecipeModal({ isOpen, onClose, onSave, recipeToEdit }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image_url: '',
    description: ''
  });

  useEffect(() => {
    if (recipeToEdit) {
      setFormData({
        name: recipeToEdit.name || '',
        image_url: recipeToEdit.image_url || '',
        description: recipeToEdit.description || ''
      });
    } else {
      setFormData({ name: '', image_url: '', description: '' });
    }
  }, [recipeToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        user_id: user.id
      };

      if (recipeToEdit) {
        // Edit mode
        const { error } = await supabase
          .from('recipes')
          .update(dataToSave)
          .eq('id', recipeToEdit.id);
        
        if (error) throw error;
      } else {
        // Create mode
        const { error } = await supabase
          .from('recipes')
          .insert([dataToSave]);
          
        if (error) throw error;
      }
      
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving recipe:', error.message);
      alert('Error al guardar la receta: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-apple-600/20 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-lg liquid-glass rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-white/40 shadow-[0_32px_64px_rgba(0,0,0,0.15)]">
        <div className="px-6 py-5 flex items-center justify-between border-b border-white/20">
          <h2 className="text-xl sf-pro-title text-black">
            {recipeToEdit ? 'Editar Receta' : 'Nueva Receta'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-apple-500 hover:text-black hover:bg-white/40 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-apple-600 mb-1.5 ml-1">Nombre del Platillo *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3.5 bg-white/50 border border-white/40 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-medium text-black placeholder:text-apple-400"
              placeholder="Ej. Ratatouille tradicional"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-apple-600 mb-1.5 ml-1">URL de la Imagen *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <LinkIcon className="h-4 w-4 text-apple-400" />
              </div>
              <input
                type="url"
                required
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                className="w-full pl-11 pr-4 py-3.5 bg-white/50 border border-white/40 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm font-medium text-black placeholder:text-apple-400"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-apple-600 mb-1.5 ml-1">Descripción Breve</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3.5 bg-white/50 border border-white/40 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm resize-none font-medium text-black placeholder:text-apple-400"
              placeholder="Una breve descripción sobre esta receta..."
            ></textarea>
          </div>

          <div className="pt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3.5 bg-white/60 border border-white/40 text-black rounded-2xl font-medium hover:bg-white/80 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex justify-center items-center px-4 py-3.5 bg-black text-white rounded-2xl font-medium hover:scale-[1.02] transform transition-all active:scale-[0.98] disabled:opacity-70 shadow-md"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Guardar Receta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

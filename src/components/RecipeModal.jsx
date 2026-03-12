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
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <h2 className="text-xl font-serif font-bold text-stone-900">
            {recipeToEdit ? 'Editar Receta' : 'Nueva Receta'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Nombre del Platillo *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium"
              placeholder="Ej. Ratatouille tradicional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">URL de la Imagen *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon className="h-4 w-4 text-stone-400" />
              </div>
              <input
                type="url"
                required
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Descripción Breve</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm resize-none"
              placeholder="Una breve descripción sobre esta receta..."
            ></textarea>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white border border-stone-200 text-stone-700 rounded-xl font-medium hover:bg-stone-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex justify-center items-center px-4 py-3 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 disabled:opacity-70 transition-colors shadow-sm"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Guardar Receta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

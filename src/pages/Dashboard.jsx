import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import { Search, Plus, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, [user]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100); // Requerimiento: Listar 100 elementos

      if (error) throw error;
      setRecipes(data || []);
    } catch (error) {
      console.error('Error fetching recipes:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingRecipe(null);
    setIsModalOpen(true);
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta receta? Esta acción no se puede deshacer.')) return;
    try {
      const { error } = await supabase.from('recipes').delete().eq('id', id);
      if (error) throw error;
      setRecipes(recipes.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error.message);
      alert('Hubo un error al eliminar la receta');
    }
  };

  const handleSave = () => {
    fetchRecipes();
  };

  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">Mi Recetario</h1>
            <p className="text-stone-500 mt-1">Administra tus platillos. ({recipes.length} elementos guardados)</p>
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 bg-brand-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-brand-700 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Nueva Receta
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-stone-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 border border-stone-200 rounded-2xl leading-5 bg-white shadow-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
            placeholder="Buscar recetas por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Recipe Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onEdit={() => handleEdit(recipe)}
                onDelete={() => handleDelete(recipe.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white border border-stone-200 rounded-3xl border-dashed">
            <div className="mx-auto w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="text-lg font-medium text-stone-900 font-serif">No se encontraron recetas</h3>
            <p className="mt-1 text-sm text-stone-500">
              {searchQuery ? 'Intenta usar otros términos de búsqueda.' : 'Aún no tienes recetas registradas. ¡Añade tu primera creación gastronómica!'}
            </p>
          </div>
        )}

      </div>

      <RecipeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
        recipeToEdit={editingRecipe}
      />
    </div>
  );
}

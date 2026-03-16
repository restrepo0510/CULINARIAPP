import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import RecipeDetailModal from '../components/RecipeDetailModal';
import { Search, Plus, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [viewingRecipe, setViewingRecipe] = useState(null);

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
        .limit(100);
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
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 mt-16 relative z-10 w-full">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl sf-pro-title text-black tracking-tight">Mi Recetario</h1>
            <p className="text-apple-500 mt-2 font-medium">
              Administra tus platillos. ({recipes.length} elementos guardados)
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Nueva Receta
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-apple-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 liquid-glass rounded-2xl leading-5 text-black placeholder-apple-400 focus:outline-none focus:ring-2 focus:ring-apple-400 focus:bg-white/60 transition-all font-medium"
            placeholder="Buscar recetas por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Grid */}
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
                onView={(r) => setViewingRecipe(r)}
                onEdit={() => handleEdit(recipe)}
                onDelete={() => handleDelete(recipe.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 liquid-glass rounded-3xl">
            <div className="mx-auto w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-apple-400" />
            </div>
            <h3 className="text-xl font-medium text-black sf-pro-title">No se encontraron recetas</h3>
            <p className="mt-2 text-apple-500 font-medium max-w-sm mx-auto">
              {searchQuery
                ? 'Intenta usar otros términos de búsqueda.'
                : 'Aún no tienes recetas registradas. ¡Añade tu primera creación gastronómica!'}
            </p>
          </div>
        )}
      </div>

      {/* Modal detalle */}
      {viewingRecipe && (
        <RecipeDetailModal
          recipe={viewingRecipe}
          onClose={() => setViewingRecipe(null)}
          onEdit={() => { setViewingRecipe(null); handleEdit(viewingRecipe); }}
          onDelete={() => { setViewingRecipe(null); handleDelete(viewingRecipe.id); }}
        />
      )}

      {/* Modal crear/editar */}
      <RecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        recipeToEdit={editingRecipe}
      />
    </div>
  );
}

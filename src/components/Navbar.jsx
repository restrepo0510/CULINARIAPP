import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChefHat, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 text-brand-800 hover:text-brand-600 transition-colors">
            <ChefHat className="w-8 h-8" />
            <span className="font-serif font-bold text-xl tracking-tight">Culinaria</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-stone-600 hover:text-brand-600 transition-colors">
                  Recetario
                </Link>
                <div className="h-6 w-px bg-stone-300 mx-2"></div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Salir</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-stone-600 hover:text-brand-600 transition-colors">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="text-sm font-medium bg-brand-500 text-white px-4 py-2 rounded-full hover:bg-brand-600 transition-colors shadow-md hover:shadow-lg">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

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
    <div className="fixed top-0 inset-x-0 w-full z-50 flex justify-center pt-4 px-4 sm:px-6 pointer-events-none">
      <nav className="w-full max-w-5xl liquid-glass rounded-full px-6 py-3 pointer-events-auto transition-all duration-300">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-apple-600 hover:text-black transition-colors">
            <ChefHat className="w-7 h-7" />
            <span className="font-sans sf-pro-title text-xl tracking-tight">Culinaria</span>
          </Link>

          <div className="flex items-center gap-5">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-apple-500 hover:text-black transition-colors">
                  Recetario
                </Link>
                <div className="h-4 w-px bg-apple-300 mx-1"></div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm font-medium text-apple-500 hover:text-brand-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Salir</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-apple-500 hover:text-black transition-colors">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="text-sm font-medium bg-black/90 backdrop-blur-md text-white px-5 py-2 rounded-full hover:bg-black transition-colors shadow-md hover:-translate-y-0.5 transform duration-300">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

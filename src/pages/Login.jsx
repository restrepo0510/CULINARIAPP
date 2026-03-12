import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChefHat, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError('Credenciales inválidas. Por favor, intenta de nuevo.');
      setIsLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Deco */}
      <div className="absolute top-1/4 left-1/4 -z-10 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
      
      <div className="max-w-md w-full">
        <div className="glass shadow-2xl rounded-3xl p-8 md:p-10">
          <div className="text-center mb-10">
            <div className="mx-auto w-16 h-16 bg-brand-50 flex items-center justify-center rounded-2xl text-brand-600 mb-6 shadow-sm">
              <ChefHat className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">Bienvenido de nuevo</h2>
            <p className="mt-3 text-stone-500">Ingresa a tu recetario personal</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-start">
                <p>{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="email">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder:text-stone-400"
                  placeholder="chef@ejemplo.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder:text-stone-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar a la Cocina'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-stone-600">
            ¿Aún no tienes cuenta?{' '}
            <Link to="/register" className="font-medium text-brand-600 hover:text-brand-500 transition-colors">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

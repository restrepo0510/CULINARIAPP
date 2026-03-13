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
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-10">
      
      <div className="max-w-md w-full">
        <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/40 shadow-[0_32px_64px_rgba(0,0,0,0.1)]">
          <div className="text-center mb-10">
            <div className="mx-auto w-16 h-16 bg-white/60 flex items-center justify-center rounded-2xl text-black mb-6 shadow-sm">
              <ChefHat className="w-8 h-8" />
            </div>
            <h2 className="text-3xl sf-pro-title text-black tracking-tight">Bienvenido de nuevo</h2>
            <p className="mt-3 text-apple-500 font-medium">Ingresa a tu recetario personal</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-brand-600 p-4 rounded-2xl text-sm border border-red-100 flex items-start font-medium">
                <p>{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-apple-600 mb-1.5 ml-1" htmlFor="email">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white/50 border border-white/40 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all font-medium text-black placeholder:text-apple-400"
                  placeholder="chef@ejemplo.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-apple-600 mb-1.5 ml-1" htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white/50 border border-white/40 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all font-medium text-black placeholder:text-apple-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-md text-sm font-medium text-white bg-black hover:scale-[1.02] transform transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar a la Cocina'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-apple-500 font-medium">
            ¿Aún no tienes cuenta?{' '}
            <Link to="/register" className="font-semibold text-black hover:text-apple-500 transition-colors">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

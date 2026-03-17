import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChefHat, Loader2, CheckCircle } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { data, error: signUpError } = await signUp(email, password);

    setIsLoading(false);

    // Error directo de Supabase
    if (signUpError) {
      // Traducir mensajes comunes al español
      if (signUpError.message.includes('already registered') || 
          signUpError.message.includes('User already registered')) {
        setError('Este correo ya está registrado. ¿Quieres iniciar sesión?');
      } else if (signUpError.message.includes('Password should be')) {
        setError('La contraseña debe tener mínimo 6 caracteres.');
      } else if (signUpError.message.includes('invalid')) {
        setError('El correo electrónico no es válido.');
      } else {
        setError(signUpError.message);
      }
      return;
    }

    // Supabase a veces retorna identities vacío cuando el email ya existe
    // sin retornar error (comportamiento conocido de Supabase)
    if (data?.user && data.user.identities && data.user.identities.length === 0) {
      setError('Este correo ya está registrado. ¿Quieres iniciar sesión?');
      return;
    }

    // Registro exitoso
    if (data?.user) {
      // Si tiene sesión activa, ir directo al dashboard
      if (data.session) {
        navigate('/dashboard');
      } else {
        // Supabase requiere confirmación de email
        setSuccess(true);
      }
    }
  };

  // Pantalla de éxito — confirmar email
  if (success) {
    return (
      <div className="flex-1 flex items-center justify-center py-12 px-4 relative z-10 w-full mt-10">
        <div className="max-w-md w-full">
          <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/40 shadow-[0_32px_64px_rgba(0,0,0,0.1)] text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 flex items-center justify-center rounded-2xl mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl sf-pro-title text-black mb-3">¡Cuenta creada!</h2>
            <p className="text-apple-500 font-medium mb-6">
              Te enviamos un correo a <span className="font-semibold text-black">{email}</span>. 
              Confírmalo para activar tu cuenta.
            </p>
            <Link
              to="/login"
              className="inline-block w-full py-4 px-4 rounded-2xl bg-black text-white font-medium text-center hover:scale-[1.02] transform transition-all"
            >
              Ir a Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-10">
      <div className="max-w-md w-full">
        <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/40 shadow-[0_32px_64px_rgba(0,0,0,0.1)]">
          <div className="text-center mb-10">
            <div className="mx-auto w-16 h-16 bg-white/60 flex items-center justify-center rounded-2xl text-black mb-6 shadow-sm">
              <ChefHat className="w-8 h-8" />
            </div>
            <h2 className="text-3xl sf-pro-title text-black tracking-tight">Únete a Culinaria</h2>
            <p className="mt-3 text-apple-500 font-medium">Comienza a guardar tus recetas maestras hoy mismo.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100 font-medium">
                <p>{error}</p>
                {error.includes('ya está registrado') && (
                  <Link to="/login" className="block mt-2 text-black font-semibold underline">
                    → Ir a iniciar sesión
                  </Link>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-apple-600 mb-1.5 ml-1" htmlFor="email">
                  Correo Electrónico
                </label>
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
                <label className="block text-sm font-semibold text-apple-600 mb-1.5 ml-1" htmlFor="password">
                  Contraseña (Mínimo 6 caracteres)
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
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
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-md text-sm font-medium text-white bg-black hover:scale-[1.02] transform transition-all active:scale-[0.98] focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Crear Cuenta'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-apple-500 font-medium">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-semibold text-black hover:text-apple-500 transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
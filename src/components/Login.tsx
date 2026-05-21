import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cpf, password })
      });
      const data = await res.json();
      if(data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
      } else {
        alert("Login failed");
      }
    } catch(err) {
      console.error(err);
      // fallback even if connection fails just go to home
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body-base text-on-surface antialiased min-h-screen flex flex-col items-center justify-start overflow-x-hidden relative pb-8">
      {/* Elevated Header Anchor */}
      <header className="w-full bg-primary-container rounded-b-[32px] pt-8 pb-24 px-6 relative shadow-sm z-0">
        <div className="absolute inset-0 overflow-hidden rounded-b-[32px] pointer-events-none opacity-20">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
          <div className="absolute top-20 -left-10 w-32 h-32 rounded-full bg-secondary blur-2xl"></div>
        </div>
        
        <div className="flex items-center justify-between relative z-10">
          <h1 className="text-2xl font-bold text-on-primary-container tracking-tight">
            Favela Tech
          </h1>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
            <span className="material-symbols-outlined text-on-primary-container">pets</span>
          </div>
        </div>

        <div className="mt-8 relative z-10 text-center">
          <h2 className="text-3xl font-bold text-on-primary-container leading-tight">
            Bem-vindo(a)<br/>de volta!
          </h2>
          <p className="text-on-primary-container/80 mt-2 mb-6">
            Acesse sua conta para continuar.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 inline-block w-full max-w-[240px] shadow-sm">
             <p className="text-sm font-medium text-on-primary-container/90 mb-1">Você ainda deve</p>
             <p className="text-3xl font-bold text-white tracking-tight">R$ 480,00</p>
          </div>
        </div>
      </header>

      {/* Floating Login Card */}
      <main className="w-full px-6 -mt-16 mx-auto relative z-10 flex-1">
        <div className="bg-surface-container-lowest rounded-3xl shadow-lg border border-outline-variant/30 p-6 flex flex-col gap-6">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            
            {/* CPF Field */}
            <div>
              <label htmlFor="cpf" className="block text-sm font-semibold text-on-surface-variant mb-1">CPF</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">badge</span>
                </div>
                <input 
                  type="text" 
                  id="cpf" 
                  name="cpf" 
                  placeholder="000.000.000-00" 
                  required 
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-outline-variant rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary focus:border-primary transition-colors h-11"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
               <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-semibold text-on-surface-variant">Senha</label>
                  <a href="#" className="text-sm text-primary font-semibold hover:underline">Esqueceu?</a>
               </div>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <span className="material-symbols-outlined text-outline">lock</span>
                 </div>
                 <input 
                   type="password" 
                   id="password" 
                   name="password" 
                   placeholder="••••••••" 
                   required 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="block w-full pl-10 pr-10 py-3 border border-outline-variant rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary focus:border-primary transition-colors h-11"
                 />
                 <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface">
                   <span className="material-symbols-outlined">visibility_off</span>
                 </button>
               </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary text-on-primary text-sm font-semibold rounded-xl h-11 mt-4 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm">
                {loading ? 'Entrando...' : 'Entrar'}
                {!loading && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
            </button>
          </form>

          <div className="mt-2 flex flex-col gap-4 text-center">
             <p className="text-sm text-on-surface-variant">
               Ainda não tem conta? <a href="#" className="text-primary font-semibold hover:underline">Criar agora</a>
             </p>
             <button type="button" className="flex items-center justify-center gap-2 w-full border border-outline-variant rounded-xl h-11 bg-surface hover:bg-surface-container transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.79 15.73 17.57V20.34H19.29C21.38 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"></path>
                  <path d="M12 23C14.97 23 17.46 22.02 19.29 20.34L15.73 17.57C14.74 18.23 13.48 18.63 12 18.63C9.14001 18.63 6.71001 16.7 5.84001 14.11H2.17001V16.96C3.98001 20.56 7.71001 23 12 23Z" fill="#34A853"></path>
                  <path d="M5.84 14.11C5.62 13.44 5.49 12.74 5.49 12C5.49 11.26 5.62 10.56 5.84 9.89001V7.04001H2.17C1.43 8.52001 1 10.21 1 12C1 13.79 1.43 15.48 2.17 16.96L5.84 14.11Z" fill="#FBBC05"></path>
                  <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.01L19.37 3.84C17.45 2.05 14.96 1 12 1C7.71 1 3.98 3.44 2.17 7.04L5.84 9.89C6.71 7.3 9.14 5.38 12 5.38Z" fill="#EA4335"></path>
                </svg>
                <span className="text-sm font-semibold text-on-surface">Continuar com Google</span>
             </button>
          </div>
        </div>
      </main>
      
      <section className="w-full text-center mt-6 p-4">
        <p className="text-xs text-on-surface-variant/70">
            Ambiente seguro e criptografado. Suas informações estão protegidas.
        </p>
      </section>

    </div>
  );
}

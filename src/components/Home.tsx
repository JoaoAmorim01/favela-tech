import { useEffect, useState } from 'react';
import BottomNav from './BottomNav';

export default function Home() {
  const [user, setUser] = useState<{name: string, balanceOwed: number} | null>(null);
  const [parcelas, setParcelas] = useState<any[]>([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Offline status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Fetch data
    fetch('/api/user/info')
      .then(res => res.json())
      .then(data => data.success && setUser(data.user))
      .catch(console.error);

    fetch('/api/parcelas')
      .then(res => res.json())
      .then(data => setParcelas(data))
      .catch(console.error);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    }
  }, []);

  return (
    <div className="bg-surface-bright text-on-surface min-h-screen pb-[100px] overflow-hidden flex flex-col">
      <header className="bg-primary rounded-b-[32px] w-full min-h-[160px] flex items-start pt-6 shadow-sm px-6 relative">
        <div className="flex justify-between items-start w-full relative z-10">
          <div>
            <h1 className="text-2xl font-bold text-on-primary tracking-tight">Bom dia, {user?.name.split(' ')[0] || 'Dona Maria'}</h1>
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden border-2 border-white">
            <img alt="Mascote Leãozinho" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnSdCRfB5tvfYzFlAiJNV0Mj2IY-dF5m_m3T8yG-SCzEu6tdbyKGyZ_m8WYXM_4_oBuh1Y-I8MhwscxlEygROpDI_oXCW3ihgNpg3W--vIvv-jWY30qDc6dUs6YH_xDxcgQkYA3o5UPh8PQywPY9DxXzDZ2XXF_p2lilDSkzmvX_9Z0HxzZWSHMTkEXmjdw-yV0RS8a8DBEQ2uug8mfIfa1UzeDeN3Sv_pNvwYvklEvrkWF4sy-hOfpicia1Hp6e1ohmlR3Nx5gim2" />
          </div>
        </div>

        {/* Saldo Card */}
        <div className="absolute left-6 right-6 -bottom-16 bg-surface-container-lowest rounded-xl shadow-md p-6 border border-outline-variant/30 flex flex-col items-center justify-center">
          <p className="text-base text-on-surface-variant font-medium mb-1">Você ainda deve</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">R$ {user?.balanceOwed?.toFixed(2).replace('.', ',') || '0,00'}</h2>
        </div>
      </header>

      <main className="pt-24 px-6 flex flex-col gap-6 flex-1 overflow-y-auto">
        {isOffline && (
          <div className="bg-warning/20 rounded-lg p-4 flex items-center gap-3 border border-warning/30">
            <span className="material-symbols-outlined text-warning">wifi_off</span>
            <p className="text-sm text-on-surface-variant">Você está sem internet no momento. Mostrando dados guardados.</p>
          </div>
        )}

        {/* Notification */}
        <div className="bg-warning rounded-lg p-4 flex items-start gap-3 shadow-sm">
          <span className="material-symbols-outlined text-on-secondary-container mt-1">warning</span>
          <p className="text-base font-medium text-on-secondary-container">Atenção: Sua próxima parcela vence em 3 dias. Organize-se.</p>
        </div>

        {/* Parcelas List */}
        <section className="pb-6">
          <h3 className="text-xl font-bold mb-4 text-on-surface">As suas parcelas</h3>
          <div className="flex flex-col gap-4">
            {parcelas.map(p => {
               if(p.status === 'paid') {
                 return (
                   <div key={p.id} className="border-2 border-success bg-success/10 rounded-xl p-6 flex flex-col gap-2">
                     <div className="flex justify-between items-center">
                       <span className="font-medium text-on-surface">{p.label}</span>
                       <span className="font-bold text-on-surface">R$ {p.amount.toFixed(2).replace('.', ',')}</span>
                     </div>
                     <div className="flex items-center gap-2 text-success mt-2">
                       <span className="material-symbols-outlined" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                       <span className="text-sm font-semibold">Paga</span>
                     </div>
                   </div>
                 );
               } else if(p.status === 'pending') {
                 return (
                   <div key={p.id} className="border-2 border-warning bg-surface-container-lowest rounded-xl p-6 flex flex-col gap-4">
                     <div className="flex justify-between items-center">
                       <span className="font-medium text-on-surface">{p.label}</span>
                       <span className="font-bold text-on-surface">R$ {p.amount.toFixed(2).replace('.', ',')}</span>
                     </div>
                     <button className="w-full bg-secondary-container text-on-secondary-container font-semibold text-sm h-11 rounded-lg flex items-center justify-center shadow-sm active:scale-95 transition-transform">
                       Pagar agora
                     </button>
                   </div>
                 );
               } else if(p.status === 'late') {
                  return (
                    <div key={p.id} className="border-2 border-error bg-danger-muted rounded-xl p-6 flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                         <span className="font-bold text-error">{p.label}</span>
                         <span className="font-bold text-error">R$ {p.amount.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-error">
                         <span className="material-symbols-outlined" style={{fontVariationSettings:"'FILL' 1"}}>error</span>
                         <span className="text-sm font-semibold">Atrasada (inclui juros)</span>
                      </div>
                      <button className="w-full bg-error text-on-error font-semibold text-sm h-11 rounded-lg flex items-center justify-center shadow-sm active:scale-95 transition-transform mt-2">
                          Regularizar
                      </button>
                    </div>
                  );
               }
               return null;
            })}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

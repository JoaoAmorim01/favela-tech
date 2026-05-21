import { useEffect, useState } from 'react';
import BottomNav from './BottomNav';

export default function Parcelas() {
  const [parcelas, setParcelas] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/parcelas')
      .then(res => res.json())
      .then(data => setParcelas(data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col relative pb-24">
      <header className="bg-primary shadow-md rounded-b-[32px] w-full min-h-[100px] pt-4 pb-8 flex flex-row justify-between items-center px-6 z-40 relative">
        <h1 className="text-2xl font-bold text-on-primary">Suas Parcelas</h1>
      </header>
      <main className="flex-1 px-6 pt-8 flex flex-col gap-6 z-10 overflow-y-auto w-full">
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
      </main>
      <BottomNav />
    </div>
  )
}

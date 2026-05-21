import { useEffect, useState } from 'react';
import BottomNav from './BottomNav';

export default function Extrato() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(console.error);
  }, []);

  const totalIn = transactions.filter(t => t.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
  const totalOut = transactions.filter(t => t.amount < 0).reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  // Group by date
  const groupedTransactions = transactions.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr);
    return acc;
  }, {});

  return (
    <div className="bg-background text-on-background min-h-screen relative pb-[90px] flex flex-col">
      <header className="bg-primary shadow-md rounded-b-[32px] w-full min-h-[120px] pt-4 pb-12 flex flex-row justify-between items-start px-6 z-40 relative">
        <div className="flex flex-col gap-1 mt-2">
          <h1 className="text-on-primary font-bold text-2xl tracking-tight">Meu Extrato</h1>
          <p className="text-primary-fixed-dim text-sm opacity-90 font-medium">Acompanhe seu dinheiro</p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <button aria-label="Notificações" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-container text-on-primary hover:opacity-90 active:scale-95 transition-transform">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-fixed bg-surface shadow-sm">
            <img alt="Mascot Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2oE5AALGroOXf_Qk0HpRlqoWh4DoNw4otBeyQlKtp_xfcsiRCcZsCIRqYSkhw9OVkLDLupsMxBRz_-sgQnNBvowrkmf_jHGp0F8HXvSSQ1zWeDNrYqQlegG4CPOxMG5uI0rVTpL7W_AlKKu2TIR4ghiIsxrLlOm0yQ18ZI7eCe7HBMGsAyUiVG5n0-xwdzgj0W-p7pb0OfBBxPhk8JW5kjnqz0ZZoA6R1yQoCmqkIjAzt0AvVLl-uM_MUErEKmze2j44Yg6zSCoPz" />
          </div>
        </div>
      </header>

      <main className="relative z-10 -mt-6 flex-1 overflow-y-auto">
        <section className="px-6 mb-8">
          <div className="grid grid-cols-2 gap-3">
            {/* Entrou Card */}
            <div className="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm border border-outline-variant flex flex-col gap-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-success/5 rounded-bl-[100px] -z-10"></div>
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-success" style={{fontVariationSettings:"'FILL' 1"}}>south_west</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-on-surface-variant">Dinheiro que entrou</span>
                <span className="text-success text-lg font-bold tracking-tight mt-1">+ R$ {totalIn.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
            
            {/* Saiu Card */}
            <div className="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm border border-outline-variant flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-surface-variant/20 rounded-bl-[100px] -z-10"></div>
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant" style={{fontVariationSettings:"'FILL' 1"}}>north_east</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-on-surface-variant">Dinheiro que saiu</span>
                <span className="text-on-surface text-lg font-bold tracking-tight mt-1">- R$ {totalOut.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 pb-6">
          {Object.entries(groupedTransactions).map(([date, txs]: [string, any[]]) => (
            <div key={date} className="flex flex-col">
              <div className="px-6 mb-3 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${date === 'Hoje' ? 'bg-primary' : 'bg-outline-variant'}`}></div>
                <h2 className="text-sm font-semibold text-outline">{date}</h2>
              </div>
              <div className="px-6 flex flex-col gap-3">
                {txs.map((tx) => (
                  <div key={tx.id} className="bg-surface-container-lowest rounded-[16px] p-4 shadow-sm border border-surface-variant flex items-center justify-between hover:bg-surface-container-low transition-colors active:scale-[0.98]">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-full ${tx.type === 'income' ? 'bg-success/10 text-success' : 'bg-surface-variant text-on-surface-variant'} flex items-center justify-center shrink-0`}>
                        <span className="material-symbols-outlined">{tx.icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-on-surface">{tx.title}</span>
                        <span className="text-sm text-on-surface-variant">{tx.description}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-sm font-semibold ${tx.type === 'income' ? 'text-success' : 'text-on-surface'}`}>
                        {tx.type === 'income' ? '+' : '-'} R$ {Math.abs(tx.amount).toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-xs text-outline">{tx.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      
      <BottomNav />
    </div>
  );
}

import { useState } from 'react';
import BottomNav from './BottomNav';

export default function Ajuda() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Como pagar minha parcela?",
      answer: "Para pagar sua parcela, vá até a aba \"Parcelas\" no menu inferior. Lá você encontrará o código Pix ou o boleto para pagamento."
    },
    {
      question: "O que acontece se eu atrasar?",
      answer: "Não se preocupe, estamos aqui para ajudar. Se atrasar, você pode renegociar a parcela diretamente no aplicativo ou falar conosco pelo Zap."
    },
    {
      question: "Como vejo meu extrato?",
      answer: "Seu histórico completo de pagamentos e movimentações está disponível na aba \"Extrato\", localizada no menu inferior da tela."
    }
  ];

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col relative pb-24">
      <header className="bg-primary shadow-md rounded-b-[32px] w-full min-h-[120px] pt-4 pb-8 flex flex-row justify-between items-start px-6 z-40 relative">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-lowest overflow-hidden shadow-sm border border-primary-fixed">
          <img alt="Lion mascot smiling" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnrmCdjhmS5ozA5ZF0LJXfxhCUps5WI5jXbCFeVznCkrxFFKc1LmxrNAZvwMFoKA1arVwzzC2AFKMdr4x6cGZd55TNhXNTxBdpoojOSU5noAI1Yxfk0yx-w-ZuP1_i4BBIjZBnIUGR9LNFiNEA7SsGUEiKfsHDTTuzPqfWHFBlE0dAR6Wka68MM4OpGKpMIqjUIHHgHnWZFEVftfRqfjqggCGPb3Q6LUSHy4BxzPUjBN0AQrm7f0zEsZMOhwDoOwfZ7y9y-jOE1wP9" />
        </div>
        <div className="flex-1 px-4 flex flex-col justify-center h-12">
          <h1 className="text-xl font-bold text-on-primary">Bom dia, Dona Maria</h1>
        </div>
        <button aria-label="Notifications" className="flex items-center justify-center w-12 h-12 rounded-full text-on-primary hover:opacity-90 active:scale-95 transition-transform">
           <span className="material-symbols-outlined" style={{fontSize: "28px"}}>notifications</span>
        </button>
      </header>

      <main className="flex-1 px-6 pt-8 flex flex-col gap-6 z-10 overflow-y-auto overflow-x-hidden">
        <section className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-primary leading-tight">Como podemos te ajudar?</h2>
          <p className="text-lg text-on-surface-variant font-medium">Estamos aqui para tirar suas dúvidas e apoiar seu crescimento.</p>
        </section>

        <button className="w-full bg-primary rounded-xl shadow-md p-6 flex flex-row items-center justify-between min-h-[88px] hover:bg-primary-container active:scale-95 transition-all duration-200 group border-b-4 border-primary-container">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-secondary shadow-sm">
                <span className="material-symbols-outlined" style={{fontSize: "28px", fontVariationSettings: "'FILL' 1"}}>forum</span>
             </div>
             <div className="flex flex-col text-left">
                <span className="text-2xl font-bold text-on-primary leading-none">Falar com a gente no Zap</span>
                <span className="text-base text-primary-fixed-dim mt-1">Resposta rápida</span>
             </div>
           </div>
           <span className="material-symbols-outlined text-secondary-fixed group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
        </button>

        <section className="flex flex-col gap-4 mt-4">
          <h3 className="text-2xl font-bold text-primary mb-2">Dúvidas Comuns</h3>
          
          {faqs.map((faq, index) => (
             <div key={index} className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant overflow-hidden">
               <button 
                 onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                 className="w-full flex justify-between items-center p-4 min-h-[44px] active:bg-surface-container-low transition-colors"
               >
                 <span className="text-sm font-semibold text-on-surface text-left">{faq.question}</span>
                 <span className={`material-symbols-outlined text-outline transition-transform duration-300 ${openAccordion === index ? 'rotate-180' : ''}`}>expand_more</span>
               </button>
               <div className={`transition-all duration-300 ease-in-out opacity-0 max-h-0 overflow-hidden ${openAccordion === index ? 'max-h-[500px] opacity-100' : ''}`}>
                 <div className="bg-surface-bright px-4 pb-4 pt-1">
                   <p className="text-base text-on-surface-variant">{faq.answer}</p>
                 </div>
               </div>
             </div>
          ))}

        </section>

        <section className="flex flex-col gap-4 mt-4 mb-8">
           <h3 className="text-sm font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Outras formas de contato</h3>
           <div className="grid grid-cols-2 gap-4">
              <button className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-4 flex flex-col items-center justify-center min-h-[100px] gap-2 active:scale-95 transition-transform hover:border-primary">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <span className="text-sm font-semibold text-on-surface">Ligar para nós</span>
              </button>
              
              <button className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-4 flex flex-col items-center justify-center min-h-[100px] gap-2 active:scale-95 transition-transform hover:border-primary">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <span className="text-sm font-semibold text-on-surface">Enviar E-mail</span>
              </button>
           </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BlurText from './BlurText';
import { templateConfig } from '../templateConfig';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { kicker, title, description, items: faqs } = templateConfig.faq;

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#080808] scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            {kicker}
          </span>
          <BlurText
            as="h2"
            text={title}
            delay={100}
            animateBy="words"
            direction="top"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-1 justify-center"
          />
          <BlurText
            text={description}
            delay={80}
            animateBy="words"
            direction="bottom"
            className="text-base sm:text-lg text-zinc-400 mt-3 font-normal leading-relaxed justify-center max-w-xl"
          />
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-answer-${idx}`;
            const headerId = `faq-header-${idx}`;

            return (
              <div
                key={idx}
                className={`glass-card rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-white/30 bg-white/5 shadow-2xl' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  id={headerId}
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full text-left p-4 sm:p-6 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
                >
                  <span className="text-sm sm:text-xl font-bold text-white tracking-tight flex items-center gap-2.5 sm:gap-3">
                    <HelpCircle className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${isOpen ? 'text-white' : 'text-zinc-500'}`} />
                    <span>{faq.question}</span>
                  </span>
                  <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'bg-white text-black rotate-180' : 'bg-white/10 text-white border border-white/15'
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={headerId}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-zinc-400 text-sm sm:text-base leading-relaxed font-normal border-t border-white/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

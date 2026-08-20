import React from 'react';
import BlurText from './BlurText';
import { Sparkles, Crown } from 'lucide-react';
import { templateConfig } from '../templateConfig';

export const TeamSection: React.FC = () => {
  const { kicker, title, description, members } = templateConfig.team;

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#080808] scroll-mt-24">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
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
            className="text-base sm:text-lg text-zinc-400 mt-3 font-normal leading-relaxed justify-center max-w-2xl"
          />
        </div>

        {/* Co-founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {members.map((member, idx) => (
            <div key={idx} className="glass-card glass-card-hover rounded-3xl p-8 text-center flex flex-col items-center relative overflow-hidden border border-white/20 shadow-2xl">
              
              {/* Top Title/Role Badge */}
              <div className="absolute top-6 right-6 bg-white text-black text-[10px] sm:text-[11px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Crown className="w-3.5 h-3.5 fill-black stroke-[2.5]" />
                {member.title}
              </div>

              {/* Circular Avatar Container */}
              <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-white/30 my-4 shadow-2xl relative group hover:border-white transition-all duration-500 bg-zinc-900">
                <img
                  src={member.avatar}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Member Details */}
              <div className="mt-2 text-center w-full">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
                  <span>{member.name}</span>
                </h3>
                <p className="text-xs font-mono text-zinc-300 mt-1 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{member.title}</span>
                </p>
                <p className="text-sm text-zinc-400 mt-4 max-w-sm mx-auto font-normal leading-relaxed min-h-[72px]">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

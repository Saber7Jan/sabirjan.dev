import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, Github, ExternalLink, Box, Zap, BarChart3, Target, FileText, Download, Play } from "lucide-react";
import data from "../data.json";

export default function Projects() {
  const getProjectBackground = (id: string) => {
    const autoplayParams = "autoplay=1&mute=1&controls=0&loop=1&playlist=";

    switch (id) {
      case "emotifi":
        return (
          <iframe
            src={`https://www.youtube.com/embed/H_fxB56YC5Q?${autoplayParams}H_fxB56YC5Q&modestbranding=1&rel=0&disablekb=1`}
            title="Emotifi background"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            className="absolute inset-0 w-full h-full object-cover opacity-30 filter brightness-50 pointer-events-none"
          />
        );
      case "danreality":
        return (
          <iframe
            src={`https://www.youtube.com/embed/UASRLqS-DsA?${autoplayParams}UASRLqS-DsA&modestbranding=1&rel=0&disablekb=1`}
            title="DanReality background"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            className="absolute inset-0 w-full h-full object-cover opacity-30 filter brightness-50 pointer-events-none"
          />
        );
      case "aurora":
        return (
          <iframe
            src={`https://www.youtube.com/embed/-va8icMUQxg?${autoplayParams}-va8icMUQxg&modestbranding=1&rel=0&disablekb=1`}
            title="Aurora background"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            className="absolute inset-0 w-full h-full object-cover opacity-30 filter brightness-50 pointer-events-none"
          />
        );
      case "lfr-robot":
        return (
          <img
            src="/assets/LFR_1.png"
            alt="LFR background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Dynamic Header */}
      <header className="pt-48 pb-24 px-6 md:px-12 border-b border-white/10 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex items-center gap-4 mb-8 font-mono text-accent text-[11px] uppercase tracking-[0.5em] font-bold"
          >
            <span className="w-8 h-px bg-accent" />
            Portfolio // Research Exhibits
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-7xl md:text-[14vw] font-black uppercase tracking-tighter leading-[0.75] mb-12"
          >
            RESEARCH <br /> <span className="text-accent italic">EXHIBITS.</span>
          </motion.h1>
          <div className="flex flex-col md:flex-row gap-12 font-mono text-[10px] uppercase font-bold tracking-widest text-white/40">
             <div className="flex items-center gap-3">
                <span className="text-white text-lg">03</span> MAJOR DEPLOYMENTS
             </div>
             <div className="flex items-center gap-3">
                <span className="text-white text-lg">85%+</span> ACCURACY BENCHMARKS
             </div>
             <div className="flex items-center gap-3">
                <span className="text-white text-lg">2026</span> OPERATIONAL CYCLE
             </div>
          </div>
        </div>
      </header>

      {/* Projects Grid (CR7 Style: Bold, Dynamic, Data-Rich) */}
      <section className="bg-black">
        {data.projects.map((proj, i) => (
          <motion.div 
            key={proj.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="group relative border-b border-white/10 overflow-hidden min-h-[85vh] flex items-center"
          >
            {/* Background Image on Hover */}
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-all duration-1000 scale-105 group-hover:scale-100">
               {getProjectBackground(proj.id) ?? (
                 <img src={proj.image} className="w-full h-full object-cover grayscale brightness-50" alt={proj.title} />
               )}
            </div>

            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 py-32 items-center">
              {/* Numbering & Vertical Line */}
              <div className="lg:col-span-1 hidden lg:flex flex-col items-center">
                 <div className="font-mono text-white/10 text-6xl font-black group-hover:text-accent group-hover:scale-110 transition-all duration-500">
                   0{i + 1}
                 </div>
                 <div className="w-px h-32 bg-white/10 my-8 group-hover:bg-accent transition-colors" />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-7 flex flex-col items-start translate-y-8 group-hover:translate-y-0 transition-transform duration-1000">
                <div className="flex flex-wrap gap-4 mb-8">
                  {proj.tech.map(t => (
                    <span key={t} className="px-5 py-1 bg-white/5 border border-white/10 text-[10px] font-mono font-black uppercase tracking-widest text-accent">
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="font-display text-5xl md:text-8xl text-white font-black uppercase tracking-tighter leading-[0.8] mb-8 group-hover:italic transition-all">
                  {proj.title}
                </h2>
                <div className="font-serif italic text-2xl text-accent mb-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                  {proj.subtitle}
                </div>
                <p className="font-sans text-xl text-white/50 leading-relaxed max-w-xl group-hover:text-white/80 transition-colors mb-12">
                  {proj.description}
                </p>

                {/* Quick Asset Access */}
                <div className="flex flex-wrap gap-4 mb-12 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  {proj.assets?.map((asset, ai) => (
                    <a 
                      key={ai}
                      href={asset.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-3 px-4 py-2 border border-white/20 hover:border-accent hover:text-accent transition-all font-mono text-[9px] uppercase font-black"
                    >
                      {asset.name.toLowerCase().includes('video') || asset.name.toLowerCase().includes('performance') ? <Play className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                      {asset.name}
                    </a>
                  ))}
                  <Link 
                    to={`/projects/${proj.id}`}
                    className="flex items-center gap-3 px-4 py-2 bg-white text-black hover:bg-accent hover:text-black transition-all font-mono text-[9px] uppercase font-black"
                  >
                    View Case Study
                  </Link>
                </div>

                {/* Performance Metrics (CR7 Style Add-on) */}
                <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 opacity-40 group-hover:opacity-100 transition-opacity w-full">
                   <div>
                      <div className="font-mono text-[9px] uppercase text-white/40 mb-2">Integrity</div>
                      <div className="flex items-center gap-2 font-display text-xl font-black text-white">
                         <Target className="w-4 h-4 text-accent" /> HIGH
                      </div>
                   </div>
                   <div>
                      <div className="font-mono text-[9px] uppercase text-white/40 mb-2">Optimization</div>
                      <div className="flex items-center gap-2 font-display text-xl font-black text-white">
                         <Zap className="w-4 h-4 text-accent" /> 2.4s
                      </div>
                   </div>
                   <div>
                      <div className="font-mono text-[9px] uppercase text-white/40 mb-2">Status</div>
                      <div className="flex items-center gap-2 font-display text-lg font-black text-accent italic">
                         {proj.status}
                      </div>
                   </div>
                </div>
              </div>

              {/* Action Circle */}
              <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-8">
                 <Link 
                   to={`/projects/${proj.id}`}
                   className="relative group/circle"
                 >
                    <div className="w-48 h-48 rounded-full border border-white/20 flex flex-col items-center justify-center group-hover/circle:bg-accent group-hover/circle:border-accent transition-all duration-500">
                       <ArrowUpRight className="w-12 h-12 text-white group-hover/circle:text-black mb-2 transition-colors" />
                       <span className="font-mono text-[9px] font-black uppercase text-white/40 group-hover/circle:text-black/60 tracking-widest">Detail View</span>
                       <div className="absolute inset-0 rounded-full border border-accent opacity-0 group-hover/circle:opacity-100 group-hover/circle:scale-125 transition-all duration-700 pointer-events-none" />
                    </div>
                 </Link>
                 
                 <div className="flex gap-4 opacity-30 group-hover:opacity-100 transition-opacity">
                    <a href={proj.link} target="_blank" rel="noreferrer" className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                       <Github className="w-5 h-5" />
                    </a>
                    <a href={proj.link} target="_blank" rel="noreferrer" className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                       <ExternalLink className="w-5 h-5" />
                    </a>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Experimental Projects Small Grid */}
      <section className="py-32 px-6 md:px-12 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-24">
             <h3 className="font-display text-4xl font-black uppercase tracking-tighter">Micro-Prototypes</h3>
             <div className="flex gap-2">
                <Box className="w-6 h-6" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/40">Archive.V1</span>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {[
               { name: 'LFR Robot', asset: './assets/Project_Report_LFR.pdf' },
               { name: 'Gesture Recognition', asset: './assets/DanReality.pdf' },
               { name: 'Port.folio V1', asset: './assets/Aurora_Report.pdf' },
               { name: 'Unity Sim', asset: './assets/JanBroz_Performance.mp4' }
             ].map((exp, i) => (
                <a 
                  key={i} 
                  href={exp.asset}
                  target="_blank"
                  rel="noreferrer"
                  className="p-8 border-2 border-black flex flex-col justify-between aspect-video group hover:bg-black hover:text-accent transition-all duration-300"
                >
                   <div className="flex justify-between items-start">
                     <div className="font-mono text-[10px] font-black uppercase opacity-30 group-hover:opacity-100 italic transition-all">0{i+4} // EXP</div>
                     <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                   <div className="font-display text-xl font-black uppercase leading-none">{exp.name}</div>
                </a>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

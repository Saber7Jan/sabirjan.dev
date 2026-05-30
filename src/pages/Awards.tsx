import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Download, ExternalLink, Filter, ChevronRight, FileText, BarChart3, Play } from "lucide-react";
import data from "../data.json";

export default function Awards() {
  const { awards } = data;
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(awards ? awards.filter(a => a && a.category).map(a => a.category) : []))];
  const filteredAwards = filter === "All" ? (awards || []) : (awards || []).filter(a => a && a.category === filter);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="font-mono text-sm uppercase font-black tracking-[0.2em] text-accent">
              Recognition // Trace
            </div>
            <h1 className="font-display text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8]">
              ELITE <br /> <span className="text-black/10 transition-colors hover:text-black">ACHIEVEMENTS.</span>
            </h1>
            
            <div className="flex flex-wrap gap-3 mt-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-3 font-mono text-[10px] uppercase font-black tracking-widest transition-all ${
                    filter === cat 
                    ? "bg-black text-accent" 
                    : "bg-white text-black/40 border border-black/10 hover:border-black hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredAwards.map((award, i) => (
              <motion.div
                key={award.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative border-2 border-black p-10 flex flex-col justify-between aspect-square hover:bg-black transition-colors duration-500"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="font-mono text-[10px] uppercase font-black text-black/30 group-hover:text-accent tracking-tighter">
                    {award.year} // {award.category}
                  </div>
                  <Award className="w-8 h-8 text-black group-hover:text-white transition-colors" />
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-4xl font-black uppercase tracking-tighter leading-none text-black group-hover:text-white transition-colors">
                    {award.title}
                  </h3>
                  <div className="font-mono text-[11px] uppercase font-bold text-accent">
                    {award.org}
                  </div>
                  <p className="font-sans text-sm text-black/60 group-hover:text-white/40 leading-relaxed line-clamp-3">
                    {award.description}
                  </p>
                </div>

                <div className="mt-12 flex gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {award.link ? (
                    <a 
                      href={award.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 bg-white text-black px-6 py-3 font-mono text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-2 hover:bg-accent transition-colors"
                    >
                      <Play className="w-4 h-4 fill-current" /> Watch Performance
                    </a>
                  ) : award.certificate && (
                    <a 
                      href={award.certificate} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 bg-accent text-black px-6 py-3 font-mono text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                    >
                      <FileText className="w-4 h-4" /> View Certificate
                    </a>
                  )}
                </div>
                
                {/* Background Number */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[15rem] font-black text-black/[0.02] group-hover:text-white/[0.02] select-none pointer-events-none transition-colors">
                  {award.year ? award.year.slice(-2) : "00"}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Honor Roll / Scholastic Section */}
        <section className="mt-48">
          <div className="border-t-4 border-black pt-12 mb-16 flex justify-between items-end">
             <h2 className="font-display text-5xl font-black uppercase tracking-tighter leading-none">Scholastic <br />Validation.</h2>
             <div className="font-mono text-[10px] uppercase font-bold text-black/40">Verified Institutional Records</div>
          </div>
          
          <div className="space-y-6">
            {data.education.map((edu, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 20 }}
                className="p-8 border border-black flex flex-col hover:bg-black group transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                  <div className="flex gap-8 items-center w-full md:w-auto">
                    <div className="w-16 h-16 bg-black text-white group-hover:bg-accent group-hover:text-black flex items-center justify-center font-display text-2xl font-black shrink-0">
                        0{i+1}
                    </div>
                    <div>
                        <h4 className="font-display text-2xl font-black uppercase text-black group-hover:text-white leading-none">{edu.degree}</h4>
                        <p className="font-serif italic text-black/50 group-hover:text-accent">{edu.institution} // {edu.period}</p>
                    </div>
                  </div>
                  <div className="font-mono text-[10px] uppercase font-bold text-black/30 group-hover:text-accent/50 tracking-widest self-start md:self-center">
                    {edu.location}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {edu.certificate && (
                    <a href={edu.certificate} target="_blank" rel="noreferrer" className="bg-black text-white group-hover:bg-white group-hover:text-black px-6 py-3 font-mono text-[9px] uppercase font-black tracking-widest flex items-center justify-center gap-3 transition-all border border-transparent group-hover:border-black">
                      <FileText className="w-3 h-3" /> Certificate
                    </a>
                  )}
                  {edu.transcript && (
                    <a href={edu.transcript} target="_blank" rel="noreferrer" className="border-2 border-black text-black group-hover:border-accent group-hover:text-accent px-6 py-3 font-mono text-[9px] uppercase font-black tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-accent hover:text-black">
                      <Download className="w-3 h-3" /> Transcript
                    </a>
                  )}
                  {/* @ts-ignore */}
                  {edu.resultCard && (
                    <a href={edu.resultCard} target="_blank" rel="noreferrer" className="border border-black/20 text-black/40 group-hover:border-white/20 group-hover:text-white/60 px-6 py-3 font-mono text-[9px] uppercase font-black tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-white hover:text-black">
                      <BarChart3 className="w-3 h-3" /> Result Card
                    </a>
                  )}
                  {/* @ts-ignore */}
                  {edu.characterCertificate && (
                    <a href={edu.characterCertificate} target="_blank" rel="noreferrer" className="border border-black/20 text-black/40 group-hover:border-white/20 group-hover:text-white/60 px-6 py-3 font-mono text-[9px] uppercase font-black tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-white hover:text-black">
                      <FileText className="w-3 h-3" /> Character Cert
                    </a>
                  )}
                  {/* @ts-ignore */}
                  {edu.englishCertificate && (
                    <a href={edu.englishCertificate} target="_blank" rel="noreferrer" className="border border-black/20 text-black/40 group-hover:border-white/20 group-hover:text-white/60 px-6 py-3 font-mono text-[9px] uppercase font-black tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-white hover:text-black">
                      <FileText className="w-3 h-3" /> English Cert
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

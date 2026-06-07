import * as React from "react";
import { motion } from "motion/react";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download, Github, Linkedin, Mail, Play } from "lucide-react";
import { SkillsRadar } from "../components/SkillsRadar";
import data from "../data.json";

export default function Home() {
  const { profile, projects } = data;

  return (
    <div className="pt-20 bg-zinc-950 text-white min-h-screen">
      {/* Hero Section */}
      <header className="min-h-[90vh] py-20 px-6 md:px-12 flex flex-col items-center justify-center border-b border-white/5 relative overflow-hidden bg-zinc-950">
        {/* Background Marquee (CR7 Style) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.05] font-display text-[26vw] leading-none text-white font-black whitespace-nowrap animate-marquee z-0">
          SABIR JAN PROJECT // SABIR JAN PROJECT // SABIR JAN PROJECT
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center"
        >
          <div className="relative inline-block mb-16">
            <div className="absolute -inset-4 border border-accent/20 animate-spin-slow rounded-full" />
            <div className="absolute -inset-8 border border-white/5 animate-reverse-spin-slow rounded-full" />
            <div className="w-40 h-40 md:w-64 md:h-64 border-4 border-zinc-900 rounded-full overflow-hidden bg-zinc-900 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
               <img 
                 src={profile.image || "./assets/Profile_Picture.jpg"} 
                 alt="Sabir Jan" 
                 className="w-full h-full object-cover"
                 onError={(e) => (e.currentTarget.src = "https://ui-avatars.com/api/?name=Sabir+Jan&background=18181b&color=EAB308&size=512")}
               />
            </div>
            <div className="absolute bottom-2 right-2 w-10 h-10 bg-accent rounded-full border-4 border-zinc-950 flex items-center justify-center">
               <div className="w-2 h-2 bg-black animate-ping rounded-full" />
            </div>
          </div>

          <h1 className="font-display font-black text-7xl md:text-[12vw] leading-[0.75] tracking-tighter uppercase mb-8 text-white drop-shadow-2xl">
            Sabir <br className="md:hidden" /> <span className="text-stroke">Jan</span>
          </h1>

          <div className="h-12 mb-12">
            <TypeAnimation
              sequence={[
                profile.roles[0], 2000,
                profile.roles[1], 2000,
                profile.roles[2], 2000,
                profile.roles[3], 2500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="font-mono text-lg md:text-2xl text-accent font-black uppercase tracking-[0.4em]"
            />
          </div>

          <p className="max-w-2xl mx-auto font-sans text-xl text-zinc-400 mb-16 leading-relaxed font-light">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
             <a 
               href={profile.socials.cv} 
               target="_blank" 
               rel="noreferrer"
               className="group relative bg-accent text-black px-16 py-6 font-mono text-xs uppercase tracking-[0.5em] font-black hover:bg-white transition-all flex items-center gap-4 overflow-hidden shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)]"
             >
               <span className="relative z-10 flex items-center gap-3">Download Dossier <Download className="w-4 h-4" /></span>
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             </a>
             
             <div className="flex bg-zinc-900 border border-white/10 h-20 px-4">
                <div className="flex items-center gap-0 divide-x divide-white/5">
                   <a href={profile.socials.github} target="_blank" rel="noreferrer" className="w-20 h-full flex items-center justify-center text-zinc-400 hover:text-accent transition-all group">
                      <Github className="w-6 h-6 group-hover:scale-125 transition-transform" />
                   </a>
                   <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="w-20 h-full flex items-center justify-center text-zinc-400 hover:text-accent transition-all group">
                      <Linkedin className="w-6 h-6 group-hover:scale-125 transition-transform" />
                   </a>
                   <a href={`mailto:${profile.email}`} className="w-20 h-full flex items-center justify-center text-zinc-400 hover:text-accent transition-all group">
                      <Mail className="w-6 h-6 group-hover:scale-125 transition-transform" />
                   </a>
                </div>
             </div>
          </div>
        </motion.div>
      </header>

      {/* Highlights Section */}
      <section id="work" className="py-48 px-6 md:px-12 bg-zinc-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-32">
            <div className="space-y-6">
              <div className="font-mono text-xs uppercase font-black text-accent bg-zinc-900 px-4 py-2 w-fit tracking-[0.3em] border border-accent/20">Featured Research // MS-READY</div>
              <h2 className="font-display text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none text-white">
                Core <span className="text-stroke">Focus.</span>
              </h2>
            </div>
            <p className="max-w-md font-sans text-zinc-500 text-right text-xl leading-relaxed italic border-r-2 border-accent pr-8 py-2">
              "Democratizing affective computing by moving sensor technology from the skin into the environment."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 ring-1 ring-white/5">
            {projects.slice(0, 2).map((proj) => (
              <motion.div 
                key={proj.id}
                whileHover={{ backgroundColor: "#121214" }}
                className="group relative bg-zinc-950 p-16 transition-all duration-700 flex flex-col justify-between aspect-square overflow-hidden border border-transparent hover:border-accent/20"
              >
                {/* Project Hover Background Video Preview */}
                {["emotifi", "danreality", "aurora", "lfr-robot"].includes(proj.id) && (
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-all duration-1000 z-0 scale-100 pointer-events-none">
                    <iframe 
                      src={
                        proj.id === "emotifi"
                          ? "https://www.youtube.com/embed/H_fxB56YC5Q?autoplay=1&mute=1&controls=0&loop=1&playlist=H_fxB56YC5Q&modestbranding=1&rel=0&disablekb=1&playsinline=1"
                          : proj.id === "danreality"
                          ? "https://www.youtube.com/embed/UASRLqS-DsA?autoplay=1&mute=1&controls=0&loop=1&playlist=UASRLqS-DsA&modestbranding=1&rel=0&disablekb=1&playsinline=1"
                          : proj.id === "aurora"
                          ? "https://www.youtube.com/embed/-va8icMUQxg?autoplay=1&mute=1&controls=0&loop=1&playlist=-va8icMUQxg&modestbranding=1&rel=0&disablekb=1&playsinline=1"
                          : "https://www.youtube.com/embed/K3fT9XW_9eA?autoplay=1&mute=1&controls=0&loop=1&playlist=K3fT9XW_9eA&modestbranding=1&rel=0&disablekb=1&playsinline=1"
                      }
                      title={`${proj.id} background`}
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="font-mono text-xs uppercase font-black text-accent/40 group-hover:text-accent transition-colors tracking-widest">
                      // {proj.subtitle}
                    </div>
                    <div className="font-mono text-[10px] text-zinc-500 font-bold px-2 py-1 border border-zinc-800">
                      V_2.0
                    </div>
                  </div>
                  
                  <h3 className="font-display text-5xl md:text-7xl font-black mb-8 text-white group-hover:text-accent transition-colors leading-none tracking-tighter">
                    {proj.title.split(":")[0]}
                  </h3>
                  
                  <p className="text-zinc-500 group-hover:text-zinc-300 mb-12 text-xl leading-relaxed font-light max-w-sm">
                    {proj.description}
                  </p>

                  {/* Asset Quick Links - Optimized for Research Focus */}
                  <div className="flex flex-wrap gap-3 mb-12 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500 relative z-20">
                    <Link 
                      to={`/projects/${proj.id}`}
                      className="px-6 py-3 bg-white text-black font-mono text-[10px] uppercase font-black hover:bg-accent transition-all flex items-center gap-2"
                    >
                      Case Study <ArrowUpRight className="w-3 h-3" />
                    </Link>
                    {/* @ts-ignore */}
                    {proj.projectPitch && (
                      <a 
                        href={proj.projectPitch} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-6 py-3 bg-[#00FF41] text-black font-mono text-[10px] uppercase font-black hover:bg-white hover:text-black transition-all"
                      >
                        Project Pitch
                      </a>
                    )}
                    {proj.assets?.map((asset, ai) => (
                      <a 
                        key={ai}
                        href={asset.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-6 py-3 bg-zinc-900 border border-white/10 text-white font-mono text-[10px] uppercase font-black hover:bg-accent hover:text-black transition-all"
                      >
                        {asset.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-12 text-zinc-500 group-hover:border-accent/20 group-hover:text-accent transition-all relative z-10">
                  <a href={proj.link} target="_blank" rel="noreferrer" className="font-mono text-xs uppercase font-black tracking-[0.3em] flex items-center gap-3 hover:gap-6 transition-all">
                    Explore Repository <Github className="w-5 h-5" />
                  </a>
                  <div className="flex gap-2">
                    {proj.tech.slice(0, 2).map(t => (
                      <span key={t} className="font-mono text-[10px] uppercase opacity-20 group-hover:opacity-100 transition-all">/ {t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Radar Section */}
      <section className="py-48 px-6 md:px-12 bg-zinc-900 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full grid-bg opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="space-y-10">
            <div className="font-mono text-sm uppercase font-black text-accent tracking-[0.5em]">Capabilities // 2026</div>
            <h2 className="font-display text-7xl md:text-[8vw] font-black uppercase tracking-tighter leading-[0.75] mb-12 text-white">
              CORE <br /> <span className="text-stroke italic">STRENGTHS.</span>
            </h2>
            <p className="font-sans text-2xl text-zinc-400 leading-relaxed max-w-xl font-light">
              My technical expertise spans hardware-level signal processing, deep learning architectural design, and creative choreography—creating a unique triangle optimized for <span className="text-white font-medium italic">affective computing</span>.
            </p>
            <div className="flex flex-wrap gap-4 pt-12">
               {["Python", "TensorFlow", "React", "Unity", "ESP32", "Mediapipe"].map(s => (
                 <span key={s} className="px-8 py-3 glass font-mono text-xs font-black uppercase text-accent tracking-widest">{s}</span>
               ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent/10 rounded-full blur-[100px] group-hover:bg-accent/20 transition-all duration-1000" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/5 rounded-full blur-[100px]" />
            
            <div className="relative z-10 scale-110 md:scale-150 transition-transform duration-1000 group-hover:scale-[1.6]">
               <SkillsRadar dark={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Dance Portfolio Section (JanBroz / DanReality) */}
      <section className="py-64 px-6 md:px-12 bg-zinc-950 text-white relative overflow-hidden">
        {/* Large Background Text */}
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] font-display text-[30vw] font-black leading-none select-none pointer-events-none uppercase text-stroke">
          DANCE
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
           <motion.div
             initial={{ opacity: 0, x: -100 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
             className="relative"
           >
              <div className="aspect-[4/5] border-[20px] border-white/5 relative overflow-hidden group shadow-2xl">
                 {/* Video Preview on Main Dance Card */}
                 <iframe 
                    src="https://www.youtube.com/embed/BZwzWJesn-g?autoplay=1&mute=1&controls=0&loop=1&playlist=BZwzWJesn-g&modestbranding=1&rel=0&disablekb=1"
                    title="KPOP Performance Highlight"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-1000 z-10 pointer-events-none"
                  />
                 <img 
                   src="/assets/DanReality_Thumb.jpg" 
                   className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:blur-sm" 
                   alt="Dance Performance" 
                   onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=2000")}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80 z-20" />
                 <div className="absolute bottom-12 left-12 z-30">
                    <div className="font-mono text-xs uppercase font-black text-accent tracking-[0.5em] mb-6 border-l-2 border-accent pl-4">JanBroz // Performance</div>
                    <h3 className="font-display text-5xl font-black uppercase text-white leading-none tracking-tighter">Choreography as <br />Spatial Code.</h3>
                 </div>
              </div>
              
              {/* Floating Award Decoration */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-16 -right-16 w-64 h-64 bg-accent p-10 flex flex-col items-center justify-center -rotate-6 shadow-[0_20px_50px_rgba(234,179,8,0.3)] z-40"
              >
                 <span className="font-display text-3xl font-black text-black text-center uppercase tracking-tighter leading-none mb-4">3rd Prize Winner</span>
                 <div className="w-full h-px bg-black/20 mb-4" />
                 <span className="font-mono text-[9px] font-black text-black/60 text-center uppercase tracking-widest">Korea World Festival Qualifying Tournament</span>
              </motion.div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: 100 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
             className="space-y-16"
           >
              <div className="space-y-6">
                 <div className="font-mono text-sm uppercase font-black text-accent tracking-[1em]">The Body as an Emitter</div>
                 <h2 className="font-display text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none text-white">
                   JAN<span className="text-stroke italic text-accent">BROZ.</span>
                 </h2>
              </div>

              <div className="space-y-8 font-sans text-2xl text-zinc-400 leading-relaxed font-light">
                 <p>
                   Beyond research papers and signal analysis, I express the same principles of flow and frequency through <span className="text-white font-medium">heritage dance</span>. 
                 </p>
                 <p>
                   My performance art blends the geometry of the Gilgit-Baltistan highlands with modern urban movement. In <span className="text-accent italic">JanBroz</span>, I map these choreographic patterns into digital experiences, turning the human body into a primary interface.
                 </p>
              </div>

              <div className="flex flex-col gap-8">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="p-8 glass hover:bg-white/5 transition-colors group">
                       <div className="font-display text-5xl font-black text-white italic mb-2 group-hover:text-accent transition-colors">85+</div>
                       <div className="font-mono text-[10px] uppercase text-zinc-500 tracking-widest">Global Stages</div>
                    </div>
                    <div className="p-8 glass hover:bg-white/5 transition-colors group">
                       <div className="font-display text-5xl font-black text-white italic mb-2 group-hover:text-accent transition-colors">K-POP</div>
                       <div className="font-mono text-[10px] uppercase text-zinc-500 tracking-widest">Festival Winner</div>
                    </div>
                 </div>
                 
                 <a 
                   href={profile.socials.archive || "https://www.instagram.com/janbroz78"} 
                   target="_blank" 
                   rel="noreferrer"
                   className="group relative w-full py-8 border-2 border-accent text-accent font-mono text-xs uppercase font-black tracking-widest flex items-center justify-center gap-6 overflow-hidden transition-all hover:text-black"
                 >
                    <span className="relative z-10 flex items-center gap-4"><Play className="w-6 h-6 fill-current" /> View Performance Archive</span>
                    <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                 </a>
              </div>
           </motion.div>
        </div>
      </section>
    </div>
  );
}

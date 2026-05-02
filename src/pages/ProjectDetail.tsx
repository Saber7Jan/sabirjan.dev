import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Github, ExternalLink, Download, FileText, 
  Zap, Code2, Layers, Cpu, Play, ChevronLeft, ChevronRight 
} from "lucide-react";
import data from "../data.json";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = data.projects.find(p => p.id === id);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  if (!project) {
    return (
      <div className="pt-48 pb-24 px-6 text-center">
        <h1 className="font-display text-4xl mb-8">Project Not Found</h1>
        <Link to="/projects" className="text-accent underline">Back to Projects</Link>
      </div>
    );
  }

  const nextSlide = () => {
    if (project.gallery) {
      setCurrentSlide((prev) => (prev + 1) % project.gallery.length);
    }
  };

  const prevSlide = () => {
    if (project.gallery) {
      setCurrentSlide((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Dynamic Hero */}
      <section className="relative h-[80vh] bg-black overflow-hidden sticky top-0 z-0">
         <motion.img 
           initial={{ scale: 1.1, opacity: 0.5 }}
           animate={{ scale: 1, opacity: 0.3 }}
           transition={{ duration: 1.5 }}
           src={project.image} 
           className="w-full h-full object-cover grayscale brightness-50" 
           alt={project.title} 
         />
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-7xl md:text-[10vw] text-white font-black uppercase tracking-tighter leading-none text-center"
            >
              {project.title.split(':').map((part, i) => (
                <React.Fragment key={i}>
                  {part} {i === 0 && <br />}
                </React.Fragment>
              ))}
            </motion.h1>
         </div>
         
         <div className="absolute bottom-12 left-6 md:left-12">
            <button 
              onClick={() => navigate('/projects')}
              className="flex items-center gap-4 text-white hover:text-accent transition-colors group"
            >
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent">
                 <ArrowLeft className="w-5 h-5" />
               </div>
               <span className="font-mono text-xs uppercase font-black tracking-widest">Back to Exhibits</span>
            </button>
         </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 bg-white pt-24 pb-48 px-6 md:px-12 rounded-t-[5vw] -mt-[5vh]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-12">
               <div className="w-12 h-1 px bg-black" />
               <div className="font-mono text-sm uppercase font-black tracking-widest text-black/30">{project.subtitle}</div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="font-display text-5xl font-black uppercase tracking-tighter leading-tight">
                Abstract <br /> <span className="italic underline decoration-accent decoration-4 underline-offset-8">Research Specification.</span>
              </h2>
              <p className="font-sans text-2xl text-black/70 leading-relaxed font-light first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-black">
                {project.longDescription}
              </p>
            </motion.div>

            {/* Tech Stack Grid */}
            <div className="mt-24">
               <div className="font-mono text-[10px] uppercase font-black text-black/30 tracking-widest mb-12">Technical Dependencies // Stack</div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.fullTech?.map((t, i) => (
                    <motion.div 
                      key={t}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="p-6 border border-black/10 flex flex-col items-center gap-4 hover:border-black transition-all"
                    >
                       <Code2 className="w-6 h-6 text-accent" />
                       <span className="font-mono text-[10px] uppercase font-black text-center">{t}</span>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            {/* Sidebar Assets */}
            <div className="sticky top-32 space-y-8">
               <div className="p-8 border-4 border-black bg-black text-white">
                  <div className="font-mono text-[10px] uppercase font-black text-white/40 tracking-widest mb-8">Asset Dossier</div>
                  <div className="space-y-4">
                     {project.assets?.map((asset, i) => (
                        <a 
                          key={i}
                          href={asset.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-4 border border-white/10 hover:border-accent hover:text-accent transition-all group"
                        >
                           <div className="flex items-center gap-4">
                              {asset.name.toLowerCase().includes('video') ? <Play className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                              <span className="font-mono text-[10px] uppercase font-black">{asset.name}</span>
                           </div>
                           <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                     ))}
                     <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 bg-accent text-black font-mono text-[10px] uppercase font-black hover:scale-[1.02] transition-transform"
                     >
                        <span>Github Repository</span>
                        <Github className="w-4 h-4" />
                     </a>
                  </div>
               </div>

               <div className="p-8 border-2 border-black">
                  <div className="font-mono text-[10px] uppercase font-black text-black/30 tracking-widest mb-6">Status Indicator</div>
                  <div className="flex items-center gap-4">
                     <div className="w-4 h-4 rounded-full bg-accent animate-pulse" />
                     <span className="font-display text-4xl font-black uppercase text-black italic leading-none">{project.status}</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Dynamic Slides Section for EmotiFi */}
        {project.id === 'emotifi' && (
          <section className="mt-32 max-w-7xl mx-auto px-6 md:px-0">
            <div className="flex items-center gap-6 mb-12 border-l-4 border-accent pl-6">
               <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter">Presentation <br /> <span className="text-black/20 italic">Slides.</span></h2>
            </div>
            <div className="w-full aspect-video bg-zinc-100 border-4 border-black overflow-hidden shadow-2xl relative group">
               <iframe 
                 src="/assets/FYP_EXTERNAL_2_FINAL.pdf#toolbar=0&navpanes=0&scrollbar=0" 
                 className="w-full h-full border-none"
                 title="EmotiFi Presentation Slides"
               />
               <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a 
                    href="/assets/FYP_EXTERNAL_2_FINAL.pdf" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-black text-white p-3 rounded-full hover:bg-accent hover:text-black transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
               </div>
               {/* Overlay for better click behavior in some browsers */}
               <div className="absolute inset-0 pointer-events-none border border-black/10" />
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase font-bold text-black/40 text-center tracking-widest">* Comprehensive slides detailing Wi-Fi CSI biometric signatures and model optimization.</p>
          </section>
        )}

        {/* Specialized Demo for DanReality (JanBroz) */}
        {project.id === 'danreality' && (
          <section className="mt-32 max-w-7xl mx-auto px-6 md:px-0">
            <div className="flex items-center gap-6 mb-12 border-l-4 border-accent pl-6">
               <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter">Live Artist <br /> <span className="text-black/20 italic">Demo.</span></h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="w-full aspect-video bg-black border-4 border-black overflow-hidden shadow-2xl relative group">
                   <video 
                     src="/assets/JanBroz_Performance.mp4"
                     className="w-full h-full object-cover"
                     controls
                   />
                </div>
              </div>
              <div className="lg:col-span-5 space-y-8">
                <div className="p-8 bg-zinc-50 border-2 border-black">
                  <h3 className="font-display text-2xl font-black uppercase mb-4 tracking-tighter">Experimental Artist Site</h3>
                  <p className="font-sans text-lg text-black/60 leading-relaxed mb-6">
                    JanBroz – my dedicated creative technology portfolio – features real-time MediaPipe integrations and immersive dance-driven generative art.
                  </p>
                  <a 
                    href="https://saber7jan.github.io/JanBroz/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-4 bg-black text-white px-8 py-4 font-mono text-xs uppercase font-black tracking-widest hover:bg-accent hover:text-black transition-all"
                  >
                    Launch Live Site <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Gallery / Carousel (CR7 Style: Immersive & Bold) */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mt-48">
            <div className="max-w-7xl mx-auto mb-16 px-0 md:px-0 flex justify-between items-end border-b-4 border-black pb-8">
               <h2 className="font-display text-5xl font-black uppercase tracking-tighter">Visual <br /> <span className="text-black/20 italic">Evidence.</span></h2>
               <div className="flex gap-4">
                  <button onClick={prevSlide} className="w-16 h-16 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={nextSlide} className="w-16 h-16 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
                    <ChevronRight className="w-6 h-6" />
                  </button>
               </div>
            </div>

            <div className="relative aspect-video w-full overflow-hidden bg-black border-[12px] border-black">
               <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full relative"
                  >
                    {project.gallery[currentSlide].type === 'video' ? (
                      <video 
                        src={project.gallery[currentSlide].url} 
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        muted
                        loop
                      />
                    ) : (
                      <img 
                        src={project.gallery[currentSlide].url} 
                        className="w-full h-full object-cover"
                        alt={project.gallery[currentSlide].caption}
                      />
                    )}
                    <div className="absolute bottom-12 left-12 p-8 bg-black border-l-4 border-accent max-w-sm">
                       <p className="font-mono text-xs text-white uppercase font-black tracking-widest mb-2 opacity-40">Entry_0{currentSlide + 1} // Frame</p>
                       <p className="font-display text-xl text-white font-black uppercase tracking-tighter">{project.gallery[currentSlide].caption}</p>
                    </div>
                  </motion.div>
               </AnimatePresence>
            </div>
            
            <div className="mt-8 flex justify-center gap-4">
               {project.gallery.map((_, i) => (
                 <button 
                   key={i}
                   onClick={() => setCurrentSlide(i)}
                   className={`h-1 transition-all duration-500 ${currentSlide === i ? 'w-24 bg-accent' : 'w-8 bg-black/10 hover:bg-black/30'}`}
                 />
               ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

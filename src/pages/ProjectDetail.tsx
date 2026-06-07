import * as React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Github, ExternalLink, Download, FileText, 
  Code2, ChevronLeft, ChevronRight, Target, Zap 
} from "lucide-react";
import data from "../data.json";

// YouTube format helper
const h = (url: string): string => {
  if (!url) return "";
  let id = "";
  if (url.includes("youtu.be/")) {
    id = url.split("youtu.be/")[1]?.split("?")[0] || "";
  } else if (url.includes("youtube.com/watch?v=")) {
    id = url.split("v=")[1]?.split("&")[0] || "";
  } else if (url.includes("youtube.com/shorts/")) {
    id = url.split("shorts/")[1]?.split("?")[0] || "";
  } else {
    id = url;
  }
  return `https://www.youtube.com/embed/${id}`;
};

// Powerpoint viewer format helper
const m = (url: string): string => {
  const origin = window.location.origin + window.location.pathname.split("/#")[0];
  let srcUrl = url;
  if (url.startsWith("./")) {
    srcUrl = url.replace("./", origin + "/");
  } else if (!url.startsWith("http")) {
    srcUrl = origin + "/" + url;
  }
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(srcUrl)}&wdStartOn=0`;
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = data.projects.find(p => p.id === id);

  const [galleryIndex, setGalleryIndex] = React.useState(0);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [subSlideIndex, setSubSlideIndex] = React.useState(0);

  if (!project) {
    return (
      <div className="pt-48 pb-24 px-6 text-center bg-black min-h-screen text-white">
        <h1 className="font-display text-4xl mb-8 font-black">Project Not Found</h1>
        <Link to="/projects" className="text-[#00FF41] underline">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      {/* Dynamic Hero */}
      <section className="relative h-[80vh] bg-black overflow-hidden sticky top-0 z-0">
         {["emotifi", "danreality", "aurora", "lfr-robot"].includes(project.id) ? (
           <div className="absolute inset-0 z-0">
             <iframe 
               src={
                 project.id === "emotifi" 
                   ? "https://www.youtube.com/embed/H_fxB56YC5Q?autoplay=1&mute=1&controls=0&loop=1&playlist=H_fxB56YC5Q&modestbranding=1&rel=0&disablekb=1&playsinline=1"
                   : project.id === "danreality"
                   ? "https://www.youtube.com/embed/UASRLqS-DsA?autoplay=1&mute=1&controls=0&loop=1&playlist=UASRLqS-DsA&modestbranding=1&rel=0&disablekb=1&playsinline=1"
                   : project.id === "aurora"
                   ? "https://www.youtube.com/embed/-va8icMUQxg?autoplay=1&mute=1&controls=0&loop=1&playlist=-va8icMUQxg&modestbranding=1&rel=0&disablekb=1&playsinline=1"
                   : "https://www.youtube.com/embed/K3fT9XW_9eA?autoplay=1&mute=1&controls=0&loop=1&playlist=K3fT9XW_9eA&modestbranding=1&rel=0&disablekb=1&playsinline=1"
               }
               title={`${project.id} background hover`}
               allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
               className="w-full h-full object-cover opacity-30 filter brightness-50 absolute inset-0 pointer-events-none"
             />
           </div>
         ) : (
           <motion.img 
             initial={{ scale: 1.1, opacity: 0.5 }}
             animate={{ scale: 1, opacity: 0.25 }}
             transition={{ duration: 1.5 }}
             src={project.image} 
             className="w-full h-full object-cover grayscale brightness-50 opacity-25" 
             alt={project.title} 
           />
         )}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-[8vw] text-white font-black uppercase tracking-tighter leading-none text-center"
            >
              {project.title.split(':').map((part, i) => (
                <React.Fragment key={i}>
                  {part} {i === 0 && <br />}
                </React.Fragment>
              ))}
            </motion.h1>
         </div>
         
         <div className="absolute bottom-12 left-6 md:left-12 z-20">
            <button 
              onClick={() => navigate('/projects')}
              className="flex items-center gap-4 text-white hover:text-[#00FF41] transition-colors group"
            >
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#00FF41]">
                 <ArrowLeft className="w-5 h-5" />
               </div>
               <span className="font-mono text-xs uppercase font-black tracking-widest">Back to Exhibits</span>
            </button>
         </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 bg-[#050505] pt-24 pb-48 px-6 md:px-12 rounded-t-[5vw] -mt-[5vh] border-t border-white/10 shadow-[0_-30px_50px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-12">
               <div className="w-12 h-[2px] bg-[#00FF41]" />
               <div className="font-mono text-sm uppercase font-black tracking-[0.25em] text-[#00FF41]">{project.subtitle}</div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-white">
                Abstract <br /> <span className="italic underline decoration-[#00FF41] decoration-4 underline-offset-8">Research Specification.</span>
              </h2>
              <p className="font-sans text-xl text-zinc-300 leading-relaxed font-light first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-[#00FF41]">
                {project.id === "danreality" ? project.abstractSpecification : (project.longDescription || project.description)}
              </p>
            </motion.div>

            {/* Tech Stack Grid */}
            <div className="mt-24">
               <div className="font-mono text-[10px] uppercase font-black text-white/40 tracking-[0.4em] mb-12">Technical Dependencies // Stack</div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.fullTech?.map((t, i) => (
                    <motion.div 
                      key={t}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="p-6 border border-white/10 bg-zinc-900/40 flex flex-col items-center gap-4 hover:border-[#00FF41] hover:text-[#00FF41] transition-all"
                    >
                       <Code2 className="w-6 h-6 text-[#00FF41]" />
                       <span className="font-mono text-[10px] uppercase font-black text-center text-white/80">{t}</span>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            {/* Sidebar Assets */}
            <div className="sticky top-32 space-y-8">
               <div className="p-8 border-4 border-white bg-zinc-950 text-white">
                  <div className="font-mono text-[10px] uppercase font-black text-white/40 tracking-widest mb-8">Asset Dossier</div>
                  <div className="space-y-4">
                     {project.assets?.map((asset, i) => (
                        <a 
                          key={i}
                          href={asset.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-4 border border-white/10 bg-zinc-900/30 hover:border-[#00FF41] hover:text-[#00FF41] transition-all group"
                        >
                           <div className="flex items-center gap-4">
                              <FileText className="w-4 h-4 text-white/45" />
                              <span className="font-mono text-[10px] uppercase font-black">{asset.name}</span>
                           </div>
                           <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                     ))}
                     {/* @ts-ignore */}
                     {project.projectPitch && (
                        <a 
                          href={project.projectPitch} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-4 bg-[#00FF41] text-black font-mono text-[10px] uppercase font-black hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(0,255,65,0.25)]"
                        >
                           <div className="flex items-center gap-4">
                              <Zap className="w-4 h-4 text-black" />
                              <span className="font-mono text-[10px] uppercase font-black text-black">Project Pitch</span>
                           </div>
                           <ExternalLink className="w-4 h-4 text-black" />
                        </a>
                     )}
                     <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-between justify-between p-5 bg-[#00FF41] text-black font-mono text-[10px] uppercase font-black hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(0,255,65,0.25)]"
                     >
                        <span>Github Repository</span>
                        <Github className="w-4 h-4 animate-pulse" />
                     </a>
                  </div>
               </div>

               <div className="p-8 border-2 border-white/15 bg-zinc-900/20">
                  <div className="font-mono text-[10px] uppercase font-black text-white/30 tracking-widest mb-6">Status Indicator</div>
                  <div className="flex items-center gap-4">
                     <div className="w-4 h-4 rounded-full bg-[#00FF41] animate-pulse" />
                     <span className="font-display text-4xl font-black uppercase text-white italic leading-none">{project.status}</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Dynamic Presentation Slides Section */}
        {project.presentationSlides && (
          <section className="mt-32 max-w-7xl mx-auto px-6 md:px-0 text-white">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-l-4 border-[#00FF41] pl-6">
                <div>
                   <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter">Presentation <br /> <span className="text-white/20 italic">Materials.</span></h2>
                </div>
                <div className="flex flex-wrap gap-3">
                   {project.presentationSlides.map((_, idx) => (
                     <button 
                       key={idx}
                       onClick={() => {
                         setSlideIndex(idx);
                         setSubSlideIndex(0);
                       }}
                       className={`px-6 py-3 font-mono text-[10px] uppercase font-black tracking-widest transition-all ${slideIndex === idx ? 'bg-white text-black border-2 border-white' : 'bg-transparent border-2 border-white/20 text-white hover:bg-white/10'}`}
                     >
                       Page {idx + 1}
                     </button>
                   ))}
                </div>
             </div>

             <AnimatePresence mode="wait">
               <motion.div
                 key={slideIndex}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.5 }}
               >
                 {project.presentationSlides[slideIndex].type === "document" ? (
                   <div className="space-y-6">
                     {project.presentationSlides[slideIndex].url.endsWith(".pptx") ? (
                       <div className="w-full aspect-video bg-zinc-900 border-4 border-white/10 overflow-hidden shadow-2xl relative group">
                         <iframe 
                           src={m(project.presentationSlides[slideIndex].url)} 
                           title={project.presentationSlides[slideIndex].title} 
                           className="w-full h-full border-none"
                           allowFullScreen
                         />
                         <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                           <a 
                             href={project.presentationSlides[slideIndex].url} 
                             target="_blank" 
                             rel="noreferrer" 
                             className="bg-black text-white p-5 rounded-full hover:bg-[#00FF41] hover:text-black transition-colors"
                             title="Open in new window"
                           >
                             <ExternalLink className="w-7 h-7" />
                           </a>
                           <a 
                             href={project.presentationSlides[slideIndex].url}
                             download 
                             className="bg-[#00FF41] text-black p-5 rounded-full hover:bg-white transition-colors"
                             title="Download file"
                           >
                             <Download className="w-7 h-7" />
                           </a>
                         </div>
                       </div>
                     ) : (
                       <div className="w-full aspect-video bg-zinc-900 border-4 border-white/10 overflow-hidden shadow-2xl relative group">
                          <iframe 
                            src={`${project.presentationSlides[slideIndex].url}#toolbar=0&navpanes=0&scrollbar=0`}
                            className="w-full h-full border-none"
                            title={project.presentationSlides[slideIndex].title}
                          />
                          <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a 
                              href={project.presentationSlides[slideIndex].url} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="bg-black text-white p-3 rounded-full hover:bg-[#00FF41] hover:text-black transition-colors"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          </div>
                       </div>
                     )}

                     <div className="flex items-center justify-between p-6 bg-zinc-900/60 border-2 border-white/10">
                       <div>
                          <p className="font-mono text-[10px] uppercase font-black text-white/40 tracking-widest mb-2">
                            {project.presentationSlides[slideIndex].slides ? `${project.presentationSlides[slideIndex].slides} SLIDES` : `PAGE ${slideIndex + 1}`}
                          </p>
                          <p className="font-display text-xl font-black uppercase tracking-tighter text-white">
                            {project.presentationSlides[slideIndex].title}
                          </p>
                          {project.presentationSlides[slideIndex].description && (
                            <p className="font-sans text-sm text-white/60 mt-2">
                              {project.presentationSlides[slideIndex].description}
                            </p>
                          )}
                       </div>
                       <FileText className="w-8 h-8 text-[#00FF41] opacity-30" />
                     </div>
                   </div>
                 ) : (
                   <div className="space-y-6">
                     <div className="relative aspect-video w-full overflow-hidden bg-black border-[12px] border-white/10 shadow-2xl">
                       <AnimatePresence mode="wait">
                         <motion.div
                           key={subSlideIndex}
                           initial={{ opacity: 0, scale: 1.05 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           transition={{ duration: 0.5 }}
                           className="w-full h-full relative"
                         >
                            <img 
                              src={project.presentationSlides[slideIndex].items[subSlideIndex].url} 
                              className="w-full h-full object-cover" 
                              alt={project.presentationSlides[slideIndex].items[subSlideIndex].caption} 
                            />
                            <div className="absolute bottom-12 left-12 p-8 bg-black border-l-4 border-[#00FF41] max-w-sm">
                               <p className="font-mono text-xs text-white uppercase font-black tracking-widest mb-2 opacity-40">
                                 Vis_{String(subSlideIndex + 1).padStart(2, "0")}
                               </p>
                               <p className="font-display text-xl text-white font-black uppercase tracking-tighter">
                                 {project.presentationSlides[slideIndex].items[subSlideIndex].caption}
                               </p>
                            </div>
                         </motion.div>
                       </AnimatePresence>
                     </div>

                     <div className="flex items-center justify-between">
                       <div className="flex gap-3">
                          <button 
                            onClick={() => setSubSlideIndex(prev => prev === 0 ? project.presentationSlides[slideIndex].items.length - 1 : prev - 1)}
                            className="w-16 h-16 border-2 border-white/15 bg-zinc-900/50 flex items-center justify-center hover:bg-[#00FF41] hover:text-black hover:border-[#00FF41] transition-all"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button 
                            onClick={() => setSubSlideIndex(prev => (prev + 1) % project.presentationSlides[slideIndex].items.length)}
                            className="w-16 h-16 border-2 border-white/15 bg-zinc-900/50 flex items-center justify-center hover:bg-[#00FF41] hover:text-black hover:border-[#00FF41] transition-all"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                       </div>
                       <div className="flex gap-3">
                          {project.presentationSlides[slideIndex].items.map((_, subIdx) => (
                             <button 
                               key={subIdx}
                               onClick={() => setSubSlideIndex(subIdx)}
                               className={`h-1 transition-all duration-500 ${subSlideIndex === subIdx ? 'w-12 bg-[#00FF41]' : 'w-2 bg-white/10 hover:bg-[#00FF41]'}`}
                             />
                          ))}
                       </div>
                     </div>
                   </div>
                 )}
               </motion.div>
             </AnimatePresence>
          </section>
        )}

        {/* Specialized Demo for DanReality */}
        {project.id === "danreality" && (
          <section className="mt-32 max-w-7xl mx-auto px-6 md:px-0">
            <div className="flex items-center gap-6 mb-12 border-l-4 border-[#00FF41] pl-6">
               <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter">Live Artist <br /> <span className="text-white/20 italic">Demo.</span></h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
               <div className="lg:col-span-7">
                 <div className="w-full aspect-video bg-black border-4 border-white/10 overflow-hidden shadow-2xl relative group">
                    <iframe 
                      src={h(project.liveArtistDemo || "https://youtu.be/GNNeJge3NpA")} 
                      className="w-full h-full border-none" 
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture" 
                      allowFullScreen 
                    />
                 </div>
               </div>
               <div className="lg:col-span-5 space-y-8">
                 <div className="p-8 bg-zinc-900/40 border-2 border-white/10 text-white">
                   <h3 className="font-display text-2xl font-black uppercase mb-4 tracking-tighter text-white">Experimental Artist Site</h3>
                   <p className="font-sans text-lg text-zinc-400 leading-relaxed mb-6">
                     JanBroz – my dedicated creative technology portfolio – features real-time MediaPipe integrations and immersive dance-driven generative art.
                   </p>
                   <a 
                     href="https://saber7jan.github.io/JanBroz/" 
                     target="_blank" 
                     rel="noreferrer"
                     className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 font-mono text-xs uppercase font-black tracking-widest hover:bg-[#00FF41] hover:text-black transition-all"
                   >
                     Launch Live Site <ExternalLink className="w-4 h-4" />
                   </a>
                 </div>
               </div>
            </div>
          </section>
        )}

        {/* Dynamic Gallery / Carousel Section (Visual Evidence matching the live portfolio) */}
        {(project.visualEvidence || project.gallery) && (
          ((project.visualEvidence?.length || 0) > 0 || (project.gallery?.length || 0) > 0)
        ) && (
          <section className="mt-24 md:mt-48 px-6 md:px-0">
             <div className="max-w-7xl mx-auto mb-8 md:mb-16 px-0 md:px-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 border-b-4 border-white pb-6 md:pb-8">
                <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Visual <br /> <span className="text-white/20 italic">Evidence.</span></h2>
                <div className="flex gap-2 md:gap-4 w-full md:w-auto">
                   <button 
                     onClick={() => setGalleryIndex(prev => {
                       const N = project.visualEvidence || project.gallery;
                       return prev === 0 ? N.length - 1 : prev - 1;
                     })}
                     className="flex-1 md:flex-none w-16 md:w-20 h-16 md:h-20 border-2 border-white/10 bg-zinc-900/50 flex items-center justify-center hover:bg-[#00FF41] hover:text-black hover:border-[#00FF41] transition-all"
                   >
                      <ChevronLeft className="w-6 md:w-8 h-6 md:h-8" />
                   </button>
                   <button 
                     onClick={() => setGalleryIndex(prev => {
                       const N = project.visualEvidence || project.gallery;
                       return (prev + 1) % N.length;
                     })}
                     className="flex-1 md:flex-none w-16 md:w-20 h-16 md:h-20 border-2 border-white/10 bg-zinc-900/50 flex items-center justify-center hover:bg-[#00FF41] hover:text-black hover:border-[#00FF41] transition-all"
                   >
                      <ChevronRight className="w-6 md:w-8 h-6 md:h-8" />
                   </button>
                </div>
             </div>

             <div className="relative w-full overflow-hidden bg-black border-[6px] md:border-[12px] border-white/15" style={{ aspectRatio: "16 / 9" }}>
                {project.visualEvidence && project.visualEvidence.length > 0 ? (
                   <AnimatePresence mode="wait">
                      <motion.div
                        key={galleryIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full relative"
                      >
                         <iframe 
                           src={h(project.visualEvidence[galleryIndex].url)} 
                           title={project.visualEvidence[galleryIndex].title} 
                           className="w-full h-full border-none"
                           allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                           allowFullScreen
                         />
                         <div className="absolute bottom-12 left-12 p-8 bg-black border-l-4 border-[#00FF41] max-w-sm border border-white/5 shadow-2xl">
                            <p className="font-mono text-xs text-white uppercase font-black tracking-widest mb-2 opacity-40">
                              {project.visualEvidence[galleryIndex].entry}
                            </p>
                            <p className="font-display text-xl text-white font-black uppercase tracking-tighter">
                              {project.visualEvidence[galleryIndex].title}
                            </p>
                         </div>
                      </motion.div>
                   </AnimatePresence>
                ) : (
                   <AnimatePresence mode="wait">
                      <motion.div
                        key={galleryIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full relative"
                      >
                         {project.gallery && project.gallery[galleryIndex] && project.gallery[galleryIndex].type === "video" ? (
                            <video 
                              src={project.gallery[galleryIndex].url} 
                              className="w-full h-full object-cover" 
                              controls 
                              autoPlay 
                              muted 
                              loop 
                            />
                         ) : (
                           project.gallery && project.gallery[galleryIndex] && (
                            <img 
                              src={project.gallery[galleryIndex].url} 
                              className="w-full h-full object-cover" 
                              alt={project.gallery[galleryIndex].caption} 
                            />
                           )
                         )}
                         {project.gallery && project.gallery[galleryIndex] && (
                           <div className="absolute bottom-12 left-12 p-8 bg-black border-l-4 border-[#00FF41] max-w-sm border border-white/5 shadow-2xl">
                              <p className="font-mono text-xs text-white uppercase font-black tracking-widest mb-2 opacity-40">
                                Entry_0{galleryIndex + 1} // Frame
                              </p>
                              <p className="font-display text-xl text-white font-black uppercase tracking-tighter">
                                {project.gallery[galleryIndex].caption}
                              </p>
                           </div>
                         )}
                      </motion.div>
                   </AnimatePresence>
                )}
             </div>

             <div className="mt-6 md:mt-8 flex justify-center gap-2 md:gap-4">
                {(project.visualEvidence || project.gallery || []).map((_, idx) => (
                   <button 
                     key={idx}
                     onClick={() => setGalleryIndex(idx)}
                     className={`h-1 transition-all duration-500 ${galleryIndex === idx ? 'w-16 md:w-24 bg-[#00FF41]' : 'w-4 md:w-8 bg-white/10 hover:bg-white/30'}`}
                   />
                ))}
             </div>
          </section>
        )}
      </section>
    </div>
  );
}

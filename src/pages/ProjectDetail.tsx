import * as React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Github, ExternalLink, Download, FileText, X, 
  Code2, ChevronLeft, ChevronRight, Target, Zap 
} from "lucide-react";
import data from "../data.json";
import { PDFViewer } from "../components/PDFViewer";

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

  // Mobile Detection
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState(false);
  React.useEffect(() => {
    const checkSize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Fullscreen Modal Media Viewer State
  const [modalMedia, setModalMedia] = React.useState<{ type: 'image' | 'video' | 'youtube'; url: string; caption?: string } | null>(null);
  const [zoomScale, setZoomScale] = React.useState(1);

  // Swipe Gestures Tracking State
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);
  const [touchEndX, setTouchEndX] = React.useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (totalItems: number, setIndex: React.Dispatch<React.SetStateAction<number>>) => {
    if (!touchStartX || !touchEndX) return;
    const diff = touchStartX - touchEndX;
    const minSwipe = 40;
    if (diff > minSwipe) {
      // Swiped left -> next
      setIndex(prev => (prev + 1) % totalItems);
    } else if (diff < -minSwipe) {
      // Swiped right -> prev
      setIndex(prev => (prev - 1 + totalItems) % totalItems);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Helper to extract YouTube IDs for responsive thumbnail retrieval
  const getYoutubeId = (url: string): string => {
    if (!url) return "";
    let yid = "";
    if (url.includes("youtu.be/")) {
      yid = url.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (url.includes("youtube.com/watch?v=")) {
      yid = url.split("v=")[1]?.split("&")[0] || "";
    } else if (url.includes("youtube.com/shorts/")) {
      yid = url.split("shorts/")[1]?.split("?")[0] || "";
    } else {
      yid = url;
    }
    return yid;
  };

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
      {isMobileOrTablet ? (
        <section className="bg-black pt-24 pb-8 px-6 border-b border-white/10 relative z-10">
          <div className="max-w-7xl mx-auto space-y-6">
            <button 
              onClick={() => navigate('/projects')}
              className="flex items-center gap-4 text-white hover:text-[#00FF41] transition-colors group"
            >
               <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#00FF41]">
                 <ArrowLeft className="w-4 h-4" />
               </div>
               <span className="font-mono text-[10px] uppercase font-black tracking-widest">Back to Exhibits</span>
            </button>
            
            <h1 className="font-display text-3xl sm:text-4xl text-white font-black uppercase tracking-tighter leading-tight">
              {project.title}
            </h1>
            
            {/* Reduced Hero Image/Video Height Pass */}
            <div className="w-full aspect-video max-h-[220px] rounded-lg border border-white/10 overflow-hidden relative bg-zinc-950">
              {["emotifi", "danreality", "study-assistant"].includes(project.id) ? (
                <iframe 
                  src={
                    project.id === "emotifi" 
                      ? "https://www.youtube.com/embed/H_fxB56YC5Q?autoplay=1&mute=1&controls=0&loop=1&playlist=H_fxB56YC5Q&modestbranding=1&rel=0&disablekb=1&playsinline=1"
                      : project.id === "danreality"
                      ? "https://www.youtube.com/embed/UASRLqS-DsA?autoplay=1&mute=1&controls=0&loop=1&playlist=UASRLqS-DsA&modestbranding=1&rel=0&disablekb=1&playsinline=1"
                      : "https://www.youtube.com/embed/6ZSRwku96iY?autoplay=1&mute=1&controls=0&loop=1&playlist=6ZSRwku96iY&modestbranding=1&rel=0&disablekb=1&playsinline=1&enablejsapi=1"
                  }
                  title={`${project.id} mobile background`}
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  className="w-full h-full object-cover opacity-60 filter brightness-75 absolute inset-0 pointer-events-none"
                />
              ) : (
                <img 
                  src={project.image} 
                  className="w-full h-full object-cover grayscale brightness-75 opacity-60" 
                  alt={project.title} 
                />
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="relative h-[80vh] bg-black overflow-hidden sticky top-0 z-0">
         {["emotifi", "danreality", "study-assistant"].includes(project.id) ? (
           <div className="absolute inset-0 z-0">
             <iframe 
               src={
                 project.id === "emotifi" 
                   ? "https://www.youtube.com/embed/H_fxB56YC5Q?autoplay=1&mute=1&controls=0&loop=1&playlist=H_fxB56YC5Q&modestbranding=1&rel=0&disablekb=1&playsinline=1"
                   : project.id === "danreality"
                   ? "https://www.youtube.com/embed/UASRLqS-DsA?autoplay=1&mute=1&controls=0&loop=1&playlist=UASRLqS-DsA&modestbranding=1&rel=0&disablekb=1&playsinline=1"
                   : project.id === "study-assistant"
                   ? "https://www.youtube.com/embed/6ZSRwku96iY?autoplay=1&mute=1&controls=0&loop=1&playlist=6ZSRwku96iY&modestbranding=1&rel=0&disablekb=1&playsinline=1&enablejsapi=1"
                   : "https://www.youtube.com/embed/K3fT9XW_9eA?autoplay=1&mute=1&controls=0&loop=1&playlist=K3fT9XW_9eA&modestbranding=1&rel=0&disablekb=1&playsinline=1"
               }
               title={`${project.id} background hover`}
               allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
               onLoad={(e) => {
                 if (project.id === "study-assistant") {
                   try {
                     const target = e.currentTarget;
                     setTimeout(() => {
                       target.contentWindow?.postMessage(
                         JSON.stringify({ event: "command", func: "setPlaybackRate", args: [2] }),
                         "*"
                       );
                     }, 1500);
                   } catch (err) {
                     console.log("Failed to set 2x speed", err);
                   }
                 }
               }}
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
      )}

      {/* Content Section */}

      {/* Content Section */}
      <section className={`relative z-10 bg-[#050505] pt-24 pb-48 px-6 md:px-12 ${isMobileOrTablet ? 'rounded-none mt-0 border-none' : 'rounded-t-[5vw] -mt-[5vh] border-t border-white/10'} shadow-[0_-30px_50px_rgba(0,0,0,0.8)]`}>
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

            {/* Features Section */}
            {/* @ts-ignore */}
            {project.features && (
              <div className="mt-24 space-y-12">
                <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                  Core Platform <br /> <span className="italic underline decoration-[#00FF41] decoration-4 underline-offset-8">Features & Capabilities.</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* @ts-ignore */}
                  {project.features.map((feat, i) => (
                    <motion.div 
                      key={feat.name}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="p-8 border border-white/10 bg-zinc-950/40 flex flex-col justify-between hover:border-[#00FF41] transition-all group"
                    >
                      <div>
                        <div className="font-mono text-xs uppercase font-black text-[#00FF41] tracking-widest mb-4 group-hover:italic transition-all">
                          // {feat.name}
                        </div>
                        <p className="font-sans text-sm text-zinc-400 group-hover:text-white/80 leading-relaxed font-light">
                          {feat.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

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

            {/* System Architecture and Highlights */}
            {/* @ts-ignore */}
            {project.highlights && (
              <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="p-8 border border-white/10 bg-zinc-950/60 shadow-xl">
                  <h4 className="font-display text-lg font-black uppercase text-white mb-6 tracking-tight border-b border-[#00FF41] pb-3 text-[#00FF41]">
                    System Architecture
                  </h4>
                  <ul className="space-y-4 font-mono text-[10px] text-zinc-400 font-bold leading-relaxed">
                    {/* @ts-ignore */}
                    {project.highlights.systemArchitecture.map((pt, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="text-[#00FF41] font-mono select-none">▪</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 border border-white/10 bg-zinc-950/60 shadow-xl">
                  <h4 className="font-display text-lg font-black uppercase text-white mb-6 tracking-tight border-b border-[#00FF41] pb-3 text-[#00FF41]">
                    Educational Impact
                  </h4>
                  <ul className="space-y-4 font-sans text-xs text-zinc-400 font-light leading-relaxed">
                    {/* @ts-ignore */}
                    {project.highlights.educationalImpact.map((pt, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="text-[#00FF41] font-mono select-none">▪</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
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
                              <span className="font-mono text-[10px] uppercase font-black text-black">
                                {project.id === "study-assistant" ? "Short DEMO of Our App" : "Project Pitch"}
                              </span>
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
                     <span className="font-display text-4xl font-black uppercase text-[#00FF41] italic leading-none">{project.status}</span>
                  </div>
               </div>

               {/* @ts-ignore */}
               {project.metrics && (
                  <div className="p-8 border-2 border-white/15 bg-zinc-900/20 mt-6">
                     <div className="font-mono text-[10px] uppercase font-black text-white/30 tracking-widest mb-6">Execution Metrics</div>
                     <div className="space-y-4">
                        {/* @ts-ignore */}
                        {project.metrics.map((metric, mi) => (
                           <div key={mi} className="flex justify-between border-b border-white/5 pb-2">
                              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{metric.label}</span>
                              <span className="font-mono text-[10px] text-[#00FF41] uppercase font-black">{metric.value}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>
          </div>
        </div>

        {/* Dynamic Presentation Slides Section */}
        {(project.id === "lfr-robot" || !project.presentationSlides) && project.assets && project.assets.some(a => a.url.endsWith(".pdf")) && (
           <section className="mt-32 max-w-7xl mx-auto px-6 md:px-0 text-white" id="lfr-report-section">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-l-4 border-[#00FF41] pl-6">
                 <div>
                    <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Project <br /> <span className="text-white/20 italic">Report.</span></h2>
                 </div>
              </div>
              <PDFViewer 
                file={project.assets.find(a => a.url.endsWith(".pdf"))?.url || ""} 
                title={project.assets.find(a => a.url.endsWith(".pdf"))?.name || "Project Report"}
              />
           </section>
        )}

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
                       <div className="flex items-center justify-between p-6 bg-zinc-900/60 border-2 border-white/10 rounded-t-lg">
                        <div>
                           <p className="font-mono text-[10px] uppercase font-black text-white/40 tracking-widest mb-2">
                             {project.presentationSlides[slideIndex].slides ? `${project.presentationSlides[slideIndex].slides} SLIDES` : `PAGE ${slideIndex + 1}`}
                           </p>
                           <p className="font-display text-xl font-black uppercase tracking-tighter text-[#00FF41]">
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
                       <PDFViewer
                         file={project.presentationSlides[slideIndex].url}
                         title={project.presentationSlides[slideIndex].title}
                       />
                     </div>
                  ) : (
                   <div className="space-y-6">
                     <div 
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={() => handleTouchEnd(project.presentationSlides[slideIndex].items.length, setSubSlideIndex)}
                        onClick={() => {
                          setModalMedia({
                            type: 'image',
                            url: project.presentationSlides[slideIndex].items[subSlideIndex].url,
                            caption: project.presentationSlides[slideIndex].items[subSlideIndex].caption
                          });
                        }}
                        className="relative aspect-video w-full overflow-hidden bg-black border-4 lg:border-[12px] border-white/10 shadow-2xl cursor-pointer group rounded-lg"
                     >
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

                            <div className={isMobileOrTablet ? "hidden" : "absolute bottom-12 left-12 p-8 bg-black border-l-4 border-[#00FF41] max-w-sm"}>
                               <p className="font-mono text-xs text-white uppercase font-black tracking-widest mb-2 opacity-40">
                                 Vis_{String(subSlideIndex + 1).padStart(2, "0")}
                               </p>
                               <p className="font-display text-xl text-white font-black uppercase tracking-tighter">
                                 {project.presentationSlides[slideIndex].items[subSlideIndex].caption}
                               </p>
                            </div>
                         </motion.div>
                             {/* Tap to expand overlay */}
                             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                               <div className="px-3 py-1.5 bg-black/80 border border-[#00FF41]/30 text-[#00FF41] font-mono text-[9px] uppercase font-black tracking-wider flex items-center gap-1.5 rounded">
                                 <ExternalLink className="w-3.5 h-3.5 animate-pulse" /> Fullscreen View
                               </div>
                             </div>
                       </AnimatePresence>
                     </div>

                      {/* Overlays moved below media on mobile/tablet */}
                      {isMobileOrTablet && (
                        <div className="p-5 bg-zinc-950 border border-[#00FF41]/20 rounded-lg my-4">
                          <p className="font-mono text-[9px] text-[#00FF41] uppercase font-black tracking-widest mb-1">
                            Vis_{String(subSlideIndex + 1).padStart(2, "0")} // Visual Presentation
                          </p>
                          <p className="font-display text-lg text-white font-black uppercase tracking-tighter">
                            {project.presentationSlides[slideIndex].items[subSlideIndex].caption}
                          </p>
                          <p className="font-sans text-xs text-zinc-500 mt-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] inline-block" /> Tap on slide above to view in high definition zoom mode
                          </p>
                        </div>
                      )}

                     <div className="flex items-center justify-between gap-4">
                       <div className="flex gap-2">
                          <button 
                            onClick={() => setSubSlideIndex(prev => prev === 0 ? project.presentationSlides[slideIndex].items.length - 1 : prev - 1)}
                            className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-white/15 bg-zinc-900/50 flex items-center justify-center hover:bg-[#00FF41] hover:text-black hover:border-[#00FF41] active:scale-95 transition-all text-white rounded-md"
                            aria-label="Previous Slide"
                          >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>
                          <button 
                            onClick={() => setSubSlideIndex(prev => (prev + 1) % project.presentationSlides[slideIndex].items.length)}
                            className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-white/15 bg-zinc-900/50 flex items-center justify-center hover:bg-[#00FF41] hover:text-black hover:border-[#00FF41] active:scale-95 transition-all text-white rounded-md"
                            aria-label="Next Slide"
                          >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>
                       </div>
                       <div className="flex items-center gap-3">
                          {/* Visible current slide indicator text */}
                          <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase mr-1">
                            {subSlideIndex + 1} / {project.presentationSlides[slideIndex].items.length}
                          </span>
                          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto max-w-[150px] sm:max-w-none">
                             {project.presentationSlides[slideIndex].items.map((_, subIdx) => (
                                <button 
                                  key={subIdx}
                                  onClick={() => setSubSlideIndex(subIdx)}
                                  className={`h-1.5 rounded-full transition-all duration-500 ${subSlideIndex === subIdx ? 'w-8 bg-[#00FF41]' : 'w-2 bg-white/15 hover:bg-[#00FF41]'}`}
                                />
                             ))}
                          </div>
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
                     className="flex-1 md:flex-none w-14 md:w-20 h-14 md:h-20 border-2 border-white/10 bg-zinc-900/50 flex items-center justify-center hover:bg-[#00FF41] hover:text-black hover:border-[#00FF41] active:scale-95 transition-all text-white rounded"
                   >
                      <ChevronLeft className="w-5 md:w-8 h-5 md:h-8" />
                   </button>
                   <button 
                     onClick={() => setGalleryIndex(prev => {
                       const N = project.visualEvidence || project.gallery;
                       return (prev + 1) % N.length;
                     })}
                     className="flex-1 md:flex-none w-14 md:w-20 h-14 md:h-20 border-2 border-white/10 bg-zinc-900/50 flex items-center justify-center hover:bg-[#00FF41] hover:text-black hover:border-[#00FF41] active:scale-95 transition-all text-white rounded"
                   >
                      <ChevronRight className="w-5 md:w-8 h-5 md:h-8" />
                   </button>
                </div>
             </div>

             <div 
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => {
                  const N = project.visualEvidence || project.gallery;
                  handleTouchEnd(N.length, setGalleryIndex);
                }}
                className="relative w-full overflow-hidden bg-black border-4 md:border-[12px] border-white/15 rounded-lg group" 
                style={{ aspectRatio: isMobileOrTablet ? "4 / 3" : "16 / 9" }}
             >
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
                         <div className={isMobileOrTablet ? "hidden" : "absolute bottom-12 left-12 p-8 bg-black border-l-4 border-[#00FF41] max-w-sm border border-white/5 shadow-2xl"}>
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
                            <div className="w-full h-full cursor-pointer relative" onClick={() => {
                              setModalMedia({
                                type: 'video',
                                url: project.gallery[galleryIndex].url,
                                caption: project.gallery[galleryIndex].caption || ''
                              });
                            }}>
                              <video 
                                src={project.gallery[galleryIndex].url} 
                                className="w-full h-full object-cover" 
                                controls={false}
                                muted 
                                loop 
                                playsInline
                                autoPlay
                              />
                              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                                <div className="w-14 h-14 bg-[#00FF41] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,65,0.4)] active:scale-95 transition-all">
                                  <svg className="w-7 h-7 text-black fill-black ml-1" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                         ) : (
                           project.gallery && project.gallery[galleryIndex] && (
                            <div className="w-full h-full cursor-pointer relative" onClick={() => {
                              setModalMedia({
                                type: 'image',
                                url: project.gallery[galleryIndex].url,
                                caption: project.gallery[galleryIndex].caption || ''
                              });
                            }}>
                              <img 
                                src={project.gallery[galleryIndex].url} 
                                className="w-full h-full object-cover" 
                                alt={project.gallery[galleryIndex].caption} 
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <div className="px-3 py-1.5 bg-black/80 border border-[#00FF41]/30 text-[#00FF41] font-mono text-[9px] uppercase font-black tracking-wider flex items-center gap-1.5 rounded">
                                  <ExternalLink className="w-3.5 h-3.5 animate-pulse" /> Fullscreen View
                                </div>
                              </div>
                            </div>
                           )
                         )}
                         {project.gallery && project.gallery[galleryIndex] && (
                           <div className={isMobileOrTablet ? "hidden" : "absolute bottom-12 left-12 p-8 bg-black border-l-4 border-[#00FF41] max-w-sm border border-white/5 shadow-2xl"}>
                              <p className="font-mono text-xs text-white uppercase font-black tracking-widest mb-2 opacity-40">
                                {project.id === "study-assistant" ? (
                                  galleryIndex === 0 ? "UI" :
                                  galleryIndex === 1 ? "QUIZ" :
                                  galleryIndex === 2 ? "RECALL" :
                                  galleryIndex === 3 ? "PROGRESS" :
                                  "ABOUT"
                                ) : `Entry_0${galleryIndex + 1} // Frame`}
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

             {/* Overlays moved below media on mobile/tablet */}
             {isMobileOrTablet && project.visualEvidence && project.visualEvidence[galleryIndex] && (
                <div className="p-4 bg-zinc-950 border border-[#00FF41]/20 rounded-lg mt-4 flex flex-col gap-1">
                  <p className="font-mono text-[8px] text-[#00FF41] uppercase font-bold tracking-widest opacity-60">
                    {project.visualEvidence[galleryIndex].entry}
                  </p>
                  <p className="font-display text-base text-white font-black uppercase tracking-tighter">
                    {project.visualEvidence[galleryIndex].title}
                  </p>
                </div>
             )}

             {isMobileOrTablet && project.gallery && project.gallery[galleryIndex] && (
                <div className="p-4 bg-zinc-950 border border-[#00FF41]/20 rounded-lg mt-4 flex flex-col gap-1">
                  <p className="font-mono text-[8px] text-[#00FF41] uppercase font-bold tracking-widest opacity-60">
                    {project.id === "study-assistant" ? (
                      galleryIndex === 0 ? "UI // DESIGN" :
                      galleryIndex === 1 ? "QUIZ // INTERFACE" :
                      galleryIndex === 2 ? "RECALL // MODE" :
                      galleryIndex === 3 ? "PROGRESS // ANALYSIS" :
                      "ABOUT"
                    ) : `Entry_0${galleryIndex + 1} // Frame`}
                  </p>
                  <p className="font-display text-base text-white font-black uppercase tracking-tighter">
                    {project.gallery[galleryIndex].caption}
                  </p>
                  <p className="font-sans text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#00FF41] inline-block animate-pulse" /> Tap on media above to view in fullscreen high resolution
                  </p>
                </div>
             )}

             <div className="mt-6 md:mt-8 flex justify-center items-center gap-3">
                {isMobileOrTablet && (
                  <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase mr-1">
                    {galleryIndex + 1} / {(project.visualEvidence || project.gallery || []).length}
                  </span>
                )}
                <div className="flex gap-1.5 md:gap-4 overflow-x-auto max-w-[150px] md:max-w-none">
                   {(project.visualEvidence || project.gallery || []).map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setGalleryIndex(idx)}
                        className={`h-1.5 transition-all duration-500 rounded-full ${galleryIndex === idx ? 'w-12 md:w-24 bg-[#00FF41]' : 'w-2 md:w-8 bg-white/10 hover:bg-white/30'}`}
                      />
                   ))}
                </div>
             </div>
          </section>
        )}
      </section>

      {/* Fullscreen Media Viewer Modal */}
      <AnimatePresence>
        {modalMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setModalMedia(null)}
          >
            {/* Close button with high-contrast indicator */}
            <button 
              onClick={() => setModalMedia(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 active:bg-[#00FF41]/20 border border-white/20 hover:border-[#00FF41]/40 rounded-full flex items-center justify-center text-white hover:text-[#00FF41] transition-all cursor-pointer z-50"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {modalMedia.type === 'video' ? (
                <video 
                  src={modalMedia.url} 
                  className="max-w-full max-h-[80vh] object-contain rounded-lg border border-white/10" 
                  controls 
                  autoPlay 
                  playsInline
                />
              ) : (
                <div className="relative overflow-auto max-h-[80vh] flex justify-center items-center">
                  <img 
                    src={modalMedia.url} 
                    className="max-w-full max-h-[80vh] object-contain rounded-lg border border-white/10 select-none pointer-events-auto transition-transform" 
                    alt={modalMedia.caption || "Fullscreen media"} 
                    draggable={false}
                  />
                </div>
              )}
            </motion.div>

            {/* Caption/Instructions under modal */}
            {modalMedia.caption && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center max-w-xl px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-display text-lg sm:text-xl font-black uppercase text-white tracking-tight">
                  {modalMedia.caption}
                </p>
                <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mt-1.5 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] inline-block" /> Tap anywhere outside or click the 'X' button to close
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

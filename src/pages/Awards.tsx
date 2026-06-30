import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Download, ExternalLink, Filter, ChevronRight, FileText, BarChart3, Play, Sparkles, X, ChevronLeft, XCircle, Eye } from "lucide-react";
import data from "../data.json";
import { PDFViewer } from "../components/PDFViewer";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
interface AwardItem {
  year: string;
  title: string;
  category: string;
  org: string;
  description: string;
  certificate?: string;
  link?: string;
}

export default function Awards() {
  const { awards } = data;
  const [filter, setFilter] = useState<"Academic" | "Research" | "Competitions" | "Leadership" | "Performance">("Academic");

  // Modal Viewer State
  const [modalAsset, setModalAsset] = useState<{
    file: string;
    title: string;
    org: string;
    year: string;
    type?: string;
    categoryItems?: { file: string; title: string; org: string; year: string; type?: string }[];
    activeIndex?: number;
  } | null>(null);

  const [hasLoadError, setHasLoadError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent background scroll when modal is open (preserves exact scroll position)
  useEffect(() => {
    if (modalAsset) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalAsset]);

  // Reset load error state when modal content changes
  useEffect(() => {
    setHasLoadError(false);
  }, [modalAsset]);

  // Keyboard navigation & ESC close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalAsset(null);
      } else if (e.key === "ArrowLeft") {
        if (modalAsset?.categoryItems && modalAsset.categoryItems.length > 1) {
          const prevIdx = (modalAsset.activeIndex! - 1 + modalAsset.categoryItems.length) % modalAsset.categoryItems.length;
          const prevItem = modalAsset.categoryItems[prevIdx];
          setModalAsset({
            ...prevItem,
            categoryItems: modalAsset.categoryItems,
            activeIndex: prevIdx
          });
        }
      } else if (e.key === "ArrowRight") {
        if (modalAsset?.categoryItems && modalAsset.categoryItems.length > 1) {
          const nextIdx = (modalAsset.activeIndex! + 1) % modalAsset.categoryItems.length;
          const nextItem = modalAsset.categoryItems[nextIdx];
          setModalAsset({
            ...nextItem,
            categoryItems: modalAsset.categoryItems,
            activeIndex: nextIdx
          });
        }
      }
    };
    if (modalAsset) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalAsset]);

  // Focus trap implementation
  const handleTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]');
    if (focusableElements.length === 0) return;
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  // Direct focus inside modal when it opens
  useEffect(() => {
    if (modalAsset && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll('button, [href]');
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [modalAsset]);

  const handleOpenModal = (
    file: string, 
    title: string, 
    org: string, 
    year: string, 
    type?: string,
    categoryItems?: any[],
    activeIndex?: number
  ) => {
    setModalAsset({
      file,
      title,
      org,
      year,
      type: type || (file.toLowerCase().endsWith(".pdf") ? "pdf" : "image"),
      categoryItems,
      activeIndex
    });
  };

  // Helper to map original JSON categories to the requested categories: Academic, Research, Competitions, Leadership, Performance
  function getMappedCategory(award: AwardItem): "Academic" | "Research" | "Competitions" | "Leadership" | "Performance" {
    const cat = (award.category || "").toLowerCase();
    const title = (award.title || "").toLowerCase();
    const desc = (award.description || "").toLowerCase();
    
    if (
      cat === "academic" || 
      cat === "education" || 
      title.includes("scholarship") || 
      title.includes("tajveed") || 
      desc.includes("studies") || 
      title.includes("education")
    ) {
      return "Academic";
    }
    if (
      cat === "recognition" || 
      cat === "research" || 
      title.includes("research") || 
      title.includes("one health") || 
      desc.includes("symposium")
    ) {
      return "Research";
    }
    if (
      cat === "sports" || 
      cat === "sports day" || 
      cat === "technical" || 
      title.includes("robian") || 
      title.includes("football") || 
      title.includes("volleyball") || 
      title.includes("race") || 
      title.includes("athletics") || 
      title.includes("trek")
    ) {
      return "Competitions";
    }
    if (
      cat === "leadership" || 
      cat === "service" || 
      title.includes("mentor") || 
      title.includes("teaching") || 
      title.includes("voluntary")
    ) {
      return "Leadership";
    }
    return "Performance";
  }

  const categories: ("Academic" | "Research" | "Competitions" | "Leadership" | "Performance")[] = [
    "Academic",
    "Research",
    "Competitions",
    "Leadership",
    "Performance"
  ];

  // Map and filter awards
  const mappedAwards = (awards || []).map(award => ({
    ...award,
    mappedCategory: getMappedCategory(award)
  }));

  const filteredAwards = mappedAwards.filter(a => a.mappedCategory === filter);

  // Custom education entry array mapping directly to public/assets file requirements
  const educationEntries = [
    {
      degree: "BS Computer Engineering",
      institution: "COMSATS University Islamabad",
      period: "2020 – 2026",
      location: "Islamabad, Pakistan",
      description: "Specialized in Computer Vision, signal processing, and embedded systems modeling.",
      buttons: [
        { label: "Transcript", file: asset("assets/Sabir_BS_CE_Result_Card.pdf"), type: "pdf", isPrimary: true },
        { label: "Result", file: asset("assets/Sabir_BS_CE_Result_Card.pdf"), type: "pdf", isPrimary: true },
        { label: "English Cert", file: asset("assets/English_language_Certificate.pdf"), type: "pdf", isPrimary: false },
        { label: "Character Cert", file: asset("assets/character_certificate_Comsats.jpeg"), type: "image", isPrimary: false }
      ]
    },
    {
      degree: "HSSC (Pre-Engineering)",
      institution: "Aga Khan Higher Secondary School Gilgit",
      period: "2018 – 2020",
      location: "Gilgit, Pakistan",
      description: "Core pre-engineering coursework with high honors.",
      buttons: [
        { label: "Certificate", file: asset("assets/HSSC_Certificate.pdf"), type: "pdf", isPrimary: true },
        { label: "Transcript", file: asset("assets/HSSC_Transcript.jpg"), type: "image", isPrimary: true },
        { label: "English Cert", file: asset("assets/English_language_Certificate_AKHSS.pdf"), type: "pdf", isPrimary: false },
        { label: "Character Cert", file: asset("assets/Character_Certificate.jpg"), type: "image", isPrimary: false }
      ]
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Aga Khan School",
      period: "2015 - 2017",
      location: "Gilgit, Pakistan",
      description: "Science curriculum foundation studies.",
      buttons: [
        { label: "Transcript", file: asset("assets/SSC_Transcript.jpg"), type: "image", isPrimary: true },
        { label: "Certificate", file: asset("assets/SSC_Certificate.jpg"), type: "image", isPrimary: true }
      ]
    },
    {
      degree: "One Health Recognition",
      institution: "US Embassy (Symposium Host)",
      period: "2024",
      location: "Islamabad, Pakistan",
      isSpecial: true,
      description: "Prestigious recognition for active research contribution and collaborative scientific symposium participation hosted by the United States Embassy.",
      buttons: [
        { label: "One Health Recognition", file: asset("assets/US_Embassy_OneHealth.pdf"), type: "pdf", isPrimary: true }
      ]
    }
  ];

  return (
    <div className="pt-28 md:pt-32 pb-24 px-6 md:px-12 bg-zinc-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* RECOGNITION LOG Header */}
        <header className="mb-16 relative">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00FF41]/[0.02] rounded-full blur-[100px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="font-mono text-xs uppercase font-black tracking-[0.4em] text-[#00FF41]">
              // RECOGNITION_LOG_STREAM
            </div>
            
            <h1 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
              RECOGNITION <br /> <span className="text-stroke">LOG.</span>
            </h1>
            
            <p className="max-w-xl font-sans text-sm text-zinc-400 leading-relaxed font-light">
              Filterable ledger of competitive victories, merit fellowships, scientific collaborations, and cultural performative honors.
            </p>
          </motion.div>
        </header>

        {/* Scholastic Validation Section (Highest Priority, placed FIRST) */}
        <section className="mb-24 relative border-t border-white/5 pt-16">
          <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[#00FF41]/[0.01] rounded-full blur-[120px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
             <div>
                <div className="font-mono text-xs uppercase font-black tracking-[0.4em] text-[#00FF41] mb-3">
                  // INSTITUTIONAL_CREDENTIALS
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                  SCHOLASTIC <br /> <span className="text-stroke">VALIDATION.</span>
                </h2>
             </div>
             <div className="font-mono text-[10px] uppercase font-bold text-zinc-500">
               Cryptographically Authenticated Academic Assets
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationEntries.map((edu, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4, borderColor: "rgba(0, 255, 65, 0.2)" }}
                className={`p-6 md:p-8 border border-white/5 bg-zinc-900/10 hover:bg-zinc-900/40 rounded flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  edu.isSpecial ? "border-amber-500/10 hover:border-amber-500/30" : ""
                }`}
              >
                {/* Visual highlights for special items */}
                {edu.isSpecial && (
                  <div className="absolute top-0 right-0 bg-amber-500/10 border-b border-l border-amber-500/20 px-3 py-1 rounded-bl font-mono text-[8px] text-amber-500 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Featured Honor
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="font-mono text-zinc-600 text-[10px] uppercase tracking-wider">
                      [RECORD_0{idx+1}]
                    </div>
                    <div className="font-mono text-[#00FF41] text-[10px] uppercase font-bold">
                      {edu.period}
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white mb-1 group-hover:text-[#00FF41] transition-colors leading-none">
                    {edu.degree}
                  </h3>
                  
                  <p className="font-serif italic text-zinc-400 text-xs mb-4">
                    {edu.institution} // <span className="text-zinc-500">{edu.location}</span>
                  </p>

                  {edu.description && (
                    <p className="font-sans text-xs text-zinc-500 leading-relaxed font-light mb-8">
                      {edu.description}
                    </p>
                  )}
                </div>

                {/* Grid of buttons using the interactive modal certificate viewer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6">
                  {edu.buttons.map((btn, btnIdx) => (
                    <button 
                      key={btnIdx}
                      onClick={() => handleOpenModal(
                        btn.file, 
                        btn.label, 
                        edu.institution, 
                        edu.period,
                        btn.type
                      )}
                      className={`px-4 py-3 font-mono text-[9px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 rounded transition-all min-h-[44px] active:scale-95 ${
                        btn.isPrimary
                          ? "bg-zinc-950 hover:bg-[#00FF41] text-zinc-300 hover:text-black border border-white/10 hover:border-transparent shadow-sm"
                          : "bg-zinc-900/40 hover:bg-white text-zinc-400 hover:text-black border border-white/5 hover:border-transparent"
                      }`}
                    >
                      {btn.type === "pdf" ? <FileText className="w-3.5 h-3.5 shrink-0" /> : <Download className="w-3.5 h-3.5 shrink-0" />}
                      {btn.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Category Selection Tabs - Responsive scrollbar indicators */}
        <section className="mb-12 border-t border-white/5 pt-16">
          <div className="flex items-center gap-4 text-[10px] md:text-xs font-mono tracking-widest uppercase text-white/40 mb-6">
            <span>02 // FILTER LOG ARCHIVE BY FIELD</span>
            <span className="w-12 h-px bg-white/10" />
          </div>
          
          <div className="flex overflow-x-auto md:overflow-visible scrollbar-none gap-2 md:gap-3 p-1.5 bg-zinc-900/30 border border-white/5 rounded-lg backdrop-blur-sm -mx-6 px-6 md:mx-0 md:px-1.5 flex-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-3 font-mono text-[10px] sm:text-xs uppercase font-bold tracking-widest transition-all rounded shrink-0 whitespace-nowrap active:scale-95 ${
                  filter === cat 
                  ? "bg-[#00FF41] text-black shadow-[0_0_15px_rgba(0,255,65,0.4)]" 
                  : "bg-zinc-950 text-zinc-400 border border-white/5 hover:border-[#00FF41]/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Vertical Timeline Stream of Achievement Dossiers */}
        <div className="relative md:border-l-2 md:border-zinc-900 ml-0 md:ml-8 pl-0 md:pl-12 space-y-6 md:space-y-12 mb-36 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredAwards.length > 0 ? (
              filteredAwards.map((award, i) => (
                <motion.div
                  key={award.title}
                  layout
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="relative group bg-zinc-900/20 hover:bg-zinc-900/60 border border-white/5 hover:border-[#00FF41]/20 p-5 sm:p-8 rounded-lg backdrop-blur-sm transition-all duration-300"
                >
                  {/* Timeline Pulsing green circle - hidden on mobile */}
                  <div className="hidden md:flex absolute -left-[57px] top-10 w-4.5 h-4.5 rounded-full bg-zinc-950 border-2 border-zinc-800 items-center justify-center group-hover:border-[#00FF41] transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-[#00FF41] group-hover:scale-125 transition-all" />
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-3.5 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 bg-zinc-900 text-[#00FF41] font-mono text-[9px] uppercase tracking-wider font-bold border border-[#00FF41]/10 rounded">
                          {award.year}
                        </span>
                        <span className="text-zinc-600 font-mono text-[10px] uppercase">
                          // {award.mappedCategory} Dossier
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black uppercase text-white group-hover:text-[#00FF41] transition-colors leading-tight">
                        {award.title}
                      </h3>

                      <div className="font-mono text-xs text-zinc-400 font-bold">
                        ISSUED BY: <span className="text-white">{award.org}</span>
                      </div>

                      <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                        {award.description}
                      </p>
                    </div>

                    {/* Interactive Certificate Viewers (supporting arrow indices) */}
                    <div className="w-full lg:w-auto shrink-0 flex items-center mt-4 lg:mt-0">
                      {award.link ? (
                        <a 
                          href={award.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full lg:w-auto bg-zinc-950 hover:bg-white text-zinc-300 hover:text-black border border-white/10 px-5 py-4 font-mono text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-2 rounded transition-all min-h-[48px] active:scale-95"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" /> Watch Performance
                        </a>
                      ) : award.certificate ? (
                        <button 
                          onClick={() => {
                            const categoryItems = filteredAwards
                              .filter(a => a.certificate)
                              .map(a => ({
                                file: a.certificate!,
                                title: a.title,
                                org: a.org,
                                year: a.year,
                                type: a.certificate!.toLowerCase().endsWith(".pdf") ? "pdf" : "image"
                              }));
                            const activeIdx = categoryItems.findIndex(item => item.file === award.certificate);
                            handleOpenModal(
                              award.certificate!,
                              award.title,
                              award.org,
                              award.year,
                              award.certificate!.toLowerCase().endsWith(".pdf") ? "pdf" : "image",
                              categoryItems,
                              activeIdx >= 0 ? activeIdx : 0
                            );
                          }}
                          className="w-full lg:w-auto bg-zinc-950 hover:bg-[#00FF41] text-[#00FF41] hover:text-black border border-[#00FF41]/20 hover:border-transparent px-5 py-4 font-mono text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-2 rounded transition-all shadow-[inset_0_0_10px_rgba(0,255,65,0.05)] hover:shadow-none min-h-[48px] active:scale-95"
                        >
                          <FileText className="w-3.5 h-3.5" /> View Certificate
                        </button>
                      ) : (
                        <div className="w-full lg:w-auto text-center font-mono text-[9px] text-zinc-600 uppercase tracking-widest bg-zinc-900/50 px-4 py-3 rounded border border-white/5 select-none min-h-[44px] flex items-center justify-center">
                          [RECORD_SECURED]
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subtle tech stamp on corner hover */}
                  <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-20 pointer-events-none font-mono text-[8px] text-zinc-500 uppercase tracking-[0.2em] transition-opacity">
                    ID_SYSTEM_VERIFIED_AUTHENTIC
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 font-mono text-zinc-500 uppercase tracking-widest border border-dashed border-white/10 rounded">
                [NO RECORDS LOGGED IN THIS CATEGORY]
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Fullscreen Certificate/Asset Viewer Modal */}
      <AnimatePresence>
        {modalAsset && (
          <motion.div
            ref={modalRef}
            onKeyDown={handleTabKey}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md p-4 sm:p-6 outline-none"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setModalAsset(null);
              }
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between w-full max-w-6xl mx-auto border-b border-white/10 pb-4 shrink-0">
              <div className="flex flex-col pr-4">
                <span className="font-mono text-[9px] uppercase text-[#00FF41] tracking-[0.3em] font-black">
                  // DIGITAL_CREDENTIAL_VIEWER
                </span>
                <h4 id="modal-title" className="font-display text-base sm:text-lg md:text-xl font-black uppercase text-white tracking-tight mt-1 leading-tight">
                  {modalAsset.title}
                </h4>
                <p className="font-mono text-[9px] sm:text-[10px] text-zinc-400 mt-0.5">
                  ISSUED BY: <span className="text-white">{modalAsset.org}</span> • {modalAsset.year}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setModalAsset(null)}
                className="px-4 py-2 border border-white/10 text-white/70 hover:text-[#00FF41] hover:border-[#00FF41] rounded bg-white/5 hover:bg-[#00FF41]/5 transition-all active:scale-95 flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase font-bold min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>

            {/* Modal Body / Viewer Area */}
            <div 
              className="flex-1 flex items-center justify-center relative w-full max-w-6xl mx-auto my-4 overflow-hidden min-h-0"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setModalAsset(null);
                }
              }}
            >
              {/* Previous Navigation Button */}
              {modalAsset.categoryItems && modalAsset.categoryItems.length > 1 && (
                <button
                  onClick={() => {
                    const prevIdx = (modalAsset.activeIndex! - 1 + modalAsset.categoryItems!.length) % modalAsset.categoryItems!.length;
                    const prevItem = modalAsset.categoryItems![prevIdx];
                    setModalAsset({
                      ...prevItem,
                      categoryItems: modalAsset.categoryItems,
                      activeIndex: prevIdx
                    });
                  }}
                  className="absolute left-2 sm:left-4 z-20 p-3 border border-white/10 text-white/70 hover:text-[#00FF41] hover:border-[#00FF41] rounded-full bg-black/80 hover:bg-[#00FF41]/5 transition-all active:scale-90 flex items-center justify-center min-h-[48px] min-w-[48px] focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none"
                  aria-label="Previous credential"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {/* Certificate Media Display */}
              <div 
                className={`w-full h-full max-w-4xl max-h-[65vh] flex items-center justify-center rounded bg-zinc-950 border border-white/5 relative p-2 touch-auto ${
                  modalAsset.type === "pdf" ? "overflow-hidden" : "overflow-auto"
                }`}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setModalAsset(null);
                  }
                }}
              >
                {hasLoadError ? (
                  <div className="flex flex-col items-center justify-center p-8 bg-zinc-900/60 border border-white/10 rounded-lg max-w-sm text-center">
                    <div className="p-3 bg-red-500/10 rounded-full border border-red-500/30 mb-4 text-red-500">
                      <XCircle className="w-8 h-8" />
                    </div>
                    <h5 className="font-display text-base font-black uppercase text-white">Document unavailable</h5>
                    <p className="font-mono text-[10px] text-zinc-500 mt-2">The requested asset could not be loaded at this path.</p>
                  </div>
                ) : modalAsset.type === "pdf" ? (
                  <PDFViewer
                    file={modalAsset.file}
                    title={modalAsset.title}
                  />
                ) : (
                  <img
                    src={modalAsset.file}
                    alt={modalAsset.title}
                    className="max-w-full max-h-full object-contain rounded"
                    referrerPolicy="no-referrer"
                    onError={() => setHasLoadError(true)}
                  />
                )}
              </div>

              {/* Next Navigation Button */}
              {modalAsset.categoryItems && modalAsset.categoryItems.length > 1 && (
                <button
                  onClick={() => {
                    const nextIdx = (modalAsset.activeIndex! + 1) % modalAsset.categoryItems!.length;
                    const nextItem = modalAsset.categoryItems![nextIdx];
                    setModalAsset({
                      ...nextItem,
                      categoryItems: modalAsset.categoryItems,
                      activeIndex: nextIdx
                    });
                  }}
                  className="absolute right-2 sm:right-4 z-20 p-3 border border-white/10 text-white/70 hover:text-[#00FF41] hover:border-[#00FF41] rounded-full bg-black/80 hover:bg-[#00FF41]/5 transition-all active:scale-90 flex items-center justify-center min-h-[48px] min-w-[48px] focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none"
                  aria-label="Next credential"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-6xl mx-auto border-t border-white/10 pt-4 shrink-0">
              {/* Category indicator / Counter */}
              <div className="font-mono text-[9px] sm:text-xs text-zinc-400">
                {modalAsset.categoryItems && modalAsset.categoryItems.length > 1 ? (
                  <span>CREDENTIAL {modalAsset.activeIndex! + 1} OF {modalAsset.categoryItems.length} IN THIS STREAM</span>
                ) : (
                  <span>INSTITUTIONALLY SIGNED VERIFICATION RECORD</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href={modalAsset.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-5 py-3 bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black border border-white/10 font-mono text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-1.5 rounded transition-all active:scale-95 min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none"
                  aria-label="Open document in a new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> New Tab
                </a>
                <a
                  href={modalAsset.file}
                  download
                  className="flex-1 sm:flex-none px-5 py-3 bg-[#00FF41] text-black font-mono text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-1.5 rounded transition-all hover:bg-white active:scale-95 min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none"
                  aria-label="Download document file"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
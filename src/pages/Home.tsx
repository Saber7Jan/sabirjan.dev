import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download, Github, Linkedin, Mail, Play, ExternalLink, FileText, Zap } from "lucide-react";
import { SkillsRadar } from "../components/SkillsRadar";
import { NeuralBackground } from "../components/NeuralBackground";
import data from "../data.json";

const getProjectCTALinks = (projId: string) => {
  switch (projId) {
    case "emotifi":
      return {
        demo: "https://youtu.be/mjasBI-TJkg",
        report: "/assets/FYP_Research_Paper_SP25-37.pdf",
        repo: "https://github.com/Saber7Jan/EmotiFi",
        pitch: "https://youtu.be/_DIFr9ggSxY"
      };
    case "danreality":
      return {
        demo: "https://saber7jan.github.io/JanBroz/",
        report: "/assets/DanReality.pdf",
        repo: "https://github.com/Saber7Jan/JanBroz",
        pitch: "https://youtu.be/jWUAvF0kO1I"
      };
    case "study-assistant":
    default:
      return {
        demo: "https://huggingface.co/spaces/Sabir7Jan/study-assistant-multi-agent-system",
        report: "/assets/AI_Study_Assistant_Technical_Report.pdf",
        repo: "https://github.com/Saber7Jan/study-assistant-multi-agent-system",
        pitch: "https://youtu.be/vPE9Ox7FReY?si=FfWWu5ImomodfRms"
      };
  }
};

export default function Home() {
  const { profile, projects } = data;

  const highlights = [
    { title: "EmotiFi", desc: "Contactless Emotion Recognition using Wi-Fi CSI & Deep Learning" },
    { title: "AI Study Assistant", desc: "Adaptive Learning Orchestrated with LangGraph & FastAPI" },
    { title: "CSI Emotion Recognition Research", desc: "Spectrogram Preprocessing & ConvNet Classifier Systems" },
    { title: "Adaptive Learning Engine", desc: "Gemini-Powered Intelligent Quiz Evaluation & Recall" }
  ];
  const [highlightIdx, setHighlightIdx] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setHighlightIdx((prev) => (prev + 1) % highlights.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-20 bg-zinc-950 text-white min-h-screen">
      {/* Hero Section */}
      <header className="min-h-[95vh] lg:min-h-[90vh] py-12 lg:py-20 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center border-b border-white/5 relative overflow-hidden bg-zinc-950">
        {/* Animated AI Neural Grid + Data Flow background */}
        <NeuralBackground />

        {/* Background Marquee (CR7 Style) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] font-display text-[26vw] leading-none text-white font-black whitespace-nowrap animate-marquee z-0">
          SABIR JAN PROJECT // SABIR JAN PROJECT // SABIR JAN PROJECT
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center w-full max-w-5xl mx-auto"
        >
          {/* Subtle Tech / AI Lab Metadata Tag */}
          <div className="mb-4 sm:mb-6 font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] text-[#00FF41] uppercase bg-black/60 px-3 py-1.5 border border-[#00FF41]/20 inline-block rounded backdrop-blur-sm animate-pulse">
            NEURAL_NET_CORE // AGENTIC_SYSTEMS_LAB
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-[8vw] lg:text-[10vw] leading-[0.8] tracking-tighter uppercase mb-4 sm:mb-6 text-white drop-shadow-2xl">
            Sabir <br className="sm:hidden" /> <span className="text-stroke">Jan</span>
          </h1>

          <div className="h-10 sm:h-12 mb-4 sm:mb-6">
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
              className="font-mono text-xs sm:text-sm md:text-2xl text-accent font-black uppercase tracking-[0.2em] md:tracking-[0.4em]"
            />
          </div>

          <p className="max-w-2xl mx-auto font-sans text-sm sm:text-base md:text-lg text-zinc-400 mb-6 sm:mb-8 leading-relaxed font-light px-4">
            Building Agentic AI Systems, Computer Vision Applications, and Human-Centered Intelligent Technologies.
          </p>

          {/* Rotating Highlight Module */}
          <div className="mb-8 min-h-[70px] flex flex-col items-center justify-center px-4">
            <div className="font-mono text-[8px] text-[#00FF41]/55 uppercase tracking-[0.2em] mb-2 cursor-default select-none">
              // ACTIVE_SYSTEM_DEPLOYMENT_STREAM
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={highlightIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2.5 bg-black/60 border border-[#00FF41]/25 px-4 py-2.5 rounded backdrop-blur-sm max-w-xl text-left"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-ping shrink-0" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-display font-black text-[#00FF41] uppercase text-[10px] sm:text-xs tracking-wider shrink-0">
                    {highlights[highlightIdx].title}:
                  </span>
                  <span className="font-mono text-zinc-300 text-[9px] sm:text-[10px]">
                    {highlights[highlightIdx].desc}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4">
             <Link 
               to="/projects"
               className="group relative bg-[#00FF41] text-black px-6 sm:px-10 py-3.5 sm:py-5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-black hover:bg-white transition-all flex items-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.25)] min-h-[48px]"
             >
               <span className="relative z-10 flex items-center gap-2">Research <ArrowUpRight className="w-3.5 h-3.5" /></span>
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             </Link>
             
             <a 
               href={profile.socials.cv} 
               target="_blank" 
               rel="noreferrer"
               className="group relative bg-zinc-900 border border-white/10 text-white px-6 sm:px-10 py-3.5 sm:py-5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-black hover:bg-accent hover:text-black transition-all flex items-center gap-3 overflow-hidden min-h-[48px]"
             >
               <span className="relative z-10 flex items-center gap-2">Resume <Download className="w-3.5 h-3.5" /></span>
               <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             </a>

             <a 
               href={`mailto:${profile.email}`}
               className="group relative bg-zinc-900 border border-white/10 text-white px-6 sm:px-10 py-3.5 sm:py-5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-black hover:bg-accent hover:text-black transition-all flex items-center gap-3 overflow-hidden min-h-[48px]"
             >
               <span className="relative z-10 flex items-center gap-2">Contact <Mail className="w-3.5 h-3.5" /></span>
               <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             </a>
          </div>
        </motion.div>
      </header>

      {/* Section 2: Mission Control Panel (Core Strengths Redesign) */}
      <section className="py-20 sm:py-32 lg:py-48 px-6 md:px-12 bg-[#050505] border-b border-white/5 relative overflow-hidden">
        {/* Abstract sci-fi background accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF41]/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00FF41]/[0.01] rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 lg:mb-24">
            <div>
              <div className="font-mono text-[10px] sm:text-xs uppercase font-black text-[#00FF41] tracking-[0.4em] mb-4">
                // CRITICAL_CAPABILITY_REGISTER
              </div>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-[8vw] font-black uppercase tracking-tighter leading-none text-white">
                MISSION <span className="text-stroke">CONTROL.</span>
              </h2>
            </div>
            <p className="max-w-md font-mono text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
              [TELEMETRY_STREAM] ALL CORE MODEL AND HARDWARE SIGNAL CLASSIFIERS ARE CALIBRATED AND ACTIVE IN REAL-TIME.
            </p>
          </div>

          {/* 6 Capability Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {[
              {
                title: "Computer Vision",
                pct: 95,
                desc: "Real-time gesture analysis, CNN pipelines, facial land-marking (MediaPipe/OpenCV), and spatial recognition frameworks."
              },
              {
                title: "Deep Learning",
                pct: 90,
                desc: "Custom neural net architecture, convolutional models, transfer learning with ResNet/EfficientNet, and hyperparameter tuning."
              },
              {
                title: "Agentic AI Systems",
                pct: 88,
                desc: "Stateful agent graphs via LangGraph, hierarchical multi-agent routers, tool calling integrations, and adaptive execution trees."
              },
              {
                title: "Signal Processing",
                pct: 85,
                desc: "Digital filtering, FFT/STFT transformations, Wi-Fi CSI raw signal amplitude analysis, and sub-carrier noise reduction."
              },
              {
                title: "Full Stack AI Apps",
                pct: 85,
                desc: "Asynchronous backend APIs with FastAPI/Express, real-time communication via websockets, state retention, and responsive UIs."
              },
              {
                title: "Research & Experimentation",
                pct: 92,
                desc: "Rapid academic translation, data-sheet compilation, scientific model validation, and structured comparative analysis."
              }
            ].map((cap, i) => (
              <motion.div
                key={cap.title}
                whileHover={{ y: -5, borderColor: "rgba(0, 255, 65, 0.4)" }}
                transition={{ duration: 0.3 }}
                className="relative bg-zinc-950/80 p-8 border border-white/5 rounded backdrop-blur-sm group overflow-hidden"
              >
                {/* Tech bracket accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-[#00FF41] transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-[#00FF41] transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-[#00FF41] transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-[#00FF41] transition-colors" />

                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest block">
                    [SYS_COMP_0{i+1}]
                  </span>
                  <span className="font-mono text-lg font-black text-[#00FF41] tracking-tighter group-hover:animate-pulse">
                    {cap.pct}%
                  </span>
                </div>

                <h3 className="font-display text-xl font-black uppercase text-white mb-3 tracking-tight group-hover:text-[#00FF41] transition-colors">
                  {cap.title}
                </h3>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light mb-6">
                  {cap.desc}
                </p>

                {/* Progress bar container */}
                <div className="h-[2px] bg-white/5 w-full overflow-hidden relative rounded">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cap.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#00FF41]/40 to-[#00FF41] absolute top-0 left-0"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technology Ecosystem Title & Animated Chips */}
          <div className="border-t border-white/5 pt-16">
            <h3 className="font-mono text-xs text-[#00FF41] uppercase tracking-[0.3em] mb-10">
              // TECHNOLOGY_ECOSYSTEM
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Python", "PyTorch", "TensorFlow", "LangGraph", "FastAPI", "Gemini",
                "SQLite", "ESP32", "MediaPipe", "OpenCV", "Streamlit", "Git"
              ].map((tech, i) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05, borderColor: "#00FF41", color: "#00FF41", backgroundColor: "rgba(0, 255, 65, 0.05)" }}
                  className="px-6 py-2.5 bg-zinc-950 border border-white/5 font-mono text-[10px] tracking-wider font-bold uppercase text-zinc-400 cursor-default rounded transition-all flex items-center gap-2 shadow-inner"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]/40 group-hover:bg-[#00FF41] transition-colors" />
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Project Impact Strip (System Deployments New Section) */}
      <section className="py-20 sm:py-32 lg:py-48 px-6 md:px-12 bg-zinc-950 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 lg:mb-24">
            <div>
              <div className="font-mono text-[10px] sm:text-xs uppercase font-black text-[#00FF41] tracking-[0.4em] mb-4">
                // SYSTEM_INTEGRATION_LOG
              </div>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-[8vw] font-black uppercase tracking-tighter leading-none text-white">
                SYSTEM <span className="text-stroke">DEPLOYMENTS.</span>
              </h2>
            </div>
            <p className="max-w-md font-mono text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
              [REGISTRY] ACTIVE PLATFORMS STABLY DEPLOYED ON EMBEDDED CHIPS, CLOUD CONTAINER ENDPOINTS, AND USER CHANNELS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                title: "EmotiFi",
                sub: "Wi-Fi CSI Based Emotion Recognition",
                stat: "90%+",
                statDesc: "Facial expression assessment agreement",
                details: "Architected contactless sub-carrier amplitude analysis framework for ambient affect recognition without camera devices."
              },
              {
                num: "02",
                title: "AI Study Assistant",
                sub: "LangGraph + FastAPI + Gemini Integration",
                stat: "STATEFUL",
                statDesc: "Multi-agent recall & test coordination",
                details: "Engineered customized spaced-repetition models using state-aware graph agents for adaptive quizzes, explanations, and tracking."
              },
              {
                num: "03",
                title: "Spectrogram Emotion Research",
                sub: "Deep Learning Classification on CSI Spectrograms",
                stat: "ResNet18",
                statDesc: "& EfficientNet feature extraction",
                details: "Pioneered neural classification modeling on high-dimensional CSI spectrogram arrays, comparing transfer-learning efficiencies."
              },
              {
                num: "04",
                title: "Multi-Agent Learning Systems",
                sub: "State-Aware Educational Assistants",
                stat: "PERSONALIZED",
                statDesc: "Tailored recommendation engine",
                details: "Designed modular multi-agent orchestration for educational scaffolding, producing tailored suggestions dynamically."
              }
            ].map((sys) => (
              <motion.div
                key={sys.num}
                whileHover={{ scale: 1.01, borderColor: "rgba(0, 255, 65, 0.3)" }}
                className="bg-zinc-900/40 border border-white/5 p-8 rounded flex flex-col justify-between hover:bg-zinc-900/80 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Glowing subtle gradient line on card border hover */}
                <div className="absolute top-0 left-0 w-[2px] h-0 bg-[#00FF41] group-hover:h-full transition-all duration-500" />
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-[11px] text-[#00FF41] tracking-widest font-black">
                      // {sys.num} DEPLOYMENT
                    </span>
                    <span className="font-mono text-zinc-600 text-xs">[STABLE_RUN]</span>
                  </div>

                  <h3 className="font-display text-2xl font-black uppercase text-white mb-1 group-hover:text-[#00FF41] transition-colors">
                    {sys.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase text-zinc-400 mb-6 tracking-wide">
                    {sys.sub}
                  </p>
                  
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed font-light mb-8">
                    {sys.details}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                  <div>
                    <div className="font-display text-2xl font-black text-white leading-none">
                      {sys.stat}
                    </div>
                    <div className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 mt-1">
                      {sys.statDesc}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00FF41] group-hover:text-[#00FF41] transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

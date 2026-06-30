import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { SkillsRadar } from "../components/SkillsRadar";
import { NeuralBackground } from "../components/NeuralBackground";
import data from "../data.json";
import { getAssetUrl } from "../lib/utils";

const getProjectCTALinks = (projId: string) => {
  switch (projId) {
    case "emotifi":
      return {
        demo: "https://youtu.be/mjasBI-TJkg",
        report: getAssetUrl("/assets/FYP_Research_Paper_SP25-37.pdf"),
        repo: "https://github.com/Saber7Jan/EmotiFi",
        pitch: "https://youtu.be/_DIFr9ggSxY"
      };
    case "danreality":
      return {
        demo: "https://saber7jan.github.io/JanBroz/",
        report: getAssetUrl("/assets/DanReality.pdf"),
        repo: "https://github.com/Saber7Jan/JanBroz",
        pitch: "https://youtu.be/jWUAvF0kO1I"
      };
    case "study-assistant":
    default:
      return {
        demo: "https://huggingface.co/spaces/Sabir7Jan/study-assistant-multi-agent-system",
        report: getAssetUrl("/assets/AI_Study_Assistant_Technical_Report.pdf"),
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
        <NeuralBackground />

        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] font-display text-[26vw] leading-none text-white font-black whitespace-nowrap animate-marquee z-0">
          SABIR JAN PROJECT // SABIR JAN PROJECT // SABIR JAN PROJECT
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center w-full max-w-5xl mx-auto"
        >
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

          {/* Profile Picture - FIXED */}
          {profile.image && (
            <div className="mb-8 flex justify-center">
              <img 
                src={getAssetUrl(profile.image)} 
                alt="Sabir Jan" 
                className="w-48 h-48 object-cover rounded-full border-4 border-[#00FF41]/30 shadow-2xl"
              />
            </div>
          )}

          {/* Rest of your content */}
          {/* ... keep the rest of your Home component as is ... */}

        </motion.div>
      </header>

      {/* Copy the rest of your original Home.tsx content here (Mission Control, etc.) */}
    </div>
  );
}
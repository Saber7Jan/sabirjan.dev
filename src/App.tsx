import * as React from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

// Components
import { Navbar } from "./components/Navbar";
import { AIAssistant } from "./components/AIAssistant";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Awards from "./pages/Awards";
import ProjectDetail from "./pages/ProjectDetail";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route 
          path="/" 
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Home />
            </motion.div>
          } 
        />
        <Route 
          path="/about" 
          element={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <About />
            </motion.div>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Projects />
            </motion.div>
          } 
        />
        <Route 
          path="/projects/:id" 
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectDetail />
            </motion.div>
          } 
        />
        <Route 
          path="/awards" 
          element={
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <Awards />
            </motion.div>
          } 
        />
        {/* Fallback to Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black selection:bg-accent selection:text-black">
        <ScrollToTop />
        <Navbar />
        <AIAssistant />
        <main>
          <AnimatedRoutes />
        </main>

        {/* Global Footer Minimal */}
        <footer className="py-12 px-6 md:px-12 border-t border-black bg-white flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-black" />
              <span className="font-display font-black text-sm uppercase tracking-tighter">Sabir Jan Portfolio // 2026</span>
           </div>
           <div className="font-mono text-[10px] uppercase font-bold tracking-widest text-black/40">
             Built with Gemini Flash 1.5 & React 18
           </div>
           <div className="flex gap-8 font-mono text-[10px] uppercase font-bold tracking-widest">
              <a href="https://github.com/Saber7Jan" target="_blank" rel="noreferrer" className="hover:text-accent font-black transition-all">Github</a>
              <a href="https://www.linkedin.com/in/sabirjan" target="_blank" rel="noreferrer" className="hover:text-accent font-black transition-all">LinkedIn</a>
           </div>
        </footer>
      </div>
    </Router>
  );
}

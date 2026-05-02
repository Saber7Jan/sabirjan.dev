import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { SkillsRadar } from "../components/SkillsRadar";
import { Award, GraduationCap, MapPin, Briefcase, Download, ExternalLink, Filter, ArrowUpRight } from "lucide-react";
import data from "../data.json";

export default function About() {
  const { education, awards, experience, profile } = data;
  const [awardFilter, setAwardFilter] = useState<string>("All");

  const awardCategories = ["All", ...Array.from(new Set(awards.map(a => a.category)))];
  const filteredAwards = awardFilter === "All" ? awards : awards.filter(a => a.category === awardFilter);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-end">
          <div className="lg:col-span-1 border-r border-black/10 hidden lg:block h-full">
            <div className="font-mono text-[10px] uppercase font-bold vertical-text rotate-180 h-fit tracking-widest text-black/30">
              IDENTITY // DOSSIER // 2026
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="font-serif italic text-3xl text-black/30 mb-8 leading-none italic">01 // The Synthesis</div>
            <h1 className="font-display text-5xl md:text-[7vw] font-black uppercase tracking-tighter leading-[0.85] mb-12">
              Engineering <br /> <span className="text-accent italic">Intuition.</span>
            </h1>
            <div className="space-y-6 font-sans text-xl text-black/70 leading-relaxed max-w-2xl">
              <p>
                {profile.bio}
              </p>
              <p>
                As a Computer Engineering graduate from COMSATS, I've spent the last four years developing non-invasive sensor frameworks. My work in Wi-Fi CSI isn't just about data; it's about privacy-first empathy in smart environments.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 self-start">
            <SkillsRadar />
          </div>
        </div>

        {/* CV Dossier Section */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-12 border-4 border-black bg-accent relative overflow-hidden group"
          >
            <div className="absolute top-[-10%] right-[-5%] font-display text-[20vw] font-black text-black/5 select-none pointer-events-none">CV</div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="max-w-xl text-black">
                 <h2 className="font-display text-5xl font-black uppercase tracking-tighter mb-6 leading-none">Curriculum <br />Dossier.</h2>
                 <p className="font-mono text-sm uppercase font-bold tracking-tight opacity-70 mb-8">Comprehensive trace of academic and professional evolution from 2018 to 2026.</p>
                 <div className="flex flex-wrap gap-4">
                    <a href={profile.socials.cv} target="_blank" rel="noreferrer" className="bg-black text-white px-8 py-4 font-mono text-xs uppercase font-black tracking-widest hover:scale-105 transition-transform flex items-center gap-3">
                      <Download className="w-4 h-4" /> Download PDF
                    </a>
                    <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="border-2 border-black text-black px-8 py-4 font-mono text-xs uppercase font-black tracking-widest hover:bg-black hover:text-white transition-all flex items-center gap-3">
                      <ExternalLink className="w-4 h-4" /> LinkedIn Profile
                    </a>
                 </div>
              </div>
              <div className="w-full md:w-1/3 aspect-[3/4] bg-white border-2 border-black flex items-center justify-center p-8 group-hover:rotate-1 transition-transform">
                <div className="w-full h-full border border-black/10 flex flex-col gap-4 p-4">
                  <div className="h-4 w-3/4 bg-black/10" />
                  <div className="h-2 w-full bg-black/5" />
                  <div className="h-2 w-full bg-black/5" />
                  <div className="h-2 w-full bg-black/5" />
                  <div className="mt-auto h-8 w-1/2 bg-black" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Experience Trace */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-16 underline decoration-accent decoration-4 underline-offset-[12px]">
            <Briefcase className="w-8 h-8" />
            <h2 className="font-display text-4xl font-black uppercase tracking-tighter">Operational Trace</h2>
          </div>
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 p-10 border border-black hover:bg-black group transition-all duration-500">
                <div className="md:col-span-3 font-mono text-sm uppercase font-black text-black/30 group-hover:text-accent tracking-tighter">
                  {exp.period}
                </div>
                <div className="md:col-span-6">
                  <h3 className="font-display text-4xl font-black uppercase text-black group-hover:text-white mb-2 leading-none">{exp.role}</h3>
                  <div className="font-serif italic text-xl text-black/50 group-hover:text-accent mb-6">{exp.company} // {exp.location}</div>
                  <ul className="space-y-3">
                    {exp.details.map((detail, di) => (
                      <li key={di} className="flex gap-4 items-start text-black/60 group-hover:text-white/70">
                        <span className="w-1.5 h-1.5 bg-accent mt-2 shrink-0" />
                        <span className="text-lg font-light leading-snug">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-3 flex md:justify-end items-start pt-2 gap-4">
                   {exp.certificate && (
                     <a href={exp.certificate} target="_blank" rel="noreferrer" className="p-2 border border-black group-hover:border-accent group-hover:text-accent transition-colors">
                        <Download className="w-4 h-4" />
                     </a>
                   )}
                   <div className="px-4 py-2 bg-black text-white text-[10px] uppercase font-black tracking-widest group-hover:bg-white group-hover:text-black">
                     verified_log
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Timeline */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-16 underline decoration-accent decoration-4 underline-offset-[12px]">
            <GraduationCap className="w-8 h-8" />
            <h2 className="font-display text-4xl font-black uppercase tracking-tighter">Scholastic Trace</h2>
          </div>
          <div className="relative border-l-2 border-black ml-4 md:ml-8 pl-12 space-y-24 py-8">
            {education.map((edu, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="absolute left-[-58px] top-0 w-12 h-12 bg-black flex items-center justify-center text-white">
                   <div className="w-2 h-2 bg-accent" />
                </div>
                <div className="p-10 border border-black group hover:bg-black transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:text-accent transition-colors">
                    <GraduationCap className="w-16 h-16" />
                  </div>
                  <div className="font-mono text-[9px] uppercase font-bold text-black/40 group-hover:text-accent mb-12 tracking-widest">
                    {edu.period} // {edu.location}
                  </div>
                  <h3 className="font-display text-3xl font-bold uppercase mb-4 tracking-tighter group-hover:text-white leading-none">
                    {edu.degree}
                  </h3>
                  <div className="font-serif italic text-lg text-black/50 group-hover:text-white/40 mb-6">
                    {edu.institution}
                  </div>
                  <p className="text-black/60 group-hover:text-white/60 font-light text-base leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Recognitions Preview */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-4 border-black pb-8">
            <div className="flex items-center gap-6">
              <Award className="w-8 h-8" />
              <h2 className="font-display text-4xl font-black uppercase tracking-tighter">Recognitions</h2>
            </div>
            
            <Link to="/awards" className="group flex items-center gap-4 font-mono text-xs uppercase font-black tracking-widest hover:text-accent transition-colors">
               VIEW FULL ARCHIVE <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all"><ArrowUpRight className="w-4 h-4" /></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black bg-black">
            {awards.slice(0, 3).map((award, i) => (
              <motion.div 
                key={award.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 border border-black group hover:invert transition-all duration-300 flex flex-col justify-between aspect-square"
              >
                <div className="font-mono text-[10px] uppercase font-bold text-black/30 mb-auto">
                  {award.year} // {award.category}
                </div>
                <div className="space-y-4">
                   <h4 className="font-display text-3xl font-bold uppercase tracking-tighter leading-none mb-2">
                     {award.title}
                   </h4>
                   <div className="font-mono text-[11px] uppercase font-bold text-accent">
                     Issued by: {award.org}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global Footer Call to Action */}
        <footer className="mt-40 text-center border-t border-black pt-24">
           <h3 className="font-display text-[8vw] font-black uppercase text-black/5 mb-[-0.3em] select-none pointer-events-none">NEXT STEPS</h3>
           <p className="font-mono text-xs uppercase font-bold tracking-[0.4em] mb-12">Looking for MS Opportunities in 2026/2027</p>
           <a href={`mailto:${data.profile.email}`} className="inline-block bg-black text-white px-12 py-5 font-mono text-[11px] uppercase font-black tracking-widest hover:bg-accent hover:text-black transition-all">
             Inquire Dossier / Connect
           </a>
        </footer>
      </div>
    </div>
  );
}


import * as React from "react";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, Radar as RadarComponent, ResponsiveContainer 
} from "recharts";
import data from "../data.json";

interface SkillsRadarProps {
  dark?: boolean;
}

export function SkillsRadar({ dark = false }: SkillsRadarProps) {
  const chartData = data.skills.map(s => ({
    subject: s.subject,
    A: s.value,
    fullMark: 150
  }));

  const labelColor = dark ? '#a1a1aa' : '#000000';
  const gridColor = dark ? '#ffffff' : '#000000';
  const outlineColor = dark ? '#00FF41' : '#000000';

  return (
    <div className={`w-full h-[450px] p-8 relative group transition-all duration-300 border ${
      dark 
        ? "bg-zinc-950/50 border-white/10 text-white" 
        : "bg-white border-black text-black"
    }`}>
      <div className={`absolute top-0 left-0 w-2 h-full bg-black group-hover:bg-[#00FF41] transition-colors ${
        dark ? "bg-white/10" : "bg-black"
      }`} />
      <div className={`font-mono text-[10px] uppercase mb-8 font-bold tracking-[0.4em] ${
        dark ? "text-white/40" : "text-black/30"
      }`}>
        Cognitive Mapping // Core Verticals
      </div>
      
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke={gridColor} strokeOpacity={dark ? 0.15 : 0.1} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fontSize: 9, fill: labelColor, fontWeight: 'bold' }} 
            />
            <RadarComponent
              name="Sabir Jan"
              dataKey="A"
              stroke={outlineColor}
              strokeWidth={2}
              fill="#00FF41"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex justify-between items-end border-t pt-4 border-dashed border-current/10">
        <div className={`font-mono text-[9px] uppercase font-bold leading-relaxed ${
          dark ? "text-white/30" : "text-black/40"
        }`}>
          * Metric analysis based on <br /> academic & industry projects.
        </div>
        <div className="text-[#00FF41] font-display text-xl font-black italic tracking-tighter">1.0X_ENGINEER</div>
      </div>
    </div>
  );
}

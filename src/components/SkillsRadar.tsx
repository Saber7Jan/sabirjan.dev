import * as React from "react";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, Radar as RadarComponent, ResponsiveContainer 
} from "recharts";
import data from "../data.json";

export function SkillsRadar() {
  const chartData = data.skills.map(s => ({
    subject: s.subject,
    A: s.value,
    fullMark: 150
  }));

  return (
    <div className="w-full h-[500px] bg-white border border-black p-8 relative group">
      <div className="absolute top-0 left-0 w-2 h-full bg-black group-hover:bg-accent transition-colors" />
      <div className="font-mono text-[10px] uppercase mb-10 opacity-30 font-bold tracking-[0.4em]">Cognitive Mapping // Core Verticals</div>
      
      <ResponsiveContainer width="100%" height="80%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#000" strokeOpacity={0.1} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fontSize: 10, fill: '#000', fontWeight: 'bold' }} 
          />
          <RadarComponent
            name="Sabir Jan"
            dataKey="A"
            stroke="#000"
            strokeWidth={2}
            fill="#00FF41"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>

      <div className="mt-6 flex justify-between items-end">
        <div className="font-mono text-[9px] uppercase font-bold text-black/40 leading-relaxed">
          * Metric analysis based on <br /> academic & industry projects.
        </div>
        <div className="text-accent font-display text-2xl font-black italic">1.0X_ENGINEER</div>
      </div>
    </div>
  );
}

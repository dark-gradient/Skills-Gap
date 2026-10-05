import React from 'react';

interface AmbientBackgroundProps {
  motionMode?: 'full' | 'reduced' | 'off';
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  motionMode = 'full',
}) => {
  if (motionMode === 'off') {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[#F6FAFF]"
        aria-hidden="true"
      />
    );
  }

  const isReduced = motionMode === 'reduced';

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F6FAFF]"
      aria-hidden="true"
    >
      {/* 1. Subtle High-Tech Blueprint Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #4D9FFF 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* 2. Primary Brand Blue Glowing Orb (Top-Left / Center-Left) */}
      <div
        style={{
          width: '680px',
          height: '680px',
          background: 'radial-gradient(circle, rgba(77, 159, 255, 0.28) 0%, rgba(77, 159, 255, 0.12) 45%, rgba(77, 159, 255, 0) 70%)',
          filter: 'blur(35px)',
          top: '-140px',
          left: '-100px',
        }}
        className={`absolute rounded-full will-change-transform ${
          isReduced ? 'opacity-50' : 'animate-[ambient-drift-blue_14s_ease-in-out_infinite]'
        }`}
      />

      {/* 3. Bright Cyan Glowing Orb (Top-Right / Middle-Right) */}
      <div
        style={{
          width: '620px',
          height: '620px',
          background: 'radial-gradient(circle, rgba(73, 199, 232, 0.24) 0%, rgba(73, 199, 232, 0.08) 50%, rgba(73, 199, 232, 0) 75%)',
          filter: 'blur(35px)',
          top: '15%',
          right: '-120px',
        }}
        className={`absolute rounded-full will-change-transform ${
          isReduced ? 'opacity-50' : 'animate-[ambient-drift-cyan_16s_ease-in-out_infinite]'
        }`}
      />

      {/* 4. Soft Purple Glowing Orb (Bottom-Center / Left) */}
      <div
        style={{
          width: '580px',
          height: '580px',
          background: 'radial-gradient(circle, rgba(139, 124, 255, 0.20) 0%, rgba(139, 124, 255, 0.06) 55%, rgba(139, 124, 255, 0) 75%)',
          filter: 'blur(40px)',
          bottom: '-120px',
          left: '25%',
        }}
        className={`absolute rounded-full will-change-transform ${
          isReduced ? 'opacity-50' : 'animate-[ambient-drift-purple_18s_ease-in-out_infinite]'
        }`}
      />

      {/* 5. Gentle Coral / Warm Glow (Bottom-Right) */}
      <div
        style={{
          width: '440px',
          height: '440px',
          background: 'radial-gradient(circle, rgba(255, 138, 114, 0.16) 0%, rgba(255, 209, 102, 0.08) 45%, transparent 70%)',
          filter: 'blur(35px)',
          bottom: '5%',
          right: '5%',
        }}
        className={`absolute rounded-full will-change-transform ${
          isReduced ? 'opacity-40' : 'animate-[ambient-drift-coral_15s_ease-in-out_infinite]'
        }`}
      />

      {/* 6. Living Constellation & Career Graph Nodes (SVG) */}
      <svg
        className={`absolute inset-0 w-full h-full ${
          isReduced ? 'opacity-40' : 'animate-[network-shimmer_8s_ease-in-out_infinite]'
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="liveLineBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4D9FFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#49C7E8" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="liveLinePurple" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B7CFF" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#4D9FFF" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="liveLineCyan" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#49C7E8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8B7CFF" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Network Vector Connecting Strands */}
        <g strokeWidth="1.25" stroke="url(#liveLineBlue)">
          <line x1="8%" y1="14%" x2="18%" y2="28%" />
          <line x1="18%" y1="28%" x2="28%" y2="18%" />
          <line x1="28%" y1="18%" x2="42%" y2="22%" />
          <line x1="80%" y1="16%" x2="90%" y2="30%" />
          <line x1="90%" y1="30%" x2="76%" y2="42%" />
          <line x1="12%" y1="70%" x2="22%" y2="84%" />
          <line x1="22%" y1="84%" x2="36%" y2="76%" />
          <line x1="72%" y1="74%" x2="85%" y2="82%" />
          <line x1="85%" y1="82%" x2="94%" y2="72%" />
        </g>

        <g strokeWidth="1" stroke="url(#liveLinePurple)" strokeDasharray="4 5">
          <line x1="18%" y1="28%" x2="12%" y2="46%" />
          <line x1="76%" y1="42%" x2="86%" y2="60%" />
          <line x1="64%" y1="12%" x2="80%" y2="16%" />
          <line x1="36%" y1="76%" x2="52%" y2="88%" />
        </g>

        {/* Dynamic Nodes with Pulsing Ring Accents */}
        {[
          { cx: '8%', cy: '14%', r: 3.5, color: '#4D9FFF', pulse: true },
          { cx: '18%', cy: '28%', r: 4.5, color: '#49C7E8', pulse: true },
          { cx: '28%', cy: '18%', r: 3, color: '#8B7CFF', pulse: false },
          { cx: '42%', cy: '22%', r: 3.5, color: '#4D9FFF', pulse: false },
          { cx: '12%', cy: '46%', r: 3.5, color: '#49C7E8', pulse: true },
          { cx: '64%', cy: '12%', r: 3, color: '#8B7CFF', pulse: false },
          { cx: '80%', cy: '16%', r: 5, color: '#4D9FFF', pulse: true },
          { cx: '90%', cy: '30%', r: 3.5, color: '#49C7E8', pulse: false },
          { cx: '76%', cy: '42%', r: 4, color: '#8B7CFF', pulse: true },
          { cx: '86%', cy: '60%', r: 3.5, color: '#FF8A72', pulse: false },
          { cx: '12%', cy: '70%', r: 3, color: '#4D9FFF', pulse: false },
          { cx: '22%', cy: '84%', r: 4.5, color: '#49C7E8', pulse: true },
          { cx: '36%', cy: '76%', r: 3, color: '#8B7CFF', pulse: false },
          { cx: '52%', cy: '88%', r: 3.5, color: '#4D9FFF', pulse: false },
          { cx: '72%', cy: '74%', r: 3.5, color: '#4D9FFF', pulse: false },
          { cx: '85%', cy: '82%', r: 4, color: '#FFD166', pulse: true },
          { cx: '94%', cy: '72%', r: 3, color: '#42C98A', pulse: false },
        ].map((node, i) => (
          <g key={i}>
            {node.pulse && !isReduced && (
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r * 2.2}
                fill="none"
                stroke={node.color}
                strokeWidth="1"
                className="animate-[ambient-pulse-ring_3s_ease-out_infinite]"
                style={{ transformOrigin: `${node.cx} ${node.cy}` }}
              />
            )}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.color}
              opacity={0.85}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

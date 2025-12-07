import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: 'default' | 'danger' | 'info' | 'success' | 'warning';
  subtitle?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, icon, children, variant = 'default', subtitle }) => {
  const getBorderColor = () => {
    switch (variant) {
      case 'danger': return 'border-cyber-danger';
      case 'info': return 'border-cyber-accent';
      case 'success': return 'border-cyber-success';
      case 'warning': return 'border-amber-500';
      default: return 'border-slate-600';
    }
  };

  const getHeaderBg = () => {
    switch (variant) {
      case 'danger': return 'bg-gradient-to-r from-red-900/40 to-transparent';
      case 'info': return 'bg-gradient-to-r from-cyan-900/40 to-transparent';
      case 'success': return 'bg-gradient-to-r from-emerald-900/40 to-transparent';
      case 'warning': return 'bg-gradient-to-r from-amber-900/40 to-transparent';
      default: return 'bg-cyber-800';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'danger': return 'text-red-400';
      case 'info': return 'text-cyan-400';
      case 'success': return 'text-emerald-400';
      case 'warning': return 'text-amber-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <section id={id} className={`mb-12 rounded-xl border border-slate-700 bg-cyber-800/50 backdrop-blur-sm overflow-hidden shadow-2xl ${getBorderColor()} border-l-4 transition-all duration-300 hover:shadow-cyan-900/20`}>
      <div className={`p-4 border-b border-slate-700/50 ${getHeaderBg()} flex items-center gap-3`}>
        <span className={`${getIconColor()} text-xl`}>{icon}</span>
        <div>
            <h2 className="text-xl font-bold text-white tracking-wide uppercase">{title}</h2>
            {subtitle && <p className="text-xs text-slate-400 font-mono mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        {children}
      </div>
    </section>
  );
};

export default Section;
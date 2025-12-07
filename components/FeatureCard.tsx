import React from 'react';

interface FeatureCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, children, icon }) => {
  return (
    <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700 hover:border-cyber-accent transition-colors duration-300">
      <div className="flex items-start gap-3 mb-3">
        {icon && <div className="text-cyber-accent mt-1">{icon}</div>}
        <h4 className="font-bold text-slate-200 text-lg">{title}</h4>
      </div>
      <div className="text-slate-400 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default FeatureCard;
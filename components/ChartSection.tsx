import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Request Rate', value: 5000, label: 'req/s', color: '#ef4444' },
  { name: 'CPU Load', value: 98, label: '%', color: '#f59e0b' },
  { name: 'Retransmissions', value: 37, label: '%', color: '#06b6d4' },
];

const ChartSection: React.FC = () => {
  return (
    <div className="w-full h-[300px] bg-slate-800/30 rounded-lg p-4 border border-slate-700">
      <h3 className="text-center text-sm font-mono text-slate-400 mb-4">Metriky DoS Útoku (Snapshot)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
          <XAxis type="number" stroke="#94a3b8" />
          <YAxis dataKey="name" type="category" width={100} stroke="#e2e8f0" tick={{fontSize: 12, fill: '#cbd5e1'}} />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                borderColor: '#06b6d4', 
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                color: '#f8fafc'
            }}
            itemStyle={{ color: '#67e8f9', fontWeight: 'bold' }}
            cursor={{fill: 'rgba(6, 182, 212, 0.1)'}}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSection;
import React from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash', title }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-slate-700 bg-cyber-900 shadow-inner group">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700">
        <div className="flex items-center gap-2">
            <Terminal size={14} className="text-slate-400" />
            <span className="text-xs text-slate-400 font-mono">{title || language}</span>
        </div>
        <button 
            onClick={handleCopy}
            className="text-slate-400 hover:text-white transition-colors"
            title="Copy to clipboard"
        >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed text-green-400">
            <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
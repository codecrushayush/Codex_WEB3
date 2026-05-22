import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span className="font-semibold text-white">Gasless Sparkle</span>
          <span className="text-gray-700">|</span>
          <span className="inline-flex items-center gap-1 text-violet-400/80">
            <Zap className="w-3 h-3" />
            Powered by UGF
          </span>
          <span className="text-gray-700">&bull;</span>
          <span className="text-cyan-400/70">Base Sepolia</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <span>Built with React + Tailwind</span>
        </div>
      </div>
    </footer>
  );
}

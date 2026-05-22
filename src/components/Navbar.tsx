import { useState, useRef, useEffect } from 'react';
import { Wallet, Zap, ChevronDown, Copy, LogOut, CheckCircle2, Loader2 } from 'lucide-react';

interface NavbarProps {
  connected: boolean;
  onToggleWallet: () => void;
}

export default function Navbar({ connected, onToggleWallet }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      onToggleWallet();
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('0x7f3a2b9c4d1e5f6a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDisconnect = () => {
    setDropdownOpen(false);
    onToggleWallet();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-2xl border-b border-white/[0.04]">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14">
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg neon-bg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-neon-purple/30 transition-shadow duration-300">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight hidden sm:inline">Gasless Sparkle</span>
          </a>
          <span className="text-[10px] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Base Sepolia
          </span>
        </div>

        {connected ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass glow-border text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 btn-press"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs sm:text-sm">0x7f3...a9c2</span>
              <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 glass glow-border rounded-xl p-1.5 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 mb-1">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Connected Wallet</span>
                    <span className="text-[9px] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-1.5 py-px rounded-full font-medium flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      Base Sepolia
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-gray-300 break-all leading-relaxed">0x7f3a2b9c4d1e5f6a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3</p>
                </div>
                <div className="border-t border-white/[0.04] my-1" />
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-200 btn-press"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? (
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Copied!</span>
                  ) : 'Copy Address'}
                </button>
                <button
                  onClick={handleDisconnect}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400/80 hover:text-red-400 hover:bg-red-400/[0.04] transition-all duration-200 btn-press"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Disconnect
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleConnect}
            disabled={connecting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium neon-bg text-white hover:shadow-lg hover:shadow-neon-purple/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 btn-press disabled:opacity-80 disabled:cursor-wait"
          >
            {connecting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </>
            )}
          </button>
        )}
      </div>
    </nav>
  );
}

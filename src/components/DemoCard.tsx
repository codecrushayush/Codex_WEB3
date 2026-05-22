import { useState, useCallback } from 'react';
import { Wallet, DollarSign, Award, ChevronRight, CheckCircle2, Fuel, ExternalLink, Loader2, Zap, AlertCircle, Copy } from 'lucide-react';
import type { TxEntry } from '../App';

const steps = ['Quote', 'Settle', 'Execute', 'Confirm'];

function generateHash() {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) hash += chars[Math.floor(Math.random() * 16)];
  return hash;
}

interface DemoCardProps {
  connected: boolean;
  onToggleWallet: () => void;
  addTx: (tx: TxEntry) => void;
}

export default function DemoCard({ connected, onToggleWallet, addTx }: DemoCardProps) {
  const [activeStep, setActiveStep] = useState(-1);
  const [minted, setMinted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [copiedTx, setCopiedTx] = useState(false);

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleMint = useCallback(() => {
    if (minted || processing) return;
    setProcessing(true);
    setActiveStep(0);

    const newHash = generateHash();
    setTxHash(newHash);

    steps.forEach((_, i) => {
      setTimeout(() => {
        setActiveStep(i + 1);
        if (i === steps.length - 1) {
          setTimeout(() => {
            setMinted(true);
            setProcessing(false);
            setShowSuccess(true);
            addTx({
              hash: newHash,
              wallet: '0x7f3...a9c2',
              action: 'Mint Badge',
              status: 'Confirmed',
              timestamp: 'Just now',
            });
            showToast('Transaction confirmed on Base Sepolia');
            setTimeout(() => setShowSuccess(false), 3000);
          }, 600);
        }
      }, (i + 1) * 700);
    });
  }, [minted, processing, addTx, showToast]);

  const handleCopyTx = () => {
    if (!txHash) return;
    navigator.clipboard.writeText(txHash);
    setCopiedTx(true);
    showToast('Tx hash copied to clipboard', 'info');
    setTimeout(() => setCopiedTx(false), 1500);
  };

  return (
    <section id="demo" className="py-16 sm:py-20 px-4 relative">
      {toast && (
        <div className={`fixed top-18 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 px-4 py-2.5 rounded-xl glass glow-border text-sm font-medium ${toast.type === 'success' ? 'text-emerald-400' : 'text-blue-400'} ${toast.type === 'success' ? 'toast-enter' : 'toast-enter'}`}>
          <CheckCircle2 className="w-4 h-4" />
          {toast.message}
        </div>
      )}

      <div className="max-w-md mx-auto">
        <div className="glass glow-border rounded-2xl p-5 sm:p-6 relative overflow-hidden card-lift">
          <div className="shimmer-bg absolute inset-0 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white text-lg">Wallet</h3>
                <span className="text-[9px] text-violet-400 bg-violet-400/10 border border-violet-400/20 px-2 py-0.5 rounded-full font-medium flex items-center gap-1 shadow-[0_0_8px_rgba(168,85,247,0.2)]">
                  <Zap className="w-2.5 h-2.5" />
                  UGF
                </span>
              </div>
              {connected ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono">0x7f3...a9c2</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Wallet className="w-3.5 h-3.5" />
                  Not connected
                </div>
              )}
            </div>

            <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.08] card-lift">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ETH Balance</p>
                    <p className="text-white font-medium text-sm">0</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-600 bg-white/[0.03] px-2 py-0.5 rounded-full">0 ETH</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.08] card-lift">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mock USD Balance</p>
                    <p className="text-white font-medium text-sm">{connected ? '125.00' : '--'}</p>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400/80 bg-emerald-400/10 px-2 py-0.5 rounded-full">USDM</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-violet-500/[0.04] border border-violet-500/[0.08] transition-all duration-300 hover:bg-violet-500/[0.07] hover:border-violet-500/[0.14] card-lift">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center">
                    <Fuel className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Gas Payment</p>
                    <p className="text-white font-medium text-sm">{connected ? '0.5 USDM' : '--'}</p>
                  </div>
                </div>
                <span className="text-[10px] text-violet-400/80 bg-violet-400/10 px-2 py-0.5 rounded-full">Gasless</span>
              </div>
            </div>

            {!connected ? (
              <button
                onClick={onToggleWallet}
                className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 neon-bg text-white hover:shadow-lg hover:shadow-neon-purple/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 btn-press"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet to Mint
              </button>
            ) : (
              <button
                onClick={handleMint}
                disabled={minted || processing}
                className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 btn-press ${
                  minted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_16px_rgba(52,211,153,0.15)]'
                    : processing
                    ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                    : 'neon-bg text-white hover:shadow-lg hover:shadow-neon-purple/30 hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                {minted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Badge Minted
                  </>
                ) : processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4" />
                    Mint Badge
                  </>
                )}
              </button>
            )}

            <div className="flex items-center justify-between mt-5 px-1">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-500 ${
                        activeStep > i
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.3)]'
                          : activeStep === i
                          ? 'bg-neon-purple/20 border-neon-purple/50 text-neon-purple shadow-[0_0_8px_rgba(168,85,247,0.3)]'
                          : 'bg-white/[0.02] border-white/[0.06] text-gray-600'
                      }`}
                    >
                      {activeStep > i ? <CheckCircle2 className="w-3 h-3" /> : activeStep === i ? <Loader2 className="w-3 h-3 animate-spin" /> : i + 1}
                    </div>
                    <span
                      className={`text-[10px] mt-1 transition-colors duration-500 ${
                        activeStep > i ? 'text-emerald-400' : activeStep === i ? 'text-neon-purple' : 'text-gray-600'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mx-1 -mt-3">
                      <ChevronRight className={`w-3 h-3 transition-colors duration-500 ${activeStep > i ? 'text-emerald-500/40' : 'text-gray-700'}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {minted && txHash && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/[0.10] animate-in fade-in">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Transaction Hash</span>
                  <div className="flex items-center gap-1.5">
                    {showSuccess && <span className="text-[10px] text-emerald-400 animate-pulse">Success!</span>}
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={handleCopyTx}
                    className="flex items-center gap-1.5 font-mono text-xs text-gray-400 hover:text-white transition-colors duration-200 truncate group"
                  >
                    {txHash.slice(0, 18)}...{txHash.slice(-6)}
                    <Copy className={`w-3 h-3 shrink-0 ${copiedTx ? 'text-emerald-400' : 'text-gray-600 group-hover:text-gray-400'} transition-colors`} />
                  </button>
                  <a
                    href={`https://sepolia.basescan.org/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 transition-all duration-200 shrink-0 group"
                  >
                    View on BaseScan
                    <ExternalLink className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            )}

            {!connected && (
              <div className="mt-4 flex items-center gap-1.5 text-[10px] text-amber-400/60">
                <AlertCircle className="w-3 h-3" />
                Connect wallet to interact with the demo
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

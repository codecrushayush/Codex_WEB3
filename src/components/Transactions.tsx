import { useState } from 'react';
import { CheckCircle2, ArrowUpRight, ExternalLink, Clock, Fuel, Copy } from 'lucide-react';
import type { TxEntry } from '../App';

function shortHash(hash: string) {
  return `${hash.slice(0, 10)}...${hash.slice(-6)}`;
}

const BASESCAN_URL = 'https://sepolia.basescan.org';

interface TransactionsProps {
  txList: TxEntry[];
}

export default function Transactions({ txList }: TransactionsProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopyHash = (hash: string, idx: number) => {
    navigator.clipboard.writeText(hash);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <section id="transactions" className="py-16 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Recent <span className="neon-text">Transactions</span>
          </h2>
          <p className="text-gray-500">All gasless, all confirmed on Base Sepolia.</p>
        </div>

        <div className="glass glow-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-gray-500 font-medium px-4 sm:px-6 py-4 text-xs">Tx Hash</th>
                  <th className="text-left text-gray-500 font-medium px-4 sm:px-6 py-4 text-xs hidden sm:table-cell">Wallet</th>
                  <th className="text-left text-gray-500 font-medium px-4 sm:px-6 py-4 text-xs">Action</th>
                  <th className="text-left text-gray-500 font-medium px-4 sm:px-6 py-4 text-xs hidden md:table-cell">Gas</th>
                  <th className="text-left text-gray-500 font-medium px-4 sm:px-6 py-4 text-xs">Status</th>
                  <th className="text-left text-gray-500 font-medium px-4 sm:px-6 py-4 text-xs hidden sm:table-cell">Time</th>
                </tr>
              </thead>
              <tbody>
                {txList.map((tx, i) => (
                  <tr
                    key={`${tx.hash}-${i}`}
                    className={`border-b border-white/[0.03] last:border-0 hover:bg-white/[0.03] transition-all duration-200 ${i === 0 && tx.timestamp === 'Just now' ? 'bg-emerald-500/[0.03]' : ''}`}
                  >
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-gray-400 text-xs">{shortHash(tx.hash)}</span>
                        <button
                          onClick={() => handleCopyHash(tx.hash, i)}
                          className="text-gray-600 hover:text-gray-400 transition-colors duration-200 shrink-0"
                          title="Copy hash"
                        >
                          <Copy className={`w-3 h-3 ${copiedIdx === i ? 'text-emerald-400' : ''} transition-colors`} />
                        </button>
                        <a
                          href={`${BASESCAN_URL}/tx/${tx.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400/60 hover:text-blue-400 transition-colors duration-200 shrink-0"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 hidden sm:table-cell">
                      <span className="font-mono text-gray-300 text-xs">{tx.wallet}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4">
                      <span className="flex items-center gap-1.5 text-gray-300 text-xs">
                        <ArrowUpRight className="w-3 h-3 text-gray-500" />
                        {tx.action}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1 text-[10px] text-violet-400/80 bg-violet-400/10 px-2 py-0.5 rounded-full font-medium">
                        <Fuel className="w-2.5 h-2.5" />
                        0.5 USDM
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ animation: i === 0 && tx.timestamp === 'Just now' ? 'confirmedPulse 2s ease-in-out infinite' : 'none' }}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 hidden sm:table-cell">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {tx.timestamp}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-6">
          <a
            href={`${BASESCAN_URL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass glow-border glow-border-hover text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 card-lift btn-press group"
          >
            Explore on BaseScan
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all duration-200" />
          </a>
        </div>
      </div>
    </section>
  );
}

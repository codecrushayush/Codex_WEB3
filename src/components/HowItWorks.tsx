import { Wallet, Code2, Globe, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    label: 'Wallet',
    desc: 'User signs with Mock USD',
    detail: 'ERC-4337 Smart Account',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    ring: 'ring-violet-500/20',
    glow: 'group-hover:shadow-violet-500/20',
  },
  {
    icon: Code2,
    label: 'UGF SDK',
    desc: 'Sponsors & relays gas',
    detail: 'Paymaster + Bundler',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    ring: 'ring-blue-500/20',
    glow: 'group-hover:shadow-blue-500/20',
  },
  {
    icon: Globe,
    label: 'Base Sepolia',
    desc: 'Executes onchain tx',
    detail: 'L2 Rollup Finality',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    ring: 'ring-cyan-500/20',
    glow: 'group-hover:shadow-cyan-500/20',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Technical Architecture</h2>
          <p className="text-gray-500">How gasless transactions flow through the stack.</p>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass glow-border text-xs font-mono">
            <span className="flex items-center gap-1.5 text-violet-400">
              <Wallet className="w-3.5 h-3.5" />
              Wallet
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="flex items-center gap-1.5 text-blue-400">
              <Code2 className="w-3.5 h-3.5" />
              UGF SDK
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Globe className="w-3.5 h-3.5" />
              Base Sepolia
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex items-center">
                <div className="glass glow-border glow-border-hover rounded-2xl p-6 text-center min-w-[180px] transition-all duration-300 hover:scale-[1.02] group hover:shadow-lg">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${step.bg} ring-1 ${step.ring} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${step.color}`} />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-1">{step.label}</h3>
                  <p className="text-xs text-gray-500 mb-2">{step.desc}</p>
                  <span className="text-[9px] text-gray-600 bg-white/[0.03] px-2 py-0.5 rounded-full font-mono">{step.detail}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center px-3">
                    <div className="w-8 h-[2px] bg-gradient-to-r from-neon-purple/40 to-neon-blue/40 rounded-full" />
                    <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-transparent border-l-neon-blue/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

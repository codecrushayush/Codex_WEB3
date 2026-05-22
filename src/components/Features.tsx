import { UserPlus, Flame, Zap } from 'lucide-react';

const features = [
  {
    icon: UserPlus,
    title: 'Beginner Friendly',
    desc: 'No ETH required. Pay gas with Mock USD and onboard instantly.',
    gradient: 'from-violet-500/20 to-blue-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: Flame,
    title: 'Gasless UX',
    desc: 'UGF sponsors your gas. Zero friction, zero ETH balance needed.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Zap,
    title: 'Instant Transactions',
    desc: 'Fast confirmations on Base. Near-instant finality for every tx.',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    iconColor: 'text-cyan-400',
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Why <span className="neon-text">Gasless Sparkle</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            The simplest path to onchain interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, gradient, iconColor }) => (
            <div
              key={title}
              className="glass glass-hover glow-border glow-border-hover rounded-2xl p-6 transition-all duration-300 group"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

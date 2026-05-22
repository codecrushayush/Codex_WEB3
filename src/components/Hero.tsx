import { useEffect, useRef } from 'react';
import { Zap, Server, Shield } from 'lucide-react';

const infoCards = [
  { icon: Zap, label: 'No ETH Needed', desc: 'Pay gas in Mock USD' },
  { icon: Server, label: 'Base Sepolia', desc: 'Testnet ready' },
  { icon: Shield, label: 'Powered by UGF', desc: 'Gasless infrastructure' },
];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; hue: number }[] = [];
    const PARTICLE_COUNT = 40;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() > 0.5 ? 270 : 220,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon-purple/10 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-neon-blue/8 blur-[100px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <ParticleField />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass glass-hover mb-8 text-sm text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live on Base Sepolia
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          Onchain <span className="neon-text">Without ETH</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          Gasless transactions powered by UGF using Mock USD.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <a
            href="#demo"
            className="neon-bg px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-white shadow-lg shadow-neon-purple/20 hover:shadow-neon-purple/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 btn-press w-full sm:w-auto text-center"
          >
            Launch Demo
          </a>
          <a
            href="#transactions"
            className="glass glass-hover glow-border glow-border-hover px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-gray-200 transition-all duration-300 btn-press w-full sm:w-auto text-center"
          >
            View Transactions
          </a>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto w-full">
        {infoCards.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="glass glass-hover glow-border rounded-xl p-4 text-center transition-all duration-300 card-lift"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg neon-bg/20 mb-3">
              <Icon className="w-5 h-5 text-neon-purple" />
            </div>
            <h3 className="font-semibold text-white text-sm mb-1">{label}</h3>
            <p className="text-xs text-gray-500">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

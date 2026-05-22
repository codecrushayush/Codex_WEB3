import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DemoCard from './components/DemoCard';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Transactions from './components/Transactions';
import Footer from './components/Footer';

export interface TxEntry {
  hash: string;
  wallet: string;
  action: string;
  status: string;
  timestamp: string;
}

function App() {
  const [connected, setConnected] = useState(false);
  const [txList, setTxList] = useState<TxEntry[]>([
    { hash: '0x8a3f2b1c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a', wallet: '0x7f3...a9c2', action: 'Mint Badge', status: 'Confirmed', timestamp: '2m ago' },
    { hash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2', wallet: '0x2b1...d4e8', action: 'Transfer USDM', status: 'Confirmed', timestamp: '5m ago' },
    { hash: '0x4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4', wallet: '0x9c4...f7a1', action: 'Mint Badge', status: 'Confirmed', timestamp: '8m ago' },
    { hash: '0x7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a', wallet: '0x5d8...c3b6', action: 'Approve USDM', status: 'Confirmed', timestamp: '12m ago' },
    { hash: '0xa9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8', wallet: '0x1a6...e2d9', action: 'Transfer USDM', status: 'Confirmed', timestamp: '15m ago' },
  ]);

  const addTx = useCallback((tx: TxEntry) => {
    setTxList(prev => [tx, ...prev]);
  }, []);

  const toggleWallet = useCallback(() => {
    setConnected(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-dark-950 overflow-x-hidden scroll-smooth">
      <Navbar connected={connected} onToggleWallet={toggleWallet} />
      <Hero />
      <DemoCard connected={connected} onToggleWallet={toggleWallet} addTx={addTx} />
      <Features />
      <HowItWorks />
      <Transactions txList={txList} />
      <Footer />
    </div>
  );
}

export default App;

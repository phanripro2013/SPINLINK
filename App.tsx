
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Support from './pages/Support';
import Admin from './pages/Admin';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [claimedIds, setClaimedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('claimed_rewards');
    if (saved) {
      setClaimedIds(JSON.parse(saved));
    }
  }, []);

  const handleClaim = (id: string, rewardId: string) => {
    const newClaimed = { ...claimedIds, [id]: true };
    setClaimedIds(newClaimed);
    localStorage.setItem('claimed_rewards', JSON.stringify(newClaimed));
    
    // Deep Link to Coin Master
    const deepLink = `https://vik-game.moonactive.net/external/openReward?rewardId=${rewardId}`;
    window.open(deepLink, '_blank');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 pb-20">
          <Routes>
            <Route path="/" element={<Home claimedIds={claimedIds} onClaim={handleClaim} />} />
            <Route path="/support" element={<Support />} />
            <Route path="/share" element={<Home claimedIds={claimedIds} onClaim={handleClaim} />} /> {/* Giả lập trang share */}
            <Route path="/privacy" element={<Support />} /> {/* Tạm thời dùng Support cho Privacy */}
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;

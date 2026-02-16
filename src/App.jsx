import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';

import DashboardPage from './components/pages/DashboardPage';
import MatchesPage from './components/pages/MatchesPage';
import RankingsPage from './components/pages/RankingsPage';
import TeamPage from './components/pages/TeamPage';
import PlayerModal from './components/PlayerModal';
import SearchPalette from './components/SearchPalette';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen bg-[var(--color-bg-base)]">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex flex-1 flex-col lg:pl-64">
        <TopBar
          onMenuClick={() => setMobileOpen(true)}
          onSearchClick={() => setSearchOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            {currentPage === 'dashboard' && (
              <DashboardPage
                onPlayerClick={setSelectedPlayer}
              />
            )}
            {currentPage === 'matches' && (
              <MatchesPage
                onPlayerClick={setSelectedPlayer}
              />
            )}
            {currentPage === 'rankings' && (
              <RankingsPage
                onPlayerClick={setSelectedPlayer}
              />
            )}
            {currentPage === 'team' && (
              <TeamPage
                onPlayerClick={setSelectedPlayer}
              />
            )}
          </div>
        </main>
      </div>

      <SearchPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onPlayerSelect={setSelectedPlayer}
      />

      {selectedPlayer && (
        <PlayerModal
          playerName={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}

export default App;

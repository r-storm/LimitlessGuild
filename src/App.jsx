import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';

import DashboardPage from './components/pages/DashboardPage';
import MatchesPage from './components/pages/MatchesPage';
import RankingsPage from './components/pages/RankingsPage';
import TeamPage from './components/pages/TeamPage';
import PlayerModal from './components/PlayerModal';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            {currentPage === 'dashboard' && (
              <DashboardPage
                searchQuery={searchQuery}
                onPlayerClick={setSelectedPlayer}
              />
            )}
            {currentPage === 'matches' && (
              <MatchesPage
                searchQuery={searchQuery}
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
                searchQuery={searchQuery}
                onPlayerClick={setSelectedPlayer}
              />
            )}
          </div>
        </main>
      </div>

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

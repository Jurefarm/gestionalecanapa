import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import IncomingProducts from './pages/IncomingProducts';
import SboccialoProcessing from './pages/SboccialoProcessing';
import BetaProcessing from './pages/BetaProcessing';
import FinishedWarehouse from './pages/FinishedWarehouse';
import FinishingProcessing from './pages/FinishingProcessing';
import Accounting from './pages/Accounting';

type TabKey =
  | 'dashboard'
  | 'incoming'
  | 'sboccialo'
  | 'beta'
  | 'finishing'
  | 'warehouse'
  | 'accounting';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'incoming':
        return <IncomingProducts />;
      case 'sboccialo':
        return <SboccialoProcessing />;
      case 'beta':
        return <BetaProcessing />;
      case 'finishing':
        return <FinishingProcessing />;
      case 'warehouse':
        return <FinishedWarehouse />;
      case 'accounting':
        return <Accounting />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Hemp Processing Management</h1>
        <p className="subtitle">
          Tracciabilità lotti · Sbocciolo · Beta · Rifinitura · Magazzino · Contabilità
        </p>
      </header>

      <nav className="tabs">
        <TabButton
          label="Dashboard"
          active={activeTab === 'dashboard'}
          onClick={() => setActiveTab('dashboard')}
        />
        <TabButton
          label="Ingresso Grezzo"
          active={activeTab === 'incoming'}
          onClick={() => setActiveTab('incoming')}
        />
        <TabButton
          label="Sala Sbocciolo"
          active={activeTab === 'sboccialo'}
          onClick={() => setActiveTab('sboccialo')}
        />
        <TabButton
          label="Sala Beta"
          active={activeTab === 'beta'}
          onClick={() => setActiveTab('beta')}
        />
        <TabButton
          label="Rifinitura"
          active={activeTab === 'finishing'}
          onClick={() => setActiveTab('finishing')}
        />
        <TabButton
          label="Magazzino Finiti"
          active={activeTab === 'warehouse'}
          onClick={() => setActiveTab('warehouse')}
        />
        <TabButton
          label="Contabilità"
          active={activeTab === 'accounting'}
          onClick={() => setActiveTab('accounting')}
        />
      </nav>

      <main className="app-main">{renderContent()}</main>
    </div>
  );
};

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, active, onClick }) => {
  return (
    <button
      type="button"
      className={`tab-button ${active ? 'tab-button-active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default App;

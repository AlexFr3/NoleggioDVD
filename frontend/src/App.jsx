import { useState } from 'react';
import DVDList from './components/DVDList';
import ClientForm from './components/ClientForm';
import RentalForm from './components/RentalForm';
import ClientList from './components/ClientList';
import RentalList from './components/RentalList';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  const [view, setView] = useState('dvd-list'); 
  return (
    <div className="app">
      <header className="app-header">
        <h1>Gestione Noleggi DVD</h1>
        <nav className="navbar">
          <button onClick={() => setView('dvd-list')} className={view === 'dvd-list' ? 'active' : ''}>DVD</button>
          <button onClick={() => setView('client-form')} className={view === 'client-form' ? 'active' : ''}>Nuovo Cliente</button>
          <button onClick={() => setView('rental-form')} className={view === 'rental-form' ? 'active' : ''}>Nuovo Noleggio</button>
          <button onClick={() => setView('rental-list')} className={view === 'rental-list' ? 'active' : ''}>Noleggi</button>
          <button onClick={() => setView('client-list')} className={view === 'client-list' ? 'active' : ''}>Clienti</button>
        </nav>
      </header>

      <main className="app-main">
        <div className="container">
          {view === 'dvd-list' && (
            <DVDList key={`dvd-${refreshKey}`} />
          )}

          {view === 'client-form' && (
            <ClientForm onClientCreated={handleRefresh} />
          )}

          {view === 'rental-form' && (
            <RentalForm onRentalCreated={handleRefresh} />
          )}

          {view === 'client-list' && (
            <ClientList key={`client-${refreshKey}`} />
          )}
           {view === 'rental-list' && (
            <RentalList key={`rental-${refreshKey}`} />
          )}
          
        </div>
      </main>
    </div>
  );
}

export default App;
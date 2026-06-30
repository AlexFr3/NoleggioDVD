import { useState } from 'react';
import DVDList from './components/DVDList';
import ClientForm from './components/ClientForm';
import RentalForm from './components/RentalForm';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleClientCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleRentalCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎥 Gestione Noleggi DVD</h1>
        <p>Sistema di gestione per noleggio di film in DVD</p>
      </header>

      <main className="app-main">
        <div className="container">
          <section className="dvd-section">
            <DVDList key={`dvd-${refreshKey}`} />
          </section>

          <section className="forms-section">
            <div className="form-container">
              <ClientForm onClientCreated={handleClientCreated} />
            </div>

            <div className="form-container">
              <RentalForm onRentalCreated={handleRentalCreated} />
            </div>
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 Gestione Noleggi DVD | Junior Full-Stack</p>
      </footer>
    </div>
  );
}

export default App;
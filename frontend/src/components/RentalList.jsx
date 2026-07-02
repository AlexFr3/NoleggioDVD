import { useState, useEffect } from 'react';
import { noleggioAPI } from '../api/api';
import './css/RentalList.css';

function RentalList() {
  const [noleggi, setNoleggi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNoleggi();
  }, []);

  const fetchNoleggi = async () => {
    try {
      setLoading(true);
      const response = await noleggioAPI.getAll();
      
      console.log("Dati ricevuti dal backend per i noleggi:", response.data);
      
      if (Array.isArray(response.data)) {
        const noleggiOrdinati = response.data.sort((a, b) => {
          const aRestituito = a.restituzione_effettiva ? true : false;
          const bRestituito = b.restituzione_effettiva ? true : false;

          //Da restituire in alto, già restituiti in basso
          if (!aRestituito && bRestituito) return -1;
          if (aRestituito && !bRestituito) return 1;
          
          if (!aRestituito && !bRestituito) {// Se entrambi sono da restituire, ordina per scadenza più vicina
            const scadenzaA = new Date(a.restituzione_prevista).getTime();
            const scadenzaB = new Date(b.restituzione_prevista).getTime();
            return scadenzaA - scadenzaB;
          }

          return b.id - a.id; // Se entrambi sono restituiti, ordina per ID
        });

        setNoleggi(noleggiOrdinati);
      } else {
        setNoleggi([]);
        console.error("I dati ricevuti non sono un array valido!");
      }
      
      setError(null);
    } catch (err) {
      console.error("Errore nel caricamento dei noleggi:", err);
      setError("Impossibile caricare la lista dei noleggi.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestituzione = async (id) => {
    const dataOggi = new Date().toISOString().split('T')[0];

    try {
      await noleggioAPI.update(id, { restituzione_effettiva: dataOggi });
      fetchNoleggi();
    } catch (err) {
      console.error("Errore durante la restituzione:", err);
      alert("Si è verificato un errore durante la registrazione del rientro.");
    }
  };

  if (loading) return <p>Caricamento noleggi in corso...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="rental-list">
      <h2>Lista Noleggi</h2>
      
      {!noleggi || noleggi.length === 0 ? (
        <p>Nessun noleggio registrato al momento.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>DVD</th>
                <th>Data Noleggio</th>
                <th>Scadenza</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              {noleggi?.map((noleggio) => (
                <tr key={noleggio.id}>
                  <td data-label="Cliente">
                    {noleggio.cliente?.nome || 'Sconosciuto'} {noleggio.cliente?.cognome || ''}
                  </td>
                  <td data-label="DVD">
                    {noleggio.dvd?.titolo || 'Sconosciuto'}
                  </td>
                  <td data-label="Data Noleggio">
                    {noleggio.data_noleggio ? new Date(noleggio.data_noleggio).toLocaleDateString('it-IT') : '-'}
                  </td>
                  <td data-label="Scadenza">
                    {noleggio.restituzione_prevista ? new Date(noleggio.restituzione_prevista).toLocaleDateString('it-IT') : '-'}
                  </td>
                  <td data-label="Stato">
                    {noleggio.restituzione_effettiva ? (
                      <span className="status returned">
                        Restituito il {new Date(noleggio.restituzione_effettiva).toLocaleDateString('it-IT')}
                      </span>
                    ) : (
                      <button 
                        className="return-btn"
                        onClick={() => handleRestituzione(noleggio.id)}
                      >
                        Conferma Rientro
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RentalList;
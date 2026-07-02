import { useState, useEffect } from 'react';
import { clientiAPI } from '../api/api';
import './css/ClientList.css';
function ClientList() {
  const [clienti, setClienti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClient();
  }, []);

  const fetchClient = async () => {
    try {
      setLoading(true);
      const response = await clientiAPI.getAll();
      
      setClienti(response.data); 
      setError(null);
    } catch (err) {
      console.error("Errore nel caricamento dei clienti:", err);
      setError("Impossibile caricare la lista dei clienti.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p> Caricamento clienti in corso...</p>;
  if (error) return <p className="error">{error}</p>;
  return (
    <div className="client-list">
      <h2>Lista Clienti</h2>
      
      {clienti.length === 0 ? (
        <p>Nessun cliente registrato al momento.</p>
      ) : (
        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Cognome</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {clienti?.map((cliente) => (
                <tr key={cliente.id}>
                  <td data-label="ID">{cliente.id}</td>
                  <td data-label="Nome">{cliente.nome}</td>
                  <td data-label="Cognome">{cliente.cognome}</td>
                  <td data-label="Email">{cliente.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default ClientList;
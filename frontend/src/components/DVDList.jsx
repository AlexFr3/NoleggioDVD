import { useEffect, useState } from 'react';
import { dvdAPI } from '../api/api';

function DVDList() {
  const [dvds, setDvds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDVDs();
  }, []);

  const fetchDVDs = async () => {
    try {
      setLoading(true);
      const response = await dvdAPI.getAll();
      setDvds(response.data);
      setError(null);
    } catch (err) {
      setError('Errore nel caricamento dei DVD');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Caricamento DVD...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="dvd-list">
      <h2>📀 Catalogo DVD</h2>
      <table>
        <thead>
          <tr>
            <th>Titolo</th>
            <th>Categoria</th>
            <th>Durata (min)</th>
            <th>Data Uscita</th>
            <th>Disponibilità</th>
          </tr>
        </thead>
        <tbody>
          {dvds.map((dvd) => (
            <tr key={dvd.id}>
              <td>{dvd.titolo}</td>
              <td>{dvd.categoria}</td>
              <td>{dvd.durata}</td>
              <td>{new Date(dvd.data_uscita).toLocaleDateString('it-IT')}</td>
              <td>
                <span className={dvd.quantita > 0 ? 'available' : 'unavailable'}>
                  {dvd.quantita} copie
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DVDList;
import { useEffect, useState } from 'react';
import { clientiAPI, dvdAPI, noleggioAPI } from '../api/api';
import './css/RentalForm.css';

function RentalForm({ onRentalCreated }) {
  const [clienti, setClienti] = useState([]);
  const [dvds, setDvds] = useState([]);
  const [formData, setFormData] = useState({
    cliente_id: '',
    dvd_id: '',
    data_noleggio: new Date().toISOString().split('T')[0],
    restituzione_prevista: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const clientiRes = await clientiAPI.getAll();
      const dvdRes = await dvdAPI.getAll();
      setClienti(clientiRes.data);
      setDvds(dvdRes.data);
    } catch (err) {
      setError('Errore nel caricamento dei dati');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await noleggioAPI.create(formData);

      setSuccess(true);
      setFormData({
        cliente_id: '',
        dvd_id: '',
        data_noleggio: new Date().toISOString().split('T')[0],
        restituzione_prevista: '',
      });

      if (onRentalCreated) {
        onRentalCreated();
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Errore nella registrazione del noleggio');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getDvdAvailability = (dvdId) => {
    const dvd = dvds.find((d) => d.id === parseInt(dvdId));
    return dvd ? dvd.quantita : 0;
  };

  return (
    <div className="rental-form">
      <h2>Registra Noleggio</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cliente:</label>
          <select
            name="cliente_id"
            value={formData.cliente_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleziona un cliente</option>
            {clienti?.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome} {cliente.cognome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>DVD:</label>
          <select
            name="dvd_id"
            value={formData.dvd_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleziona un DVD</option>
            {dvds?.map((dvd) => (
              <option key={dvd.id} value={dvd.id}>
                {dvd.titolo} ({dvd.quantita} copie)
              </option>
            ))}
          </select>
          {formData.dvd_id && (
            <small>
              Copie disponibili: {getDvdAvailability(formData.dvd_id)}
            </small>
          )}
        </div>

        <div className="form-group">
          <label>Data Noleggio:</label>
          <input
            type="date"
            name="data_noleggio"
            value={formData.data_noleggio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Data Restituzione Prevista:</label>
          <input
            type="date"
            name="restituzione_prevista"
            value={formData.restituzione_prevista}
            onChange={handleChange}
            required
            min={formData.data_noleggio}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registra Noleggio'}
        </button>
      </form>

      {success && <p className="success">Noleggio registrato con successo!</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default RentalForm;
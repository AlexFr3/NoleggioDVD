import { useState } from 'react';
import { clientiAPI } from '../api/api';

function ClientForm({ onClientCreated }) {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

      await clientiAPI.create(formData);

      setSuccess(true);
      setFormData({ nome: '', cognome: '', email: '' });

      if (onClientCreated) {
        onClientCreated();
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Errore nella creazione del cliente');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-form">
      <h2>👤 Crea Nuovo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Cognome:</label>
          <input
            type="text"
            name="cognome"
            value={formData.cognome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crea Cliente'}
        </button>
      </form>

      {success && <p className="success">Cliente creato con successo!</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ClientForm;
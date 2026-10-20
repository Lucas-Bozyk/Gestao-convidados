import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Check, X, Heart, Loader2 } from 'lucide-react';
import EventHeader from '../components/EventHeader';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function Rsvp() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchGuest = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/guests/rsvp/${token}`);
      if (!res.ok) {
        throw new Error('Convite inválido ou não encontrado.');
      }
      const data = await res.json();
      if (data.status !== 0) {
        setStatus(data.status);
        setMessage(data.message || '');
        setIsSuccess(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGuest();
  }, [fetchGuest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === null) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/guests/rsvp/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, message }),
      });

      if (res.ok) {
        const data = await res.json();
        setStatus(data.status);
        setMessage(data.message || '');
        setIsSuccess(true);
      } else {
        throw new Error('Erro ao salvar resposta.');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container flex justify-center items-center" style={{ minHeight: '100vh' }}>
        <Loader2 className="animate-spin" size={48} color="var(--color-primary)" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex justify-center items-center animate-fade-in-up" style={{ minHeight: '100vh' }}>
        <div className="card text-center text-danger" style={{ maxWidth: '400px' }}>
          <h2>Ops!</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="container rsvp-page birthday-page flex flex-col items-center animate-fade-in-up">
        {status === 1 && <EventHeader celebration />}

        <div className="card rsvp-card rsvp-response text-center" role="status">
          <Heart className="rsvp-response-icon" size={40} strokeWidth={1.3} aria-hidden="true" />
          <p className="invitation-eyebrow">Marly · 80 anos</p>
          <h2>{status === 1 ? 'Vamos celebrar juntos!' : 'Obrigada pelo carinho!'}</h2>
          <p className="rsvp-response-message">
            {status === 1
              ? 'Sua presença foi confirmada. Estamos muito felizes e ansiosos para te ver!'
              : 'Obrigada por nos avisar! Sentiremos sua falta nesse dia especial. Agradecemos pelo carinho e esperamos celebrar juntos em outra oportunidade.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container rsvp-page birthday-page flex flex-col items-center animate-fade-in-up">

      <EventHeader showInvitation celebration />

      <div className="card rsvp-card">
        <p className="invitation-eyebrow text-center">Sua presença é especial</p>
        <h2 className="rsvp-card-title text-center">Confirmar presença</h2>

        <form onSubmit={handleSubmit}>
          <div className="rsvp-choices flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setStatus(1)}
              className={`rsvp-choice text-center${status === 1 ? ' is-selected' : ''}`}
              aria-pressed={status === 1}
            >
              <Check size={24} strokeWidth={1.7} aria-hidden="true" />
              <span>Sim, eu vou!</span>
            </button>

            <button
              type="button"
              onClick={() => setStatus(2)}
              className={`rsvp-choice text-center${status === 2 ? ' is-selected' : ''}`}
              aria-pressed={status === 2}
            >
              <X size={24} strokeWidth={1.7} aria-hidden="true" />
              <span>Não poderei ir</span>
            </button>
          </div>

          <div className="rsvp-message-field">
            <label htmlFor="rsvp-message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Deixe uma mensagem para Marly (opcional)
            </label>
            <textarea
              id="rsvp-message"
              rows="2"
              placeholder="Sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-rsvp rsvp-submit w-100"
            disabled={status === null || isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Confirmar Resposta'}
          </button>
        </form>
      </div>

    </div>
  );
}

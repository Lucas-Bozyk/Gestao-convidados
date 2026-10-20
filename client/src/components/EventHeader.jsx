import { Flower2, MapPin } from 'lucide-react';

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Sítio Magnata, Campos Novos Paulista')}`;

export default function EventHeader({ showInvitation = false, showLocation = true, celebration = false }) {
  return (
    <div className={`event-header text-center${celebration ? ' birthday-invitation' : ''}`}>
      {celebration && <p className="invitation-eyebrow">Um dia para celebrar</p>}
      <h1 className="event-name">Marly Bertoncini</h1>
      {celebration && (
        <>
          <p className="event-anniversary">
            <span className="anniversary-number">70</span>
            <span className="anniversary-unit">anos</span>
          </p>
          <div className="invitation-divider" aria-hidden="true"><Flower2 size={22} strokeWidth={1.3} /></div>
        </>
      )}
      {showInvitation && (
        <p className="rsvp-invitation">
          Com muita alegria queremos convidar você para comemorar esse dia tão especial conosco
        </p>
      )}
      <p className="event-date">{celebration && <span className="event-date-label">Reserve esta data</span>}20 de novembro</p>
      {showLocation && (
        <div className="event-location">
          <div className="event-location-text">
            <MapPin size={18} aria-hidden="true" />
            <span>
              Sítio Magnata
              <small>Campos Novos Paulista</small>
            </span>
          </div>
          <a className="btn event-location-button" href={MAPS_URL} target="_blank" rel="noreferrer">
            Abrir no Maps
          </a>
        </div>
      )}
    </div>
  );
}

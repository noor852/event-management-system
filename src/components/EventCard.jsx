import { Link } from 'react-router-dom';
import {
  getEventImage,
  getVenue,
  getCategory,
  formatDate,
} from '../services/eventHelpers';

function EventCard({ event }) {
  const venue = getVenue(event);
  const image = getEventImage(event);

  return (
    <div className="event-card">
      {image && <img src={image} alt={event.name} />}
      <div className="event-card-body">
        <span className="category">{getCategory(event)}</span>
        <h3>{event.name}</h3>
        <p>{formatDate(event)}</p>
        <p>
          {venue.name}
          {venue.location && ', ' + venue.location}
        </p>
        <Link to={'/events/' + event.id}>View details</Link>
      </div>
    </div>
  );
}

export default EventCard;
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { loadEventDetails } from '../store/eventsSlice';
import {
  registerForEvent,
  cancelRegistration,
} from '../store/registrationsSlice';
import {
  getEventImage,
  getVenue,
  getCategory,
  formatDate,
} from '../services/eventHelpers';

function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const event = useSelector(function (state) {
    return state.events.selected;
  });
  const loading = useSelector(function (state) {
    return state.events.loading;
  });
  const error = useSelector(function (state) {
    return state.events.error;
  });
  const currentUser = useSelector(function (state) {
    return state.auth.currentUser;
  });
  const isRegistered = useSelector(function (state) {
    return state.registrations.items.some(function (item) {
      return (
        currentUser && item.userId === currentUser.id && item.eventId === id
      );
    });
  });

  const [message, setMessage] = useState('');

  useEffect(
    function () {
      dispatch(loadEventDetails(id));
    },
    [dispatch, id]
  );

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="error">{error}</p>
        <Link to="/events">Back to events</Link>
      </div>
    );
  }

  if (!event || event.id !== id) {
    return null;
  }

  const venue = getVenue(event);
  const image = getEventImage(event);
  const price =
    event.priceRanges && event.priceRanges.length > 0
      ? event.priceRanges[0]
      : null;
  const status =
    event.dates && event.dates.status ? event.dates.status.code : '';
  const venueData =
    event._embedded && event._embedded.venues ? event._embedded.venues[0] : null;
  const address =
    venueData && venueData.address ? venueData.address.line1 : '';
  const start = event.dates && event.dates.start ? event.dates.start : null;
  const startDate =
    start && start.localDate
      ? start.localDate + 'T' + (start.localTime || '00:00:00')
      : '';

  function handleRegister() {
    dispatch(
      registerForEvent({
        userId: currentUser.id,
        event: {
          eventId: event.id,
          name: event.name,
          startDate: startDate,
          dateLabel: formatDate(event),
          venue: venue.name,
          location: venue.location,
          image: image,
        },
      })
    );
    setMessage('You are now registered for this event.');
  }

  function handleCancel() {
    dispatch(
      cancelRegistration({ userId: currentUser.id, eventId: event.id })
    );
    setMessage('Your registration has been cancelled.');
  }

  return (
    <div className="event-details">
      <Link to="/events">Back to events</Link>
      <h2>{event.name}</h2>
      {image && <img src={image} alt={event.name} />}

      <p>
        <strong>Date and time:</strong> {formatDate(event)}
      </p>
      <p>
        <strong>Venue:</strong> {venue.name}
      </p>
      <p>
        <strong>Location:</strong> {address && address + ', '}
        {venue.location}
      </p>
      <p>
        <strong>Category:</strong> {getCategory(event)}
      </p>
      {status && (
        <p>
          <strong>Status:</strong> {status}
        </p>
      )}
      {price && (
        <p>
          <strong>Price:</strong> {price.min} - {price.max} {price.currency}
        </p>
      )}
      {event.info && <p>{event.info}</p>}
      {event.pleaseNote && (
        <p>
          <strong>Please note:</strong> {event.pleaseNote}
        </p>
      )}
      {event.url && (
        <p>
          <a href={event.url} target="_blank" rel="noreferrer">
            View on Ticketmaster
          </a>
        </p>
      )}

      {isRegistered ? (
        <button onClick={handleCancel}>Cancel registration</button>
      ) : (
        <button onClick={handleRegister}>Register for this event</button>
      )}
      {message && <p className="success">{message}</p>}
    </div>
  );
}

export default EventDetails;
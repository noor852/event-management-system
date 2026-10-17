import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cancelRegistration } from '../store/registrationsSlice';

function isCompleted(item) {
  if (!item.startDate) {
    return false;
  }
  return new Date(item.startDate) < new Date();
}

function RegistrationCard({ item, canCancel, onCancel }) {
  return (
    <div className="event-card">
      {item.image && <img src={item.image} alt={item.name} />}
      <div className="event-card-body">
        <h3>{item.name}</h3>
        <p>{item.dateLabel}</p>
        <p>
          {item.venue}
          {item.location && ', ' + item.location}
        </p>
        <Link to={'/events/' + item.eventId}>View details</Link>
        {canCancel && (
          <button
            onClick={function () {
              onCancel(item.eventId);
            }}
          >
            Cancel registration
          </button>
        )}
      </div>
    </div>
  );
}

function MyEvents() {
  const dispatch = useDispatch();
  const currentUser = useSelector(function (state) {
    return state.auth.currentUser;
  });
  const allItems = useSelector(function (state) {
    return state.registrations.items;
  });

  const myItems = allItems.filter(function (item) {
    return item.userId === currentUser.id;
  });

  const upcoming = myItems
    .filter(function (item) {
      return !isCompleted(item);
    })
    .sort(function (a, b) {
      return new Date(a.startDate) - new Date(b.startDate);
    });

  const completed = myItems
    .filter(function (item) {
      return isCompleted(item);
    })
    .sort(function (a, b) {
      return new Date(b.startDate) - new Date(a.startDate);
    });

  function handleCancel(eventId) {
    dispatch(cancelRegistration({ userId: currentUser.id, eventId: eventId }));
  }

  return (
    <div className="events-page">
      <h2>My Events</h2>

      {myItems.length === 0 && (
        <p>
          You have not registered for any events yet.{' '}
          <Link to="/events">Browse events</Link>
        </p>
      )}

      {upcoming.length > 0 && (
        <>
          <h3>Upcoming ({upcoming.length})</h3>
          <div className="events-grid">
            {upcoming.map(function (item) {
              return (
                <RegistrationCard
                  key={item.eventId}
                  item={item}
                  canCancel={true}
                  onCancel={handleCancel}
                />
              );
            })}
          </div>
        </>
      )}

      {completed.length > 0 && (
        <>
          <h3>Completed ({completed.length})</h3>
          <div className="events-grid">
            {completed.map(function (item) {
              return (
                <RegistrationCard
                  key={item.eventId}
                  item={item}
                  canCancel={false}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default MyEvents;
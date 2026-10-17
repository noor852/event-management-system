import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents } from '../store/eventsSlice';
import EventCard from '../components/EventCard';
import CategoryBar from '../components/CategoryBar';

function Events() {
  const dispatch = useDispatch();
  const list = useSelector(function (state) {
    return state.events.list;
  });
  const loading = useSelector(function (state) {
    return state.events.loading;
  });
  const error = useSelector(function (state) {
    return state.events.error;
  });

  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [filters, setFilters] = useState({ keyword: '', city: '', category: '' });

  useEffect(
    function () {
      const now = new Date().toISOString().split('.')[0] + 'Z';
      dispatch(
        loadEvents({
          keyword: filters.keyword,
          city: filters.city,
          classificationName: filters.category,
          startDateTime: now,
        })
      );
    },
    [dispatch, filters]
  );

  function handleSearch(event) {
    event.preventDefault();
    setFilters({
      keyword: keyword.trim(),
      city: city.trim(),
      category: filters.category,
    });
  }

  function handleCategory(name) {
    setFilters({ keyword: filters.keyword, city: filters.city, category: name });
  }

  function handleClear() {
    setKeyword('');
    setCity('');
    setFilters({ keyword: '', city: '', category: '' });
  }

  return (
    <div className="events-page">
      <h2>Upcoming Events</h2>

      <CategoryBar selected={filters.category} onSelect={handleCategory} />

      <form className="filters" onSubmit={handleSearch}>
        <input
          placeholder="Search events..."
          value={keyword}
          onChange={function (e) {
            setKeyword(e.target.value);
          }}
        />
        <input
          placeholder="City"
          value={city}
          onChange={function (e) {
            setCity(e.target.value);
          }}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>

      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && list.length === 0 && <p>No events found.</p>}

      <div className="events-grid">
        {list.map(function (event) {
          return <EventCard key={event.id} event={event} />;
        })}
      </div>
    </div>
  );
}

export default Events;
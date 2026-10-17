const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = import.meta.env.VITE_TM_API_KEY;

export async function fetchEvents(params) {
  const query = new URLSearchParams({
    apikey: API_KEY,
    size: '20',
    sort: 'date,asc',
  });
  Object.keys(params).forEach(function (key) {
    if (params[key]) {
      query.set(key, params[key]);
    }
  });

  const response = await fetch(BASE_URL + '/events.json?' + query.toString());
  if (!response.ok) {
    throw new Error('Could not load events (error ' + response.status + ')');
  }
  const data = await response.json();
  return {
    events: data._embedded ? data._embedded.events : [],
    totalPages: data.page ? data.page.totalPages : 0,
  };
}

export async function fetchEventById(id) {
  const response = await fetch(
    BASE_URL + '/events/' + id + '.json?apikey=' + API_KEY
  );
  if (!response.ok) {
    throw new Error('Could not load event details (error ' + response.status + ')');
  }
  return response.json();
}
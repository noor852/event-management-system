export function getEventImage(event) {
  if (!event.images || event.images.length === 0) {
    return '';
  }
  const wide = event.images.find(function (img) {
    return img.ratio === '16_9' && img.width >= 500;
  });
  return wide ? wide.url : event.images[0].url;
}

export function getVenue(event) {
  const venue =
    event._embedded && event._embedded.venues ? event._embedded.venues[0] : null;
  if (!venue) {
    return { name: 'Venue to be announced', location: '' };
  }
  const parts = [];
  if (venue.city && venue.city.name) {
    parts.push(venue.city.name);
  }
  if (venue.country && venue.country.name) {
    parts.push(venue.country.name);
  }
  return { name: venue.name, location: parts.join(', ') };
}

export function getCategory(event) {
  if (!event.classifications || event.classifications.length === 0) {
    return 'Other';
  }
  const info = event.classifications[0];
  const segment = info.segment ? info.segment.name : '';
  const genre = info.genre ? info.genre.name : '';
  if (segment && genre && genre !== 'Undefined' && genre !== segment) {
    return segment + ' / ' + genre;
  }
  return segment || 'Other';
}

export function formatDate(event) {
  const start = event.dates && event.dates.start ? event.dates.start : null;
  if (!start || !start.localDate) {
    return 'Date to be announced';
  }
  const date = new Date(start.localDate + 'T' + (start.localTime || '00:00:00'));
  const dayText = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  if (!start.localTime) {
    return dayText;
  }
  const timeText = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return dayText + ', ' + timeText;
}
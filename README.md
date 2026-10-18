# Event Management System

A React-based Event Management System built for Web Programming Assignment 2. Users can explore real events from the Ticketmaster Discovery API, view event details, register for events, and manage their registrations.

## Features

- User registration, login and logout (frontend simulation, state saved in Local Storage so login survives a page refresh)
- Browse upcoming events fetched from the Ticketmaster Discovery API
- Search events by keyword, filter by city, and browse by category
- Event details page with name, date and time, venue, location, category, image, status, price range and a link to Ticketmaster
- Register for an event, with duplicate registration prevented and feedback after registering or cancelling
- My Events page that separates upcoming and completed events and allows cancelling upcoming registrations
- Protected routes that redirect logged-out users to the login page
- Loading and error states, and form validation on the login and register forms

## Tech Stack

- React (Vite)
- Redux Toolkit and React Redux
- React Router
- Ticketmaster Discovery API

## Setup and Execution

1. Clone the repository:

```
git clone https://github.com/noor852/event-management-system.git
cd event-management-system
```

2. Install the dependencies:

```
npm install
```

3. Get a free API key (Consumer Key) from https://developer.ticketmaster.com/

4. Create a file named `.env` in the project root (next to `package.json`) and add your key:

```
VITE_TM_API_KEY=your_consumer_key_here
```

The `.env` file is listed in `.gitignore`, so the key is never committed.

5. Start the development server:

```
npm run dev
```

6. Open the address shown in the terminal (usually http://localhost:5173). If you change `.env` later, stop the server and start it again.

## Project Structure

```git status
src/
  components/   Navbar, ProtectedRoute, EventCard, CategoryBar
  pages/        Login, Register, Events, EventDetails, MyEvents
  services/     Ticketmaster API calls and event helper functions
  store/        Redux store and slices (auth, events, registrations)
```

## Redux Structure

- `auth`: registered users, the current user and auth errors
- `events`: event list, selected event, loading and error state (async thunks call the API)
- `registrations`: each registration is stored with the user id, so every user sees only their own events

## Notes

- Authentication is a frontend simulation only, as required by the assignment. Users and passwords are kept in Local Storage and there is no real backend.
- Registrations are also stored in Local Storage and are linked to the logged-in user.
- The Ticketmaster API is called with a start date of now, so the events list shows upcoming events only. An event moves to the Completed section of My Events once its date has passed.
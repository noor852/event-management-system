import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(function (state) {
    return state.auth.currentUser;
  });

  function handleLogout() {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <Link to="/events" className="brand">
        EventHub
      </Link>
      <div className="nav-links">
        {currentUser ? (
          <>
            <Link to="/events">Events</Link>
            <Link to="/my-events">My Events</Link>
            <span>Hi, {currentUser.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
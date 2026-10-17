import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, clearError } from '../store/authSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(function (state) {
    return state.auth.currentUser;
  });
  const authError = useSelector(function (state) {
    return state.auth.error;
  });

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  useEffect(function () {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(
    function () {
      if (currentUser) {
        navigate('/events');
      }
    },
    [currentUser, navigate]
  );

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function validate() {
    const newErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }
    if (form.password.length === 0) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    dispatch(
      login({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })
    );
  }

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        {authError && <p className="error">{authError}</p>}

        <button type="submit">Login</button>
      </form>
      <p>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default Login;
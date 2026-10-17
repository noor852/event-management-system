import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register, clearError } from '../store/authSlice';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(function (state) {
    return state.auth.currentUser;
  });
  const authError = useSelector(function (state) {
    return state.auth.error;
  });

  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
    if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }
    if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      register({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })
    );
  }

  return (
    <div className="auth-page">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

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

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
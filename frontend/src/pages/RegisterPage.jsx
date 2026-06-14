import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import useAuthStore from '../store/authStore';
import AuthLayout from '../components/auth/AuthLayout';
import AuthField from '../components/auth/AuthField';

export default function RegisterPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/auth/register', form);
      setUser(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 style={{
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: '#dae2fd',
        margin: '0 0 12px',
      }}>
        Create your account
      </h1>
      <p style={{
        fontSize: 15,
        color: '#8c909f',
        margin: '0 0 28px',
        lineHeight: 1.7,
      }}>
        Start building your second brain today
      </p>

      {error && (
        <div style={{
          marginBottom: 28,
          padding: '14px 18px',
          borderRadius: 10,
          fontSize: 14,
          color: '#ffb4ab',
          background: 'rgba(255,100,100,0.08)',
          border: '1px solid rgba(255,100,100,0.25)',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <AuthField
          label="Name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
        <AuthField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
        <AuthField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            marginTop: 12,
            padding: '16px',
            borderRadius: 10,
            border: 'none',
            fontWeight: 700,
            fontSize: 14,
            fontFamily: 'monospace',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            background: '#adc6ff',
            color: '#002e6a',
          }}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p style={{
        textAlign: 'center',
        fontSize: 14,
        color: '#475569',
        marginTop: 28,
        lineHeight: 1.6,
      }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#adc6ff', fontWeight: 600, textDecoration: 'none' }}>
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

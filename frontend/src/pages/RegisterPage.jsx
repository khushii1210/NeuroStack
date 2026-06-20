import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import useAuthStore from '../store/authStore';
import AuthLayout from '../components/auth/AuthLayout';
import AuthField from '../components/auth/AuthField';

export default function RegisterPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore(s => s.setUser);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await axios.post('/auth/register', form);
      setUser(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <AuthLayout>
      <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff5f5', margin: '0 0 8px' }}>
        Create your account
      </h1>
      <p style={{ fontSize: 14, color: '#7a5a5a', margin: '0 0 28px', lineHeight: 1.7 }}>
        Start building your second brain today
      </p>

      {error && (
        <div style={{
          marginBottom: 24, padding: '12px 16px', borderRadius: 8,
          fontSize: 13, color: '#f87171',
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.2)',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <AuthField label="Name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
        <AuthField label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
        <AuthField label="Password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
        <button
          type="submit" disabled={loading}
          style={{
            width: '100%', marginTop: 8, padding: '14px',
            borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 14,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
            color: '#fff', transition: 'opacity 0.15s',
          }}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: 13, color: '#7a5a5a', marginTop: 24 }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#f87171', fontWeight: 600, textDecoration: 'none' }}>
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

import { useState } from 'react';
import { User, Lock, Trash2, Save, Eye, EyeOff } from 'lucide-react';
import useAuthStore from '../store/authStore';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const S = {
  surface: '#0b1326',
  border: '#1E293B',
  text: '#dae2fd',
  muted: '#8c909f',
  dim: '#475569',
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 10,
  background: '#020617',
  border: `1px solid ${S.border}`,
  color: S.text,
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const labelStyle = {
  color: S.muted,
  fontSize: 13,
  display: 'block',
  marginBottom: 6,
};

function SectionCard({ children, borderColor, style }) {
  return (
    <div style={{
      background: S.surface,
      border: `1px solid ${borderColor || S.border}`,
      borderRadius: 16,
      padding: '28px 30px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Feedback({ msg }) {
  if (!msg.text) return null;
  return (
    <p style={{
      fontSize: 13,
      color: msg.type === 'success' ? '#4ade80' : '#f87171',
      margin: 0,
    }}>
      {msg.text}
    </p>
  );
}

function SettingsPage() {
  const { user, setUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '' });
  const [password, setPassword] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPasswords, setShowPasswords] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const [profileMsg, setProfileMsg] = useState({ text: '', type: '' });
  const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });
  const [deleteMsg, setDeleteMsg] = useState({ text: '', type: '' });

  const handleProfileSave = async () => {
    try {
      const res = await axios.put('/auth/profile', profile);
      setUser(res.data);
      setProfileMsg({ text: 'Profile updated successfully', type: 'success' });
    } catch (err) {
      setProfileMsg({ text: err.response?.data?.message || 'Failed to update profile', type: 'error' });
    }
  };

  const handlePasswordSave = async () => {
    if (password.newPassword !== password.confirmPassword)
      return setPasswordMsg({ text: 'Passwords do not match', type: 'error' });
    if (password.newPassword.length < 6)
      return setPasswordMsg({ text: 'Password must be at least 6 characters', type: 'error' });
    try {
      await axios.put('/auth/password', {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      });
      setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordMsg({ text: 'Password updated successfully', type: 'success' });
    } catch (err) {
      setPasswordMsg({ text: err.response?.data?.message || 'Failed to update password', type: 'error' });
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== user?.email)
      return setDeleteMsg({ text: 'Email does not match', type: 'error' });
    try {
      await axios.delete('/auth/account');
      logout();
      navigate('/login');
    } catch {
      setDeleteMsg({ text: 'Failed to delete account', type: 'error' });
    }
  };

  return (
    <div style={{ padding: '40px 48px 48px', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{
          color: S.muted,
          fontSize: 12,
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: '0 0 8px',
        }}>
          Account
        </p>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent" style={{ margin: 0 }}>
          Settings
        </h1>
        <p style={{ color: S.muted, fontSize: 15, margin: '10px 0 0' }}>
          Manage your account preferences
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Profile */}
        <SectionCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <User size={18} style={{ color: '#22d3ee' }} />
            <h3 style={{ color: S.text, fontSize: 15, fontWeight: 600, margin: 0 }}>Profile</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={labelStyle}>Name</label>
              <input
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={e => setProfile({ ...profile, email: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleProfileSave}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 10,
              border: 'none',
              background: 'linear-gradient(to right, #06b6d4, #2563eb)',
              color: '#fff',
              fontSize: 13,
              fontFamily: 'monospace',
              fontWeight: 600,
              cursor: 'pointer',
              alignSelf: 'flex-start',
            }}
          >
            <Save size={15} /> Save Changes
          </button>
          <Feedback msg={profileMsg} />
        </SectionCard>

        {/* Password */}
        <SectionCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Lock size={18} style={{ color: '#c084fc' }} />
              <h3 style={{ color: S.text, fontSize: 15, fontWeight: 600, margin: 0 }}>Change Password</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.dim, display: 'flex' }}
              onMouseOver={e => { e.currentTarget.style.color = S.muted; }}
              onMouseOut={e => { e.currentTarget.style.color = S.dim; }}
            >
              {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { key: 'currentPassword', label: 'Current Password' },
              { key: 'newPassword', label: 'New Password' },
              { key: 'confirmPassword', label: 'Confirm New Password' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={password[key]}
                  onChange={e => setPassword({ ...password, [key]: e.target.value })}
                  placeholder="••••••••"
                  style={inputStyle}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handlePasswordSave}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 10,
              border: 'none',
              background: 'linear-gradient(to right, #a855f7, #db2777)',
              color: '#fff',
              fontSize: 13,
              fontFamily: 'monospace',
              fontWeight: 600,
              cursor: 'pointer',
              alignSelf: 'flex-start',
            }}
          >
            <Save size={15} /> Update Password
          </button>
          <Feedback msg={passwordMsg} />
        </SectionCard>

        {/* Danger Zone */}
        <SectionCard borderColor="rgba(248,113,113,0.3)" style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Trash2 size={18} style={{ color: '#f87171' }} />
            <h3 style={{ color: S.text, fontSize: 15, fontWeight: 600, margin: 0 }}>Danger Zone</h3>
          </div>
          <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Deleting your account is permanent. All your notes, snippets, bugs, and graph data will be deleted.
          </p>
          <div>
            <label style={labelStyle}>
              Type your email{' '}
              <span style={{ color: '#f87171' }}>{user?.email}</span>{' '}
              to confirm
            </label>
            <input
              value={deleteConfirm}
              onChange={e => setDeleteConfirm(e.target.value)}
              placeholder="your@email.com"
              style={{ ...inputStyle, border: '1px solid rgba(248,113,113,0.3)' }}
            />
          </div>
          <button
            type="button"
            onClick={handleDeleteAccount}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 10,
              border: '1px solid rgba(248,113,113,0.4)',
              background: 'rgba(248,113,113,0.1)',
              color: '#f87171',
              fontSize: 13,
              fontFamily: 'monospace',
              cursor: 'pointer',
              alignSelf: 'flex-start',
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.18)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.1)'; }}
          >
            <Trash2 size={15} /> Delete Account
          </button>
          <Feedback msg={deleteMsg} />
        </SectionCard>

      </div>
    </div>
  );
}

export default SettingsPage;

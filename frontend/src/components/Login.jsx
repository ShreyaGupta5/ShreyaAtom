import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, ShieldCheck, AlertCircle, KeyRound, Terminal } from 'lucide-react';
import axios from 'axios';
import { API_BASE } from '../api';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get(`${API_BASE}/api/users`);
      const user = response.data.find(u => u.email === email && u.password === password);
      
      if (user) {
        onLogin(user);
        navigate('/dashboard');
      } else {
        setErrorMessage('Invalid credentials. Please verify your email and password or use a pre-configured sandbox profile below.');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage('Unable to connect to the compliance server. Please ensure the backend is active.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (roleEmail) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get(`${API_BASE}/api/users`);
      const user = response.data.find(u => u.email === roleEmail && u.password === 'password');
      
      if (user) {
        onLogin(user);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage('Unable to connect to the compliance server. Please ensure the backend is active.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-center min-h-screen w-full" style={{ padding: '24px 0' }}>
      <div className="glass-card max-w-md" style={{ border: '1px solid rgba(0, 245, 212, 0.2)', boxShadow: '0 0 35px rgba(0, 245, 212, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)', background: 'rgba(7, 11, 19, 0.75)' }}>
        <div className="text-center mb-8">
          <div className="flex-center mb-4">
            <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px var(--primary-glow)' }}>
              <KeyRound color="#070b13" size={24} style={{ strokeWidth: 2.5 }} />
            </div>
          </div>
          <h2 style={{ background: 'linear-gradient(to right, #ffffff, var(--primary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.8rem', textShadow: '0 0 10px rgba(0, 245, 212, 0.15)' }}>AtomQuest Security</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '6px' }}>Authorized Compliance Authentication Gateway</p>
        </div>

        {/* Custom Inline Error Message */}
        {errorMessage && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '8px', color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '20px' }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Security Email</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="e.g. employee@atom.com" 
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
              required
            />
          </div>
          <div className="input-group">
            <label>Access Code / Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ height: '48px', fontSize: '0.95rem', background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)', color: '#070b13', fontWeight: 700 }}>
            {loading ? 'Decrypting Access...' : 'Authenticate'}
          </button>
        </form>

        {/* Sandbox Evaluation Environment */}
        <div style={{ marginTop: '28px', borderTop: '1px solid rgba(0,245,212,0.1)', paddingTop: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <Terminal size={14} color="var(--primary-color)" />
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              Audit & Sandbox Terminal
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '16px', lineHeight: '1.4' }}>
            Select a compliance profile below to bypass biometric authentication and inspect the portal.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <button type="button" className="btn btn-secondary" style={{ padding: '8px', fontSize: '0.78rem', height: '36px', background: 'rgba(0, 245, 212, 0.03)', borderColor: 'rgba(0, 245, 212, 0.15)', color: '#fff' }} onClick={() => handleQuickLogin('employee@atom.com')} disabled={loading}>
              Employee
            </button>
            <button type="button" className="btn btn-secondary" style={{ padding: '8px', fontSize: '0.78rem', height: '36px', background: 'rgba(0, 245, 212, 0.03)', borderColor: 'rgba(0, 245, 212, 0.15)', color: '#fff' }} onClick={() => handleQuickLogin('manager@atom.com')} disabled={loading}>
              Manager
            </button>
            <button type="button" className="btn btn-secondary" style={{ padding: '8px', fontSize: '0.78rem', height: '36px', background: 'rgba(0, 245, 212, 0.03)', borderColor: 'rgba(0, 245, 212, 0.15)', color: '#fff' }} onClick={() => handleQuickLogin('admin@atom.com')} disabled={loading}>
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

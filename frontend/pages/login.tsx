import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { apiLogin } from '@/utils/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('Kzignonemmanuel@gmail.com');
  const [password, setPassword] = useState('Granville2024');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = await apiLogin(email, password);
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', token);
      }
      router.push('/dashboard');
    } catch (e) {
      setError('Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e5e7eb' }}>
      <div style={{ width: '100%', maxWidth: 400, background: '#ffffff', borderRadius: 12, padding: 32, boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24, textAlign: 'center' }}>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', borderRadius: 6, border: '1px solid #cbd5f5', padding: '8px 10px', fontSize: 14 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', borderRadius: 6, border: '1px solid #cbd5f5', padding: '8px 10px', fontSize: 14 }}
            />
          </div>
          {error && <p style={{ fontSize: 12, color: '#b91c1c', marginBottom: 8 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 6,
              border: 'none',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://supa-steel-structures.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

     if (response.ok) {
  // Save user info and token
  localStorage.setItem('user', JSON.stringify(data));
  
  // Redirect based on role
  if (data.role === 'admin') {
    navigate('/admin');
  } else {
    navigate('/dashboard');   // Customers go to Dashboard
  }
}
       else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '60px auto', padding: '20px' }}>
      <h1 style={{ color: '#1e3a8a', textAlign: 'center' }}>Login</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Login as Customer or Admin
      </p>

      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#b91c1c',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            placeholder="Enter your email"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#1e3a8a',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '25px' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#1e3a8a', fontWeight: 'bold' }}>
          Register here
        </Link>
      </p>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '11px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '15px'
};

export default Login;
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Navigation Bar */}
        <nav style={{
          backgroundColor: '#1e3a8a',
          padding: '15px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
        }}>
          <div style={{ color: 'white', fontSize: '22px', fontWeight: 'bold' }}>
            Supa Steel Structures
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/products" style={linkStyle}>Products</Link>
            <Link to="/about" style={linkStyle}>About</Link>
            <Link to="/contact" style={linkStyle}>Contact</Link>

            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" style={linkStyle}>Admin</Link>
                )}
                <span style={{ color: '#bfdbfe', marginLeft: '20px', marginRight: '10px' }}>
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid white',
                    color: 'white',
                    padding: '6px 14px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '10px'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={linkStyle}>Login</Link>
                <Link to="/register" style={{ ...linkStyle, backgroundColor: 'white', color: '#1e3a8a', padding: '6px 14px', borderRadius: '5px' }}>
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Page Content */}
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', flex: 1, width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

const linkStyle = {
  color: 'white',
  marginLeft: '20px',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500'
};

export default App;
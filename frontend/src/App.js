import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const closeMenu = () => setMenuOpen(false);

  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Navigation Bar */}
        <nav style={{
          backgroundColor: '#1e3a8a',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          position: 'relative'
        }}>
          <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
            Supa Steel Structures
          </div>

          {/* Hamburger button (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '28px',
              cursor: 'pointer',
              display: 'block'
            }}
            className="menu-btn"
          >
            ☰
          </button>

          {/* Menu Links */}
          <div
            style={{
              display: menuOpen ? 'flex' : 'none',
              flexDirection: 'column',
              position: 'absolute',
              top: '60px',
              left: 0,
              right: 0,
              backgroundColor: '#1e3a8a',
              padding: '15px 20px',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            className="mobile-menu"
          >
            <Link to="/" style={mobileLinkStyle} onClick={closeMenu}>Home</Link>
            <Link to="/products" style={mobileLinkStyle} onClick={closeMenu}>Products</Link>
            <Link to="/about" style={mobileLinkStyle} onClick={closeMenu}>About</Link>
            <Link to="/contact" style={mobileLinkStyle} onClick={closeMenu}>Contact</Link>

            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link to="/admin" style={mobileLinkStyle} onClick={closeMenu}>Admin</Link>
                ) : (
                  <Link to="/dashboard" style={mobileLinkStyle} onClick={closeMenu}>My Dashboard</Link>
                )}
                <div style={{ color: '#bfdbfe', padding: '12px 0', borderTop: '1px solid #3b82f6', marginTop: '10px' }}>
                  Hi, {user.name}
                </div>
                <button
                  onClick={() => { handleLogout(); closeMenu(); }}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid white',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px',
                    width: '100%'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={mobileLinkStyle} onClick={closeMenu}>Login</Link>
                <Link to="/register" style={{ ...mobileLinkStyle, backgroundColor: 'white', color: '#1e3a8a', textAlign: 'center', borderRadius: '5px', marginTop: '8px' }} onClick={closeMenu}>
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="desktop-menu" style={{ display: 'none', alignItems: 'center' }}>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/products" style={linkStyle}>Products</Link>
            <Link to="/about" style={linkStyle}>About</Link>
            <Link to="/contact" style={linkStyle}>Contact</Link>

            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link to="/admin" style={linkStyle}>Admin</Link>
                ) : (
                  <Link to="/dashboard" style={linkStyle}>My Dashboard</Link>
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
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', flex: 1, width: '100%', boxSizing: 'border-box' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>

        <Footer />
      </div>

      {/* Simple CSS for desktop vs mobile */}
      <style>{`
        @media (min-width: 768px) {
          .menu-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
          .desktop-menu {
            display: flex !important;
          }
        }
      `}</style>
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

const mobileLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '17px',
  padding: '12px 0',
  borderBottom: '1px solid #3b82f6',
  display: 'block'
};

export default App;
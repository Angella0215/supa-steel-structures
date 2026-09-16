function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1e3a8a',
      color: 'white',
      padding: '40px 20px',
      marginTop: '60px',
      textAlign: 'center'
    }}>
      <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '22px' }}>
        Supa Steel Structures
      </h3>
      <p style={{ color: '#e0e7ff', marginBottom: '8px' }}>
        Engineering Your Ideas To Reality
      </p>
      <p style={{ margin: '8px 0' }}>Lilongwe, 6 Miles | Mon – Sat, 8:00 AM – 5:00 PM</p>
      <p style={{ margin: '8px 0' }}>Phone: 0881 826 167</p>
      <p style={{ margin: '8px 0' }}>Facebook: Supa Steel Structures</p>
      <p style={{ marginTop: '25px', fontSize: '14px', color: '#bfdbfe' }}>
        © {new Date().getFullYear()} Supa Steel Structures. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
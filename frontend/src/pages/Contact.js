function Contact() {
  return (
    <div>
      <h1 style={{ color: '#1e3a8a', marginBottom: '10px' }}>Contact Us</h1>
      <p style={{ marginBottom: '40px', color: '#555' }}>
        We are ready to help you with your steel project. Reach out to us using any of the details below.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '25px',
        marginBottom: '40px'
      }}>
        <div style={contactCard}>
          <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>Phone</h3>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>0881 826 167</p>
          <p style={{ color: '#666' }}>Call or WhatsApp us</p>
        </div>

        <div style={contactCard}>
          <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>Location</h3>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Lilongwe, 6 Miles</p>
          <p style={{ color: '#666' }}>Come visit our workshop</p>
        </div>

        <div style={contactCard}>
          <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>Working Hours</h3>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Mon – Sat</p>
          <p style={{ color: '#666' }}>8:00 AM – 5:00 PM</p>
        </div>

        <div style={contactCard}>
          <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>Facebook</h3>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Supa Steel Structures</p>
          <p style={{ color: '#666' }}>Follow us for updates</p>
        </div>
      </div>

      <div style={{
        backgroundColor: '#eff6ff',
        padding: '30px',
        borderRadius: '12px',
        border: '1px solid #bfdbfe'
      }}>
        <h2 style={{ color: '#1e3a8a', marginTop: 0 }}>How to Order</h2>
        <ol style={{ lineHeight: '1.8', color: '#333' }}>
          <li>Browse our products or tell us your idea</li>
          <li>We create an AutoCAD drawing for you to approve</li>
          <li>We give you the price and timeframe</li>
          <li>We fabricate and weld your product</li>
          <li>You come and collect it when it is ready</li>
        </ol>
      </div>
    </div>
  );
}

const contactCard = {
  backgroundColor: 'white',
  padding: '25px',
  borderRadius: '12px',
  border: '1px solid #ddd',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
};

export default Contact;
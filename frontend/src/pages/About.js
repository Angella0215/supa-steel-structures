function About() {
  return (
    <div>
      <h1 style={{ color: '#1e3a8a', marginBottom: '20px' }}>About Supa Steel Structures</h1>
      
      <div style={{
        backgroundColor: '#eff6ff',
        padding: '30px',
        borderRadius: '12px',
        border: '1px solid #bfdbfe',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#1e3a8a', marginTop: 0 }}>Our Goal</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <strong>Engineering Your Ideas To Reality</strong>
        </p>
        <p style={{ lineHeight: '1.7', color: '#333' }}>
          At Supa Steel Structures, we turn your ideas into strong and durable steel products. 
          Before we start fabrication and welding, we create AutoCAD drawings so you can clearly 
          see and approve the final design.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
        <div style={infoBox}>
          <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>Location</h3>
          <p>Lilongwe, 6 Miles</p>
        </div>

        <div style={infoBox}>
          <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>Working Hours</h3>
          <p>Monday – Saturday</p>
          <p>8:00 AM – 5:00 PM</p>
        </div>

        <div style={infoBox}>
          <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>What We Make</h3>
          <p>Desks, Gates, Doors, Tables, Beds, Trolleys and more custom steel work.</p>
        </div>
      </div>
    </div>
  );
}

const infoBox = {
  flex: '1',
  minWidth: '220px',
  backgroundColor: 'white',
  padding: '25px',
  borderRadius: '10px',
  border: '1px solid #ddd',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
};

export default About;
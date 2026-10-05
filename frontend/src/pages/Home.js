function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Steel Bed Frame",
      price: "MWK 220,000",
      image: "/images/bed.jpg.png",
      timeframe: "7-10 working days"
    },
    {
      id: 2,
      name: "School Desk & Chair",
      price: "MWK 95,000",
      image: "/images/desk.jpg.png",
      timeframe: "4-6 working days"
    },
    {
      id: 3,
      name: "Security Door",
      price: "MWK 280,000",
      image: "/images/door.jpg.png",
      timeframe: "7-12 working days"
    },
    {
      id: 4,
      name: "Sliding Gate",
      price: "MWK 850,000",
      image: "/images/gate1.jpg.png",
      timeframe: "10-14 working days"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        backgroundColor: '#1e3a8a',
        color: 'white',
        padding: '50px 20px',
        borderRadius: '12px',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(28px, 6vw, 42px)', 
          marginBottom: '15px', 
          color: 'white',
          fontWeight: '700'
        }}>
          Supa Steel Structures
        </h1>
        <h2 style={{ fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: '400', marginBottom: '20px', color: '#e0e7ff' }}>
          Engineering Your Ideas To Reality
        </h2>
        <p style={{ fontSize: '16px', maxWidth: '700px', margin: '0 auto 30px', color: '#f1f5f9', lineHeight: '1.6' }}>
          We design and fabricate high-quality steel products. 
          Get AutoCAD drawings of your project before fabrication and welding begins.
        </p>
        <a href="/products" style={{
          backgroundColor: 'white',
          color: '#1e3a8a',
          padding: '14px 28px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
          display: 'inline-block'
        }}>
          View All Products
        </a>
      </div>

      {/* Featured Products */}
      <h2 style={{ marginBottom: '20px', color: '#1e3a8a', fontSize: '24px' }}>Featured Products</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '20px',
        marginBottom: '50px'
      }}>
        {featuredProducts.map(product => (
          <div key={product.id} style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            backgroundColor: 'white'
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '16px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '17px' }}>{product.name}</h3>
              <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#1e3a8a' }}>
                {product.price}
              </p>
              <p style={{ color: '#666', margin: '0 0 12px 0', fontSize: '14px' }}>
                {product.timeframe}
              </p>
              <button
                onClick={() => {
                  const phoneNumber = '265881826167';
                  const message = `Hello Supa Steel Structures,\n\nI am interested in: *${product.name}*\nPrice: ${product.price}\n\nPlease give me more details.`;
                  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
                }}
                style={{
                  backgroundColor: '#25D366',
                  color: 'white',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Request Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <h2 style={{ marginBottom: '20px', color: '#1e3a8a', fontSize: '24px' }}>Why Choose Supa Steel Structures?</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        <div style={featureBox}>
          <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>AutoCAD Drawings</h3>
          <p style={{ margin: 0, lineHeight: '1.5' }}>Visualize your project with professional drawings before we start fabrication.</p>
        </div>
        <div style={featureBox}>
          <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>Quality Work</h3>
          <p style={{ margin: 0, lineHeight: '1.5' }}>Strong and durable steel products for homes, schools and businesses.</p>
        </div>
        <div style={featureBox}>
          <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>Clear Timeframes</h3>
          <p style={{ margin: 0, lineHeight: '1.5' }}>We tell you exactly how long it will take to complete your order.</p>
        </div>
      </div>
    </div>
  );
}

const featureBox = {
  backgroundColor: '#eff6ff',
  padding: '24px',
  borderRadius: '10px',
  border: '1px solid #bfdbfe'
};

export default Home;
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
        padding: '70px 40px',
        borderRadius: '12px',
        textAlign: 'center',
        marginBottom: '50px'
      }}>
        <h1 style={{ 
          fontSize: '42px', 
          marginBottom: '15px', 
          color: 'white',
          fontWeight: '700'
        }}>
          Supa Steel Structures
        </h1>
        <h2 style={{ fontSize: '22px', fontWeight: '400', marginBottom: '20px', color: '#e0e7ff' }}>
          Engineering Your Ideas To Reality
        </h2>
        <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto 30px', color: '#f1f5f9' }}>
          We design and fabricate high-quality steel products. 
          Get AutoCAD drawings of your project before fabrication and welding begins.
        </p>
        <a href="/products" style={{
          backgroundColor: 'white',
          color: '#1e3a8a',
          padding: '14px 32px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          View All Products
        </a>
      </div>

      {/* Featured Products */}
      <h2 style={{ marginBottom: '25px', color: '#1e3a8a' }}>Featured Products</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '25px',
        marginBottom: '60px'
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
            <div style={{ padding: '18px' }}>
              <h3 style={{ margin: '0 0 8px 0' }}>{product.name}</h3>
              <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#1e3a8a' }}>
                {product.price}
              </p>
              <p style={{ color: '#666', margin: '0 0 12px 0', fontSize: '14px' }}>
                {product.timeframe}
              </p>
              <button style={{
                backgroundColor: '#1e3a8a',
                color: 'white',
                border: 'none',
                padding: '9px 16px',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Request Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <h2 style={{ marginBottom: '25px', color: '#1e3a8a' }}>Why Choose Supa Steel Structures?</h2>
      <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
        <div style={featureBox}>
          <h3 style={{ color: '#1e3a8a' }}>AutoCAD Drawings</h3>
          <p>Visualize your project with professional drawings before we start fabrication.</p>
        </div>
        <div style={featureBox}>
          <h3 style={{ color: '#1e3a8a' }}>Quality Work</h3>
          <p>Strong and durable steel products for homes, schools and businesses.</p>
        </div>
        <div style={featureBox}>
          <h3 style={{ color: '#1e3a8a' }}>Clear Timeframes</h3>
          <p>We tell you exactly how long it will take to complete your order.</p>
        </div>
      </div>
    </div>
  );
}

const featureBox = {
  flex: '1',
  minWidth: '240px',
  backgroundColor: '#eff6ff',
  padding: '28px',
  borderRadius: '10px',
  border: '1px solid #bfdbfe'
};

export default Home;
import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleRequestQuote = (product) => {
    const phoneNumber = '265881826167';
    const message = `Hello Supa Steel Structures,\n\nI am interested in this product:\n\n*${product.name}*\nPrice: MWK ${product.price?.toLocaleString()}\nTimeframe: ${product.timeframe}\n\nPlease give me more details.`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: '8px', color: '#1e3a8a', fontSize: 'clamp(24px, 5vw, 32px)' }}>
        Our Products
      </h1>
      <p style={{ marginBottom: '30px', color: '#555', fontSize: '15px' }}>
        All products can be customized. We provide AutoCAD drawings before fabrication.
      </p>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {products.map(product => (
            <div key={product._id} style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {product.images && product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '220px',
                  backgroundColor: '#e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6b7280'
                }}>
                  No Image
                </div>
              )}
              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{product.name}</h3>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
                  MWK {product.price?.toLocaleString()}
                </p>
                <p style={{ color: '#666', margin: '0 0 18px 0', fontSize: '14px' }}>
                  Timeframe: {product.timeframe}
                </p>
                <button
                  onClick={() => handleRequestQuote(product)}
                  style={{
                    backgroundColor: '#25D366',
                    color: 'white',
                    border: 'none',
                    padding: '12px 18px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    width: '100%',
                    marginTop: 'auto',
                    fontSize: '15px'
                  }}
                >
                  Request Quote on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
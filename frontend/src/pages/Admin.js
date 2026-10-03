import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api';

function Admin() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'Desk',
    description: '',
    price: '',
    timeframe: ''
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      // Not logged in
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    if (parsedUser.role !== 'admin') {
      // Logged in but not admin
      return;
    }

    // Load products only for admin
    loadProducts();
  }, [navigate]);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(product => product._id !== id));
        alert('Product deleted successfully');
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      alert('Error deleting product');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Please select an image');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('timeframe', formData.timeframe);
    data.append('images', imageFile);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const savedProduct = await response.json();
        setProducts([...products, savedProduct]);
        alert('Product added successfully!');
        setFormData({
          name: '',
          category: 'Desk',
          description: '',
          price: '',
          timeframe: ''
        });
        setImageFile(null);
        e.target.reset();
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      alert('Error adding product');
    }
  };

  // Not logged in (should already redirect, but safety)
  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  // Logged in but not admin
  if (user.role !== 'admin') {
    return (
      <div style={{ textAlign: 'center', marginTop: '80px' }}>
        <h1 style={{ color: '#dc2626' }}>Access Denied</h1>
        <p>You do not have permission to access the Admin Dashboard.</p>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '20px',
            backgroundColor: '#1e3a8a',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  // ADMIN DASHBOARD
  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#1e3a8a' }}>Admin Panel</h1>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <p>Welcome, {user.name} (Admin)</p>

      {/* ADD PRODUCT FORM */}
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '25px',
        borderRadius: '10px',
        marginTop: '30px',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ marginTop: 0, color: '#1e3a8a' }}>Add New Product</h2>

        <form onSubmit={handleAddProduct}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
              <option value="Desk">Desk</option>
              <option value="Gate">Gate</option>
              <option value="Door">Door</option>
              <option value="Table">Table</option>
              <option value="Bed">Bed</option>
              <option value="Trolley">Trolley</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="3" style={{ ...inputStyle, marginBottom: '15px' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input type="number" name="price" placeholder="Price (e.g. 220000)" value={formData.price} onChange={handleChange} required style={inputStyle} />
            <input type="text" name="timeframe" placeholder="Timeframe (e.g. 7-10 working days)" value={formData.timeframe} onChange={handleChange} required style={inputStyle} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} required style={{ width: '100%' }} />
          </div>

          <button type="submit" style={{
            backgroundColor: '#1e3a8a',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Add Product
          </button>
        </form>
      </div>

      {/* PRODUCT LIST */}
      <h2 style={{ marginTop: '50px' }}>All Products ({products.length})</h2>

      <div style={{ marginTop: '20px' }}>
        {products.map(product => (
          <div key={product._id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {product.images && product.images[0] ? (
                <img src={product.images[0]} alt={product.name} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
              ) : (
                <div style={{ width: '80px', height: '60px', backgroundColor: '#e5e7eb', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#6b7280' }}>
                  No Image
                </div>
              )}
              <div>
                <strong>{product.name}</strong> — MWK {product.price?.toLocaleString()}
                <br />
                <small>{product.timeframe}</small>
              </div>
            </div>

            <button onClick={() => handleDelete(product._id)} style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '15px'
};

export default Admin;
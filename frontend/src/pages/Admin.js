import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api';

const API = 'http://localhost:10000/api';

function Admin() {
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('requests'); // requests | announcements | products | add
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Desk',
    description: '',
    price: '',
    timeframe: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [announcementForm, setAnnouncementForm] = useState({ title: '', message: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    if (parsedUser.role !== 'admin') return;

    loadProducts();
    loadOrders();
    loadAnnouncements();
  }, [navigate]);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const loadOrders = async () => {
    try {
      const response = await fetch(`${API}/orders`);
      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load orders');
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadAnnouncements = async () => {
    try {
      const response = await fetch(`${API}/announcements`);
      const data = await response.json();
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load announcements');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const resetForm = () => {
    setFormData({ name: '', category: 'Desk', description: '', price: '', timeframe: '' });
    setImageFile(null);
    setEditingId(null);
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || '',
      category: product.category || 'Desk',
      description: product.description || '',
      price: product.price || '',
      timeframe: product.timeframe || ''
    });
    setImageFile(null);
    setSection('add');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const response = await fetch(`${API}/products/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setProducts(products.filter((p) => p._id !== id));
        alert('Product deleted');
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      alert('Error deleting product');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API}/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setOrders(orders.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)));
      }
    } catch (error) {
      alert('Error updating status');
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setImageFile(e.target.files[0]);
  const handleAnnouncementChange = (e) =>
    setAnnouncementForm({ ...announcementForm, [e.target.name]: e.target.value });

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    if (editingId) {
      try {
        if (imageFile) {
          const data = new FormData();
          data.append('name', formData.name);
          data.append('category', formData.category);
          data.append('description', formData.description);
          data.append('price', formData.price);
          data.append('timeframe', formData.timeframe);
          data.append('images', imageFile);
          const response = await fetch(`${API}/products/${editingId}`, { method: 'PUT', body: data });
          if (response.ok) {
            const updated = await response.json();
            setProducts(products.map((p) => (p._id === editingId ? updated : p)));
            alert('Product updated');
            resetForm();
            setSection('products');
          } else alert('Failed to update');
        } else {
          const response = await fetch(`${API}/products/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              category: formData.category,
              description: formData.description,
              price: Number(formData.price),
              timeframe: formData.timeframe
            })
          });
          if (response.ok) {
            const updated = await response.json();
            setProducts(products.map((p) => (p._id === editingId ? updated : p)));
            alert('Product updated');
            resetForm();
            setSection('products');
          } else alert('Failed to update');
        }
      } catch (error) {
        alert('Error updating product');
      }
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('timeframe', formData.timeframe);
    if (imageFile) data.append('images', imageFile);

    try {
      const response = await fetch(`${API}/products`, { method: 'POST', body: data });
      if (response.ok) {
        const saved = await response.json();
        setProducts([...products, saved]);
        alert('Product added');
        resetForm();
        e.target.reset();
        setSection('products');
      } else alert('Failed to add product');
    } catch (error) {
      alert('Error adding product');
    }
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: announcementForm.title,
          message: announcementForm.message,
          isActive: true
        })
      });
      if (response.ok) {
        const saved = await response.json();
        setAnnouncements([saved, ...announcements]);
        setAnnouncementForm({ title: '', message: '' });
        alert('Announcement added');
      } else alert('Failed to add announcement');
    } catch (error) {
      alert('Error adding announcement');
    }
  };

  const handleToggleAnnouncement = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API}/announcements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (response.ok) {
        const updated = await response.json();
        setAnnouncements(announcements.map((a) => (a._id === id ? updated : a)));
      }
    } catch (error) {
      alert('Error updating announcement');
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      const response = await fetch(`${API}/announcements/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setAnnouncements(announcements.filter((a) => a._id !== id));
      }
    } catch (error) {
      alert('Error deleting announcement');
    }
  };

  if (!user) return <p>Redirecting...</p>;

  if (user.role !== 'admin') {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <h1 style={{ color: '#dc2626' }}>Access Denied</h1>
        <button onClick={() => navigate('/')} style={primaryBtn}>Go Home</button>
      </div>
    );
  }

  const menuItem = (id, label) => (
    <button
      onClick={() => setSection(id)}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '12px 14px',
        border: 'none',
        borderRadius: '8px',
        marginBottom: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        backgroundColor: section === id ? '#1e3a8a' : '#eef2ff',
        color: section === id ? 'white' : '#1e3a8a'
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {/* LEFT PANEL */}
      <div style={{
        width: '240px',
        minWidth: '220px',
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '16px',
        height: 'fit-content'
      }}>
        <h2 style={{ marginTop: 0, color: '#1e3a8a', fontSize: '18px' }}>Admin Menu</h2>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>Hi, {user.name}</p>

        {menuItem('requests', `Customer Requests (${orders.length})`)}
        {menuItem('announcements', `Announcements (${announcements.length})`)}
        {menuItem('add', editingId ? 'Edit Product' : 'Add Product')}
        {menuItem('products', `All Products (${products.length})`)}

        <button onClick={handleLogout} style={{ ...primaryBtn, backgroundColor: '#6b7280', marginTop: '20px' }}>
          Logout
        </button>
      </div>

      {/* RIGHT CONTENT */}
      <div style={{ flex: 1, minWidth: '280px' }}>

        {/* REQUESTS */}
        {section === 'requests' && (
          <div>
            <h2 style={{ color: '#1e3a8a' }}>Customer Requests</h2>
            {loadingOrders ? (
              <p>Loading...</p>
            ) : orders.length === 0 ? (
              <p>No requests yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} style={cardStyle}>
                  <strong>{order.productName || 'Custom Request'}</strong>
                  <p style={smallText}>Customer: {order.customerName}</p>
                  <p style={smallText}>Phone: {order.customerPhone}</p>
                  <p style={smallText}>Email: {order.customerEmail}</p>
                  <p style={{ whiteSpace: 'pre-line', fontSize: '14px' }}>{order.specialRequests}</p>

                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    style={{ ...inputStyle, marginBottom: '10px' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Ready for Collection">Ready for Collection</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <button
                    onClick={() => {
                      const phone = order.customerPhone.replace(/\s+/g, '').replace(/^0/, '265');
                      const text = `Hello ${order.customerName}, this is Supa Steel Structures.\n\nRegarding: ${order.productName || 'your request'}\n\n`;
                      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    style={{ ...primaryBtn, backgroundColor: '#25D366' }}
                  >
                    Message on WhatsApp
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* ANNOUNCEMENTS */}
        {section === 'announcements' && (
          <div>
            <h2 style={{ color: '#1e3a8a' }}>Announcements / Offers</h2>
            <p style={{ color: '#666' }}>Add offers here. Hide or delete when the offer ends.</p>

            <form onSubmit={handleAddAnnouncement} style={{ ...cardStyle, backgroundColor: '#fffbeb' }}>
              <input
                type="text"
                name="title"
                placeholder="Title (e.g. 20% Discount on First Service)"
                value={announcementForm.title}
                onChange={handleAnnouncementChange}
                required
                style={{ ...inputStyle, marginBottom: '10px' }}
              />
              <textarea
                name="message"
                placeholder="Message details..."
                value={announcementForm.message}
                onChange={handleAnnouncementChange}
                required
                rows="4"
                style={{ ...inputStyle, marginBottom: '10px' }}
              />
              <button type="submit" style={{ ...primaryBtn, backgroundColor: '#f59e0b' }}>
                Add Announcement
              </button>
            </form>

            {announcements.map((item) => (
              <div key={item._id} style={cardStyle}>
                <strong>{item.title}</strong>
                <p style={{ whiteSpace: 'pre-line', fontSize: '14px' }}>{item.message}</p>
                <p style={{ fontSize: '13px', color: item.isActive ? '#166534' : '#991b1b' }}>
                  {item.isActive ? 'Active on Home page' : 'Hidden'}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleToggleAnnouncement(item._id, item.isActive)}
                    style={{ ...primaryBtn, backgroundColor: item.isActive ? '#6b7280' : '#16a34a', flex: 1 }}
                  >
                    {item.isActive ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => handleDeleteAnnouncement(item._id)}
                    style={{ ...primaryBtn, backgroundColor: '#dc2626', flex: 1 }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ADD / EDIT PRODUCT */}
        {section === 'add' && (
          <div>
            <h2 style={{ color: '#1e3a8a' }}>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmitProduct} style={cardStyle}>
              <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required style={{ ...inputStyle, marginBottom: '10px' }} />
              <select name="category" value={formData.category} onChange={handleChange} style={{ ...inputStyle, marginBottom: '10px' }}>
                <option value="Desk">Desk</option>
                <option value="Gate">Gate</option>
                <option value="Door">Door</option>
                <option value="Table">Table</option>
                <option value="Bed">Bed</option>
                <option value="Trolley">Trolley</option>
                <option value="Other">Other</option>
              </select>
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="3" style={{ ...inputStyle, marginBottom: '10px' }} />
              <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required style={{ ...inputStyle, marginBottom: '10px' }} />
              <input name="timeframe" placeholder="Timeframe" value={formData.timeframe} onChange={handleChange} required style={{ ...inputStyle, marginBottom: '10px' }} />
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
                {editingId ? 'New Image (optional)' : 'Product Image'}
              </label>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '100%', marginBottom: '14px' }} />
              <button type="submit" style={primaryBtn}>{editingId ? 'Update Product' : 'Add Product'}</button>
              {editingId && (
                <button type="button" onClick={() => { resetForm(); setSection('products'); }} style={{ ...primaryBtn, backgroundColor: '#6b7280', marginTop: '10px' }}>
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        )}

        {/* ALL PRODUCTS */}
        {section === 'products' && (
          <div>
            <h2 style={{ color: '#1e3a8a' }}>All Products</h2>
            {products.map((product) => (
              <div key={product._id} style={cardStyle}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                  {product.images && product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} style={{ width: '70px', height: '55px', objectFit: 'cover', borderRadius: '6px' }} />
                  ) : (
                    <div style={{ width: '70px', height: '55px', backgroundColor: '#e5e7eb', borderRadius: '6px' }} />
                  )}
                  <div>
                    <strong>{product.name}</strong>
                    <p style={{ margin: '4px 0', color: '#1e3a8a', fontWeight: 'bold' }}>
                      MWK {product.price?.toLocaleString()}
                    </p>
                    <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>{product.timeframe}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEditClick(product)} style={{ ...primaryBtn, backgroundColor: '#2563eb', flex: 1 }}>Edit</button>
                  <button onClick={() => handleDelete(product._id)} style={{ ...primaryBtn, backgroundColor: '#dc2626', flex: 1 }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '16px',
  boxSizing: 'border-box'
};

const primaryBtn = {
  width: '100%',
  backgroundColor: '#1e3a8a',
  color: 'white',
  border: 'none',
  padding: '12px',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '16px',
  marginBottom: '12px',
  backgroundColor: 'white'
};

const smallText = {
  margin: '4px 0',
  color: '#555',
  fontSize: '14px'
};

export default Admin;
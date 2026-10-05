import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [productName, setProductName] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    if (parsedUser.role === 'admin') {
      navigate('/admin');
      return;
    }

    fetchOrders(parsedUser.email);
  }, [navigate]);

  const fetchOrders = async (email) => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      const data = await response.json();
      const myOrders = data.filter(order => order.customerEmail === email);
      setOrders(myOrders);
    } catch (err) {
      console.error('Failed to load orders');
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: user.name,
          customerPhone: phone,
          customerEmail: user.email,
          productName: productName,
          specialRequests: message,
          quantity: 1,
        }),
      });

      if (response.ok) {
        const newOrder = await response.json();
        setOrders([newOrder, ...orders]);
        setSuccess('Your request has been submitted successfully! We will contact you soon.');
        setProductName('');
        setMessage('');
        setPhone('');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to submit request');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 style={{ color: '#1e3a8a', fontSize: 'clamp(24px, 5vw, 32px)' }}>My Dashboard</h1>
      <p style={{ marginBottom: '25px' }}>
        Welcome, <strong>{user.name}</strong>!
      </p>

      {/* Quote Request Form */}
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '35px'
      }}>
        <h2 style={{ marginTop: 0, color: '#1e3a8a', fontSize: '20px' }}>Request a Quote</h2>
        <p style={{ color: '#555', marginBottom: '20px', fontSize: '15px' }}>
          Prefer not to use WhatsApp? Fill this form and we will contact you.
        </p>

        {success && (
          <div style={{
            backgroundColor: '#dcfce7',
            color: '#166534',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            {success}
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
              Product you are interested in
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              placeholder="e.g. Steel Bed Frame, Security Door..."
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
              Your Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="e.g. 0881 826 167"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
              Message / Special Requirements
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
              placeholder="Tell us the size, colour, quantity or any special request..."
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#1e3a8a',
              color: 'white',
              border: 'none',
              padding: '13px 20px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px',
              width: '100%'
            }}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>

      {/* Previous Requests */}
      <div>
        <h2 style={{ color: '#1e3a8a', fontSize: '20px' }}>My Previous Requests</h2>

        {loadingOrders ? (
          <p>Loading your requests...</p>
        ) : orders.length === 0 ? (
          <p style={{ color: '#666' }}>You have not submitted any requests yet.</p>
        ) : (
          <div style={{ marginTop: '15px' }}>
            {orders.map(order => (
              <div key={order._id} style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '12px',
                backgroundColor: 'white'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <strong style={{ fontSize: '16px' }}>
                    {order.productName || 'Custom Request'}
                  </strong>
                  <span style={{
                    backgroundColor: order.status === 'Pending' ? '#fef3c7' : '#dcfce7',
                    color: order.status === 'Pending' ? '#92400e' : '#166534',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {order.status}
                  </span>
                </div>
                <p style={{ color: '#555', margin: '6px 0', fontSize: '14px', lineHeight: '1.4' }}>
                  {order.specialRequests}
                </p>
                <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>
                  Submitted on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
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

export default Dashboard;
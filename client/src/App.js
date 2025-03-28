
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!email || !file) return alert("Please provide both!");

    const formData = new FormData();
    formData.append('image', file);
    formData.append('email', email);

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/upload', formData);
      alert('Check your email!');
    } catch (err) {
      alert('Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Ghibli-fy Yourself</h1>
      <input type="email" placeholder="Your Email" onChange={e => setEmail(e.target.value)} />
      <br /><br />
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
      <br /><br />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Sending...' : 'Submit'}
      </button>
    </div>
  );
}

export default App;

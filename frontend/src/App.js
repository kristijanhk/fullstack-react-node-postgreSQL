import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchUsers = () => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    }).then(() => {
      setName('');
      setEmail('');
      fetchUsers();
    });
  };

  const handleDelete = (id) => {
    fetch(`/api/users/${id}`, {
      method: 'DELETE',
    }).then(() => {
      fetchUsers(); // Освежи ја листата по бришењето
    }).catch((err) => console.error(err));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>KIII Проект: Full-Stack CRUD</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input placeholder="Име" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '8px', flex: '1' }} />
        <input placeholder="Емаил" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '8px', flex: '1' }} />
        <button type="submit" style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>Додади</button>
      </form>
      <h3>Внесени корисници во базата:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((u) => (
          <li key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
            <span>{u.name} — {u.email}</span>
            <button onClick={() => handleDelete(u.id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px' }}>
              Избриши
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
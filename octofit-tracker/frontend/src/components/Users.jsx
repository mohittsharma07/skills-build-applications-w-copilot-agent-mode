import { useEffect, useState } from 'react';
import { getApiUrl, getPayloadItems } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
          : 'http://localhost:8000/api/users/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Unable to fetch users');
        }

        const payload = await response.json();
        setUsers(getPayloadItems(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id ?? user.id ?? user.email} className="list-group-item">
            <strong>{user.name}</strong>
            <div>{user.email}</div>
            <small>{user.city || 'Unknown city'}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;

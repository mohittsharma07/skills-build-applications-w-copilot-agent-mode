import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Unable to fetch users');
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.items ?? payload.results ?? [];
        setUsers(items);
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

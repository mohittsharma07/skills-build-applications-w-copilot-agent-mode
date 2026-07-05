import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error('Unable to fetch leaderboard');
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.items ?? payload.results ?? [];
        setEntries(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li key={entry._id ?? entry.id ?? entry.userName} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <strong>{entry.userName}</strong>
              <div>Rank {entry.rank ?? '-'}</div>
            </div>
            <span className="badge text-bg-primary rounded-pill">{entry.score ?? 0}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;

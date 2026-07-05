import { useEffect, useState } from 'react';
import { getApiUrl, getPayloadItems } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
          : 'http://localhost:8000/api/activities/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Unable to fetch activities');
        }

        const payload = await response.json();
        setActivities(getPayloadItems(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id ?? activity.id ?? activity.type} className="list-group-item">
            <strong>{activity.type}</strong>
            <div>{activity.userName}</div>
            <small>{activity.durationMinutes} min</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;

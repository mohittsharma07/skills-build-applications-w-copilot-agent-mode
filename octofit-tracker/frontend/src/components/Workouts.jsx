import { useEffect, useState } from 'react';
import { getApiUrl, getPayloadItems } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Unable to fetch workouts');
        }

        const payload = await response.json();
        setWorkouts(getPayloadItems(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout._id ?? workout.id ?? workout.title} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">{workout.title}</h3>
                <p className="card-text">{workout.description}</p>
                <p className="mb-1"><strong>Focus:</strong> {workout.focus}</p>
                <p className="mb-0"><strong>Duration:</strong> {workout.durationMinutes} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workouts;

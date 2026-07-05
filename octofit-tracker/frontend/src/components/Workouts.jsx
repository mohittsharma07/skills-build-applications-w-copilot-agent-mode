import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) {
          throw new Error('Unable to fetch workouts');
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.items ?? payload.results ?? [];
        setWorkouts(items);
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

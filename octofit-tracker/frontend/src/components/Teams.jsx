import { useEffect, useState } from 'react';
import { getApiUrl, getPayloadItems } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(getApiUrl('teams'));
        if (!response.ok) {
          throw new Error('Unable to fetch teams');
        }

        const payload = await response.json();
        setTeams(getPayloadItems(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team._id ?? team.id ?? team.name} className="list-group-item">
            <strong>{team.name}</strong>
            <div>{team.sport}</div>
            <small>{team.location}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;

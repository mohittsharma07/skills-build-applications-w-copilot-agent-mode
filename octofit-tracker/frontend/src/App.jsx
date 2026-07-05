import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>Track every workout, team win, and personal milestone.</h1>
        <p className="lead">
          A modern multi-tier fitness platform for athletes, squads, and coaches.
        </p>
        <nav className="nav nav-pills flex-wrap gap-2 mt-4">
          <NavLink className="nav-link" to="/users">Users</NavLink>
          <NavLink className="nav-link" to="/teams">Teams</NavLink>
          <NavLink className="nav-link" to="/activities">Activities</NavLink>
          <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
          <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
        </nav>
      </section>

      <section className="content-card">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </section>

      <section className="info-card">
        <p className="mb-0">
          Configure <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> for Codespaces deployments.
          The app uses the pattern <strong>https://{import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/</strong>
          and falls back to <strong>http://localhost:8000</strong> when it is unset.
        </p>
      </section>
    </main>
  );
}

export default App;

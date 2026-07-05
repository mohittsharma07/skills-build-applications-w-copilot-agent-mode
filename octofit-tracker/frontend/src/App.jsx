import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>Track every workout, team win, and personal milestone.</h1>
        <p className="lead">
          A modern multi-tier fitness platform for athletes, squads, and coaches.
        </p>
        <div className="d-flex gap-3 flex-wrap">
          <a className="btn btn-primary btn-lg" href="#features">
            Explore features
          </a>
          <a className="btn btn-outline-secondary btn-lg" href="#api">
            View API health
          </a>
        </div>
      </section>

      <section id="features" className="feature-grid">
        <article className="feature-card">
          <h2>Activity tracking</h2>
          <p>Log workouts and compare performance over time.</p>
        </article>
        <article className="feature-card">
          <h2>Team leaderboards</h2>
          <p>Motivate groups with friendly competition and progress snapshots.</p>
        </article>
        <article className="feature-card">
          <h2>Personalized coaching</h2>
          <p>Receive recommendations that adapt to your routine and goals.</p>
        </article>
      </section>
    </main>
  )
}

export default App

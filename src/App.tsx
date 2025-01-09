import './App.css'

function App() {
  return (
    <div className="minimal-container">
      <header className="minimal-header">
        <h1>Simple Landing</h1>
      </header>
      
      <main className="minimal-main">
        <section className="hero-section">
          <h2>Welcome to Our Simple Page</h2>
          <p>This is a clean and minimal landing page example.</p>
          <button 
            className="minimal-cta"
            onClick={() => alert('Welcome!')}
          >
            Get Started
          </button>
        </section>
      </main>

      <footer className="minimal-footer">
        <p>&copy; {new Date().getFullYear()} Simple Page</p>
      </footer>
    </div>
  )
}

export default App

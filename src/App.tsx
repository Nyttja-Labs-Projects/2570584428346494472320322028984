import './App.css'

function App() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="minimal-container">
      <nav className="minimal-nav">
        <div className="nav-content">
          <h1 className="nav-logo">SimpleLand</h1>
          <ul className="nav-links">
            <li><button onClick={() => scrollToSection('hero')}>Home</button></li>
            <li><button onClick={() => scrollToSection('features')}>Features</button></li>
            <li><button onClick={() => scrollToSection('about')}>About</button></li>
          </ul>
        </div>
      </nav>

      <main className="minimal-main">
        <section id="hero" className="hero-section">
          <div className="hero-content">
            <h2>Welcome to SimpleLand</h2>
            <p>Your gateway to simplicity and efficiency</p>
            <div className="cta-buttons">
              <button 
                className="minimal-cta primary"
                onClick={() => alert('Welcome!')}
              >
                Get Started
              </button>
              <button 
                className="minimal-cta secondary"
                onClick={() => scrollToSection('features')}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Simplicity</h3>
              <p>Clean and intuitive design for easy navigation</p>
            </div>
            <div className="feature-card">
              <h3>Efficiency</h3>
              <p>Optimized for fast performance and quick results</p>
            </div>
            <div className="feature-card">
              <h3>Reliability</h3>
              <p>Stable and secure platform you can trust</p>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <h2>About Us</h2>
          <p>We're dedicated to creating simple, effective solutions that make life easier. Our team of experts works tirelessly to deliver the best experience possible.</p>
        </section>
      </main>

      <footer className="minimal-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} SimpleLand. All rights reserved.</p>
          <nav className="footer-nav">
            <a href="#hero">Home</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App

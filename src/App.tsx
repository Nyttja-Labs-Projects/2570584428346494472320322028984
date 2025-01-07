import './App.css'

function App() {
  return (
    <div className="minimal-container">
      <header className="minimal-header">
        <h1>Simple Landing</h1>
      </header>
      
      <main className="minimal-main">
        <section className="hero-section">
          <h2>Welcome to Simple Solutions</h2>
          <p>We provide modern, efficient tools for your business needs.</p>
          <button 
            className="minimal-cta"
            onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
          >
            Explore Features
          </button>
        </section>

        <section id="features">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast Performance</h3>
              <p>Our solutions are optimized for speed and efficiency.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Systems</h3>
              <p>We prioritize your data security and privacy.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Innovative Features</h3>
              <p>Stay ahead with our cutting-edge technology.</p>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Simple Solutions transformed our workflow. Highly recommended!"
              </p>
              <p className="testimonial-author">- Sarah Johnson, CEO</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "The speed and reliability are unmatched. Great service!"
              </p>
              <p className="testimonial-author">- Michael Smith, CTO</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Innovative features that actually make a difference."
              </p>
              <p className="testimonial-author">- Emily Davis, Product Manager</p>
            </div>
          </div>
        </section>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Fast Performance</h3>
            <p>Our solutions are optimized for speed and efficiency.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Systems</h3>
            <p>We prioritize your data security and privacy.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Innovative Features</h3>
            <p>Stay ahead with our cutting-edge technology.</p>
          </div>
        </div>
      </main>

      <footer className="minimal-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Simple Solutions</p>
          <nav className="footer-nav">
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </nav>
          <p className="footer-credits">Built with ❤️ by Simple Team</p>
        </div>
      </footer>
    </div>
  )
}

export default App

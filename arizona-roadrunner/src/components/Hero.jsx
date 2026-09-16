import "./Hero.css";

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />
        <div className="hero-grid" />
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            Handmade in the Southwest
            <span className="hero-eyebrow-line" />
          </p>

          <h1 id="hero-title" className="hero-title">
            <span>Unique things.</span>
            <span>Made by hand.</span>
            <span className="hero-title-accent">
              Made to be loved.
            </span>
          </h1>

          <p className="hero-description">
            Discover one-of-a-kind creations, handcrafted treasures,
            and weirdly wonderful things you won't find anywhere else.
          </p>

          <div className="hero-actions">
            <a
              className="button hero-primary-button"
              href="#shop"
            >
              Explore the Collection
              <span aria-hidden="true">→</span>
            </a>

            <a
              className="button button--secondary hero-secondary-button"
              href="#about"
            >
              Our Story
            </a>
          </div>

          <div className="hero-stats" aria-label="Store highlights">
            <div className="hero-stat">
              <strong>100+</strong>
              <span>Unique Pieces</span>
            </div>

            <div className="hero-stat-divider" />

            <div className="hero-stat">
              <strong>100%</strong>
              <span>Handmade</span>
            </div>

            <div className="hero-stat-divider" />

            <div className="hero-stat">
              <strong>∞</strong>
              <span>Creativity</span>
            </div>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-art-glow" />

          <div className="hero-sun">
            <span />
          </div>

          <div className="hero-mountain hero-mountain--back" />
          <div className="hero-mountain hero-mountain--middle" />
          <div className="hero-mountain hero-mountain--front" />

          <div className="hero-cactus hero-cactus--one">
            <span className="cactus-arm cactus-arm--left" />
            <span className="cactus-arm cactus-arm--right" />
          </div>

          <div className="hero-cactus hero-cactus--two">
            <span className="cactus-arm cactus-arm--left" />
          </div>

          <div className="hero-road" />

          <div className="hero-roadrunner">
            <span className="roadrunner-head" />
            <span className="roadrunner-body" />
            <span className="roadrunner-tail" />
            <span className="roadrunner-leg roadrunner-leg--one" />
            <span className="roadrunner-leg roadrunner-leg--two" />
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span>Scroll to explore</span>
        <span className="hero-scroll-arrow">↓</span>
      </div>
    </section>
  );
}

export default Hero;
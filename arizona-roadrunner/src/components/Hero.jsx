import "./Hero.css";
export default function Hero({ page = "shop" }) {
  if (page !== "shop")
    return (
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">
            Arizona Roadrunner /{" "}
            {page === "about" ? "Our story" : "Get in touch"}
          </span>
          <h1>
            {page === "about" ? (
              <>
                Made with
                <br />
                <em>heart & character.</em>
              </>
            ) : (
              <>
                Let’s talk.
                <br />
                <em>We’d love to hear from you.</em>
              </>
            )}
          </h1>
          <p>
            {page === "about"
              ? "A little piece of the Southwest, made by hand and meant to be enjoyed for years to come."
              : "Have a question about an item, want to place a custom request, or just want to say hello? Send us a message."}
          </p>
          <span className="page-hero__star" aria-hidden="true">
            ✦
          </span>
        </div>
      </section>
    );
  return (
    <section className="hero">
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">Arizona Roadrunner</span>
          <h1>
            Made by hand.
            <br />
            <span>
              Made to
              <br />
              be found.
            </span>
          </h1>
          <p>
            Discover unique handmade treasures, Southwest-inspired creations,
            and
            <br className="desktop-break" /> one-of-a-kind pieces crafted with
            character.
          </p>
        </div>
        <div className="hero__orbits" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <span>✦</span>
        </div>
      </div>
    </section>
  );
}

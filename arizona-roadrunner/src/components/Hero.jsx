import Icon from "./Icon";
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
                <em>Something special starts here.</em>
              </>
            )}
          </h1>
          <p>
            {page === "about"
              ? "A little piece of the Southwest, made by hand and meant to be enjoyed for years to come."
              : "A question, a custom request, or just a hello. We’d love to hear from you."}
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
          <span className="eyebrow">
            Independent spirit. Extraordinary finds.
          </span>
          <h1>
            Made by hand.
            <br />
            Made to be
            <br />
            <em>found.</em>
          </h1>
          <p>
            Objects with a story. Gifts with a little soul.
            <br />
            Discover handmade treasures inspired by the Southwest.
          </p>
          <a href="#collection" className="button button--light">
            Find your next favorite <Icon name="arrow" />
          </a>
          <div className="hero__foot">
            <span>✦</span> A little different. Completely you.
          </div>
        </div>
        <div className="hero__art">
          <div className="hero__orbit" />
          <figure className="hero__photo hero__photo--main">
            <img
              src={`${import.meta.env.BASE_URL}images/pottery.webp`}
              alt="Blue ceramic plates and bowls on wooden shelves"
              fetchPriority="high"
            />
            <figcaption>
              <span>The art of everyday.</span>
              <span>01 / POTTERY</span>
            </figcaption>
          </figure>
          <figure className="hero__photo hero__photo--small">
            <img
              src={`${import.meta.env.BASE_URL}images/photo-1515562141207-7a88fb7ce338.webp`}
              alt="Delicate necklaces with individual character"
            />
            <figcaption>Small details. Big personality.</figcaption>
          </figure>
          <div className="hero__seal">
            CURATED WITH CARE<span>✦</span>FOUND WITH LOVE
          </div>
        </div>
      </div>
      <div className="hero__bottom wrap">
        <span>THE ARIZONA ROADRUNNER COLLECTION</span>
        <a href="#collection">Take a look around ↓</a>
      </div>
    </section>
  );
}

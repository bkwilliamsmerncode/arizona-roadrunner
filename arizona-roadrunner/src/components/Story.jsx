import Icon from "./Icon";
export default function Story() {
  return (
    <>
      <section className="wrap story-section">
        <div>
          <span className="eyebrow">Our story</span>
          <h2>
            More than just
            <br />
            <em>something to sell.</em>
          </h2>
        </div>
        <div>
          <h3>
            We believe the things we surround ourselves with should have a
            story.
          </h3>
          <p>
            We love the character of handmade goods — the little imperfections,
            unexpected details, and personality that make each piece feel like
            it belongs somewhere special.
          </p>
          <p>
            Inspired by the colors, textures, landscapes, and spirit of the
            Southwest, Arizona Roadrunner brings together pieces chosen for
            their individuality and charm.
          </p>
          <p>
            Some are bold. Some are quirky. Some are wonderfully unexpected.
            Every piece has something that caught our eye.
          </p>
        </div>
      </section>
      <section className="story-photo wrap">
        <img
          src={`${import.meta.env.BASE_URL}images/photo-1500534623283-312aade485b7.webp`}
          alt="A landscape filled with natural colors and open space"
          loading="lazy"
        />
        <div>
          <span className="eyebrow">Rooted in the Southwest</span>
          <h2>
            A place.
            <br />A feeling.
            <br />
            <em>A little desert soul.</em>
          </h2>
        </div>
      </section>
      <section className="wrap values">
        {[
          [
            "01",
            "Character over ordinary",
            "Distinctive textures, thoughtful details, and pieces that feel personal.",
          ],
          [
            "02",
            "Room for the unexpected",
            "The best discoveries are often the ones you weren’t looking for.",
          ],
          [
            "03",
            "A more personal connection",
            "Have a question about a piece? Let’s talk about what makes it special.",
          ],
        ].map(([n, t, p]) => (
          <article key={n}>
            <span className="eyebrow">{n} / Our point of view</span>
            <h3>{t}</h3>
            <p>{p}</p>
          </article>
        ))}
      </section>
      <section className="story-cta">
        <h2>
          Find a piece of <em>your story.</em>
        </h2>
        <a href="#/shop" className="button">
          Explore the collection <Icon name="arrow" />
        </a>
      </section>
    </>
  );
}

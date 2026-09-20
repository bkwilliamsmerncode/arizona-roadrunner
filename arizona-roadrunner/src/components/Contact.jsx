import { useState } from "react";
import Icon from "./Icon";
export default function Contact() {
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState("");
  function prepare(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setDraft(
      `mailto:hello@arizonaroadrunner.com?subject=${encodeURIComponent(data.get("subject"))}&body=${encodeURIComponent("Name: " + data.get("name") + "\nEmail: " + data.get("email") + "\n\n" + data.get("message"))}`,
    );
    setReady(true);
  }
  return (
    <section className="wrap contact-section">
      <div>
        <span className="eyebrow">Get in touch</span>
        <h2>
          Questions, ideas,
          <br />
          <em>
            or something
            <br />
            special?
          </em>
        </h2>
        <p>
          Have a question about something in the shop or an idea you’d like to
          bring to life? We’d love to hear from you.
        </p>
        <div className="contact-detail">
          <span>EMAIL</span>
          <a href="mailto:hello@arizonaroadrunner.com">
            hello@arizonaroadrunner.com
          </a>
        </div>
        <div className="contact-detail">
          <span>OUR INSPIRATION</span>
          <strong>Arizona & the Southwest</strong>
        </div>
      </div>
      <form onSubmit={prepare} onChange={() => setReady(false)}>
        <div className="form-grid">
          <label>
            Your name
            <input
              name="name"
              required
              maxLength={100}
              autoComplete="name"
              placeholder="Your name"
            />
          </label>
          <label>
            Email address
            <input
              name="email"
              type="email"
              required
              maxLength={150}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label>
          What’s on your mind?
          <select name="subject" required defaultValue="">
            <option value="" disabled>
              Choose a topic
            </option>
            <option>A question about a piece</option>
            <option>A custom creation</option>
            <option>Ordering and delivery</option>
            <option>Something else</option>
          </select>
        </label>
        <label>
          Your message
          <textarea
            name="message"
            required
            rows={6}
            maxLength={3000}
            placeholder="Tell us a little about what you have in mind…"
          />
        </label>
        <button className="button" type="submit">
          Prepare your message <Icon name="arrow" />
        </button>
        <p className="form-note">
          This form prepares an email in your own email app. Nothing is sent
          until you send it there.
        </p>
        {ready && (
          <div className="form-confirmation" role="status">
            <strong>Your message is ready.</strong>
            <p>Open your email app, review the draft, and press Send.</p>
            <a className="text-link" href={draft}>
              Open email draft ↗
            </a>
          </div>
        )}
      </form>
    </section>
  );
}

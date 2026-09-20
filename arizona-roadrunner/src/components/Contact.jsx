import useContactForm from "../hooks/useContactForm";
import Icon from "./Icon";
import "./Contact.css";
export default function Contact() {
  const { formRef, formId, draft, state, edit, clear, submit } =
    useContactForm();
  const sending = state.status === "sending";
  return (
    <section className="wrap contact-section">
      <div className="contact-copy">
        <span className="eyebrow">A real conversation starts here</span>
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
          From finding the perfect gift to dreaming up a custom piece, we’d love
          to help you find something that feels like you.
        </p>
        <div className="contact-detail">
          <span className="contact-symbol">
            <Icon name="heart" />
          </span>
          <div>
            <span>THOUGHTFUL QUESTIONS WELCOME</span>
            <strong>Product details, gifting & custom requests</strong>
          </div>
        </div>
        <div className="contact-detail">
          <span className="contact-symbol">
            <Icon name="spark" />
          </span>
          <div>
            <span>A LITTLE DESERT SOUL</span>
            <strong>Inspired by Arizona & the Southwest</strong>
          </div>
        </div>
        <a className="text-link" href="mailto:hello@arizonaroadrunner.com">
          Prefer email? hello@arizonaroadrunner.com ↗
        </a>
      </div>
      <form
        ref={formRef}
        id={formId}
        onSubmit={submit}
        className="contact-form"
        aria-busy={sending}
      >
        <div className="contact-form__heading">
          <span className="eyebrow">Let’s make a connection</span>
          <h3>Send a little hello.</h3>
          <p>Tell us what you have in mind. We’ll reply by email.</p>
        </div>
        <fieldset disabled={sending}>
          <div className="form-grid">
            <label>
              Your name <span aria-hidden="true">*</span>
              <input
                name="from_name"
                value={draft.from_name}
                onChange={edit}
                required
                maxLength={100}
                autoComplete="name"
                placeholder="First and last name"
              />
            </label>
            <label>
              Email address <span aria-hidden="true">*</span>
              <input
                name="reply_to"
                type="email"
                value={draft.reply_to}
                onChange={edit}
                required
                maxLength={150}
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label>
            What can we help with? <span aria-hidden="true">*</span>
            <select
              name="subject"
              value={draft.subject}
              onChange={edit}
              required
            >
              <option value="" disabled>
                Choose a topic
              </option>
              <option>A question about a piece</option>
              <option>A custom creation</option>
              <option>Gifting something special</option>
              <option>Ordering and delivery</option>
              <option>Something else</option>
            </select>
          </label>
          <label>
            Your message <span aria-hidden="true">*</span>
            <textarea
              name="message"
              value={draft.message}
              onChange={edit}
              required
              rows={6}
              maxLength={3000}
              placeholder="An item you love, an idea you have, a question on your mind…"
            />
          </label>
          <div className="form-meta">
            <span>{draft.message.length} / 3,000</span>
            <button type="button" className="text-link" onClick={clear}>
              Clear draft
            </button>
          </div>
          <div className="honeypot" aria-hidden="true">
            <label>
              Leave this empty
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <input type="hidden" name="site_name" value="Arizona Roadrunner" />
          <button className="button contact-send" type="submit">
            {sending ? (
              <>
                <span className="spinner" /> Sending your message…
              </>
            ) : (
              <>
                Send message <Icon name="arrow" />
              </>
            )}
          </button>
        </fieldset>
        <p className="form-note">
          Your draft is saved in this browser until you send or clear it. Your
          email is used to reply to your inquiry.
        </p>
        {state.status === "sent" && (
          <div className="form-confirmation" role="status">
            <Icon name="check" />
            <div>
              <strong>Your hello is on its way.</strong>
              <p>
                Thanks for reaching out. We’ll reply to the email you provided.
              </p>
            </div>
          </div>
        )}
        {state.status === "error" && (
          <div className="form-error" role="alert">
            {state.error}
          </div>
        )}
      </form>
    </section>
  );
}

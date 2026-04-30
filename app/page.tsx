// @ts-nocheck
'use client';
import { useEffect, useRef, useState } from 'react';
import { siteData } from '@/lib/site-data';

const css = `
  :root {
    --mn-bg: #0D0D0D;
    --mn-surface: #161616;
    --mn-card: #1C1C1C;
    --mn-primary: #9C27B0;
    --mn-primary-light: #CE93D8;
    --mn-primary-dim: rgba(156,39,176,0.15);
    --mn-accent: #E040FB;
    --mn-text: #F5F5F0;
    --mn-muted: #888;
    --mn-border: rgba(156,39,176,0.2);
    --font-display: var(--font-playfair), 'Playfair Display', serif;
    --font-body: var(--font-dm), 'DM Sans', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--mn-bg); color: var(--mn-text); overflow-x: hidden; }

  /* NAV */
  .mn-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 68px;
    transition: background 0.3s;
  }
  .mn-nav.scrolled { background: rgba(13,13,13,0.96); backdrop-filter: blur(16px); border-bottom: 1px solid var(--mn-border); }
  .mn-logo { font-family: var(--font-display); font-size: 1.35rem; font-style: italic; color: var(--mn-text); text-decoration: none; letter-spacing: 0.02em; }
  .mn-logo span { color: var(--mn-primary-light); font-style: normal; }
  .mn-nav-links { display: flex; gap: 2rem; list-style: none; }
  .mn-nav-links a { font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mn-muted); text-decoration: none; transition: color 0.2s; }
  .mn-nav-links a:hover { color: var(--mn-primary-light); }
  .mn-nav-cta { background: transparent; color: var(--mn-primary-light); font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid var(--mn-primary); padding: 0.6rem 1.5rem; cursor: pointer; transition: background 0.2s, color 0.2s; }
  .mn-nav-cta:hover { background: var(--mn-primary); color: #fff; }

  /* HERO */
  .mn-hero { position: relative; height: 100vh; min-height: 620px; display: flex; align-items: flex-end; overflow: hidden; }
  .mn-hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .mn-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.5) 40%, rgba(13,13,13,0.15) 100%); }
  .mn-hero-content { position: relative; z-index: 2; padding: 4rem 2.5rem 6rem; max-width: 700px; }
  .mn-hero-eyebrow { font-size: 0.72rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--mn-primary-light); margin-bottom: 1.25rem; }
  .mn-hero-title { font-family: var(--font-display); font-size: clamp(3.5rem, 10vw, 7.5rem); font-weight: 700; line-height: 1; color: var(--mn-text); margin-bottom: 0.25rem; }
  .mn-hero-title-italic { font-family: var(--font-display); font-size: clamp(3rem, 9vw, 6.5rem); font-weight: 400; font-style: italic; line-height: 1; color: var(--mn-primary-light); margin-bottom: 1.5rem; }
  .mn-hero-sub { font-size: 1rem; font-weight: 300; color: rgba(245,245,240,0.7); line-height: 1.7; max-width: 460px; margin-bottom: 2.5rem; }
  .mn-hero-actions { display: flex; gap: 1.25rem; align-items: center; flex-wrap: wrap; }
  .mn-btn-primary { background: var(--mn-primary); color: #fff; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 1rem 2.5rem; border: none; cursor: pointer; transition: background 0.2s; }
  .mn-btn-primary:hover { background: var(--mn-accent); }
  .mn-btn-ghost { background: transparent; color: var(--mn-text); font-size: 0.78rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 1rem 2rem; border: 1px solid rgba(245,245,240,0.25); cursor: pointer; transition: border-color 0.2s; }
  .mn-btn-ghost:hover { border-color: var(--mn-primary-light); color: var(--mn-primary-light); }

  /* DISCIPLINES */
  .mn-section { padding: 5rem 2.5rem; max-width: 1280px; margin: 0 auto; }
  .mn-section-dark { background: var(--mn-surface); padding: 5rem 0; }
  .mn-section-dark-inner { max-width: 1280px; margin: 0 auto; padding: 0 2.5rem; }
  .mn-eyebrow { font-size: 0.68rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--mn-primary-light); margin-bottom: 0.75rem; }
  .mn-heading { font-family: var(--font-display); font-size: clamp(2.2rem, 6vw, 4rem); font-weight: 700; color: var(--mn-text); line-height: 1.1; margin-bottom: 0.5rem; }
  .mn-heading-italic { font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 400; font-style: italic; color: var(--mn-primary-light); line-height: 1; margin-bottom: 1rem; }
  .mn-body { font-size: 0.95rem; font-weight: 300; color: rgba(245,245,240,0.6); line-height: 1.75; max-width: 500px; }

  .mn-disciplines { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1px; margin-top: 3rem; background: var(--mn-border); border: 1px solid var(--mn-border); }
  .mn-discipline { background: var(--mn-card); padding: 2.5rem 2rem; transition: background 0.25s; }
  .mn-discipline:hover { background: #222; }
  .mn-disc-name { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--mn-text); margin-bottom: 0.25rem; }
  .mn-disc-meta { display: flex; gap: 1rem; margin-bottom: 1rem; }
  .mn-disc-tag { font-size: 0.68rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; }
  .mn-disc-tag.level { color: var(--mn-primary-light); }
  .mn-disc-tag.sessions { color: var(--mn-muted); }
  .mn-disc-desc { font-size: 0.88rem; font-weight: 300; color: rgba(245,245,240,0.55); line-height: 1.7; }

  /* PERFORMANCES */
  .mn-events { display: flex; flex-direction: column; gap: 1px; margin-top: 3rem; }
  .mn-event { display: grid; grid-template-columns: 1fr auto 8rem; align-items: center; gap: 2rem; padding: 1.5rem 2rem; background: var(--mn-card); border-left: 3px solid transparent; transition: border-color 0.25s, background 0.25s; }
  .mn-event:hover { border-left-color: var(--mn-primary); background: #1f1f1f; }
  .mn-event-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--mn-text); }
  .mn-event-venue { font-size: 0.8rem; color: var(--mn-muted); margin-top: 0.2rem; }
  .mn-event-date { font-size: 0.8rem; font-weight: 500; color: var(--mn-primary-light); text-align: right; }
  .mn-event-type { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.3rem 0.75rem; border: 1px solid var(--mn-border); color: var(--mn-muted); }

  /* INSTRUCTORS */
  .mn-instructors { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem; }
  .mn-instructor { padding: 2.5rem 2rem; border: 1px solid var(--mn-border); position: relative; }
  .mn-instructor::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, var(--mn-primary), var(--mn-accent)); transform: scaleX(0); transform-origin: left; transition: transform 0.35s; }
  .mn-instructor:hover::after { transform: scaleX(1); }
  .mn-inst-name { font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; color: var(--mn-text); margin-bottom: 0.2rem; }
  .mn-inst-role { font-size: 0.7rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--mn-primary-light); margin-bottom: 0.3rem; }
  .mn-inst-styles { font-size: 0.78rem; color: var(--mn-muted); margin-bottom: 1rem; font-style: italic; }
  .mn-inst-bio { font-size: 0.88rem; font-weight: 300; color: rgba(245,245,240,0.55); line-height: 1.7; }

  /* PRICING */
  .mn-pricing { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .mn-plan { border: 1px solid var(--mn-border); padding: 2.5rem 2rem; position: relative; transition: border-color 0.3s; }
  .mn-plan:hover { border-color: var(--mn-primary); }
  .mn-plan.featured { border-color: var(--mn-primary); }
  .mn-plan-badge { position: absolute; top: 0; right: 0; background: var(--mn-primary); color: #fff; font-size: 0.62rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.3rem 0.8rem; }
  .mn-plan-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: var(--mn-text); margin-bottom: 0.5rem; margin-top: 0.5rem; }
  .mn-plan-price { font-family: var(--font-display); font-size: 3rem; font-weight: 700; color: var(--mn-primary-light); line-height: 1; }
  .mn-plan-period { font-size: 0.8rem; color: var(--mn-muted); margin-bottom: 1.5rem; }
  .mn-plan-features { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem; }
  .mn-plan-features li { font-size: 0.88rem; font-weight: 300; color: rgba(245,245,240,0.65); display: flex; gap: 0.5rem; }
  .mn-plan-features li::before { content: '–'; color: var(--mn-primary-light); }
  .mn-btn-plan { width: 100%; background: var(--mn-primary); color: #fff; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.9rem; border: none; cursor: pointer; transition: background 0.2s; }
  .mn-btn-plan:hover { background: var(--mn-accent); }
  .mn-btn-plan.outline { background: transparent; color: var(--mn-primary-light); border: 1px solid var(--mn-primary); }
  .mn-btn-plan.outline:hover { background: var(--mn-primary); color: #fff; }

  /* CTA */
  .mn-cta { position: relative; padding: 7rem 2.5rem; text-align: center; overflow: hidden; background: var(--mn-surface); }
  .mn-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(156,39,176,0.3) 0%, transparent 70%); }
  .mn-cta-content { position: relative; z-index: 1; }
  .mn-cta-title { font-family: var(--font-display); font-size: clamp(2.5rem, 7vw, 5.5rem); font-weight: 700; color: var(--mn-text); line-height: 1.1; margin-bottom: 0.5rem; }
  .mn-cta-title em { color: var(--mn-primary-light); font-style: italic; }
  .mn-cta-sub { font-size: 1.05rem; font-weight: 300; color: rgba(245,245,240,0.65); margin-bottom: 2.5rem; }

  /* FOOTER */
  .mn-footer { background: #080808; padding: 3rem 2.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; border-top: 1px solid var(--mn-border); }
  .mn-footer-logo { font-family: var(--font-display); font-size: 1.2rem; font-style: italic; }
  .mn-footer-logo span { color: var(--mn-primary-light); font-style: normal; }
  .mn-footer-info { font-size: 0.8rem; color: var(--mn-muted); line-height: 1.65; margin-top: 0.4rem; }
  .mn-footer-copy { font-size: 0.75rem; color: rgba(136,136,136,0.45); }

  /* REVEAL */
  .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 768px) {
    .mn-nav-links { display: none; }
    .mn-event { grid-template-columns: 1fr; gap: 0.5rem; }
    .mn-footer { flex-direction: column; text-align: center; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((e) => {
      e.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('visible'); io.unobserve(x.target); } });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function MotionPage() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  const d = siteData;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className={`mn-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="mn-logo"><em>Motion</em> <span>·</span></a>
        <ul className="mn-nav-links">
          <li><a href="#disciplines">Disciplines</a></li>
          <li><a href="#performances">Events</a></li>
          <li><a href="#instructors">Instructors</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <button className="mn-nav-cta">Try a Class</button>
      </nav>

      {/* HERO */}
      <section className="mn-hero">
        <video className="mn-hero-video" autoPlay muted loop playsInline poster={d.gym.hero_poster}>
          <source src={d.gym.hero_video} type="video/mp4" />
        </video>
        <div className="mn-hero-overlay" />
        <div className="mn-hero-content">
          <p className="mn-hero-eyebrow">{d.gym.location} · Dance Studio</p>
          <h1 className="mn-hero-title">Move.</h1>
          <div className="mn-hero-title-italic">Express.</div>
          <h1 className="mn-hero-title" style={{ color: 'var(--mn-primary-light)' }}>Transform.</h1>
          <p className="mn-hero-sub" style={{ marginTop: '1.5rem' }}>{d.gym.name} is Los Angeles' most celebrated dance studio — a space where technique meets artistry and every body finds its rhythm.</p>
          <div className="mn-hero-actions">
            <button className="mn-btn-primary">Explore Classes</button>
            <button className="mn-btn-ghost">Upcoming Performances</button>
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="mn-section" id="disciplines">
        <p className="mn-eyebrow reveal">What We Teach</p>
        <h2 className="mn-heading reveal" style={{ transitionDelay: '0.1s' }}>Six</h2>
        <div className="mn-heading-italic reveal" style={{ transitionDelay: '0.15s' }}>Disciplines</div>
        <p className="mn-body reveal" style={{ transitionDelay: '0.2s' }}>From classical to contemporary, street to stage — find the form that speaks to you.</p>
        <div className="mn-disciplines">
          {d.disciplines.map((disc, i) => (
            <div key={disc.name} className="mn-discipline reveal" style={{ transitionDelay: `${0.07 * i}s` }}>
              <div className="mn-disc-name">{disc.name}</div>
              <div className="mn-disc-meta">
                <span className="mn-disc-tag level">{disc.level}</span>
                <span className="mn-disc-tag sessions">{disc.sessions}</span>
              </div>
              <p className="mn-disc-desc">{disc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PERFORMANCES */}
      <div className="mn-section-dark" id="performances">
        <div className="mn-section-dark-inner">
          <p className="mn-eyebrow reveal">On Stage</p>
          <h2 className="mn-heading reveal" style={{ transitionDelay: '0.1s' }}>Upcoming</h2>
          <div className="mn-heading-italic reveal" style={{ transitionDelay: '0.15s' }}>Events</div>
          <div className="mn-events">
            {d.performances.map((ev, i) => (
              <div key={ev.title} className="mn-event reveal" style={{ transitionDelay: `${0.08 * i}s` }}>
                <div>
                  <div className="mn-event-title">{ev.title}</div>
                  <div className="mn-event-venue">{ev.venue}</div>
                </div>
                <div>
                  <div className="mn-event-date">{ev.date}</div>
                </div>
                <div className="mn-event-type">{ev.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INSTRUCTORS */}
      <section className="mn-section" id="instructors">
        <p className="mn-eyebrow reveal">The Artists</p>
        <h2 className="mn-heading reveal" style={{ transitionDelay: '0.1s' }}>Our</h2>
        <div className="mn-heading-italic reveal" style={{ transitionDelay: '0.15s' }}>Instructors</div>
        <div className="mn-instructors">
          {d.instructors.map((inst, i) => (
            <div key={inst.name} className="mn-instructor reveal" style={{ transitionDelay: `${0.1 * i}s` }}>
              <div className="mn-inst-name">{inst.name}</div>
              <div className="mn-inst-role">{inst.role}</div>
              <div className="mn-inst-styles">{inst.styles}</div>
              <p className="mn-inst-bio">{inst.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <div className="mn-section-dark" id="pricing">
        <div className="mn-section-dark-inner">
          <p className="mn-eyebrow reveal">Investment</p>
          <h2 className="mn-heading reveal" style={{ transitionDelay: '0.1s' }}>Studio</h2>
          <div className="mn-heading-italic reveal" style={{ transitionDelay: '0.15s' }}>Pricing</div>
          <div className="mn-pricing">
            {d.pricing.map((p, i) => (
              <div key={p.name} className={`mn-plan reveal ${p.highlight ? 'featured' : ''}`} style={{ transitionDelay: `${0.1 * i}s` }}>
                {p.highlight && <div className="mn-plan-badge">Recommended</div>}
                <div className="mn-plan-name">{p.name}</div>
                <div className="mn-plan-price">{p.price}</div>
                <div className="mn-plan-period">{p.period}</div>
                <ul className="mn-plan-features">
                  {p.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <button className={`mn-btn-plan ${p.highlight ? '' : 'outline'}`}>Choose Plan</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mn-cta">
        <div className="mn-cta-content">
          <h2 className="mn-cta-title">Begin Your<br /><em>Dance Journey</em></h2>
          <p className="mn-cta-sub">First class free. No experience needed. Just bring yourself.</p>
          <button className="mn-btn-primary" style={{ padding: '1.1rem 3rem', fontSize: '0.85rem' }}>Book Your First Class</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mn-footer">
        <div>
          <div className="mn-footer-logo"><em>Motion</em> <span>·</span> Dance Studio</div>
          <div className="mn-footer-info">{d.gym.address}<br />{d.gym.phone} · {d.gym.email}</div>
        </div>
        <div className="mn-footer-copy">© {new Date().getFullYear()} {d.gym.name}. Powered by Koriva.</div>
      </footer>
    </>
  );
}

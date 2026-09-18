/* Greater Place 2.0 homepage — design source follows the approved Claude prototype. */
"use client";

import { useEffect, useState } from "react";

const events = [
  ["JAN 18", "7:00PM", "Winter Showcase", "Community Hall, Main Stage"],
  ["JUN 14", "7:00PM", "Mid-Year Performance", "Partner Church, Sanctuary Hall"],
  ["DEC 06", "6:30PM", "Annual Gala", "Main Auditorium"],
  ["MAR 22", "5:00PM", "Ogene Night", "Community Hall, Courtyard"],
];

const stages = [
  ["Stage One", "Discover", "Training"],
  ["Stage Two", "Develop", "JV"],
  ["Stage Three", "Perform", "Varsity"],
  ["Stage Four", "Lead", "Leadership"],
];

const programs = [
  ["Faith & Character", "Biblical principles, discipline, integrity, responsibility and service."],
  ["Leadership", "Confidence, communication, teamwork and responsibility."],
  ["Wellness", "Mental-health awareness, emotional wellness and healthy coping."],
];

const culture = ["Ogene", "Liturgical Dance", "Praise & Worship", "Drama & Skits"];
const supportTags = ["Churches", "Schools", "Mental Health Programs", "Shelters & Group Homes", "Communities"];

export default function Home() {
  const [siteTheme, setSiteTheme] = useState("dark");

  useEffect(() => {
    const updateTheme = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;

      // The approved design has a dark opening, a light middle, and a dark close/footer.
      setSiteTheme(progress >= 0.34 && progress < 0.76 ? "light" : "dark");
    };

    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme);
    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.greaterPlaceTheme = siteTheme;
    document.body.dataset.greaterPlaceTheme = siteTheme;
    return () => {
      delete document.documentElement.dataset.greaterPlaceTheme;
      delete document.body.dataset.greaterPlaceTheme;
    };
  }, [siteTheme]);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("gp-in");
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".gp-reveal").forEach((el) => reveal.observe(el));
    return () => reveal.disconnect();
  }, []);

  return (
    <div className="gp-site">
      <style jsx global>{`
        :root {
          --gp-black:#0A0D12;
          --gp-navy:#101826;
          --gp-navy-deep:#0B121C;
          --gp-ivory:#F3F5F8;
          --gp-white:#FFFFFF;
          --gp-dim:rgba(243,245,248,.55);
          --gp-dimmer:rgba(243,245,248,.38);
          --gp-hair:rgba(243,245,248,.14);
          --gp-red:#E5484D;
          --gp-red-deep:#C23238;
          --gp-green:#3FBF6F;
          --gp-purple:#A78BFA;
        }

        html { scroll-behavior:smooth; }

        body {
          margin:0;
          overflow-x:hidden;
          background:var(--gp-black);
          color:var(--gp-ivory);
          transition:background-color .75s ease,color .75s ease;
        }

        body[data-greater-place-theme="light"] {
          background:var(--gp-white);
          color:var(--gp-black);
        }

        .gp-site {
          min-height:100vh;
          background:transparent;
          color:inherit;
          font-family:'Manrope',sans-serif;
          font-size:15px;
          line-height:1.55;
          -webkit-font-smoothing:antialiased;
          transition:color .75s ease;
        }

        .gp-site * { box-sizing:border-box; }
        .gp-site h1,.gp-site h2,.gp-site h3,.gp-site h4,.gp-site .gp-serif {
          font-family:'Fraunces',serif;
          font-weight:400;
        }
        .gp-site a { color:inherit;text-decoration:none; }
        .gp-site img { display:block; }

        .gp-wrap { max-width:1360px;margin:0 auto;padding:0 40px; }
        @media(max-width:800px){.gp-wrap{padding:0 20px;}}

        .gp-header {
          position:fixed;top:0;left:0;right:0;z-index:300;padding:16px 0;
          transition:background .3s,border-color .3s,color .3s;
          color:var(--gp-ivory);
        }
        body[data-greater-place-theme="light"] .gp-header {
          color:var(--gp-black);
        }
        .gp-header.gp-scrolled {
          background:rgba(10,13,18,.93);
          backdrop-filter:blur(12px);
          border-bottom:1px solid var(--gp-hair);
        }
        body[data-greater-place-theme="light"] .gp-header.gp-scrolled {
          background:rgba(255,255,255,.93);
          border-bottom:1px solid rgba(10,13,18,.12);
        }
        .gp-header-inner { display:flex;align-items:center;justify-content:space-between;gap:24px; }
        .gp-logo { font-family:'Fraunces',serif;font-size:15px;letter-spacing:.18em;font-weight:500; }
        .gp-nav { display:flex;gap:28px; }
        .gp-nav a { font-size:12px;letter-spacing:.09em;text-transform:uppercase;font-weight:600;opacity:.62;transition:.2s; }
        .gp-nav a:hover { opacity:1; }
        .gp-nav-right { display:flex;align-items:center;gap:18px; }
        .gp-pill { background:var(--gp-white);color:var(--gp-navy-deep);font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;padding:8px 16px;transition:.2s; }
        .gp-pill:hover { background:transparent;color:currentColor;box-shadow:inset 0 0 0 1px currentColor; }
        .gp-icon { width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.6;opacity:.65; }
        @media(max-width:1000px){.gp-nav{display:none;}.gp-icon{display:none;}}

        .gp-btn { font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;padding:13px 24px;transition:.2s;display:inline-block; }
        .gp-red { background:var(--gp-red);color:#fff; }
        .gp-red:hover { background:var(--gp-red-deep); }
        .gp-line { border:1px solid currentColor;color:inherit;opacity:.9; }
        .gp-line:hover { background:rgba(128,128,128,.1); }
        .gp-white { background:var(--gp-white);color:var(--gp-navy-deep); }

        .gp-section { padding:88px 0; }
        .gp-sec-head { display:flex;align-items:baseline;justify-content:space-between;gap:20px;border-top:1px solid rgba(128,128,128,.2);padding-top:14px;margin-bottom:34px;flex-wrap:wrap; }
        .gp-label { font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;opacity:.55; }
        .gp-more { font-size:11px;letter-spacing:.1em;text-transform:uppercase;font-weight:700; }
        .gp-more:hover { opacity:.7; }

        .gp-promo {
          min-height:52vh;display:flex;flex-direction:column;justify-content:flex-end;padding-top:120px;position:relative;
          background:linear-gradient(165deg,#152233 0%,#0d1620 55%,#0A0D12 100%);
        }
        .gp-promo:before { content:"";position:absolute;inset:0;opacity:.45;mix-blend-mode:soft-light;background-image:radial-gradient(circle at 18% 20%,rgba(243,245,248,.4),transparent 42%),radial-gradient(circle at 82% 60%,rgba(94,150,214,.5),transparent 48%); }
        .gp-promo-inner { position:relative;z-index:2;padding-bottom:40px;width:100%; }
        .gp-promo-eyebrow { font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--gp-dim);font-weight:700;margin-bottom:16px; }
        .gp-promo h1 { font-size:clamp(34px,5vw,64px);line-height:1.05;letter-spacing:-.01em;max-width:820px;margin:0; }
        .gp-promo p { max-width:460px;font-size:15px;color:rgba(243,245,248,.8);margin-top:16px; }
        .gp-promo-btns { display:flex;gap:10px;margin-top:26px;flex-wrap:wrap; }
        .gp-promo-foot { display:flex;justify-content:flex-end;margin-top:40px; }

        .gp-reveal { opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .7s ease; }
        .gp-reveal.gp-in { opacity:1;transform:none; }

        .gp-bleed { position:relative;min-height:78vh;display:flex;align-items:flex-end;overflow:hidden;background:var(--gp-black); }
        .gp-bleed .gp-ph { position:absolute;inset:0; }
        .gp-scrim { position:absolute;inset:0;background:linear-gradient(0deg,rgba(10,13,18,.92) 0%,rgba(10,13,18,.25) 45%,rgba(10,13,18,.1) 100%); }
        .gp-bleed-inner { position:relative;z-index:2;width:100%;padding:0 40px 56px; }
        @media(max-width:800px){.gp-bleed-inner{padding:0 20px 44px;}}
        .gp-bleed-label { font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;color:var(--gp-dim);margin-bottom:18px;border-top:1px solid var(--gp-hair);padding-top:14px;display:inline-block; }
        .gp-bleed-row { display:flex;justify-content:space-between;align-items:flex-end;gap:40px;flex-wrap:wrap; }
        .gp-bleed-text { max-width:560px; }
        .gp-bleed-text p { font-size:15.5px;color:rgba(243,245,248,.85);margin-bottom:20px;line-height:1.6; }
        .gp-bleed-text blockquote { font-family:'Fraunces',serif;font-size:clamp(22px,2.8vw,32px);line-height:1.3;font-style:italic;margin-bottom:16px; }
        .gp-who { font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--gp-dimmer);margin-bottom:18px; }
        .gp-statstrip { display:flex;gap:48px;margin-top:26px;flex-wrap:wrap; }
        .gp-statstrip .n { font-family:'Fraunces',serif;font-size:34px;color:var(--gp-white);line-height:1; }
        .gp-statstrip .l { display:block;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--gp-dimmer);margin-top:6px; }

        .gp-reel { display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:6px;scrollbar-width:none; }
        .gp-reel::-webkit-scrollbar { display:none; }
        .gp-ecard { flex:0 0 320px;scroll-snap-align:start; }
        .gp-ecard .gp-ph { aspect-ratio:4/3;position:relative; }
        .gp-chip { position:absolute;top:14px;left:14px;z-index:2;background:rgba(10,13,18,.75);padding:8px 12px;font-size:12px;font-weight:700;letter-spacing:.04em;color:white; }
        .gp-chip small { display:block;font-size:10px;font-weight:600;letter-spacing:.08em;color:var(--gp-dim);margin-top:2px; }
        .gp-ecard h4 { font-size:21px;margin:16px 0 0; }
        .gp-venue { font-size:12.5px;color:var(--gp-dim);margin-top:3px; }
        .gp-ebtns { display:flex;gap:8px;margin-top:14px; }
        .gp-btn-sm { padding:9px 16px;font-size:10.5px; }
        @media(max-width:700px){.gp-ecard{flex:0 0 78vw;}}

        .gp-train-head { max-width:600px;margin-bottom:44px; }
        .gp-train-head .gp-label { margin-bottom:18px;display:block; }
        .gp-train-head h2 { font-size:clamp(30px,4.2vw,52px);line-height:1.08;margin:0 0 18px; }
        .gp-train-head p { opacity:.55;max-width:440px;margin-bottom:22px; }
        .gp-train-photo .gp-ph { aspect-ratio:21/9; }
        .gp-stagebar { display:flex;flex-wrap:wrap;gap:0;margin-top:0;border-top:1px solid rgba(128,128,128,.2); }
        .gp-stagebar div { flex:1;min-width:150px;padding:20px 22px;border-right:1px solid rgba(128,128,128,.2); }
        .gp-stagebar div:last-child { border-right:none; }
        .gp-stagebar .n { display:block;font-size:10px;letter-spacing:.12em;text-transform:uppercase;opacity:.5; }
        .gp-stagebar .t { display:block;font-family:'Fraunces',serif;font-size:20px;margin-top:6px; }
        .gp-stagebar .s { display:block;font-size:12px;opacity:.55;margin-top:3px; }
        @media(max-width:800px){.gp-stagebar div{flex:1 1 50%;border-right:1px solid rgba(128,128,128,.2);}}

        .gp-grid3 { display:grid;grid-template-columns:repeat(3,1fr);gap:22px; }
        .gp-grid4 { display:grid;grid-template-columns:repeat(4,1fr);gap:18px; }
        @media(max-width:900px){.gp-grid3,.gp-grid4{grid-template-columns:1fr 1fr;}}
        @media(max-width:560px){.gp-grid3,.gp-grid4{grid-template-columns:1fr;}}
        .gp-gcard .gp-ph { aspect-ratio:4/3;position:relative;margin-bottom:14px; }
        .gp-gcard h4 { font-size:17px;margin:0 0 4px; }
        .gp-cap { font-size:13px;opacity:.58;margin-bottom:8px; }
        .gp-glink { font-size:11px;letter-spacing:.08em;text-transform:uppercase;font-weight:700; }
        .gp-glink:hover { opacity:.7; }

        .gp-repertory { position:relative;padding:120px 0;overflow:hidden;background:var(--gp-navy-deep);color:var(--gp-ivory); }
        .gp-repertory .gp-ph { position:absolute;inset:0;opacity:.28; }
        .gp-repertory-scrim { position:absolute;inset:0;background:linear-gradient(90deg,rgba(11,18,28,.97) 0%,rgba(11,18,28,.75) 55%,rgba(11,18,28,.94) 100%); }
        .gp-repertory-inner { position:relative;z-index:2; }
        .gp-repertory-top { display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:70px;flex-wrap:wrap;gap:20px; }
        .gp-repertory-mark { text-align:right;font-family:'Fraunces',serif;font-size:13px;letter-spacing:.1em;line-height:1.6;color:rgba(243,245,248,.35); }
        .gp-repertory-list .gp-serif { font-size:clamp(28px,4.8vw,52px);font-style:italic;line-height:1.35;color:rgba(243,245,248,.9); }
        .gp-repertory-list .gp-serif:first-child { color:var(--gp-white); }
        .gp-repertory-btn { margin-top:44px; }

        .gp-support-top { padding-bottom:48px; }
        .gp-support-top .gp-label { margin-bottom:18px;display:block; }
        .gp-support-top p { max-width:600px;font-size:16px;opacity:.55;margin-bottom:10px; }
        .gp-support-tags { display:flex;flex-wrap:wrap;gap:6px 18px;margin:18px 0 26px; }
        .gp-support-tags span { font-size:13px;opacity:.45; }
        .gp-support-tags span:not(:last-child):after { content:"·";margin-left:18px;opacity:.5; }
        .gp-support-btns { display:flex;gap:10px;flex-wrap:wrap; }
        .gp-support-photo { position:relative; }
        .gp-support-photo .gp-ph { aspect-ratio:21/10; }
        @media(max-width:800px){.gp-support-photo .gp-ph{aspect-ratio:4/5;}}

        .gp-contact { background:var(--gp-navy-deep);color:var(--gp-ivory); }
        .gp-ct-grid { display:grid;grid-template-columns:1.1fr 1fr;gap:60px;align-items:center; }
        @media(max-width:900px){.gp-ct-grid{grid-template-columns:1fr;gap:36px;}}
        .gp-ct-grid h2 { font-size:clamp(28px,3.6vw,44px);line-height:1.14;margin:0 0 16px; }
        .gp-ct-grid p { color:var(--gp-dim);max-width:440px;margin-bottom:26px;font-size:15.5px; }
        .gp-ct-cards { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
        @media(max-width:560px){.gp-ct-cards{grid-template-columns:1fr;}}
        .gp-ct-card { border:1px solid var(--gp-hair);padding:26px 22px;transition:.2s; }
        .gp-ct-card:hover { border-color:rgba(243,245,248,.35);background:rgba(243,245,248,.03); }
        .gp-ct-card h4 { font-size:16px;margin:0 0 4px; }
        .gp-ct-card .sub { font-size:12.5px;color:var(--gp-dimmer);margin-bottom:14px; }

        .gp-footer { background:#06080B;color:var(--gp-ivory);padding:64px 0 26px;border-top:1px solid var(--gp-hair); }
        .gp-ftop { display:grid;grid-template-columns:1.3fr 1fr 1fr 1.4fr;gap:40px;padding-bottom:44px; }
        @media(max-width:900px){.gp-ftop{grid-template-columns:1fr 1fr;row-gap:32px;}}
        .gp-fbrand .gp-serif { font-size:16px;letter-spacing:.16em;margin-bottom:12px; }
        .gp-fbrand p { font-size:12.5px;color:var(--gp-dimmer);max-width:250px; }
        .gp-footer h5 { font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--gp-dimmer);margin:0 0 14px; }
        .gp-footer ul { list-style:none;padding:0;margin:0; }
        .gp-footer li { margin-bottom:9px;font-size:13px;color:var(--gp-dim); }
        .gp-footer li a:hover { color:var(--gp-ivory); }
        .gp-signup { display:flex;border:1px solid var(--gp-hair);margin-top:4px; }
        .gp-signup input { flex:1;background:transparent;border:0;padding:12px 14px;color:var(--gp-ivory);font-family:inherit;font-size:13px;min-width:0; }
        .gp-signup button { background:var(--gp-white);color:var(--gp-navy-deep);border:0;padding:0 20px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;cursor:pointer;font-family:inherit; }
        .gp-fbot { display:flex;justify-content:space-between;padding-top:22px;border-top:1px solid var(--gp-hair);font-size:11px;color:var(--gp-dimmer);flex-wrap:wrap;gap:8px; }

        .gp-ph { position:relative;overflow:hidden;background:#101826;display:block; }
        .gp-ph:after { content:"";position:absolute;inset:0;opacity:.5;mix-blend-mode:overlay;background-image:radial-gradient(circle at 30% 22%,rgba(243,245,248,.4),transparent 46%),radial-gradient(circle at 74% 76%,rgba(0,0,0,.6),transparent 55%); }
        .gp-p1 { background:linear-gradient(140deg,#2a5a86,#5fa8dd 55%,#0B121C); }
        .gp-p2 { background:linear-gradient(155deg,#173650,#0d1620 62%,#0A0D12); }
        .gp-p3 { background:linear-gradient(130deg,#3d5b78,#152431 58%,#0A0D12); }
        .gp-p4 { background:linear-gradient(145deg,#1c3348,#0e1721 60%,#0A0D12); }
        .gp-p5 { background:linear-gradient(120deg,#4f86c6,#173650 58%,#080D12); }
        .gp-p6 { background:linear-gradient(165deg,#26445f,#4f86c6 50%,#0A0D12); }
        .gp-p7 { background:linear-gradient(150deg,#3a3a3a,#171717 60%,#0A0D12); }

        @media(prefers-reduced-motion:reduce){.gp-reveal{opacity:1;transform:none;transition:none;}}

        /* The middle of the page is one continuous light canvas; sections do not paint their own white boxes. */
        body[data-greater-place-theme="light"] .gp-light-section { background:transparent !important;color:var(--gp-black); }
        body[data-greater-place-theme="dark"] .gp-light-section { background:transparent !important;color:var(--gp-ivory); }
      `}</style>

      <header className="gp-header">
        <div className="gp-wrap gp-header-inner">
          <a href="/" className="gp-logo">GREATER PLACE</a>
          <nav className="gp-nav">
            <a href="#training">Training</a><a href="#programs">Programs</a><a href="#events">Events</a><a href="#people">Team</a><a href="#stories">Blog</a><a href="#support">Support</a><a href="#contact">Contact</a>
          </nav>
          <div className="gp-nav-right">
            <a className="gp-pill" href="#support">Get Involved</a>
            <svg className="gp-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/></svg>
            <svg className="gp-icon" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </div>
        </div>
      </header>

      <main>
        <section className="gp-promo">
          <div className="gp-wrap gp-promo-inner">
            <div className="gp-promo-eyebrow">Performing Arts · Ministry · Youth Development</div>
            <h1 className="gp-serif">2027 Season | Enrollment Now Open</h1>
            <p>Empowering young people ages 8–33 through dance, mentorship, faith, creativity and leadership.</p>
            <div className="gp-promo-btns"><a className="gp-btn gp-red" href="#support">Enroll Now</a><a className="gp-btn gp-line" href="#programs">Explore the Program</a></div>
            <div className="gp-promo-foot"><div className="gp-reel-ctrl"><span>● ● ●</span><span>›</span></div></div>
          </div>
        </section>

        <section className="gp-bleed gp-reveal">
          <div className="gp-ph gp-p1" />
          <div className="gp-scrim" />
          <div className="gp-bleed-inner">
            <span className="gp-bleed-label">Our Story</span>
            <div className="gp-bleed-row">
              <div className="gp-bleed-text">
                <p>We use the performing arts to help young people discover confidence, character, purpose and leadership. Dance is the vehicle — development is the purpose.</p>
                <a className="gp-btn gp-line" href="#training">Our Story</a>
                <div className="gp-statstrip"><div><span className="gp-statstrip n gp-serif">8–33</span><span className="gp-statstrip l">Age range</span></div><div><span className="gp-statstrip n gp-serif">4</span><span className="gp-statstrip l">Core areas</span></div><div><span className="gp-statstrip n gp-serif">2027</span><span className="gp-statstrip l">Programme year</span></div></div>
              </div>
              <div className="gp-pill" aria-hidden="true">→</div>
            </div>
          </div>
        </section>

        <section id="events" className="gp-section gp-light-section gp-reveal">
          <div className="gp-wrap">
            <div className="gp-sec-head"><span className="gp-label">Performances</span><a className="gp-more" href="/events">Upcoming Performances</a></div>
            <div className="gp-reel">
              {events.map(([date,time,title,venue],i)=><article className="gp-ecard" key={title}><div className={`gp-ph gp-p${i+2}`}><span className="gp-chip">{date}<small>{time}</small></span></div><h4 className="gp-serif">{title}</h4><div className="gp-venue">{venue}</div><div className="gp-ebtns"><a className="gp-btn gp-red gp-btn-sm" href="#contact">RSVP</a><a className="gp-btn gp-line gp-btn-sm" href="/events">Learn More</a></div></article>)}
            </div>
          </div>
        </section>

        <section id="training" className="gp-section gp-light-section gp-reveal">
          <div className="gp-wrap">
            <div className="gp-train-head"><span className="gp-label">Training</span><h2 className="gp-serif">The Greater Place Pathway</h2><p>A structured progression from a first class to a leadership role — every dancer moves through the same four stages, at their own pace.</p><div className="gp-sec-head" style={{border:"none",paddingTop:0,marginBottom:0}}><a className="gp-btn gp-line" href="/training">Learn More</a><a className="gp-more" href="#contact">How Enrolment Works</a></div></div>
            <div className="gp-train-photo"><div className="gp-ph gp-p2" /></div>
            <div className="gp-stagebar">{stages.map(([n,t,s])=><div key={n}><span className="n">{n}</span><span className="t">{t}</span><span className="s">{s}</span></div>)}</div>
          </div>
        </section>

        <section id="programs" className="gp-section gp-light-section gp-reveal">
          <div className="gp-wrap">
            <div className="gp-train-head"><span className="gp-label">Community</span><h2 className="gp-serif">Faith, Leadership &amp; Wellness</h2><p>Beyond technique, every dancer builds the character and confidence to lead — on stage and off it.</p><div className="gp-sec-head" style={{border:"none",paddingTop:0,marginBottom:0}}><a className="gp-btn gp-line" href="/programs">View All Programs</a><a className="gp-more" href="/programs">All Programs</a></div></div>
            <div className="gp-grid3">{programs.map(([title,text],i)=><article className="gp-gcard" key={title}><div className={`gp-ph gp-p${i+3}`} /><h4 className="gp-serif">{title}</h4><div className="gp-cap">{text}</div><a className="gp-glink" href="/programs">Learn More →</a></article>)}</div>
          </div>
        </section>

        <section className="gp-section gp-light-section gp-reveal">
          <div className="gp-wrap">
            <div className="gp-train-head"><span className="gp-label">Culture</span><h2 className="gp-serif">Movement &amp; Culture</h2><p>Rooted in Igbo musical tradition and church worship alike — a reminder that this is African performing arts, not an imported form.</p><div className="gp-sec-head" style={{border:"none",paddingTop:0,marginBottom:0}}><a className="gp-btn gp-line" href="/classes">View All Classes</a><a className="gp-more" href="https://youtube.com" target="_blank" rel="noreferrer">Watch on YouTube</a></div></div>
            <div className="gp-grid4">{culture.map((item,i)=><article className="gp-gcard" key={item}><div className={`gp-ph gp-p${i+1}`}/><h4 className="gp-serif">{item}</h4></article>)}</div>
          </div>
        </section>

        <section id="people" className="gp-section gp-light-section gp-reveal">
          <div className="gp-wrap"><div className="gp-sec-head"><span className="gp-label">Team</span><a className="gp-more" href="/team">Full Team</a></div><div className="gp-grid4">{["Founder Name","Programme Lead","Instructor Name","Volunteer Name"].map((name,i)=><article className="gp-gcard" key={name}><div className={`gp-ph gp-p${i+1}`}/><h4 className="gp-serif">{name}</h4><div className="gp-cap">{["Founder & Director","Programme Director","Lead Instructor","Mentor & Volunteer"][i]}</div></article>)}</div></div>
        </section>

        <section className="gp-repertory gp-reveal">
          <div className="gp-ph gp-p7" /><div className="gp-repertory-scrim" />
          <div className="gp-wrap gp-repertory-inner"><div className="gp-repertory-top"><span className="gp-bleed-label">On Stage</span><div className="gp-repertory-mark">GREATER PLACE<br/>PERFORMING ARTS</div></div><div className="gp-repertory-list">{events.map(([, ,title])=><div className="gp-serif" key={title}><a href="/events">{title}</a></div>)}</div><div className="gp-repertory-btn"><a className="gp-btn gp-line" href="/events">See What&apos;s On Stage</a></div></div>
        </section>

        <section id="stories" className="gp-bleed gp-reveal">
          <div className="gp-ph gp-p6"/><div className="gp-scrim"/>
          <div className="gp-bleed-inner"><span className="gp-bleed-label">Stories Of Change</span><div className="gp-bleed-row"><div className="gp-bleed-text"><blockquote className="gp-serif">"More than a performance — this is where I found the confidence to lead."</blockquote><div className="gp-who">Participant name — Programme year</div><a className="gp-btn gp-line" href="/stories">Read Their Story</a></div><div className="gp-pill" aria-hidden="true">→</div></div></div>
        </section>

        <section id="support" className="gp-section gp-light-section gp-reveal">
          <div className="gp-wrap gp-support-top"><span className="gp-label">Support Greater Place</span><p>Every donation to Greater Place, a non-profit organisation, furthers our mission to develop confident, whole young people through dance, faith and leadership. It takes a community to raise them.</p><div className="gp-support-tags">{supportTags.map(x=><span key={x}>{x}</span>)}</div><div className="gp-support-btns"><a className="gp-btn gp-red" href="/contact">Donate</a><a className="gp-btn gp-line" href="/contact">Partner With Us</a><a className="gp-btn gp-line" href="/contact">Volunteer</a></div></div>
          <div className="gp-support-photo"><div className="gp-ph gp-p1"/></div>
        </section>

        <section id="contact" className="gp-section gp-contact gp-reveal">
          <div className="gp-wrap gp-ct-grid"><div><span className="gp-label" style={{display:"block",marginBottom:20}}>Contact</span><h2 className="gp-serif">Have a question? Let&apos;s talk.</h2><p>Whether you&apos;re enrolling a dancer, booking a performance or exploring a partnership, the fastest way to reach us is WhatsApp or email.</p><a className="gp-btn gp-red" href="/contact">Get In Touch</a></div><div className="gp-ct-cards"><div className="gp-ct-card"><h4 className="gp-serif">WhatsApp</h4><div className="sub">Usually replies same day</div><a className="gp-more" href="/contact">Chat Now →</a></div><div className="gp-ct-card"><h4 className="gp-serif">Email</h4><div className="sub">hello@greaterplaceonline.org</div><a className="gp-more" href="mailto:hello@greaterplaceonline.org">Send Email →</a></div></div></div>
        </section>
      </main>

      <footer className="gp-footer">
        <div className="gp-wrap"><div className="gp-ftop"><div className="gp-fbrand"><div className="gp-serif">GREATER PLACE</div><p>Performing arts, ministry and youth development for young people ages 8–33.</p></div><div><h5>Program</h5><ul><li><a href="#training">Training</a></li><li><a href="#programs">What We Develop</a></li><li><a href="#stories">Stories</a></li><li><a href="/blog">Blog</a></li></ul></div><div><h5>Organisation</h5><ul><li><a href="#people">Team</a></li><li><a href="/events">Events</a></li><li><a href="#support">Support Us</a></li><li><a href="#contact">Contact</a></li></ul></div><div><h5>Stay Connected</h5><div className="gp-signup"><input type="email" placeholder="Email address" aria-label="Email address"/><button type="button">Sign up</button></div><ul style={{marginTop:18,display:"flex",gap:18}}><li><a href="#">Instagram</a></li><li><a href="#">YouTube</a></li><li><a href="#contact">Contact</a></li></ul></div></div><div className="gp-fbot"><span>© 2027 Greater Place</span><span>Editorial performing-arts identity</span></div></div>
      </footer>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const nav = [
  ["Programs", "/programs"],
  ["Pathway", "#pathway"],
  ["About", "#about"],
  ["Events", "/events"],
  ["Stories", "#stories"],
];

const pathway = [
  ["01", "Discover", "Training"],
  ["02", "Develop", "JV / Developing"],
  ["03", "Perform", "Varsity / Elite"],
  ["04", "Lead", "Leadership"],
];

const development = [
  ["01", "Performing Arts", "Dance, technique, rhythm, flexibility, drama, stage presence and creative expression."],
  ["02", "Faith & Character", "Biblical principles, integrity, discipline, responsibility, service and positive choices."],
  ["03", "Leadership", "Confidence, communication, teamwork, accountability, goal setting and leadership."],
  ["04", "Wellness", "Mental-health awareness, emotional wellness, coping skills, self-esteem and healthy relationships."],
];

const culture = [
  ["Ogene", "Rooted in Igbo cultural tradition."],
  ["Liturgical Dance", "Movement expressed through worship."],
  ["Praise & Worship Movement", "Faith, rhythm and collective expression."],
  ["Contemporary & Technique", "Training, creativity and performance."],
  ["Drama & Skits", "Storytelling through performance."],
];

const Label = ({ children, light = false }) => (
  <span className={"text-[10px] font-bold uppercase tracking-[0.18em] " + (light ? "text-black/50" : "text-white/50")}>
    {children}
  </span>
);

const Button = ({ children, href = "#", light = false }) => (
  <a
    href={href}
    className={
      "inline-flex items-center justify-center px-6 py-3.5 text-[10.5px] font-bold uppercase tracking-[0.1em] transition-opacity hover:opacity-75 " +
      (light ? "border border-black/25 text-[#0A0D12]" : "border border-white/35 text-white")
    }
  >
    {children}
  </a>
);

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    const sections = document.querySelectorAll("[data-theme]");
    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.filter((entry) => entry.isIntersecting).sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0];
        if (active) setLight(active.target.dataset.theme === "light");
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const ink = light ? "text-[#0A0D12]" : "text-[#F3F5F8]";
  const muted = light ? "text-black/60" : "text-white/60";

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-[300] transition-all duration-300 " +
        (scrolled
          ? light
            ? "border-b border-black/10 bg-white/92 backdrop-blur-md"
            : "border-b border-white/10 bg-[#0A0D12]/92 backdrop-blur-md"
          : "bg-transparent")
      }
    >
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-6 px-5 py-4 min-[900px]:px-10">
        <a href="/" className={"font-serif text-[15px] font-medium tracking-[0.18em] " + ink}>
          GREATER PLACE
        </a>
        <nav className="hidden items-center gap-7 min-[1000px]:flex">
          {nav.map(([name, href]) => (
            <a key={name} href={href} className={"text-[11px] font-semibold uppercase tracking-[0.1em] hover:opacity-100 " + muted}>
              {name}
            </a>
          ))}
        </nav>
        <a
          href="#community"
          className={"px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.1em] " + (light ? "bg-[#0A0D12] text-white" : "bg-white text-[#0A0D12]")}
        >
          Get Involved
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section data-theme="dark" className="relative flex min-h-[88vh] items-end overflow-hidden bg-[#0A0D12] text-[#F3F5F8]">
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
        <source src="/video.mov" type="video/quicktime" />
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,13,18,.92),rgba(10,13,18,.48),rgba(10,13,18,.25))]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,13,18,.95),transparent_58%)]" />
      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-5 pb-16 pt-36 min-[900px]:px-10">
        <Label>Performing Arts · Youth Development · Community</Label>
        <h1 className="mt-5 max-w-[900px] font-serif text-[clamp(52px,8vw,104px)] leading-[.88] tracking-[-.035em]">
          Move.<br />Grow.<br />Lead.
        </h1>
        <p className="mt-7 max-w-[520px] text-[15px] leading-7 text-white/75">
          Greater Place empowers young people ages 8–33 through dance, mentorship, creativity, faith and leadership.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="/programs" className="inline-flex bg-white px-6 py-3.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#0A0D12]">
            Explore Our Programs
          </a>
          <Button href="#community">Partner With Us</Button>
        </div>
      </div>
    </section>
  );
}

function MoreThanDance() {
  return (
    <section id="about" data-theme="dark" className="bg-[#0A0D12] py-24 text-[#F3F5F8] min-[900px]:py-32">
      <div className="mx-auto max-w-[1360px] px-5 min-[900px]:px-10">
        <Label>More Than Dance</Label>
        <div className="mt-10 grid gap-12 min-[900px]:grid-cols-[1.15fr_.85fr]">
          <h2 className="font-serif text-[clamp(40px,5vw,72px)] leading-[.98] tracking-[-.025em]">
            Dance is where it begins. Purpose is where it leads.
          </h2>
          <div>
            <p className="text-[16px] leading-7 text-white/70">
              Greater Place partners with churches, schools, mental health programs, shelters, group homes and communities to empower youth and young adults through dance, mentorship and creative expression.
            </p>
            <div className="mt-9 grid grid-cols-3 border-t border-white/15 pt-5">
              <div><strong className="font-serif text-4xl">8–33</strong><span className="mt-1 block text-[10px] uppercase tracking-[.12em] text-white/40">Age range</span></div>
              <div><strong className="font-serif text-4xl">4</strong><span className="mt-1 block text-[10px] uppercase tracking-[.12em] text-white/40">Core areas</span></div>
              <div><strong className="font-serif text-4xl">1</strong><span className="mt-1 block text-[10px] uppercase tracking-[.12em] text-white/40">Greater purpose</span></div>
            </div>
            <Button href="/about" className="mt-8">Our Story</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Performances() {
  return (
    <section data-theme="light" className="bg-white py-24 text-[#0A0D12] min-[900px]:py-32">
      <div className="mx-auto max-w-[1360px] px-5 min-[900px]:px-10">
        <div className="flex flex-wrap items-end justify-between gap-5 border-t border-black/10 pt-4">
          <Label light>Performances & Events</Label>
          <a href="/events" className="text-[10.5px] font-bold uppercase tracking-[.1em]">View All Events →</a>
        </div>
        <div className="mt-10 grid gap-8 min-[900px]:grid-cols-[1.15fr_.85fr]">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#17191D]">
            <img src="/images/event.jpg" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <Label light>What&apos;s On</Label>
            <h2 className="mt-4 font-serif text-[clamp(40px,5vw,68px)] leading-none">See Greater Place in motion.</h2>
            <p className="mt-5 max-w-[500px] text-[15px] leading-7 text-black/60">
              Performances, showcases, community events and opportunities to experience the work of our young people.
            </p>
            <a href="/events" className="mt-7 inline-flex w-fit bg-[#0A0D12] px-6 py-3.5 text-[10.5px] font-bold uppercase tracking-[.1em] text-white">Explore Events</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pathway() {
  return (
    <section id="pathway" data-theme="light" className="bg-[#F5F3EF] py-24 text-[#0A0D12] min-[900px]:py-32">
      <div className="mx-auto max-w-[1360px] px-5 min-[900px]:px-10">
        <Label light>The Greater Place Pathway</Label>
        <div className="mt-8 grid gap-10 min-[900px]:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="font-serif text-[clamp(40px,5vw,68px)] leading-none">A pathway built for every stage.</h2>
            <p className="mt-6 max-w-[440px] text-[15px] leading-7 text-black/60">
              From learning the foundations to developing performance skills and growing into leadership, the programme creates a clear journey.
            </p>
          </div>
          <div className="border-t border-black/15">
            {pathway.map(([n, title, sub]) => (
              <div key={n} className="grid grid-cols-[70px_1fr_auto] items-center border-b border-black/10 py-6">
                <span className="text-[10px] font-bold tracking-[.16em] text-black/35">{n}</span>
                <span className="font-serif text-2xl">{title}</span>
                <span className="text-right text-[12px] text-black/50">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeDevelop() {
  return (
    <section data-theme="light" className="bg-white py-24 text-[#0A0D12] min-[900px]:py-32">
      <div className="mx-auto max-w-[1360px] px-5 min-[900px]:px-10">
        <Label light>What We Develop</Label>
        <div className="mt-10 border-t border-black/10">
          {development.map(([n, title, text]) => (
            <div key={n} className="grid gap-4 border-b border-black/10 py-8 min-[900px]:grid-cols-[80px_1fr_1fr]">
              <span className="text-[10px] font-bold tracking-[.16em] text-black/35">{n}</span>
              <h3 className="font-serif text-3xl">{title}</h3>
              <p className="max-w-[430px] text-[14px] leading-6 text-black/55">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MovementCulture() {
  return (
    <section data-theme="light" className="bg-[#F5F3EF] py-24 text-[#0A0D12] min-[900px]:py-32">
      <div className="mx-auto max-w-[1360px] px-5 min-[900px]:px-10">
        <Label light>Movement & Culture</Label>
        <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-black/60">
          Rooted in cultural expression and faith, Greater Place uses movement to connect creativity, heritage and community.
        </p>
        <div className="mt-8 grid gap-5 min-[900px]:grid-cols-[1.35fr_.65fr]">
          <div className="relative min-h-[560px] overflow-hidden bg-[#17120F]">
            <video className="h-full min-h-[560px] w-full object-cover" muted loop autoPlay playsInline>
              <source src="/video.mov" type="video/quicktime" />
              <source src="/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-7 text-white">
              <Label>Featured Culture</Label>
              <h2 className="mt-2 font-serif text-5xl">Ogene</h2>
              <p className="mt-2 max-w-[500px] text-sm text-white/70">A cultural expression that connects movement, heritage and community.</p>
            </div>
          </div>
          <div className="border-t border-black/10">
            {culture.slice(1).map(([title, text]) => (
              <div key={title} className="border-b border-black/10 py-7">
                <h3 className="font-serif text-2xl">{title}</h3>
                <p className="mt-2 text-sm text-black/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="mt-8 inline-flex border border-black/25 px-6 py-3.5 text-[10.5px] font-bold uppercase tracking-[.1em]">See Greater Place in Motion →</a>
      </div>
    </section>
  );
}

function People() {
  return (
    <section data-theme="light" className="bg-white py-24 text-[#0A0D12] min-[900px]:py-32">
      <div className="mx-auto max-w-[1360px] px-5 min-[900px]:px-10">
        <div className="flex flex-wrap items-end justify-between gap-5 border-t border-black/10 pt-4">
          <Label light>People</Label>
          <a href="/team" className="text-[10.5px] font-bold uppercase tracking-[.1em]">Meet the Team →</a>
        </div>
        <div className="mt-10 grid gap-5 min-[650px]:grid-cols-2 min-[1000px]:grid-cols-4">
          {["Founder & Director", "Programme Lead", "Lead Instructor", "Mentor & Volunteer"].map((role) => (
            <div key={role}>
              <div className="aspect-[4/5] bg-[#D9D4CC]" />
              <h3 className="mt-4 font-serif text-xl">Team Member</h3>
              <p className="mt-1 text-sm text-black/50">{role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section id="stories" data-theme="dark" className="relative overflow-hidden bg-[#0B121C] py-28 text-[#F3F5F8] min-[900px]:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(199,154,82,.18),transparent_40%)]" />
      <div className="relative mx-auto max-w-[1360px] px-5 min-[900px]:px-10">
        <Label>Stories of Change</Label>
        <div className="mt-10 grid gap-10 min-[900px]:grid-cols-[1fr_.8fr]">
          <blockquote className="font-serif text-[clamp(36px,5vw,70px)] leading-[1.02]">
            The goal isn&apos;t simply to create performers. It&apos;s to develop whole, confident young people.
          </blockquote>
          <div className="self-end">
            <p className="text-[15px] leading-7 text-white/60">
              Creativity, discipline, leadership, service and wellness help young people grow on stage and beyond it.
            </p>
            <Button href="/stories">Read Their Stories</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section id="community" data-theme="dark" className="bg-[#0A0D12] py-24 text-[#F3F5F8] min-[900px]:py-32">
      <div className="mx-auto max-w-[1360px] px-5 min-[900px]:px-10">
        <Label>It Takes a Community</Label>
        <div className="mt-7 grid gap-10 min-[900px]:grid-cols-[1fr_.8fr]">
          <div>
            <h2 className="font-serif text-[clamp(42px,5vw,72px)] leading-none">Help a young person find their greater place.</h2>
            <p className="mt-6 max-w-[520px] text-[15px] leading-7 text-white/60">
              We work with churches, schools, mental health programs, shelters, group homes and communities to create meaningful opportunities.
            </p>
          </div>
          <div className="flex flex-wrap content-start gap-x-5 gap-y-3 pt-2 text-sm text-white/45">
            {["Churches", "Schools", "Mental Health Programs", "Shelters & Group Homes", "Communities"].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="/contact" className="inline-flex bg-white px-6 py-3.5 text-[10.5px] font-bold uppercase tracking-[.1em] text-[#0A0D12]">Enroll</a>
          <Button href="/contact">Volunteer</Button>
          <Button href="/contact">Partner</Button>
          <Button href="/contact">Support</Button>
        </div>
      </div>
    </section>
  );
}

function ContactTeaser() {
  return (
    <section data-theme="dark" className="bg-[#0B121C] py-24 text-[#F3F5F8] min-[900px]:py-32">
      <div className="mx-auto grid max-w-[1360px] gap-12 px-5 min-[900px]:grid-cols-2 min-[900px]:px-10">
        <div>
          <Label>Contact</Label>
          <h2 className="mt-5 font-serif text-[clamp(44px,5vw,70px)] leading-none">Let&apos;s connect.</h2>
          <p className="mt-6 max-w-[470px] text-[15px] leading-7 text-white/60">
            Whether you are enrolling a student, volunteering, exploring a partnership, booking a performance or supporting our work, we would love to hear from you.
          </p>
          <div className="mt-8 space-y-3 text-sm text-white/65">
            <a className="block hover:text-white" href="mailto:hello@greaterplaceonline.org">hello@greaterplaceonline.org</a>
            <a className="block hover:text-white" href="/contact">Contact & enquiries →</a>
          </div>
        </div>
        <div className="border border-white/15 p-7">
          <Label>Start a conversation</Label>
          <div className="mt-7 grid gap-3 min-[600px]:grid-cols-2">
            {["Enrolment", "Volunteering", "Partnership", "Funding & Support", "Events", "General Enquiry"].map((item) => (
              <a key={item} href="/contact" className="border border-white/10 px-4 py-4 text-sm text-white/65 hover:border-white/35 hover:text-white">{item} →</a>
            ))}
          </div>
          <a href="/contact" className="mt-7 inline-flex bg-white px-6 py-3.5 text-[10.5px] font-bold uppercase tracking-[.1em] text-[#0A0D12]">Get In Touch</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer data-theme="dark" className="border-t border-white/10 bg-[#06080B] py-14 text-[#F3F5F8]">
      <div className="mx-auto max-w-[1360px] px-5 min-[900px]:px-10">
        <div className="grid gap-10 min-[800px]:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
          <div>
            <div className="font-serif tracking-[.16em]">GREATER PLACE</div>
            <p className="mt-3 max-w-[260px] text-xs leading-6 text-white/35">Performing arts, ministry and youth development for young people ages 8–33.</p>
          </div>
          <div><h4 className="text-[10px] font-bold uppercase tracking-[.16em] text-white/35">Explore</h4><div className="mt-4 space-y-2 text-sm text-white/55"><a className="block" href="/programs">Programs</a><a className="block" href="#pathway">Pathway</a><a className="block" href="/events">Events</a><a className="block" href="#stories">Stories</a></div></div>
          <div><h4 className="text-[10px] font-bold uppercase tracking-[.16em] text-white/35">Get Involved</h4><div className="mt-4 space-y-2 text-sm text-white/55"><a className="block" href="/contact">Enroll</a><a className="block" href="/contact">Volunteer</a><a className="block" href="/contact">Partner</a><a className="block" href="/contact">Contact</a></div></div>
          <div><h4 className="text-[10px] font-bold uppercase tracking-[.16em] text-white/35">Stay Connected</h4><p className="mt-4 text-xs leading-6 text-white/35">Follow Greater Place for performances, programme updates and stories.</p><div className="mt-4 flex gap-4 text-xs text-white/55"><a href="#">Instagram</a><a href="#">YouTube</a></div></div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-[10px] text-white/30"><span>© 2027 Greater Place</span><span>Performing arts · Youth development · Community</span></div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MoreThanDance />
        <Performances />
        <Pathway />
        <WhatWeDevelop />
        <MovementCulture />
        <People />
        <Stories />
        <Community />
        <ContactTeaser />
      </main>
      <Footer />
    </>
  );
}

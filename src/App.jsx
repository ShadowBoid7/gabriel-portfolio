import { useEffect, useMemo, useState } from "react";
import { profile, projects } from "./data";
import profileImg from "./assets/profile.jpg";

function getLinkLabel(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace("www.", "");
  } catch {
    return "link";
  }
}

function Modal({ open, onClose, project }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open || !project) return null;

  const links = Object.entries(project.links || {}).filter(
    ([, v]) => v && v.trim().length > 0
  );

  return (
    <div className="modalOverlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <div className="modalTitle">
            {project.title} <span className="modalMeta">| {project.platform}</span>
          </div>
          <button className="iconBtn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modalBody">
          <div className="modalSection">
            <h3>What is {project.title}?</h3>
            <p className="modalText">{project.whatIs || project.short}</p>
          </div>

          <div className="modalSection">
            <h3>What I worked on</h3>
            <ul className="bullets">
              {(project.workedOn || []).map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="modalSection">
            <h3>Tech</h3>
            <div className="badges">
              {(project.tech || []).map((t, i) => (
                <span className="badge" key={i}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="modalSection">
            <h3>Links</h3>
            {links.length === 0 ? (
              <p className="modalText muted">Ainda não adicionaste links.</p>
            ) : (
              <div className="linkGrid">
                {links.map(([k, v]) => (
                  <a key={k} className="linkPill" href={v} target="_blank" rel="noreferrer">
                    {k.toUpperCase()} · {getLinkLabel(v)}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="modalSection">
            <h3>Media</h3>
            {(!project.media || project.media.length === 0) ? (
              <div className="mediaPlaceholder">
                <div className="mediaPlaceholder__box" />
                <div className="mediaPlaceholder__text">
                  Sem imagens/vídeos ainda.  
                  Quando tiveres, eu ajudo-te a pôr aqui com drag & drop (super simples).
                </div>
              </div>
            ) : (
              <div className="mediaGrid">
                {project.media.map((m, i) => {
                  if (m.type === "youtube") {
                    return (
                      <div className="mediaItem" key={i}>
                        <iframe
                          className="mediaFrame"
                          src={m.src}
                          title={`${project.title} video ${i}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    );
                  }
                  return (
                    <div className="mediaItem" key={i}>
                      <img className="mediaImg" src={m.src} alt={m.alt || project.title} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="modalFooter">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("about");
  const [openProjectId, setOpenProjectId] = useState(null);

  const openProject = useMemo(
    () => projects.find((p) => p.id === openProjectId),
    [openProjectId]
  );

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll spy + fade-in reveal
  useEffect(() => {
    const sections = ["about", "projects", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const revealEls = document.querySelectorAll(".reveal");

    const ioSections = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, threshold: [0.35, 0.55, 0.75] }
    );

    const ioReveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("isVisible");
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((s) => ioSections.observe(s));
    revealEls.forEach((el) => ioReveal.observe(el));

    return () => {
      ioSections.disconnect();
      ioReveal.disconnect();
    };
  }, []);

  return (
    <div className="page">
      <nav className="nav">
        <div className="nav__brand">{profile.name}</div>

        <div className="nav__items">
          <button
            className={`nav__link ${active === "about" ? "isActive" : ""}`}
            onClick={() => scrollTo("about")}
          >
            ABOUT
          </button>

          <button
            className={`nav__link ${active === "projects" ? "isActive" : ""}`}
            onClick={() => scrollTo("projects")}
          >
            PROJECTS
          </button>

          <button
            className={`nav__link ${active === "contact" ? "isActive" : ""}`}
            onClick={() => scrollTo("contact")}
          >
            CONTACT
          </button>
        </div>
      </nav>

      <main className="main">
        {/* ABOUT */}
        <section className="section" id="about">
          <div className="section__inner reveal">
            <div className="hero">
              <div>
                <h1 className="section__title">Welcome!</h1>

                <p className="para">
                  Sou <strong>{profile.name}</strong>, {profile.title}.
                </p>

                <p className="para">{profile.tagline}</p>

                <p className="para">
                  GitHub:{" "}
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    {profile.github}
                  </a>
                </p>

                <div className="badges">
                  <span className="badge">Unity</span>
                  <span className="badge">C#</span>
                  <span className="badge">PC Games</span>
                  <span className="badge">Git</span>
                </div>
              </div>

              <div className="avatarWrap">
                <img className="avatar" src={profileImg} alt="Foto de perfil" />
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <div className="section__inner reveal">
            <h2 className="section__title">Projects</h2>

            <div className="cards">
              {projects.map((p) => (
                <div className="card" key={p.id}>
                  <div className="cardTop">
                    <div>
                      <h3>{p.title}</h3>
                      <p>{p.short}</p>
                    </div>
                    <div className="cardMeta">
                      <div className="mini">{p.platform}</div>
                      <div className="mini">{p.tech.join(" • ")}</div>
                    </div>
                  </div>

                  <div className="cardActions">
                    <button className="btn" onClick={() => setOpenProjectId(p.id)}>
                      View project
                    </button>

                    {/* links rápidos, se existirem */}
                    <div className="quickLinks">
                      {p.links?.github ? (
                        <a className="linkSmall" href={p.links.github} target="_blank" rel="noreferrer">
                          GitHub
                        </a>
                      ) : null}
                      {p.links?.itch ? (
                        <a className="linkSmall" href={p.links.itch} target="_blank" rel="noreferrer">
                          Itch
                        </a>
                      ) : null}
                      {p.links?.video ? (
                        <a className="linkSmall" href={p.links.video} target="_blank" rel="noreferrer">
                          Video
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="section__inner reveal">
            <h2 className="section__title">Contact</h2>

            <div className="contactRow">
              Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>

            <div className="contactRow">
              GitHub:{" "}
              <a href={profile.github} target="_blank" rel="noreferrer">
                {profile.github}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Modal open={!!openProjectId} onClose={() => setOpenProjectId(null)} project={openProject} />
    </div>
  );
}

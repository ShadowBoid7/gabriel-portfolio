import { profile, projects } from "./data";
import profileImg from "./assets/profile.JPG";

export default function App() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="page">
      <nav className="nav">
        <div className="nav__brand">{profile.name}</div>

        <div className="nav__items">
          <button
            className="nav__link isActive"
            onClick={() => scrollTo("about")}
          >
            ABOUT
          </button>

          <button className="nav__link" onClick={() => scrollTo("projects")}>
            PROJECTS
          </button>

          <button className="nav__link" onClick={() => scrollTo("contact")}>
            CONTACT
          </button>
        </div>
      </nav>

      <main className="main">
        {/* ABOUT */}
        <section className="section" id="about">
          <div className="section__inner">
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
          <div className="section__inner">
            <h2 className="section__title">Projects</h2>

            <div className="cards">
              {projects.map((p, i) => (
                <div className="card" key={i}>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <small>
                    {p.platform} — {p.tech.join(", ")}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="section__inner">
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
    </div>
  );
}

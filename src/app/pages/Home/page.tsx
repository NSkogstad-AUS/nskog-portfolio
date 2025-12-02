import "./home.css";

export default function HomePage() {
  return (
    <section className="page page--center">
      <div className="card">
        <h1>Hey! I'm Nicolai Skogstad</h1>
        <p>I'm currently studying a Masters of SWE @ <a className="card__link" href="https://www.unimelb.edu.au/" target="_blank" rel="noopener noreferrer">University of Melbourne</a>.
           I've written software that is trusted by {""}
           <a className="card__link" href="https://murmotorsports.eng.unimelb.edu.au/" target="_blank" rel="noopener noreferrer">MUR Motorsports</a>,{" "}
           <a className="card__link" href="https://www.linkedin.com/company/team-emu5/about/" target="_blank" rel="noopener noreferrer">EMU5 Robotics</a>,{" "}
           <a className="card__link" href="https://www.facebook.com/unimelbrover/" target="_blank" rel="noopener noreferrer">Unimelb Rover Team</a>, and the{" "}
           <a className="card__link" href="https://www.melbournespace.com.au/" target="_blank" rel="noopener noreferrer">Melbourne Space Program</a>.{" "}
           Seeing code I wrote actually help people at scale is what keeps me building.
           Currently building <a className="card__link" href="https://noval-tech.netlify.app/" target="_blank" rel="noopener noreferrer">Noval</a>,
          a startup based on making AI easy, reliable, and convenient for local businesses.</p>
      </div>
      <div className="card2">
        <a className="card2__resumebox card2__item" href="/resume/main.pdf" download target="_blank" rel="noopener noreferrer">
          <i className="bi bi-download" aria-hidden="true"/>
          <span>Resume</span>
        </a>

        <p>|</p>
        
        <a className="card2__item" href="https://www.linkedin.com/in/nicolai-skogstad-8333a221b/" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-linkedin" aria-hidden="true"/>
          <span>LinkedIn</span>
        </a>

        <p>|</p>
        
        <a className="card2__item" href="https://github.com/NSkogstad-AUS" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-github" aria-hidden="true"/>
          <span>GitHub</span>
        </a>

        <p>|</p>

        <a className="card2__learn" href="/pages/about">
          <span>More about me</span>
          <i className="bi bi-arrow-right" aria-hidden="true"/>
        </a>
      </div>
    </section>
  );
}

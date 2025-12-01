import Image from "next/image";

export default function HomePage() {
  return (
    <section className="page page--center">
      <div className="card">
        <h1>Hey! I'm Nicolai Skogstad</h1>
        <p>I'm currently studying a Masters of SWE @ <a className="card__link" href="https://www.unimelb.edu.au/" target="_blank" rel="noopener noreferrer">University of Melbourne</a>.
           I've written software that is trusted by {""}
           <a className="card__link" href="https://murmotorsports.eng.unimelb.edu.au/" target="_blank" rel="noopener noreferrer">MUR Racing</a>,{" "}
           <a className="card__link" href="https://www.linkedin.com/company/team-emu5/about/" target="_blank" rel="noopener noreferrer">EMU5 Robotics</a>,{" "}
           <a className="card__link" href="https://www.facebook.com/unimelbrover/" target="_blank" rel="noopener noreferrer">URT</a>, and the{" "}
           <a className="card__link" href="https://www.melbournespace.com.au/" target="_blank" rel="noopener noreferrer">Melbourne Space Program</a>.{" "}
           Seeing code I wrote actually help people at scale is what keeps me building.
           Currently building <a className="card__link" href="https://noval-tech.netlify.app/" target="_blank" rel="noopener noreferrer">Noval</a>,
          a startup based on making AI easy, reliable, and convenient for local businesses.</p>
      </div>
      <div className="card2">
        <a href="https://github.com/NSkogstad-AUS" aria-label="GitHub">
          <Image src="/svgs/github-logo_icon-icons.com_73546.svg" alt="GitHub" width={32} height={32}/>
        </a>
        <a href="https://www.linkedin.com/in/nicolai-skogstad-8333a221b/" aria-label="LinkedIn">
          <Image src="/svgs/linkedin_logo_icon_143748.svg" alt="LinkedIn" width={32} height={32} />
        </a>
        <a href="./resume/main.pdf" aria-label="Resume">
          <Image src="/svgs/paper_download_icon_183774.svg" alt="Resume" width={32} height={32} />
        </a>
      </div>
    </section>
  );
}

"use client"
import Image from "next/image";
import "./about.css";
import { StatusBar } from "@/app/components/StatusBar";

export default function AboutPage() {
  return (
    <section className="about--page">
      <div className="card about-card">
        <div className="about-title">
          <i className="bi bi-info-circle" aria-hidden="true" />
          <h1>About Me</h1>
        </div>
        <div className="about-row">
          <div className="profilePhoto">
            <Image
              src="/assets/pf-4.JPG"
              alt="Portrait"
              width={320}
              height={320}
              priority
            />
          </div>
          <div className="about-copy">
            <p>
              Hey! I'm Nicolai Skogstad, a Graduate studying the Masters of Software Engineering at the University of Melbourne
              based in - you guessed it - Melbourne, Australia.
              <br/>
              <br/>
              Some{" "}<a className="card__link" href="projects">notable projects</a>{" "}
              of mine are involved with the University of Melbourne, like a gui made for the{" "}
              <a className="card__link" href="https://www.facebook.com/unimelbrover/" target="_blank" rel="noopener noreferrer">Unimelb Rover Team</a> to facilitate rover to team communication,
              Trained a small CNN to determine fill-level estimation for the Humanoid team in the{" "}
              <a className="card__link" href="https://www.melbournespace.com.au/" target="_blank" rel="noopener noreferrer">Melbourne Space Program</a>.
              <br/>
              <br/>
              Beyond that, I love home labbing, and have been pursuing designing my own network architecture. Also I love playing around with my Raspberry Pi and Arduino,
              as well as reading books, watching films, and writing!

              <br/>
              <br/>
              Outside of software, I enjoy playing badminton, bouldering, organising/participating in university club activities
              ranging from computer-science to taekwondo, as well as spending time with my dog <a className="about--buddy" href="#buddy-info">Buddy</a>.
              I also have a passion for exploring the world in general, stemming from my Norwegian roots! Feel free to contact me if you'd like to connect.
            </p>

            <div className="about--links">
              <a className="card2__item" href="mailto:nicolai@skogstad.com">
                <i className="bi bi-envelope" aria-hidden="true" />
                <span>nicolai@skogstad.com</span>
              </a>
              <i className="bi bi-star-fill"/>
              <a className="card2__item" href="https://www.linkedin.com/in/nicolai-skogstad-8333a221b/" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <i className="bi bi-star-fill"/>
              <a className="card2__item" href="https://github.com/NSkogstad-AUS" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github" aria-hidden="true"/>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="dog-info" id="buddy-info">
        <div className="dog-images">
          <div className="dog-photo">
            <Image
              src="/assets/buddy-1.JPG"
              alt="Buddy the Golden Retriever"
              width={400}
              height={260}
              priority
            />
          </div>
          <div className="dog-photo">
            <Image
              src="/assets/buddy-2.JPG"
              alt="Buddy the Golden Retriever"
              width={400}
              height={260}
              priority
            />
          </div>
          <div className="dog-photo">
            <Image
              src="/assets/buddy-3.jpeg"
              alt="Buddy the Golden Retriever"
              width={400}
              height={260}
              priority
            />
          </div>
        </div>
        <div className="dog-copy">
          <h2>Meet Buddy</h2>
          <p>
            This is Buddy, my Golden Retriever who loves belly rubs and long naps in the sun.
            We both love to go exploring with one another and spending time in the backyard sun bathing.
            Whenever we go for a walk, I always know we'll have an adventure.
          </p>
        </div>
      </div>

      <StatusBar />
    </section>
  );
}

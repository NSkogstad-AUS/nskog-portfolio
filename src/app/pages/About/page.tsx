"use client"
import Image from "next/image";
import "./about.css";

export default function AboutPage() {
  return (
    <section className="about--page">
      <div className="card about-card">
        <h1 className="about-title">About Me</h1>
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
              Some of my most notable projects are involved in 
              <br/>
              <br/>
              Outside of software, I enjoy playing badminton, bouldering, organising/participating in university club activities
              ranging from computer-science to taekwondo related clubs, as well as spending time with my dog Buddy.
              I also have a passion for exploring the world in general, stemming from my Norwegian roots! Feel free to contact me if you'd like to connect.
            </p>
          </div>
        </div>
      </div>

      <div className="dog-info">
        <div className="dog-images">
          <Image
              src="/assets/pf-4.JPG"
              alt="Portrait"
              width={320}
              height={320}
              priority
            />
        </div>
        <h2>Meet Buddy</h2>
        <p>
          This is Buddy, my Shih Tzu who loves belly rubs and long naps in the sun.
          When I'm not coding, you'll probably find me taking him out for a walk
          or teaching him new tricks.
        </p>
      </div>
    </section>
  );
}

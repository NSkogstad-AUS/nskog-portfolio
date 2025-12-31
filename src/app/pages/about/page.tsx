/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./about.css";
import { StatusBar } from "@/app/components/StatusBar";

export default function AboutPage() {
  type FocusedImage = { src: string; rect: DOMRect };
  const [focused, setFocused] = useState<FocusedImage | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  const openLightbox = (src: string, rect: DOMRect) => {
    setFocused({ src, rect });
    setAnimateIn(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimateIn(true));
    });
  };

  const closeLightbox = () => {
    setAnimateIn(false);
    setTimeout(() => setFocused(null), 240);
  };

  useEffect(() => {
    if (!focused) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [focused]);

  return (
    <section className="about--page">
      <div className="card about-card">
        <div className="about-title">
          <i className="bi bi-info-circle" aria-hidden="true" />
          <h1>About Me</h1>
        </div>
        <div className="about-row">
          <button
            className="profilePhoto"
            type="button"
            onClick={(e) => openLightbox("/assets/pf-4.JPG", e.currentTarget.getBoundingClientRect())}
            aria-label="View portrait"
          >
            <Image
              src="/assets/pf-4.JPG"
              alt="Portrait"
              width={320}
              height={320}
              priority
            />
          </button>
          <div className="about-copy">
            <p>
              Hey! I'm Nicolai Skogstad, a Graduate studying the Masters of Software Engineering at the University of Melbourne
              based in - you guessed it - Melbourne, Australia.
              <br/>
              <br/>
              Some{" "}<a className="card__link" href="/pages/projects/">notable projects</a>{" "}
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
          {[
            { src: "/assets/buddy-1.JPG", alt: "Buddy the Golden Retriever" },
            { src: "/assets/buddy-2.JPG", alt: "Buddy the Golden Retriever" },
            { src: "/assets/buddy-3.jpeg", alt: "Buddy the Golden Retriever" },
          ].map((img) => (
            <button
              key={img.src}
              type="button"
              className="dog-photo"
              onClick={(e) => openLightbox(img.src, e.currentTarget.getBoundingClientRect())}
              aria-label={`View ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={260}
                priority
              />
            </button>
          ))}
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

      {focused ? (
        <Lightbox
          src={focused.src}
          originRect={focused.rect}
          animateIn={animateIn}
          onClose={closeLightbox}
        />
      ) : null}
    </section>
  );
}

function Lightbox({
  src,
  originRect,
  animateIn,
  onClose,
}: {
  src: string;
  originRect: DOMRect;
  animateIn: boolean;
  onClose: () => void;
}) {
  const [naturalAspect, setNaturalAspect] = useState<number | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setNaturalAspect(img.naturalWidth / img.naturalHeight);
      }
    };
    img.src = src;
  }, [src]);

  if (typeof window === "undefined") return null;

  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const fallbackAspect = (originRect.width / originRect.height) || 0.75;
  const aspect = naturalAspect ?? fallbackAspect;
  const maxW = Math.min(viewportW * 0.9, 900);
  const maxH = Math.min(viewportH * 0.9, 1100);
  let targetW = maxW;
  let targetH = targetW / aspect;
  if (targetH > maxH) {
    targetH = maxH;
    targetW = targetH * aspect;
  }
  const targetLeft = (viewportW - targetW) / 2;
  const targetTop = (viewportH - targetH) / 2;

  const current = animateIn
    ? {
        top: targetTop,
        left: targetLeft,
        width: targetW,
        height: targetH,
        opacity: 1,
      }
    : {
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        opacity: 0.2,
      };

  return (
    <div className={`about-lightbox${animateIn ? " is-visible" : ""}`} onClick={onClose} role="presentation">
      <div
        className="about-lightbox__card"
        style={{
          top: `${current.top}px`,
          left: `${current.left}px`,
          width: `${current.width}px`,
          height: `${current.height}px`,
          opacity: current.opacity,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="about-lightbox__content">
          <button className="about-lightbox__close" type="button" aria-label="Close image" onClick={onClose}>
            ×
          </button>
          <img src={src} alt="Full view" />
        </div>
      </div>
    </div>
  );
}

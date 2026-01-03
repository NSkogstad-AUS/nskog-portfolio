"use client";

import { useEffect, useState } from "react";
import type { ProjectImage } from "./project-data";

type FocusedImage = { src: string; rect: DOMRect; alt: string };

export function ProjectImageGallery({
  images,
  slug,
}: {
  images: ProjectImage[];
  slug: string;
}) {
  const [focused, setFocused] = useState<FocusedImage | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  const openLightbox = (src: string, rect: DOMRect, alt: string) => {
    setFocused({ src, rect, alt });
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
    <>
      <div className="project-detail__gallery-grid">
        {images.map((image, idx) => (
          <figure key={`${slug}-image-${idx}`} className="project-detail__gallery-figure">
            <button
              className="project-detail__gallery-button"
              type="button"
              onClick={(e) => openLightbox(image.src, e.currentTarget.getBoundingClientRect(), image.alt)}
              aria-label={`View ${image.alt}`}
            >
              <img
                className="project-detail__gallery-image"
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
            </button>
            {image.caption ? (
              <figcaption className="project-detail__gallery-caption">{image.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>
      {focused ? (
        <ProjectLightbox
          src={focused.src}
          alt={focused.alt}
          originRect={focused.rect}
          animateIn={animateIn}
          onClose={closeLightbox}
        />
      ) : null}
    </>
  );
}

function ProjectLightbox({
  src,
  alt,
  originRect,
  animateIn,
  onClose,
}: {
  src: string;
  alt: string;
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
  const fallbackAspect = originRect.width / originRect.height || 0.75;
  const aspect = naturalAspect ?? fallbackAspect;
  const maxW = Math.min(viewportW * 0.9, 980);
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
    <div className={`project-lightbox${animateIn ? " is-visible" : ""}`} onClick={onClose} role="presentation">
      <div
        className="project-lightbox__card"
        style={{
          top: `${current.top}px`,
          left: `${current.left}px`,
          width: `${current.width}px`,
          height: `${current.height}px`,
          opacity: current.opacity,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-lightbox__content">
          <button className="project-lightbox__close" type="button" aria-label="Close image" onClick={onClose}>
            x
          </button>
          <img src={src} alt={alt} />
        </div>
      </div>
    </div>
  );
}

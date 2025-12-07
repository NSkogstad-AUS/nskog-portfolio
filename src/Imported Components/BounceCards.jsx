import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import './BounceCards.css';

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)'
  ],
  enableHover = true
}) {
  const cardRefs = useRef([]);
  const [focused, setFocused] = useState(null);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const closeTimer = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.bounce-card',
      { scale: 0 },
      {
        scale: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay
      }
    );
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = transformStr => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = hoveredIdx => {
    if (!enableHover) return;
    images.forEach((_, i) => {
      const selector = `.bounce-card-${i}`;

      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        const noRotationTransform = getNoRotationTransform(baseTransform);
        gsap.to(selector, {
          transform: noRotationTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto'
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;

        gsap.to(selector, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto'
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover) return;
    images.forEach((_, i) => {
      const selector = `.bounce-card-${i}`;
      gsap.killTweensOf(selector);
      const baseTransform = transformStyles[i] || 'none';
      gsap.to(selector, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto'
      });
    });
  };

  const focusCard = idx => {
    const el = cardRefs.current[idx];
    if (!el || typeof window === 'undefined') return;
    if (closeTimer.current) clearTimeout(closeTimer.current);

    const rect = el.getBoundingClientRect();
    setFocused({ idx, rect });
    setIsAnimatingIn(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsAnimatingIn(true));
    });
  };

  const closeFocus = () => {
    setIsAnimatingIn(false);
    closeTimer.current = window.setTimeout(() => {
      setFocused(null);
    }, 260);
  };

  useEffect(() => {
    if (!focused) return undefined;
    const onKey = e => {
      if (e.key === 'Escape') closeFocus();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [focused]);

  const renderFocusOverlay = () => {
    if (!focused || !hasMounted) return null;
    const { rect, idx } = focused;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const aspect = rect.width / rect.height || 3 / 4;
    const maxW = Math.min(viewportW * 0.88, 820);
    const maxH = Math.min(viewportH * 0.88, 980);
    let targetW = maxW;
    let targetH = targetW / aspect;
    if (targetH > maxH) {
      targetH = maxH;
      targetW = targetH * aspect;
    }
    const targetLeft = (viewportW - targetW) / 2;
    const targetTop = (viewportH - targetH) / 2;

    const currentStyles = isAnimatingIn
      ? {
          top: targetTop,
          left: targetLeft,
          width: targetW,
          height: targetH
        }
      : {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        };

    return createPortal(
      <div
        className={`bounce-focus-backdrop${isAnimatingIn ? ' is-visible' : ''}`}
        onClick={closeFocus}
      >
        <div
          className="bounce-focus-card"
          style={{
            top: `${currentStyles.top}px`,
            left: `${currentStyles.left}px`,
            width: `${currentStyles.width}px`,
            height: `${currentStyles.height}px`
          }}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="bounce-focus-close"
            type="button"
            aria-label="Close focused image"
            onClick={closeFocus}
          >
            ×
          </button>
          <img src={images[idx]} alt={`card-${idx}`} />
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight
      }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`bounce-card bounce-card-${idx}`}
          style={{
            transform: transformStyles[idx] ?? 'none'
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
          onClick={() => focusCard(idx)}
          ref={el => {
            cardRefs.current[idx] = el;
          }}
        >
          <img className="bounce-card__image" src={src} alt={`card-${idx}`} />
        </div>
      ))}
      {renderFocusOverlay()}
    </div>
  );
}

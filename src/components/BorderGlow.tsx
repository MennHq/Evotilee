import React, { useRef, useEffect } from 'react';
import './BorderGlow.css';

export interface BorderGlowProps {
  children?: React.ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
  proximityRadius?: number;
}

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars: Record<string, string> = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors: string[]) {
  const vars: Record<string, string> = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

// Global Shared Pointer Registry for high performance
interface RegisteredCard {
  element: HTMLElement;
  proximityRadius: number;
}
const registeredCards = new Set<RegisteredCard>();
let isGlobalListenerAttached = false;
let rafId: number | null = null;
let lastPointerX = 0;
let lastPointerY = 0;
let isPointerValid = false;

function updateAllCards() {
  rafId = null;
  if (!isPointerValid) return;

  registeredCards.forEach(({ element, proximityRadius }) => {
    if (!element.isConnected) return;
    const rect = element.getBoundingClientRect();
    
    // Quick bounding box check
    if (
      lastPointerX < rect.left - proximityRadius ||
      lastPointerX > rect.right + proximityRadius ||
      lastPointerY < rect.top - proximityRadius ||
      lastPointerY > rect.bottom + proximityRadius
    ) {
      if (element.classList.contains('is-near')) {
        element.classList.remove('is-near');
        element.style.setProperty('--edge-proximity', '0');
      }
      return;
    }

    let dx = 0;
    if (lastPointerX < rect.left) dx = rect.left - lastPointerX;
    else if (lastPointerX > rect.right) dx = lastPointerX - rect.right;

    let dy = 0;
    if (lastPointerY < rect.top) dy = rect.top - lastPointerY;
    else if (lastPointerY > rect.bottom) dy = lastPointerY - rect.bottom;

    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = proximityRadius;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dxCenter = lastPointerX - cx;
    const dyCenter = lastPointerY - cy;
    let degrees = Math.atan2(dyCenter, dxCenter) * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;

    let proximity = 0;
    if (dist === 0) proximity = 100;
    else if (dist < maxDist) {
      proximity = (1 - dist / maxDist) * 100;
    }

    if (proximity > 0) {
      element.classList.add('is-near');
      element.style.setProperty('--edge-proximity', proximity.toFixed(2));
      element.style.setProperty('--cursor-angle', `${degrees.toFixed(2)}deg`);
    } else {
      element.classList.remove('is-near');
      element.style.setProperty('--edge-proximity', '0');
    }
  });
}

function handleGlobalPointerMove(e: PointerEvent) {
  if (
    e.pointerType === 'touch' ||
    window.innerWidth < 768 ||
    window.matchMedia('(pointer: coarse)').matches
  ) {
    isPointerValid = false;
    return;
  }

  isPointerValid = true;
  lastPointerX = e.clientX;
  lastPointerY = e.clientY;

  if (rafId === null) {
    rafId = requestAnimationFrame(updateAllCards);
  }
}

function registerCard(card: RegisteredCard) {
  registeredCards.add(card);
  if (!isGlobalListenerAttached && typeof window !== 'undefined') {
    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true });
    isGlobalListenerAttached = true;
  }
}

function unregisterCard(card: RegisteredCard) {
  registeredCards.delete(card);
  if (registeredCards.size === 0 && isGlobalListenerAttached && typeof window !== 'undefined') {
    window.removeEventListener('pointermove', handleGlobalPointerMove);
    isGlobalListenerAttached = false;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
}

export const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = '',
  edgeSensitivity = 10,
  glowColor = '0 0% 100%',
  backgroundColor = '#0d0d10',
  borderRadius = 24,
  glowRadius = 18,
  glowIntensity = 0.5,
  coneSpread = 25,
  colors = ['#ffffff', '#cbd5e1', '#94a3b8'],
  fillOpacity = 0.06,
  proximityRadius = 160,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const registration: RegisteredCard = {
      element: card,
      proximityRadius,
    };

    registerCard(registration);

    return () => {
      unregisterCard(registration);
    };
  }, [proximityRadius]);

  const glowVars = buildGlowVars(glowColor, glowIntensity);

  return (
    <div
      ref={cardRef}
      className={`border-glow-card ${className}`}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...glowVars,
        ...buildGradientVars(colors),
      } as React.CSSProperties}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;

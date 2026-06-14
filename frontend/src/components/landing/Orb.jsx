import { useEffect, useRef } from 'react';

export default function Orb({ hue = 220, size = 600 }) {
  const orbRef = useRef(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    let mouseX = window.innerWidth * 0.65;
    let mouseY = window.innerHeight * 0.5;
    let currentX = mouseX;
    let currentY = mouseY;
    let animId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // smooth lerp toward mouse
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;

      const rect = orb.parentElement?.getBoundingClientRect();
      if (rect) {
        const relX = ((currentX - rect.left) / rect.width) * 100;
        const relY = ((currentY - rect.top) / rect.height) * 100;

        orb.style.background = `
          radial-gradient(
            circle at ${relX}% ${relY}%,
            #ffffff 0%,
            #00E5FF 20%,
            #00B8D4 50%,
            #007A8A 75%,
            #030712 100%
          )
        `;
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
    };
  }, [hue]);

  return (
    <div
      ref={orbRef}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        filter: 'blur(60px)',
        opacity: 0.55,
        transition: 'opacity 0.3s',
        background: `radial-gradient(circle at 60% 50%, hsl(${hue}, 100%, 75%), hsl(${hue + 140}, 60%, 15%))`,
        flexShrink: 0,
      }}
    />
  );
}

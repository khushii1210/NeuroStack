import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const CONCEPTS = [
  { label: 'React',      color: '#61DAFB' },
  { label: 'JWT',        color: '#adc6ff' },
  { label: 'PostgreSQL', color: '#a78bfa' },
  { label: 'Node.js',    color: '#68A063' },
  { label: 'Prisma',     color: '#ddb7ff' },
  { label: 'TypeScript', color: '#3178C6' },
  { label: 'REST API',   color: '#3cddc7' },
  { label: 'Git',        color: '#F05032' },
];

export default function PhysicsBalls() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    const RADIUS = 40;
    const REPEL_RADIUS = 120;
    const REPEL_FORCE = 0.012;

    const { Engine, Render, Runner, Bodies, Body, Events, World } = Matter;

    const engine = Engine.create({ gravity: { x: 0, y: 0.3 } });

    const render = Render.create({
      element: container,
      engine,
      options: {
        width: W, height: H,
        wireframes: false,
        background: 'transparent',
      },
    });

    // walls — invisible
    const walls = [
      Bodies.rectangle(W / 2, H + 25, W, 50, { isStatic: true, render: { fillStyle: 'transparent', strokeStyle: 'transparent' } }),
      Bodies.rectangle(W / 2, -25,    W, 50, { isStatic: true, render: { fillStyle: 'transparent', strokeStyle: 'transparent' } }),
      Bodies.rectangle(-25,   H / 2, 50,  H, { isStatic: true, render: { fillStyle: 'transparent', strokeStyle: 'transparent' } }),
      Bodies.rectangle(W + 25, H / 2, 50, H, { isStatic: true, render: { fillStyle: 'transparent', strokeStyle: 'transparent' } }),
    ];

    // balls
    const balls = CONCEPTS.map((c) => {
      const x = RADIUS + Math.random() * (W - RADIUS * 2);
      const y = RADIUS + Math.random() * (H * 0.5);
      return Bodies.circle(x, y, RADIUS, {
        restitution: 0.7,
        friction: 0.005,
        frictionAir: 0.015,
        render: {
          fillStyle: c.color + '18',
          strokeStyle: c.color,
          lineWidth: 1.5,
        },
        label: c.label,
        plugin: { color: c.color },
      });
    });

    World.add(engine.world, [...walls, ...balls]);

    // draw labels
    Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      balls.forEach(ball => {
        const { x, y } = ball.position;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ball.angle);
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = ball.plugin.color;
        ctx.fillText(ball.label, 0, 0);
        ctx.restore();
      });
    });

    // mouse repulsion
    let mouseX = -9999;
    let mouseY = -9999;

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => { mouseX = -9999; mouseY = -9999; };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    // apply repulsion every tick
    Events.on(engine, 'beforeUpdate', () => {
      balls.forEach(ball => {
        const dx = ball.position.x - mouseX;
        const dy = ball.position.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
          Body.applyForce(ball, ball.position, {
            x: (dx / dist) * force,
            y: (dy / dist) * force,
          });
        }
      });
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // initial velocity
    balls.forEach(ball => {
      Body.setVelocity(ball, {
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 3,
      });
    });

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      style={{
        width: '100%',
        height: 300,
        borderRadius: 16,
        border: '1px solid #1E293B',
        background: 'rgba(11,19,38,0.6)',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
      }}
    />
  );
}

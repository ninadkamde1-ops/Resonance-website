"use client";

import { useEffect, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
};

type Bolt = {
  points: Point[];
  life: number;
  maxLife: number;
  width: number;
  glow: number;
};

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mouse = useRef({
    x: 0.5,
    y: 0.5,
  });

  const bolts = useRef<Bolt[]>([]);
  const animationFrame = useRef<number | null>(null);
  const nextStrike = useRef(0);

  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    window.addEventListener("resize", resize);

    const handlePointerMove = (event: PointerEvent) => {
      mouse.current.x = event.clientX / width;
      mouse.current.y = event.clientY / height;
    };

    const handlePointerDown = (event: PointerEvent) => {
      const ripple = {
        id: Date.now(),
        x: event.clientX,
        y: event.clientY,
      };

      setRipples((current) => [...current, ripple]);

      setTimeout(() => {
        setRipples((current) =>
          current.filter((item) => item.id !== ripple.id)
        );
      }, 800);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);

    /* ========================================================= */
    /* CREATE LIGHTNING */
    /* ========================================================= */

    const createBolt = () => {
      const startX = Math.random() * width;
      const startY = -40;

      const points: Point[] = [];

      let x = startX;
      let y = startY;

      const segments = 8 + Math.floor(Math.random() * 7);

      for (let i = 0; i < segments; i++) {
        x += (Math.random() - 0.5) * 150;
        y += height / segments + Math.random() * 40;

        points.push({
          x,
          y,
        });
      }

      const bolt: Bolt = {
        points: [
          {
            x: startX,
            y: startY,
          },
          ...points,
        ],
        life: 1,
        maxLife: 1,
        width: 1 + Math.random() * 1.5,
        glow: 15 + Math.random() * 20,
      };

      bolts.current.push(bolt);

      /*
       * Secondary branch.
       */

      if (Math.random() > 0.55) {
        const branchStart =
          bolt.points[
            Math.floor(
              bolt.points.length *
                (0.3 + Math.random() * 0.4)
            )
          ];

        if (branchStart) {
          const branchPoints: Point[] = [branchStart];

          let bx = branchStart.x;
          let by = branchStart.y;

          for (let i = 0; i < 4; i++) {
            bx += (Math.random() - 0.5) * 100;
            by += 50 + Math.random() * 50;

            branchPoints.push({
              x: bx,
              y: by,
            });
          }

          bolts.current.push({
            points: branchPoints,
            life: 0.8,
            maxLife: 0.8,
            width: 0.7,
            glow: 10,
          });
        }
      }
    };

    /* ========================================================= */
    /* DRAW LIGHTNING */
    /* ========================================================= */

    const drawBolt = (bolt: Bolt) => {
      if (bolt.points.length < 2) return;

      ctx.save();

      ctx.globalAlpha = Math.max(bolt.life, 0);

      /*
       * Purple outer atmosphere.
       */

      ctx.beginPath();

      ctx.moveTo(
        bolt.points[0].x,
        bolt.points[0].y
      );

      for (let i = 1; i < bolt.points.length; i++) {
        ctx.lineTo(
          bolt.points[i].x,
          bolt.points[i].y
        );
      }

      ctx.strokeStyle = "#7C3AED";
      ctx.lineWidth = bolt.width * 6;
      ctx.shadowBlur = bolt.glow * 2.5;
      ctx.shadowColor = "#7C3AED";

      ctx.stroke();

      /*
       * Pink energy layer.
       */

      ctx.beginPath();

      ctx.moveTo(
        bolt.points[0].x,
        bolt.points[0].y
      );

      for (let i = 1; i < bolt.points.length; i++) {
        ctx.lineTo(
          bolt.points[i].x,
          bolt.points[i].y
        );
      }

      ctx.strokeStyle = "#FF4F81";
      ctx.lineWidth = bolt.width * 2.5;
      ctx.shadowBlur = bolt.glow * 1.5;
      ctx.shadowColor = "#FF4F81";

      ctx.stroke();

      /*
       * Lime core.
       */

      ctx.beginPath();

      ctx.moveTo(
        bolt.points[0].x,
        bolt.points[0].y
      );

      for (let i = 1; i < bolt.points.length; i++) {
        ctx.lineTo(
          bolt.points[i].x,
          bolt.points[i].y
        );
      }

      ctx.strokeStyle = "#E6FF4A";
      ctx.lineWidth = bolt.width;
      ctx.shadowBlur = bolt.glow;
      ctx.shadowColor = "#E6FF4A";

      ctx.stroke();

      ctx.restore();
    };

    /* ========================================================= */
    /* MAIN ANIMATION */
    /* ========================================================= */

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      /*
       * Mouse-reactive purple atmosphere.
       */

      const gradient = ctx.createRadialGradient(
        mouse.current.x * width,
        mouse.current.y * height,
        0,
        mouse.current.x * width,
        mouse.current.y * height,
        Math.max(width, height) * 0.55
      );

      gradient.addColorStop(
        0,
        "rgba(124,58,237,0.10)"
      );

      gradient.addColorStop(
        0.3,
        "rgba(91,33,182,0.055)"
      );

      gradient.addColorStop(
        0.55,
        "rgba(255,79,129,0.018)"
      );

      gradient.addColorStop(
        1,
        "rgba(18,5,31,0)"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
       * Slow ambient energy lines.
       */

      ctx.save();

      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 1;

      for (let i = 0; i < 6; i++) {
        const y =
          ((time * 0.015 +
            i * (height / 6)) %
            (height + 200)) -
          100;

        ctx.beginPath();

        ctx.moveTo(-100, y);

        ctx.bezierCurveTo(
          width * 0.25,
          y - 100,
          width * 0.65,
          y + 100,
          width + 100,
          y - 50
        );

        if (i % 3 === 0) {
          ctx.strokeStyle = "#E6FF4A";
        } else if (i % 3 === 1) {
          ctx.strokeStyle = "#FF4F81";
        } else {
          ctx.strokeStyle = "#7C3AED";
        }

        ctx.stroke();
      }

      ctx.restore();

      /*
       * Random lightning strikes.
       */

      if (time > nextStrike.current) {
        createBolt();

        nextStrike.current =
          time +
          700 +
          Math.random() * 5000;
      }

      /*
       * Draw and fade lightning.
       */

      bolts.current.forEach((bolt) => {
        drawBolt(bolt);

        bolt.life -= 0.12;
      });

      bolts.current = bolts.current.filter(
        (bolt) => bolt.life > 0
      );

      animationFrame.current =
        requestAnimationFrame(draw);
    };

    nextStrike.current =
      performance.now() + 1800;

    animationFrame.current =
      requestAnimationFrame(draw);

    return () => {
      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      if (animationFrame.current) {
        cancelAnimationFrame(
          animationFrame.current
        );
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* ===================================================== */}
      {/* DEEP PURPLE BASE */}
      {/* ===================================================== */}

      <div className="absolute inset-0 bg-[#12051F]" />

      {/* ===================================================== */}
      {/* PURPLE GRID */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(183,138,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(183,138,255,0.7)_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />

      {/* ===================================================== */}
      {/* LEFT PURPLE ATMOSPHERE */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          -left-40
          top-1/4
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#7C3AED]/[0.08]
          blur-[150px]
        "
      />

      {/* ===================================================== */}
      {/* RIGHT PURPLE ATMOSPHERE */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          right-[-150px]
          top-1/3
          h-[600px]
          w-[600px]
          rounded-full
          bg-[#5B21B6]/[0.10]
          blur-[180px]
        "
      />

      {/* ===================================================== */}
      {/* PINK ATMOSPHERE */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          bottom-[-180px]
          left-1/3
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#FF4F81]/[0.025]
          blur-[170px]
        "
      />

      {/* ===================================================== */}
      {/* LIGHTNING CANVAS */}
      {/* ===================================================== */}

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />

      {/* ===================================================== */}
      {/* MOUSE GLOW */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#7C3AED]/[0.055]
          blur-[130px]
        "
        style={{
          left: `${mouse.current.x * 100}%`,
          top: `${mouse.current.y * 100}%`,
        }}
      />

      {/* ===================================================== */}
      {/* CLICK RIPPLES */}
      {/* ===================================================== */}

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="
            absolute
            h-8
            w-8
            -translate-x-1/2
            -translate-y-1/2
            animate-ping
            rounded-full
            border
            border-[#E6FF4A]/60
          "
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </div>
  );
}
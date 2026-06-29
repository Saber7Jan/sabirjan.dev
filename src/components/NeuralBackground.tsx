import * as React from "react";
import { useEffect, useRef } from "react";

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Labels requested by the user
    const techLabels = [
      "Agentic AI",
      "Multi-Agent Systems",
      "Computer Vision",
      "Deep Learning",
      "Wi-Fi CSI",
      "Emotion Recognition",
      "LangGraph",
      "FastAPI",
      "Gemini",
      "RAG Systems",
      "Adaptive Learning",
      "ESP32",
      "Signal Processing"
    ];

    // Node particle class
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulseTimer: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35; // Slow, intentional movement
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 2 + 1.5;
        this.pulseTimer = Math.random() * Math.PI;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulseTimer += this.pulseSpeed;

        // Bounce off edges smoothly
        if (this.x < 20 || this.x > width - 20) this.vx *= -1;
        if (this.y < 20 || this.y > height - 20) this.vy *= -1;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        const pulse = Math.sin(this.pulseTimer) * 0.4 + 0.6; // opacity scale
        
        // Draw glow halo
        c.beginPath();
        c.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
        c.fillStyle = `rgba(0, 255, 65, ${pulse * 0.08})`;
        c.fill();

        // Draw solid core
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = `rgba(0, 255, 65, ${pulse * 0.7})`;
        c.shadowColor = "#00FF41";
        c.shadowBlur = 6;
        c.fill();
        c.restore();
      }
    }

    // Data packet flow class moving between nodes
    class Packet {
      nodeA: Node;
      nodeB: Node;
      progress: number;
      speed: number;
      size: number;

      constructor(nodeA: Node, nodeB: Node) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.progress = 0;
        this.speed = Math.random() * 0.008 + 0.004; // steady speed
        this.size = Math.random() * 1.5 + 1.5;
      }

      update() {
        this.progress += this.speed;
        return this.progress >= 1;
      }

      draw(c: CanvasRenderingContext2D) {
        const x = this.nodeA.x + (this.nodeB.x - this.nodeA.x) * this.progress;
        const y = this.nodeA.y + (this.nodeB.y - this.nodeA.y) * this.progress;

        c.save();
        c.beginPath();
        c.arc(x, y, this.size, 0, Math.PI * 2);
        c.fillStyle = "#00FF41";
        c.shadowColor = "#00FF41";
        c.shadowBlur = 10;
        c.fill();
        c.restore();
      }
    }

    // Floating tech tags appearing near nodes
    class FloatingLabel {
      text: string;
      x: number;
      y: number;
      opacity: number;
      targetOpacity: number;
      scale: number;
      life: number;
      maxLife: number;
      speedY: number;

      constructor(text: string, x: number, y: number) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.opacity = 0;
        this.targetOpacity = Math.random() * 0.5 + 0.3; // subtle glowing opacity
        this.scale = Math.random() * 0.15 + 0.85;
        this.maxLife = Math.random() * 250 + 180;
        this.life = this.maxLife;
        this.speedY = -Math.random() * 0.12 - 0.04;
      }

      update() {
        this.life--;
        this.y += this.speedY;

        if (this.life > this.maxLife - 40) {
          this.opacity += (this.targetOpacity - this.opacity) * 0.08;
        } else if (this.life < 40) {
          this.opacity += (0 - this.opacity) * 0.12;
        } else {
          this.opacity = this.targetOpacity;
        }

        return this.life <= 0;
      }

      draw(c: CanvasRenderingContext2D) {
        if (this.opacity <= 0) return;
        c.save();
        c.font = `bold ${Math.floor(9 * this.scale)}px "JetBrains Mono", monospace`;
        c.fillStyle = `rgba(0, 255, 65, ${this.opacity})`;
        c.shadowColor = "#00FF41";
        c.shadowBlur = 4;
        
        const textWidth = c.measureText(this.text).width;
        const paddingX = 6;
        const paddingY = 3;
        
        c.strokeStyle = `rgba(0, 255, 65, ${this.opacity * 0.35})`;
        c.lineWidth = 1;
        
        // Draw bracket scanner frame around label
        const bx = this.x - paddingX;
        const by = this.y - 8 - paddingY;
        const bw = textWidth + paddingX * 2;
        const bh = 11 + paddingY * 2;
        
        // Corner segments
        c.beginPath();
        // Top Left
        c.moveTo(bx + 4, by); c.lineTo(bx, by); c.lineTo(bx, by + 4);
        // Top Right
        c.moveTo(bx + bw - 4, by); c.lineTo(bx + bw, by); c.lineTo(bx + bw, by + 4);
        // Bottom Left
        c.moveTo(bx, by + bh - 4); c.lineTo(bx, by + bh); c.lineTo(bx + 4, by + bh);
        // Bottom Right
        c.moveTo(bx + bw - 4, by + bh); c.lineTo(bx + bw, by + bh); c.lineTo(bx + bw, by + bh - 4);
        c.stroke();

        // Scanning cursor effect
        const cursor = this.life % 30 < 15 ? "_" : "";
        c.fillText(this.text + cursor, this.x, this.y);
        c.restore();
      }
    }

    // Initialize systems nodes
    const isMobile = window.innerWidth < 768;
    const maxNodes = isMobile ? 15 : 45;
    const nodeCount = Math.min(maxNodes, Math.floor((width * height) / 20000));
    const nodes: Node[] = Array.from({ length: nodeCount }, () => new Node());
    let packets: Packet[] = [];
    let labels: FloatingLabel[] = [];

    // Faint grid background with high-tech aesthetics
    const drawGridAesthetics = (c: CanvasRenderingContext2D) => {
      c.save();
      c.strokeStyle = "rgba(0, 255, 65, 0.012)";
      c.lineWidth = 0.5;

      const step = isMobile ? 80 : 60;
      // Verticals
      for (let x = 0; x < width; x += step) {
        c.beginPath();
        c.moveTo(x, 0);
        c.lineTo(x, height);
        c.stroke();
      }
      // Horizontals
      for (let y = 0; y < height; y += step) {
        c.beginPath();
        c.moveTo(0, y);
        c.lineTo(width, y);
        c.stroke();
      }

      // Draw subtle telemetry crosshairs in grid intersections - fewer on mobile
      if (!isMobile) {
        c.strokeStyle = "rgba(0, 255, 65, 0.08)";
        for (let x = step * 2; x < width; x += step * 4) {
          for (let y = step * 2; y < height; y += step * 4) {
            c.beginPath();
            c.moveTo(x - 4, y); c.lineTo(x + 4, y);
            c.moveTo(x, y - 4); c.lineTo(x, y + 4);
            c.stroke();
          }
        }
      }
      c.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Tech background
      drawGridAesthetics(ctx);

      // 2. Update and draw nodes
      nodes.forEach((node) => {
        node.update();
        node.draw(ctx);
      });

      // 3. Connect nodes and trigger pathways
      ctx.save();
      const maxPackets = isMobile ? 6 : 20;
      const maxLabels = isMobile ? 2 : 6;
      const maxDist = isMobile ? 110 : 140;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.lineWidth = 0.6;
            ctx.strokeStyle = `rgba(0, 255, 65, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Spawn data packet flow smoothly along pathways
            if (Math.random() < 0.0004 && packets.length < maxPackets) {
              packets.push(new Packet(nodes[i], nodes[j]));
            }

            // Spawn a floating tech label near the node coordinates
            if (Math.random() < 0.00015 && labels.length < maxLabels) {
              const text = techLabels[Math.floor(Math.random() * techLabels.length)];
              // Ensure we don't spawn labels strictly duplicate or in overlapping positions easily
              if (!labels.some(lbl => lbl.text === text)) {
                labels.push(new FloatingLabel(text, nodes[i].x + 10, nodes[i].y - 10));
              }
            }
          }
        }
      }
      ctx.restore();

      // 4. Update and draw data flow packets
      packets = packets.filter((packet) => {
        const finished = packet.update();
        packet.draw(ctx);
        return !finished;
      });

      // 5. Update and draw tech label streams
      labels = labels.filter((label) => {
        const expired = label.update();
        label.draw(ctx);
        return !expired;
      });

      // Occasional safety spawn for floating labels if none exist
      if (labels.length < (isMobile ? 1 : 2) && Math.random() < 0.01) {
        const text = techLabels[Math.floor(Math.random() * techLabels.length)];
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (randomNode) {
          labels.push(new FloatingLabel(text, randomNode.x + 10, randomNode.y - 10));
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle resizing responsive behavior
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-none z-0"
      id="neural-network-canvas"
    />
  );
}

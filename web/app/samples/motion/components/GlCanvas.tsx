import { useEffect, useRef } from "react";
import { createBlob } from "../scene/blob";

export function GlCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvas.current) return;
    return createBlob(canvas.current, reducedMotion);
  }, [reducedMotion]);
  return <canvas ref={canvas} className="gl" />;
}

"use client";

import { useEffect, useRef } from "react";

type SystemMapPanelProps = {
  layers: readonly { name: string }[];
  boundaries: readonly { id: string; between: string; auditQuestion: string }[];
  argument: string;
};

// The only dark surface on the site. It holds the drawing and nothing else —
// see DESIGN.md, "The dark panel".
export function SystemMapPanel({ layers, boundaries, argument }: SystemMapPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || typeof IntersectionObserver === "undefined") return;

    // Arming and revealing are direct DOM mutations, not React state: an
    // effect synchronizing the markers with the browser's observer support,
    // not a render. The markup starts with neither class, so a blocked
    // script or an environment with no IntersectionObserver leaves every
    // marker in its default, fully opaque state.
    const markers = markerRefs.current.filter((el): el is HTMLLIElement => el !== null);
    for (const marker of markers) {
      marker.classList.add("map-boundary-armed");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        markers.forEach((marker, index) => {
          marker.style.transitionDelay = `${index * 80}ms`;
          marker.classList.add("map-boundary-revealed");
        });
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={panelRef} className="flex flex-col gap-8 bg-panel-dark p-6 sm:p-10">
      <ol className="flex flex-col gap-px" data-testid="system-map-layers">
        {layers.map((layer, index) => (
          <li
            key={layer.name}
            className="border border-panel-dark-muted/30 px-4 py-3 font-mono text-sm text-paper"
            style={{ marginInline: `${index * 0.5}rem` }}
          >
            {layer.name}
          </li>
        ))}
      </ol>

      <p className="max-w-xl font-display text-lg text-paper">{argument}</p>

      <ul className="flex flex-col gap-4 border-t border-panel-dark-muted/30 pt-6">
        {boundaries.map((boundary, index) => (
          <li
            key={boundary.id}
            ref={(el) => {
              markerRefs.current[index] = el;
            }}
            className="grid gap-1 sm:grid-cols-[2rem_minmax(0,1fr)]"
          >
            <span aria-hidden="true" className="font-mono text-xs text-p0">{boundary.id}</span>
            <div className="flex flex-col gap-1">
              <p className="font-mono text-sm text-paper">{boundary.between}</p>
              <p className="text-sm leading-relaxed text-panel-dark-muted">{boundary.auditQuestion}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

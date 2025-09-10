"use client";
import { Lock, Unlock } from "lucide-react";
import type { Swatch } from "./types";

export default function SwatchGrid({
  swatches,
  size,
  onCopy,
  onToggleLock,
}: {
  swatches: Swatch[];
  size: number;
  onCopy: (hex: string) => void;
  onToggleLock: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-3">
      {swatches.slice(0, size).map((s, i) => (
        <div key={i} className="rounded-xl overflow-hidden border">
          <button
            className="w-full aspect-square"
            style={{ backgroundColor: s.hex }}
            title="Click to copy HEX"
            onClick={() => onCopy(s.hex)}
          />
          <div className="flex items-center justify-between px-2 py-1">
            <code className="text-xs">{s.hex}</code>
            <button
              className="p-1 rounded hover:bg-muted"
              onClick={() => onToggleLock(i)}
              title={s.locked ? "Unlock" : "Lock"}
            >
              {s.locked ? (
                <Lock className="h-3.5 w-3.5" />
              ) : (
                <Unlock className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

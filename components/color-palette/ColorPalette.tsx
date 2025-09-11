"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ControlsBar from "./ControlsBar";
import SwatchGrid from "./SwatchGrid";
import SavedPalettes from "./SavedPalettes";
import PreviewBox from "./PreviewBox";

import type { Mode, Swatch, SavedPalette } from "./types";
import { uid, paletteFromMode } from "./color-utils";

import { toTailwindTheme } from "@/lib/export-tailwind";

const STORAGE_KEY = "color-palette-saved-v3";

export default function ColorPalette() {
  const [mode, setMode] = useState<Mode>("pastel");
  const [size, setSize] = useState(5);
  const [swatches, setSwatches] = useState<Swatch[]>([]);
  const [saved, setSaved] = useState<SavedPalette[]>([]);
  const [name, setName] = useState("");

  // Load saved
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw)
      try {
        setSaved(JSON.parse(raw));
      } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  // Initial
  useEffect(() => {
    setSwatches(generate(size, mode));
  }, []);

  // On size change
  useEffect(() => {
    setSwatches((prev) => {
      const keep = [...prev].slice(0, size);
      const need = size - keep.length;
      return need > 0
        ? [...keep, ...generate(size, mode).slice(0, need)]
        : keep.slice(0, size);
    });
  }, [size]);

  // On mode change
  useEffect(() => {
    setSwatches((prev) => {
      const fresh = generate(size, mode);
      return prev.map((s, i) => (s?.locked ? s : fresh[i]));
    });
  }, [mode]);

  const preview = useMemo(
    () => ({
      primary: swatches[0]?.hex ?? "#6366f1",
      secondary: swatches[1]?.hex ?? "#22c55e",
      accent: swatches[2]?.hex ?? "#06b6d4",
      surface: swatches[3]?.hex ?? "#111827",
      text: swatches[4]?.hex ?? "#e5e7eb",
    }),
    [swatches]
  );

  function randomize() {
    const fresh = generate(size, mode);
    setSwatches((prev) => prev.map((s, i) => (s.locked ? s : fresh[i])));
  }
  function toggleLock(i: number) {
    setSwatches((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, locked: !s.locked } : s))
    );
  }
  function copyHex(hex: string) {
    navigator.clipboard.writeText(hex).catch(() => {});
  }
  function savePalette() {
    const item: SavedPalette = {
      id: uid(),
      name: name.trim() || `Palette ${new Date().toLocaleString()}`,
      colors: swatches.slice(0, size).map((s) => s.hex),
      mode,
      size,
      createdAt: Date.now(),
    };
    setSaved((p) => [item, ...p]);
    setName("");
  }
  function loadPalette(p: SavedPalette) {
    setMode(p.mode);
    setSize(p.size);
    setSwatches(p.colors.map((hex) => ({ hex, locked: false })));
  }
  function deletePalette(id: string) {
    setSaved((p) => p.filter((x) => x.id !== id));
  }

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8 space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Color Palette Generator
        </h1>
        <p className="text-muted-foreground">
          เลือกโหมดสี ปรับจำนวนสี ล็อกที่ชอบ แล้วสุ่มต่อ • คลิกสีเพื่อคัดลอก HEX
        </p>
      </header>

      <Card>
        <CardContent className="p-4 md:p-6 space-y-4">
          <ControlsBar
            mode={mode}
            size={size}
            onMode={setMode}
            onSize={setSize}
            onRandomize={randomize}
            onScrollPreview={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
          />

          <SwatchGrid
            swatches={swatches}
            size={size}
            onCopy={copyHex}
            onToggleLock={toggleLock}
          />

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ตั้งชื่อ palette (optional)"
              className="max-w-xs"
            />
            <Button onClick={savePalette} className="gap-2">
              Save
            </Button>

            {/* Export Tailwind snippet */}
            <Button
              variant="outline"
              onClick={() => {
                const code = toTailwindTheme(
                  swatches.slice(0, size).map((s) => s.hex)
                );
                navigator.clipboard.writeText(code);
                alert("📋 Tailwind config copied!");
              }}
            >
              Export Tailwind
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 md:p-6">
          <SavedPalettes
            list={saved}
            onLoad={loadPalette}
            onDelete={deletePalette}
            onCopyHex={copyHex}
          />
        </CardContent>
      </Card>

      <PreviewBox
        primary={preview.primary}
        secondary={preview.secondary}
        accent={preview.accent}
        surface={preview.surface}
        text={preview.text}
        onCopy={copyHex}
      />
    </div>
  );
}

/* ---------- local helpers ---------- */
import { type Swatch as SwatchType } from "./types";
function generate(size: number, mode: Mode): SwatchType[] {
  return paletteFromMode(size, mode).map((hex) => ({ hex, locked: false }));
}

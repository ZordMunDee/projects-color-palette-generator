"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCcw, Eye } from "lucide-react";
import type { Mode } from "./types";

export default function ControlsBar({
  mode,
  size,
  onMode,
  onSize,
  onRandomize,
  onScrollPreview,
}: {
  mode: Mode;
  size: number;
  onMode: (m: Mode) => void;
  onSize: (n: number) => void;
  onRandomize: () => void;
  onScrollPreview: () => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="text-sm font-medium">Mode</label>
        <Select value={mode} onValueChange={(v) => onMode(v as Mode)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="เลือกโหมด" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pastel">Pastel</SelectItem>
            <SelectItem value="neon">Neon</SelectItem>
            <SelectItem value="earth">Earth</SelectItem>
            <SelectItem value="mono">Monochrome</SelectItem>
            <SelectItem value="random">Random</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="md:col-span-2">
        <label className="text-sm font-medium">Size: {size}</label>
        <div className="px-2">
          <Slider
            defaultValue={[size]}
            min={3}
            max={8}
            step={1}
            onValueChange={(v) => onSize(v[0] ?? size)}
          />
        </div>
      </div>

      <div className="flex items-end gap-2">
        <Button onClick={onRandomize} className="gap-2">
          <RefreshCcw className="h-4 w-4" /> Randomize
        </Button>
        <Button variant="secondary" className="gap-2" onClick={onScrollPreview}>
          <Eye className="h-4 w-4" /> Preview
        </Button>
      </div>
    </div>
  );
}

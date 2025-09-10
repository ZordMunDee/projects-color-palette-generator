export type Mode = "pastel" | "neon" | "earth" | "mono" | "random";

export type Swatch = { hex: string; locked: boolean };

export type SavedPalette = {
  id: string;
  name: string;
  colors: string[];
  mode: Mode;
  size: number;
  createdAt: number;
};

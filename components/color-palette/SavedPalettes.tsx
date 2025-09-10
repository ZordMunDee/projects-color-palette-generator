"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import type { SavedPalette } from "./types";

export default function SavedPalettes({
  list,
  onLoad,
  onDelete,
  onCopyHex,
}: {
  list: SavedPalette[];
  onLoad: (p: SavedPalette) => void;
  onDelete: (id: string) => void;
  onCopyHex: (hex: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Saved Palettes</h2>
        <Badge variant="secondary">{list.length} item(s)</Badge>
      </div>

      {list.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          ยังไม่มี palette ที่บันทึก
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {list.map((p) => (
            <div key={p.id} className="rounded-xl border overflow-hidden">
              <div className="grid grid-cols-5">
                {p.colors.map((c, idx) => (
                  <button
                    key={idx}
                    className="aspect-[5/4]"
                    style={{ backgroundColor: c }}
                    title={c}
                    onClick={() => onCopyHex(c)}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <div className="min-w-0">
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {p.mode} • {p.size} colors
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onLoad(p)}
                  >
                    Load
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onDelete(p.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

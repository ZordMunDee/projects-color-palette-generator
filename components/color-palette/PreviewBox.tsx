"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PreviewBox({
  primary,
  secondary,
  accent,
  surface,
  text,
  onCopy,
}: {
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  text: string;
  onCopy: (hex: string) => void;
}) {
  return (
    <Card id="preview">
      <CardContent className="p-4 md:p-6 space-y-4">
        <h2 className="text-xl font-semibold">UI Preview</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div
            className="rounded-xl p-4 border"
            style={{ backgroundColor: surface, color: text }}
          >
            <h3 className="text-lg font-semibold">Card Title</h3>
            <p className="text-sm opacity-80">
              Quick preview with your palette colors.
            </p>
            <div className="mt-3 flex gap-2">
              <Button
                style={{ backgroundColor: primary, borderColor: primary }}
                onClick={() => onCopy(primary)}
              >
                Primary
              </Button>
              <Button
                variant="secondary"
                style={{ backgroundColor: secondary, borderColor: secondary }}
                onClick={() => onCopy(secondary)}
              >
                Secondary
              </Button>
            </div>
          </div>

          <div className="rounded-xl p-4 border">
            <h3 className="text-lg font-semibold" style={{ color: primary }}>
              Headings
            </h3>
            <p className="text-sm">Primary: {primary}</p>
            <p className="text-sm">Secondary: {secondary}</p>
          </div>

          <div className="rounded-xl p-4 border">
            <Badge style={{ backgroundColor: accent, borderColor: accent }}>
              Accent
            </Badge>
            <div className="mt-3 flex gap-2">
              {[primary, secondary, accent, surface, text].map((c, i) => (
                <button
                  key={i}
                  className="h-8 w-8 rounded"
                  style={{ backgroundColor: c }}
                  title={c}
                  onClick={() => onCopy(c)}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

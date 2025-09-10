"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { contrastRatio, passesWCAG } from "@/lib/contrast";

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
  // คำนวณคอนทราสต์ "ภายในคอมโพเนนต์" โดยใช้ props
  const ratioTextOnSurface = contrastRatio(text, surface);
  const wcagTextOnSurface = passesWCAG(ratioTextOnSurface);

  const ratioPrimaryOnSurface = contrastRatio(primary, surface);
  const wcagPrimaryOnSurface = passesWCAG(ratioPrimaryOnSurface);

  return (
    <Card id="preview">
      <CardContent className="p-4 md:p-6 space-y-4">
        <h2 className="text-xl font-semibold">UI Preview</h2>

        {/* สรุปค่า Contrast คร่าว ๆ */}
        <div className="text-sm rounded-lg border p-3">
          <div>
            <span className="font-medium">Text on Surface:</span>{" "}
            {ratioTextOnSurface.toFixed(2)}{" "}
            {wcagTextOnSurface.AAA
              ? "– AAA ✅"
              : wcagTextOnSurface.AA
              ? "– AA ✅"
              : wcagTextOnSurface.AA_Large
              ? "– AA Large ✅"
              : "– Fail ❌"}
          </div>
          <div>
            <span className="font-medium">Primary on Surface:</span>{" "}
            {ratioPrimaryOnSurface.toFixed(2)}{" "}
            {wcagPrimaryOnSurface.AAA
              ? "– AAA ✅"
              : wcagPrimaryOnSurface.AA
              ? "– AA ✅"
              : wcagPrimaryOnSurface.AA_Large
              ? "– AA Large ✅"
              : "– Fail ❌"}
          </div>
        </div>

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

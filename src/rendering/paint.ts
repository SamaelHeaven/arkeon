import { Color, ColorString } from "./color";

export type Paint = Color | ColorString;

export type NativePaint = string | CanvasGradient | CanvasPattern;

export namespace PaintUtilities {
    export function nativePaint(paint: Paint): NativePaint {
        if (typeof paint === "string") {
            return paint;
        }
        return paint.toString();
    }
}

import { Color, ColorString } from "./color";
export type Paint = Color | ColorString;
export type NativePaint = string | CanvasGradient | CanvasPattern;
export declare namespace PaintUtilities {
    function nativePaint(paint: Paint): NativePaint;
}

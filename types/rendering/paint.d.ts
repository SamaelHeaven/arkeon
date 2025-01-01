import { Color, ColorString } from "./color";
export type Paint = Color | ColorString;
export type NativePaint = ColorString;
export declare namespace PaintUtilities {
    function nativePaint(paint: Paint): NativePaint;
}

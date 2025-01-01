import clamp = MathUtilities.clamp;
import { MathUtilities } from "../math";

type HexColor = `#${string}`;

type RgbColor = `rgb(${number}, ${number}, ${number})`;

type RgbaColor = `rgba(${number}, ${number}, ${number}, ${number})`;

type HslColor = `hsl(${number}, ${number}%, ${number}%)`;

type HslaColor = `hsla(${number}, ${number}%, ${number}%, ${number})`;

export type ColorString = string & (HexColor | RgbColor | RgbaColor | HslColor | HslaColor);

export class Color {
    public static readonly BLACK: ColorString = "rgb(0, 0, 0)";
    public static readonly WHITE: ColorString = "rgb(255, 255, 255)";
    public static readonly GRAY: ColorString = "rgb(127, 127, 127)";
    public static readonly RED: ColorString = "rgb(255, 0, 0)";
    public static readonly GREEN: ColorString = "rgb(0, 255, 0)";
    public static readonly BLUE: ColorString = "rgb(0, 0, 255)";
    public static readonly YELLOW: ColorString = "rgb(255, 255, 0)";
    public static readonly ORANGE: ColorString = "rgb(255, 165, 0)";
    public static readonly PURPLE: ColorString = "rgb(127, 0, 127)";
    public static readonly TRANSPARENT: ColorString = "rgba(0, 0, 0, 0)";

    public readonly red: number;
    public readonly green: number;
    public readonly blue: number;
    public readonly alpha: number;

    constructor(red: number, green: number, blue: number, alpha: number = 1) {
        this.red = clamp(Math.round(red), 0, 255);
        this.green = clamp(Math.round(green), 0, 255);
        this.blue = clamp(Math.round(blue), 0, 255);
        this.alpha = clamp(alpha, 0, 1);
    }

    public static rgb(r: number, g: number, b: number): ColorString {
        return `rgb(${clamp(r, 0, 255)}, ${clamp(g, 0, 255)}, ${clamp(b, 0, 255)})`;
    }

    public static rgba(r: number, g: number, b: number, a: number): ColorString {
        return `rgba(${clamp(r, 0, 255)}, ${clamp(g, 0, 255)}, ${clamp(b, 0, 255)}, ${clamp(a, 0, 1)})`;
    }

    public static hsl(h: number, s: number, l: number): ColorString {
        return `hsl(${clamp(h, 0, 360)}, ${clamp(s, 0, 100)}%, ${clamp(l, 0, 100)}%)`;
    }

    public static hsla(h: number, s: number, l: number, a: number): ColorString {
        return `hsla(${clamp(h, 0, 360)}, ${clamp(s, 0, 100)}%, ${clamp(l, 0, 100)}%, ${clamp(a, 0, 1)})`;
    }

    public static extract(color: ColorString): Color {
        if (color.startsWith("#")) {
            let hex = color.replace("#", "");
            if (hex.length === 3) {
                hex = hex
                    .split("")
                    .map(c => c + c)
                    .join("");
            }
            if (hex.length === 6 || hex.length === 8) {
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);
                const a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1;
                return new Color(r, g, b, a);
            }
        }
        const rgbMatch = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/.exec(color);
        if (rgbMatch) {
            const r = clamp(parseInt(rgbMatch[1]), 0, 255);
            const g = clamp(parseInt(rgbMatch[2]), 0, 255);
            const b = clamp(parseInt(rgbMatch[3]), 0, 255);
            return new Color(r, g, b);
        }
        const rgbaMatch =
            /^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), ([0-1]?\.\d+|[0-9]{1,3})\)$/.exec(color);
        if (rgbaMatch) {
            const r = clamp(parseInt(rgbaMatch[1]), 0, 255);
            const g = clamp(parseInt(rgbaMatch[2]), 0, 255);
            const b = clamp(parseInt(rgbaMatch[3]), 0, 255);
            const a = clamp(parseFloat(rgbaMatch[4]), 0, 1);
            return new Color(r, g, b, a);
        }
        const hslMatch = /^hsl\((\d{1,3}), (\d{1,3})%, (\d{1,3})%\)$/.exec(color);
        if (hslMatch) {
            const h = clamp(parseInt(hslMatch[1]), 0, 360);
            const s = clamp(parseInt(hslMatch[2]), 0, 100);
            const l = clamp(parseInt(hslMatch[3]), 0, 100);
            return this.fromHsl(h, s, l);
        }
        const hslaMatch =
            /^hsla\((\d{1,3}), (\d{1,3})%, (\d{1,3})%, ([0-1]?\.\d+|[0-9]{1,3})\)$/.exec(color);
        if (hslaMatch) {
            const h = clamp(parseInt(hslaMatch[1]), 0, 360);
            const s = clamp(parseInt(hslaMatch[2]), 0, 100);
            const l = clamp(parseInt(hslaMatch[3]), 0, 100);
            const a = clamp(parseFloat(hslaMatch[4]), 0, 1);
            return this.fromHsla(h, s, l, a);
        }
        return new Color(0, 0, 0);
    }

    public static fromRgb(r: number, g: number, b: number): Color {
        return new Color(r, g, b);
    }

    public static fromRgba(r: number, g: number, b: number, a: number): Color {
        return new Color(r, g, b, a);
    }

    public static fromHsl(h: number, s: number, l: number): Color {
        return this.fromHsla(h, s, l, 1);
    }

    public static fromHsla(h: number, s: number, l: number, a: number): Color {
        const c = (1 - Math.abs((2 * l) / 100 - 1)) * (s / 100);
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l / 100 - c / 2;
        let r = 0,
            g = 0,
            b = 0;

        if (h >= 0 && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (h >= 60 && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (h >= 120 && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (h >= 180 && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (h >= 240 && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else if (h >= 300 && h < 360) {
            r = c;
            g = 0;
            b = x;
        }
        return new Color((r + m) * 255, (g + m) * 255, (b + m) * 255, a);
    }

    public toString(): ColorString {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }
}

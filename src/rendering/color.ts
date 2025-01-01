import { clamp } from "../math";

export type ColorStruct = { r: number; g: number; b: number; a: number };

export type HexColor = `#${string}`;

export type RgbColor = `rgb(${number}, ${number}, ${number})`;

export type RgbaColor = `rgba(${number}, ${number}, ${number}, ${number})`;

export type HslColor = `hsl(${number}, ${number}%, ${number}%)`;

export type HslaColor = `hsla(${number}, ${number}%, ${number}%, ${number})`;

export type Color = HexColor | RgbColor | RgbaColor | HslColor | HslaColor;

export function rgbColor(r: number, g: number, b: number): RgbColor {
    return `rgb(${clamp(r, 0, 255)}, ${clamp(g, 0, 255)}, ${clamp(b, 0, 255)})`;
}

export function rgbaColor(r: number, g: number, b: number, a: number): RgbaColor {
    return `rgba(${clamp(r, 0, 255)}, ${clamp(g, 0, 255)}, ${clamp(b, 0, 255)}, ${clamp(a, 0, 1)})`;
}

export function hslColor(h: number, s: number, l: number): HslColor {
    return `hsl(${clamp(h, 0, 360)}, ${clamp(s, 0, 100)}%, ${clamp(l, 0, 100)}%)`;
}

export function hslaColor(h: number, s: number, l: number, a: number): HslaColor {
    return `hsla(${clamp(h, 0, 360)}, ${clamp(s, 0, 100)}%, ${clamp(l, 0, 100)}%, ${clamp(a, 0, 1)})`;
}

export function extractColor(color: Color): ColorStruct {
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
            return { r, g, b, a };
        }
    }
    const rgbMatch = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/.exec(color);
    if (rgbMatch) {
        const r = clamp(parseInt(rgbMatch[1]), 0, 255);
        const g = clamp(parseInt(rgbMatch[2]), 0, 255);
        const b = clamp(parseInt(rgbMatch[3]), 0, 255);
        return { r, g, b, a: 1 };
    }
    const rgbaMatch = /^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), ([0-1]?\.\d+|[0-9]{1,3})\)$/.exec(
        color
    );
    if (rgbaMatch) {
        const r = clamp(parseInt(rgbaMatch[1]), 0, 255);
        const g = clamp(parseInt(rgbaMatch[2]), 0, 255);
        const b = clamp(parseInt(rgbaMatch[3]), 0, 255);
        const a = clamp(parseFloat(rgbaMatch[4]), 0, 1);
        return { r, g, b, a };
    }
    const hslMatch = /^hsl\((\d{1,3}), (\d{1,3})%, (\d{1,3})%\)$/.exec(color);
    if (hslMatch) {
        const h = clamp(parseInt(hslMatch[1]), 0, 360);
        const s = clamp(parseInt(hslMatch[2]), 0, 100);
        const l = clamp(parseInt(hslMatch[3]), 0, 100);
        return { ...hslToRgb(h, s, l), a: 1 };
    }
    const hslaMatch = /^hsla\((\d{1,3}), (\d{1,3})%, (\d{1,3})%, ([0-1]?\.\d+|[0-9]{1,3})\)$/.exec(
        color
    );
    if (hslaMatch) {
        const h = clamp(parseInt(hslaMatch[1]), 0, 360);
        const s = clamp(parseInt(hslaMatch[2]), 0, 100);
        const l = clamp(parseInt(hslaMatch[3]), 0, 100);
        const a = clamp(parseFloat(hslaMatch[4]), 0, 1);
        return { ...hslToRgb(h, s, l), a };
    }
    return { r: 0, g: 0, b: 0, a: 0 };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
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
    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
    };
}

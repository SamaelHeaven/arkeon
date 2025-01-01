export type ColorStruct = {
    r: number;
    g: number;
    b: number;
    a: number;
};
export type HexColor = `#${string}`;
export type RgbColor = `rgb(${number}, ${number}, ${number})`;
export type RgbaColor = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HslColor = `hsl(${number}, ${number}%, ${number}%)`;
export type HslaColor = `hsla(${number}, ${number}%, ${number}%, ${number})`;
export type Color = HexColor | RgbColor | RgbaColor | HslColor | HslaColor;
export declare function rgbColor(r: number, g: number, b: number): RgbColor;
export declare function rgbaColor(r: number, g: number, b: number, a: number): RgbaColor;
export declare function hslColor(h: number, s: number, l: number): HslColor;
export declare function hslaColor(h: number, s: number, l: number, a: number): HslaColor;
export declare function extractColor(color: Color): ColorStruct;

import { Vec2 } from "../math";
import { Graphics } from "./graphics";
export type NativeTexture = HTMLImageElement | HTMLCanvasElement | OffscreenCanvas;
export declare class Texture {
    private readonly _nativeTexture;
    constructor(nativeTexture: NativeTexture);
    get width(): number;
    get height(): number;
    get size(): Vec2;
}
export declare class WritableTexture extends Texture {
    readonly graphics: Graphics;
    constructor(width: number, height: number);
}

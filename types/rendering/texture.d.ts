import { Vec2 } from "../math";
import { Graphics } from "./graphics";
export type NativeTexture = HTMLImageElement | HTMLCanvasElement | OffscreenCanvas;
export declare class Texture {
    private readonly _nativeTexture;
    readonly position: Vec2;
    readonly size: Vec2;
    constructor(nativeTexture: NativeTexture, position?: Vec2, size?: Vec2);
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
    crop(position: Vec2, size: Vec2): Texture;
}
export declare class WritableTexture extends Texture {
    readonly graphics: Graphics;
    constructor(width: number, height: number);
}

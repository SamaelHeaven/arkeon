import { Vec2 } from "../math";
import { Graphics } from "./graphics";

export type NativeTexture = HTMLImageElement | HTMLCanvasElement | OffscreenCanvas;

export class Texture {
    private readonly _nativeTexture: NativeTexture;

    constructor(nativeTexture: NativeTexture) {
        this._nativeTexture = nativeTexture;
    }

    public get width(): number {
        return this._nativeTexture.width;
    }

    public get height(): number {
        return this._nativeTexture.height;
    }

    public get size(): Vec2 {
        return new Vec2(this.width, this.height);
    }
}

export class WritableTexture extends Texture {
    public readonly graphics: Graphics;

    constructor(width: number, height: number) {
        const canvas = new OffscreenCanvas(width, height);
        super(canvas);
        this.graphics = new Graphics(canvas.getContext("2d")!);
    }
}

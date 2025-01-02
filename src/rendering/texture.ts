import { Vec2 } from "../math";
import { Graphics } from "./graphics";

export type NativeTexture = HTMLImageElement | HTMLCanvasElement | OffscreenCanvas;

export class Texture {
    private readonly _nativeTexture: NativeTexture;
    public readonly position: Vec2;
    public readonly size: Vec2;

    constructor(nativeTexture: NativeTexture, position?: Vec2, size?: Vec2) {
        this._nativeTexture = nativeTexture;
        const textureSize = new Vec2(this._nativeTexture.width, this._nativeTexture.height);
        this.position = position ? position.clamp(0, textureSize) : Vec2.ZERO;
        const maxSize = textureSize.minus(this.position);
        this.size = size ? size.clamp(0, maxSize) : maxSize;
    }

    public get x(): number {
        return this.position.x;
    }

    public get y(): number {
        return this.position.y;
    }

    public get width(): number {
        return this.size.x;
    }

    public get height(): number {
        return this.size.y;
    }

    public crop(position: Vec2, size: Vec2) {
        return new Texture(this._nativeTexture, position, size);
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

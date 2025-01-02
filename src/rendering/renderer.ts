import { Game } from "../core";
import { Graphics } from "./graphics";
import { RenderingContext } from "./rendering-context";

export class Renderer {
    private static _instance: Renderer | null = null;
    private readonly _buffer: OffscreenCanvas;
    private readonly _context: RenderingContext;
    private readonly _graphics: Graphics;
    private _smooth: boolean = true;

    private constructor() {
        Game["_ensureLaunched"]();
        this._buffer = new OffscreenCanvas(
            Game.width * devicePixelRatio,
            Game.height * devicePixelRatio
        );
        this._context = Game.canvas.getContext("2d", { alpha: false })!;
        const bufferContext = this._buffer.getContext("2d", { alpha: false })!;
        bufferContext.scale(devicePixelRatio, devicePixelRatio);
        this._graphics = new Graphics(bufferContext);
    }

    public static get graphics(): Graphics {
        return this._self._graphics;
    }

    public static get smooth(): boolean {
        return this._self._smooth;
    }

    public static set smooth(smooth: boolean) {
        this._self._smooth = smooth;
    }

    private static get _self() {
        return (this._instance ??= new this());
    }

    private _update() {
        const context = this._context;
        const screenSize = Game.screenSize.div(devicePixelRatio);
        const scaleFactor = Game.scaleFactor / devicePixelRatio;
        const size = Game.size.times(scaleFactor);
        const position = screenSize.minus(size).div(2);
        context.imageSmoothingEnabled = this._smooth;
        context.fillStyle = "#000";
        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0.5, 0.5);
        context.fillRect(0, 0, screenSize.x, screenSize.y);
        context.drawImage(this._buffer, position.x, position.y, size.x, size.y);
    }
}

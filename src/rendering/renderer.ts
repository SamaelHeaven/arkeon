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
        const context = this._buffer.getContext("2d", { alpha: false })!;
        context.scale(devicePixelRatio, devicePixelRatio);
        this._context = Game.canvas.getContext("2d", { alpha: false })!;
        this._graphics = new Graphics(context);
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
        const screenSize = Game.screenSize.div(devicePixelRatio);
        const scaleFactor = Game.scaleFactor / devicePixelRatio;
        const size = Game.size.times(scaleFactor);
        const position = screenSize.minus(size).div(2);
        this._context.imageSmoothingEnabled = this._smooth;
        this._context.fillStyle = "#000";
        this._context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        this._context.fillRect(0, 0, screenSize.x, screenSize.y);
        this._context.drawImage(this._buffer, position.x, position.y, size.x, size.y);
    }
}

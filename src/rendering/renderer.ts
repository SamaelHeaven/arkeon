import { Game } from "../core";
import { Graphics } from "./graphics";
import { RenderingContext } from "./rendering-context";

export class Renderer {
    private static _instance: Renderer | null = null;
    private readonly _buffer: OffscreenCanvas;
    private readonly _context: RenderingContext;
    private readonly _graphics: Graphics;

    private constructor() {
        Game["_ensureLaunched"]();
        this._buffer = new OffscreenCanvas(Game.width, Game.height);
        this._context = Game.canvas.getContext("2d")!;
        this._graphics = new Graphics(this._buffer.getContext("2d")!);
    }

    public static get graphics(): Graphics {
        return this._self._graphics;
    }

    private static get _self() {
        return (this._instance ??= new this());
    }

    private _update() {
        const screenSize = Game.screenSize;
        const scaleFactor = Game.scaleFactor;
        const size = Game.size.times(scaleFactor);
        const position = screenSize.minus(size).div(2);
        this._context.fillStyle = "#000";
        this._context.fillRect(0, 0, screenSize.x, screenSize.y);
        this._context.drawImage(this._buffer, position.x, position.y, size.x, size.y);
    }
}

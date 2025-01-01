import { Paint, PaintUtilities } from "./paint";
import { RenderingContext } from "./rendering-context";
import nativePaint = PaintUtilities.nativePaint;

export class Graphics {
    private readonly _context: RenderingContext;

    constructor(renderingContext: RenderingContext) {
        this._context = renderingContext;
    }

    public get width(): number {
        return this._context.canvas.width;
    }

    public get height(): number {
        return this._context.canvas.height;
    }

    public clear(paint: Paint) {
        this._context.fillStyle = nativePaint(paint);
        this._context.fillRect(0, 0, this.width, this.height);
    }
}
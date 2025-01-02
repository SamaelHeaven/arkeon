import { MathUtilities, Vec2 } from "../math";
import { Paint, PaintUtilities } from "./paint";
import { RenderingContext } from "./rendering-context";
import nativePaint = PaintUtilities.nativePaint;
import degreesToRadians = MathUtilities.degreesToRadians;

type RenderingState = {
    matrix: DOMMatrix;
};

export class Graphics {
    private readonly _context: RenderingContext;
    private _states: RenderingState[] = [];

    constructor(renderingContext: RenderingContext) {
        this._context = renderingContext;
    }

    public get width(): number {
        return this._context.canvas.width;
    }

    public get height(): number {
        return this._context.canvas.height;
    }

    public get size(): Vec2 {
        return new Vec2(this.width, this.height);
    }

    public rotate(angle: number) {
        this._context.rotate(degreesToRadians(angle));
    }

    public translate(position: Vec2) {
        this._context.translate(position.x, position.y);
    }

    public scale(scale: Vec2) {
        this._context.scale(scale.x, scale.y);
    }

    public pushState() {
        this._states.push({
            matrix: this._context.getTransform()
        });
    }

    public popState() {
        const state = this._states.pop();
        if (state) {
            this._context.setTransform(state.matrix);
        }
    }

    public clear(paint: Paint) {
        this._context.fillStyle = nativePaint(paint);
        this._context.fillRect(0, 0, this.width, this.height);
    }

    public fillRect(position: Vec2, size: Vec2, paint: Paint) {
        this._context.fillStyle = nativePaint(paint);
        this._context.fillRect(position.x, position.y, size.x, size.y);
    }

    public strokeRect(position: Vec2, size: Vec2, paint: Paint, strokeWidth: number = 1) {
        this._context.strokeStyle = nativePaint(paint);
        this._context.lineWidth = strokeWidth;
        this._context.lineCap = "square";
        this._context.lineJoin = "miter";
        this._context.strokeRect(position.x, position.y, size.x, size.y);
    }

    public fillRoundRect(
        position: Vec2,
        size: Vec2,
        paint: Paint,
        radius: number | [number, number, number, number]
    ) {
        this._context.fillStyle = nativePaint(paint);
        this._context.beginPath();
        this._context.roundRect(position.x, position.y, size.x, size.y, radius);
        this._context.fill();
    }

    public strokeRoundRect(
        position: Vec2,
        size: Vec2,
        paint: Paint,
        radius: number | [number, number, number, number],
        strokeWidth: number = 1
    ) {
        this._context.strokeStyle = nativePaint(paint);
        this._context.lineWidth = strokeWidth;
        this._context.lineCap = "round";
        this._context.lineJoin = "round";
        this._context.beginPath();
        this._context.roundRect(position.x, position.y, size.x, size.y, radius);
        this._context.stroke();
    }
}

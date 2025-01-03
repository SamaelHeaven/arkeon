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
        renderingContext.translate(0.5, 0.5);
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
        const context = this._context;
        context.fillStyle = nativePaint(paint);
        context.fillRect(0, 0, this.width, this.height);
    }

    public fillRect(position: Vec2, size: Vec2, paint: Paint) {
        const context = this._context;
        context.fillStyle = nativePaint(paint);
        context.fillRect(
            Math.round(position.x),
            Math.round(position.y),
            Math.round(size.x),
            Math.round(size.y)
        );
    }

    public strokeRect(position: Vec2, size: Vec2, paint: Paint, strokeWidth: number = 1) {
        const context = this._context;
        context.strokeStyle = nativePaint(paint);
        context.lineWidth = strokeWidth;
        context.lineCap = "square";
        context.lineJoin = "miter";
        context.strokeRect(
            Math.round(position.x),
            Math.round(position.y),
            Math.round(size.x),
            Math.round(size.y)
        );
    }

    public fillRoundRect(
        position: Vec2,
        size: Vec2,
        paint: Paint,
        radius: number | [number, number, number, number]
    ) {
        const context = this._context;
        context.fillStyle = nativePaint(paint);
        context.beginPath();
        context.roundRect(
            Math.round(position.x),
            Math.round(position.y),
            Math.round(size.x),
            Math.round(size.y),
            radius
        );
        context.fill();
    }

    public strokeRoundRect(
        position: Vec2,
        size: Vec2,
        paint: Paint,
        radius: number | [number, number, number, number],
        strokeWidth: number = 1
    ) {
        const context = this._context;
        context.strokeStyle = nativePaint(paint);
        context.lineWidth = strokeWidth;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.beginPath();
        context.roundRect(
            Math.round(position.x),
            Math.round(position.y),
            Math.round(size.x),
            Math.round(size.y),
            radius
        );
        context.stroke();
    }
}

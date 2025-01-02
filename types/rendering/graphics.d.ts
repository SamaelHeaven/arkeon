import { Vec2 } from "../math";
import { Paint } from "./paint";
import { RenderingContext } from "./rendering-context";
export declare class Graphics {
    private readonly _context;
    private _states;
    constructor(renderingContext: RenderingContext);
    get width(): number;
    get height(): number;
    get size(): Vec2;
    rotate(angle: number): void;
    translate(position: Vec2): void;
    scale(scale: Vec2): void;
    pushState(): void;
    popState(): void;
    clear(paint: Paint): void;
    fillRect(position: Vec2, size: Vec2, paint: Paint): void;
    strokeRect(position: Vec2, size: Vec2, paint: Paint, strokeWidth?: number): void;
    fillRoundRect(position: Vec2, size: Vec2, paint: Paint, radius: number | [number, number, number, number]): void;
    strokeRoundRect(position: Vec2, size: Vec2, paint: Paint, radius: number | [number, number, number, number], strokeWidth?: number): void;
}

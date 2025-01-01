import { Paint } from "./paint";
import { RenderingContext } from "./rendering-context";
export declare class Graphics {
    private readonly _context;
    constructor(renderingContext: RenderingContext);
    get width(): number;
    get height(): number;
    clear(paint: Paint): void;
}

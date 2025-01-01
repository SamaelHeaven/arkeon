import { Graphics } from "./graphics";
export declare class Renderer {
    private static _instance;
    private readonly _buffer;
    private readonly _context;
    private readonly _graphics;
    private constructor();
    static get graphics(): Graphics;
    private static get _self();
    private _update;
}

import { Graphics } from "./graphics";
export declare class Renderer {
    private static _instance;
    private readonly _buffer;
    private readonly _context;
    private readonly _graphics;
    private _smooth;
    private constructor();
    static get graphics(): Graphics;
    static get smooth(): boolean;
    static set smooth(smooth: boolean);
    private static get _self();
    private _update;
}

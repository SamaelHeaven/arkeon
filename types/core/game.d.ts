import { GameOptions } from "./game-options";
import { Scene } from "./scene";
export declare class Game {
    private static _instanceRef;
    private static _launched;
    private readonly _time;
    private _root;
    private _canvas;
    private _scene;
    private _width;
    private _height;
    private constructor();
    static get root(): HTMLElement;
    static get canvas(): HTMLCanvasElement;
    static get scene(): Scene;
    static set scene(scene: Scene);
    static get width(): number;
    static get height(): number;
    static launch(options: GameOptions): void;
    private static get _instance();
    private static _ensureNotLaunched;
    private static _ensureLaunched;
    private _launch;
    private _initialize;
    private _initializeCanvas;
    private _initializeRoot;
    private _start;
    private _update;
    private _frame;
}
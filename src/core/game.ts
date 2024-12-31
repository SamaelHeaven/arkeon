import { Keyboard, Mouse } from "../input";
import { Time } from "../time";
import { GameOptions } from "./game-options";
import { Scene } from "./scene";

export class Game {
    private static _instance: Game | null = null;
    private static _launched = false;
    private _time: Time = null!;
    private _keyboard: Keyboard = null!;
    private _mouse: Mouse = null!;
    private _canvas: HTMLCanvasElement = null!;
    private _scene: Scene = null!;
    private _width: number = 0;
    private _height: number = 0;

    private constructor() {
        Game._ensureLaunched();
    }

    public static get focused(): boolean {
        return document.activeElement === this._self._canvas;
    }

    public static get canvas() {
        return this._self._canvas;
    }

    public static get scene() {
        return this._self._scene;
    }

    public static set scene(scene: Scene) {
        this._self._scene = scene;
    }

    public static get width() {
        return this._self._width;
    }

    public static get screenWidth() {
        return this._self._canvas.width;
    }

    public static get height() {
        return this._self._height;
    }

    public static get screenHeight() {
        return this._self._canvas.height;
    }

    public static launch(options: GameOptions) {
        this._ensureNotLaunched();
        this._launched = true;
        this._self._launch(options);
    }

    private static get _self() {
        return (this._instance ??= new this());
    }

    private static _ensureNotLaunched() {
        if (this._launched) {
            throw new Error("Game has already been launched");
        }
    }

    private static _ensureLaunched() {
        if (!this._launched) {
            throw new Error("Game has not been launched");
        }
    }

    private _launch(options: GameOptions) {
        this._scene = options.scene;
        this._canvas = options.canvas;
        this._width = options.width ?? 800;
        this._height = options.height ?? 600;
        this._initialize();
        this._start();
    }

    private _initialize() {
        this._initializeCanvas();
        this._time = Time["_self"];
        this._keyboard = Keyboard["_self"];
        this._mouse = Mouse["_self"];
    }

    private _initializeCanvas() {
        this._resizeCanvas();
        const resizeObserver = new ResizeObserver(() => this._resizeCanvas());
        resizeObserver.observe(this._canvas.parentElement!);
        this._canvas.tabIndex = 0;
        this._canvas.oncontextmenu = () => false;
        this._canvas.focus();
    }

    private _start() {
        this._scene["_initialize"]().then(() => this._frame());
    }

    private _update() {
        const scene = this._scene;
        this._time["_update"]();
        this._keyboard["_update"]();
        this._mouse["_update"]();
        scene.update();
        return this._nextFrame(scene);
    }

    private _nextFrame(scene: Scene) {
        if (this._scene === scene) {
            return this._frame();
        }
        scene.stop();
        return this._scene["_initialize"]().then(() => {
            this._time["_restart"]();
            return this._frame();
        });
    }

    private _frame() {
        return new Promise(resolve => requestAnimationFrame(() => this._update().then(resolve)));
    }

    private _resizeCanvas() {
        const { width, height } = this._canvas.parentElement!.getBoundingClientRect();
        this._canvas.width = width;
        this._canvas.height = height;
    }
}

import { Keyboard, Mouse } from "../input";
import { Vec2 } from "../math/";
import { Renderer } from "../rendering";
import { Time } from "../time";
import { GameOptions } from "./game-options";
import { Scene } from "./scene";

export class Game {
    private static _instance: Game | null = null;
    private static _launched: boolean = false;
    private _time: Time = null!;
    private _keyboard: Keyboard = null!;
    private _mouse: Mouse = null!;
    private _renderer: Renderer = null!;
    private _canvas: HTMLCanvasElement = null!;
    private _scene: Scene = null!;
    private _size: Vec2 = null!;
    private _shouldResize: boolean = false;

    private constructor() {
        Game._ensureLaunched();
    }

    public static get focused(): boolean {
        return document.activeElement === this._self._canvas;
    }

    public static get canvas(): HTMLCanvasElement {
        return this._self._canvas;
    }

    public static get scene(): Scene {
        return this._self._scene;
    }

    public static set scene(scene: Scene) {
        this._self._scene = scene;
    }

    public static get width(): number {
        return this._self._size.x;
    }

    public static get height(): number {
        return this._self._size.y;
    }

    public static get size(): Vec2 {
        return this._self._size;
    }

    public static get screenWidth(): number {
        return this._self._canvas.width;
    }

    public static get screenHeight(): number {
        return this._self._canvas.height;
    }

    public static get screenSize(): Vec2 {
        const self = this._self;
        return new Vec2(self._canvas.width, self._canvas.height);
    }

    public static get scaleFactor(): number {
        const self = this._self;
        return Math.min(self._canvas.width / self._size.x, self._canvas.height / self._size.y);
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
        this._size = new Vec2(options.width ?? 800, options.height ?? 600);
        this._initialize();
        this._start();
    }

    private _initialize() {
        this._initializeCanvas();
        this._time = Time["_self"];
        this._keyboard = Keyboard["_self"];
        this._mouse = Mouse["_self"];
        this._renderer = Renderer["_self"];
    }

    private _initializeCanvas() {
        this._resizeCanvas();
        const resizeObserver = new ResizeObserver(() => (this._shouldResize = true));
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
        this._handleResizing();
        this._renderer["_update"]();
        return this._nextFrame(scene);
    }

    private _nextFrame(scene: Scene) {
        if (this._scene === scene) {
            return this._frame();
        }
        return this._scene["_initialize"]().then(() => {
            this._time["_restart"]();
            return this._frame();
        });
    }

    private _frame() {
        return new Promise(resolve => requestAnimationFrame(() => this._update().then(resolve)));
    }

    private _handleResizing() {
        if (this._shouldResize) {
            this._shouldResize = false;
            this._resizeCanvas();
        }
    }

    private _resizeCanvas() {
        const rect = this._canvas.parentElement!.getBoundingClientRect();
        const width = Math.ceil(rect.width * devicePixelRatio);
        const height = Math.ceil(rect.height * devicePixelRatio);
        this._canvas.width = width;
        this._canvas.height = height;
        this._canvas.style.width = `${width / devicePixelRatio}px`;
        this._canvas.style.height = `${height / devicePixelRatio}px`;
    }
}

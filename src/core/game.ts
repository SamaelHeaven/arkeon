import { GameOptions } from "./game-options";
import { Scene } from "./scene";
import { Time } from "./time";

export class Game {
    private static _instanceRef: Game | null = null;
    private static _launched = false;
    private readonly _time = Time["_instance"];
    private _root: HTMLElement = null!;
    private _canvas: HTMLCanvasElement = null!;
    private _scene: Scene = null!;
    private _width: number = 0;
    private _height: number = 0;

    private constructor() {
        Game._ensureLaunched();
    }

    public static get root() {
        return this._instance._root;
    }

    public static get canvas() {
        return this._instance._canvas;
    }

    public static get scene() {
        return this._instance._scene;
    }

    public static set scene(scene: Scene) {
        this._instance._scene = scene;
    }

    public static get width() {
        return this._instance._width;
    }

    public static get height() {
        return this._instance._height;
    }

    public static launch(options: GameOptions) {
        this._ensureNotLaunched();
        this._launched = true;
        this._instance._launch(options);
    }

    private static get _instance() {
        return (this._instanceRef ??= new this());
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
        this._root = options.rootEl;
        this._width = options.width ?? 800;
        this._height = options.height ?? 600;
        this._initialize();
        this._start();
    }

    private _initialize() {
        this._initializeCanvas();
        this._initializeRoot();
    }

    private _initializeCanvas() {
        this._canvas = document.createElement("canvas");
        this._canvas.width = this._width;
        this._canvas.height = this._height;
    }

    private _initializeRoot() {
        this._root.appendChild(this._canvas);
    }

    private _start() {
        this._scene["_initialize"]().then(() => this._frame());
    }

    private _update() {
        this._time["_update"]();
        const scene = this._scene;
        scene.update();
        return this._frame().then(() => {
            if (this._scene === scene) {
                return;
            }
            scene.stop();
            return this._scene["_initialize"]().then(() => {
                this._time["_restart"]();
            });
        });
    }

    private _frame() {
        return new Promise(resolve => requestAnimationFrame(() => this._update().then(resolve)));
    }
}

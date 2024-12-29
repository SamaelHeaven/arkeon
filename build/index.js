const units = {
    nanoseconds: 1,
    microseconds: 1e3,
    milliseconds: 1e6,
    seconds: 1e9,
    minutes: 60 * 1e9,
    hours: 60 * 60 * 1e9,
    days: 24 * 60 * 60 * 1e9
};
class Duration {
    constructor(value, unit) {
        this._nanoseconds = value * units[unit];
    }
    static fromNanoseconds(value) {
        return new Duration(value, "nanoseconds");
    }
    static fromMicroseconds(value) {
        return new Duration(value, "microseconds");
    }
    static fromMilliseconds(value) {
        return new Duration(value, "milliseconds");
    }
    static fromSeconds(value) {
        return new Duration(value, "seconds");
    }
    static fromMinutes(value) {
        return new Duration(value, "minutes");
    }
    static fromHours(value) {
        return new Duration(value, "hours");
    }
    static fromDays(value) {
        return new Duration(value, "days");
    }
    to(unit) {
        return this._nanoseconds / units[unit];
    }
    get nanoseconds() {
        return this.to("nanoseconds");
    }
    get microseconds() {
        return this.to("microseconds");
    }
    get milliseconds() {
        return this.to("milliseconds");
    }
    get seconds() {
        return this.to("seconds");
    }
    get minutes() {
        return this.to("minutes");
    }
    get hours() {
        return this.to("hours");
    }
    get days() {
        return this.to("days");
    }
    add(other) {
        return new Duration(this._nanoseconds + other._nanoseconds, "nanoseconds");
    }
    subtract(other) {
        return new Duration(this._nanoseconds - other._nanoseconds, "nanoseconds");
    }
    toString() {
        const days = Math.floor(this.days);
        const hours = Math.floor(this.hours % 24);
        const minutes = Math.floor(this.minutes % 60);
        const seconds = Math.floor(this.seconds % 60);
        const milliseconds = Math.floor(this.milliseconds % 1000);
        const parts = [];
        days && parts.push(`${days}d`);
        hours && parts.push(`${hours}h`);
        minutes && parts.push(`${minutes}m`);
        seconds && parts.push(`${seconds}s`);
        milliseconds && parts.push(`${milliseconds}ms`);
        return parts.length > 0 ? parts.join(" ") : "0ms";
    }
}

class Time {
    constructor() {
        this._launchTime = performance.now();
        this._fixedDelta = 1 / 60;
        this._startTime = this._launchTime;
        this._lastFrameTime = 0;
        this._frameCount = 0;
        this._delta = 0;
        this._averageFPS = 0;
        Game["_ensureLaunched"]();
    }
    static get elapsed() {
        return Duration.fromMilliseconds(performance.now() - this._self._launchTime);
    }
    static get delta() {
        return this._self._delta;
    }
    static get fixedDelta() {
        return this._self._fixedDelta;
    }
    static get averageFPS() {
        return this._self._averageFPS;
    }
    static get currentFPS() {
        const instance = this._self;
        return instance._delta <= 0 ? 0 : 1 / instance._delta;
    }
    static get _self() {
        return (this._instance ?? (this._instance = new this()));
    }
    _update() {
        const ticks = performance.now() - this._startTime;
        this._frameCount++;
        this._delta = (ticks - this._lastFrameTime) / 1e3;
        const timeInSeconds = ticks / 1e3;
        this._averageFPS = timeInSeconds === 0 ? 0 : this._frameCount / timeInSeconds;
        this._lastFrameTime = ticks;
    }
    _restart() {
        this._startTime = performance.now();
        this._lastFrameTime = 0;
        this._frameCount = 0;
        this._delta = 0;
        this._averageFPS = 0;
    }
}
Time._instance = null;

class Game {
    constructor() {
        this._time = Time["_self"];
        this._root = null;
        this._canvas = null;
        this._scene = null;
        this._width = 0;
        this._height = 0;
        Game._ensureLaunched();
    }
    static get root() {
        return this._self._root;
    }
    static get canvas() {
        return this._self._canvas;
    }
    static get scene() {
        return this._self._scene;
    }
    static set scene(scene) {
        this._self._scene = scene;
    }
    static get width() {
        return this._self._width;
    }
    static get height() {
        return this._self._height;
    }
    static launch(options) {
        this._ensureNotLaunched();
        this._launched = true;
        this._self._launch(options);
    }
    static get _self() {
        return (this._instance ?? (this._instance = new this()));
    }
    static _ensureNotLaunched() {
        if (this._launched) {
            throw new Error("Game has already been launched");
        }
    }
    static _ensureLaunched() {
        if (!this._launched) {
            throw new Error("Game has not been launched");
        }
    }
    _launch(options) {
        this._scene = options.scene;
        this._root = options.rootEl;
        this._width = options.width ?? 800;
        this._height = options.height ?? 600;
        this._initialize();
        this._start();
    }
    _initialize() {
        this._initializeCanvas();
        this._initializeRoot();
    }
    _initializeCanvas() {
        this._canvas = document.createElement("canvas");
        this._canvas.width = this._width;
        this._canvas.height = this._height;
    }
    _initializeRoot() {
        this._root.appendChild(this._canvas);
    }
    _start() {
        this._scene["_initialize"]().then(() => this._frame());
    }
    _update() {
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
    _frame() {
        return new Promise(resolve => requestAnimationFrame(() => this._update().then(resolve)));
    }
}
Game._instance = null;
Game._launched = false;

class Scene {
    constructor() {
        this._initialized = false;
    }
    async _initialize() {
        if (!this._initialized) {
            this._initialized = true;
            await this.initialize();
        }
        return this.start();
    }
}

export { Duration, Game, Scene, Time };

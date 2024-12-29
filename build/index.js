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
        const self = this._self;
        return self._delta <= 0 ? 0 : 1 / self._delta;
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

var Key;
(function (Key) {
    Key["Unidentified"] = "Unidentified";
    Key["Pause"] = "Pause";
    Key["Backspace"] = "Backspace";
    Key["Tab"] = "Tab";
    Key["NumLock"] = "NumLock";
    Key["Enter"] = "Enter";
    Key["ShiftLeft"] = "ShiftLeft";
    Key["ShiftRight"] = "ShiftRight";
    Key["ControlLeft"] = "ControlLeft";
    Key["ControlRight"] = "ControlRight";
    Key["AltLeft"] = "AltLeft";
    Key["AltRight"] = "AltRight";
    Key["CapsLock"] = "CapsLock";
    Key["Lang1"] = "Lang1";
    Key["Lang2"] = "Lang2";
    Key["Escape"] = "Escape";
    Key["Space"] = "Space";
    Key["Numpad9"] = "Numpad9";
    Key["Numpad3"] = "Numpad3";
    Key["Numpad1"] = "Numpad1";
    Key["Numpad7"] = "Numpad7";
    Key["Left"] = "ArrowLeft";
    Key["Up"] = "ArrowUp";
    Key["Right"] = "ArrowRight";
    Key["Down"] = "ArrowDown";
    Key["F13"] = "F13";
    Key["Numpad0"] = "Numpad0";
    Key["NumpadDecimal"] = "NumpadDecimal";
    Key["Digit0"] = "Digit0";
    Key["Digit1"] = "Digit1";
    Key["Digit2"] = "Digit2";
    Key["Digit3"] = "Digit3";
    Key["Digit4"] = "Digit4";
    Key["Digit5"] = "Digit5";
    Key["Digit6"] = "Digit6";
    Key["Digit7"] = "Digit7";
    Key["Digit8"] = "Digit8";
    Key["Digit9"] = "Digit9";
    Key["Period"] = "Period";
    Key["Semicolon"] = "Semicolon";
    Key["Backquote"] = "Backquote";
    Key["Equal"] = "Equal";
    Key["Minus"] = "Minus";
    Key["A"] = "KeyA";
    Key["B"] = "KeyB";
    Key["C"] = "KeyC";
    Key["D"] = "KeyD";
    Key["E"] = "KeyE";
    Key["F"] = "KeyF";
    Key["G"] = "KeyG";
    Key["H"] = "KeyH";
    Key["I"] = "KeyI";
    Key["J"] = "KeyJ";
    Key["K"] = "KeyK";
    Key["L"] = "KeyL";
    Key["M"] = "KeyM";
    Key["N"] = "KeyN";
    Key["O"] = "KeyO";
    Key["P"] = "KeyP";
    Key["Q"] = "KeyQ";
    Key["R"] = "KeyR";
    Key["S"] = "KeyS";
    Key["T"] = "KeyT";
    Key["U"] = "KeyU";
    Key["V"] = "KeyV";
    Key["W"] = "KeyW";
    Key["X"] = "KeyX";
    Key["Y"] = "KeyY";
    Key["Z"] = "KeyZ";
    Key["MetaLeft"] = "MetaLeft";
    Key["MetaRight"] = "MetaRight";
    Key["ContextMenu"] = "ContextMenu";
    Key["NumpadMultiply"] = "NumpadMultiply";
    Key["NumpadAdd"] = "NumpadAdd";
    Key["NumpadSubtract"] = "NumpadSubtract";
    Key["NumpadDivide"] = "NumpadDivide";
    Key["F1"] = "F1";
    Key["F2"] = "F2";
    Key["F3"] = "F3";
    Key["F4"] = "F4";
    Key["F5"] = "F5";
    Key["F6"] = "F6";
    Key["F7"] = "F7";
    Key["F8"] = "F8";
    Key["F9"] = "F9";
    Key["F10"] = "F10";
    Key["F11"] = "F11";
    Key["F12"] = "F12";
    Key["F14"] = "F14";
    Key["F15"] = "F15";
    Key["F16"] = "F16";
    Key["F17"] = "F17";
    Key["F18"] = "F18";
    Key["F19"] = "F19";
    Key["F20"] = "F20";
    Key["F21"] = "F21";
    Key["F22"] = "F22";
    Key["F23"] = "F23";
    Key["F24"] = "F24";
    Key["F25"] = "F25";
    Key["F26"] = "F26";
    Key["F27"] = "F27";
    Key["F28"] = "F28";
    Key["F29"] = "F29";
    Key["F30"] = "F30";
    Key["F31"] = "F31";
    Key["F32"] = "F32";
    Key["ScrollLock"] = "ScrollLock";
    Key["BracketLeft"] = "BracketLeft";
    Key["BracketRight"] = "BracketRight";
    Key["Backslash"] = "Backslash";
    Key["Quote"] = "Quote";
    Key["MediaTrackNext"] = "MediaTrackNext";
    Key["MediaTrackPrevious"] = "MediaTrackPrevious";
    Key["VolumeMute"] = "VolumeMute";
    Key["VolumeDown"] = "VolumeDown";
    Key["VolumeUp"] = "VolumeUp";
    Key["Comma"] = "Comma";
    Key["Slash"] = "Slash";
    Key["IntlBackslash"] = "IntlBackslash";
    Key["IntlRo"] = "IntlRo";
    Key["NumpadComma"] = "NumpadComma";
    Key["OSLeft"] = "OSLeft";
    Key["WakeUp"] = "WakeUp";
})(Key || (Key = {}));

export { Duration, Game, Key, Scene, Time };

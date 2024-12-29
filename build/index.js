class Collection {
    constructor() { }
    static addAll(destination, elements) {
        if (destination instanceof Set) {
            for (const element of elements) {
                destination.add(element);
            }
            return destination;
        }
        for (const element of elements) {
            destination.push(element);
        }
        return destination;
    }
    static removeAll(destination, elements) {
        if (destination instanceof Set) {
            for (const element of elements) {
                destination.delete(element);
            }
            return destination;
        }
        const set = new Set(elements);
        for (let i = destination.length - 1; i >= 0; i--) {
            if (set.has(destination[i])) {
                destination.splice(i, 1);
            }
        }
        return destination;
    }
}

var DurationUnit;
(function (DurationUnit) {
    DurationUnit[DurationUnit["Nanoseconds"] = 1] = "Nanoseconds";
    DurationUnit[DurationUnit["Microseconds"] = 1000] = "Microseconds";
    DurationUnit[DurationUnit["Milliseconds"] = 1000000] = "Milliseconds";
    DurationUnit[DurationUnit["Seconds"] = 1000000000] = "Seconds";
    DurationUnit[DurationUnit["Minutes"] = 60000000000] = "Minutes";
    DurationUnit[DurationUnit["Hours"] = 3600000000000] = "Hours";
    DurationUnit[DurationUnit["Days"] = 86400000000000] = "Days";
})(DurationUnit || (DurationUnit = {}));

class Duration {
    constructor(value, unit) {
        this._nanoseconds = value * unit;
    }
    static fromNanoseconds(value) {
        return new Duration(value, DurationUnit.Nanoseconds);
    }
    static fromMicroseconds(value) {
        return new Duration(value, DurationUnit.Microseconds);
    }
    static fromMilliseconds(value) {
        return new Duration(value, DurationUnit.Milliseconds);
    }
    static fromSeconds(value) {
        return new Duration(value, DurationUnit.Seconds);
    }
    static fromMinutes(value) {
        return new Duration(value, DurationUnit.Minutes);
    }
    static fromHours(value) {
        return new Duration(value, DurationUnit.Hours);
    }
    static fromDays(value) {
        return new Duration(value, DurationUnit.Days);
    }
    to(unit) {
        return this._nanoseconds / unit;
    }
    get nanoseconds() {
        return this.to(DurationUnit.Nanoseconds);
    }
    get microseconds() {
        return this.to(DurationUnit.Microseconds);
    }
    get milliseconds() {
        return this.to(DurationUnit.Milliseconds);
    }
    get seconds() {
        return this.to(DurationUnit.Seconds);
    }
    get minutes() {
        return this.to(DurationUnit.Minutes);
    }
    get hours() {
        return this.to(DurationUnit.Hours);
    }
    get days() {
        return this.to(DurationUnit.Days);
    }
    add(other) {
        return new Duration(this._nanoseconds + other._nanoseconds, DurationUnit.Nanoseconds);
    }
    subtract(other) {
        return new Duration(this._nanoseconds - other._nanoseconds, DurationUnit.Nanoseconds);
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

class Keyboard {
    constructor() {
        this._newPressedKeys = new Set();
        this._newReleasedKeys = new Set();
        this._keys = Object.values(Key);
        this._newTypedString = "";
        this._downKeys = new Set();
        this._upKeys = new Set();
        this._pressedKeys = new Set();
        this._releasedKeys = new Set();
        this._typedString = "";
        Game["_ensureLaunched"]();
        const root = Game.root;
        root.addEventListener("keydown", e => this._onKeyDown(e));
        root.addEventListener("keyup", e => this._onKeyUp(e));
    }
    static get typedString() {
        return Keyboard._self._typedString;
    }
    static get downKeys() {
        return Keyboard._self._downKeys;
    }
    static get upKeys() {
        return Keyboard._self._upKeys;
    }
    static get pressedKeys() {
        return Keyboard._self._pressedKeys;
    }
    static get releasedKeys() {
        return Keyboard._self._releasedKeys;
    }
    static isKeyDown(key) {
        return this._self._downKeys.has(key);
    }
    static isKeyUp(key) {
        return this._self._upKeys.has(key);
    }
    static isKeyPressed(key) {
        return this._self._pressedKeys.has(key);
    }
    static isKeyReleased(key) {
        return this._self._releasedKeys.has(key);
    }
    static get _self() {
        return (this._instance ?? (this._instance = new Keyboard()));
    }
    _update() {
        if (!Game.focused) {
            this._reset();
            return;
        }
        this._updateTypedString();
        this._updatePressedKeys();
        this._updateDownKeys();
        this._updateReleasedKeys();
        this._updateUpKeys();
    }
    _onKeyDown(event) {
        this._keys.includes(event.code) && this._newPressedKeys.add(event.code);
        event.key.length === 1 && (this._newTypedString += event.key);
    }
    _onKeyUp(event) {
        this._keys.includes(event.code) && this._newReleasedKeys.add(event.code);
    }
    _updateTypedString() {
        this._typedString = this._newTypedString;
        this._newTypedString = "";
    }
    _updateDownKeys() {
        Collection.addAll(this._downKeys, this._newPressedKeys);
        this._newPressedKeys.clear();
    }
    _updateUpKeys() {
        this._upKeys.clear();
        Collection.addAll(this._upKeys, this._keys);
        Collection.removeAll(this._upKeys, this._downKeys);
    }
    _updatePressedKeys() {
        this._pressedKeys.clear();
        Collection.addAll(this._pressedKeys, this._newPressedKeys);
        Collection.removeAll(this._pressedKeys, this._downKeys);
    }
    _updateReleasedKeys() {
        this._releasedKeys.clear();
        Collection.addAll(this._releasedKeys, this._newReleasedKeys);
        this._newReleasedKeys.clear();
        Collection.removeAll(this._downKeys, this._releasedKeys);
    }
    _reset() {
        this._newTypedString = "";
        this._typedString = "";
        this._newPressedKeys.clear();
        this._downKeys.clear();
        this._newReleasedKeys.clear();
        this._releasedKeys.clear();
        this._updateUpKeys();
    }
}
Keyboard._instance = null;

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
        this._time = null;
        this._keyboard = null;
        this._root = null;
        this._canvas = null;
        this._scene = null;
        this._width = 0;
        this._height = 0;
        Game._ensureLaunched();
    }
    static get focused() {
        return document.activeElement === this._self._root;
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
        this._time = Time["_self"];
        this._keyboard = Keyboard["_self"];
    }
    _initializeCanvas() {
        this._canvas = document.createElement("canvas");
        this._canvas.width = this._width;
        this._canvas.height = this._height;
    }
    _initializeRoot() {
        this._root.appendChild(this._canvas);
        this._root.tabIndex = 0;
        this._root.focus();
    }
    _start() {
        this._scene["_initialize"]().then(() => this._frame());
    }
    _update() {
        const scene = this._scene;
        this._time["_update"]();
        this._keyboard["_update"]();
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

export { Collection, Duration, DurationUnit, Game, Key, Keyboard, Scene, Time };

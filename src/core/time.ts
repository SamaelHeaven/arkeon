import { Duration } from "./duration";
import { Game } from "./game";

export class Time {
    private static _instanceRef: Time | null = null;
    private readonly _launchTime = performance.now();
    private readonly _fixedDelta = 1 / 60;
    private _startTime: number = this._launchTime;
    private _lastFrameTime: number = 0;
    private _frameCount: number = 0;
    private _delta: number = 0;
    private _averageFPS: number = 0;

    private constructor() {
        Game["_ensureLaunched"]();
    }

    public static get elapsed(): Duration {
        return Duration.fromMilliseconds(performance.now() - this._instance._launchTime);
    }

    public static get delta(): number {
        return this._instance._delta;
    }

    public static get fixedDelta(): number {
        return this._instance._fixedDelta;
    }

    public static get averageFPS(): number {
        return this._instance._averageFPS;
    }

    public static get currentFPS(): number {
        const instance = this._instance;
        return instance._delta <= 0 ? 0 : 1 / instance._delta;
    }

    private static get _instance() {
        return (this._instanceRef ??= new this());
    }

    private _update() {
        this._frameCount++;
        const ticks = performance.now() - this._startTime;
        this._delta = (ticks - this._lastFrameTime) / 1e3;
        const timeInSeconds = ticks / 1e3;
        this._averageFPS = timeInSeconds === 0 ? 0 : this._frameCount / timeInSeconds;
        this._lastFrameTime = ticks;
    }

    private _restart() {
        this._startTime = performance.now();
        this._lastFrameTime = 0;
        this._frameCount = 0;
        this._delta = 0;
        this._averageFPS = 0;
    }
}

import { Duration } from "./duration";
import { Game } from "./game";

export class Time {
    private static _instance: Time | null = null;
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
        return Duration.fromMilliseconds(performance.now() - this._self._launchTime);
    }

    public static get delta(): number {
        return this._self._delta;
    }

    public static get fixedDelta(): number {
        return this._self._fixedDelta;
    }

    public static get averageFPS(): number {
        return this._self._averageFPS;
    }

    public static get currentFPS(): number {
        const instance = this._self;
        return instance._delta <= 0 ? 0 : 1 / instance._delta;
    }

    private static get _self() {
        return (this._instance ??= new this());
    }

    private _update() {
        const ticks = performance.now() - this._startTime;
        this._frameCount++;
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

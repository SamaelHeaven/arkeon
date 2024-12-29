import { Duration } from "./duration";
export declare class Time {
    private static _instance;
    private readonly _launchTime;
    private readonly _fixedDelta;
    private _startTime;
    private _lastFrameTime;
    private _frameCount;
    private _delta;
    private _averageFPS;
    private constructor();
    static get elapsed(): Duration;
    static get delta(): number;
    static get fixedDelta(): number;
    static get averageFPS(): number;
    static get currentFPS(): number;
    private static get _self();
    private _update;
    private _restart;
}

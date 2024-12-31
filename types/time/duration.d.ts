import { DurationUnitString } from "./duration-unit";
export declare class Duration {
    private readonly _nanoseconds;
    constructor(value: number, unit?: DurationUnitString);
    static fromNanoseconds(value: number): Duration;
    static fromMicroseconds(value: number): Duration;
    static fromMilliseconds(value: number): Duration;
    static fromSeconds(value: number): Duration;
    static fromMinutes(value: number): Duration;
    static fromHours(value: number): Duration;
    static fromDays(value: number): Duration;
    to(unit: DurationUnitString): number;
    get nanoseconds(): number;
    get microseconds(): number;
    get milliseconds(): number;
    get seconds(): number;
    get minutes(): number;
    get hours(): number;
    get days(): number;
    add(other: Duration): Duration;
    subtract(other: Duration): Duration;
    toString(): string;
}

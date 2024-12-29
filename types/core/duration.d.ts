declare const units: {
    readonly nanoseconds: 1;
    readonly microseconds: 1000;
    readonly milliseconds: 1000000;
    readonly seconds: 1000000000;
    readonly minutes: number;
    readonly hours: number;
    readonly days: number;
};
export type DurationUnit = keyof typeof units;
export declare class Duration {
    private readonly _nanoseconds;
    constructor(value: number, unit: DurationUnit);
    static fromNanoseconds(value: number): Duration;
    static fromMicroseconds(value: number): Duration;
    static fromMilliseconds(value: number): Duration;
    static fromSeconds(value: number): Duration;
    static fromMinutes(value: number): Duration;
    static fromHours(value: number): Duration;
    static fromDays(value: number): Duration;
    to(unit: DurationUnit): number;
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
export {};

export declare enum DurationUnit {
    Nanoseconds = 1,
    Microseconds = 1000,
    Milliseconds = 1000000,
    Seconds = 1000000000,
    Minutes = 60000000000,
    Hours = 3600000000000,
    Days = 86400000000000
}
export type DurationUnitString = keyof typeof DurationUnit;

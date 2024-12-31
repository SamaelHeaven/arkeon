export enum DurationUnit {
    Nanoseconds = 1,
    Microseconds = 1e3,
    Milliseconds = 1e6,
    Seconds = 1e9,
    Minutes = 60 * 1e9,
    Hours = 60 * 60 * 1e9,
    Days = 24 * 60 * 60 * 1e9
}

export type KeyOfDurationUnit = keyof typeof DurationUnit;

const units = {
    nanoseconds: 1,
    microseconds: 1e3,
    milliseconds: 1e6,
    seconds: 1e9,
    minutes: 60 * 1e9,
    hours: 60 * 60 * 1e9,
    days: 24 * 60 * 60 * 1e9
} as const;

export type DurationUnit = keyof typeof units;

export class Duration {
    private readonly _nanoseconds: number;

    constructor(value: number, unit: DurationUnit) {
        this._nanoseconds = value * units[unit];
    }

    public static fromNanoseconds(value: number): Duration {
        return new Duration(value, "nanoseconds");
    }

    public static fromMicroseconds(value: number): Duration {
        return new Duration(value, "microseconds");
    }

    public static fromMilliseconds(value: number): Duration {
        return new Duration(value, "milliseconds");
    }

    public static fromSeconds(value: number): Duration {
        return new Duration(value, "seconds");
    }

    public static fromMinutes(value: number): Duration {
        return new Duration(value, "minutes");
    }

    public static fromHours(value: number): Duration {
        return new Duration(value, "hours");
    }

    public static fromDays(value: number): Duration {
        return new Duration(value, "days");
    }

    public to(unit: DurationUnit): number {
        return this._nanoseconds / units[unit];
    }

    public get nanoseconds(): number {
        return this.to("nanoseconds");
    }

    public get microseconds(): number {
        return this.to("microseconds");
    }

    public get milliseconds(): number {
        return this.to("milliseconds");
    }

    public get seconds(): number {
        return this.to("seconds");
    }

    public get minutes(): number {
        return this.to("minutes");
    }

    public get hours(): number {
        return this.to("hours");
    }

    public get days(): number {
        return this.to("days");
    }

    public add(other: Duration): Duration {
        return new Duration(this._nanoseconds + other._nanoseconds, "nanoseconds");
    }

    public subtract(other: Duration): Duration {
        return new Duration(this._nanoseconds - other._nanoseconds, "nanoseconds");
    }

    public toString(): string {
        const days = Math.floor(this.days);
        const hours = Math.floor(this.hours % 24);
        const minutes = Math.floor(this.minutes % 60);
        const seconds = Math.floor(this.seconds % 60);
        const milliseconds = Math.floor(this.milliseconds % 1000);
        const parts: string[] = [];
        days && parts.push(`${days}d`);
        hours && parts.push(`${hours}h`);
        minutes && parts.push(`${minutes}m`);
        seconds && parts.push(`${seconds}s`);
        milliseconds && parts.push(`${milliseconds}ms`);
        return parts.length > 0 ? parts.join(" ") : "0ms";
    }
}

import { DurationUnit } from "./duration-unit";

export class Duration {
    private readonly _nanoseconds: number;

    constructor(value: number, unit: DurationUnit) {
        this._nanoseconds = value * unit;
    }

    public static fromNanoseconds(value: number): Duration {
        return new Duration(value, DurationUnit.Nanoseconds);
    }

    public static fromMicroseconds(value: number): Duration {
        return new Duration(value, DurationUnit.Microseconds);
    }

    public static fromMilliseconds(value: number): Duration {
        return new Duration(value, DurationUnit.Milliseconds);
    }

    public static fromSeconds(value: number): Duration {
        return new Duration(value, DurationUnit.Seconds);
    }

    public static fromMinutes(value: number): Duration {
        return new Duration(value, DurationUnit.Minutes);
    }

    public static fromHours(value: number): Duration {
        return new Duration(value, DurationUnit.Hours);
    }

    public static fromDays(value: number): Duration {
        return new Duration(value, DurationUnit.Days);
    }

    public to(unit: DurationUnit): number {
        return this._nanoseconds / unit;
    }

    public get nanoseconds(): number {
        return this.to(DurationUnit.Nanoseconds);
    }

    public get microseconds(): number {
        return this.to(DurationUnit.Microseconds);
    }

    public get milliseconds(): number {
        return this.to(DurationUnit.Milliseconds);
    }

    public get seconds(): number {
        return this.to(DurationUnit.Seconds);
    }

    public get minutes(): number {
        return this.to(DurationUnit.Minutes);
    }

    public get hours(): number {
        return this.to(DurationUnit.Hours);
    }

    public get days(): number {
        return this.to(DurationUnit.Days);
    }

    public add(other: Duration): Duration {
        return new Duration(this._nanoseconds + other._nanoseconds, DurationUnit.Nanoseconds);
    }

    public subtract(other: Duration): Duration {
        return new Duration(this._nanoseconds - other._nanoseconds, DurationUnit.Nanoseconds);
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

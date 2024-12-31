import { DurationUnit, DurationUnitString } from "./duration-unit";

export class Duration {
    private readonly _nanoseconds: number;

    constructor(value: number, unit: DurationUnitString = "Nanoseconds") {
        this._nanoseconds = value * DurationUnit[unit];
    }

    public static fromNanoseconds(value: number): Duration {
        return new Duration(value, "Nanoseconds");
    }

    public static fromMicroseconds(value: number): Duration {
        return new Duration(value, "Microseconds");
    }

    public static fromMilliseconds(value: number): Duration {
        return new Duration(value, "Milliseconds");
    }

    public static fromSeconds(value: number): Duration {
        return new Duration(value, "Seconds");
    }

    public static fromMinutes(value: number): Duration {
        return new Duration(value, "Minutes");
    }

    public static fromHours(value: number): Duration {
        return new Duration(value, "Hours");
    }

    public static fromDays(value: number): Duration {
        return new Duration(value, "Days");
    }

    public to(unit: DurationUnitString): number {
        return this._nanoseconds / DurationUnit[unit];
    }

    public get nanoseconds(): number {
        return this.to("Nanoseconds");
    }

    public get microseconds(): number {
        return this.to("Microseconds");
    }

    public get milliseconds(): number {
        return this.to("Milliseconds");
    }

    public get seconds(): number {
        return this.to("Seconds");
    }

    public get minutes(): number {
        return this.to("Minutes");
    }

    public get hours(): number {
        return this.to("Hours");
    }

    public get days(): number {
        return this.to("Days");
    }

    public add(other: Duration): Duration {
        return new Duration(this._nanoseconds + other._nanoseconds);
    }

    public subtract(other: Duration): Duration {
        return new Duration(this._nanoseconds - other._nanoseconds);
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
